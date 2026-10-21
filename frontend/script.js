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