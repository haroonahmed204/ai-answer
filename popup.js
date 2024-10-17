document.addEventListener("DOMContentLoaded", function () {
  let autoFillBtn = document.getElementById("autoFill");

  // Sample resume data (you can replace it with dynamically loaded data)
  const resumeData = {
    fullName: "John Doe",
    email: "john.doe@example.com",
    phone: "(123) 456-7890",
    linked_in_profile: 'https://www.linkedin.com/in/jennifer-saylor-97044611/',
    website: 'https://www.website.com/in/jennifer-saylor/',
    workExperience: [
      {
        jobTitle: "Software Engineer",
        company: "ABC Corp",
        location: "New York, NY",
        startDate: "January 2020",
        endDate: "Present",
        description: "Developed web applications using React and Node.js."
      }
    ],
    skills: ["JavaScript", "Python", "React", "Node.js"],
    education: {
      degree: "Bachelor of Science in Computer Science",
      school: "XYZ University",
      graduationYear: "2019"
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
async function autoFillForm(resumeData) {
  // Function to analyze the text of a question using AI
  async function analyzeTextWithAI(text) {
    const prompt = `
      Based on the following question text, provide an appropriate answer using the provided resume data:

      Question: "${text}"
      Resume Data: ${JSON.stringify(resumeData)}
      Give only the Answer in the response and dont give explanations of the answer.
    `;

    try {
      const response = await fetch(
        "https://api-inference.huggingface.co/models/meta-llama/Llama-3.2-3B-Instruct",
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
      const generatedText = data[0]?.generated_text || null;
      const cleanData = generatedText.replace(/Answer:/gi, '').replace(/[""]/g, '').split("Note:")[0].trim();
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
      const ariaLabelledbyIds = input.getAttribute("aria-labelledby").split(" ");
      const labels = ariaLabelledbyIds.map(id => document.getElementById(id)).filter(label => label);
      labelText = labels.map(label => label.textContent).join(" ");
    }

    // Check placeholder as a fallback
    if (!labelText && input.placeholder) {
      labelText = input.placeholder;
    }

    if (labelText) {
      // console.log(`Analyzing custom question: ${labelText}`);

      // Use AI to analyze the custom question and get a response
      try {
        const aiResponse = await analyzeTextWithAI(labelText);
        // console.log(`AI Generated Response: ${aiResponse}`);

        // Set the input value based on the AI response
        if (aiResponse) {
          input.value = aiResponse;
          input.dispatchEvent(new Event("input", { bubbles: true }));
          // console.log(`Filled '${labelText}' with: ${aiResponse}`);
        } else {
          console.warn(`No AI response for label: ${labelText}`);
        }
      } catch (error) {
        console.error(`Failed to generate response for label: ${labelText}`, error);
      }
    }
  }
}
