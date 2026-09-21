// Each statement carries its own hidden template, so copied statements work automatically.
const modal = document.getElementById("modal");
const modalContent = document.getElementById("modal-content");
const closeButton = document.getElementById("close-modal");
let activeCard;

function openModal(statement) {
  activeCard = statement;
  modalContent.innerHTML = statement.querySelector(".statement-content").innerHTML;

  // Add data-no-image to one statement's article tag to hide only its image area.
  if (statement.hasAttribute("data-no-image")) {
    modalContent.querySelector(".image-placeholder")?.remove();
  }

  modal.classList.add("is-open");
  modal.setAttribute("aria-hidden", "false");
  document.body.classList.add("modal-open");
  closeButton.focus();
}

function closeModal() {
  modal.classList.remove("is-open");
  modal.setAttribute("aria-hidden", "true");
  document.body.classList.remove("modal-open");
  activeCard?.querySelector(".explore-button").focus();
}

document.querySelectorAll(".statement-card").forEach((statement) => {
  statement.addEventListener("click", () => openModal(statement));
});

closeButton.addEventListener("click", closeModal);

// Click the dark area around the pop-up to close it.
modal.addEventListener("click", (event) => {
  if (event.target === modal) closeModal();
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && modal.classList.contains("is-open")) closeModal();
});
