javascript:(function() {
    // Define default values for common fields
    var defaults = {
        // name: 'Haroon Ahmed',
        full_name: 'Haroon Ahmed',
        preferred_name: 'Haroon Ahmed',
        first_name: 'Haroon',
        last_name: 'Ahmed',
        email: 'haroon@example.com',
        phone: '1234567890',
        city: 'new york',
        state: 'New york',
        state_ABv: 'NY',
        zipcode: '10325',
        country: 'United states',
        country_ABV: 'USA',
        location: 'New york, NY, USA',
        Address: '2393 Creekside Drive, Coplay, Pennsylvania, USA, 18037',
        password: 'SecurePassword123!',
        LinkedIn_url: 'www.linkedin.com',
        pronouns : 'He/him',
        authorization: 'Yes',
        sponsorship: 'No',
        gender: "male",
        Are_you_Hispanic_or_Latino: 'No',
        race: 'asian', // ethinicity: 
        veteran_status:'No',
        diability: 'no',
        How_did_you_hear_about_us: 'Linkedin',
        
    };

    // Function to set input values based on field attributes
    function setInputValue(selector, value) {
        var input = document.querySelector(selector);
        if (input) {
            input.value = value;
            input.dispatchEvent(new Event('input', { bubbles: true }));
        }
    }

    // Set values based on common input types and placeholders
    setInputValue('input[type="text"][name="name"], input[type="text"][placeholder*="name"], input[data-qa*="name"], input[name="_systemfield_name"], ', defaults.full_name);
    setInputValue('input[type="text"][aria-label="What is your preferred name?"]', defaults.preferred_name);
    setInputValue('input[type="text"][name="firstname"], input[type="text"][placeholder="First name"], input[data-testid="input-first_name"], input[data-input="first_name"], input[id="firstname"], input[data-ui="firstname"], input[id="firstName"], input[aria-labelledby="firstname_label"], input[id="first_name"], input[aria-label="First Name"], input[name="_systemfield_first_name"], input[name="job_application[first_name]"], input[autocomplete="given-name", input[label="First Name"]], ', defaults.first_name);
    setInputValue('input[type="text"][name="lastname"], input[type="text"][placeholder="Last name"], input[data-testid="input-last_name"], input[data-input="last_name"], input[id="lastname"], input[data-ui="lastname"], input[aria-labelledby="lastname_label"],input[id="last_name"],input[aria-label="Last Name"], input[name="_systemfield_last_name"], input[name="job_application[last_name]"], input[autocomplete="family-name"], input[id="lastName"]', defaults.last_name);
    setInputValue('input[type="email"], input[name="email"], input[placeholder*="email"], input[id="inputEmailaddress"], input[data-ui="email"], input[aria-labelledby="email_label"], input[data-testid="input-email"], input[placeholder="Email"], input[name="_systemfield_email"], input[placeholder="hello@example.com..."], input[id="input-email"], input[data-testid="email"], input[id="email"], input[name="job_application[email]"], input[autocomplete="email"], input[aria-label="Email"], input[label="Email"], input[type="text"][class="_input_1wkz4_28 _input_hkyf8_33"], ', defaults.email);
    setInputValue('input[type="tel"], input[name="phone"], input[placeholder*="phone"], input[autocomplete="tel"], input[id="phone"], input[data-ui="phone"], input[aria-labelledby="phone_label"], input[name="phoneNumber"], input[id="inputPhonenumber"], input[data-input="phone_number"], input[data-testid="input-phone_number"], input[inputmode="tel"], input[placeholder="Phone number"]', defaults.phone);
    setInputValue('input[type="text"][name="location"], input[data-qa="location-input"],input[id="location-input"], input[data-input="location"],input[placeholder*="location"], input[id="candidate-location-label"], input[data-ui="location"], input[aria-labelledby="location_label"], input[id="candidate-location"], input[aria-errormessage="candidate-location-error"], input[aria-labelledby="candidate-location-label"], input[aria-label="Location"], input[aria-describedby="location-description"], input[id="inputLocation"], input[placeholder="City, state, etc."], input[name="job_application[location]"], input[aria-controls="location_autocomplete-items-popup"]', defaults.location);
    setInputValue('input[id="inputLinkedInprofile"], input[name="urls[LinkedIn]"], input[aria-label="LinkedIn Profile"], input[name="linkedinUrl"], input[data-input="linkedin_link"], input[data-testid="input-linkedin_link"], input[placeholder="LinkedIn Link"], input[autocomplete="custom-question-linkedin-profile"], input[]', defaults.LinkedIn_url);
    setInputValue('input[type="password"], input[name="password"], input[placeholder*="password"]', defaults.password);
})();



