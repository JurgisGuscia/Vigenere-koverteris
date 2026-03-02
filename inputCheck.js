function filterPrintableASCII(value) {
  let result = "";
  for (let i = 0; i < value.length; i++) {
    const code = value.charCodeAt(i);
    if (code >= 32 && code <= 126) {
      result += value[i];
    }
  }
  return result;
}

textInput.addEventListener("input", function () {
  const filtered = filterPrintableASCII(this.value);
  if (this.value !== filtered) {
    this.value = filtered;
  }
});

keyInput.addEventListener("input", function () {
  if (!expandedCheckBox.checked) {
    const upper = this.value.toUpperCase();
    this.value = upper
      .split("")
      .filter(ch => standartDict.includes(ch))
      .join("");
  } else {
    this.value = this.value.replace(/[^\x20-\x7E]/g, "");
  }
});

function updateButtonState() {
  const enabled = textInput.value !== "" && keyInput.value !== "";
  scrambleBtn.disabled = !enabled;
  decodeBtn.disabled = !enabled;
}

textInput.addEventListener("input", updateButtonState);
keyInput.addEventListener("input", updateButtonState);

updateButtonState();