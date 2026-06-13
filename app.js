// 1. Supabase Verbindung aufsetzen
const SUPABASE_URL = "https://kqqzxkhiylxfjgxkrvpd.supabase.co";
const SUPABASE_KEY = "sb_publishable_4uFBv3Zs2oYV3uo-3ni3xg_dsKcuXyD";

const supabaseClient = supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

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
        question: "Du schausch aus dem Fenster. Bei welchem Wetter schlägt deine innere Energie-Anzeige voll aus?",
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
            { text: "Das gemeinsam Lachen und die Musik im Bus, während die Autobahnschilder an uns vorbeiziehen.", option: "Fernreisebus" },
            { text: "Der Moment, in dem die Anschnallzeichen erlöschen und man unter sich die Wolkendecke Europas sieht.", option: "Kurzstreckenflug" },
            { text: "Das Kribbeln im Bauch beim nächtlichen Transatlantikflug, wenn man weiß: Gleich bin ich auf einem neuen Kontinent.", option: "Langstreckenflug" },
            { text: "Das gleichmäßige Rattern der Schienen, während man entspannt aus dem Fenster schaut und die Landschaft an sich vorbeiziehen lässt.", option: "Zug" }
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