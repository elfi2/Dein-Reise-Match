// 1. Supabase Verbindung aufsetzen
const SUPABASE_URL = "https://kqqzxkhiylxfjgxkrvpd.supabase.co";
const SUPABASE_KEY = "sb_publishable_4uFBv3Zs2oYV3uo-3ni3xg_dsKcuXyD";

const supabaseClient = window.supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

// Piktogramm-Mapping exakt abgeglichen mit deinen echten CI-Kategorien & Farben
const piktogrammMapping = {
    "TOSKANA": { icon: "fa-solid fa-mortar-pestle", color: "#FFAA00" },      // Genuss / Yellow
    "ALPEN": { icon: "fa-solid fa-mountain", color: "#FFAA00" },            // Active-Mountain / Yellow
    "TREKKING": { icon: "fa-solid fa-compass", color: "#FFAA00" },          // Active / Yellow
    "MALTA": { icon: "fa-solid fa-champagne-glasses", color: "#FF4A7A" },   // Community-Party / Pink
    "ISLAND": { icon: "fa-solid fa-route", color: "#FFAA00" },              // Roadtrip / Yellow
    "SURF": { icon: "fa-solid fa-water", color: "#00A896" },                // Surfing / Teal
    "ATLANTIK": { icon: "fa-solid fa-water", color: "#00A896" },            // Surfing / Teal
    "WEST COAST": { icon: "fa-solid fa-van-shuttle", color: "#FFAA00" },     // Roadtrip / Yellow
    "COAST": { icon: "fa-solid fa-van-shuttle", color: "#FFAA00" },          // Roadtrip / Yellow
    "SCHOTTLAND": { icon: "fa-solid fa-fort-awesome", color: "#FF4A7A" },    // Culture / Pink
    "SCHWEDEN": { icon: "fa-solid fa-campground", color: "#FF4A7A" },       // Community / Pink
    "KANU": { icon: "fa-solid fa-campground", color: "#FF4A7A" },           // Community / Pink
    "THAILAND": { icon: "fa-solid fa-leaf", color: "#00A896" },             // Jungle / Teal
    "SKI": { icon: "fa-solid fa-person-skiing", color: "#00A896" },         // Active-Winter / Teal
    "ÖSTERREICH": { icon: "fa-solid fa-person-skiing", color: "#00A896" },  // Active / Teal
    "GRIECHENLAND": { icon: "fa-solid fa-spa", color: "#00A896" },          // Wellness / Teal
    "NEW YORK": { icon: "fa-solid fa-city", color: "#FF4A7A" },             // Urban-Culture / Pink
    "Default": { icon: "fa-solid fa-map-location-dot", color: "#00A896" }
};

