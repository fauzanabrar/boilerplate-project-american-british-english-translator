const chai = require('chai');
const chaiHttp = require('chai-http');
const assert = chai.assert;
const server = require('../server.js');

chai.use(chaiHttp);

let Translator = require('../components/translator.js');

suite('Functional Tests', () => {
    test("POST /api/translate with valid text and locale fields", (done)=>{
        let text = {
            locale: "american-to-british",
            text: "Mangoes are my favorite fruit."
        }
        chai.request(server).post('/api/translate').type('form').send(text).end((err, res)=>{
            assert.equal(res.status, 200)
            assert.equal(res.body.text, text.text)
            assert.equal(res.body.translation, 'Mangoes are my <span class="highlight">favourite</span> fruit.')
            done()
        })
    })
    test("POST /api/translate with valid text and invalid locale fields", (done)=>{
        let text = {
            locale: "american-to-britishy",
            text: "Mangoes are my favorite fruit."
        }
        chai.request(server).post('/api/translate').type('form').send(text).end((err, res)=>{
            assert.equal(res.status, 200)
            assert.equal(res.body.error, "Invalid value for locale field")
            done()
        })
    })
    test("POST /api/translate with missing text field", (done)=>{
        let text = {
            locale: "american-to-british",
        }
        chai.request(server).post('/api/translate').type('form').send(text).end((err, res)=>{
            assert.equal(res.status, 200)
            assert.equal(res.body.error, "Required field(s) missing")
            done()
        })
    })
    test("POST /api/translate with missing locale field", (done)=>{
        let text = {
            text: "Mangoes are my favorite fruit."
        }
        chai.request(server).post('/api/translate').type('form').send(text).end((err, res)=>{
            assert.equal(res.status, 200)
            assert.equal(res.body.error, "Required field(s) missing")
            done()
        })
    })
    test("POST /api/translate with empty text fields", (done)=>{
        let text = {
            locale: "american-to-british",
            text: ""
        }
        chai.request(server).post('/api/translate').type('form').send(text).end((err, res)=>{
            assert.equal(res.status, 200)
            assert.equal(res.body.error, "No text to translate")
            done()
        })
    })
    test("POST /api/translate with text dont need to translate", (done)=>{
        let text = {
            locale: "american-to-british",
            text: "Mangoes are my favourite fruit."
        }
        chai.request(server).post('/api/translate').type('form').send(text).end((err, res)=>{
            assert.equal(res.status, 200)
            assert.equal(res.body.text, text.text)
            assert.equal(res.body.translation, 'Everything looks good to me!')
            done()
        })
    })
});
