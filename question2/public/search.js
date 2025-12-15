const searchBar = document.getElementById("searchBar");
const wordList = document.getElementById("wordList");

let words = [];

fetch("/words")
  .then(res => res.json())
  .then(data => {
    words = data;
    renderList(words);
  });

function renderList(list) {
  wordList.innerHTML = "";

  list.forEach(word => {
    const li = document.createElement("li");
    li.textContent = word;
    wordList.appendChild(li);
  });
}

searchBar.addEventListener("input", () => {
  const input = searchBar.value.toLowerCase();

  const filtered = words.filter(word =>
    word.toLowerCase().startsWith(input)
  );

  renderList(filtered);
});