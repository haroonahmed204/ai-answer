document.addEventListener("DOMContentLoaded", function () {
  let autoFillBtn = document.getElementById("autoFill");

  // Sample resume data (you can replace it with dynamically loaded data)
  const resumeData = {
    fisrtname: "John",
    lastname: "Doe",
    email: "john.doe@example.com",
    password: "pakistan11",
    phone: "7083635912",
    preferredName: "John",
    Address_Line_1: "870 W 181st",
    city: "New York",
    state: "NY",
    zipcode: "10033",
    country: "United States",
    linked_In_profile: "https://www.linkedin.com/in/john-doe-97044611/",
    website: "https://www.website.com/in/john-doe/",
    pronouns: "He/Him",
    age: '29',
    authorization: "Yes",
    sponsorship: "No",
    race: "white",
    veteran: "No",
    diability: "No",
    authorized: 'yes',
    sponsorship: "No",
    US_residence: 'Yes', 
    hearAboutUs: "Linkedin",
    company: "Candidateside",
    Title: "Frontend Developer",
    // workExperience: [{
    //   // 'jobTitle': 'Frontend Developer',
    //   // 'company': 'Candidateside',
    //   // 'location': 'New York, NY',
    //   // 'from': '09/2023',
    //   // 'to': '10/2024',
    //   'role description': `i am frontend engineer and i have 10 years of experience in frontend development.`,
    // }],
    // // workExperience_2: [{
    // //   'jobTitle': 'consultant',
    // //   'company': 'Candidate',
    // //   'location': 'Nyack, NY',
    // //   'from': '09/2021',
    // //   'to': '10/2023',
    // //   'role description': `lsdhfljdskhflkjds
    // //   asdkhgfkahdsfkadshbvfkhadbsfkhadskfhbadskfhbbewdg owyegouiy3e07 2 uqwgoyt 32087
    // //   asdh gq96rt327 qgwdoubiQTF78 DOqgwdo  qtwy d0`,
    // // }],
    skills: ["JavaScript", "Python", "React", "Node.js"],
    education: {
      degree: "Bachelor of Science in Computer Science",
      university: "Mirpur University",
      graduationYear: "2019",
    },
    certifications: ["AWS Certified Developer"],
    languages: ["English", "Spanish"],
  };

  // Button click event to trigger autofill
  autoFillBtn.addEventListener("click", async () => {
    chrome.tabs.query(
      { active: true, currentWindow: true },
      async function (tabs) {
        let activeTabId = tabs[0].id;

        // Execute the autofill function in the active tab
        await chrome.scripting.executeScript({
          target: { tabId: activeTabId },
          function: autoFillForm,
          args: [resumeData],
        });
      }
    );
  });
});

// Main autofill function
// Main autofill function
async function autoFillForm(resumeData) {
  // List of available Hugging Face tokens
  const tokens = [
    "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",
    "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",
    "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",
    "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",
    "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",
    "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",
    "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",
    "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",
    // Add more tokens here if needed
  ];

  let currentTokenIndex = 0;
  // Function to switch tokens when one is exhausted
  function getNextToken() {
    currentTokenIndex = (currentTokenIndex + 1) % tokens.length;
    return tokens[currentTokenIndex];
  }

  // Analyze text with Hugging Face, switch tokens if "Too many requests" error occurs
  async function analyzeTextWithAI(text, retries = tokens.length) {
    const prompt = `
      Give only the precise answer according to asked question using the provided resume data. 
      Do not include the answer explanations, or any additional text.

      Question: "${text}"
      Resume Data: ${JSON.stringify(resumeData)}
    `;

    try {
      const response = await fetch(
        "https://api-inference.huggingface.co/models/mistralai/Mistral-7B-Instruct-v0.3",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${tokens[currentTokenIndex]}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            inputs: prompt,
            parameters: { return_full_text: false },
          }),
        }
      );

      if (response.status === 429 && retries > 0) {
        // "Too many requests" error, switch to next token
        console.warn(`Token limit reached, switching token...`);
        getNextToken();
        return analyzeTextWithAI(text, retries - 1);
      }

      if (!response.ok) {
        throw new Error(`Error: ${response.status} - ${response.statusText}`);
      }

      const data = await response.json();
      const generatedText = data[0]?.generated_text || null;
      const cleanData = generatedText
        .replace(/Answer:/gi, "")
        .replace(/[""]/g, "")
        .split("Note:")[0]
        .trim();
      return cleanData;
    } catch (error) {
      console.error("AI analysis failed:", error);
      return null;
    }
  }

  // Query all input fields
  const inputs = document.querySelectorAll("input, select, textarea");

  for (const input of inputs) {
    let labelText = "";

    // Try to get the associated label text
    if (input.id) {
      const label = document.querySelector(`label[for="${input.id}"]`);
      if (label) labelText = label.textContent;
    }

    // Check for aria-labelledby
    if (!labelText && input.hasAttribute("aria-labelledby")) {
      const ariaLabelledbyIds = input
        .getAttribute("aria-labelledby")
        .split(" ");
      const labels = ariaLabelledbyIds
        .map((id) => document.getElementById(id))
        .filter((label) => label);
      labelText = labels.map((label) => label.textContent).join(" ");
    }

    // // Check placeholder
    // if (!labelText && input.placeholder) {
    //   labelText = input.placeholder;
    // }

    // Check name
    if (!labelText && input.name) {
      labelText = input.name;
    }
    // Check name
    if (!labelText && input.value) {
      labelText = input.name;
    }

    if (labelText) {
      console.log(`Analyzing custom question: ${labelText}`);

      // Use AI to analyze the custom question and get a response
      try {
        const aiResponse = await analyzeTextWithAI(labelText);
        console.log(`AI Generated Response: ${aiResponse}`);

        // Set the input value based on the AI response and input type
        if (aiResponse) {
          if (input.type === "radio") {
            // Find the corresponding radio button
            const radioButtons = document.getElementsByName(input.name);
            radioButtons.forEach((button) => {
              if (button.value === aiResponse) {
                button.checked = true;
                button.dispatchEvent(new Event("change", { bubbles: true }));
                console.log(`Filled '${labelText}' with: ${aiResponse}`);
              }
            });
          } else if (input.type === "checkbox") {
            // Check/uncheck the checkbox
            if (aiResponse.toLowerCase() === "yes" || aiResponse === "true") {
              input.checked = true;
            } else {
              input.checked = false;
            }
            input.dispatchEvent(new Event("change", { bubbles: true }));
            console.log(`Filled '${labelText}' with: ${aiResponse}`);
          } else if (input.tagName === "SELECT") {
            // Select the corresponding option
            const options = input.options;
            for (let i = 0; i < options.length; i++) {
              if (options[i].value === aiResponse) {
                input.selectedIndex = i;
                input.dispatchEvent(new Event("change", { bubbles: true }));
                console.log(`Filled '${labelText}' with: ${aiResponse}`);
                break;
              }
            }
          } else {
            // Default to text input
            input.value = aiResponse;
            input.dispatchEvent(new Event("input", { bubbles: true }));
            console.log(`Filled '${labelText}' with: ${aiResponse}`);
          }
        } else {
          console.warn(`No AI response for label: ${labelText}`);
        }
      } catch (error) {
        console.error(
          `Failed to generate response for label: ${labelText}`,
          error
        );
      }
    }
  }
}
