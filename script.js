document.querySelectorAll("[data-gallery]").forEach((gallery) => {
  const track = gallery.querySelector(".gallery-track");
  const previousButton = gallery.querySelector(".gallery-button--prev");
  const nextButton = gallery.querySelector(".gallery-button--next");

  const scrollBySlide = (direction) => {
    track.scrollBy({
      left: direction * track.clientWidth,
      behavior: "smooth",
    });
  };

  previousButton.addEventListener("click", () => scrollBySlide(-1));
  nextButton.addEventListener("click", () => scrollBySlide(1));
});

document.querySelectorAll("[data-copy-email]").forEach((button) => {
  button.addEventListener("click", async () => {
    const email = button.dataset.copyEmail;
    const label = button.querySelector(".copy-email__label");

    try {
      await navigator.clipboard.writeText(email);
      label.textContent = "Copied";
      button.setAttribute("aria-label", "Email address copied");
      window.setTimeout(() => {
        label.textContent = "Copy";
        button.setAttribute("aria-label", "Copy email address");
      }, 2000);
    } catch {
      label.textContent = "Select email";
    }
  });
});
