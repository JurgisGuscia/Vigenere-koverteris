var dictionary = null;
const scrambledTextArray = [];

function generateDictionary(){
    const dictionary = {};
    for (let i = 32; i <= 126; i++) {
        dictionary[String.fromCharCode(i)] = i - 32;
    }
    return dictionary;
}

function parce(key){
    return key.split("");
}

function createArrayCounter(array) {
    let index = 0;
    return function () {
        const value = array[index];
        index = (index + 1) % array.length;
        return value;
    };
}

function convertLetter(letter, factor){
    
}

function scramble(messageText, codeKey){
    !dictionary && (dictionary = generateDictionary());
    const key = parce(codeKey);
    const text = parce(messageText);
    const keyCounter = createArrayCounter(key);
    text.forEach(letter => {
        let keyFactor = keyCounter();
        scrambledTextArray.push(convertLetter(letter, dictionary.keyFactor));
    });
}
