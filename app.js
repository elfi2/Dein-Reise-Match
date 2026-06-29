// 1. Supabase Verbindung aufsetzen
const SUPABASE_URL = "https://kqqzxkhiylxfjgxkrvpd.supabase.co";
const SUPABASE_KEY = "sb_publishable_4uFBv3Zs2oYV3uo-3ni3xg_dsKcuXyD";
const supabaseClient = supabase.createClient(SUPABASE_URL, SUPABASE_KEY);
 
// MAPPING FÜR DEINE ECHTEN DATEINAMEN & BRANDING-FARBEN
const piktogrammMapping = {
    "1. Toskana": { src: "toskana.png", color: "#FFAA00" },
    "2. Alpen-Trekking": { src: "alpen-trekking.png", color: "#00A896" },
    "3. Malta": { src: "malta.png", color: "#FF4A7A" },
    "4. Island": { src: "island.png", color: "#FFAA00" },
    "5. Frankreich Surf": { src: "frankreich surf.png", color: "#00A896" },
    "6. West Coast USA": { src: "west coast usa.png", color: "#FFAA00" },
    "7. Schottland": { src: "schottland.png", color: "#FF4A7A" },
    "8. Schweden Kanu": { src: "schweden kanu.png", color: "#FF4A7A" },
    "9. Thailand": { src: "thailand.png", color: "#00A896" },
    "10. Ski-Camp": { src: "ski-camp.png", color: "#00A896" },
    "11. Griechenland": { src: "griechenland.png", color: "#00A896" },
    "12. New York City": { src: "new york city.png", color: "#FF4A7A" },
    "Default": { src: "logo.png", color: "#00A896" }
};
 
let quizQuestions = [];
let reiseDetails = [];
let currentQuestionIndex = 0;
let userAnswers = [];
let topMatchesZwischenspeicher = [];
 
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
    if(startBtn) { startBtn.innerText = "Daten laden..."; startBtn.disabled = true; }
    setTimeout(() => {
        if(startBtn && startBtn.disabled) {
            startBtn.innerText = "Jetzt Quiz starten";
            startBtn.disabled = false;
        }
    }, 2000);
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
        if(startBtn) { startBtn.innerText = "Jetzt Quiz starten"; startBtn.disabled = false; }
    } catch(err) { console.error(err); }
}
 
function startQuiz() {
    startScreen.classList.add('hidden');
    resultScreen.classList.add('hidden');
    quizScreen.classList.remove('hidden');
    const container = document.querySelector('.quiz-container');
    if(container) container.classList.add('quiz-active');
    const box = document.getElementById('vayo-full-itinerary');
    if(box) box.classList.add('hidden');
    currentQuestionIndex = 0;
    userAnswers = [];
    topMatchesZwischenspeicher = [];
    showNextQuestion();
}
 
function showNextQuestion() {
    resetAnswerButtons();
    let gesamtFragen = quizQuestions.length > 0 ? quizQuestions.length : 10;
    const progressPercent = (currentQuestionIndex / gesamtFragen) * 100;
    if(progressElement) progressElement.style.width = progressPercent + '%';
    if (currentQuestionIndex >= gesamtFragen || quizQuestions.length === 0) {
        berechneErgebnis();
        return;
    }
    const currentQuestion = quizQuestions[currentQuestionIndex];
    if(questionTextElement) questionTextElement.innerText = currentQuestion.question;
    if(currentQuestion.answers && Array.isArray(currentQuestion.answers)) {
        currentQuestion.answers.forEach(answer => {
            const button = document.createElement('button');
            button.innerText = answer.text;
            button.classList.add('btn');
            button.dataset.option = answer.option; 
            button.addEventListener('click', selectAnswer);
            if(answerButtonsElement) answerButtonsElement.appendChild(button);
        });
    }
}
 
