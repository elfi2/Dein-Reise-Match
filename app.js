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
        img: "frankreichsurf.png",
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
        img: "frankreichsurf.png",
        programm: ["Tag 1-14: Siehe detailliertes VAYO Surf- & Glamping-Programm an Frankreichs Atlantikküste."]
    },
    "COAST": {
        headline: "California Dreaming: Der epische West Coast Ride",
        teaser: "Freiheit, Megacitys und Roadtrip-Nostalgie. Drei Wochen lang cruisen wir im Reisebus von San Francisco über den Highway 1 nach Los Angeles, zum Grand Canyon und mitten in den Glitzer-Rausch von Las Vegas.",
        img: "westcoastusa.png",
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
        img: "schottland.png",
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
        img: "schwedenkanu.png",
        programm: [
            "Tag 1-2: Das Wildnis-Intro. Bus- und Fähranreise nach Schweden & Basecamp-Briefing.",
            "Tag 3: Das erste Paddeln. Absetzen der Boote und Aufschlagen von Camp 1 auf einer einsamen Insel.",
            "Tag 4: Teamwork & Lagerfeuer. Wildnis-Navigation & gemeinsames Kochen über open Glut.",
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
        img: "thailand.png",
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
        img: "ski-camp.png",
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
        img: "griechenland.png",
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
        img: "newyorkcity.png",
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

// Die 10 knackigen Kernfragen
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
        question: "Die Sonne ist untergangen. Wo findet man dich um 23 Uhr?",
        answers: [
            { text: "Mit einem Drink in der Hand auf der Tanzfläche eines Clubs, während die Lichter flackern.", option: "Nachtleben & Clubs" },
            { text: "Mit einer Decke umhüllt am Lagerfeuer, dem Knistern des Holzes lauschend, kurz vor dem Schlafen.", option: "Lagerfeuer & Naturruhe" },
            { text: "In einer gemütlichen Runde bei guten Gesprächen, einem Gesellschaftsspiel oder einem Glas Wein auf der Terrasse.", option: "Geselliges Beisammensein" },
            { text: "In einer coolen Rooftop-Bar mitten in den Straßenschluchten einer hell erleuchteten City.", option: "Nachtleben & Clubs" }
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
                    ? `Vollständigen Reiseplan anzeigen`
                    : `Reiseplan einklappen`;
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

function findMatchingKey(saubererName) {
    const nameUpper = saubererName.toUpperCase().replace('-', ' ').trim();
    for (let k in produktPortfolio) {
        const keyUpper = k.toUpperCase();
        if (nameUpper.includes(keyUpper) || keyUpper.includes(nameUpper) || 
            (nameUpper === "SKI CAMP" && keyUpper === "SKI") || 
            (nameUpper === "FRANKREICH SURF" && keyUpper === "SURF")) {
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

        const kategorienSpalten = ['fokus', 'unterkuenfte', 'wetter', 'kulisse', 'transport', 'lage', 'unterkunft_art', 'dauer', 'zielgruppe', 'abend'];

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
            
            let portfolioKey = findMatchingKey(saubererTopName);
            const piktoBox = document.getElementById('vayo-piktogramm-box');

            if (portfolioKey && produktPortfolio[portfolioKey]) {
                const zielData = produktPortfolio[portfolioKey];
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
                document.getElementById('match-description').innerText = `Genial! Dein persönlicher Charakter-Vibe hat eine Übereinstimmung von ${topMatch.prozent}% mit diesem Trip!`;
                if(piktoBox) piktoBox.innerHTML = "";
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