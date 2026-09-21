// Statement pop up
const modal = document.getElementById("modal");
const modalContent = document.getElementById("modal-content");
const closeButton = document.getElementById("close-modal");
var activeStatement = null;

function openPopup(statement){
    activeStatement = statement;
    modalContent.innerHTML = statement.querySelector(".more-info").innerHTML;

    // Hide image if the statement does not use one
    const image = modalContent.querySelector(".image-placeholder");
    if (statement.classList.contains("no-image") && image){
        image.remove();
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
    if (event.key === "Escape" && modal.classList.contains("is-open")){
        closePopup();
    }
});
