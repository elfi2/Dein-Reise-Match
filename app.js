// 1. Supabase Verbindung aufsetzen
const SUPABASE_URL = "https://kqqzxkhiylxfjgxkrvpd.supabase.co";
const SUPABASE_KEY = "sb_publishable_4uFBv3Zs2oYV3uo-3ni3xg_dsKcuXyD";

const supabaseClient = supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

// Piktogramm-Mapping im Style des Brand-Boards & Zuweisung der Hintergrundfarben
const piktogrammMapping = {
    "TOSKANA": { icon: "fa-solid fa-mortar-pestle", color: "#FFAA00" },      // Genuss / Yellow
    "ALPEN-TREKKING": { icon: "fa-solid fa-boot", color: "#00A896" },       // Active / Teal
    "MALTA": { icon: "fa-solid fa-champagne-glasses", color: "#FF4A7A" },   // Community / Pink
    "ISLAND": { icon: "fa-solid fa-caravan", color: "#FFAA00" },            // Roadtrip / Yellow
    "ATLANTIK": { icon: "fa-solid fa-water", color: "#00A896" },            // Surfing / Teal
    "West Coast": { icon: "fa-solid fa-van-shuttle", color: "#FFAA00" },    // Roadtrip / Yellow
    "SCHOTTLAND": { icon: "fa-solid fa-fort-awesome", color: "#FF4A7A" },    // Culture / Pink
    "SCHWEDEN": { icon: "fa-solid fa-campground", color: "#FF4A7A" },       // Community / Pink
    "THAILAND": { icon: "fa-solid fa-leaf", color: "#00A896" },             // Jungle / Teal
    "ÖSTERREICH": { icon: "fa-solid fa-person-skiing", color: "#00A896" },  // Active / Teal
    "GRIECHENLAND": { icon: "fa-solid fa-spa", color: "#00A896" },          // Wellness / Teal
    "NEW YORK": { icon: "fa-solid fa-city", color: "#FF4A7A" },             // Urban / Pink
    "Default": { icon: "fa-solid fa-map-location-dot", color: "#00A896" }
};

