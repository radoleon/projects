// nav menu

const openBtn = document.querySelector(".menu-open");
const closeBtn = document.querySelector(".menu-close");
const nav = document.querySelector(".nav");

openBtn.addEventListener("click", () => {
  nav.classList.add("nav-open");
  openBtn.classList.remove("active");
  closeBtn.classList.add("active");
});

closeBtn.addEventListener("click", () => {
  nav.classList.remove("nav-open");
  closeBtn.classList.remove("active");
  openBtn.classList.add("active");
});

const navLinks = document.querySelectorAll(".nav span");

navLinks.forEach(link => {
  link.addEventListener("click", () => {
    nav.classList.remove("nav-open");
    closeBtn.classList.remove("active");
    openBtn.classList.add("active");
  });
});