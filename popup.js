const contentDiv = document.getElementById("content");

// Form load
document.addEventListener("DOMContentLoaded", function () {
  // Fetch the index.php content
  fetch("http://localhost/ai-answer/index.php")
    .then((response) => response.text())
    .then((data) => {
      // Insert the fetched content into the contentDiv
      contentDiv.innerHTML = data;
      contentDiv.classList.add("form-width");

      // load users
      loadAllUsers();

      // Attach event listeners
      attachEventListeners();
    })
    .catch((error) => {
      console.error("Error fetching PHP content:", error);
      contentDiv.innerHTML = "Failed to load content.";
    });
});

// load users list

function loadAllUsers() {
  fetch("http://localhost/ai-answer/fetch_data.php")
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    })
    .then((data) => {
      // Reference to the select element
      const userSelect = document.getElementById("userSelect");

      // Clear existing options
      userSelect.innerHTML = "";

      // Create an initial empty option
      const emptyOption = document.createElement("option");
      emptyOption.value = "";
      emptyOption.textContent = "Select a user";
      userSelect.appendChild(emptyOption);

      // Loop through the data and create option elements
      data.forEach((user) => {
        const option = document.createElement("option");
        option.value = user.id;
        option.textContent = user.name;
        userSelect.appendChild(option);
      });
    })
    .catch((error) => {
      console.error("Error fetching data:", error);
    });
}

// Function to attach event listeners
function attachEventListeners() {
  let getTextBtn = document.getElementById("getText");
  let autoFillBtn = document.getElementById("autoFill");

  // get text button
  
  getTextBtn.addEventListener("click", function () {
    console.log("Fetch text button clicked");
  });

  // fetch autoFill button
  autoFillBtn.addEventListener("click", () => {
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
      let activeTabId = tabs[0].id;

      // Execute the script in the active tab
      chrome.scripting.executeScript({
        target: { tabId: activeTabId },
        function: fillForm,
      });
    });
  });
}

function fillForm() {
  var defaults = {
    name: "Haroon Ahmed",
    full_name: "Haroon Ahmed",
    preferred_name: "Haroon Ahmed",
    first_name: "Haroon",
    last_name: "Ahmed",
    email: "haroon@example.com",
    phone: "1234567890",
    city: "new york",
    state: "New york",
    state_ABv: "NY",
    zipcode: "10325",
    country: "United states",
    country_ABV: "USA",
    location: "New york, NY, USA",
    Address: "2393 Creekside Drive, Coplay, Pennsylvania, USA, 18037",
    password: "SecurePassword123!",
    LinkedIn_url: "www.linkedin.com",
    pronouns: "He/him",
    authorization: "Yes",
    sponsorship: "No",
    gender: "male",
    Are_you_Hispanic_or_Latino: "No",
    race: "asian",
    veteran_status: "No",
    diability: "no",
    How_did_you_hear_about_us: "Linkedin",
  };

  function setInputValue(selector, value) {
    var input = document.querySelector(selector);
    if (input) {
      input.value = value;
      input.dispatchEvent(new Event("input", { bubbles: true }));
    }
  }

  // set full name
  setInputValue(
    'input[type="text"][name="name"]',
    defaults.full_name
  );

  // set first name
  setInputValue(
    'input[type="text"][name="firstname"], input[type=text][name="job_application[first_name]"]',
    defaults.first_name
  );

  // set last name
  setInputValue(
    'input[type="text"][name="lastname"], input[type=text][name="job_application[last_name]"',
    defaults.last_name
  );

  // set email
  setInputValue(
    'input[type="email"][name="email"]',
    defaults.email
  );

  // set phone
  setInputValue(
    'input[type="tel"][name="phone"], input[type="text"][name="phone"]',
    defaults.phone
  );

  // set location
  setInputValue(
    'input[type="text"][name="location"]',
    defaults.location
  );

  // set linkedin url
  setInputValue(
    'input[type="text"][name="urls[LinkedIn]"], input[autocomplete="custom-question-linkedin-profile"]',
    defaults.LinkedIn_url
  );

  // set password
  setInputValue(
    'input[type="password"][name="password"]',
    defaults.password
  );
}

function fetchDataFromDatabase() {
  fetch("http://localhost/ai-answer/fetch_data.php")
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json(); // Expecting JSON response
    })
    .then((data) => {
      displayData(data); // Call the function to display the data
    })
    .catch((error) => {
      console.error("Error fetching data:", error);
    });
}

function displayData(data) {
  const contentDiv = document.getElementById("users-list");
  contentDiv.innerHTML = ""; // Clear previous content

  if (data.length === 0) {
    contentDiv.innerHTML = "<p>No data found.</p>";
    return;
  }

  data.forEach((item) => {
    const div = document.createElement("div");
    div.textContent = JSON.stringify(item); // Customize how you want to display the data
    contentDiv.appendChild(div);
  });
}
