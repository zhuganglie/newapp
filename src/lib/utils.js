/**
 * Estimates reading time for a given text.
 * @param {string} text The content to estimate
 * @param {number} wordsPerMinute Words read per minute (default 300 for Chinese/mixed)
 * @returns {number} Estimated minutes
 */
export function estimateReadingTime(text, wordsPerMinute = 300) {
    if (!text) return 0;
    
    // For Chinese, each character is a "word"
    // For English, we split by spaces
    const chineseChars = (text.match(/[\u4e00-\u9fa5]/g) || []).length;
    const englishWords = text.replace(/[\u4e00-\u9fa5]/g, '').trim().split(/\s+/).filter(w => w.length > 0).length;
    
    const totalWords = chineseChars + englishWords;
    return Math.max(1, Math.ceil(totalWords / wordsPerMinute));
}
