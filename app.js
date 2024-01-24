const scrollContainer = document.querySelector(".slider");
const backBtn = document.getElementById("backBtn");
const nextBtn = document.getElementById("nextBtn");
const headerContainer = document.querySelector(".header-container");
const top_burger = document.querySelector(".burger-top");
const middle_burger = document.querySelector(".burger-middle");
const bottom_burger = document.querySelector(".burger-bottom");
const modal = document.getElementById("modal"); // Declare modal globally
var prevScrollpos = window.scrollY || window.pageYOffset;

// Function to move the slider to the next position
const moveNext = () => {
  scrollContainer.scrollLeft += 980;
};

// Function to move the slider to the previous position
const moveBack = () => {
  scrollContainer.scrollLeft -= 980;
};

// Add event listeners for manual navigation
nextBtn.addEventListener("click", moveNext);
backBtn.addEventListener("click", moveBack);

// Autoplay functionality
let autoplayInterval;

// Function to start autoplay
const startAutoplay = () => {
  autoplayInterval = setInterval(() => {
    moveNext();
  }, 2000); // Change the interval (in milliseconds) as needed
};

// Function to stop autoplay
const stopAutoplay = () => {
  clearInterval(autoplayInterval);
};

// Start autoplay when the page loads
startAutoplay();

// Pause autoplay when the user interacts with the slider
scrollContainer.addEventListener("mouseover", stopAutoplay);
scrollContainer.addEventListener("mouseout", startAutoplay);

document.addEventListener("DOMContentLoaded", function () {
  var questions = document.querySelectorAll(".question");

  questions.forEach(function (question) {
    var arrow = question.querySelector(".arrow");
    question.addEventListener("click", function () {
      var answer = question.querySelector(".answer");
      var isOpen = answer.classList.contains("show");

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
  var currentScrollPos = window.scrollY || window.pageYOffset;

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
