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
