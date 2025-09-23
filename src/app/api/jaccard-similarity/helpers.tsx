export function jaccardSimilarity(a: string, b: string): number {
  // tokenize using preprocessLegal
  const setA = new Set(preprocessLegal(a));
  const setB = new Set(preprocessLegal(b));

  const intersection = new Set([...setA].filter((x) => setB.has(x)));
  const union = new Set([...setA, ...setB]);

  return union.size === 0 ? 0 : intersection.size / union.size;
}

export function preprocessLegal(text: string) {
  const legalStopwords = new Set([
    "section",
    "sec",
    "subsection",
    "title",
    "chapter",
    "act",
    "law",
    "rule",
    "rules",
    "regulation",
    "code",
    "statute",
    "part",
    "division",
    "article",
    "para",
    "paragraph",
    "of",
    "the",
    "and",
    "a",
    "an",
    "in",
    "for",
    "to",
  ]);

  return (text.toLowerCase().match(/[a-z0-9§\.]+|\([a-z0-9]+\)/g) || []).filter(
    (token) => !legalStopwords.has(token)
  );
}

/*
**** 
* /[a-z0-9§\.]+|\([a-z0-9]+\)/g
****
*
* [a-z0-9§\.]+
*	•	[...] → character class: match any one of the listed characters.
*	•	a-z → lowercase letters.
*	•	0-9 → digits.
*	•	§ → the section symbol (legal citations often use it).
*	•	\. → a literal period (so u.s.c. doesn’t get broken apart).
*	•	+ → one or more of the above.
*
*  This part matches tokens like:
*	•	"42"
*	•	"u.s.c."
*	•	"1396p"
*	•	"§"
⸻

* 2. \([a-z0-9]+\)
*	•	\( and \) → match literal parentheses.
*	•	[a-z0-9]+ → one or more letters/digits inside.
*	•	Together → captures things like (c), (a1), (12).
* ⸻
*
* 3. | (OR)
*
* The regex will match either a sequence of [a-z0-9§\.]+ or a parenthesized group like (c).
*
*⸻
*
* 4. g flag
*	•	“global” → don’t stop at the first match; return all matches.
*/
