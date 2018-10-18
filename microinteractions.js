/**
 * Micro-transaction 1 - zoeken op titel
 */
function searchClicked() {
    /**
     * Krijg de waarde uit de zoekbalk
     * Krijg een lijst met titels op basis van de H3-tag
     * Krijg een lijst met articles
     * Zoek alle articles waar de title (gedeeltelijk) overeenkomt met de searchQuery
     * Maak alle 'matchende' articles in de kleur aqua.
     */
    let searchQuery = document.querySelector(".zoeken input").value;
    let titles = document.querySelectorAll("#overview article h3");
    let articles = document.querySelectorAll("#overview article");
    for(let i = 0; i < titles.length; i++) {
        let title = titles[i].textContent;
        if (title.toLowerCase().indexOf(searchQuery.toLowerCase()) === -1) { // Als de titel niet overeenkomt
            articles[i].classList.remove("found"); // Verwijder de "found" class
        }
        else {
            articles[i].classList.add("found"); // Voeg de "found" class toe
        }
    }
    checkboxChange(document.querySelector("input[id=filter-check]")); // Filter boxes wanneer aangevinkt.
}

/**
 * Micro-transaction 2 - Hover over de boxes (in- en uitklappen)
 */
function mouseEvent() {
    /**
     * Maak alle articles klein, als je er overheen hovert, maak ze weer groter.
     */
    for(let article of document.querySelectorAll("#overview article")) {
        article.classList.add("small");
        article.addEventListener("mouseover", onMouseOver, false);
        article.addEventListener("mouseout", onMouseOut, false);
    }
}
function onMouseOver() {
    this.classList.remove("small") // Verwijder de kleine class zodra de muis uit de box is.
}
function onMouseOut() {
    this.classList.add("small") // Voeg de kleine class toe zodra de muis in de box is.
}

/**
 * Micro-transaction 3 - Verstop niet-matchende zoekresultaten
 */
function checkboxChange(elem) {
    /**
     * Verstop 'non-"found"' tekst wanneer gefilterd/gezocht.
     */
    let articles = [...document.querySelectorAll("#overview article")]; // Pak alle articles en zet NodeList om naar array (https://stackoverflow.com/a/32767009)
    let articles_to_show = articles.filter(article => article.classList.contains("found")); // Vind alle articles met de class "found" erin
    if(elem.checked && articles_to_show.length > 0) { // Als filter aangevinkt + er zijn articles om te verstoppen, dan..
        let articles_to_hide = articles.filter(article => !article.classList.contains("found")); // Vind alle articles zonder class "found"
        articles_to_hide.map(article => article.classList.add("hide")); // 'Loop' alle articles om te verstoppen en de "hide" class toe te voegen
        articles_to_show.map(article => article.classList.remove("hide")); // 'Loop' alle articles om the "hide" class te showen en hiden
    } else { // Anders, laat alle artikelen zien
        articles.map(article => article.classList.remove("hide")); // 'Loop' alle articles and verwijder "hide" class
    }
}

/**
 * Ipv jQuery en het command:
 *  $(document).ready({
 *      //code hier
 *  });
 *  Oplossing gebruikt op basis van: https://stackoverflow.com/a/800010
 */
document.addEventListener("DOMContentLoaded", function() {
    document.querySelector(".klik").addEventListener("click", searchClicked);
    mouseEvent();


    document.querySelector("input[id=filter-check]").addEventListener( 'change', function() {checkboxChange(this)});
});

