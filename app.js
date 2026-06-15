// 1. Supabase Verbindung aufsetzen
const SUPABASE_URL = "https://kqqzxkhiylxfjgxkrvpd.supabase.co";
const SUPABASE_KEY = "sb_publishable_4uFBv3Zs2oYV3uo-3ni3xg_dsKcuXyD";
const supabaseClient = supabase.createClient(SUPABASE_URL, SUPABASE_KEY);
 
// Piktogramm-Mapping passend zum VAYO-Branding (Bleibt im Code, da es reines Design/Style ist)
const piktogrammMapping = {
    "TOSKANA": { icon: "fa-solid fa-mortar-pestle", color: "#FFAA00" },
    "ALPEN-TREKKING": { icon: "fa-solid fa-boot", color: "#00A896" },
    "MALTA": { icon: "fa-solid fa-champagne-glasses", color: "#FF4A7A" },
    "ISLAND": { icon: "fa-solid fa-caravan", color: "#FFAA00" },
    "ATLANTIK": { icon: "fa-solid fa-water", color: "#00A896" },
    "WEST COAST": { icon: "fa-solid fa-van-shuttle", color: "#FFAA00" },
    "SCHOTTLAND": { icon: "fa-solid fa-fort-awesome", color: "#FF4A7A" },
    "SCHWEDEN": { icon: "fa-solid fa-campground", color: "#FF4A7A" },
    "THAILAND": { icon: "fa-solid fa-leaf", color: "#00A896" },
    "ÖSTERREICH": { icon: "fa-solid fa-person-skiing", color: "#00A896" },
    "GRIECHENLAND": { icon: "fa-solid fa-spa", color: "#00A896" },
    "NEW YORK": { icon: "fa-solid fa-city", color: "#FF4A7A" },
    "Default": { icon: "fa-solid fa-map-location-dot", color: "#00A896" }
};
 
// Container für die dynamischen Cloud-Daten
let quizQuestions = [];
let reiseDetails = [];
let currentQuestionIndex = 0;
let userAnswers = [];
let topMatchesZwischenspeicher = [];

// DOM Elemente
const startBtn = document.getElementById('start-btn');
const restartBtn = document.getElementById('restart-btn');
const ctaBtn = document.getElementById('cta-btn');
const startScreen = document.getElementById('start-screen');
const quizScreen = document.getElementById('quiz-screen');
const resultScreen = document.getElementById('result-screen');
const questionTextElement = document.getElementById('question-text');
const answerButtonsElement = document.getElementById('answer-buttons');
const progressElement = document.getElementById('progress');
const matchNameElement = document.getElementById('match-name');

// Pop-up DOM Elemente
const contactModal = document.getElementById('contact-modal');
const closeModalBtn = document.getElementById('close-modal-btn');
const contactForm = document.getElementById('vayo-contact-form');
const successMessage = document.getElementById('success-message');
const hiddenDestinationInput = document.getElementById('form-match-destination');
 
if(startBtn) startBtn.addEventListener('click', startQuiz);
if(restartBtn) restartBtn.addEventListener('click', startQuiz);
 
