'use client';

import { useState } from 'react';
import { Check, Copy } from 'lucide-react';
import DOMPurify from 'isomorphic-dompurify';

interface CodeBlockProps {
  children: string;
  className?: string;
  language?: string;
}

export function CodeBlock({ children, className, language }: CodeBlockProps) {
  const [copied, setCopied] = useState(false);
  
  // Extract language from className (format: language-xxx)
  const lang = language || className?.replace('language-', '') || 'plaintext';
  
  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(children);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy code:', err);
    }
  };

  // Syntax highlighting based on patterns
  const highlightCode = (code: string, lang: string) => {
    // SECURITY: Sanitize input to prevent XSS attacks
    const sanitizedCode = DOMPurify.sanitize(code, {
      ALLOWED_TAGS: [],
      ALLOWED_ATTR: [],
      KEEP_CONTENT: true
    });
    
    let highlighted = sanitizedCode;

    // Keywords patterns by language
    const patterns: Record<string, RegExp[]> = {
      javascript: [
        /\b(const|let|var|function|return|if|else|for|while|do|switch|case|break|continue|try|catch|finally|throw|async|await|import|export|default|class|extends|new|this|super|static)\b/g,
        /\b(true|false|null|undefined)\b/g,
      ],
      typescript: [
        /\b(const|let|var|function|return|if|else|for|while|do|switch|case|break|continue|try|catch|finally|throw|async|await|import|export|default|class|extends|new|this|super|static|interface|type|enum|namespace|public|private|protected|readonly)\b/g,
        /\b(true|false|null|undefined|any|unknown|never|void)\b/g,
      ],
      python: [
        /\b(def|class|if|elif|else|for|while|return|import|from|as|try|except|finally|raise|with|pass|break|continue|lambda|yield|async|await)\b/g,
        /\b(True|False|None)\b/g,
      ],
      bash: [
        /\b(echo|cd|ls|mkdir|rm|cp|mv|cat|grep|sed|awk|chmod|chown|sudo|apt|yum|npm|yarn|git|docker|kubectl)\b/g,
      ],
      json: [
        /"([^"\\]|\\.)*"\s*:/g, // Property names
      ],
    };

    // Apply keyword highlighting
    const keywordPatterns = patterns[lang.toLowerCase()] || patterns.javascript;
    
    keywordPatterns.forEach((pattern, index) => {
      if (index === 1) {
        // Boolean/null values
        highlighted = highlighted.replace(pattern, '<span class="token boolean">$&</span>');
      } else {
        highlighted = highlighted.replace(pattern, '<span class="token keyword">$&</span>');
      }
    });

    // String highlighting (must be after keywords to avoid conflicts)
    highlighted = highlighted.replace(
      /(['"`])(?:(?=(\\?))\2.)*?\1/g,
      '<span class="token string">$&</span>'
    );

    // Function calls
    highlighted = highlighted.replace(
      /\b([a-zA-Z_][a-zA-Z0-9_]*)\s*\(/g,
      '<span class="token function">$1</span>('
    );

    // Comments
    if (lang === 'javascript' || lang === 'typescript' || lang === 'java') {
      highlighted = highlighted.replace(
        /\/\/.*/g,
        '<span class="token comment">$&</span>'
      );
      highlighted = highlighted.replace(
        /\/\*[\s\S]*?\*\//g,
        '<span class="token comment">$&</span>'
      );
    } else if (lang === 'python' || lang === 'bash') {
      highlighted = highlighted.replace(
        /#.*/g,
        '<span class="token comment">$&</span>'
      );
    }

    // Numbers
    highlighted = highlighted.replace(
      /\b\d+(\.\d+)?\b/g,
      '<span class="token number">$&</span>'
    );

    return highlighted;
  };

  const highlightedCode = highlightCode(children, lang);
  
  // SECURITY: Final sanitization pass with allowed tags for syntax highlighting
  const sanitizedHighlightedCode = DOMPurify.sanitize(highlightedCode, {
    ALLOWED_TAGS: ['span'],
    ALLOWED_ATTR: ['class'],
    ALLOW_DATA_ATTR: false
  });

  return (
    <div className="relative group">
      {/* Language label and copy button */}
      <div className="absolute top-3 right-3 flex items-center gap-2 z-10">
        <span className="text-xs font-mono text-cyber-gray uppercase tracking-wider bg-cyber-navy/80 px-3 py-1 rounded border border-cyber-cyan/20">
          {DOMPurify.sanitize(lang)}
        </span>
        <button
          onClick={handleCopy}
          className="p-2 bg-cyber-navy/80 border border-cyber-cyan/20 rounded hover:bg-cyber-cyan/10 hover:border-cyber-cyan/40 transition-all duration-200 opacity-0 group-hover:opacity-100"
          aria-label="Copy code"
        >
          {copied ? (
            <Check size={16} className="text-cyber-green" />
          ) : (
            <Copy size={16} className="text-cyber-cyan" />
          )}
        </button>
      </div>

      {/* Code content */}
      <pre className="bg-cyber-darker border border-cyber-cyan/30 rounded-lg p-6 pr-32 overflow-x-auto my-6 font-mono text-sm shadow-lg shadow-cyber-cyan/5 relative leading-relaxed">
        <code
          className="text-cyber-gray-light"
          dangerouslySetInnerHTML={{ __html: sanitizedHighlightedCode }}
        />
      </pre>
    </div>
  );
}
