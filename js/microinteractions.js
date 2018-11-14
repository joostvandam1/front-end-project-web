/**
 * Micro-transaction 1 - search by title
 */
function searchClicked() {
    /**
     * Get the value from the searchbox
     * Get a list of titles based on the H3 tag
     * Get a list of articles
     * Find all articles where the title (partially) matches the Search Query
     * Color all the matching articles aqua.
     */
    let searchQuery = document.querySelector(".zoeken input").value;
    let titles = document.querySelectorAll(".overview article h3");
    let articles = document.querySelectorAll(".overview article");
    for(let i = 0; i < titles.length; i++) {
        let title = titles[i].textContent;
        if (title.toLowerCase().indexOf(searchQuery.toLowerCase()) === -1) { // If title doesn't match
            articles[i].classList.remove("found"); // Remove the found class
        }
        else {
            articles[i].classList.add("found"); // Else add the found class
        }
    }
    checkboxChange(document.querySelector("input[class=filter-check]")); // Filter boxes if checked.
}

function readArticle(elem) {
    let storyDiv = elem.parentElement.getElementsByClassName("story");
    if(storyDiv.length === 0) { return; }
    storyDiv = storyDiv[0];
    storyDiv.getElementsByClassName("rest")[0].classList.toggle("hidden");
}

/**
 * Micro-transaction 2 - Hover over boxes
 */
function mouseEvent() {
    /**
     * Make all articles small, once you hover over them, make them larger again.
     */
    for(let article of document.querySelectorAll(".overview article")) {
        article.classList.add("small");
        article.addEventListener("mouseover", onMouseOver, false);
        article.addEventListener("mouseout", onMouseOut, false);
    }
}
function onMouseOver() {
    this.classList.remove("small") // Remove the small class once the mouse hovers out of the box
}
function onMouseOut() {
    this.classList.add("small") // Add the small class once the mouse hovers into the box
}

/**
 * Micro-transaction 3 - Hide non-matching search results
 */
function checkboxChange(elem) {
    /**
     * Hide not found text boxed when checked and searched.
     */
    let articles = [...document.querySelectorAll(".overview article")]; // Get all articles and convert NodeList to array (https://stackoverflow.com/a/32767009)
    let articles_to_show = articles.filter(article => article.classList.contains("found")); // Find all articles that do have the class "found" in them
    if(elem.checked && articles_to_show.length > 0) { // If filter is checked, and there are some found you can hide
        let articles_to_hide = articles.filter(article => !article.classList.contains("found")); // Find all articles that do NOT have the class "found" in them
        articles_to_hide.map(article => article.classList.add("hide")); // Loop over all articles to hide and add the "hide" class
        articles_to_show.map(article => article.classList.remove("hide")); // Loop over all articles to show and remove the "hide" class
    } else { // Otherwise show all articles
        articles.map(article => article.classList.remove("hide")); // Loop over all articles and remove the "hide" class
    }
}

/**
 * Micro-transaction 4 - Like article & store to local storage
 */
function microInteraction5() {
    for(let elem of document.querySelectorAll(".mdi")) {
        elem.addEventListener("click", function() {likeArticle(this)});
    }

    for (let i = 0; i < localStorage.length; i++){
        let key = localStorage.key(i);
        let bool = JSON.parse(localStorage.getItem(key));
        let elem = document.getElementById(key).getElementsByClassName("mdi")[0];
        setLiked(elem, bool);
    }
}
function likeArticle(elem) {
    let liked = elem.classList.toggle("liked");
    localStorage.setItem(elem.parentElement.parentElement.id, JSON.stringify(liked));
    setLiked(elem, liked);
}
function setLiked(elem, liked) {
    elem.classList.toggle("mdi-heart-outline", !liked);
    elem.classList.toggle("mdi-heart", liked);
    let num = document.getElementsByClassName("mdi-heart").length;
    document.documentElement.style.setProperty('--content', "'"+num+"'");
}

/**
 * Instead of using jQuery and the command:
 *  $(document).ready({
 *      //code here
 *  });
 *  I used vanilla JavaScript, based on this answer: https://stackoverflow.com/a/800010
 */
document.addEventListener("DOMContentLoaded", function() {
    document.querySelector(".klik").addEventListener("click", searchClicked);
    mouseEvent();

    document.querySelector("input[class=filter-check]").addEventListener( 'change', function() {checkboxChange(this)});

    for(let elem of document.querySelectorAll(".read")) {
        elem.addEventListener("click", function() {readArticle(this)});
    }

    microInteraction5();

});

