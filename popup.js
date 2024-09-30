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
    phone: "18182051090",
    company: "ABC",
    city: "California",
    state: "New York",
    state_ABv: "NY",
    zipcode: "10325",
    country: "United states",
    country_ABV: "USA",
    location: "New york, NY, USA",
    Address: "2393 Creekside Drive, Coplay, Pennsylvania, USA, 18037",
    password: "SecurePassword123!",
    LinkedIn_url: "https://www.linkedin.com/in/haroon-ahmed-832594272/",
    website: "www.website.com",
    cnic_number: "12345-6789101-1",
    date_of_birth: "09-28-2024",
    pronouns: "He/him",
    authorization: "Yes",
    sponsorship: "No",
    gender: "male",
    Are_you_Hispanic_or_Latino: "No",
    race: "asian",
    veteran_status: "No",
    diability: "no",
    How_did_you_hear_about_us: "Linkedin",
    job_title: "account Executive",
    job_location: "Mirpur ajk",
    Description: "i was working on.....",
    school_university: "Must Uni",
    headline: "hey, i am.......",
    salary: "50000",
  };

  function setInputValue(selector, value) {
    var input = document.querySelector(selector);
    if (input) {
      if (input.type === "radio") {
        if (input.value === value) {
          input.checked = true;
          input.dispatchEvent(new Event("change", { bubbles: true }));
        }
      } else {
        input.value = value;
        input.dispatchEvent(new Event("input", { bubbles: true }));
      }
    }
  }

  setInputValue('input[name="cards[1bf0710b-bbcd-46b7-85a4-a6147be8ac64][field0]"]', 'I am located and authorized to work in the U.S, and do NOT live in NY, CA, or HI.')

  // set full name
  setInputValue(
    'input[type="text"][name="name"], input[type="text"][data-automation-id="legalNameSection_fullName"]',
    defaults.full_name
  );

  // set first name
  setInputValue(
    'input[type="text"][name="firstname"], input[type=text][name="job_application[first_name]"], input[type="text"][data-automation-id="legalNameSection_firstName"], input[aria-label="First Name"], input[name="firstName"], input[name="orV2-uLNL"], input[name="lxM5Vy11s"]',
    defaults.first_name
  );

  // set Preferred name
  setInputValue(
    'input[aria-label="What is your preferred name?"]',
    defaults.preferred_name
  );

  // set last name
  setInputValue(
    'input[type="text"][name="lastname"], input[type=text][name="job_application[last_name]"], input[type="text"][data-automation-id="legalNameSection_lastName"], input[aria-label="Last Name"], input[name="lastName"], input[name="GTdQz2MZO3"], input[name="uBdtFTtnml"]',
    defaults.last_name
  );

  // set email
  setInputValue(
    'input[type="email"][name="email"], input[type="text"][autocomplete="email"], input[aria-label="Email"], input[name="vO84ELKo1D"]',
    defaults.email
  );

  setInputValue('input[type="text"][name="email"]', defaults.email);

  // set phone
  setInputValue(
    'input[type="text"][name="phone"], input[type="text"][autocomplete="tel"],input[type="tel"][name="phone"], input[type="text"][data-automation-id="phone-number"], input[aria-label="Phone"], input[name="phoneNumber"], input[name="jVE7d2VWz8"]',
    defaults.phone
  );

  // set company
  setInputValue(
    'input[type="text"][name="org"], input[type="text"][data-automation-id="company"], input[aria-label="Where have you most recently worked?"], input[name="J05B4qc7Lw"]',
    defaults.company
  );

  // set job title
  setInputValue(
    'input[type="text"][data-automation-id="jobTitle"]',
    defaults.job_title
  );

  // set job location
  setInputValue(
    'input[type="text"][data-automation-id="location"]',
    defaults.job_location
  );

  // set location
  setInputValue(
    'input[type="text"][name="location"], input[type="text"][name="job_application[location]"], input[aria-label="Location"], input[name="q_cdf62a768c632854841cfa5e558cfe3c"], input[type="text"][name="address"], input[name="4O1zB1L7tr"]',
    defaults.location
  );

  // set linkedin url
  setInputValue(
    'input[type="text"][name="urls[LinkedIn]"], input[autocomplete="custom-question-linkedin-profile"], input[type="text"][data-automation-id="linkedinQuestion"], input[aria-label="LinkedIn Profile"], input[type="text"][name="linkedinUrl"], input[name="NQLvK1Rt9V"]',
    defaults.LinkedIn_url
  );

  // set website
  setInputValue(
    'input[aria-label="Website"], input[type="text"][name="websiteUrl"], input[name="VK5Ejth3u0"]',
    defaults.website
  );

  // set headline
  setInputValue('input[name="headline"]', defaults.headline);

  // set password
  setInputValue('input[type="password"][name="password"]', defaults.password);

  // set CNIC Number
  setInputValue(
    'input[type="text"][autocomplete="custom-question-cnic-number"]',
    defaults.cnic_number
  );

  // set date_of_birth
  setInputValue(
    'input[type="text"][autocomplete="custom-question-date-of-birth"]',
    defaults.date_of_birth
  );

  // set Address
  setInputValue(
    'input[type="text"][data-automation-id="addressSection_addressLine1"], Input[name="location.address"]',
    defaults.Address
  );

  // set City
  setInputValue(
    'input[type="text"][data-automation-id="addressSection_city"], input[name="location.unknownLocation"], input[name="q_f9b680442a593a9db0199438ba40f1fe"], input[id="candidate-location"]',
    defaults.city
  );

  // set select state
  setInputValue('input[id="question_28331814002"]', defaults.state);

  // set Zipcode
  setInputValue(
    'input[type="text"][data-automation-id="addressSection_postalCode"], input[name="location.postalCode"], input[name="q_1c26d5262c4fa424ce825510e8501b20"]',
    defaults.zipcode
  );

  // set Description
  setInputValue(
    'input[type="text"][data-automation-id="description"]',
    defaults.Description
  );

  // set School/University
  setInputValue(
    'input[type="text"][data-automation-id="school"]',
    defaults.school_university
  );

  // set salary
  setInputValue(
    'input[name="q_14cb4cd95f61ba7ff368dd43567dc41a"], input[type="text"][data-ui="QA_8807074"]',
    defaults.salary
  );

  // set pronouns
  setInputValue(
    'input[aria-label="What pronouns do you use?"], input[name="upbRDOYe4w"]',
    defaults.pronouns
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
