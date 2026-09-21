// Special effects
var specialEffects = true; // Change to false to turn off hover, pop up, and full screen image effects
var imageOverlay = null;

function updateSpecialEffects(){
    if (specialEffects){
        document.body.classList.add("special-effects");
    } else {
        document.body.classList.remove("special-effects");
    }
}

function toggleSpecialEffects(){
    specialEffects = !specialEffects;
    updateSpecialEffects();
}

updateSpecialEffects();

// Full screen image
function openImage(image){
    if (!specialEffects){
        return;
    }

    imageOverlay = document.createElement("div");
    imageOverlay.className = "image-overlay";

    const fullImage = document.createElement("img");
    fullImage.src = image.src;
    fullImage.alt = image.alt;
    imageOverlay.appendChild(fullImage);

    const closeImageButton = document.createElement("button");
    closeImageButton.className = "image-close";
    closeImageButton.innerText = "×";
    closeImageButton.addEventListener("click", closeImage);
    imageOverlay.appendChild(closeImageButton);

    document.body.appendChild(imageOverlay);

    imageOverlay.addEventListener("click", (event) => {
        if (event.target === imageOverlay){
            closeImage();
        }
    });
}

function closeImage(){
    if (imageOverlay){
        imageOverlay.remove();
        imageOverlay = null;
    }
}

// Statement pop up
const modal = document.getElementById("modal");
const modalContent = document.getElementById("modal-content");
const closeButton = document.getElementById("close-modal");
var activeStatement = null;

function openPopup(statement){
    activeStatement = statement;
    modalContent.innerHTML = statement.querySelector(".more-info").innerHTML;

    // Hide image if the statement does not use one
    const imageBox = modalContent.querySelector(".image-placeholder");
    if (statement.classList.contains("no-image") && imageBox){
        imageBox.remove();
    }

    // Click an image to make it full screen
    const image = modalContent.querySelector(".image-placeholder img");
    if (image){
        image.parentElement.classList.add("has-image");
        image.addEventListener("click", () => {
            openImage(image);
        });
    }

    modal.classList.add("is-open");
    document.body.classList.add("modal-open");
    closeButton.focus();
}

function closePopup(){
    modal.classList.remove("is-open");
    document.body.classList.remove("modal-open");

    if (activeStatement){
        activeStatement.querySelector(".explore-button").focus();
    }
}

// Open pop up when a statement is clicked
const statements = document.querySelectorAll(".statement-card");

statements.forEach(statement => {
    statement.addEventListener("click", () => {
        openPopup(statement);
    });
});

// Close with X
closeButton.addEventListener("click", closePopup);

// Close when clicking outside pop up
modal.addEventListener("click", (event) => {
    if (event.target === modal){
        closePopup();
    }
});

// Close with escape key
document.addEventListener("keydown", (event) => {
    if (event.key === "Escape"){
        if (imageOverlay){
            closeImage();
        } else if (modal.classList.contains("is-open")){
            closePopup();
        }
    }
});
