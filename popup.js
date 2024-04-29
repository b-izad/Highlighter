document.getElementById('highlightBtn').addEventListener('click', function() {
    const color = document.getElementById('colorPicker').value; // Get the selected color from dropdown
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        chrome.scripting.executeScript({
            target: {tabId: tabs[0].id},
            function: highlightText,
            args: [color] // Pass the selected color to the function
        });
    });
});

// Ensure the function highlightText is accessible to this script
function highlightText(color) {
    const selection = window.getSelection();
    const selectedText = selection.toString();
    if (selectedText.length > 0) {
        let span = document.createElement('span');
        span.style.backgroundColor = color; // Use the passed color
        span.textContent = selectedText;

        let range = selection.getRangeAt(0);
        range.deleteContents();
        range.insertNode(span);
    }
}