document.addEventListener("DOMContentLoaded", async () => {
    if(quizScreen) quizScreen.classList.add('hidden');
    if(resultScreen) resultScreen.classList.add('hidden');
    
    if(startBtn) {
        startBtn.innerText = "Daten werden geladen...";
        startBtn.disabled = true;
    }

    // Lädt Fragen und Details live aus der Cloud
    await ladeDatenAusSupabase();

    const trigger = document.getElementById('vayo-details-trigger');
    if(trigger) {
        trigger.addEventListener('click', () => {
            const box = document.getElementById('vayo-full-itinerary');
            if(box) {
                box.classList.toggle('hidden');
                trigger.innerHTML = box.classList.contains('hidden') 
                    ? `<i class="fa-solid fa-circle-info"></i> Vollständigen Reiseplan anzeigen`
                    : `<i class="fa-solid fa-circle-chevron-up"></i> Reiseplan einklappen`;
            }
        });
    }

    // Modal öffnen/schließen
    if (ctaBtn) {
        ctaBtn.addEventListener('click', () => {
            if (contactModal) contactModal.classList.remove('hidden');
        });
    }

    if (closeModalBtn) {
        closeModalBtn.addEventListener('click', () => {
            if (contactModal) contactModal.classList.add('hidden');
        });
    }

    window.addEventListener('click', (e) => {
        if (e.target === contactModal) contactModal.classList.add('hidden');
    });

    // Formular an Supabase senden
    if (contactForm) {
        contactForm.addEventListener('submit', async (e) => {
            e.preventDefault();

            const name = document.getElementById('form-name').value;
            const email = document.getElementById('form-email').value;
            const zeitraum = document.getElementById('form-zeitraum').value;
            const nachricht = document.getElementById('form-nachricht').value;
            const reiseziel = hiddenDestinationInput.value;

            try {
                const { error } = await supabaseClient
                    .from('anfragen')
                    .insert([
                        { 
                            name: name, 
                            email: email, 
                            zeitraum: zeitraum, 
                            nachricht: nachricht, 
                            reiseziel: reiseziel 
                        }
                    ]);

                if (error) throw error;

                contactForm.classList.add('hidden');
                if (successMessage) successMessage.classList.remove('hidden');

                setTimeout(() => {
                    contactModal.classList.add('hidden');
                    contactForm.reset();
                    contactForm.classList.remove('hidden');
                    successMessage.classList.add('hidden');
                }, 4000);

            } catch (err) {
                console.error("Fehler beim Speichern:", err);
                alert("Ups, da gab es ein Problem. Bitte versuche es noch einmal!");
            }
        });
    }
});

// Holt die Fragen und Texte live aus Supabase
async function ladeDatenAusSupabase() {
    try {
        const { data: fragenData, error: fragenError } = await supabaseClient
            .from('quiz_fragen')
            .select('*')
            .order('sort_order', { ascending: true });
        if (fragenError) throw fragenError;
        quizQuestions = fragenData;

        const { data: detailsData, error: detailsError } = await supabaseClient
            .from('reise_details')
            .select('*');
        if (detailsError) throw detailsError;
        reiseDetails = detailsData;

        if(startBtn) {
            startBtn.innerText = "Jetzt Quiz starten";
            startBtn.disabled = false;
        }
    } catch (err) {
        console.error("Fehler beim Laden:", err);
    }
}
 
function startQuiz() {
    startScreen.classList.add('hidden');
    resultScreen.classList.add('hidden');
    quizScreen.classList.remove('hidden');
    const box = document.getElementById('vayo-full-itinerary');
    if(box) box.classList.add('hidden');
    currentQuestionIndex = 0;
    userAnswers = [];
    showNextQuestion();
}
 
function showNextQuestion() {
    resetAnswerButtons();
    const progressPercent = (currentQuestionIndex / quizQuestions.length) * 100;
    if(progressElement) progressElement.style.width = progressPercent + '%';
 
    if (currentQuestionIndex >= quizQuestions.length) {
        berechneErgebnis();
        return;
    }
 
    const currentQuestion = quizQuestions[currentQuestionIndex];
    if(questionTextElement) questionTextElement.innerText = currentQuestion.question;
 
    currentQuestion.answers.forEach(answer => {
        const button = document.createElement('button');
        button.innerText = answer.text;
        button.classList.add('btn');
        button.dataset.option = answer.option; 
        button.addEventListener('click', selectAnswer);
        if(answerButtonsElement) answerButtonsElement.appendChild(button);
    });
}
 
function resetAnswerButtons() {
    if(answerButtonsElement) {
        while (answerButtonsElement.firstChild) {
            answerButtonsElement.removeChild(answerButtonsElement.firstChild);
        }
    }
}
 
function selectAnswer(e) {
    const selectedButton = e.target;
    userAnswers.push(selectedButton.dataset.option);
    currentQuestionIndex++;
    showNextQuestion();
}
 
function holeSauberenNamen(nameRaw) {
    if (!nameRaw) return "Unbekanntes VAYO-Match";
    return nameRaw.replace(/^\d+\.\s*/, '').trim();
}
 
