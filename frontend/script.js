console.log("Cloud Resume Project Started");

async function updateCounter() {
    try {
        const response = await fetch(
            "https://dg-resume-api-a3gta8ajg7dpaagx.southcentralus-01.azurewebsites.net/api/counter"
        );

        const data = await response.json();

        document.getElementById("counter").textContent = data.count;
    } catch (error) {
        console.error("Failed to load counter:", error);

        document.getElementById("counter").textContent = "Error";
    }
}

updateCounter();

const themeButton = document.getElementById("theme-toggle");

// Check if user previously selected a theme
const savedTheme = localStorage.getItem("theme");

// If user has a saved preference, use it
if (savedTheme) {

    if (savedTheme === "dark") {

        document.body.classList.add("dark-mode");

        themeButton.textContent = "☀️";

        themeButton.setAttribute(
            "aria-label",
            "Switch to light mode"
        );

        themeButton.setAttribute(
            "title",
            "Switch to light mode"
        );

    }

} else {

    // No saved preference exists
    // Use operating system preference

    if (
        window.matchMedia(
            "(prefers-color-scheme: dark)"
        ).matches
    ) {

        document.body.classList.add("dark-mode");

        themeButton.textContent = "☀️";

        themeButton.setAttribute(
            "aria-label",
            "Switch to light mode"
        );

        themeButton.setAttribute(
            "title",
            "Switch to light mode"
        );

    }
}

// Toggle button click handler
themeButton.addEventListener("click", () => {

    document.body.classList.toggle("dark-mode");

    if (document.body.classList.contains("dark-mode")) {

        themeButton.textContent = "☀️";

        themeButton.setAttribute(
            "aria-label",
            "Switch to light mode"
        );

        themeButton.setAttribute(
            "title",
            "Switch to light mode"
        );

        localStorage.setItem(
            "theme",
            "dark"
        );

    } else {

        themeButton.textContent = "🌙";

        themeButton.setAttribute(
            "aria-label",
            "Switch to dark mode"
        );

        themeButton.setAttribute(
            "title",
            "Switch to dark mode"
        );

        localStorage.setItem(
            "theme",
            "light"
        );
    }
});