// Emotionales Content-Portfolio (Storys & Headlines) für die Auswertung
const produktPortfolio = {
    "TOSKANA": {
        headline: "Pasta, Amore & Sunset-Vibes",
        story: "Pack die Sonnenbrille ein und schalt den Kopf aus. Gemeinsam mit deiner Crew ziehst du in eine traditionelle, wunderschöne Locanda inmitten von endlosen Olivenhainen. Hier ticken die Uhren langsamer. Tagsüber schlendern wir über farbenfrohe Wochenmärkte, verkosten das beste Olivenöl der Region und lernen von einer echten italienischen Nonna, wie man die perfekte Pasta selbst rollt. Abends sitzen wir alle an einer langen Tafel unter dem funkelnden Sternenhimmel, lachen, quatschen und genießen das Leben bei gutem Wein und hausgemachtem Essen. Dolce Vita auf VAYO-Art."
    },
    "ALPEN-TREKKING": {
        headline: "Über den Wolken: Dein Alpen-Cross auf dem E5",
        story: "Schnür die Boots – wir bezwingen die Alpen! Zusammen mit maximal 12 anderen Outdoorsüchtigen und einem Profi-Bergführer wanderst du auf dem legendären E5 von Deutschland nach Italien. Tagsüber spürst du die Sonne im Gesicht, während du sportliche Aufstiege meisterst und über ewiges Eis wanderst. Abends, wenn es in den Bergen knackig kühl wird, wartet das gemütlichste Kontrastprogramm: Urige Berghütten auf über 2.000 Metern, deftiges Bergsteiger-Essen und die unschlagbare Gemeinschaft im Matratzenlager. Der Moment, wenn du den Pass erreichst und ins Tal blickst? Unbezahlbar."
    },
    "MALTA": {
        headline: "Escape the Ordinary: Deine Malta Party-Insel",
        story: "Willkommen im Epizentrum des Sommers! St. Julian's wartet auf dich und deine Crew. Dein Hotel liegt mitten im Party-Hotspot Paceville – du bist also immer direkt im Geschehen. Tagsüber entfliehen wir dem Alltag auf der legendären VAYO-Boat-Party: Ein exklusives Boot, ein fetter DJ-Set-Vibe, Open Bar und der Sprung ins glasklare Mittelmeer. Sobald die Sonne untergeht, verwandelt sich die Insel in ein riesiges Festival. Unser junges Team sichert dir die VIP-Tickets für Schaumpartys, die angesagtesten Clubs und unvergessliche Nächte unter Palmen."
    },
    "ISLAND": {
        headline: "Fire & Ice: Roadtrip um die isländische Ringstraße",
        story: "Bereit für den ultimativen Roadtrip deines Lebens? Im exklusiven Allrad-Minibus und mit einem lokalen Guide am Steuer jagen wir einmal komplett um die isländische Ringstraße. Draußen ist es erfrischend kühl, während wir an gigantischen Wasserfällen vorbeiziehen, Geysire ausbrechen sehen und über massive Gletscher wandern. Das beste Gefühl? Wenn wir uns nach einem langen Tag voller epischer Naturmomente gemeinsam in einer heißen, dampfenden Thermalquelle aufwärmen. Wir übernachten in gemütlichen Holzhütten mitten in der Wildnis, kochen zusammen und jagen vielleicht sogar die Polarlichter."
    },
    "ATLANTIK": {
        headline: "Catch the Wave: Glamping & Surf-Vibe in Moliets",
        story: "Dein Sommerzuhause im Pinienwald direkt hinter den Dünen des Atlantiks. In Moliets-et-Maa erwartet dich unser voll durchorganisiertes Zelt- und Glampingcamp. Hier musst du dich um nichts kümmern – die legendäre Campküche versorgt dich mit Vollverpflegung. Schnapp dir dein Board: Zertifizierte Surflehrer bringen dich in Kleingruppen auf die perfekte Welle. Wenn du nicht gerade surfst, batteln wir uns beim Beachvolleyball-Turnier, machen Yoga bei Sonnenuntergang oder chillen im Open-Air-Kino direkt unter den Sternen. Das ist nicht nur unvergesslich, das ist eine Lebenseinstellung."
    },
    "West Coast": {
        headline: "California Dreaming: Der epische West Coast Ride",
        story: "Der amerikanische Traum, perfekt organisiert für deine Crew. Drei Wochen lang cruisen wir im exklusiven Reisebus von den steilen Straßen San Franciscos über den weltberühmten Highway 1 bis nach Los Angeles und weiter in die Glitzermetropole Las Vegas. Ein erfahrener Guide zeigt euch die coolsten Ecken abseits der Touri-Pfade. Ihr übernachtet in ikonischen, vorgebuchten US-Motels. Die Highlights jagen sich selbst: Erst erkunden wir die Gefängnisinsel Alcatraz, dann essen wir gemeinsam Pizza beim spektakulärsten Sonnenuntergang am Rande des Grand Canyon. Instagram wird glühen!"
    },
    "SCHOTTLAND": {
        headline: "Ghosts, Castles & Live Music: Der Highlands-Vibe",
        story: "Schal an, Kamera bereit – es geht ins magische Schottland. Die erste Hälfte der Reise verbringen wir in einem ultrastylischen Hostel mitten in Edinburgh. Wir zeigen dir die Stadt bei coolen Führungen und Nervenkitzel-Ghost-Walks bei Nacht. Danach steigt die Crew in unseren Tourbus und es geht tief hinein in die nebelverhangenen, kühlen Highlands. Wir erkunden die Geheimnisse von Loch Ness, wandern durch die epische Kulisse der Isle of Skye, besichtigen alte Burgen und wärmen uns abends im traditionellen Pub bei schottischer Live-Musik und ehrlicher Herzlichkeit auf."
    },
    "SCHWEDEN": {
        headline: "Into the Wild: Das ultimative Kanu-Abenteuer",
        story: "Handy aus, Natur an. Diese Reise ist eine echte Expedition in die skandinavische Wildnis. Ausgerüstet mit Kanus, wasserdichten Packtonnen und Proviant paddeln wir als Team über die spiegelglatten, einsamen Seen Schwedens. Wenn tagsüber die Sonne rauskommt, ist es perfekt warm zum Paddeln und Baden. Abends schlagen wir unter Anleitung unserer Guides unser Camp auf einer unbewohnten Insel auf. Gemeinsam Holz hacken, über dem offenen Lagerfeuer kochen, Geschichten erzählen und im Zelt einschlafen, während draußen nur die Stille Nordeuropas wartet. Das schweißt für immer zusammen."
    },
    "THAILAND": {
        headline: "Tropeninzeln & Tuk-Tuks: Dein Asien-Abenteuer",
        story: "Du willst nach Asien, hast aber keinen Bock, allein als Backpacker loszuziehen? We got you! Unser erfahrener VAYO-Guide führt eure Gruppe sicher durch das Land des Lächelns. Das Abenteuer startet im bunten Chaos von Bangkok zwischen glitzernden Tempeln und wilden Streetfood-Märkten. Mit dem Nachtzug geht es weiter in den tropischen Süden. Wir hoppen von Koh Samui über Koh Phangan bis nach Koh Tao. Freu dich auf Schnorcheln im warmen türkisfarbenen Meer, Kajaktouren durch Mangroven und legendäre Strandpartys. Alle Unterkünfte sind safe für euch vorgebucht!"
    },
    "ÖSTERREICH": {
        headline: "Powder, Piste & Après-Ski: Saalbach Calling!",
        story: "Rauf auf die Bretter! Wir checken ein in ein stylisches Jugendhotel direkt an der Skipiste im Skicircus Saalbach-Hinterglemm. Tagsüber pflügst du mit unseren Guiding-Gruppen durch den frischen Pulverschnee – egal ob du Anfänger bist oder schon die schwarzen Pisten rockst. Nachmittags treffen wir uns alle zum organisierten Après-Ski direkt am Hotel, um die Erfolge des Tages zu feiern. Und abends? Geht die Action weiter: Fackelwanderungen durch die verschneite Winterlandschaft, rasantes Nachtrodeln und epische Spieleabende im Gemeinschaftsraum mit deiner Crew."
    },
    "GRIECHENLAND": {
        headline: "Slow Down: Deine Luxus-Auszeit am Ägäischen Meer",
        story: "Gönn dir das ultimative Upgrade für Körper und Geist. Als exklusive Kleingruppe checken wir in ein erstklassiges 5-Sterne-Wellnessresort direkt am Meer ein. Vergiss den Alltagsstress: Dein Tag beginnt mit einer sanften Yoga- und Meditationssession am Strand, während die griechische Sonne langsam über dem Meer aufgeht. Im Paket ist alles für dein Wohlbefinden drin – von professionellen Ganzkörper-Massagen über Thalasso-Therapien bis hin zur luxuriösen Saunalandschaft. Abends schlemmen wir gemeinsam gehobene mediterrane Küche mit Blick auf die Wellen. Pure Erholung."
    },
    "NEW YORK": {
        headline: "Empire State of Mind: Dein New York City Rausch",
        story: "Bereit für den absoluten Großstadt-Flash im VAYO-Style? Wir bringen dich und deine Crew mitten nach Manhattan! Gemeinsam mit unserem City-Guide stürzt du dich in den Dschungel aus Wolkenkratzern. Wir stehen auf dem Empire State Building und schauen über das endlose Lichtermeer, erleben den Times Square bei Nacht, nehmen die Fähre zur Freiheitsstatue und machen ein entspanntes Picknick im Central Park. Wir scouten die hippsten Ecken in SoHo und Williamsburg (Brooklyn), gehen in den größten Malls shoppen und haben trotzdem genug Freizeit, um in kleinen Teams die Stadt zu erobern. NYC wartet auf dich!"
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

// INTEGRIERTER NUMMERN-ABSCHEIDER & STRIPPER
function holeSauberenNamen(nameRaw) {
    if (!nameRaw) return "Unbekanntes VAYO-Match";
    // Schneidet führende Nummern wie "6. West Coast USA" oder "1." oder "10. " ab
    let sauber = nameRaw.replace(/^\d+\.\s*/, '').trim();
    return sauber || nameRaw;
}

// Findet das passende Icon und die zugehörige VAYO-Branding-Hintergrundfarbe
function holePiktogrammMeta(nameClean) {
    for (let schluessel in piktogrammMapping) {
        if (nameClean.toLowerCase().includes(schluessel.toLowerCase())) {
            return piktogrammMapping[schluessel];
        }
    }
    return piktogrammMapping["Default"];
}

async function berechneErgebnis() {
    quizScreen.classList.add('hidden');
    resultScreen.classList.remove('hidden');
    
    const rankingListElement = document.getElementById('ranking-list');
    if(rankingListElement) rankingListElement.innerHTML = "";

    try {
        const { data: reisen, error } = await supabaseClient.from('reisen').select('*');
        if (error) throw error;

        const kategorienSpalten = ['fokus', 'unterkuenfte', 'wetter', 'kulisse', 'transport', 'lage', 'unterkunft_art', 'dauer', 'zielgruppe', 'kulturraum', 'fitness', 'gepaeck', 'digital', 'verpflegung', 'gruppe', 'lernfokus', 'co2', 'abend', 'zeitplan', 'wohlfuehl'];

        let reisenMitPunkten = reisen.map(reise => {
            let punkte = 0;
            userAnswers.forEach((antwort, index) => {
                const spaltenName = kategorienSpalten[index];
                if (reise[spaltenName] === antwort) punkte++;
            });
            let prozent = Math.round((punkte / quizQuestions.length) * 100);
            return { ...reise, punkte, prozent };
        });

        reisenMitPunkten.sort((a, b) => b.punkte - a.punkte);
        const topMatch = reisenMitPunkten[0];

        if (topMatch && topMatch.punkte > 0) {
            const saubererTopName = holeSauberenNamen(topMatch.name);
            
            // Setze bereinigten Titel & Piktogramm-Box-Styling
            matchNameElement.innerText = saubererTopName;
            
            const meta = holePiktogrammMeta(saubererTopName);
            const piktoBox = document.getElementById('vayo-piktogramm-box');
            if(piktoBox) {
                piktoBox.innerHTML = `<i class="${meta.icon}"></i>`;
                piktoBox.style.backgroundColor = meta.color;
            }

            // Hole passende VAYO-Brand Story & Headline aus dem Produkt-Portfolio
            let portfolioKey = Object.keys(produktPortfolio).find(k => saubererTopName.toLowerCase().includes(k.toLowerCase()));
            if (portfolioKey && produktPortfolio[portfolioKey]) {
                document.getElementById('match-headline').innerText = produktPortfolio[portfolioKey].headline;
                document.getElementById('match-description').innerText = produktPortfolio[portfolioKey].story;
            } else {
                document.getElementById('match-headline').innerText = "Dein ultimativer VAYO-Vibe!";
                document.getElementById('match-description').innerText = `Genial! Dein persönlicher Vibe passt zu ${topMatch.prozent}% zu diesem VAYO-Abenteuer.`;
            }
            
            // 4. Die restlichen Ränge als Runner-Ups darunter auflisten
            if (rankingListElement) {
                rankingListElement.innerHTML = "<h3>Deine weiteren Plätze:</h3>";

                for (let i = 1; i < reisenMitPunkten.length; i++) {
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
            matchNameElement.innerText = "Kein Match gefunden";
        }
    } catch (err) {
        console.error(err);
        matchNameElement.innerText = "Verbindungsfehler";
    }
}