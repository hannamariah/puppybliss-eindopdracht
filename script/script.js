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

//OpenAI. (2024, June 1). "achtergrondmuziek werkt niet, heb je andere opties?'[Online conversation]. [Online conversation]. ChatGPT (Version 2). https://openai.com
const achtergrondMuziek = document.getElementById("backgroundMusic");

// Timers om regelmatig blijdschap en hygiëne te verlagen
const blijdschapInterval = setInterval(verlaagBlijdschap, 2000); // Verlaag elke 2 seconden
const hygiëneInterval = setInterval(verlaagHygiëne, 3000); // Verlaag elke 3 seconden


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
        achtergrondMuziek.play();
    }
}
    
// Functie voor het bijwerken van de status van het huisdier
function updateStatus() {
    trekSpan.textContent = trek; 
    blijdschapSpan.textContent = blijdschap; 
    hygiëneSpan.textContent = hygiëne; 
    checkPetStatus(); // Controleer regelmatig de status van het huisdier
}

updateStatus(); // Voert de updateStatus-functie uit wanneer de pagina laadt

// Interval om de status van het huisdier regelmatig te controleren
const statusCheckInterval = setInterval(checkPetStatus, 100); 

// Functie voor het controleren van de status van het huisdier
function checkPetStatus() {
    if (trek <= 0 || blijdschap <= 0 || hygiëne <= 0) {
        clearInterval(statusCheckInterval); // Stop het interval
        trek = 0; // Zet trek op 0
        blijdschap = 0; // Zet blijdschap op 0
        hygiëne = 0; // Zet hygiëne op 0
        voerButton.disabled = true; // Zet de voerknop uit
        speelButton.disabled = true; // Zet de speelknop uit
        schoonButton.disabled = true; // Zet de schoonknop uit
        // Afbeelding van overleden huisdier
        speelGif.src = "gifs/rip.gif";
        setTimeout(function() {
            confirm("Helaas is je puppy overleden..");
        }, 100);
    }
}

function interactieVoeren() {
    if (trek < 100) { // Als trek minder is dan 100
        trek += 10; // Voeg 10 toe aan trek
        if (trek > 100) { // Als trek meer dan 100 is
            trek = 100; // Zet trek op 100
        }
        if (blijdschap < 100) { // Als blijdschap minder is dan 100
            blijdschap += 5; // Voeg 5 toe aan blijdschap
        }
    }  
    
    updateStatus(); // Werk de status bij
}


  
function interactieSpelen() {
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

function interactieSchoonmaken() {
    if (hygiëne < 100) { // Als hygiëne minder is dan 100
        hygiëne += 10; // Voeg 10 toe aan hygiëne
        if (hygiëne > 100) { // Als hygiëne meer dan 100 is
            hygiëne = 100; // Zet hygiëne op 100
        }
        updateStatus(); // Werk de status bij
    }
}

function verlaagBlijdschap() {
    if (blijdschap > 0) {
        blijdschap -= 10; // Verlaag met 20 in plaats van 10
        if (blijdschap < 0) {
            blijdschap = 0;
        }
        updateStatus();
    }
}

function verlaagHygiëne() {
    if (hygiëne > 0) {
        hygiëne -= 10; // Verlaag met 20 in plaats van 10
        if (hygiëne < 0) {
            hygiëne = 0;
        }
        updateStatus();
    }
}

function veranderNaarSpeelGif() {
    speelGif.src = "gifs/play.gif"; // Verander de GIF naar de speel-GIF
    speelGif.classList.add("stuiter"); 
}

function veranderNaarSchoonGif() {
    schoonGif.src = "gifs/clean.gif"; // Verander de GIF naar de schoon-GIF
    schoonGif.classList.add("stuiter"); 
}

function veranderNaarVoerGif() {
    voerGif.src = "gifs/feed.gif"; // Verander de GIF naar de voer-GIF
    voerGif.classList.add("stuiter"); 
}

// Event listeners //
// Dit zijn de acties die gebeuren wanneer je op een knop klikt//

voerButton.addEventListener('click', interactieVoeren); // Als je op de voerknop klikt, voer het huisdier
speelButton.addEventListener('click', interactieSpelen); // Als je op de speelknop klikt, speel met het huisdier
schoonButton.addEventListener('click', interactieSchoonmaken); // Als je op de schoonknop klikt, maak het huisdier schoon
naamButton.addEventListener("click", logInput); // Als je op de naamknop klikt, log de ingevoerde naam
speelButton.addEventListener("click", veranderNaarSpeelGif); // Als je op de speelknop klikt, verander de GIF naar de speel-GIF
schoonButton.addEventListener("click", veranderNaarSchoonGif); // Als je op de schoonknop klikt, verander de GIF naar de schoon-GIF
voerButton.addEventListener("click", veranderNaarVoerGif); // Als je op de voerknop klikt, verander de GIF naar de voer-GIF

updateStatus(); // Werk de status bij als de pagina laadt










