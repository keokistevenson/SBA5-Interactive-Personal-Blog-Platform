// alert("Checking if script is connected.");

// FORM CONTROLS
const modeHeader        = document.getElementById("blog-mode");

const txtTitle          = document.getElementById("title");
const msgTitle          = document.getElementById("title-error");

const txtContent        = document.getElementById("content");
const characterCount    = document.getElementById("character-count");
const msgContent        = document.getElementById("content-error");

const btnSave           = document.getElementById("save");
const btnCancel         = document.getElementById("cancel");

// POSTS
const lblNoPosts         = document.getElementById("no-posts");


// FORM VALIDATION
function validateTitle() {
    const validity = txtTitle.validity;
    const trimmedTitle = txtTitle.value.trim();

    txtTitle.setCustomValidity(""); // reset

    // validity.valueMissing doesn't check for empty string
    if (trimmedTitle === "") {
        txtTitle.setCustomValidity("A blog title is required!");

    } else if (validity.tooShort) {
        txtTitle.setCustomValidity("Title must be at least 2 characters!");

    } else if ((!validity.tooShort) && (trimmedTitle.length < 2)) {
        // validity.tooShort is not reliable if a person has 2 spaces and one character.
        txtTitle.setCustomValidity("You are tinkering! WE ARE WATCHING YOU!!!");

    } else if (validity.tooLong) {
        // If someone does this we should probably do more this.
        txtTitle.setCustomValidity("Title must be at less than 154 characters! :D");

    } else {
        txtTitle.setCustomValidity("");
    }

    msgTitle.textContent = txtTitle.validationMessage;
}

function validateContent() {
    const validity = txtContent.validity;
    const trimmedContent = txtContent.value.trim();

    txtContent.setCustomValidity(""); // reset

    // validity.valueMissing doesn't check for empty string
    if (trimmedContent === "") {
        txtContent.setCustomValidity("Blog content is required!");

    } else if (validity.tooShort) {
        // Not reliable if a person has 2 spaces and one character.
        txtContent.setCustomValidity("Blog content must be at least 10 characters long.");

    } else if (trimmedContent.length < 10) {
        // validity.tooShort is not reliable if a person has 2 spaces and one character.
        txtContent.setCustomValidity("You must have 10 characters! Beginning and trailing spaces don't count.");

    } else if (validity.tooLong) {
        // If someone does this we should probably do more this.
        txtContent.setCustomValidity("You are doing something you are not supposed to. We are watching you!");

    } else {
        txtContent.setCustomValidity("");
    }

    msgContent.textContent = txtContent.validationMessage;
}




// EVENTS
txtContent.addEventListener("input", () => {
    const maxLength = 5200;
    characterCount.textContent = `Characters Left: ${maxLength - txtContent.value.length}`;
});

txtTitle.addEventListener("input", function(){
    validateTitle();
})

txtContent.addEventListener("input", function(){
    validateContent();
})

txtTitle.addEventListener("blur", function(){
    validateTitle();
})

txtContent.addEventListener("blur", function(){
    validateContent();
})