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
    const exampleData = {
      fullName: "John Doe",
      firstName: "John",
      lastName: "Doe",
      gender: "Male",
      email: "john.doe@example.com",
      phone: "(111) 111-1111",
      preferredName: "John",
      city: "New York",
      state: "New York",
      state_abv: "NY",
      zipcode: "10325",
      country: "United States",
      countryAbv: "USA",
      location: "New york, NY, USA",
      Address: "2393 Creekside Drive, Coplay, Pennsylvania, USA, 18037",
      password: "SecurePassword123!",
      linkedIn: "https://www.linkedin.com/in/john/",
      website: "www.website.com",
      cnicNumber: "12345-6789101-1",
      dateOfBirth: "09-28-2024",
      pronouns: "He/him",
      authorization: "Yes",
      sponsorship: "No",
      race: "Asian",
      veteran: "No",
      diability: "No",
      hearAboutUs: "Linkedin",
      jobTitle: "Account Executive",
      jobLocation: "New York",
    };

    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
      let activeTabId = tabs[0].id;

      // Execute the script in the active tab
      chrome.scripting.executeScript({
        target: { tabId: activeTabId },
        function: autoFillForm,
        args: [exampleData],
      });
    });
  });
}

function autoFillForm(data) {
  const inputMappings = {
    fullName: /^(full[_ ]?name|name)$/i,
    firstName: /first[_ ]?name/i,
    lastName: /last[_ ]?name/i,
    gender: /gender/i,
    email: /email/i,
    phone: /phone/i,
    preferredName: /preferred[_ ]?name/i,
    city: /city/i,
    state: /state/i,
    zipcode: /zipcode/i,
    country: /country/i,
    location: /location/i,
    address: /address/i,
    password: /password/i,
    linkedIn: /linkedin/i,
    website: /website/i,
    cnicNumber: /cnic[_ ]?number/i,
    dateOfBirth: /date[_ ]?of[_ ]?birth/i,
    pronouns: /pronouns/i,
    authorization: /authorization/i,
    sponsorship: /sponsorship/i,
    race: /race/i,
    veteran: /veteran/i,
    disability: /disability/i,
    hearAboutUs: /hear[_ ]?about[_ ]?us/i,
    jobTitle: /job[_ ]?title/i,
    jobLocation: /job[_ ]?location/i,
  };

  const inputs = document.querySelectorAll("input, select, textarea");

  inputs.forEach((input) => {
    let labelText = "";

    // Get associated label text from <label> elements
    if (input.id) {
        const label = document.querySelector(`label[for="${input.id}"]`);
        if (label) labelText = label.textContent;
    }

    // If no label found, check for aria-labelledby
    if (!labelText && input.hasAttribute('aria-labelledby')) {
        const ariaLabelledbyIds = input.getAttribute('aria-labelledby').split(' ');
        const labels = ariaLabelledbyIds.map(id => document.getElementById(id)).filter(label => label);
        labelText = labels.map(label => label.textContent).join(' ');
    }

    // If still no label, check for aria-describedby
    if (!labelText && input.hasAttribute('aria-describedby')) {
        const ariaDescribedbyIds = input.getAttribute('aria-describedby').split(' ');
        const descriptions = ariaDescribedbyIds.map(id => document.getElementById(id)).filter(desc => desc);
        labelText += descriptions.map(desc => desc.textContent).join(' ');
    }

    // If still no label, check placeholder
    if (!labelText && input.placeholder) {
        labelText = input.placeholder;
    }

    // Determine type and fill data
    for (const [key, pattern] of Object.entries(inputMappings)) {
      if (pattern.test(labelText) || pattern.test(input.name)) {
        input.value = data[key];
        input.dispatchEvent(new Event("input", { bubbles: true }));
        break;
      }
    }
  });
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