function resetAnswerButtons() {
    if(answerButtonsElement) {
        while (answerButtonsElement.firstChild) { answerButtonsElement.removeChild(answerButtonsElement.firstChild); }
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
    if(resultScreen) {
        const h2Element = resultScreen.querySelector('.result-left h2');
        if(h2Element) { h2Element.innerText = index === 0 ? "Dein perfektes Match:" : `VAYO Match (Platz ${index + 1}):`; }
    }
    if(matchNameElement) matchNameElement.innerText = saubererName;
    const itinerarySteps = document.getElementById('itinerary-steps');
    if(itinerarySteps) itinerarySteps.innerHTML = "";
    let meta = piktogrammMapping[reise.name] || piktogrammMapping["Default"];
    const piktoBox = document.getElementById('vayo-piktogramm-box');
    const piktoImg = document.getElementById('vayo-pikto-img');
    if(piktoBox && piktoImg) { piktoImg.src = meta.src; piktoBox.style.backgroundColor = meta.color; }
    const zielData = reiseDetails.find(detail => detail.portfolio_key === reise.name);
    if (zielData) {
        const headlineEl = document.getElementById('match-headline');
        const descEl = document.getElementById('match-description');
        if(headlineEl) headlineEl.innerText = zielData.headline;
        if(descEl) descEl.innerText = zielData.teaser;
        if(zielData.programm && Array.isArray(zielData.programm)) {
            zielData.programm.forEach(schritt => {
                const parts = schritt.split(':');
                const stepDiv = document.createElement('div');
                stepDiv.className = "day-step";
                if(parts.length > 1) { stepDiv.innerHTML = `<span class="day-title">${parts[0]}:</span>${parts.slice(1).join(':')}`; }
                else { stepDiv.innerHTML = schritt; }
                if(itinerarySteps) itinerarySteps.appendChild(stepDiv);
            });
        }
    }
    document.querySelectorAll('.ranking-item').forEach((item, idx) => {
        if(idx === index) { item.classList.add('active-card'); }
        else { item.classList.remove('active-card'); }
    });
}
 
async function berechneErgebnis() {
    quizScreen.classList.add('hidden');
    resultScreen.classList.remove('hidden');
    const container = document.querySelector('.quiz-container');
    if(container) container.classList.remove('quiz-active');
    const rankingListElement = document.getElementById('ranking-list');
    if(rankingListElement) rankingListElement.innerHTML = "";
    try {
        const { data: reisen, error } = await supabaseClient.from('reisen').select('*');
        if (error) throw error;
        const kategorienSpalten = ['fokus', 'wetter', 'kulisse', 'transport', 'lage', 'unterkunft_art', 'zielgruppe', 'abend', 'dauer', 'unterkuenfte'];
        let reisenMitPunkten = reisen.map(reise => {
            let punkte = 0;
            userAnswers.forEach((antwort, index) => {
                const spaltenName = kategorienSpalten[index];
                if (reise[spaltenName] !== undefined && reise[spaltenName] !== null) {
                    let dbWert = String(reise[spaltenName]).trim().toLowerCase();
                    let userWert = String(antwort).trim().toLowerCase();
                    
                    // KORRIGIERTER CLEANER: Übersetzt Quiz-Klicks exakt in deinen SQL-Tabellen-Inhalt
                    if (userWert === "abenteuer") userWert = "aktion & sport";
                    if (userWert === "kultur") userWert = "kultur & entdeckung";
                    if (userWert === "party") userWert = "party & nightlife";
                    if (userWert === "wellness") userWert = "wellness & erholung";
                    
                    if (userWert === "strand & meer") userWert = "beach & küste";
                    if (userWert === "berge") userWert = "berge & natur";
                    if (userWert === "metropole") userWert = "metropole & stadt";
                    if (userWert === "natur & idylle") userWert = "ländliche idylle";

                    if (userWert === "nachtleben & clubs") userWert = "nachtleben & clubs";
                    if (userWert === "lagerfeuer & naturruhe") userWert = "lagerfeuer & naturruhe";
                    if (userWert === "geselliges beisammensein") userWert = "geselliges beisammensein";
                    
                    if (userWert === "1 feste unterkunft") userWert = "1 feste unterkunft";
                    if (userWert === "rundreise") userWert = "rundreise";
 
                    if (userWert === dbWert) { punkte++; }
                }
            });
            let gesamtFragen = kategorienSpalten.length; 
            let prozentSatz = Math.round((punkte / gesamtFragen) * 100);
            return { ...reise, punkte, prozent: prozentSatz };
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
                item.innerHTML = `<span class="rank-name">Platz ${i + 1}: ${bereinigterRangName}</span><span class="rank-pct">${r.prozent}%</span>`;
                item.addEventListener('click', () => zeigeAusgewaehlteReise(i));
                rankingListElement.appendChild(item);
            });
        }
    } catch (err) { console.error("Fehler bei der Berechnung:", err); }
}
 
