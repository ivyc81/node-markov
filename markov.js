/** Textual markov chain generator */


class MarkovMachine {

  /** build markov machine; read in text.*/

  constructor(text) {
    let words = text.split(/[ \r\n]+/);
    this.words = words.filter(c => c !== "").map(w => w.toLowerCase());
    this.makeChains();
  }

  /** set markov chains:
   *
   *  for text of "the cat in the hat", chains will be
   *  {"the": ["cat", "hat"], "cat": ["in"], "in": ["the"], "hat": [null]} */

  makeChains() {
    // TODO

    const setOfWords = new Set(this.words);
    const chainOfWords = {};

    for (let word of setOfWords) {
      chainOfWords[word] = [];

      let index = 0;
      let followingWordIndex = this.words.indexOf(word, index);

      while (followingWordIndex !== -1) {
        chainOfWords[word].push(this.words[followingWordIndex + 1] || null);
        index = followingWordIndex + 1;
        followingWordIndex = this.words.indexOf(word, index);
      }
    }
    return chainOfWords;


    /** return random text from chains */

    // makeText(numWords = 100) {
    //   // TODO
    // }
  }
}

module.exports = { MarkovMachine };
