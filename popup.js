document.addEventListener("DOMContentLoaded", function () {
  let autoFillBtn = document.getElementById("autoFill");

  // fetch autoFill button
  autoFillBtn.addEventListener("click", () => {
    const data = {
      fullName: "John Doe",
      firstName: "John",
      lastName: "Doe",
      gender: "Male",
      email: "john.doe@example.com",
      phone: "1111111111",
      company: "Microsoft",
      preferredName: "John",
      city: "New York",
      state: "New York",
      state_abv: "NY",
      zipcode: "10325",
      country: "United States of America",
      countryAbv: "USA",
      location: "New York, NY, USA",
      address: "2393 Creekside Drive",
      password: "SecurePassword123!",
      linkedIn: "https://www.linkedin.com/in/john/",
      website: "www.website.com",
      cnicNumber: "12345-6789101-1",
      dateOfBirth: "09-28-2024",
      pronouns: "He/him",
      authorization: "Yes",
      sponsorship: "No",
      race: "White",
      veteran: "Not",
      disability: "No",
      hearaboutus: "Linkedin",
      jobTitle: "Account Executive",
      jobLocation: "New York",
    };

    chrome.tabs.query(
      { active: true, currentWindow: true },
      async function (tabs) {
        let activeTabId = tabs[0].id;

        // Execute the script in the active tab
        await chrome.scripting.executeScript({
          target: { tabId: activeTabId },
          function: autoFillForm,
          args: [data],
        });
      }
    );
  });
});

function autoFillForm(data) {
  const inputMappings = {
    fullName: /^(full[_ ]?name|name)$/i,
    firstName: /first[_ ]?name/i,
    lastName: /last[_ ]?name/i,
    gender: /gender/i,
    email: /email/i,
    phone: /phone/i,
    company: /(company|org|employer)/i,
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
    hearaboutus: /hear[_ ]?about[_ ]?us/i,
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
    if (!labelText && input.hasAttribute("aria-labelledby")) {
      const ariaLabelledbyIds = input
        .getAttribute("aria-labelledby")
        .split(" ");
      const labels = ariaLabelledbyIds
        .map((id) => document.getElementById(id))
        .filter((label) => label);
      labelText = labels.map((label) => label.textContent).join(" ");
    }

    // If still no label, check for aria-describedby
    if (!labelText && input.hasAttribute("aria-describedby")) {
      const ariaDescribedbyIds = input
        .getAttribute("aria-describedby")
        .split(" ");
      const descriptions = ariaDescribedbyIds
        .map((id) => document.getElementById(id))
        .filter((desc) => desc);
      labelText += descriptions.map((desc) => desc.textContent).join(" ");
    }

    // If still no label, check placeholder
    if (!labelText && input.placeholder) {
      labelText = input.placeholder;
    }

    // Handle the "Location" autocomplete input with aria-describedby
    if (input.getAttribute("aria-describedby") === "location-description") {
      input.focus();  // Focus on the input
      input.value = data.location;  // Set the value

      // Simulate typing by dispatching keyboard events
      const events = ["input", "keydown", "keyup", "change"];
      events.forEach(eventType => {
        input.dispatchEvent(new KeyboardEvent(eventType, { bubbles: true, cancelable: true, key: "a" }));
      });
    } else if (input.type === "radio") {
      // Handle radio buttons
      const radioName = input.name;
      if (radioName in data && input.value.toLowerCase() === data[radioName].toLowerCase()) {
        input.checked = true;
        input.dispatchEvent(new Event("change", { bubbles: true }));
      }
      else {
        // Additional logic for radio buttons that do not match
        if (radioName in data && data[radioName].toLowerCase() === "male") {
          // Check if this radio button is for "Male"
          if (input.value.toLowerCase() === "male") {
            input.checked = true;
            input.dispatchEvent(new Event("change", { bubbles: true }));
          }
        }
      }
    } else if (input.type === "checkbox" && input.id === "privacyCheck") {
      // Handle the privacy checkbox
      if (!input.checked) {
        input.click();  // Click to check the checkbox
      }
      input.dispatchEvent(new Event("change", { bubbles: true }));
    } else {
      // Handle other inputs using label or placeholder
      for (const [key, pattern] of Object.entries(inputMappings)) {
        if (pattern.test(labelText) || pattern.test(input.name)) {
          input.value = data[key];
          input.dispatchEvent(new Event("input", { bubbles: true }));
          break;
        }
      }
    }
  });
}
