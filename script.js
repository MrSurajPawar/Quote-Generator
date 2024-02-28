let quoteContainer = document.getElementById("quote-container");
let quoteText = document.getElementById("quote");
let authorText = document.getElementById("author");
let twitterBtn = document.getElementById("twitter");
let newQuoteBtn = document.getElementById("new-quote"); 
let loader = document.getElementById("loader");

let apiQuotes = []; //api array which will contain all the objects of the JSON file, array of the json objects

function showLoadingSpinner() {
    loader.hidden = false;
    quoteContainer.hidden = true;
}

function removeLoadingSpinner() {
    if (!loader.hidden) {
        quoteContainer.hidden = false;
        loader.hidden = true;
    }
}

//Show new quote
function newQuote() {
    showLoadingSpinner();
    //pick any random quote using Math.random() and Math.floor()
    let quote = apiQuotes[ Math.floor(Math.random() * apiQuotes.length) ];
    
    //checking if author field is black and replace it with 'Unknown'
    if (!quote.author) {
        authorText.textContent = "Unknown";
    } else {
        authorText.textContent = quote.author;
    }

    //Check quote length to determine styling
    if (quote.text.length > 120) {
        quoteText.classList.add("long-quote");
    } else {
        quoteText.classList.remove("long-quote");
    }

    //Set quote , hide loader
    quoteText.textContent = quote.text;
    removeLoadingSpinner();
}

//Get data from the API 
async function getQuotesFromTheApi() {
    showLoadingSpinner();
    const apiUrl = "https://jacintodesign.github.io/quotes-api/data/quotes.json";
    try {
        const response = await fetch( apiUrl);
        apiQuotes = await response.json();
        newQuote();
    } catch (error) {
        //Handling the error here
        alert(error);
    }
}

//Tweet quotes
function tweetQuote() {
    const twitterUrl = `https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${authorText.textContent}`;
    window.open(twitterUrl , "_blank");
}

//buttons click events 
newQuoteBtn.addEventListener("click" , newQuote);
twitterBtn.addEventListener("click" , tweetQuote);


//calling it for the first time
getQuotesFromTheApi();