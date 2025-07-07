// contentStructurer.js - Utility functions for auto-structuring blog content

/**
 * Main function to automatically structure content as point-wise
 * @param {string} content - Raw blog content
 * @returns {string} - Structured content with bullet points
 */
export const autoStructureContent = (content) => {
  if (!content || typeof content !== 'string') return '';
  
  // Clean up the content
  const cleanContent = content.trim();
  
  // Check if content already has structure
  if (hasExistingStructure(cleanContent)) {
    return cleanContent;
  }
  
  // Auto-structure the content
  const structuredPoints = createPointStructure(cleanContent);
  
  // Convert to formatted string
  return formatAsPointList(structuredPoints);
};

/**
 * Check if content already has bullet points or numbering
 * @param {string} content 
 * @returns {boolean}
 */
const hasExistingStructure = (content) => {
  const patterns = [
    /^[\s]*[-*•]/m,           // Bullet points
    /^\d+\./m,                // Numbered lists
    /^[\s]*[a-zA-Z]\)/m,      // Lettered lists (a) b) c)
    /^[\s]*[IVX]+\./m,        // Roman numerals
  ];
  
  return patterns.some(pattern => pattern.test(content));
};

/**
 * Create structured points from raw content
 * @param {string} content 
 * @returns {Array} - Array of structured points
 */
const createPointStructure = (content) => {
  // Split content into paragraphs first
  const paragraphs = content.split(/\n\s*\n/).filter(p => p.trim().length > 0);
  
  if (paragraphs.length > 1) {
    // Multiple paragraphs - each becomes a point
    return paragraphs.map(p => p.trim());
  } else {
    // Single paragraph - split into sentences and group
    return groupSentencesIntoPoints(content);
  }
};

/**
 * Group sentences into logical points
 * @param {string} content 
 * @returns {Array}
 */
const groupSentencesIntoPoints = (content) => {
  // Split into sentences
  const sentences = content
    .split(/[.!?]+/)
    .map(s => s.trim())
    .filter(s => s.length > 0);
  
  if (sentences.length <= 3) {
    // Few sentences - keep as single point
    return [content];
  }
  
  // Group sentences into points
  const points = [];
  let currentPoint = '';
  
  sentences.forEach((sentence, index) => {
    currentPoint += sentence + '.';
    
    // Create new point based on criteria
    if (shouldCreateNewPoint(sentence, index, sentences.length)) {
      points.push(currentPoint.trim());
      currentPoint = '';
    }
  });
  
  // Add any remaining content
  if (currentPoint.trim()) {
    points.push(currentPoint.trim());
  }
  
  return points;
};

/**
 * Determine if a new point should be created
 * @param {string} sentence 
 * @param {number} index 
 * @param {number} totalSentences 
 * @returns {boolean}
 */
const shouldCreateNewPoint = (sentence, index, totalSentences) => {
  return (
    (index + 1) % 2 === 0 ||        // Every 2 sentences
    sentence.length > 120 ||         // Long sentences
    index === totalSentences - 1 ||  // Last sentence
    containsTransitionWords(sentence) // Transition indicators
  );
};

/**
 * Check if sentence contains transition words that indicate new points
 * @param {string} sentence 
 * @returns {boolean}
 */
const containsTransitionWords = (sentence) => {
  const transitions = [
    'however', 'moreover', 'furthermore', 'additionally',
    'on the other hand', 'in contrast', 'similarly',
    'meanwhile', 'consequently', 'therefore', 'thus'
  ];
  
  return transitions.some(word => 
    sentence.toLowerCase().includes(word.toLowerCase())
  );
};

/**
 * Format points as a bulleted list
 * @param {Array} points 
 * @returns {string}
 */
const formatAsPointList = (points) => {
  return points.map(point => `• ${point}`).join('\n\n');
};

/**
 * Advanced structuring with categories
 * @param {string} content 
 * @param {string} type - 'blog', 'tutorial', 'review', etc.
 * @returns {string}
 */
export const structureByContentType = (content, type = 'blog') => {
  const baseStructure = autoStructureContent(content);
  
  switch (type) {
    case 'tutorial':
      return addStepNumbers(baseStructure);
    case 'review':
      return addReviewStructure(baseStructure);
    case 'list':
      return addListStructure(baseStructure);
    default:
      return baseStructure;
  }
};

/**
 * Add step numbers for tutorials
 * @param {string} content 
 * @returns {string}
 */
const addStepNumbers = (content) => {
  const points = content.split('\n\n');
  return points.map((point, index) => {
    const cleanPoint = point.replace(/^•\s*/, '');
    return `${index + 1}. ${cleanPoint}`;
  }).join('\n\n');
};

/**
 * Add review structure
 * @param {string} content 
 * @returns {string}
 */
const addReviewStructure = (content) => {
  const points = content.split('\n\n');
  const sections = ['Overview', 'Pros', 'Cons', 'Conclusion'];
  
  return points.map((point, index) => {
    const cleanPoint = point.replace(/^•\s*/, '');
    const section = sections[index % sections.length];
    return `**${section}:** ${cleanPoint}`;
  }).join('\n\n');
};

/**
 * Add enhanced list structure
 * @param {string} content 
 * @returns {string}
 */
const addListStructure = (content) => {
  const points = content.split('\n\n');
  return points.map((point, index) => {
    const cleanPoint = point.replace(/^•\s*/, '');
    return `✓ ${cleanPoint}`;
  }).join('\n\n');
};

// Usage examples:
/*
// Basic usage
const rawContent = "This is a blog post about React. It covers components and hooks. State management is important. Props are used for data passing.";
const structured = autoStructureContent(rawContent);

// Type-specific structuring
const tutorialContent = structureByContentType(rawContent, 'tutorial');
const reviewContent = structureByContentType(rawContent, 'review');

// For use in form submission
const handleBlogSubmit = (formData) => {
  const structuredContent = autoStructureContent(formData.content);
  
  // Send to API with structured content
  submitBlog({
    ...formData,
    content: structuredContent
  });
};
*/