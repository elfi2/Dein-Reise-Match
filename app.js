// 1. Supabase Verbindung aufsetzen
const SUPABASE_URL = "https://kqqzxkhiylxfjgxkrvpd.supabase.co";
const SUPABASE_KEY = "sb_publishable_4uFBv3Zs2oYV3uo-3ni3xg_dsKcuXyD";

const supabaseClient = window.supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

// Das komplette Produkt-Portfolio gekoppelt an deine exakten PNG-Bilddateien
const produktPortfolio = {
    "TOSKANA": {
        headline: "Pasta, Amore & Sunset-Vibes",
        teaser: "Entschleunigung pur unter der Sonne Italiens. Zusammen mit deiner Crew ziehst du in eine wunderschöne Locanda inmitten von Olivenhainen. Pasta kochen mit Nonna, Weinverkostungen und lange Abende unter dem Sternenhimmel.",
        img: "toskana.png",
        programm: [
            "Tag 1: Benvenuto! Anreise, Check-in in der Locanda & Welcome-Drink im Olivenhain.",
            "Tag 2: Markt & Aperitivo. Frische Zutaten scouten auf dem Wochenmarkt & Aperitivo-Workshop.",
            "Tag 3: Pasta-Masterklasse. Der große, traditionelle Kochkurs mit Nonna Francesca.",
            "Tag 4: Pisa, Pizza & Pop-Art. Halbtagesausflug nach Pisa zum schiefen Turm & Pizza-Testing.",
            "Tag 5: Liquid Gold. Wanderung durch Olivenhaine mit anschließender Weinverkostung.",
            "Tag 6: Pool-Chillout & Festa. Relaxen am Pool und großes Abschieds-BBQ unter den Sternen.",
            "Tag 7: Arrivederci. Gemeinsames Frühstück und entspannte Heimreise."
        ]
    },
    "ALPEN": {
        headline: "Über den Wolken: Dein Alpen-Cross auf dem E5",
        teaser: "Schnür die Boots – wir bezwingen die Alpen! Zusammen mit Outdoorsüchtigen und einem Profi-Bergführer wanderst du auf dem legendären E5 von Deutschland nach Italien. Atemberaubende Gletscher treffen auf urigen Hüttenzauber.",
        img: "alpen-trekking.png",
        programm: [
            "Tag 1: Startschuss Oberstdorf. Ausrüstungs-Check & Aufstieg zur Kemptner Hütte.",
            "Tag 2: Die Königsetappe. Über die Grenze nach Österreich mit Abstieg ins malerische Lechtal.",
            "Tag 3: Gipfelsturm & Hüttenzauber. Aufstieg zur Memminger Hütte auf über 2.200 Meter.",
            "Tag 4: Ewiges Eis. Querung des Venet-Massivs mit Blick auf die Ötztaler Gletscher.",
            "Tag 5: Grenzgänger nach Italien. Über das Timmelsjoch direkt in die Südtiroler Sonne.",
            "Tag 6: Finale in Meran. Letzter Abstieg in den Palmen-Vibe Südtiroler Täler & große Pizza-Feier.",
            "Tag 7: Tschüss Berge. Gemeinsames Frühstück und entspannte Rückreise per Zug."
        ]
    },
    "TREKKING": {
        headline: "Über den Wolken: Dein Alpen-Cross auf dem E5",
        teaser: "Schnür die Boots – wir bezwingen die Alpen! Zusammen mit Outdoorsüchtigen und einem Profi-Bergführer wanderst du auf dem legendären E5 von Deutschland nach Italien. Atemberaubende Gletscher treffen auf urigen Hüttenzauber.",
        img: "alpen-trekking.png",
        programm: [
            "Tag 1: Startschuss Oberstdorf. Ausrüstungs-Check & Aufstieg zur Kemptner Hütte.",
            "Tag 2: Die Königsetappe. Über die Grenze nach Österreich mit Abstieg ins malerische Lechtal.",
            "Tag 3: Gipfelsturm & Hüttenzauber. Aufstieg zur Memminger Hütte auf über 2.200 Meter.",
            "Tag 4: Ewiges Eis. Querung des Venet-Massivs mit Blick auf die Ötztaler Gletscher.",
            "Tag 5: Grenzgänger nach Italien. Über das Timmelsjoch direkt in die Südtiroler Sonne.",
            "Tag 6: Finale in Meran. Letzter Abstieg in den Palmen-Vibe Südtiroler Täler & große Pizza-Feier.",
            "Tag 7: Tschüss Berge. Gemeinsames Frühstück und entspannte Rückreise per Zug."
        ]
    },
    "MALTA": {
        headline: "Escape the Ordinary: Deine Malta Party-Insel",
        teaser: "Pulsierende Beats, türkisblaues Wasser und schlaflose Nächte. Dein Hotel liegt direkt im Party-Hotspot Paceville. Legendäre VAYO-Boat-Partys, Open-Air-Club-Nights und Klippenspringen warten auf dich.",
        img: "malta.png",
        programm: [
            "Tag 1: Welcome to Malta. Flug, Hotel-Transfer & erstes Warm-up im Club-Viertel Paceville.",
            "Tag 2: Beach-Vibes & Sunset. Chillen am Golden Bay Beach & abendlicher VAYO Bar-Crawl.",
            "Tag 3: Die legendäre Boat Party. Mittags aufs Schiff: DJ-Set, Open Bar & Sprung ins Mittelmeer.",
            "Tag 4: Kultur & Klippen. Ausflug in die Hauptstadt Valletta & Klippenspringen am St. Peter's Pool.",
            "Tag 5: Mid-Week Rave. Tagsüber ausschlafen am Pool, abends exklusive Open-Air-Club-Night.",
            "Tag 6: Blue Lagoon Expedition. Bootstrip zur Insel Comino ins blaueste Wasser Europas.",
            "Tag 7: Foam & Fun. Schaumparty am Nachmittag im Beach-Club & Burger-Essen an der Promenade.",
            "Tag 8: Mdina & Secret Spot. Ausflug zur Game-of-Thrones Kulisse Mdina & Klippen-Sunset.",
            "Tag 9: Grand Finale. Der letzte große Party-Abend in den besten Clubs von Paceville.",
            "Tag 10: Bye Malta. Kater-Frühstück, Souvenir-Shopping und Rückflug."
        ]
    },
    "ISLAND": {
        headline: "Fire & Ice: Roadtrip um die isländische Ringstraße",
        teaser: "Mystisch, episch, absolut wild. Im Allrad-Minibus jagen wir einmal komplett um die Insel. Gewaltige Wasserfälle, ausbrechende Geysire, Gletscherwanderungen und Entspannung in kochend heißen Thermalflüssen.",
        img: "island.png",
        programm: [
            "Tag 1: Reykjavik Calling. Flug nach Island, Kennenlernen beim isländischen Streetfood.",
            "Tag 2: The Golden Circle. Thingvellir-Nationalpark, Geysire und der goldene Gullfoss-Wasserfall.",
            "Tag 3: Wasserfälle & Black Sand. Die Südküste mit dem schwarzen Vulkanstrand von Vik.",
            "Tag 4: Eisberge zum Anfassen. Bootstour auf der magischen Gletscherlagune Jökulsárlón.",
            "Tag 5: Die wilden Ostfjorde. Fahrt durch raue Fjorde und kleine Fischerdörfer zu unserer Holzhütte.",
            "Tag 6: Myvatn & Mud Pots. Brodelnde Schlammtöpfe und Thermalbad in den Nature Baths.",
            "Tag 7: Akureyri & Whale Watching. Fahrt in den Norden. Optional: Buckelwale im Fjord beobachten.",
            "Tag 8: Trollaskagi Halbinsel. Atemberaubende Küstenstraßen und wilde Islandpferde füttern.",
            "Tag 9: Westisland-Geheimnisse. Der ikonische Kirkjufell-Mountain (berühmter Insta-Hotspot).",
            "Tag 10: Hot Spring Hike. Wanderung ins Reykjadalur-Tal mit Bad im natürlich heißen Fluss.",
            "Tag 11: Reykjavik Backstage. Coole Cafés, Shopping & großes VAYO-Abschiedsessen.",
            "Tag 12: Farewell Island. Transfer zum Flughafen und Rückflug."
        ]
    },
    "SURF": {
        headline: "Catch the Wave: Glamping & Surf-Vibe in Moliets",
        teaser: "Salziges Haar, Barfuß-Gefühl und endlose Strandtage. Dein Camp liegt im Pinienwald direkt hinter den Dünen Frankreichs. Surfkurse mit Profis, Sunset-Yoga, Beachvolleyball und Open-Air-Kino unter den Sternen.",