function ladeTermine(reiseKey) {
    if(!dateSelect || !dateSelectContainer) return;
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
        else if(dateSelectContainer) dateSelectContainer.classList.add('hidden');
    });
}
 
if(ctaBtn) {
    ctaBtn.addEventListener('click', () => {
        if(contactForm) contactForm.reset();
        if(contactForm) contactForm.classList.remove('hidden');
        if(successMessage) successMessage.classList.add('hidden');
        if(tripSelect) {
            tripSelect.innerHTML = '<option value="">Bitte wählen...</option>';
            reiseDetails.forEach(r => {
                const o = document.createElement('option');
                o.value = r.portfolio_key; o.textContent = holeSauberenNamen(r.portfolio_key);
                tripSelect.appendChild(o);
            });
        }
        if(topMatchesZwischenspeicher.length > 0 && tripSelect) {
            const activeCard = document.querySelector('.ranking-item.active-card');
            let activeMatch = topMatchesZwischenspeicher[0].name;
            if(activeCard) {
                const rangText = activeCard.querySelector('.rank-name').textContent;
                const matchFound = reiseDetails.find(d => rangText.includes(holeSauberenNamen(d.portfolio_key)));
                if(matchFound) activeMatch = matchFound.portfolio_key;
            }
            tripSelect.value = activeMatch;
            ladeTermine(activeMatch);
        }
        if(contactModal) contactModal.classList.remove('hidden');
    });
}
 
if(closeModalBtn) closeModalBtn.addEventListener('click', () => { if(contactModal) contactModal.classList.add('hidden'); });
 
if(contactForm) {
    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        if(submitBtn) { submitBtn.innerText = "Wird gesendet..."; submitBtn.disabled = true; }
        const dbSucheName = holeSauberenNamen(tripSelect.value);
        let istVoll = false;
        try {
            const { data: bisherigeEintraege, error: checkError } = await supabaseClient
                .from('anfragen')
                .select('id')
                .eq('reise', dbSucheName);
            if (checkError) throw checkError;
            if (bisherigeEintraege && bisherigeEintraege.length >= 10) {
                istVoll = true;
            }
            const { error } = await supabaseClient.from('anfragen').insert([{
                name: document.getElementById('user-name').value,
                geburtsdatum: document.getElementById('user-dob').value,
                reise: dbSucheName,
                termin: dateSelect.value,
                anmerkungen: document.getElementById('user-remarks').value
            }]);
            if(error) throw error;
            if(contactForm) contactForm.classList.add('hidden');
            if(successMessage) {
                const alterCheck = successMessage.querySelector('.vayo-voll-meldung');
                if(alterCheck) alterCheck.remove();
                if(istVoll) {
                    const warnParagraph = document.createElement('p');
                    warnParagraph.className = "vayo-voll-meldung";
                    warnParagraph.style.color = "#FF4A7A";
                    warnParagraph.style.fontWeight = "bold";
                    warnParagraph.style.marginTop = "15px";
                    warnParagraph.innerHTML = `<i class="fa-solid fa-circle-exclamation"></i> Achtung! Die Reise ist vermutlich bereits voll!`;
                    successMessage.appendChild(warnParagraph);
                }
                successMessage.classList.remove('hidden');
            }
        } catch(err) {
            alert("Fehler beim Senden!");
        } finally {
            if(submitBtn) { submitBtn.innerText = "Kostenlos anfragen"; submitBtn.disabled = false; }
        }
    });
}
