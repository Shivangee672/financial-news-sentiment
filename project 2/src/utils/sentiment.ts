const POSITIVE_WORDS = new Set([
  'bullish', 'surge', 'gain', 'profit', 'growth', 'strong', 'upward',
  'rise', 'boost', 'improve', 'positive', 'optimistic', 'confident',
  'upgrade', 'outperform', 'beat', 'exceed'
]);

const NEGATIVE_WORDS = new Set([
  'bearish', 'decline', 'loss', 'drop', 'weak', 'downward', 'fall',
  'decrease', 'negative', 'pessimistic', 'downgrade', 'underperform',
  'miss', 'below', 'concern', 'risk', 'volatile'
]);

export function analyzeSentiment(text: string): { score: number; label: 'positive' | 'negative' | 'neutral' } {
  const words = text.toLowerCase().split(/\s+/);
  let score = 0;
  
  words.forEach(word => {
    if (POSITIVE_WORDS.has(word)) score += 1;
    if (NEGATIVE_WORDS.has(word)) score -= 1;
  });
  
  const normalizedScore = score / Math.max(words.length / 10, 1);
  
  return {
    score: normalizedScore,
    label: normalizedScore > 0.1 ? 'positive' : normalizedScore < -0.1 ? 'negative' : 'neutral'
  };
}