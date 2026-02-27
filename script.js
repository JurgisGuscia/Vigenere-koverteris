var dictionary = null;

function generateDictionaries() {
  const forward = {};
  const reverse = {};

  for (let i = 32; i <= 126; i++) {
    const char = String.fromCharCode(i);
    const value = i - 32;   // 0..94

    forward[char] = value;
    reverse[value] = char;
  }

  return { forward, reverse };
}

function parse(key){
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

function getKeyByValue(value) {
  return Object.keys(dictionary).find(key => dictionary[key] === value);
}

function convertLetter(letter, factor){
    let newLetterNumber = dictionary[letter] + dictionary[factor];

    newLetterNumber = newLetterNumber % 95;
    return getKeyByValue(newLetterNumber);
}

function scramble(messageText, codeKey){
    if(!dictionary){
        const { dictionary, reverseDictionary } = generateDictionaries();
    }
    scrambledTextArray.length = 0;
    const key = parse(codeKey);
    const text = parse(messageText);
    const keyCounter = createArrayCounter(key);
    text.forEach(letter => {
        let keyFactor = keyCounter();
        scrambledTextArray.push(convertLetter(letter, keyFactor));     
    });
    const finalText = scrambledTextArray.join("");
    return finalText;
}