// Das lückenlose Produkt-Portfolio mit flexibler Erkennung deiner Datenbank-Namen
const produktPortfolio = {
    "TOSKANA": {
        headline: "Pasta, Amore & Sunset-Vibes",
        teaser: "Entschleunigung pur unter der Sonne Italiens. Zusammen mit deiner Crew ziehst du in eine wunderschöne Locanda inmitten von Olivenhainen. Pasta kochen mit Nonna, Weinverkostungen und lange Abende unter dem Sternenhimmel.",
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
        programm: [
            "Tag 1-2: Der Road-Vibe. Entspannte Nachtanreise im Fernreisebus & Camp-Einzug.",
            "Tag 3: Erster Surf-Check. Board-Ausgabe, erste Surf-Session & Wellen-Theorie am Strand.",
            "Tag 4: Surf & Volleyball. Vormittags Wellenreiten, nachmittags großes Beachvolleyball-Turnier.",
            "Tag 5: Sunset-Yoga. Fokus auf die perfekte Balance auf den Sanddünen bei Sonnenuntergang.",
            "Tag 6: San Sebastián Trip. Tagesausflug nach Spanien für legendäre Tapas & baskischen Altstadt-Vibe.",
            "Tag 7: Open-Air Kino. Nach dem Surfen machen wir es uns im Camp mit Popcorn gemütlich.",
            "Tag 8: Skate & Chill. Ausprobieren der camp-eigenen Miniramp & Grillabend der Campküche.",
            "Tag 9: Night Session. Strand-Party mit Live-Akustikmusik und Lagerfeuer direkt am Meer.",
            "Tag 10: Surf-Contest. Zeig der Crew, was du gelernt hast! Spaß-Contest mit coolen Preisen.",
            "Tag 11: Hossegor Shopping. Ausflug ins europäische Surf-Mekka für Schnäppchen in den Outlets.",
            "Tag 12: Expression Session. Freies Surfen und professionelles Fotoshooting in den Wellen.",
            "Tag 13: Das große Finale. Abschieds-BBQ, Zertifikate und die letzte legendäre Camp-Party.",
            "Tag 14-15: Rollin' Home. Packen, Abschiedstränen und entspannte Busrückreise."
        ]
    },
    "ATLANTIK": {
        headline: "Catch the Wave: Glamping & Surf-Vibe in Moliets",
        teaser: "Salziges Haar, Barfuß-Gefühl und endlose Strandtage. Dein Camp liegt im Pinienwald direkt hinter den Dünen Frankreichs. Surfkurse mit Profis, Sunset-Yoga, Beachvolleyball und Open-Air-Kino unter den Sternen.",
        programm: [
            "Tag 1-14: Siehe detailliertes VAYO Surf- & Glamping-Programm an Frankreichs Atlantikküste."
        ]
    },
    "COAST": {
        headline: "California Dreaming: Der epische West Coast Ride",
        teaser: "Freiheit, Megacitys und Roadtrip-Nostalgie. Drei Wochen lang cruisen wir im Reisebus von San Francisco über den Highway 1 nach Los Angeles, zum Grand Canyon und mitten in den Glitzer-Rausch von Las Vegas.",
        programm: [
            "Tag 1-3: San Francisco Vibes. Langstreckenflug, Cable Car fahren & Ausflug zur Gefängnisinsel Alcatraz.",
            "Tag 4-5: Highway 1. Stopps an der rauen Pazifikküste in Big Sur & Monterey zur Seelöwen-Beobachtung.",
            "Tag 6-9: L.A. & Hollywood. Walk of Fame, Venice Beach und ein Tag in den Universal Studios.",
            "Tag 10-12: Into the Desert & Vegas. Fahrt durch die Mojave-Wüste & exklusive Stretch-Limo-Fahrt.",
            "Tag 13-14: Route 66 & Grand Canyon. Legendäre Straßen & Pizza-Picknick beim Grand Canyon Sunset.",
            "Tag 15-16: Antelope Canyon. Spektakuläre, rot-leuchtende Felsformationen am Colorado River.",
            "Tag 17-18: Yosemite Nationalpark. Raus aus der Wüste, Wanderung zu gigantischen Mammutbäumen.",
            "Tag 19-20: Back to the Bay. Zurück nach San Francisco für Premium-Abschiedsessen in Chinatown.",
            "Tag 21: Goodbye USA. Abflug Richtung Heimat mit prall gefüllten Speicherkarten."
        ]
    },
    "SCHOTTLAND": {
        headline: "Ghosts, Castles & Live Music: Der Highlands-Vibe",
        teaser: "Rau, mystisch und voller Kultur. Entdecke Edinburgh bei nächtlichen Ghost-Walks, fahre im Tourbus tief in die Highlands, besichtige Loch Ness und wärme dich abends im Pub bei schottischer Folk-Livemusik.",
        programm: [
            "Tag 1: Edinburgh Welcome. Flug, Check-in im Central-Hostel & erste gemütliche Pub-Runde.",
            "Tag 2: Royal Mile & Castle. Erkundung der historischen Burg auf dem massiven Vulkanfels.",
            "Tag 3: Ghost Walk bei Nacht. Tagsüber freie Zeit, abends gruseliger Underground-Ghost-Walk.",
            "Tag 4: Into the Highlands. Start der Bustour über Stirling Castle tief hinein in die rauen Berge.",
            "Tag 5: Monster-Jagd am Loch Ness. Bootstour auf dem mystischen See & Urquhart Castle Ruinen.",
            "Tag 6: Isle of Skye Abenteuer. Fahrt auf die magische Insel & Wanderung zum Old Man of Storr.",
            "Tag 7: Glenfinnan & Harry Potter. Wir bestaunen das Viadukt des originalen Hogwarts-Express.",
            "Tag 8: Glen Coe Wanderung. Trekking durch das dramatischste und fotogenste Tal Schottlands.",
            "Tag 9: Live Music Pub Night. Rückfahrt in den Süden und epischer Abschiedsabend mit Folk-Band.",
            "Tag 10: Farewell Scotland. Transfer zum Flughafen Edinburgh und Rückflug."
        ]
    },
    "SCHWEDEN": {
        headline: "Into the Wild: Das ultimative Kanu-Abenteuer",
        teaser: "Back to the roots, Teamwork und absolute Freiheit. Ausgerüstet mit Kanus und Packtonnen paddeln wir über einsame Seen, schlagen Wildnis-Camps auf unbewohnten Inseln auf und kochen über offenem Lagerfeuer.",
        programm: [
            "Tag 1-2: Das Wildnis-Intro. Bus- und Fähranreise nach Schweden & Basecamp-Briefing.",
            "Tag 3: Das erste Paddeln. Absetzen der Boote und Aufschlagen von Camp 1 auf einer einsamen Insel.",
            "Tag 4: Teamwork & Lagerfeuer. Wildnis-Navigation & gemeinsames Kochen über offener Glut.",
            "Tag 5: Klippenspringen. Stopp an einer massiven Felswand zum Klippenspringen ins glasklare Wasser.",
            "Tag 6: Bergfest in der Wildnis. Intensivere Paddelstrecke & frisches Bannock-Brot backen.",
            "Tag 7: Angeln & Blaubeeren. Abendessen selbst fangen & wilde Waldblaubeeren sammeln.",
            "Tag 8: Der große See. Überquerung eines riesigen Open-Water-Abschnitts – Expeditionsfeeling pur!",
            "Tag 9: Zurück zum Basecamp. Letzte Etappe, warme Dusche und fette Wildnis-Abschiedsparty.",
            "Tag 10: Heimreise. Rückreise im Bus mit dem unverwechselbaren Geruch von Lagerfeuer in der Kleidung."
        ]
    },
    "THAILAND": {
        headline: "Tropeninzeln & Tuk-Tuks: Dein Asien-Abenteuer",
        teaser: "Exotisch, heiß, voller Farben. Das Abenteuer startet im bunten Streetfood-Chaos Bangkoks. Per Nachtzug geht es in den Süden zum Inselhopping nach Koh Samui, Koh Phangan (Full Moon Party!) und Koh Tao.",
        programm: [
            "Tag 1-3: Bangkok Flash. Langstreckenflug, Tempel (Wat Pho), Tuk-Tuk-Rennen und Streetfood auf der Khao San Road.",
            "Tag 4: Der Nachtzug. Fahrt im legendären Schlafwagenzug nach Süden – echtes Backpacker-Feeling.",
            "Tag 5-8: Koh Samui Palmenparadies. Ausflüge zu versteckten Dschungel-Wasserfällen & Traumstränden.",
            "Tag 9-13: Koh Phangan Vibes. Fährenüberfahrt, Dschungelpfade erkunden & legendäre Full Moon Party.",
            "Tag 14-18: Koh Tao Unterwasserwelt. Bootstrip nach Koh Nang Yuan & Schnorcheln mit Meeresschildkröten.",
            "Tag 19-20: Bangkok Finale. Rückflug in die Hauptstadt zum Souvenir-Shopping auf Riesen-Märkten.",
            "Tag 21: Kop khun khrap, Thailand! Rückflug nach Europa."
        ]
    },
    "SKI": {
        headline: "Powder, Piste & Après-Ski: Saalbach Calling!",
        teaser: "Schneegestöber, Muskelkater und Hüttengaudi. Wir wohnen im stylischen VAYO-Jugendhotel direkt an der Skipiste im Skicircus Saalbach. Guiding-Gruppen im Tiefschnee, Nachtrodeln und Pistenpartys erwarten dich.",
        programm: [
            "Tag 1: Auf die Piste! Busanreise der Wintersport-Crew, Check-in & Verleihmaterial abholen.",
            "Tag 2: Line-up im Schnee. Einteilung der Ski- & Boarder-Gruppen nach Level & Kennenlern-Spiele.",
            "Tag 3: Powder-Day & Après-Ski. Heizen bis zum Umfallen, ab 16 Uhr Party an der Schirmbar.",
            "Tag 4: Nacht-Rodeln. Nach dem Abendessen leihen wir Schlitten für eine rasante Flutlichtabfahrt.",
            "Tag 5: Fackelwanderung. Marsch mit Fackeln durch den Tiefschnee zu einer urigen Berghütte.",
            "Tag 6: King of the Mountain. Abschlussrennen im Snowpark & legendäre Hüttengaudi mit DJ.",
            "Tag 7: Abfahrt. Packen, fette Abschiedsfotos im Kasten und entspannte Heimreise im Bus."
        ]
    },
    "GRIECHENLAND": {
        headline: "Slow Down: Deine Luxus-Auszeit am Ägäischen Meer",
        teaser: "Tiefenentspannt, ästhetisch und Premium. Gönn dir das ultimative Wellness-Upgrade in einer exklusiven Kleingruppe im 5-Sterne-Resort. Sunrise-Yoga am Strand, Massagen und einsame Bootstrips.",
        programm: [
            "Tag 1: Kalimera & Chill. Flug nach Griechenland, Transfer zum Luxus-Resort & Sunset-Dinner.",
            "Tag 2: Sunrise Yoga & Thalasso. Yoga am Strand bei Sonnenaufgang & Thalasso-Therapie im Spa.",
            "Tag 3: Secret Beach Bootstrip. Privater Yacht-Ausflug zu einer einsamen Bucht mit Strand-Picknick.",
            "Tag 4: Detox & Sound Bath. Geführte Meditation und beruhigendes Klangschalen-Bad mit Meerblick.",
            "Tag 5: E-Bike & Kultur. Entspannte E-Bike-Tour zu antiken Ruinen & exklusives Sauna-Event.",
            "Tag 6: Das große Verwöhnen. Ganzkörper-Massage, Chillout am Infinity-Pool & Abschieds-Cocktails.",
            "Tag 7: Tiefenentspannt zurück. Letztes kurzes Yoga, ausgiebiges Schlemmer-Frühstück und Rückflug."
        ]
    },
    "NEW YORK": {
        headline: "Empire State of Mind: Dein New York City Rausch",
        teaser: "Urban, ikonisch, laut – die Stadt, die niemals schläft! Erkunde Manhattan mit unserem City-Guide: Empire State Building bei Nacht, Fahrradtour durch den Central Park, Brooklyn Bridge und Shopping in SoHo.",
        programm: [
            "Tag 1: Welcome to the Jungle. Langstreckenflug & Ankunft. Abends: Times Square bei Nacht!",
            "Tag 2: Top of the World. Aussichtsplattform Empire State Building & Spaziergang auf der High Line.",
            "Tag 3: Lady Liberty. Bootstour vorbei an der Freiheitsstatue, Financial District & 9/11 Memorial.",
            "Tag 4: Brooklyn Vibe. Spaziergang über die Brooklyn Bridge & Vintage-Shopping in Williamsburg.",
            "Tag 5: Central Park Picknick. Fahrräder leihen & entspanntes Picknick auf der Schafswiese.",
            "Tag 6: SoHo Shopping. Der ultimative Shopping-Tag in SoHo & abendliche Jazz-Clubs im Village.",
            "Tag 7: Summit One Vanderbilt. Besuch der verspiegelten Aussichtsplattform & freies Teaming.",
            "Tag 8: Grand Central & Broadway. Architektur-Staunen & großes Abschieds-Dinner im US-Diner.",
            "Tag 9: Bye-bye NYC. Letztes Souvenir-Shopping bei Macy's, Flughafen-Transfer & Nachtflug."
        ]
    }
};

