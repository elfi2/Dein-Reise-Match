// 1. Supabase Verbindung aufsetzen
const SUPABASE_URL = "https://kqqzxkhiylxfjgxkrvpd.supabase.co";
const SUPABASE_KEY = "sb_publishable_4uFBv3Zs2oYV3uo-3ni3xg_dsKcuXyD";

const supabase = window.supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

// 2. Die 20 atmosphärischen Fragen
const quizQuestions = [
    {
        question: "Du schließt am ersten Morgen im Urlaub die Augen und lauschst. Welches Geräusch lässt dein Herz höherspringen?",
        answers: [
            { text: "Das dumpfe Klacken von Karabinern, das Zischen von Wellen oder das Einstellen eines Sportgeräts.", option: "Aktion & Sport" },
            { text: "Das Stimmengewirr einer fremden Sprache auf einem bunten Markt voller Historie.", option: "Kultur & Entdeckung" },
            { text: "Der dumpfe Bass eines Beachclubs, der langsam für den Abend warmgelaufen wird.", option: "Party & Nightlife" },
            { text: "Absolute Stille, nur unterbrochen vom sanften Windhauch und dem fernen Plätschern eines Pools.", option: "Wellness & Erholung" }
        ]
    },
    {
        question: "Dein Koffer liegt offen auf dem Bett. Wie sieht deine Beziehung zu diesem Koffer während der Reise aus?",
        answers: [
            { text: "Ich packe ihn am ersten Tag komplett aus, hänge alles in den Schrank und vergesse, dass er existiert.", option: "1 feste Unterkunft" },
            { text: "Ich lasse die Hälfte drin, weil ich weiß, dass wir zur Halbzeit noch einmal die Kulisse wechseln.", option: "1 Unterkunftswechsel" },
            { text: "Mein Koffer ist mein treuester Gefährte – er wird fast täglich ein- und ausgepackt, weil die Straße uns ruft.", option: "Rundreise" },
            { text: "Auspacken, Schranktür zu, Wohlfühlen. Bloß kein Stress mit ständigem Location-Wechsel.", option: "1 feste Unterkunft" }
        ]
    },
    {
        question: "Du schaust aus dem Fenster. Bei welchem Wetter schlägt deine innere Energie-Anzeige voll aus?",
        answers: [
            { text: "Flimmernde Hitze, bei der der Asphalt glüht und man jede Sekunde ins Wasser springen möchte.", option: "Heiß & Tropisch" },
            { text: "Knackige, eiskalte Luft, die beim Einatmen in der Nase beißt und die Wangen sofort rot färbt.", option: "Kalt & Winterlich" },
            { text: "Ein frischer, unberechenbarer Wind, der dicke Wolken vorantreibt – perfekt, um sich zu bewegen.", option: "Mild & Wechselhaft" },
            { text: "Ein wolkenloser, tiefblauer Himmel, unter dem die Sonne so richtig brennt.", option: "Heiß & Tropisch" }
        ]
    },
    {
        question: "Du darfst ein großformatiges Kunstwerk für dein Wohnzimmer auswählen. Welches Motiv nimmst du?",
        answers: [
            { text: "Eine endlose, türkisfarbene Meereslinie mit sanfter Brandung und feinem Sand.", option: "Beach & Küste" },
            { text: "Ein majestätisches Bergmassiv, dessen Gipfel im Abendlicht glühen.", option: "Berge & Natur" },
            { text: "Eine spektakuläre, hell erleuchtete Wolkenkratzer-Skyline bei Nacht.", option: "Metropole & Stadt" },
            { text: "Ein verträumter, sonnenüberfluteter Weinberg mit einer alten Steinvilla im Hintergrund.", option: "Ländliche Idylle" }
        ]
    },
    {
        question: "Die Reise beginnt! Welcher Moment brennt sich als Erstes in dein Gedächtnis ein?",
        answers: [
            { text: "Das gemeinsame Lachen und die Musik im Bus, während die Autobahnschilder an uns vorbeiziehen.", option: "Fernreisebus" },
            { text: "Der Moment, in dem die Anschnallzeichen erlöschen und man unter sich die Wolkendecke Europas sieht.", option: "Kurzstreckenflug" },
            { text: "Das Kribbeln im Bauch beim nächtlichen Transatlantikflug, wenn man weiß: Gleich bin ich auf einem neuen Kontinent.", option: "Langstreckenflug" },
            { text: "Das gleichmäßige Rattern der Schienen, während man entspannt aus dem Fenster schaut und die Landschaft an sich vorbeizeihen lässt.", option: "Zug" }
        ]
    },
    {
        question: "Wenn du auf dein Handy schaust, was soll die Weltzeituhr oder der Wetterbericht anzeigen?",
        answers: [
            { text: "Den Heimatort – ich bin so nah, dass ich theoretisch in wenigen Stunden wieder zu Hause sein könnte.", option: "Deutschland & Nachbarn" },
            { text: "Ein klassisches 'Süden'-Reiseziel, das sofort nach Sommerferien, Palmen und Mittelmeer klingt.", option: "Südeuropa & Mittelmeer" },
            { text: "Ein skandinavisches oder britisches Ziel, das nach Abenteuer, rauer Natur und Entdeckung schmeckt.", option: "Nord- & Westeuropa" },
            { text: "Eine völlig verrückte Zeitzone mit massivem Jetlag am anderen Ende der Welt.", option: "Fernreise" }
        ]
    },
    {
        question: "Wenn du an deinen perfekten Schlafplatz denkst, welche Textur fühlst du vor deinem inneren Auge?",
        answers: [
            { text: "Das weiche Gras direkt unter meiner Isomatte und den robusten Stoff der Zeltwand.", option: "Zelt & Camp" },
            { text: "Eine knarzende Holzpritsche oder ein rustikales Stockbett, auf dem schon hunderte Abenteurer vor mir geschlafen haben.", option: "Hostel & Hütte" },
            { text: "Ein frisch gemachtes, absolut sauberes Standard-Bett in einem Zimmer, das funktional und gemütlich ist.", option: "Mittelklasse-Hotel" },
            { text: "Eine riesige, schneeweiße Bettdecke mit unzähligen Kissen und der Duft von edlen Raumölen im Resort.", option: "Luxushotel & Resort" }
        ]
    },
    {
        question: "Wie lang muss ein Urlaub sein, damit du das Gefühl hast, wirklich weg gewesen zu sein?",
        answers: [
            { text: "Eine knackige, intensive Woche – danach vermisse ich meistens eh schon mein eigenes Bett.", option: "1 Woche" },
            { text: "Ein ausgedehnter Trip von eineinhalb Wochen: Genug Zeit zum Ankommen, aber kein endloser Urlaub.", option: "10 bis 12 Tage" },
            { text: "Ein richtig fetter Roadtrip oder Camp-Urlaub von 2 bis 3 Wochen – alles darunter lohnt sich gar nicht.", option: "2 bis 3 Wochen" },
            { text: "Exakt 7 Tage Abschalten reichen mir völlig aus, um die Akkus komplett vollzuladen.", option: "1 Woche" }
        ]
    },
    {
        question: "Du betrittst den Gemeinschaftsbereich am ersten Abend. Welche Dynamik zieht dich magisch an?",
        answers: [
            { text: "Ein Haufen energiegeladener Leute, Teamer, die laute Musik anmachen und sofort ein Kennenlernspiel starten.", option: "Jugend-Vibe" },
            { text: "Eine entspannte Truppe von jungen Erwachsenen, die bei einem Kaltgetränk über Gott und die Welt quatschen.", option: "Young Travel" },
            { text: "Eine ganz kleine, ruhige Runde, in der man sofort tiefgründige Gespräche führt und sich geborgen fühlt.", option: "Kleingruppe" },
            { text: "Eine weltoffene, neugierige Gruppe von Backpackern, die morgen gemeinsam die Stadt unsicher machen will.", option: "Young Travel" }
        ]
    },
    {
        question: "Du gehst in einen lokalen Supermarkt. Was reizt dich im Verkaufsregal am meisten?",
        answers: [
            { text: "Die bekannten Klassiker, die es zu Hause auch gibt, aber mit südländischem oder lokalem Touch.", option: "Vertraut & Europäisch" },
            { text: "Produkte mit coolen englischen Slogans, die ich sonst nur aus US-Filmen oder TikTok-Trends kenne.", option: "Englischsprachig" },
            { text: "Schilder mit Schriftzeichen oder skurrile nordische Spezialitäten, von denen ich absolut keine Ahnung habe, was es ist.", option: "Exotisch" },
            { text: "Frische, duftende Backwaren und reife Früchte aus der Region, die sofort nach Urlaub schmecken.", option: "Vertraut & Europäisch" }
        ]
    },
    {
        question: "Der Tag neigt sich dem Ende zu. Wie sollen sich deine Beine anfühlen, wenn du ins Bett fällst?",
        answers: [
            { text: "Sie sollen brennen und zittern – ich will spüren, dass ich heute an meine körperlichen Grenzen gegangen bin.", option: "Sehr hoch" },
            { text: "Müde vom vielen Laufen, Pflastersteine-Ertreten und Entdecken, aber absolut im Rahmen einer normalen Fitness.", option: "Mittel" },
            { text: "Federleicht – sie lagen den ganzen Tag nur auf einer gemütlichen Liege oder im warmen Sand.", option: "Gering" },
            { text: "Angenehm schwer von Schritten in der City oder einer lockeren Runde Aktivsport, aber ohne Muskelkater am nächsten Morgen.", option: "Mittel" }
        ]
    },
    {
        question: "Du stehst im Flur und bist abfahrbereit. Welches Pack-Szenario beschreibt dich perfekt?",
        answers: [
            { text: "Ich ziehe elegant meinen Rollkoffer hinter mir her – alles ist glatt, sortiert und knitterfrei verstaut.", option: "Rollkoffer" },
            { text: "Ich wuchte mir einen riesigen Rucksack auf die Schultern – ich bin flexibel und bereit für jedes Terrain.", option: "Trekking-Rucksack" },
            { text: "Ich habe nur ein winziges Handgepäckstück auf dem Rücken. Weniger ist mehr, ich brauche nur das Nötigste.", option: "Minimal-Rucksack" },
            { text: "Mein Gepäck ist extrem robust, staub- und wasserdicht verpackt, weil es ein echtes Outdoor-Abenteuer wird.", option: "Wasserdichte Tonne" }
        ]
    },
    {
        question: "Ein atemberaubender Moment passiert (ein Sonnenuntergang, eine Aussicht). Was tust du?",
        answers: [
            { text: "Sofort das Handy zücken, Story filmen, Location taggen und live teilen. Das Netz muss stehen!", option: "Dauer-Online" },
            { text: "Ein schnelles Foto für die Familiengruppe machen, Handy wieder wegstecken und den Moment genießen.", option: "Normales Netz" },
            { text: "Das Handy liegt tief unten im Rucksack, hat sowieso seit Stunden keinen Empfang und das ist das Beste daran.", option: "Digital Detox" },
            { text: "Ich poste es direkt in meiner Story, damit meine Freunde sehen, was für ein geniales Privileg ich gerade erlebe.", option: "Dauer-Online" }
        ]
    },
    {
        question: "Der Magen knurrt im Urlaub! Wie sieht deine Traum-Mahlzeit aus?",
        answers: [
            { text: "Ein riesiges Buffet, bei dem ich mir keine Gedanken über Preise oder Kochen machen muss – einfach zugreifen.", option: "All-In & Vollpension" },
            { text: "Eine ehrliche, warme Mahlzeit, die abends auf den Tisch kommt und von der man nach einem langen Tag im Freien satt wird.", option: "Halbpension" },
            { text: "Gemeinsam mit der Gruppe am Herd oder Grill stehen, Musik anmachen und zusammen das Essen schnippeln.", option: "Selbstversorgung" },
            { text: "Durch die Straßen ziehen, spontan an einem coolen Street-Food-Stand oder einem traditionellen Diner anhalten und Neues probieren.", option: "Flexibel vor Ort" }
        ]
    },
    {
        question: "Du kommst zu einem Gruppenfoto zusammen. Wie groß ist die Crowd, die dich umgibt?",
        answers: [
            { text: "Eine eingeschworene, überschaubare Truppe von knapp 10 Leuten – wir kennen nach zwei Tagen alle Insider-Witze.", option: "Intime Kleingruppe" },
            { text: "Eine solide Reisegruppe von rund 20 Leuten – perfekt, um jeden Tag mit jemand anderem zu quatschen.", option: "Mittlere Gruppe" },
            { text: "Eine riesige, wuselnde Menschenmenge – echtes Festival-Feeling, laute Stimmung und maximale Energie.", option: "Großgruppe" },
            { text: "Ein ganz exklusiver, kleiner Kreis, in dem es absolut ruhig und entspannt zugeht.", option: "Intime Kleingruppe" }
        ]
    },
    {
        question: "Welche 'unsichtbare' Fähigkeit möchtest du unbedingt als Souvenir mit nach Hause nehmen?",
        answers: [
            { text: "Ich möchte stolz sagen können: 'Ich habe auf dieser Reise gelernt, wie man eine neue Sportart beherrscht oder richtig kocht!'", option: "Fähigkeit erlernen" },
            { text: "Ich möchte stundenlang von der Geschichte, den Tempeln, den Gebräuchen und der Architektur des Landes erzählen können.", option: "Kultur & Geschichte" },
            { text: "Gar keine Fähigkeit. Ich möchte einfach nur das Gefühl absoluter, tiefer Tiefenentspannung im Kopf mitbringen.", option: "Reine Erholung" },
            { text: "Ich will meinen Körper in einer Disziplin (Skifahren, Surfen etc.) aufs nächste Level gebracht haben.", option: "Fähigkeit erlernen" }
        ]
    },
    {
        question: "Du blickst auf die Landkarte deiner Reise. Welches Gefühl löst der Weg dorthin in dir aus?",
        answers: [
            { text: "Stolz, weil ich den Planeten geschont habe und komplett auf dem Landweg oder per Schiene angereist bin.", option: "Sehr gering" },
            { text: "Ein Kompromiss – ein kurzer Flug innerhalb unseres Kontinents, um schnell im Urlaub zu sein.", option: "Mittlerer Fußabdruck" },
            { text: "Pures Fernweh-Abenteuer – für dieses einmalige Ziel nehme ich den großen Flug um die halbe Welt in Kauf.", option: "Hoher Fußabdruck" },
            { text: "Ich reise umweltfreundlich im Bus oder Zug und nutze meine eigene Muskelkraft vor Ort.", option: "Sehr gering" }
        ]
    },
    {
        question: "Die Sonne ist untergangen. Wo findet man dich um 23 Uhr?",
        answers: [
            { text: "Mit einem Drink in der Hand auf der Tanzfläche eines Clubs, während die Lichter flackern.", option: "Nachtleben & Clubs" },
            { text: "Mit einer Decke umhüllt am Lagerfeuer, dem Knistern des Holzes lauschend, kurz vor dem Schlafen.", option: "Lagerfeuer & Naturruhe" },
            { text: "In einer gemütlichen Runde bei guten Gesprächen, einem Gesellschaftsspiel oder einem Glas Wein auf der Terrasse.", option: "Geselliges Beisammensein" },
            { text: "In einer coolen Rooftop-Bar mitten in den Straßenschluchten einer hell erleuchteten City.", option: "Nachtleben & Clubs" }
        ]
    },
    {
        question: "Wie sieht dein Endgegner im Urlaub aus? Was würde dich am meisten stressen?",
        answers: [
            { text: "Wenn wir den Bus oder den Guide verpassen, weil der Zeitplan extrem eng getaktet ist – ich brauche feste Strukturen.", option: "Streng durchgetaktet" },
            { text: "Wenn der Tag komplett verplant ist und ich keine Sekunde Zeit habe, um einfach mal ziellos durch die Straßen zu treiben.", option: "Halb-organisiert" },
            { text: "Wenn mir irgendjemand vorschreibt, wann ich aufzustehen habe – ich will absolute, ungeplante Freiheit.", option: "Freie Tagesgestaltung" },
            { text: "Ein straff organisiertes Programm, bei dem man sich um keine Transfers selbst kümmern muss, finde ich eigentlich super.", option: "Halb-organisiert" }
        ]
    },
    {
        question: "Du postest ein Foto deiner Unterkunft. Welches visuuelle Feedback erwartest du von deinen Freunden?",
        answers: [
            { text: "„Wow, das sieht ja aus wie aus einem Design-Magazin! Total stylisch und edel!“", option: "Ästhetisch & Stilvoll" },
            { text: "„Das sieht nach einem echten, ehrlichen Abenteuer aus! Richtig urig und authentisch!“", option: "Rustikal & Echt" },
            { text: "„Mega geschmackvoll und ästhetisch eingerichtet, richtig zum Wohlfühlen!“", option: "Ästhetisch & Stilvoll" },
            { text: "„Abenteuer pur! Hauptsache du hast ein Dach über dem Kopf, beneidenswert wild!“", option: "Rustikal & Echt" }
        ]
    }
];

