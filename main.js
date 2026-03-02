    const expandedCheckBox = document.getElementById("expanded");
    const textInput = document.getElementById("textInput");
    const keyInput = document.getElementById("keyInput");
    const scrambleBtn = document.getElementById("scrambleBtn");
    const decodeBtn = document.getElementById("decodeBtn");
    var dictionary = null;
    var reverseDictionary = null;
    const standartDict = ["A","B","C","D","E","F","G","H","I","J","K","L",
                        "M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z"];
    
    const { forwardDict, reverseDict } = generateDictionaries();
    dictionary = forwardDict;
    reverseDictionary = reverseDict;
    updateDictDisplay();
    scrambleBtn.addEventListener("click", function () {
        var sourceText = textInput.value;
        const sourceInput = keyInput.value;
        if(!expandedCheckBox.checked){
            sourceText = sourceText.toUpperCase();
        }
        scramble(sourceText, sourceInput);
    });

    document.getElementById("expanded").addEventListener("change", function(){
        document.getElementById("keyInput").value = "";
        updateDictDisplay();
        updateButtonState();
    })

    decodeBtn.addEventListener("click", () => {
        decode(textInput.value, keyInput.value);
    });

    function updateDictDisplay() {
        const dictDisplay = document.getElementById("dictList");
        const letters = !expandedCheckBox.checked
            ? standartDict
            : Object.keys(dictionary);  
        dictDisplay.innerHTML = letters
            .map(letter => `<span class="dictItem">${letter}</span>`)
            .join(", ");
    }