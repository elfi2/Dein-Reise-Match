// 1. Supabase Verbindung aufsetzen
const SUPABASE_URL = "https://kqqzxkhiylxfjgxkrvpd.supabase.co";
const SUPABASE_KEY = "sb_publishable_4uFBv3Zs2oYV3uo-3ni3xg_dsKcuXyD";
const supabaseClient = supabase.createClient(SUPABASE_URL, SUPABASE_KEY);
 
// Piktogramm-Mapping passend zum VAYO-Branding
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

// Dynamische Speicher aus der DB
let quizQuestions = [];
let reiseDetails = [];
let currentQuestionIndex = 0;
let userAnswers = [];
let topMatchesZwischenspeicher = [];

// Statische Termine für das Formular
const verfuegbareTermine = {
    "1. Toskana": ["15.08.2026 - 22.08.2026", "10.09.2026 - 17.09.2026"],
    "2. Alpen-Trekking": ["01.07.2026 - 08.07.2026", "15.07.2026 - 22.07.2026"],
    "3. Malta": ["20.06.2026 - 30.06.2026", "15.08.2026 - 25.08.2026"],
    "4. Island": ["05.09.2026 - 17.09.2026"],
    "5. Frankreich Surf": ["01.08.2026 - 15.08.2026"],
    "6. West Coast USA": ["10.09.2026 - 01.10.2026"],
    "7. Schottland": ["01.10.2026 - 11.10.2026"],
    "8. Schweden Kanu": ["10.07.2026 - 20.07.2026"],
    "9. Thailand": ["15.11.2026 - 06.12.2026"],
    "10. Ski-Camp": ["15.02.2027 - 22.02.2027"],
    "11. Griechenland": ["05.09.2026 - 12.09.2026"],
    "12. New York City": ["01.12.2026 - 09.12.2026"]
};
 
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

const contactModal = document.getElementById('contact-modal');
const closeModalBtn = document.getElementById('close-modal-btn');
const tripSelect = document.getElementById('trip-selection');
const dateSelectContainer = document.getElementById('date-selection-container');
const dateSelect = document.getElementById('date-selection');
const contactForm = document.getElementById('vayo-contact-form');
const successMessage = document.getElementById('success-message');
const submitBtn = document.getElementById('submit-contact-btn');
 
if(startBtn) startBtn.addEventListener('click', startQuiz);
if(restartBtn) restartBtn.addEventListener('click', startQuiz);
 
document.addEventListener("DOMContentLoaded", async () => {
    if(quizScreen) quizScreen.classList.add('hidden');
    if(resultScreen) resultScreen.classList.add('hidden');
    
    if(startBtn) {
        startBtn.innerText = "Daten laden...";
        startBtn.disabled = true;
    }

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
});

