const chai = require('chai');
const assert = chai.assert;

const Translator = require('../components/translator.js');
let translator = new Translator()

suite('Unit Tests', () => {
    test("To British 1", (done)=>{
        let text = "Mangoes are my favorite fruit."
        let result = 'Mangoes are my <span class="highlight">favourite</span> fruit.'
        assert.equal(result, translator.translateAmericanToBritish(text))
        done()
    })
    test("To British 2", (done)=>{
        let text = "I ate yogurt for breakfast."
        let result = 'I ate <span class="highlight">yoghurt</span> for breakfast.'
        assert.equal(result, translator.translateAmericanToBritish(text))
        done()
    })
    test("To British 3", (done)=>{
        let text = "We had a party at my friend's condo."
        let result = `We had a party at my friend's <span class="highlight">flat</span>.`
        assert.equal(result, translator.translateAmericanToBritish(text))
        done()
    })
    test("To British 4", (done)=>{
        let text = "Can you toss this in the trashcan for me?"
        let result = `Can you toss this in the <span class="highlight">bin</span> for me?`
        assert.equal(result, translator.translateAmericanToBritish(text))
        done()
    })
    test("To British 5", (done)=>{
        let text = "The parking lot was full."
        let result = `The <span class="highlight">car park</span> was full.`
        assert.equal(result, translator.translateAmericanToBritish(text))
        done()
    })
    test("To British 6", (done)=>{
        let text = "Like a high tech Rube Goldberg machine."
        let result = `Like a high tech <span class="highlight">Heath Robinson device</span>.`
        assert.equal(result, translator.translateAmericanToBritish(text))
        done()
    })
    test("To British 7", (done)=>{
        let text = "To play hooky means to skip class or work."
        let result = `To <span class="highlight">bunk off</span> means to skip class or work.`
        assert.equal(result, translator.translateAmericanToBritish(text))
        done()
    })
    test("To British 8", (done)=>{
        let text = "No Mr. Bond, I expect you to die."
        let result = `No <span class="highlight">Mr</span> Bond, I expect you to die.`
        assert.equal(result, translator.translateAmericanToBritish(text))
        done()
    })
    test("To British 9", (done)=>{
        let text = "Dr. Grosh will see you now."
        let result = `<span class="highlight">Dr</span> Grosh will see you now.`
        assert.equal(result, translator.translateAmericanToBritish(text))
        done()
    })
    test("To British 10", (done)=>{
        let text = "Lunch is at 12:15 today."
        let result = `Lunch is at <span class="highlight">12.15</span> today.`
        assert.equal(result, translator.translateAmericanToBritish(text))
        done()
    })
    
    test("To American 1", (done)=>{
        let text = "We watched the footie match for a while."
        let result = `We watched the <span class="highlight">soccer</span> match for a while.`
        assert.equal(result, translator.translateBritishToAmerican(text))
        done()
    })
    test("To American 2", (done)=>{
        let text = "Paracetamol takes up to an hour to work."
        let result = `<span class="highlight">Tylenol</span> takes up to an hour to work.`
        assert.equal(result, translator.translateBritishToAmerican(text))
        done()
    })
    test("To American 3", (done)=>{
        let text = "Tea time is usually around 4 or 4.30."
        let result = `Tea time is usually around 4 or <span class="highlight">4:30</span>.`
        assert.equal(result, translator.translateBritishToAmerican(text))
        done()
    })
    test("To American 4", (done)=>{
        let text = "First, caramelise the onions."
        let result = `First, <span class="highlight">caramelize</span> the onions.`
        assert.equal(result, translator.translateBritishToAmerican(text))
        done()
    })
    test("To American 5", (done)=>{
        let text = "I spent the bank holiday at the funfair."
        let result = `I spent the <span class="highlight">public holiday</span> at the <span class="highlight">carnival</span>.`
        assert.equal(result, translator.translateBritishToAmerican(text))
        done()
    })
    test("To American 6", (done)=>{
        let text = "I had a bicky then went to the chippy."
        let result = `I had a <span class="highlight">cookie</span> then went to the <span class="highlight">fish-and-chip shop</span>.`
        assert.equal(result, translator.translateBritishToAmerican(text))
        done()
    })

    test("To American 7", (done)=>{
        let text = "I've just got bits and bobs in my bum bag."
        let result = `I've just got <span class="highlight">odds and ends</span> in my <span class="highlight">fanny pack</span>.`
        assert.equal(result, translator.translateBritishToAmerican(text))
        done()
    })
    test("To American 8", (done)=>{
        let text = "The car boot sale at Boxted Airfield was called off."
        let result = `The <span class="highlight">swap meet</span> at Boxted Airfield was called off.`
        assert.equal(result, translator.translateBritishToAmerican(text))
        done()
    })
    test("To American 9", (done)=>{
        let text = "Have you met Mrs Kalyani?"
        let result = `Have you met <span class="highlight">Mrs.</span> Kalyani?`
        assert.equal(result, translator.translateBritishToAmerican(text))
        done()
    })
    test("To American 10", (done)=>{
        let text = "Prof Joyner of King's College, London."
        let result = `<span class="highlight">Prof.</span> Joyner of King's College, London.`
        assert.equal(result, translator.translateBritishToAmerican(text))
        done()
    })
    test("Test Highlight 1", (done)=>{
        let text = "Mangoes are my favorite fruit."
        let highlight = "favourite"
        let pattern = new RegExp(`(?<=<span class="highlight">)${highlight}(?=<\/span>)`)
        assert.equal(highlight, translator.translateAmericanToBritish(text).match(pattern)[0])
        done()
    })
    test("Test Highlight 2", (done)=>{
        let text = "I ate yogurt for breakfast."
        let highlight = "yoghurt"
        let pattern = new RegExp(`(?<=<span class="highlight">)${highlight}(?=<\/span>)`)
        assert.equal(highlight, translator.translateAmericanToBritish(text).match(pattern)[0])
        done()
    })
    test("Test Highlight 3", (done)=>{
        let text = "We watched the footie match for a while."
        let highlight = "soccer"
        let pattern = new RegExp(`(?<=<span class="highlight">)${highlight}(?=<\/span>)`)
        assert.equal(highlight, translator.translateBritishToAmerican(text).match(pattern)[0])
        done()
    })
    test("Test Highlight 4", (done)=>{
        let text = "Paracetamol takes up to an hour to work."
        let highlight = "Tylenol"
        let pattern = new RegExp(`(?<=<span class="highlight">)${highlight}(?=<\/span>)`)
        assert.equal(highlight, translator.translateBritishToAmerican(text).match(pattern)[0])
        done()
    })
    
});
