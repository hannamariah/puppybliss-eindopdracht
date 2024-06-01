// constanten - lett- functies-addeventlister//
// Constanten
// Dit zijn dingen die we uit de HTML halen en die we niet veranderen
const naamInput = document.getElementById("nameInput"); // Het vakje waar je de naam van je huisdier invult
const naamButton = document.getElementById("nameButton"); // De knop om de naam te bevestigen
const h2 = document.querySelector("h2"); // Het kopje waar de begroeting komt te staan
const trekSpan = document.querySelector('#trek'); // Het vakje waar de "trek" (honger) wordt getoond
const blijdschapSpan = document.querySelector('#blijdschap'); // Het vakje waar de "blijdschap" (blij zijn) wordt getoond
const hygiëneSpan = document.querySelector('#hygiëne'); // Het vakje waar de "hygiëne" wordt getoond
const voerButton = document.querySelector('#voer'); // De knop om je huisdier te voeren
const speelButton = document.querySelector('#speel'); // De knop om met je huisdier te spelen
const schoonButton = document.querySelector('#schoon'); // De knop om je huisdier schoon te maken
const speelGif = document.getElementById("mijnGif"); // De afbeelding van je huisdier
const schoonGif = document.getElementById("mijnGif"); // ''//
const voerGif = document.getElementById("mijnGif"); // ''//

// Timers om regelmatig blijdschap en hygiëne te verlagen
const blijdschapInterval = setInterval(decreaseBlijdschap, 10000); // Elke 10 seconden wordt blijdschap verlaagd
const hygiëneInterval = setInterval(decreaseHygiëne, 15000); // Elke 15 seconden wordt hygiëne verlaagd

// Variabelen (let)
// Dit zijn dingen die we kunnen veranderen
let trek = 100; // Startwaarde voor trek (honger)
let blijdschap = 100; // Startwaarde voor blijdschap (blij zijn)
let hygiëne = 100; // Startwaarde voor hygiëne (schoonheid)
let tamagotchiNaam; // De naam van je huisdier

// Functies
function logInput() {
    tamagotchiNaam = naamInput.value; // Haal de naam uit het invoervakje
    if (naamInput.value === "") { // Controleer of er een naam is ingevoerd
        alert("Voer aub eerst een naam in voor je puppy"); // Waarschuwing als er geen naam is ingevoerd
    } else { // Als er wel een naam is ingevoerd
        h2.textContent = "Hi, mijn naam is " + tamagotchiNaam; // Laat de naam zien op het scherm, naam veranderen met textcontent
    }
}
    
function updateStatus() {
    trekSpan.textContent = trek; // Laat de huidige trek zien
    blijdschapSpan.textContent = blijdschap; // Laat de huidige blijdschap zien
    hygiëneSpan.textContent = hygiëne; // Laat de huidige hygiëne zien
}

updateStatus(); // voert uit//

function checkPetStatus() {
    if (trek <= 0 || blijdschap <= 0 || hygiëne <= 0) { // Als één van deze waarden 0 of lager is
        clearInterval(blijdschapInterval); // Stop de blijdschap-timer
        clearInterval(hygiëneInterval); // Stop de hygiëne-timer
        trek = 0; // Zet trek op 0
        blijdschap = 0; // Zet blijdschap op 0
        hygiëne = 0; // Zet hygiëne op 0
        voerButton.disabled = true; // Zet de voerknop uit
        speelButton.disabled = true; // Zet de speelknop uit
        schoonButton.disabled = true; // Zet de schoonknop uit
        setTimeout(() => { // Wacht een korte tijd
            alert("Helaas is je huisdier overleden"); // Geef een waarschuwing dat het huisdier is overleden
        }, 100);
    }
}
    checkPetStatus(); // Controleer de status van het huisdier

function interactionFeed() {
    if (trek < 100) { // Als trek minder is dan 100
        trek += 10; // Voeg 10 toe aan trek
        if (trek > 100) { // Als trek meer dan 100 is
            trek = 100; // Zet trek op 100
        }
        if (blijdschap < 100) { // Als blijdschap minder is dan 100
            blijdschap += 5; // Voeg 5 toe aan blijdschap
        }
    }
}

  updateStatus(); // Werk de status bij
  
function interactionPlay() {
    if (blijdschap < 100) { // Als blijdschap minder is dan 100
        blijdschap += 10; // Voeg 10 toe aan blijdschap
        if (blijdschap > 100) { // Als blijdschap meer dan 100 is
            blijdschap = 100; // Zet blijdschap op 100
        }
        if (trek > 0) { // Als trek meer dan 0 is
            let randomDecrease = Math.floor(Math.random() * 10) + 1; // Verminder trek met een willekeurig getal tussen 1 en 10
            trek -= randomDecrease; // Trek dat getal af van trek
            if (trek < 0) { // Als trek minder dan 0 is
                trek = 0; // Zet trek op 0
            }
        }
        updateStatus(); // Werk de status bij
    }
}

function interactionClean() {
    if (hygiëne < 100) { // Als hygiëne minder is dan 100
        hygiëne += 10; // Voeg 10 toe aan hygiëne
        if (hygiëne > 100) { // Als hygiëne meer dan 100 is
            hygiëne = 100; // Zet hygiëne op 100
        }
        updateStatus(); // Werk de status bij
    }
}

function decreaseBlijdschap() {
    if (blijdschap > 0) { // Als blijdschap meer dan 0 is
        blijdschap -= 10; // Verminder blijdschap met 10
        if (blijdschap < 0) { // Als blijdschap minder dan 0 is
            blijdschap = 0; // Zet blijdschap op 0
        }
        updateStatus(); // Werk de status bij
    }
}

function decreaseHygiëne() {
    if (hygiëne > 0) { // Als hygiëne meer dan 0 is
        hygiëne -= 10; // Verminder hygiëne met 10
        if (hygiëne < 0) { // Als hygiëne minder dan 0 is
            hygiëne = 0; // Zet hygiëne op 0
        }
        updateStatus(); // Werk de status bij
    }
}

function changeToPlayGif() {
    speelGif.src = "gifs/play.gif"; // Verander de GIF naar de speel-GIF
    speelGif.classList.add("stuiter"); 
}

function changeToCleanGif() {
    schoonGif.src = "gifs/clean.gif"; // Verander de GIF naar de schoon-GIF
    schoonGif.classList.add("stuiter"); 
}

function changeToFeedGif() {
    voerGif.src = "gifs/feed.gif"; // Verander de GIF naar de voer-GIF
    voerGif.classList.add("stuiter"); 
}

// Event listeners //
// Dit zijn de acties die gebeuren wanneer je op een knop klikt//
voerButton.addEventListener('click', interactionFeed); // Als je op de voerknop klikt, voer het huisdier
speelButton.addEventListener('click', interactionPlay); // Als je op de speelknop klikt, speel met het huisdier
schoonButton.addEventListener('click', interactionClean); // Als je op de schoonknop klikt, maak het huisdier schoon
naamButton.addEventListener("click", logInput); // Als je op de naamknop klikt, log de ingevoerde naam
speelButton.addEventListener("click", changeToPlayGif); // Als je op de speelknop klikt, verander de GIF naar de speel-GIF
schoonButton.addEventListener("click", changeToCleanGif); // Als je op de schoonknop klikt, verander de GIF naar de schoon-GIF
voerButton.addEventListener("click", changeToFeedGif); // Als je op de voerknop klikt, verander de GIF naar de voer-GIF

updateStatus(); // Werk de status bij als de pagina laadt