async function ladeDatenAusSupabase() {
    try {
        const { data: fragen, error: e1 } = await supabaseClient.from('quiz_fragen').select('*').order('sort_order', { ascending: true });
        if(e1) throw e1;
        quizQuestions = fragen;

        const { data: details, error: e2 } = await supabaseClient.from('reise_details').select('*');
        if(e2) throw e2;
        reiseDetails = details;

        if(startBtn) {
            startBtn.innerText = "Jetzt Quiz starten";
            startBtn.disabled = false;
        }
    } catch(err) {
        console.error(err);
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
    topMatchesZwischenspeicher = [];
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

// REPARATUR: Macht die Plätze wieder voll anklickbar!
function zeigeAusgewaehlteReise(index) {
    const reise = topMatchesZwischenspeicher[index];
    if (!reise) return;

    const saubererName = holeSauberenNamen(reise.name);
    matchNameElement.innerText = saubererName;

    const itinerarySteps = document.getElementById('itinerary-steps');
    if(itinerarySteps) itinerarySteps.innerHTML = "";

    let mappingKey = Object.keys(piktogrammMapping).find(k => saubererName.toUpperCase().includes(k.toUpperCase()));
    let meta = piktogrammMapping[mappingKey] || piktogrammMapping["Default"];
     
    const piktoBox = document.getElementById('vayo-piktogramm-box');
    if(piktoBox) {
        piktoBox.innerHTML = `<i class="${meta.icon}"></i>`;
        piktoBox.style.backgroundColor = meta.color;
    }

    const zielData = reiseDetails.find(detail => detail.portfolio_key === reise.name);
     
    if (zielData) {
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
    }

    document.querySelectorAll('.ranking-item').forEach((item, idx) => {
        if(idx === index) {
            item.classList.add('active-card');
        } else {
            item.classList.remove('active-card');
        }
    });
}
 
async function berechneErgebnis() {
    quizScreen.classList.add('hidden');
    resultScreen.classList.remove('hidden');
    
    const rankingListElement = document.getElementById('ranking-list');
    if(rankingListElement) rankingListElement.innerHTML = "";
 
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
        topMatchesZwischenspeicher = reisenMitPunkten.slice(0, 5);
 
        zeigeAusgewaehlteReise(0);
         
        if (rankingListElement) {
            rankingListElement.innerHTML = "<h3>Deine weiteren Plätze:</h3>";
 
            topMatchesZwischenspeicher.forEach((r, i) => {
                if(i === 0) return; // Platz 1 ist die Hauptkarte
                const bereinigterRangName = holeSauberenNamen(r.name);
                 
                const item = document.createElement('div');
                item.className = "ranking-item";
                item.innerHTML = `
                    <span class="rank-name">Platz ${i + 1}: ${bereinigterRangName}</span>
                    <span class="rank-pct">${r.prozent}%</span>
                `;
                item.addEventListener('click', () => zeigeAusgewaehlteReise(i));
                rankingListElement.appendChild(item);
            });
        }
    } catch (err) {
        console.error(err);
    }
}

// --- FORMULAR LOGIK ---
function ladeTermine(reiseKey) {
    dateSelect.innerHTML = '<option value="">Bitte Termin wählen...</option>';
    const termine = verfuegbareTermine[reiseKey] || ["Auf Anfrage"];
    termine.forEach(t => {
        const o = document.createElement('option');
        o.value = t; o.textContent = t; dateSelect.appendChild(o);
    });
    dateSelectContainer.classList.remove('hidden');
}

if(tripSelect) {
    tripSelect.addEventListener('change', (e) => {
        if(e.target.value) ladeTermine(e.target.value);
        else dateSelectContainer.classList.add('hidden');
    });
}

if(ctaBtn) {
    ctaBtn.addEventListener('click', () => {
        contactForm.reset();
        contactForm.classList.remove('hidden');
        successMessage.classList.add('hidden');
        
        tripSelect.innerHTML = '<option value="">Bitte wählen...</option>';
        reiseDetails.forEach(r => {
            const o = document.createElement('option');
            o.value = r.portfolio_key; o.textContent = holeSauberenNamen(r.portfolio_key);
            tripSelect.appendChild(o);
        });

        if(topMatchesZwischenspeicher.length > 0) {
            const activeMatch = topMatchesZwischenspeicher[0].name;
            tripSelect.value = activeMatch;
            ladeTermine(activeMatch);
        }
        contactModal.classList.remove('hidden');
    });
}

if(closeModalBtn) closeModalBtn.addEventListener('click', () => contactModal.classList.add('hidden'));

if(contactForm) {
    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        submitBtn.innerText = "Wird gesendet...";
        submitBtn.disabled = true;

        try {
            const { error } = await supabaseClient.from('anfragen').insert([{
                name: document.getElementById('user-name').value,
                geburtsdatum: document.getElementById('user-dob').value,
                reise: holeSauberenNamen(tripSelect.value),
                termin: dateSelect.value,
                anmerkungen: document.getElementById('user-remarks').value
            }]);
            if(error) throw error;
            contactForm.classList.add('hidden');
            successMessage.classList.remove('hidden');
        } catch(err) {
            alert("Fehler beim Senden!");
        } finally {
            submitBtn.innerText = "Kostenlos anfragen";
            submitBtn.disabled = false;
        }
    });
}
