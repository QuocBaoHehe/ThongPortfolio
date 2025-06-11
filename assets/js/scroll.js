document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  });
});

document.querySelectorAll('section').forEach((el) => {
  const observer = new IntersectionObserver(([entry]) => {
    if (entry.isIntersecting) {
      el.classList.add('visible');
    }
  }, { threshold: 0.1 });
  observer.observe(el);
});
/*2. JS – xử lý scroll và cursor*/

const header = document.querySelector("header");
let lastScrollY = window.scrollY;
let mouseNearTop = false;

function handleScroll() {
  if (mouseNearTop || window.scrollY < 10) {
    header.classList.remove("hidden");
  } else {
    if (window.scrollY > lastScrollY) {
      header.classList.add("hidden");
    } else {
      header.classList.remove("hidden");
    }
  }
  lastScrollY = window.scrollY;
}

function handleMouseMove(e) {
  mouseNearTop = e.clientY < 60;
  if (mouseNearTop) {
    header.classList.remove("hidden");
  }
}

window.addEventListener("scroll", handleScroll);
window.addEventListener("mousemove", handleMouseMove);

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener("click", function (e) {
    const target = document.querySelector(this.getAttribute("href"));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  });
});