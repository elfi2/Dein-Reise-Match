// 1. Supabase Verbindung aufsetzen
const SUPABASE_URL = "https://kqqzxkhiylxfjgxkrvpd.supabase.co";
const SUPABASE_KEY = "sb_publishable_4uFBv3Zs2oYV3uo-3ni3xg_dsKcuXyD";
const supabaseClient = window.supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

// 2. Daten Container
let quizQuestions = [];
let reiseDetails = [];
let currentQuestionIndex = 0;
let userAnswers = [];
let topMatchesZwischenspeicher = [];

// 3. Fiktive (oder echte) Termine für das Dropdown
// Du kannst diese Daten hier jederzeit ganz einfach anpassen
const verfuegbareTermine = {
    "1. Toskana": ["15.08.2026 - 22.08.2026", "10.09.2026 - 17.09.2026"],
    "2. Alpen-Trekking": ["01.07.2026 - 08.07.2026", "15.07.2026 - 22.07.2026", "12.08.2026 - 19.08.2026"],
    "3. Malta": ["20.06.2026 - 30.06.2026", "15.08.2026 - 25.08.2026"],
    "4. Island": ["05.09.2026 - 17.09.2026", "20.09.2026 - 02.10.2026"],
    "5. Frankreich Surf": ["01.08.2026 - 15.08.2026", "15.08.2026 - 29.08.2026"],
    "6. West Coast USA": ["10.09.2026 - 01.10.2026"],
    "7. Schottland": ["01.10.2026 - 11.10.2026", "15.10.2026 - 25.10.2026"],
    "8. Schweden Kanu": ["10.07.2026 - 20.07.2026", "05.08.2026 - 15.08.2026"],
    "9. Thailand": ["15.11.2026 - 06.12.2026", "10.01.2027 - 31.01.2027"],
    "10. Ski-Camp": ["15.02.2027 - 22.02.2027", "01.03.2027 - 08.03.2027"],
    "11. Griechenland": ["05.09.2026 - 12.09.2026"],
    "12. New York City": ["01.12.2026 - 09.12.2026", "10.12.2026 - 18.12.2026"]
};

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

// Event Listener
if(startBtn) startBtn.addEventListener('click', startQuiz);
if(restartBtn) restartBtn.addEventListener('click', startQuiz);

