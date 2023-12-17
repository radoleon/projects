const sidebar = document.querySelector(".nav-list-container");
const menuBtn = document.querySelector(".menu-icon");
const closeBtn = document.querySelector(".close-icon");

menuBtn.addEventListener("click", () => {
    sidebar.classList.add("sidebar-active");
    menuBtn.classList.remove("btn-active");
    closeBtn.classList.add("btn-active");
    document.body.classList.add("disabled-scroll");
});

closeBtn.addEventListener("click", () => {
    sidebar.classList.remove("sidebar-active");
    closeBtn.classList.remove("btn-active");
    menuBtn.classList.add("btn-active");
    document.body.classList.remove("disabled-scroll");
});

const navLinks = document.querySelectorAll(".nav-list li");

navLinks.forEach(item => {
    item.addEventListener("click", () => {
        sidebar.classList.remove("sidebar-active");
        closeBtn.classList.remove("btn-active");
        menuBtn.classList.add("btn-active");
        document.body.classList.remove("disabled-scroll");
    });
});

const heroText = document.querySelector(".hero-intro");

if (window.scrollY > 0) {
    heroText.style.animation = "none";
}