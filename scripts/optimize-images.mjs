/**
 * Image Optimization Script
 * Converts images to WebP format and optimizes them
 * Run with: node scripts/optimize-images.mjs
 */

import sharp from 'sharp';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const imagesDir = path.join(__dirname, '../public/images');
const backupDir = path.join(__dirname, '../public/images-backup');

// Image optimization settings
const QUALITY = {
  webp: 85,
  jpeg: 85,
  png: 90,
};

// Image resize settings (max dimensions)
const MAX_DIMENSIONS = {
  'og-': { width: 1200, height: 630 },      // OG images
  'blog-cover': { width: 1200, height: 630 }, // Blog covers
  'icon-': { width: 512, height: 512 },      // Icons
  'default': { width: 1920, height: 1080 },  // Other images
};

/**
 * Get max dimensions for a file
 */
function getMaxDimensions(filename) {
  for (const [prefix, dimensions] of Object.entries(MAX_DIMENSIONS)) {
    if (prefix !== 'default' && filename.startsWith(prefix)) {
      return dimensions;
    }
  }
  return MAX_DIMENSIONS.default;
}

/**
 * Get all image files recursively
 */
function getAllImages(dir, fileList = []) {
  const files = fs.readdirSync(dir);

  files.forEach((file) => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);

    if (stat.isDirectory()) {
      getAllImages(filePath, fileList);
    } else if (/\.(png|jpg|jpeg)$/i.test(file)) {
      fileList.push(filePath);
    }
  });

  return fileList;
}

/**
 * Optimize a single image
 */
async function optimizeImage(imagePath) {
  try {
    const filename = path.basename(imagePath);
    const ext = path.extname(imagePath).toLowerCase();
    const relativePath = path.relative(imagesDir, imagePath);
    
    console.log(`\n📸 Processing: ${relativePath}`);
    
    // Get original size
    const originalSize = fs.statSync(imagePath).size;
    console.log(`   Original: ${(originalSize / 1024).toFixed(2)} KB`);
    
    // Get image metadata
    const image = sharp(imagePath);
    const metadata = await image.metadata();
    console.log(`   Dimensions: ${metadata.width}x${metadata.height}`);
    
    // Determine max dimensions
    const maxDimensions = getMaxDimensions(filename);
    
    // Prepare sharp instance with resize if needed
    let processor = image;
    
    if (metadata.width > maxDimensions.width || metadata.height > maxDimensions.height) {
      processor = processor.resize(maxDimensions.width, maxDimensions.height, {
        fit: 'inside',
        withoutEnlargement: true,
      });
      console.log(`   Resizing to max ${maxDimensions.width}x${maxDimensions.height}`);
    }
    
    // Convert to WebP
    const webpPath = imagePath.replace(/\.(png|jpg|jpeg)$/i, '.webp');
    await processor
      .webp({ quality: QUALITY.webp })
      .toFile(webpPath);
    
    const webpSize = fs.statSync(webpPath).size;
    console.log(`   WebP: ${(webpSize / 1024).toFixed(2)} KB (${((1 - webpSize / originalSize) * 100).toFixed(1)}% reduction)`);
    
    // Also optimize original format as fallback
    if (ext === '.png') {
      await sharp(imagePath)
        .resize(maxDimensions.width, maxDimensions.height, {
          fit: 'inside',
          withoutEnlargement: true,
        })
        .png({ quality: QUALITY.png, compressionLevel: 9 })
        .toFile(imagePath + '.tmp');
      
      fs.renameSync(imagePath + '.tmp', imagePath);
      
      const optimizedSize = fs.statSync(imagePath).size;
      console.log(`   PNG (optimized): ${(optimizedSize / 1024).toFixed(2)} KB`);
    } else if (ext === '.jpg' || ext === '.jpeg') {
      await sharp(imagePath)
        .resize(maxDimensions.width, maxDimensions.height, {
          fit: 'inside',
          withoutEnlargement: true,
        })
        .jpeg({ quality: QUALITY.jpeg, mozjpeg: true })
        .toFile(imagePath + '.tmp');
      
      fs.renameSync(imagePath + '.tmp', imagePath);
      
      const optimizedSize = fs.statSync(imagePath).size;
      console.log(`   JPEG (optimized): ${(optimizedSize / 1024).toFixed(2)} KB`);
    }
    
    return {
      original: relativePath,
      originalSize,
      webpSize,
      reduction: originalSize - webpSize,
    };
  } catch (error) {
    console.error(`❌ Error processing ${imagePath}:`, error.message);
    return null;
  }
}

/**
 * Main optimization function
 */
async function optimizeAllImages() {
  console.log('🖼️  Image Optimization Starting...\n');
  console.log('📁 Images directory:', imagesDir);
  
  // Create backup directory
  if (!fs.existsSync(backupDir)) {
    console.log('📦 Creating backup directory...');
    fs.mkdirSync(backupDir, { recursive: true });
  }
  
  // Get all images
  const images = getAllImages(imagesDir);
  console.log(`\n📊 Found ${images.length} images to optimize\n`);
  console.log('━'.repeat(60));
  
  // Optimize each image
  const results = [];
  for (const imagePath of images) {
    const result = await optimizeImage(imagePath);
    if (result) {
      results.push(result);
    }
  }
  
  // Summary
  console.log('\n' + '━'.repeat(60));
  console.log('\n📊 OPTIMIZATION SUMMARY\n');
  
  const totalOriginal = results.reduce((sum, r) => sum + r.originalSize, 0);
  const totalWebP = results.reduce((sum, r) => sum + r.webpSize, 0);
  const totalReduction = totalOriginal - totalWebP;
  const reductionPercent = ((totalReduction / totalOriginal) * 100).toFixed(1);
  
  console.log(`Total images processed: ${results.length}`);
  console.log(`Original total size: ${(totalOriginal / 1024 / 1024).toFixed(2)} MB`);
  console.log(`WebP total size: ${(totalWebP / 1024 / 1024).toFixed(2)} MB`);
  console.log(`Total reduction: ${(totalReduction / 1024 / 1024).toFixed(2)} MB (${reductionPercent}%)`);
  
  console.log('\n✅ Optimization complete!');
  console.log(`\n💡 WebP images created alongside originals (fallback support)`);
}

// Run optimization
optimizeAllImages().catch(console.error);
