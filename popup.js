document.getElementById('highlightBtn').addEventListener('click', function() {
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        chrome.scripting.executeScript({
            target: {tabId: tabs[0].id},
            function: highlightText
        });
    });
});

function highlightText() {
    const selection = window.getSelection();
    const selectedText = selection.toString();
    if (selectedText.length > 0) {
        let span = document.createElement('span');
        span.style.backgroundColor = 'yellow';
        span.textContent = selectedText;

        let range = selection.getRangeAt(0);
        range.deleteContents();
        range.insertNode(span);
    }
}
