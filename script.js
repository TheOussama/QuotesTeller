const quoteContainer = document.querySelector("#quote-container");
const quoteText = document.querySelector("#quote");
const authorText = document.querySelector("#author");
const audioBtn = document.querySelector("#microphone");
const newQuoteBtn = document.querySelector("#new-quote");
const audioElement =document.querySelector('#audio');
const loader = document.querySelector("#loader");



// show loading
function loading() {
  loader.hidden = false;
  quoteContainer.hidden = true;
}


// hide loading 
function complete(){
  if(!loader.hidden){
    quoteContainer.hidden = false;
    loader.hidden = true;
  }
}
/// get quote form api

async function getQuote() {
  loading();
  // i use our apiUrl is consider save so you need to add to it a free proxy 
  const proxyUrl = "https://cors-anywhere.herokuapp.com/";
  const apiUrl =
    "http://api.forismatic.com/api/1.0/?method=getQuote&lang=en&format=json";

  try {
    const response = await fetch(proxyUrl + apiUrl);
    const data = await response.json();
    // if Author is blank , add 'unkonw'
    if (data.quoteAuthor === "") {
      authorText.innerText = "Unkonwn";
    } else {
      authorText.innerText = data.quoteAuthor;
    }
    //reduce font size for long quotes
    if (data.quoteText.length > 120) {
      quoteText.classList.add("long-quote");
    } else {
      quoteText.classList.remove("long-quote");
    }
    quoteText.innerText = data.quoteText;

    // Stop loader , Show quote;
    complete();

  } catch (error) {
    getQuote();
    console.log("whoops no quote", error);

  }
}

function tellQuote() {
  let quote =  quoteText.innerText;
  const jokeString = quote.trim().replace(/ /g, '%20');
  // VoiceRSS Speech Parameters
  VoiceRSS.speech({
    // this is my own key if you want yours you need register in 
    //http://www.voicerss.org/login.aspx
    key: 'b38fc04e5c0840498b89ce520919a88b',
    src: jokeString,
    hl: 'en-us',
    r: 0,
    c: 'mp3',
    f: '44khz_16bit_stereo',
    ssml: false,
  });
}

// Envet listtenrs
newQuoteBtn.addEventListener("click", getQuote);
audioBtn.addEventListener("click", tellQuote);


// On load
getQuote();
