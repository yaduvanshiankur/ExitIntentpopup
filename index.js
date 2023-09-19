// Create the exit intent popup HTML structure
const popupContainer = document.createElement("div");
popupContainer.id = "exitIntentPopup";
popupContainer.classList.add("popup");

const popupContentWrapper = document.createElement("div");
popupContentWrapper.className = "popup-content-wrapper"

const popupContent = document.createElement("div");
popupContent.classList.add("popup-content");

const closeBtn = document.createElement("span");
closeBtn.classList.add("close-popup");
closeBtn.innerHTML = "&times;";
closeBtn.addEventListener("click", closePopup);

const heading = document.createElement("h4");
heading.textContent = "GET $10 OFF WHEN YOU SIGN UP FOR";

const subHeading = document.createElement("span");
subHeading.textContent = "SAVINGS, NEWS, UPDATES AND MORE";

const privacy = document.createElement("a");
privacy.className = "privacy-policy";
privacy.textContent = "PRIVACY POLICY";
privacy.href = "#";

const form = document.createElement("form");
form.id = "popupForm";

//name input
const nameInput = document.createElement("input");
nameInput.className = "nameInput";
nameInput.type = "text";
nameInput.id = "name";
nameInput.name = "name";
nameInput.placeholder = "Your name";

//email input
const emailInput = document.createElement("input");
emailInput.className = "emailInput";
emailInput.type = "email";
emailInput.id = "email";
emailInput.name = "email";
emailInput.placeholder = "Email address";


const checkboxLabel = document.createElement("label");
checkboxLabel.setAttribute("for", "checkbox");
checkboxLabel.textContent = "Check this box to receive monthly newsletter.";

const checkboxInput = document.createElement("input");
checkboxInput.type = "checkbox";
checkboxInput.id = "checkbox";
checkboxInput.name = "checkbox";

const submitButton = document.createElement("button");
submitButton.type = "submit";
submitButton.textContent = "SIGN UP";
submitButton.addEventListener("click", submitForm);

const image = document.createElement('img');
image.src = "https://img.freepik.com/premium-vector/christmas-sale-banner-with-typography-red-ribbon-fir-tree-branches-holly-berries-white-background_87771-6879.jpg"

const imageContainer = document.createElement('div');
imageContainer.className = "image-container";


// const nameWrapper = document.createElement("div");
// nameWrapper.append(nameInput);

// const emailWrapper = document.createElement("div");
// emailWrapper.append(emailInput);

const checkboxWrapper = document.createElement("div");
checkboxWrapper.append(checkboxInput, checkboxLabel);

form.append(
    //   nameWrapper,
    //   emailWrapper,
    nameInput,
    emailInput,
    checkboxWrapper,
    submitButton
);

imageContainer.append(image);

popupContent.append(heading, subHeading, form, privacy);
popupContentWrapper.append(closeBtn, popupContent, imageContainer);
popupContainer.appendChild(popupContentWrapper);
document.body.appendChild(popupContainer);

// Create the exit intent popup CSS styles
const style = document.createElement("style");
style.textContent = `

  * {
    box-sizing:border-box;
  }

  .popup {
    display: block;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    justify-content: center;
    align-items: center;
  }

  #exitIntentPopup {
    z-index: 10000;
  }

  #popupForm {
    display: flex;
    flex-direction: column;
    text-align: left;
  }

  #popupForm input {
    padding: 16px;
    margin: 10px 0;
  }

  #popupForm [type="text"], #popupForm [type="email"] {
    width:100%;
  }

  #popupForm label {
    margin-left: 5px;
    font-size: 14px;
  }

  #popupForm button{
    color: white;
    background-color: black;
    padding: 16px 10px; 
    border: none;
  }

  .popup-content {
    padding: 20px;
    border-radius: 5px;
    text-align: center;
    position: relative;
    width: 50%;

    @media (max-width: 768px) {
        width: 100%;
    }
  }

  .image-container {
    width: 50%;

    @media (max-width: 768px) {
        display: none;
    }
  }

  .image-container img{
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: center;
    mix-blend-mode: multiply;
  }

  .popup-content h4{
    margin-bottom: 0;
  }

  .popup-content-wrapper {
    width: 40%;
    display: flex;
    position: relative;
    background-color: yellow;
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%,-50%);

    @media (max-width: 768px) {
        display: block;
    }
  }

  .privacy-policy {
    font-size: 10px;
    color: black;
  }

  .privacy-policy:hover {
    color: black;
  }

  .close-popup {
    position: absolute;
    top: 0;
    right: 12px;
    font-size: 30px;
    cursor: pointer;
  }

  /* Styles for form errors */
  .error-message {
    color: red;
  }


  /* Hide scrollbars when the popup is open */
  body.popup-open {
    overflow: hidden;
  }
`;

