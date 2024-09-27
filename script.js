document.getElementById("getText").addEventListener("click", function() {
    // Send a message to the background script to extract text
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        chrome.scripting.executeScript({
            target: {tabId: tabs[0].id},
            function: extractText
        });
    });
});

function fetchFromDatabase() {
    fetch('C:/xampp/htdocs/ai-answer/fetch_data.php')  // URL to your PHP script
        .then(response => response.json())
        .then(data => {
            console.log(data);  // Handle the fetched data
            alert(JSON.stringify(data));
        })
        .catch(error => console.error('Error fetching data:', error));
}


