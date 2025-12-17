const titleSearchForm = document.getElementById("titleSearchForm");
const userTitleInput = document.getElementById("userTitleInput");
const detailsFromTitle = document.getElementById("detailsFromTitle");

titleSearchForm.addEventListener("click", async () => {
    try {
        const result = await fetch(`/bookByTitle?title=${encodeURIComponent(userTitleInput.value)}`);
        const bookDetails = await result.json();
        const finalBookDetails = JSON.stringify(bookDetails);

        detailsFromTitle.textContent = `title: ${finalBookDetails.title}, genre: ${finalBookDetails.genre}`;
        userTitleInput.value = "";
        
    } catch(err) {
        console.log(err);
    }
})