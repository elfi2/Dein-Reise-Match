const SUPABASE_URL = "https://kqqzxkhiylxfjgxkrvpd.supabase.co";
const SUPABASE_KEY = "sb_publishable_4uFBv3Zs2oYV3uo-3ni3xg_dsKcuXyD";
const supabaseClient = supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

// Hier definieren wir, welche Icons zu welchen Reisennamen passen
const iconMapping = {
    "Surf": "fa-solid fa-water",
    "Ski": "fa-solid fa-person-skiing",
    "Wandern": "fa-solid fa-mountain-sun",
    "USA": "fa-solid fa-caravan",
    "Roadtrip": "fa-solid fa-route",
    "Stadt": "fa-solid fa-city",
    "Kultur": "fa-solid fa-landmark",
    "Party": "fa-solid fa-champagne-glasses",
    "Beach": "fa-solid fa-umbrella-beach",
    "Jungle": "fa-solid fa-leaf",
    "Adventure": "fa-solid fa-fire-burner",
    "Default": "fa-solid fa-map-location-dot"
};

const quizQuestions = [
    {
        question: "Welches Geräusch lässt dein Herz höherspringen?",
        answers: [
            { text: "Das Klacken von Karabinern oder Zischen von Wellen.", option: "Aktion & Sport" },
            { text: "Buntes Marktgetümmel und fremde Sprachen.", option: "Kultur & Entdeckung" },
            { text: "Der Bass eines Beachclubs.", option: "Party & Nightlife" },
            { text: "Absolute Stille und sanfter Wind.", option: "Wellness & Erholung" }
        ]
    },
    // ... (hier kommen die restlichen Fragen wie vorher rein)
];

// ... (StartQuiz und showNextQuestion Funktionen bleiben wie vorher)

function holeIcon(name) {
    for (let key in iconMapping) {
        if (name.includes(key)) return iconMapping[key];
    }
    return iconMapping["Default"];
}

async function berechneErgebnis() {
    quizScreen.classList.add('hidden');
    resultScreen.classList.remove('hidden');
    
    try {
        const { data: reisen, error } = await supabaseClient.from('reisen').select('*');
        if (error) throw error;

        const kategorienSpalten = ['fokus', 'unterkuenfte', 'wetter', 'kulisse', 'transport', 'lage', 'unterkunft_art', 'dauer', 'zielgruppe', 'kulturraum', 'fitness', 'gepaeck', 'digital', 'verpflegung', 'gruppe', 'lernfokus', 'co2', 'abend', 'zeitplan', 'wohlfuehl'];

        let reisenMitPunkten = reisen.map(reise => {
            let punkte = 0;
            userAnswers.forEach((antwort, index) => {
                if (reise[kategorienSpalten[index]] === antwort) punkte++;
            });
            return { ...reise, punkte, prozent: Math.round((punkte / 20) * 100) };
        });

        reisenMitPunkten.sort((a, b) => b.punkte - a.punkte);
        const topMatch = reisenMitPunkten[0];

        if (topMatch) {
            const saubererName = topMatch.name.replace(/^\d+\.\s*/, '').trim();
            matchNameElement.innerText = saubererName;
            
            // PIKTOGRAMM SETZEN
            const iconClass = holeIcon(saubererName);
            document.getElementById('match-icon-container').innerHTML = `<i class="${iconClass}"></i>`;
            
            document.getElementById('match-description').innerText = `Dein Vibe passt zu ${topMatch.prozent}% zu diesem Abenteuer!`;

            // Ranking
            const rankingList = document.getElementById('ranking-list');
            rankingList.innerHTML = "<h3>Deine Runner-Ups:</h3>";
            for (let i = 1; i < 4; i++) {
                const r = reisenMitPunkten[i];
                const rName = r.name.replace(/^\d+\.\s*/, '').trim();
                rankingList.innerHTML += `<div class="ranking-item"><span>${rName}</span><span>${r.prozent}%</span></div>`;
            }
        }
    } catch (err) {
        console.error(err);
    }
}