
document.addEventListener("DOMContentLoaded", function () {
  const carouselElement = document.getElementById(
    "academicProgramsCarousel"
  );

  const carouselInner = carouselElement.querySelector(".carousel-inner");
  const indicators = document.getElementById(
    "dynamicCarouselIndicators"
  );

  // Existing cards ko collect karein
  const cards = Array.from(
    carouselInner.querySelectorAll(".carousel-card-item")
  );

  if (!carouselElement || !carouselInner || !indicators || !cards.length) {
    return;
  }

  let resizeTimer;

  function getCardsPerSlide() {
    if (window.innerWidth < 768) {
      return 1; // Mobile
    }

    if (window.innerWidth < 992) {
      return 2; // Tablet
    }

    return 3; // Desktop
  }

  function buildCarousel() {
    const cardsPerSlide = getCardsPerSlide();

    // Purana Bootstrap carousel instance dispose karein
    const oldCarousel = bootstrap.Carousel.getInstance(carouselElement);

    if (oldCarousel) {
      oldCarousel.dispose();
    }

    // Purani slides aur indicators clear karein
    carouselInner.innerHTML = "";
    indicators.innerHTML = "";

    // Cards ko responsive groups mein divide karein
    for (let i = 0; i < cards.length; i += cardsPerSlide) {
      const slide = document.createElement("div");
      slide.className = "carousel-item";

      if (i === 0) {
        slide.classList.add("active");
      }

      const row = document.createElement("div");
      row.className = "row g-3";

      const currentCards = cards.slice(i, i + cardsPerSlide);

      currentCards.forEach(function (card) {
        card.classList.add("col-12", "col-md-6", "col-lg-4");
        row.appendChild(card);
      });

      slide.appendChild(row);
      carouselInner.appendChild(slide);

      // Har slide ke liye ek indicator button
      const indicator = document.createElement("button");

      indicator.type = "button";
      indicator.setAttribute(
        "data-bs-target",
        "#academicProgramsCarousel"
      );
      indicator.setAttribute("data-bs-slide-to", String(
        Math.floor(i / cardsPerSlide)
      ));
      indicator.setAttribute(
        "aria-label",
        `Go to slide ${Math.floor(i / cardsPerSlide) + 1}`
      );

      if (i === 0) {
        indicator.classList.add("active");
        indicator.setAttribute("aria-current", "true");
      }

      indicators.appendChild(indicator);
    }

    // Bootstrap carousel ko dobara initialize karein
    new bootstrap.Carousel(carouselElement, {
      interval: false,
      ride: false,
      touch: true,
      wrap: true
    });
  }

  // Initial setup
  buildCarousel();

  // Screen resize hone par slides dobara arrange karein
  window.addEventListener("resize", function () {
    clearTimeout(resizeTimer);

    resizeTimer = setTimeout(function () {
      buildCarousel();
    }, 200);
  });
});
