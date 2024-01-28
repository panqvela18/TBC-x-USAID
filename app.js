const scrollContainer = document.querySelector(".slider");
const backBtn = document.getElementById("backBtn");
const nextBtn = document.getElementById("nextBtn");
const headerContainer = document.querySelector(".header-container");
const top_burger = document.querySelector(".burger-top");
const middle_burger = document.querySelector(".burger-middle");
const bottom_burger = document.querySelector(".burger-bottom");
const modal = document.getElementById("modal"); // Declare modal globally
var prevScrollpos = window.scrollY || window.pageYOffset;

let autoplayInterval;

// Function to move the slider to the next position
const moveNext = () => {
  const newScrollLeft = scrollContainer.scrollLeft + 980;
  const maxScrollLeft =
    scrollContainer.scrollWidth - scrollContainer.clientWidth;

  if (newScrollLeft > maxScrollLeft) {
    scrollContainer.scrollLeft = 0; // Go back to the first slide
  } else {
    scrollContainer.scrollLeft += 980;
  }

  stopAndResumeAutoplay();
};

const switchToSlide = (index) => {
  const newScrollLeft = index * 980;
  scrollContainer.scrollLeft = newScrollLeft;

  highlightActiveDot(index);

  // Stop autoplay and resume
  stopAndResumeAutoplay();
};

const highlightActiveDot = (index) => {
  dotElements.forEach((dot, i) => {
    if (i === index) {
      dot.classList.add("active-dot");
    } else {
      dot.classList.remove("active-dot");
    }
  });
};

// Add event listeners for each dot to switch slides
const dotElements = document.querySelectorAll(".bulet-cont span");

dotElements.forEach((dot, index) => {
  dot.addEventListener("click", () => {
    switchToSlide(index);
  });
});

const updateActiveDot = () => {
  const currentIndex = Math.round(scrollContainer.scrollLeft / 980);
  highlightActiveDot(currentIndex);
};

// Add event listener for scroll to update the active dot during autoplay
scrollContainer.addEventListener("scroll", updateActiveDot);

// Function to move the slider to the previous position
const moveBack = () => {
  const newScrollLeft = scrollContainer.scrollLeft - 980;

  // Check if scrolling to the previous position goes before the first slide
  if (newScrollLeft < 0) {
    scrollContainer.scrollLeft =
      scrollContainer.scrollWidth - scrollContainer.clientWidth;
  } else {
    scrollContainer.scrollLeft -= 980;
  }

  // Stop autoplay and resume
  stopAndResumeAutoplay();
};

// Function to stop autoplay and resume
const stopAndResumeAutoplay = () => {
  stopAutoplay();
  setTimeout(startAutoplay, 800); // Resume autoplay
};

// Add event listeners for manual navigation
nextBtn.addEventListener("click", moveNext);
backBtn.addEventListener("click", moveBack);

// Start autoplay when the page loads
startAutoplay();

// Autoplay functionality
function startAutoplay() {
  // Check if the interval is not already running
  if (!autoplayInterval) {
    autoplayInterval = setInterval(() => {
      moveNext();
    }, 800);
  }
}

// Function to stop autoplay
function stopAutoplay() {
  clearInterval(autoplayInterval);
  autoplayInterval = null;
}

document.addEventListener("DOMContentLoaded", function () {
  let questions = document.querySelectorAll(".question");

  questions.forEach(function (question) {
    let arrow = question.querySelector(".arrow");
    question.addEventListener("click", function () {
      let answer = question.querySelector(".answer");
      let isOpen = answer.classList.contains("show");

      // Close all answers
      questions.forEach(function (q) {
        q.querySelector(".answer").classList.remove("show");
        q.querySelector(".arrow").style.transform = "rotate(0deg)";
      });

      // Toggle the visibility of the clicked answer
      if (!isOpen) {
        answer.classList.add("show");
        arrow.style.transform = "rotate(180deg)";
      } else {
        answer.classList.remove("show");
        arrow.style.transform = "rotate(0deg)";
      }
    });
  });
});

document.getElementById("burgerClick").addEventListener("click", () => {
  const curOverflow = document.querySelector("body").style.overflow;

  if (curOverflow === "hidden") {
    document.querySelector("body").style.overflow = "visible";
    document.querySelector(".blur-effect").remove(); // Remove blur effect
  } else {
    document.querySelector("body").style.overflow = "hidden";

    // Create and append a blur effect div to the body
    const blurEffect = document.createElement("div");
    blurEffect.className = "blur-effect";
    document.body.appendChild(blurEffect);
  }

  modal.classList.toggle("sidemenu-active");
  top_burger.classList.toggle("burger-active-top");
  middle_burger.classList.toggle("burger-active-middle");
  bottom_burger.classList.toggle("burger-active-bottom");
});

document.onclick = (e) => {
  if (!headerContainer.contains(e.target)) {
    modal.classList.remove("sidemenu-active");
    top_burger.classList.remove("burger-active-top");
    document.querySelector("body").style.overflow = "visible";
    document.querySelector(".blur-effect").remove(); // Remove blur effect
    middle_burger.classList.remove("burger-active-middle");
    bottom_burger.classList.remove("burger-active-bottom");
  }
};

function handleScroll() {
  let currentScrollPos = window.scrollY || window.pageYOffset;

  if (prevScrollpos > currentScrollPos) {
    document.querySelector("header").style.top = "0";
  } else if (
    prevScrollpos < currentScrollPos &&
    currentScrollPos - prevScrollpos > 50
  ) {
    document.querySelector("header").style.top = "-84px";
  }

  prevScrollpos = currentScrollPos;
}

if (window.innerWidth < 1023) {
  window.addEventListener("scroll", handleScroll);
} else {
  document.querySelector("header").style.top = "0";
}

window.addEventListener("resize", function () {
  if (window.innerWidth < 1023) {
    window.addEventListener("scroll", handleScroll);
  } else {
    window.removeEventListener("scroll", handleScroll);
    document.querySelector("header").style.top = "0";
  }
});