let currentQuestionIndex = 0;
let userAnswers = [];

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

if(startBtn) startBtn.addEventListener('click', startQuiz);
if(restartBtn) restartBtn.addEventListener('click', startQuiz);

// Sicherheitsnetz, falls das CSS verzögert lädt
document.addEventListener("DOMContentLoaded", () => {
    if(quizScreen) quizScreen.classList.add('hidden');
    if(resultScreen) resultScreen.classList.add('hidden');
});

function startQuiz() {
    startScreen.classList.add('hidden');
    resultScreen.classList.add('hidden');
    quizScreen.classList.remove('hidden');
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

async function berechneErgebnis() {
    quizScreen.classList.add('hidden');
    resultScreen.classList.remove('hidden');
    matchNameElement.innerText = "Berechne dein Match...";
    document.getElementById('match-description').innerText = "Deine Antworten werden mit unseren 12 Traumzielen abgeglichen...";

    try {
        const { data: reisen, error } = await supabase.from('reisen').select('*');
        if (error) throw error;

        let bestesMatch = null;
        let hoechstePunktzahl = -1;

        const kategorienSpalten = [
            'fokus', 'unterkuenfte', 'wetter', 'kulisse', 'transport', 
            'lage', 'unterkunft_art', 'dauer', 'zielgruppe', 'kulturraum', 
            'fitness', 'gepaeck', 'digital', 'verpflegung', 'gruppe', 
            'lernfokus', 'co2', 'abend', 'zeitplan', 'wohlfuehl'
        ];

        reisen.forEach(reise => {
            let punkte = 0;
            userAnswers.forEach((antwort, index) => {
                const spaltenName = kategorienSpalten[index];
                if (reise[spaltenName] === antwort) punkte++;
            });

            if (punkte > hoechstePunktzahl) {
                hoechstePunktzahl = punkte;
                bestesMatch = reise;
            }
        });

        if (bestesMatch) {
            matchNameElement.innerText = bestesMatch.name;
            document.getElementById('match-description').innerText = `Genial! Du hast ${hoechstePunktzahl} von 20 Übereinstimmungen mit diesem Abenteuer. Pack deine Taschen!`;
        } else {
            matchNameElement.innerText = "Kein Match gefunden";
        }
    } catch (err) {
        console.error(err);
        matchNameElement.innerText = "Verbindungsfehler";
    }
}