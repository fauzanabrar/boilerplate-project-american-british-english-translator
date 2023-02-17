const americanOnly = require('./american-only.js');
const americanToBritishSpelling = require('./american-to-british-spelling.js');
const americanToBritishTitles = require("./american-to-british-titles.js")
const britishOnly = require('./british-only.js')

class Translator {

    changeWord(translatedText, mapWord, reverse = false, title = false){
        for(let t of Object.keys(mapWord)){


            let splitText = translatedText.split(" ").map(item => item.toLowerCase())
            if(splitText[splitText.length-1].match(/\.$/)){
                splitText[splitText.length-1] = splitText[splitText.length-1].replace(/\.$/, '')
            }

            if(reverse){

                for(let s = 0; s < splitText.length; s++){

                    if(mapWord[t] == splitText[s]){
                        if(title){
                            translatedText = translatedText.replaceAll(`${mapWord[t]}`, `<span class="highlight">${this.capitlizeText(t)}</span>`)
                            translatedText = translatedText.replaceAll(`${this.capitlizeText(mapWord[t])}`, `<span class="highlight">${this.capitlizeText(t)}</span>`)
                        }else{
                            translatedText = translatedText.replaceAll(`${mapWord[t]}`, `<span class="highlight">${t}</span>`)
                            translatedText = translatedText.replaceAll(`${this.capitlizeText(mapWord[t])}`, `<span class="highlight">${t}</span>`)
                        }

                    }else if(mapWord[t].includes(splitText[s]) && mapWord[t].includes(splitText[s+1])){
                        translatedText = translatedText.replaceAll(`${mapWord[t]}`, `<span class="highlight">${t}</span>`)
                        translatedText = translatedText.replaceAll(`${this.capitlizeText(mapWord[t])}`, `<span class="highlight">${t}</span>`)
                        s += mapWord[t].length - 1

                    }
                }

            }else{

                for(let s = 0; s < splitText.length; s++){
                    
                    if(t == splitText[s]){
                        if(title){
                            translatedText = translatedText.replaceAll(`${t}`, `<span class="highlight">${this.capitlizeText(mapWord[t])}</span>`)
                            translatedText = translatedText.replaceAll(`${this.capitlizeText(t)}`, `<span class="highlight">${this.capitlizeText(mapWord[t])}</span>`)

                        }else {
                            translatedText = translatedText.replaceAll(`${t}`, `<span class="highlight">${mapWord[t]}</span>`)
                            translatedText = translatedText.replaceAll(`${this.capitlizeText(t)}`, `<span class="highlight">${mapWord[t]}</span>`)
                        }

                    }else if(t.includes(splitText[s]) && t.includes(splitText[s+1])){
                        if(t == "rube goldberg machine"){
                            console.log('halo')
                            translatedText = translatedText.replaceAll(`Rube Goldberg machine`, `<span class="highlight">${mapWord[t]}</span>`)
                        }else{
                            translatedText = translatedText.replaceAll(`${t}`, `<span class="highlight">${mapWord[t]}</span>`)
                            translatedText = translatedText.replaceAll(`${this.capitlizeText(t)}`, `<span class="highlight">${mapWord[t]}</span>`)
                        }
                        s += t.length - 1

                    }
                }
                // translatedText = translatedText.replaceAll(` ${t} `, `<span class="highlight">${mapWord[t]}</span>`)
            }
        }
        return translatedText
    }

    translateBritishToAmerican(text){
        let translatedText = text
        
        // console.log(translatedText)
        translatedText = this.changeWord(translatedText, britishOnly)
        // console.log(translatedText)
        // translatedText = this.changeWord(translatedText, americanOnly,true)
        // console.log(translatedText)
        translatedText = this.changeWord(translatedText, americanToBritishSpelling, true)
        // console.log(translatedText)
        translatedText = this.changeWord(translatedText, americanToBritishTitles, true, true)
        // console.log(translatedText)
        translatedText = this.changeTimeBritishToAmerican(translatedText)
        // console.log(translatedText)

        return translatedText
    }

    translateAmericanToBritish(text){
        let translatedText = text

        // translatedText = this.changeWord(translatedText, britishOnly)
        translatedText = this.changeWord(translatedText, americanOnly)
        translatedText = this.changeWord(translatedText, americanToBritishSpelling)
        translatedText = this.changeWord(translatedText, americanToBritishTitles, false, true)
        translatedText = this.changeTimeAmericanToBritish(translatedText)
        // console.log(translatedText)

        return translatedText
    }

    capitlizeText(name) 
    {
        const names = name.split(' ') // ['kouhadi','aboubakr',essaaddik']
        const newCapName = [] // declaring an empty array
        for (const n of names){
            newCapName.push(n.replace(n[0], n[0].toUpperCase()));
        }
        return newCapName.join(' ') 
    }

    changeTimeAmericanToBritish(translatedText){
        
        let pattern = new RegExp("[0-9]?[0-9]\:[0-9]?[0-9]")
        if(pattern.test(translatedText)){
            let change = translatedText.match(pattern)[0]
            let splitted = change.split(":").join(".")
            translatedText = translatedText.replace(change, `<span class="highlight">${splitted}</span>`)
        }
        
        return translatedText
    }

    changeTimeBritishToAmerican(translatedText){

        let pattern = new RegExp("[0-9]?[0-9]\.[0-9]?[0-9]")
        if(pattern.test(translatedText)){
            let change = translatedText.match(pattern)[0]
            let splitted = change.split(".").join(":")
            translatedText = translatedText.replace(change, `<span class="highlight">${splitted}</span>`)
        }

        return translatedText
    }
}

module.exports = Translator;