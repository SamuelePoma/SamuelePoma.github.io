// cookieConsent.js

// Dynamically load the Cookie Consent CSS from CDN
(function() {
    // Create and append the link element for the CSS
    var link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = "https://cdnjs.cloudflare.com/ajax/libs/cookieconsent2/3.1.0/cookieconsent.min.css";
    document.head.appendChild(link);

    // Create and append the script element for the Cookie Consent JS
    var script = document.createElement("script");
    script.src = "https://cdnjs.cloudflare.com/ajax/libs/cookieconsent2/3.1.0/cookieconsent.min.js";
    script.onload = function() {
        // Initialize the cookie consent banner after the window loads
        window.addEventListener("load", function(){
            window.cookieconsent.initialise({
                palette: {
                    popup: { background: "#000" },
                    button: { background: "#f1d600" }
                },
                theme: "classic",
                content: {
                    message: "Questo sito utilizza cookie per garantire la migliore esperienza.",
                    dismiss: "Accetto",
                    link: "Maggiori informazioni",
                    href: "/privacy.html" // Update with your privacy policy URL
                },
                // Callback triggered when the consent status changes
                onStatusChange: function(status, chosenBefore) {
                    // Check if the user has consented
                    if (this.hasConsented()) {
                        // Update consent mode: grant consent for ads and analytics
                        gtag('consent', 'update', {
                            'ad_user_data': 'granted',
                            'ad_personalization': 'granted',
                            'ad_storage': 'granted',
                            'analytics_storage': 'granted'
                        });
                        // Load gtag.js if it's not already loaded
                        if (!document.querySelector('script[src^="https://www.googletagmanager.com/gtag/js"]')) {
                            var gtagScript = document.createElement('script');
                            gtagScript.async = true;
                            gtagScript.src = 'https://www.googletagmanager.com/gtag/js?id=G-20VNX32D8L';
                            document.head.appendChild(gtagScript);
                        }
                    }
                }
            });
        });
    };
    document.head.appendChild(script);
})();
