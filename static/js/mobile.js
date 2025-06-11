document.addEventListener("DOMContentLoaded", function () {
  const header = document.querySelector("header.header");

  // Tạo nút ☰ nếu chưa có
  let toggle = document.getElementById("menu-toggle");
  if (!toggle && header) {
    toggle = document.createElement("button");
    toggle.id = "menu-toggle";
    toggle.setAttribute("aria-label", "Menu");
    toggle.style.fontSize = "2rem";
    toggle.style.background = "none";
    toggle.style.border = "none";
    toggle.style.marginLeft = "1rem";
    toggle.style.cursor = "pointer";
    header.prepend(toggle);
  }

  const themeToggle = document.getElementById("theme-toggle");
  const menu = document.getElementById("menu");

  // Di chuyển theme toggle vào cuối menu nếu chưa có
  if (menu && themeToggle && !menu.contains(themeToggle)) {
    const li = document.createElement("li");
    li.appendChild(themeToggle);
    menu.appendChild(li);
  }

  // === Cập nhật nội dung theo theme + màn hình ===

  const updateThemeIcon = () => {
    const isDark = document.body.classList.contains("dark");
    const isMobile = window.innerWidth <= 768;

    const sunIcon = `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="orange" viewBox="0 0 24 24"><circle cx="12" cy="12" r="5"/><path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M17.36 17.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M17.36 6.64l1.42-1.42"/></svg>`;
    const moonIcon = `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="gold" viewBox="0 0 24 24"><path d="M21 12.79A9 9 0 0 1 11.21 3a7 7 0 1 0 9.79 9.79z"/></svg>`;

    if (themeToggle) {
      themeToggle.innerHTML = isMobile
        ? (isDark ? `☀️ Switch to Light` : `🌙 Switch to Dark`)
        : (isDark ? sunIcon : moonIcon);
    }
  };

  const updateMenuIcon = () => {
    if (toggle) toggle.innerText = "≡";
  };

  // Khi nhấn nút đổi theme
  themeToggle?.addEventListener("click", () => {
    setTimeout(() => {
      updateThemeIcon();
      updateMenuIcon();
    }, 10); // đợi PaperMod đổi class .dark
  });

  // Lần đầu khi load
  updateThemeIcon();
  updateMenuIcon();

  // Cập nhật icon khi resize (mobile ↔ desktop)
  window.addEventListener("resize", updateThemeIcon);

  // Toggle menu mở/đóng
  toggle?.addEventListener("click", function () {
    document.body.classList.toggle("menu-open");
  });

  // Auto đóng menu khi scroll xuống
  let lastScroll = window.scrollY;
  window.addEventListener("scroll", function () {
    const current = window.scrollY;
    if (document.body.classList.contains("menu-open") && current > lastScroll) {
      document.body.classList.remove("menu-open");
    }
    lastScroll = current;
  });
});