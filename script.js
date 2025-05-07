
function startReading() {
    const container = document.getElementById('readerContainer');
    container.innerHTML = '';
    const inputText = document.getElementById('textInput').value;
    const words = inputText.trim().split(/\s+/);
    let index = 0;

    function showNextWord() {
        if (index < words.length) {
            const wordElement = document.createElement('div');
            wordElement.className = 'word';
            wordElement.textContent = words[index];
            container.appendChild(wordElement);
            index++;
            setTimeout(showNextWord, 300);
        }
    }

    showNextWord();
}
