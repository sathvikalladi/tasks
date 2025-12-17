const output = document.getElementById("output");

const issBtn = document.getElementById("issBtn");
const weatherBtn = document.getElementById("weatherBtn");
const githubBtn = document.getElementById("githubBtn");

issBtn.addEventListener("click", async () => {
    const res = await fetch("/api/iss");
    const data = await res.json();
    output.textContent = JSON.stringify(data); 
});
    
    weatherBtn.addEventListener("click", async () => {
    const res = await fetch("/api/weather");
    const data = await res.json();
    output.textContent = JSON.stringify(data);
});
    
    githubBtn.addEventListener("click", async () => {
    const res = await fetch("/api/github");
    const data = await res.json();
    output.textContent = JSON.stringify(data);

});