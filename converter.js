var dictionary = null;
var reverseDictionary = null;

function generateDictionaries() {
  const forwardDict = {};
  const reverseDict = {};
  for (let i = 32; i <= 126; i++) {
    const char = String.fromCharCode(i);
    const value = i - 32;   // 0..94

    forwardDict[char] = value;
    reverseDict[value] = char;
  }
  return { forwardDict, reverseDict };
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

function convertLetter(dict, reverseDict, letter, factor){
    let newLetterNumber = dict[letter] + dict[factor];
    newLetterNumber = newLetterNumber % 95;
    return reverseDict[newLetterNumber];
}

function scramble(messageText, codeKey){
    let scrambledTextArray = [];
    if(!dictionary){
        const { forwardDict, reverseDict } = generateDictionaries();
        dictionary = forwardDict;
        reverseDictionary = reverseDict;
    }
    const key = parse(codeKey);
    const text = parse(messageText);
    const keyCounter = createArrayCounter(key);
    text.forEach(letter => {
        let keyFactor = keyCounter();
        scrambledTextArray.push(convertLetter(dictionary, reverseDictionary, letter, keyFactor));     
    });
    const finalText = scrambledTextArray.join("");
    return finalText;
}



