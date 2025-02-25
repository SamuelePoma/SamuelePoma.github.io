// Wait for the DOM content to be loaded
document.addEventListener("DOMContentLoaded", async () => {
    // Load header and footer, then initialize functionalities
    await loadHeaderFooter();
    applySavedTheme();
    initializeDarkModeToggle();
    initializeMobileNav();
    initializeProjectPopups();
    initializeContactModal();
    loadFooter();
  });
  
  // Load dynamic header content using async/await for proper timing
  async function loadHeaderFooter() {
    try {
      const response = await fetch("components/header.html");
      const data = await response.text();
      document.getElementById("header").innerHTML = data;
    } catch (error) {
      console.error("Error loading header:", error);
    }
  }
  
  // Load dynamic footer content using async/await
  async function loadFooter() {
    try {
      const response = await fetch("components/footer.html");
      const data = await response.text();
      document.getElementById("footer").innerHTML = data;
    } catch (error) {
      console.error("Error loading footer:", error);
    }
  }

// Apply the saved theme from localStorage
function applySavedTheme() {
    const savedTheme = localStorage.getItem("theme") || "light"; // Default to light mode
    if (savedTheme === "dark") {
        document.documentElement.classList.add("dark");
    } else {
        document.documentElement.classList.remove("dark");
    }
}

// Initialize the dark mode toggle functionality
function initializeDarkModeToggle() {
    const toggleButton = document.getElementById("theme-toggle");
    const indicator = document.getElementById("toggle-indicator");

    if (!toggleButton || !indicator) return;

    // Function to update toggle icon based on current theme
    function updateToggle() {
        if (document.documentElement.classList.contains("dark")) {
            indicator.classList.add("translate-x-10");
            indicator.innerHTML = "☀️";
            indicator.classList.remove("bg-blue-950");
            indicator.classList.add("bg-yellow-400");
        } else {
            indicator.classList.remove("translate-x-10");
            indicator.innerHTML = "🌙";
            indicator.classList.add("bg-blue-950");
            indicator.classList.remove("bg-yellow-400");
        }
    }

    toggleButton.addEventListener("click", () => {
        document.documentElement.classList.toggle("dark");
        const currentTheme = document.documentElement.classList.contains("dark") ? "dark" : "light";
        localStorage.setItem("theme", currentTheme);
        updateToggle();
    });
    updateToggle();
}

// Initialize mobile navigation toggle functionality
// Initialize mobile navigation toggle functionality
function initializeMobileNav() {
  const mobileMenuToggle = document.getElementById("mobile-menu-toggle");
  const mobileMenu = document.getElementById("mobile-menu");
  const mainContent = document.getElementById("main-content");

  if (mobileMenuToggle && mobileMenu && mainContent) {
    mobileMenuToggle.addEventListener("click", () => {
      mobileMenu.classList.toggle("hidden");
      // Shift main content down when the mobile menu opens
      mainContent.classList.toggle("translate-y-32");
    });

    // Close the menu when a link is clicked
    const mobileLinks = mobileMenu.querySelectorAll("a");
    mobileLinks.forEach(link => {
      link.addEventListener("click", () => {
        mobileMenu.classList.add("hidden");
        mainContent.classList.remove("translate-y-32");
      });
    });
  }
}

// Initialize project popups for project cards
function initializeProjectPopups() {
    const projectCards = document.querySelectorAll('.show-popup');
    const popupModal = document.getElementById('popup-modal');
    const popupTitle = document.getElementById('popup-title');
    const popupDescription = document.getElementById('popup-description');
    const popupImages = document.getElementById('popup-images');
    const closePopup = document.getElementById('close-popup');

    if (!projectCards || !popupModal || !popupTitle || !popupDescription || !popupImages || !closePopup) return;

    const projectDetails = {
        musetrail: {
            title: "MuseTrail",
            description: "A full-stack web application aimed at reducing CO2 emissions among young adults by promoting sustainable digital habits.",
            images: ["assets/Flyer.jpg", "assets/dragon.jpg"]
        },
        chessgame: {
            title: "ChessGame",
            description: "A text-based chess game developed using object-oriented programming principles and design patterns.",
            images: ["assets/Flyer.jpg", "assets/dragon.jpg"]
        },
        laravelproject: {
            title: "Laravel Project",
            description: "A collaborative project to develop software for monitoring power usage and managing faulty transformers.",
            images: ["assets/Flyer.jpg", "assets/dragon.jpg"]
        },
        oopproject: {
            title: "OOP Project",
            description: "Designed and developed an educational game for elementary schools in the Netherlands as part of a team project.",
            images: ["assets/Flyer.jpg", "assets/dragon.jpg"]
        }
    };

    projectCards.forEach(button => {
        button.addEventListener('click', () => {
            const projectKey = button.parentElement.dataset.project;
            const details = projectDetails[projectKey];

            if (details) {
                popupTitle.textContent = details.title;
                popupDescription.textContent = details.description;
                popupImages.innerHTML = '';
                details.images.forEach(imgSrc => {
                    const imageElement = document.createElement('img');
                    imageElement.src = imgSrc;
                    imageElement.alt = details.title + " image";
                    imageElement.classList.add('rounded-lg', 'shadow-lg', 'max-w-full', 'h-auto');
                    popupImages.appendChild(imageElement);
                });
                popupModal.classList.remove('hidden');
                popupModal.classList.add('flex');
            }
        });
    });

    closePopup.addEventListener('click', () => {
        popupModal.classList.add('hidden');
        popupModal.classList.remove('flex');
    });

    popupModal.addEventListener('click', (event) => {
        if (event.target === popupModal) {
            popupModal.classList.add('hidden');
            popupModal.classList.remove('flex');
        }
    });
}

// Initialize contact modal functionality
function initializeContactModal() {
    const contactLinks = document.querySelectorAll(".contact-link");
    const modal = document.getElementById("contact-modal");
    const modalContent = document.getElementById("contact-modal-content");
    const closeModalButton = document.getElementById("close-contact-modal");

    if (contactLinks && modal && modalContent && closeModalButton) {
        contactLinks.forEach(link => {
            link.addEventListener("click", (e) => {
                e.preventDefault();
                modal.classList.remove("hidden");
                setTimeout(() => {
                    modalContent.classList.remove("scale-95", "opacity-0");
                }, 10);
            });
        });
        function closeModal() {
            modalContent.classList.add("scale-95", "opacity-0");
            setTimeout(() => {
                modal.classList.add("hidden");
            }, 300);
        }
        closeModalButton.addEventListener("click", closeModal);
        modal.addEventListener("click", (e) => {
            if (e.target === modal) {
                closeModal();
            }
        });
    }
}

// Synchronize theme across pages when changed in another tab
window.addEventListener("storage", () => {
    applySavedTheme();
});