// Die 20 atmosphärischen Fragen
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
            { text: "Eine riesige, schneeweiße Bettdecke mit unzählinen Kissen und der Duft von edlen Raumölen im Resort.", option: "Luxushotel & Resort" }
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
            { text: "Eine eingeschwonerne, überschaubare Truppe von knapp 10 Leuten – wir kennen nach zwei Tagen alle Insider-Witze.", option: "Intime Kleingruppe" },
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

document.addEventListener("DOMContentLoaded", () => {
    if(quizScreen) quizScreen.classList.add('hidden');
    if(resultScreen) resultScreen.classList.add('hidden');
    
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

// KORRIGIERTE PARSER-LOGIK: Erkennt nun Fragmente ("Ski-Camp" passt zu "SKI") fehlerfrei!
function findMatchingKey(saubererName) {
    const nameUpper = saubererName.toUpperCase().replace('-', ' ');
    for (let k in produktPortfolio) {
        const keyUpper = k.toUpperCase();
        if (nameUpper.includes(keyUpper) || keyUpper.includes(nameUpper)) {
            return k;
        }
    }
    return null;
}

async function berechneErgebnis() {
    quizScreen.classList.add('hidden');
    resultScreen.classList.remove('hidden');
    
    const rankingListElement = document.getElementById('ranking-list');
    const itinerarySteps = document.getElementById('itinerary-steps');
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
            
            // DYNAMISCHES PIKTOGRAMM ZUWEISEN & STYLEN
            let mappingKey = Object.keys(piktogrammMapping).find(k => saubererTopName.toUpperCase().replace('-', ' ').includes(k.toUpperCase()));
            let meta = piktogrammMapping[mappingKey] || piktogrammMapping["Default"];
            
            const piktoBox = document.getElementById('vayo-piktogramm-box');
            if(piktoBox) {
                piktoBox.innerHTML = `<i class="${meta.icon}"></i>`;
                piktoBox.style.backgroundColor = meta.color;
            }

            let portfolioKey = findMatchingKey(saubererTopName);
            
            if (portfolioKey && produktPortfolio[portfolioKey]) {
                const zielData = produktPortfolio[portfolioKey];
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