document.head.appendChild(style);

// Function to close the popup
function closePopup() {
    popupContainer.style.display = "none";
    document.body.classList.remove("popup-open");
    setCookie("closePopup", "true", 365);
}

// Check if any of the cookies (successfulSubmission, closePopup, userData) exists
const successfulSubmissionCookie = getCookie("successfulSubmission");
const closePopupCookie = getCookie("closePopup");
const userDataCookie = getCookie("userData");

function showPopup() {
    // If either cookie exists, don't show the popup
    if (successfulSubmissionCookie || closePopupCookie || userDataCookie) {
        popupContainer.style.display = "none";
    } else {
        // Check if user data cookie exists and populate the form
        popupContainer.style.display = "block";
        const userData = getUserDataFromCookie();
        if (userData) {
            document.getElementById("email").value = userData.email;
            document.getElementById("checkbox").checked = userData.checkbox;
        }
    }
}

function getCookie(name) {
    const cookies = document.cookie.split(";");
    for (const cookie of cookies) {
        const parts = cookie.split("=");
        const cookieName = parts[0].trim();
        if (cookieName === name) {
            return parts[1];
        }
    }
    return "";
}


function setCookie(name, value, days) {
    const date = new Date();
    date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
    const expires = "expires=" + date.toUTCString();
    document.cookie = name + "=" + value + ";" + expires + ";path=/";
    console.log(document.cookie)
}

// Function to get user data from the cookie
function getUserDataFromCookie() {
    const userDataCookie = getCookie("userData");
    if (userDataCookie) {
        return JSON.parse(userDataCookie);
    }
    return null;
}

// Function to run on page load
function onPageLoad() {
    // Delay showing the popup on mobile devices by 5 seconds
    
    if (isMobile()) {
        console.log(window.innerWidth)
        setTimeout(showPopup, 5000); // 5 seconds delay
    } else {
        // For desktop, show the popup immediately
        console.log(window.innerWidth)
        showPopup();
    }
}

// Function to check if the device is a mobile device
function isMobile() {
    return window.innerWidth <= 768;
}

window.addEventListener("load", onPageLoad);




// Function to submit the form
function submitForm(event) {
    console.log("hello");
    event.preventDefault();
    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const checkbox = document.getElementById("checkbox").checked;
    const form = document.getElementById("popupForm");

    const existingErrorMessages = document.querySelectorAll(".error-message");
    existingErrorMessages.forEach((errorMessage) => {
        errorMessage.remove();
    });

    if (email === "" || !checkbox) {
        // Show error message
        const message = "Please fill in all required fields.";
        const errorMessage = document.createElement("p");
        errorMessage.classList.add("error-message");
        errorMessage.textContent = message;
        form.appendChild(errorMessage);
    } else {
        // Successful submission
        // Create a cookie here

        const userData = {
            name: name,
            email: email,
            checkbox: checkbox,
        };

        setCookie("userData", JSON.stringify(userData), 365);
        // Close the popup
        closePopup();
    }
}
