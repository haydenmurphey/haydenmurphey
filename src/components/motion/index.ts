/**
 * Motion Components Barrel Export
 * 
 * Centralized exports for all motion-related components and utilities.
 * Uses LazyMotion for optimal bundle size.
 */

export { LazyMotionWrapper } from './LazyMotionWrapper';

// Re-export motion components from framer-motion
// When using LazyMotion, use m.div instead of motion.div
export { m } from 'framer-motion';
