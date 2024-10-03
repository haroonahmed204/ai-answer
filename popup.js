document.addEventListener("DOMContentLoaded", function () {
  let autoFillBtn = document.getElementById("autoFill");

  // fetch autoFill button
  autoFillBtn.addEventListener("click", async () => {
    const data = {
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
      address: "2393 Creekside Drive, Coplay, Pennsylvania, USA, 18037",
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

async function autoFillForm(data) {
  async function analyzeTextWithAI(text) {
    const prompt = `
    Analyze the following text and return only the corresponding key 
    from the list below. Please provide only the key, without any additional 
    text or explanation.
    
    Keys to consider: 
    - fullName
    - firstName
    - lastName
    - gender
    - email
    - phone
    - preferredName
    - city
    - state
    - zipcode
    - country
    - location
    - address
    - password
    - linkedIn
    - website
    - cnicNumber
    - dateOfBirth
    - pronouns
    - authorization
    - sponsorship
    - race
    - veteran
    - disability
    - hearAboutUs
    - jobTitle
    - jobLocation
    
    Here is the text to analyze: "${text}"
  `;

    try {
      const response = await fetch(
        "https://api-inference.huggingface.co/models/mistralai/Mistral-7B-Instruct-v0.3",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer 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`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            inputs: prompt,
            parameters: { return_full_text: false },
          }),
        }
      );

      if (!response.ok) {
        throw new Error(`Error: ${response.status} - ${response.statusText}`);
      }

      const data = await response.json();

      console.log(
        "AI Response for the " + text + " is " + JSON.stringify(data, null, 2)
      );

      return data;
    } catch (error) {
      console.error("Failed to analyze text with AI:", error);
      return null;
    }
  }

  const inputs = document.querySelectorAll("input, select, textarea");

  for (const input of inputs) {
    console.log("Input: " + input);

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

    // Call the AI function to analyze the text
    try {
      console.log("Label text: " + labelText);
      const aiResponse = await analyzeTextWithAI(labelText);
      console.log("AI Response II:", aiResponse[0]?.generated_text);

      // Extract key from AI response
      const keyToFill = aiResponse[0]?.generated_text?.replace(/"/g, '').trim() || null;

      console.log("Available keys in data:", Object.keys(data));
      console.log("Extracted key to fill:", keyToFill);

      if (keyToFill && data[keyToFill]) {
        input.value = data[keyToFill];
        input.dispatchEvent(new Event("input", { bubbles: true }));
        console.log(
          `Setting ${keyToFill} to ${data[keyToFill]} for input with label ${labelText}`
        );
      } else {
        console.warn(`No valid key found for label: ${labelText}`);
      }
    } catch (error) {
      console.error(`Failed to analyze text for label: ${labelText}`, error);
    }
  }
}
