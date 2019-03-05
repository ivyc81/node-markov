const {MarkovMachine} = require('./markov');

describe("createMarkovMachine", function(){
    let testText = "The most happy monkey eats banana all day"
    let testInstance;

    beforeEach(function(){
        testInstance = new MarkovMachine(testText);
    })

    test("", function(){
        let chainOfWords = testInstance.makeChains();

        expect(chainOfWords.length).toEqual(testText.length);

    })
})