const contentDiv = document.getElementById('content');

// Form load
document.addEventListener('DOMContentLoaded', function () {
    // Fetch the index.php content
    fetch('http://localhost/ai-answer/index.php')
        .then(response => response.text())
        .then(data => {
            // Insert the fetched content into the contentDiv
            contentDiv.innerHTML = data;
            contentDiv.classList.add('form-width');

            // load users
            loadAllUsers();

            // Attach event listeners
            attachEventListeners();
        })
        .catch(error => {
            console.error('Error fetching PHP content:', error);
            contentDiv.innerHTML = 'Failed to load content.';
        });
});

// load users list

function loadAllUsers() {
    fetch('http://localhost/ai-answer/fetch_data.php')
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            // Reference to the select element
            const userSelect = document.getElementById('userSelect');

            // Clear existing options
            userSelect.innerHTML = '';

            // Create an initial empty option
            const emptyOption = document.createElement('option');
            emptyOption.value = '';
            emptyOption.textContent = 'Select a user';
            userSelect.appendChild(emptyOption);

            // Loop through the data and create option elements
            data.forEach(user => {
                const option = document.createElement('option');
                option.value = user.id;
                option.textContent = user.name;
                userSelect.appendChild(option);
            });
        })
        .catch(error => {
            console.error('Error fetching data:', error);
        });
}

// Function to attach event listeners
function attachEventListeners() {
    // get text button
    document.getElementById('getText').addEventListener('click', function () {
        console.log("Fetch text button clicked");
    });

    // fetch db button
    document.getElementById('fetchDB').addEventListener('click', function () {
        console.log("Fetch from database button clicked");
        fetchDataFromDatabase();
    });
}

function fetchDataFromDatabase() {
    fetch('http://localhost/ai-answer/fetch_data.php')
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json(); // Expecting JSON response
        })
        .then(data => {
            displayData(data); // Call the function to display the data
        })
        .catch(error => {
            console.error('Error fetching data:', error);
        });
}

function displayData(data) {
    const contentDiv = document.getElementById('users-list');
    contentDiv.innerHTML = ''; // Clear previous content

    if (data.length === 0) {
        contentDiv.innerHTML = '<p>No data found.</p>';
        return;
    }

    data.forEach(item => {
        const div = document.createElement('div');
        div.textContent = JSON.stringify(item); // Customize how you want to display the data
        contentDiv.appendChild(div);
    });
}
