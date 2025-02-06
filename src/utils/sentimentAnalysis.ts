import nlp from 'compromise';

const POSITIVE_WORDS = new Set([
  'bullish', 'surge', 'gain', 'profit', 'growth', 'positive',
  'upward', 'rise', 'improve', 'strong', 'success', 'boost'
]);

const NEGATIVE_WORDS = new Set([
  'bearish', 'decline', 'loss', 'negative', 'drop', 'fall',
  'weak', 'crash', 'downturn', 'risk', 'concern', 'worry'
]);

export function analyzeSentiment(text: string): number {
  const doc = nlp(text.toLowerCase());
  const words = doc.terms().out('array');
  
  let score = 0;
  let relevantWords = 0;
  
  words.forEach(word => {
    if (POSITIVE_WORDS.has(word)) {
      score += 1;
      relevantWords++;
    } else if (NEGATIVE_WORDS.has(word)) {
      score -= 1;
      relevantWords++;
    }
  });
  
  return relevantWords > 0 ? score / relevantWords : 0;
}