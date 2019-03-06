/** Textual markov chain generator */


class MarkovMachine {

  /** build markov machine; read in text.*/

  constructor(text) {
    let words = text.split(/[ \r\n]+/);
    this.words = words.filter(c => c !== "");
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
  }

  makeBigramChains() {
    // TODO

    const setOfWords = new Set();
    for(let i = 0; i < this.words.length - 1; i++){
      setOfWords.add(`${this.words[i]} ${this.words[i+1]}`)
    }
    const chainOfWords = {};

    for (let words of setOfWords) {
      chainOfWords[words] = [];

      let index = 0;

      let twoWordArr = words.split(' ');
      // let indexFirst = this.words.indexOf(twoWordArr[0], index);
      let indexSecond = this.words.indexOf(twoWordArr[1], index);

      // let followingWordIndex;

      while (indexSecond !== -1) {
        if(this.words[indexSecond-1] === twoWordArr[0]){
          chainOfWords[words].push(this.words[indexSecond + 1] || null);
        }
        index = indexSecond + 1;
        indexSecond = this.words.indexOf(twoWordArr[1], index);
      }
    }
    return chainOfWords;
  }



    /** return random text from chains */

  makeText(numWords = 100) {
      // TODO
      let sentence = "";
      // const chainOfWords = this.makeChains();
      const chainOfWords = this.makeBigramChains();
      var keys = Object.keys(chainOfWords);
      let randomStartWord;

      do{
        randomStartWord = makeRandom(keys);
      } while(randomStartWord[0].toUpperCase() !== randomStartWord[0])

      let word = randomStartWord;
      sentence += randomStartWord;
      // let previousWord;
      for (let i = 1; i < numWords; i++){
        let nextWordOptions = chainOfWords[word];
        let nextWord = makeRandom(nextWordOptions);
        if (nextWord === null){
          return sentence;
        }
        else{
          sentence += ` ${nextWord}`;
          word = `${word.split(' ')[1]} ${nextWord}`;
        }
      }
      return sentence;
  }
}

// Return random element in the array
function makeRandom(array){

  return array[Math.floor(array.length *Math.random())];
}

module.exports = { MarkovMachine };
