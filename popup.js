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
    salary: '100000',
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

  // Query all input fields and custom question containers
const inputs = document.querySelectorAll("input, textarea, .application-question.custom-question");

for (let i = 0; i < inputs.length; i++) {
    const input = inputs[i];
    let labelText = "";

    // Skip label extraction for specific input types
    if (input.type === "radio" || input.type === "checkbox" || input.type === "hidden" || input.tagName.toLowerCase() === "select") {
        continue; // Skip to the next iteration
    }

    // Check if input is part of a custom question
    const customQuestion = input.closest(".application-question.custom-question");

    if (customQuestion) {
        // Extract label text from custom question
        const textElement = customQuestion.querySelector(".application-label .text");
        if (textElement) {
            labelText = textElement.textContent.replace(/✱/g, '').trim(); // Remove any required markers
        }

        if (labelText) {
            console.log(`Analyzing custom question: ${labelText}`);

            // Use AI to analyze the custom question and get a response
            try {
                const aiResponse = await analyzeTextWithAI(labelText);
                console.log(`AI Generated Response: ${aiResponse}`);

                // Check if AI response exists
                if (aiResponse) {
                    // Ensure the AI response is applied to the correct textarea for custom questions
                    const textarea = customQuestion.querySelector("textarea");
                    if (textarea) {
                        textarea.value = aiResponse; // Fill the textarea with AI response
                        textarea.dispatchEvent(new Event("input", { bubbles: true })); // Dispatch input event for the textarea
                        console.log(`Filled custom question '${labelText}' with: ${aiResponse}`);

                        // Skip this textarea in future iterations by breaking the loop
                        i = [...inputs].indexOf(textarea); // Adjust the loop to skip this textarea
                    }
                }
            } catch (error) {
                console.error(`Failed to generate response for custom question: ${labelText}`, error);
            }
        }
    } else {
        // This is a general input (not part of custom question)
        // Try to get the associated label text from a <label> tag
        if (input.id) {
            const label = document.querySelector(`label[for="${input.id}"]`);
            if (label) labelText = label.textContent;
        }

        // Check for aria-labelledby attribute
        if (!labelText && input.hasAttribute("aria-labelledby")) {
            const ariaLabelledbyIds = input.getAttribute("aria-labelledby").split(" ");
            const labels = ariaLabelledbyIds.map((id) => document.getElementById(id)).filter((label) => label);
            labelText = labels.map((label) => label.textContent).join(" ");
        }

        // Check for name attribute as a last resort
        if (!labelText && input.name) {
            labelText = input.name;
        }
      }
    if (labelText) {
      console.log(`Analyzing custom question: ${labelText}`);

      // Use AI to analyze the custom question and get a response
      try {
        const aiResponse = await analyzeTextWithAI(labelText);
        console.log(`AI Generated Response: ${aiResponse}`);

         // Check if there is a response
        if (aiResponse) {
          // Check if the input is a textarea (for custom questions)
          if (input.tagName.toLowerCase() === "textarea") {
            input.value = aiResponse; // Set the textarea value
            input.dispatchEvent(new Event("input", { bubbles: true })); // Dispatch input event for the textarea
            console.log(`Filled '${labelText}' with: ${aiResponse}`);
        } else if (input.type === "text") {
            // Additionally handle standard text input types
            input.value = aiResponse; // Set the input value
            input.dispatchEvent(new Event("input", { bubbles: true }));
            console.log(`Filled '${labelText}' with: ${aiResponse}`);
        }      
        }   
        else {
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
