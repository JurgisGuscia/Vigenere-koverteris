var dictionary = null;
var reverseDictionary = null;

function generateDictionaries() {
  const forwardDict = {};
  const reverseDict = {};
  for (let i = 32; i <= 126; i++) {
    const char = String.fromCharCode(i);
    const value = i - 32; 

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

function convertLetterStandart(dict, letter, factor) {
    const L = letter.toUpperCase();
    const F = factor.toUpperCase();
    const p = dict.indexOf(L);
    const k = dict.indexOf(F);
    if (p === -1 || k === -1) return letter; 
    const newLetterNumber = (p + k) % 26;
    const out = dict[newLetterNumber];
    return letter === letter.toLowerCase() ? out.toLowerCase() : out;
}

function convertLetter(dict, reverseDict, letter, factor) {
    if (dict[letter] === undefined || dict[factor] === undefined || letter === " ") {
        return letter; 
    }
    let newLetterNumber = dict[letter] + dict[factor];
    newLetterNumber = newLetterNumber % 95;
    return reverseDict[newLetterNumber];
}

function scramble(messageText, codeKey) {
    const mode = document.getElementById("expanded");
    const { forwardDict, reverseDict } = generateDictionaries();
    dictionary = forwardDict;
    reverseDictionary = reverseDict;
    
    const key = parse(codeKey);
    const text = parse(messageText);
    const keyCounter = createArrayCounter(key);
    const scrambledTextArray = [];
    for (const letter of text) {
        if (mode.checked) {
            if (letter === " ") {
            scrambledTextArray.push(letter);
            continue;
            }
            const keyFactor = keyCounter();
            scrambledTextArray.push(convertLetter(dictionary, reverseDictionary, letter, keyFactor));
        } else {
            const upper = letter.toUpperCase();
            if (!standartDict.includes(upper)) {
                scrambledTextArray.push(letter);
                continue;
            }
            const keyFactor = keyCounter();
            scrambledTextArray.push(convertLetterStandart(standartDict, letter, keyFactor));
        }
    }   

    document.getElementById("output").textContent = scrambledTextArray.join("");
}

function decodeLetter(dict, reverseDict, letter, factor) {
    if (letter === " ") return letter; 
    if (dict[letter] === undefined || dict[factor] === undefined) return letter;

    let n = dict[letter] - dict[factor];
    n = (n + 95) % 95;
    return reverseDict[n];
}

function decode(messageText, codeKey) {
    const mode = document.getElementById("expanded");
    const { forwardDict, reverseDict } = generateDictionaries();

    const key = parse(codeKey);
    const text = parse(messageText);
    const keyCounter = createArrayCounter(key);

    const out = [];
    for (const letter of text) {
        if (mode.checked) {
            if (letter === " ") {
                out.push(letter);
                continue;
            }
            const keyFactor = keyCounter();
            out.push(decodeLetter(forwardDict, reverseDict, letter, keyFactor));
        } else {
            const upper = letter.toUpperCase();
            if (!standartDict.includes(upper)) {
                out.push(letter);
                continue;
            }
            const keyFactor = keyCounter();
            out.push(decodeLetterStandart(standartDict, letter, keyFactor));
        }
    }

    document.getElementById("output").textContent = out.join("");
}

function decodeLetterStandart(dict, letter, factor) {
    const L = letter.toUpperCase();
    const F = factor.toUpperCase();
    const c = dict.indexOf(L);
    const k = dict.indexOf(F);
    if (c === -1 || k === -1) return letter;
    const p = (c - k + 26) % 26;
    const out = dict[p];
    return letter === letter.toLowerCase() ? out.toLowerCase() : out;
}