async function berechneErgebnis() {
    quizScreen.classList.add('hidden');
    resultScreen.classList.remove('hidden');
    
    const rankingListElement = document.getElementById('ranking-list');
    const itinerarySteps = document.getElementById('itinerary-steps');
    const detailsTrigger = document.getElementById('vayo-details-trigger');
    
    if(rankingListElement) rankingListElement.innerHTML = "";
    if(itinerarySteps) itinerarySteps.innerHTML = "";
 
    try {
        const { data: reisen, error } = await supabaseClient.from('reisen').select('*');
        if (error) throw error;
 
        const kategorienSpalten = ['fokus', 'unterkuenfte', 'wetter', 'kulisse', 'transport', 'lage', 'unterkunft_art', 'dauer', 'zielgruppe', 'kulturraum', 'fitness', 'gepaeck', 'digital', 'verpflegung', 'gruppe', 'lernfokus', 'co2', 'abend', 'zeitplan', 'wohlfuehl'];
 
        let reisenMitPunkten = reisen.map(reise => {
            let punkte = 0;
            userAnswers.forEach((antwort, index) => {
                if (reise[kategorienSpalten[index]] === antwort) punkte++;
            });
            return { ...reise, punkte, prozent: Math.round((punkte / quizQuestions.length) * 100) };
        });
 
        reisenMitPunkten.sort((a, b) => b.punkte - a.punkte);
        const topMatch = reisenMitPunkten[0];
 
        if (topMatch && topMatch.punkte > 0) {
            const saubererTopName = holeSauberenNamen(topMatch.name);
            matchNameElement.innerText = saubererTopName;

            if (hiddenDestinationInput) hiddenDestinationInput.value = saubererTopName;
             
            let mappingKey = Object.keys(piktogrammMapping).find(k => saubererTopName.toUpperCase().includes(k.toUpperCase()));
            let meta = piktogrammMapping[mappingKey] || piktogrammMapping["Default"];
             
            const piktoBox = document.getElementById('vayo-piktogramm-box');
            if(piktoBox) {
                piktoBox.innerHTML = `<i class="${meta.icon}"></i>`;
                piktoBox.style.backgroundColor = meta.color;
            }
 
            // Sucht das Match dynamisch in den aus Supabase geladenen Details
            const zielData = reiseDetails.find(detail => detail.portfolio_key.toUpperCase().includes(saubererTopName.toUpperCase()));
             
            if (zielData) {
                if(detailsTrigger) detailsTrigger.classList.remove('hidden');
                document.getElementById('match-headline').innerText = zielData.headline;
                document.getElementById('match-description').innerText = zielData.teaser;
                 
                zielData.programm.forEach(schritt => {
                    const parts = schritt.split(':');
                    const stepDiv = document.createElement('div');
                    stepDiv.className = "day-step";
                    if(parts.length > 1) {
                        stepDiv.innerHTML = `<span class="day-title">${parts[0]}:</span>${parts.slice(1).join(':')}`;
                    } else {
                        stepDiv.innerHTML = schritt;
                    }
                    itinerarySteps.appendChild(stepDiv);
                });
            } else {
                if(detailsTrigger) detailsTrigger.classList.add('hidden');
                document.getElementById('match-headline').innerText = "Dein VAYO-Abenteuer wartet!";
                document.getElementById('match-description').innerText = `Genial! Dein persönlicher Charakter-Vibe hat eine Übereinstimmung von ${topMatch.prozent}% mit diesem Trip!`;
            }
             
            if (rankingListElement) {
                rankingListElement.innerHTML = "<h3>Deine weiteren Plätze:</h3>";
 
                for (let i = 1; i < Math.min(reisenMitPunkten.length, 5); i++) {
                    const r = reisenMitPunkten[i];
                    const bereinigterRangName = holeSauberenNamen(r.name);
                     
                    const item = document.createElement('div');
                    item.className = "ranking-item";
                    item.innerHTML = `
                        <span class="rank-name">Platz ${i + 1}: ${bereinigterRangName}</span>
                        <span class="rank-pct">${r.prozent}%</span>
                    `;
                    rankingListElement.appendChild(item);
                }
            }
        } else {
            matchNameElement.innerText = "Berechnung läuft...";
        }
    } catch (err) {
        console.error(err);
        matchNameElement.innerText = "Verbindungsfehler";
    }
}
