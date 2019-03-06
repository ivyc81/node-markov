const {MarkovMachine} = require('./markov');

describe("createMarkovMachine", function(){
    let testText = "The most happy monkey eats banana all day"
    let testInstance;
    let testText2 = "The most happy banana monkey eats banana all day"
    let testInstance2;
    beforeEach(function(){
        testInstance = new MarkovMachine(testText);
        testInstance2 = new MarkovMachine(testText2)
    })

    test("the chainOfWords object created correctly", function(){
        let chainOfWords = testInstance.makeChains();
        let chainOfWords2 = testInstance2.makeChains();
        expect(Object.keys(chainOfWords).length).toEqual(8);
        expect(Object.keys(chainOfWords2).length).toEqual(8);
        expect(chainOfWords2['banana']).toContain('monkey','all');
        expect(chainOfWords2['day']).toEqual([null]);
    })

    test("the makeText function works", function(){
        let chainOfWords = testInstance.makeChains();

        let sentence = testInstance.makeText();
        let sentence2 = testInstance.makeText(1);

        let senArr = sentence.split(' ');
        let senArr2 = sentence2.split(' ');

        expect(senArr.every(w => chainOfWords.hasOwnProperty(w))).toBe(true);
        if (senArr.length !== 1){
            expect(chainOfWords[senArr[0]].indexOf(senArr[1]) !== -1).toBe(true);
        }
        else {
            expect(chainOfWords[senArr[0]]).toContain(null);
        }
        expect(senArr2.length <= 1).toBe(true);
        expect(typeof(sentence)).toBe('string');
        if(senArr2.length === 1){
            expect(senArr2).toEqual(expect.not.arrayContaining(['day']));
        }
    })
})