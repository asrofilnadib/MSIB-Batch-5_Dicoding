hamburger = document.querySelector(".hamburger");
nav = document.querySelector("nav");
hamburger.onclick = function () {
  nav.classList.toggle("active");
};

const navLinks = document.querySelectorAll(".nav-link");

navLinks.forEach((link) => {
  link.addEventListener("click", function () {
    const targetSection = document.querySelector(this.getAttribute("href"));
    targetSection.scrollIntoView({ behavior: "smooth" });
    navLinks.forEach((link) => {
      link.classList.remove("active");
    });

    this.classList.add("active");
  });
});
