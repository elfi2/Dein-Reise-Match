// 1. Supabase Verbindung aufsetzen
const SUPABASE_URL = "https://kqqzxkhiylxfjgxkrvpd.supabase.co";
const SUPABASE_KEY = "sb_publishable_4uFBv3Zs2oYV3uo-3ni3xg_dsKcuXyD";
const supabaseClient = window.supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

// 2. Leere Container für unsere Cloud-Daten
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

// Event Listener
if(startBtn) startBtn.addEventListener('click', startQuiz);
if(restartBtn) restartBtn.addEventListener('click', startQuiz);

document.addEventListener("DOMContentLoaded", async () => {
    // Versteckt beim Start die anderen Bildschirme
    if(quizScreen) quizScreen.classList.add('hidden');
    if(resultScreen) resultScreen.classList.add('hidden');
    
    // Deaktiviert den Start-Button kurz, bis die Daten aus der Cloud da sind
    if(startBtn) {
        startBtn.innerText = "Daten werden geladen...";
        startBtn.disabled = true;
    }

    // Läd alle Daten aus Supabase im Hintergrund
    await ladeDatenAusSupabase();
    
    // Reiseplan aufklappen
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

// NEU: Zieht sich die Fragen und Reise-Texte live aus Supabase
async function ladeDatenAusSupabase() {
    try {
        // 1. Quiz-Fragen laden und nach Sortierung ordnen
        const { data: fragenData, error: fragenError } = await supabaseClient
            .from('quiz_fragen')
            .select('*')
            .order('sort_order', { ascending: true });
        if (fragenError) throw fragenError;
        quizQuestions = fragenData;

        // 2. Reise-Texte, Bilder und Programme laden
        const { data: detailsData, error: detailsError } = await supabaseClient
            .from('reise_details')
            .select('*');
        if (detailsError) throw detailsError;
        reiseDetails = detailsData;

        // Start-Button wieder freigeben
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

// Schneidet die Zahlen ab (aus "1. Toskana" wird "Toskana" für die H1-Überschrift)
function holeSauberenNamen(nameRaw) {
    if (!nameRaw) return "Unbekanntes VAYO-Match";
    return nameRaw.replace(/^\d+\.\s*/, '').trim();
}

function zeigeAusgewaehlteReise(index) {
    const reise = topMatchesZwischenspeicher[index]; // Hier steht z.B. "1. Toskana" drin
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

    // NEU: Sucht die passenden Texte live in den geladenen Supabase-Daten
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
    } else {
        document.getElementById('match-headline').innerText = "Dein VAYO-Abenteuer wartet!";
        document.getElementById('match-description').innerText = `Genial! Dein Charakter-Vibe hat eine Übereinstimmung von ${reise.prozent}% mit diesem Trip! (Bitte Reisedetails im Backend hinterlegen)`;
        if(piktoBox) piktoBox.innerHTML = "";
        if(itinerarySteps) itinerarySteps.innerHTML = "<div class='day-step'>Reiseplan ist in Vorbereitung...</div>";
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

// Deine bewährte Matching-Logik (bleibt unangetastet!)
async function berechneErgebnis() {
    quizScreen.classList.add('hidden');
    resultScreen.classList.remove('hidden');
    
    const rankingListElement = document.getElementById('ranking-list');
    if(rankingListElement) rankingListElement.innerHTML = "";

    try {
        // Zieht die Matrix für die Berechnung live aus der Supabase-Tabelle 'reisen'
        const { data: reisen, error } = await supabaseClient.from('reisen').select('*');
        if (error) throw error;

        // Die 10 exakt verknüpften Spaltennamen deiner Supabase-Datenbank
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
        const matchNameBox = document.getElementById('match-name');
        if(matchNameBox) matchNameBox.innerText = "Verbindungsfehler zur Datenbank";
    }
}