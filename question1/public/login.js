const form = document.getElementById("loginForm");
const button = document.getElementById("submitBtn");
const message = document.getElementById("message");

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const username = document.getElementById("username").value.trim();
    const password = document.getElementById("password").value.trim();

    const originalText = button.textContent;
    button.textContent = "loading...";
    message.textContent = "";

    try {
        await sleep(3000);
        const response = await fetch("/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ username, password })
        });

        const result = await response.json();

        if (!response.ok) {
            throw result.error;
        }

        message.textContent = `Username: ${result.user.username}, Password: ${result.user.password}`;

    } catch (error) {
        message.textContent = error;
    }

    button.textContent = originalText;
});