document.addEventListener("DOMContentLoaded", async () => {
    if(quizScreen) quizScreen.classList.add('hidden');
    if(resultScreen) resultScreen.classList.add('hidden');
    
    if(startBtn) {
        startBtn.innerText = "Daten werden geladen...";
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
                    ? `Vollständigen Reiseplan anzeigen`
                    : `Reiseplan einklappen`;
            }
        });
    }
});

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
            startBtn.innerText = "Quiz starten";
            startBtn.disabled = false;
        }
    } catch (err) {
        console.error("Fehler beim Laden der Supabase-Daten:", err);
        if(startBtn) startBtn.innerText = "Fehler beim Laden";
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

function zeigeAusgewaehlteReise(index) {
    const reise = topMatchesZwischenspeicher[index];
    if (!reise) return;

    const saubererName = holeSauberenNamen(reise.name);
    matchNameElement.innerText = saubererName;

    const statusTitle = document.getElementById('match-status-title');
    if(statusTitle) {
        statusTitle.innerText = index === 0 ? "Dein perfektes Match:" : `VAYO Match (Platz ${index + 1}):`;
    }

    const piktoBox = document.getElementById('vayo-piktogramm-box');
    const itinerarySteps = document.getElementById('itinerary-steps');
    if(itinerarySteps) itinerarySteps.innerHTML = "";

    const zielData = reiseDetails.find(detail => detail.portfolio_key === reise.name);

    if (zielData) {
        document.getElementById('match-headline').innerText = zielData.headline;
        document.getElementById('match-description').innerText = zielData.teaser;
        
        if (piktoBox && zielData.img) {
            piktoBox.innerHTML = `<img src="${zielData.img}?t=${new Date().getTime()}" alt="VAYO Vibe">`;
        }

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

    const box = document.getElementById('vayo-full-itinerary');
    const trigger = document.getElementById('vayo-details-trigger');
    if(box) box.classList.add('hidden');
    if(trigger) trigger.innerHTML = `Vollständigen Reiseplan anzeigen`;
}

async function berechneErgebnis() {
    quizScreen.classList.add('hidden');
    resultScreen.classList.remove('hidden');
    
    const rankingListElement = document.getElementById('ranking-list');
    if(rankingListElement) rankingListElement.innerHTML = "";

    try {
        const { data: reisen, error } = await supabaseClient.from('reisen').select('*');
        if (error) throw error;

        const kategorienSpalten = ['fokus', 'wetter', 'kulisse', 'transport', 'lage', 'unterkunft_art', 'zielgruppe', 'abend', 'dauer', 'unterkuenfte'];

        let reisenMitPunkten = reisen.map(reise => {
            let punkte = 0;
            userAnswers.forEach((antwort, index) => {
                if (reise[kategorienSpalten[index]] === antwort || 
                    (antwort === "Kurzstreckenflug" && reise[kategorienSpalten[index]] === "Langstreckenflug" && reise.dauer === "2 bis 3 Wochen") ||
                    (antwort === "Rundreise" && reise[kategorienSpalten[index]] === "1 Unterkunftswechsel")) {
                    punkte++;
                }
            });
            return { ...reise, punkte, prozent: Math.round((punkte / quizQuestions.length) * 100) };
        });

        reisenMitPunkten.sort((a, b) => b.punkte - a.punkte);
        topMatchesZwischenspeicher = reisenMitPunkten.slice(0, 5);

        zeigeAusgewaehlteReise(0);
        
        if (rankingListElement) {
            rankingListElement.innerHTML = "<h3>Klicke auf eine Reise für Details:</h3>";

            topMatchesZwischenspeicher.forEach((r, i) => {
                const bereinigterRangName = holeSauberenNamen(r.name);
                
                const item = document.createElement('div');
                item.className = "ranking-item";
                if(i === 0) item.classList.add('active-card');
                
                item.innerHTML = `
                    <span class="rank-name">Platz ${i + 1}: ${bereinigterRangName}</span>
                    <span class="rank-pct">${r.prozent}%</span>
                `;
                
                item.addEventListener('click', () => zeigeAusgewaehlteReise(i));
                rankingListElement.appendChild(item);
            });
        }
    } catch (err) {
        console.error("Fehler beim Berechnen des Ergebnisses:", err);
    }
}

// --- NEU: MODAL & ANFRAGE LOGIK ---
const contactModal = document.getElementById('contact-modal');
const closeModalBtn = document.getElementById('close-modal-btn');
const tripSelect = document.getElementById('trip-selection');
const dateSelectContainer = document.getElementById('date-selection-container');
const dateSelect = document.getElementById('date-selection');
const contactForm = document.getElementById('vayo-contact-form');
const successMessage = document.getElementById('success-message');
const submitBtn = document.getElementById('submit-contact-btn');

// Funktion zum Befüllen der Termine basierend auf der Reise-Auswahl
function ladeTermine(reiseKey) {
    dateSelect.innerHTML = '<option value="">Bitte Termin wählen...</option>';
    const termine = verfuegbareTermine[reiseKey] || ["Auf Anfrage"];
    
    termine.forEach(termin => {
        const option = document.createElement('option');
        option.value = termin;
        option.textContent = termin;
        dateSelect.appendChild(option);
    });
    
    // Termin-Feld einblenden, wenn Termine da sind
    dateSelectContainer.classList.remove('hidden');
}

// Wenn sich die Reiseauswahl ändert, passe die Termine an
if(tripSelect) {
    tripSelect.addEventListener('change', (e) => {
        const selectedKey = e.target.value;
        if(selectedKey) {
            ladeTermine(selectedKey);
        } else {
            dateSelectContainer.classList.add('hidden');
        }
    });
}

// Modal öffnen
if(ctaBtn) {
    ctaBtn.addEventListener('click', () => {
        // Formular Reset
        contactForm.reset();
        contactForm.classList.remove('hidden');
        successMessage.classList.add('hidden');
        dateSelectContainer.classList.add('hidden');
        
        // Reise Dropdown befüllen
        tripSelect.innerHTML = '<option value="">Bitte wählen...</option>';
        reiseDetails.forEach(reise => {
            const option = document.createElement('option');
            option.value = reise.portfolio_key;
            option.textContent = holeSauberenNamen(reise.portfolio_key); 
            tripSelect.appendChild(option);
        });

        // Top-Match vorauswählen und Termine laden
        if (topMatchesZwischenspeicher.length > 0) {
            const topMatchKey = topMatchesZwischenspeicher[0].name;
            tripSelect.value = topMatchKey;
            ladeTermine(topMatchKey);
        }

        contactModal.classList.remove('hidden');
    });
}

// Modal schließen
if(closeModalBtn) {
    closeModalBtn.addEventListener('click', () => {
        contactModal.classList.add('hidden');
    });
}

// Formular in die Supabase Datenbank senden!
if(contactForm) {
    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault(); // Verhindert das Neuladen der Seite
        
        submitBtn.innerText = "Wird gesendet...";
        submitBtn.disabled = true;

        const nameValue = document.getElementById('user-name').value;
        const dobValue = document.getElementById('user-dob').value;
        const reiseValue = holeSauberenNamen(document.getElementById('trip-selection').value);
        const terminValue = document.getElementById('date-selection').value;
        const remarksValue = document.getElementById('user-remarks').value;

        try {
            // Daten an die neue 'anfragen' Tabelle schicken
            const { error } = await supabaseClient
                .from('anfragen')
                .insert([
                    { 
                        name: nameValue, 
                        geburtsdatum: dobValue, 
                        reise: reiseValue, 
                        termin: terminValue,
                        anmerkungen: remarksValue 
                    }
                ]);

            if (error) throw error;

            // Erfolgsmeldung zeigen
            contactForm.classList.add('hidden');
            successMessage.classList.remove('hidden');

        } catch (err) {
            console.error("Fehler beim Senden der Anfrage:", err);
            alert("Es gab leider ein Problem beim Senden. Bitte versuche es später noch einmal!");
        } finally {
            submitBtn.innerText = "Kostenlos anfragen";
            submitBtn.disabled = false;
        }
    });
}
