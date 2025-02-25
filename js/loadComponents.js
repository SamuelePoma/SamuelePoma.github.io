// loadComponents.js

// Wait for the DOM content to be loaded
document.addEventListener("DOMContentLoaded", () => {
    // Load header and footer, then initialize all functionalities
    loadHeaderFooter().then(() => {
        applySavedTheme();
        initializeDarkModeToggle();
        initializeMobileNav();
        initializeProjectPopups();
        initializeContactModal();
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
            // In dark mode, move the indicator to the right edge
            indicator.classList.add("translate-x-10"); // Approximately 44px
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

                // Display the images with alt text for accessibility
                details.images.forEach(imgSrc => {
                    const imageElement = document.createElement('img');
                    imageElement.src = imgSrc;
                    imageElement.alt = details.title + " image";
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
                // Remove initial transition classes
                modal.classList.remove("hidden");
                // Use a timeout to allow the transition to occur
                setTimeout(() => {
                    modalContent.classList.remove("scale-95", "opacity-0");
                }, 10);
            });
        });
        // Function to close the modal with a transition
        function closeModal() {
            // Add classes for closing transition
            modalContent.classList.add("scale-95", "opacity-0");
            // After the transition, hide the modal
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
