export function normalize(str: string): string {
    return str.toLowerCase().replace(/\s+/g, ' ').trim(); //replace multple spaces or new lines with a sing space (helps the search work better)
};
  
export function calculateScore(currentSearchValue: string, name: string, type: string): number {
    const lowerSearchValue = currentSearchValue.toLocaleLowerCase();
    const lowerName = name.toLocaleLowerCase();
    let score = 0; 
  
    // Exact match boost
    if (lowerName === lowerSearchValue) {
      score += 100;
    }
    // Partial match boost based on match length
    else if (lowerName.includes(lowerSearchValue)) {
      const matchRatio = lowerSearchValue.length / lowerName.length;
      score += matchRatio * 70;
    }
    // Fuzzy match boost
    else {
      const similarity = getSimilarity(lowerSearchValue, lowerName);
      if (similarity > 0.6) { // Adjust threshold as needed
        score += similarity * 50;
      }
    }
  
    // Type-based score boosts
    if (type === 'coordinates') {
      score += 10;
    } else if (type === 'canal') {
      score += 5;
    } else if (type === 'marina') {
      score += 5;
    }
  
    return score;
}

function getSimilarity(s1: string, s2: string): number {
    const distance = levenshteinDistance(s1, s2);
    const maxLen = Math.max(s1.length, s2.length);
    return 1 - distance / maxLen; // Normalized similarity between 0 and 1
}

//I am not smart enought to understand this yet but trust me bro it works :)
//it is used to calculate how diferent two strings are.
//it counts the number of character edits are required to make one string into the other
//lower the number the more simlar two strings are
function levenshteinDistance(s: string, t: string): number {
    const m = s.length;
    const n = t.length;
    const d: number[][] = [];

    for (let i = 0; i <= m; i++) {
      d[i] = [i];
    }
    for (let j = 1; j <= n; j++) {
      d[0][j] = j;
    }
    for (let i = 1; i <= m; i++) {
      for (let j = 1; j <= n; j++) {
        const cost = s[i - 1] === t[j - 1] ? 0 : 1;
        d[i][j] = Math.min(
          d[i - 1][j] + 1,      // deletion
          d[i][j - 1] + 1,      // insertion
          d[i - 1][j - 1] + cost // substitution
        );
      }
    }
    return d[m][n];
}
