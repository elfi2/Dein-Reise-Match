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
        question: "