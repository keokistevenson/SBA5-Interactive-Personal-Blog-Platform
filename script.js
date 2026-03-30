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

const form              = document.getElementById("post-form");

// POSTS
const lblNoPosts        = document.getElementById("no-posts");

// TEMPLATE CONTROLS
const postTemplate      = document.getElementById("post-template");
const postsList         = document.getElementById("posts-list");



// Populate Posts
function createPostObject() {
    return {
        id: Date.now().toString(), // This is a new idea to me. Does not produce a readable date. Milliseconds?
        title: txtTitle.value.trim(),
        content: txtContent.value.trim(),
        timestamp: new Date().toISOString()
    };
}

// FUNCTIONS
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

function clearForm() {
    form.reset();

    // Reset validation
    txtTitle.setCustomValidity("");
    txtContent.setCustomValidity("");

    // Clear messages
    msgTitle.textContent = "";
    msgContent.textContent = "";

    // Reset character count
    characterCount.textContent = "Characters Left: 5200";

    // Focus back on title
    txtTitle.focus();
}


function addPostToPage(post) {
    // The clone lives only in memory at this point (not the DOM).
    // cloneNode(true) deep-copies the template including all its children.
    const newPost = postTemplate.content.cloneNode(true);

    // Get references to the cloned elements we want to add.
    const postArticle   = newPost.querySelector(".post");
    const postTitle     = newPost.querySelector(".post-title");
    const postContent   = newPost.querySelector(".post-content");
    const postTime      = newPost.querySelector(".post-time");
    const btnEdit       = newPost.querySelector(".edit-btn");
    const btnDelete     = newPost.querySelector(".delete-btn");

    // Store the post id in the article and on the buttons.
    // This is pretty cool since i can't use classList.
    postArticle.dataset.id = post.id;
    btnEdit.dataset.id = post.id;
    btnDelete.dataset.id = post.id;

    // Fill in the post content.
    postTitle.textContent = post.title;
    postContent.textContent = post.content;

    // Set the time
    postTime.dateTime = post.timestamp;
    postTime.textContent = new Date(post.timestamp).toLocaleString();

    // Add the finished post to the page.
    // No document fragment needed!
    postsList.appendChild(newPost);
}

function deletePost(postElement) {
    console.log("Deleting:", postElement);

    // Remove from DOM
    postElement.remove();

    // Show "no posts" if empty
    if (postsList.children.length === 0) {
        lblNoPosts.hidden = false;
    }
}

function editPost(postId) {
    console.log("Editing:", postId);

    // God I still have to do storage!!!
    
 
    // Getting title and content of the published blog post.
    const title = postElement.querySelector(".post-title").textContent;
    const content = postElement.querySelector(".post-content").textContent;

    // Populate form with article content.
    txtTitle.value = title;
    txtContent.value = content;

    // Change the mode
    modeHeader.textContent = "Edit Post";
}


// EVENTS
txtContent.addEventListener("input", () => {
    const maxLength = 5200;
    characterCount.textContent = `Characters Left: ${maxLength - txtContent.value.length}`;
});

txtTitle.addEventListener("input", function () {
    validateTitle();
})

txtContent.addEventListener("input", function () {
    validateContent();
})

txtTitle.addEventListener("blur", function () {
    validateTitle();
})

txtContent.addEventListener("blur", function () {
    validateContent();
})


form.addEventListener("submit", function (event) {
    event.preventDefault();

    validateTitle();
    validateContent();

    if (!form.checkValidity()) {
        form.reportValidity(); // trying something different. I didn't use this last project.
        return;
    }

    const post = createPostObject();

    // Make sure I get what i pay for. Playing with object
    console.log("Saving post:", post);

    addPostToPage(post);

    clearForm();
});

btnCancel.addEventListener("click", function () {
    clearForm();
});

// Use event delegation on the parent #postsList to handle clicks and changes
// This approach is so different from dynamic shopping cart.
postsList.addEventListener("click", function (event) {
    const target = event.target;

    // Find the closest post (Make sure click on an actual post.)
    const postElement = target.closest(".post");
    if (!postElement) return;

    // Get the ID of the post.
    const postId = postElement.dataset.id;

    // The work around flipping form dataset.id to classList is a nightmare mindbender.
    if (target.classList.contains("delete-btn")) {
        deletePost(postElement);
    }

    // The work around flipping form dataset.id to classList is a nightmare mindbender.
    if (target.classList.contains("edit-btn")) {
        editPost(postId);
    }
});

