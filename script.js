document.getElementById("getText").addEventListener("click", function() {
    // Send a message to the background script to extract text
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        chrome.scripting.executeScript({
            target: {tabId: tabs[0].id},
            function: extractText
        });
    });
});

document.getElementById("fetchDB").addEventListener("click", function() {
    // Connect to remote database and fetch some data
    fetchFromDatabase();
});

// Function to extract text from the current page
function extractText() {
    let bodyText = document.body.innerText;
    alert(bodyText);  // Replace this with your handling logic
}

// Function to fetch from a remote database
function fetchFromDatabase() {
    // Replace this URL with your actual database endpoint
    fetch('https://your-database-endpoint.com/api/data')
        .then(response => response.json())
        .then(data => alert(JSON.stringify(data)))
        .catch(error => console.error('Error fetching data:', error));
}
