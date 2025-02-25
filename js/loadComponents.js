// loadComponents.js

// Wait for the DOM content to be loaded
document.addEventListener("DOMContentLoaded", () => {
    // Load header and footer, then initialize all functionalities
    loadHeaderFooter().then(() => {
        applySavedTheme();
        initializeDarkModeToggle();
        initializeMobileNav();
        initializeProjectPopups();
    });
    loadFooter();
});

// Load dynamic header content and return a Promise so we can chain initialization
function loadHeaderFooter() {
    return fetch("../components/header.html")
        .then(response => response.text())
        .then(data => {
            document.getElementById("header").innerHTML = data;
        });
}

// Load dynamic footer content
function loadFooter() {
    fetch("../components/footer.html")
        .then(response => response.text())
        .then(data => {
            document.getElementById("footer").innerHTML = data;
        });
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
            indicator.classList.add("translate-x-8");
            indicator.innerHTML = "☀️";
            indicator.classList.remove("bg-blue-950");
            indicator.classList.add("bg-yellow-400");
        } else {
            indicator.classList.remove("translate-x-8");
            indicator.innerHTML = "🌙";
            indicator.classList.add("bg-blue-950");
            indicator.classList.remove("bg-yellow-400");
        }
    }

    // Toggle theme on button click
    toggleButton.addEventListener("click", () => {
        document.documentElement.classList.toggle("dark");
        const currentTheme = document.documentElement.classList.contains("dark") ? "dark" : "light";
        localStorage.setItem("theme", currentTheme); // Save selected theme to localStorage
        updateToggle();
    });
    updateToggle(); // Set the correct icon on load
}

// Initialize mobile navigation toggle functionality
function initializeMobileNav() {
    const mobileMenuToggle = document.getElementById("mobile-menu-toggle");
    const mobileMenu = document.getElementById("mobile-menu");

    if (mobileMenuToggle && mobileMenu) {
        mobileMenuToggle.addEventListener("click", () => {
            mobileMenu.classList.toggle("hidden");
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

    // Project details for the popup
    const projectDetails = {
        musetrail: {
            title: "MuseTrail",
            description: "A full-stack web application aimed at reducing CO2 emissions among young adults by promoting sustainable digital habits.",
            images: ["../assets/Flyer.jpg", "../assets/dragon.jpg"]
        },
        chessgame: {
            title: "ChessGame",
            description: "A text-based chess game developed using object-oriented programming principles and design patterns.",
            images: ["../assets/Flyer.jpg", "../assets/dragon.jpg"]
        },
        laravelproject: {
            title: "Laravel Project",
            description: "A collaborative project to develop software for monitoring power usage and managing faulty transformers for Stedin.net.",
            images: ["../assets/Flyer.jpg", "../assets/dragon.jpg"]
        },
        oopproject: {
            title: "OOP Project",
            description: "Designed and developed an educational game for elementary schools in the Netherlands as part of a team project.",
            images: ["../assets/Flyer.jpg", "../assets/dragon.jpg"]
        }
    };

    // Add event listener for each project card button
    projectCards.forEach(button => {
        button.addEventListener('click', () => {
            const projectKey = button.parentElement.dataset.project;
            const details = projectDetails[projectKey];

            if (details) {
                // Update popup content
                popupTitle.textContent = details.title;
                popupDescription.textContent = details.description;
                popupImages.innerHTML = ''; // Clear existing images

                // Display the images
                details.images.forEach(imgSrc => {
                    const imageElement = document.createElement('img');
                    imageElement.src = imgSrc;
                    imageElement.classList.add('rounded-lg', 'shadow-lg', 'max-w-full', 'h-auto');
                    popupImages.appendChild(imageElement);
                });

                // Show the modal popup
                popupModal.classList.remove('hidden');
                popupModal.classList.add('flex');
            }
        });
    });

    // Close the popup when the close button is clicked
    closePopup.addEventListener('click', () => {
        popupModal.classList.add('hidden');
        popupModal.classList.remove('flex');
    });

    // Close the popup when clicking outside the modal
    popupModal.addEventListener('click', (event) => {
        if (event.target === popupModal) {
            popupModal.classList.add('hidden');
            popupModal.classList.remove('flex');
        }
    });
}

// Synchronize theme across pages when it is changed in another tab
window.addEventListener("storage", () => {
    applySavedTheme();
});
