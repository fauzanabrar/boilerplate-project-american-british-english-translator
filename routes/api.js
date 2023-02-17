'use strict';

const Translator = require('../components/translator.js');

module.exports = function (app) {
  
  const translator = new Translator();

  app.route('/api/translate')
    .post((req, res) => {
      let locale = req.body.locale
      let text = req.body.text

      if(text == undefined || locale == undefined){
        return res.json({
          error: "Required field(s) missing"
        })
      }

      if(text == ""){
        return res.json({
          error: "No text to translate"
        })
      }

      if(locale == "american-to-british"){
        let translation = translator.translateAmericanToBritish(text)

        if(text === translation){
          return res.json({
            text,
            translation: "Everything looks good to me!"
          })
        }

        return res.json({
          text,
          translation
        })
      }else if(locale == "british-to-american"){
        let translation = translator.changeTimeBritishToAmerican(text)

        if(text === translation){
          return res.json({
            text,
            translation: "Everything looks good to me!"
          })
        }

        return res.json({
          text,
          translation
        })

      }else {
        return res.json({
          error: "Invalid value for locale field"
        })
      }

    });
};
