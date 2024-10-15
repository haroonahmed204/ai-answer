document.addEventListener("DOMContentLoaded", function () {
  let autoFillBtn = document.getElementById("autoFill");

  // fetch autoFill button
  autoFillBtn.addEventListener("click", async () => {
    const data = {
      fullName: "John Doe",
      firstName: "John",
      lastName: "Doe",
      gender: "Male",
      email: "john.doe@gmail.com",
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
      desiredwage:"50000",

//       resume: `
// Lucas Ellis   	 Lucas.Ellis24@outlook.com  •  (720) 204-3110
// Portfolio • LinkedIn • Norman, OK

// Senior Full Stack Developer
// Highly motivated and experienced Senior Full Stack Developer with 15+ years of hands-on experience in web development using React.js and frontend development with .NET Core/C#. Possessing a solid foundation in programming fundamentals acquired through a Bachelor's degree in Computer Science. Excels in collaborative team environments, having successfully delivered multiple projects from conception to deployment. Demonstrating adaptability and a proactive approach to learning new technologies. Actively contributed to the adoption of best practices and innovative solutions within development teams. 
// Technical Skills
// ●	Programming Languages: C#, C++, Typescript, JavaScript, Node.js, OpenGL / WebGL, SQL / Linq / EF, Python
// ●	Front-End: JavaScript, React 
// ●	Back-End: .Net, C#
// ●	Others: Cloud platforms (AWS, Azure, or Google Cloud), Docker, React, Angular, Vue.js, Three.js, Redux.js, Puppeteer, CI/CD, Git
// Areas of Expertise
// ●	DevOps and Infrastructure
// ●	Frontend/ Backend Developer
// ●	Architecture and Design
// ●	Data encryption and protection
// ●	Test-driven development
// ●	CI/CD Pipelines
// ●	Responsive Design	●	State Management
// ●	Database Query Optimization 
// ●	Code Review Processes
// ●	Multi-Language Support
// ●	Data Warehousing
// ●	Technical Leadership & Mentoring
// ●	Version Control	●	Estimation & Planning
// ●	UX/UI & Project Management
// ●	Market Research & Analysis
// ●	Stakeholders Engagement
// ●	Product Development
// ●	Problem Resolution Scalability
// ●	Process Application Management
// Career Experience
// Homegig (Washington, D.C.)	2023– Present
// Front- End Developer	
// ●	Developed and maintained a sophisticated JavaScript-based design platform catering to home remodeling needs.
// ●	Led front-end development and performance analysis to ensure optimal user experience and efficiency.
// ●	Utilized a diverse range of technologies including JavaScript, WebGL, Three.js, React, React Three Fiber, TypeScript, GitHub, directed acyclic graphs, and geometry processing to achieve project objectives.
// ●	Successfully delivered a cutting-edge design platform that seamlessly integrates advanced technologies, facilitating intuitive home remodeling experiences for users. Demonstrated expertise in front-end development, performance optimization, and utilization of modern web technologies.
// AIM Consulting Group (Seattle, WA)	2021-2022
// Full Stack Developer	
// ●	Played a pivotal role in developing Medtronic PLC innovation platform.
// ●	Led the development of a React-based platform tailored for surgical planning and medical imaging. Provided hands-on guidance to the visualization team.
// ●	Leveraged expertise in React, Redux, WebGL, Three.js, Node.js, TypeScript, and a suite of other technologies to craft a robust and user-friendly platform. Collaborated closely with cross-functional teams to integrate cutting-edge solutions.
// ●	Successfully delivered a high-quality platform that significantly enhanced surgical planning and medical imaging capabilities for Medtronic PLC. Recognized for individual contributions and leadership in achieving project objectives.
// Optml.io	2020– Present
// App Software Engineer (Freelance)	
// ●	Led multiple full-stack and mobile app development projects for esteemed clients.
// ●	Development of Project X1 Roller Coaster VR app with Trifecta Communications and Frontier City Theme Park.
// ●	Leveraged extensive expertise in JavaScript, .NET Core, C#, TypeScript, WebGL, Unity3D, Entity Framework, Firebase, Docker, Python, Node.js, React, Redux, GitHub, Angular, AWS, Azure, MongoDB, Go (Golang), and Apache to deliver cutting-edge solutions tailored to client needs.
// ●	Delivered immersive VR experiences and robust backend infrastructures, meeting client expectations and achieving widespread user adoption. Recognized for individual contributions and leadership in each project, despite occasional misattributions.
// Red Earth Systems	2010– 2019
// Lead Software Engineer 	2015– 2019
// ●	Led the development of a HIPAA-compliant messaging system and SaaS web applications for various clients in the healthcare industry.
// ●	Spearheaded the design and implementation of secure communication protocols for the messaging system, ensuring compliance with HIPAA regulations. Managed data integration efforts to synchronize external provider data seamlessly. Developed intuitive and user-friendly SaaS web applications utilizing JavaScript frameworks.
// ●	Leveraged extensive expertise in C#, ASP.NET, Web API, JavaScript, Docker, SQL Server, Node.js, TypeScript, Bootstrap, PHP, and other technologies to deliver high-quality solutions tailored to client needs. Implemented scalable backend solutions and established continuous delivery pipelines for efficient deployment.
// ●	Successfully delivered robust and compliant healthcare solutions, enhancing communication and data management processes for clients. Recognized for individual contributions and leadership in each project, despite occasional misattributions.
// Senior Software Engineer  	2012 - 2014
// ●	Led software development projects across diverse domains
// ●	Implemented automated testing, code standardization, and scalable infrastructure. Improved system stability and logging. Developed data migration tools and legal document processing systems.
// ●	Utilized technologies such as C#, ASP.NET, JavaScript, jQuery, Bootstrap, PHP, Dapper, Git, JSON, Selenium, and NUnit to deliver high-quality solutions.
// ●	Enhanced software quality, system stability, and deployment efficiency across projects. Delivered innovative solutions tailored to client needs.
// Additional Experience
// opGames Inc | Founder & Lead Engineer 							              2007– 2015
// Red Earth Systems | Software Engineer							             	2010 - 2011
// Education & Certifications
// B.A. Computer Science
// Hastings College. 
// Microsoft Azure for .NET Developers
// Udemy 
// Foundations of User Experience (UX) Design
// Coursera 
// `,
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
    - desiredwage
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
      const keyToFill =
        aiResponse[0]?.generated_text?.replace(/"/g, "").trim() || null;

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
