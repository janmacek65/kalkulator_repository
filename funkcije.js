function calculateEnacba() {
    var enacba = $("#enacbaVnos").val(); // Pridobimo enačbo iz vnosnega polja
    if (enacba == "") { // Če ne vpišemo enačbe, izpiši obvestilo.
        document.getElementById("calculatedValue").innerHTML = "Niste vpisali enačbe...";
        return;
    }
    enacba = enacba.trim(); // izbrišemo končne presledke
    if (enacba.charAt(enacba.length - 1) == "=") { // v kolikor je zadnji znak "=" ga izbiršemo in nato ponovno odstranimo preostale končne presledke
        enacba = enacba.slice(0, -1); // izbriši zadnji znak stringa
        enacba = enacba.trim();
    }
    // Izračunamo rezultat s pomočjo math.js knjžnice, ki tudi opravi parsanje enačbe
    // Podprte vse zahtevane operacije: seštevanje/odštevanje/množenje/deljenje/modul/koren/kvadrat; upošteva prednostne operacije in oklepaje
    var result = math.evaluate(enacba);
    document.getElementById("calculatedValue").innerHTML = result; // Vpišemo rezultat v pripravljen html element.
}

// Lastna funckija za seštevanje
function calculateSestevanje() {
    var prvoStevilo = $("#sestevanjePrvoStevilo").val();
    var drugoStevilo = $("#sestevanjeDrugoStevilo").val();
    var rezultat = Number(prvoStevilo) + Number(drugoStevilo);
    document.getElementById("outputSestevanje").innerHTML = rezultat;
}

// Lastna funcija za odštevanje
function calculateOdstevanje() {
    var prvoStevilo = $("#odstevanjePrvoStevilo").val();
    var drugoStevilo = $("#odstevanjeDrugoStevilo").val();
    var rezultat = Number(prvoStevilo) - Number(drugoStevilo);
    document.getElementById("outputOdstevanje").innerHTML = rezultat;
}

// Lastna funkcija za množenje
function calculateMnozenje() {
    var prvoStevilo = $("#mnozenjePrvoStevilo").val();
    var drugoStevilo = $("#mnozenjeDrugoStevilo").val();
    var rezultat = Number(prvoStevilo) * Number(drugoStevilo);
    document.getElementById("outputMozenje").innerHTML = rezultat;
}

// Lastna funkcija za deljenje
function calculateDeljenje() {
    var prvoStevilo = $("#deljenjePrvoStevilo").val();
    var drugoStevilo = $("#deljenjeDrugoStevilo").val();
    var rezultat = Number(prvoStevilo) / Number(drugoStevilo);
    document.getElementById("outputDeljenje").innerHTML = rezultat;
}

// Lastna funkcija za modulo
// Vir: https://bobbyhadz.com/blog/javascript-typeerror-indexof-is-not-a-function
function calculateModul() {
    var deljenec = $("#deljenecModul").val(); // prodobimo deljenca
    var delitelj = $("#deliteljModul").val(); // pridobimo delitelja
    var rezultatDeljenja = Number(deljenec) / Number(delitelj); // zdelimo
    var positionComma = String(rezultatDeljenja).indexOf('.'); // pridobimo pozicijo pike (necela števila)
    if (positionComma == -1) { // če je pozicija pike -1 = deljenje je brez ostanka
        document.getElementById("outputModul").innerHTML = "0"; // izpiši 0 in konec.
    } else if (positionComma != -1) { // Če je pozicija pike različno od 0 --> imamo piko
        var rezultat1 = String(rezultatDeljenja).substring(0, positionComma); // preberemo do pike = celo število
        rezultat2 = Number(rezultat1) * Number(delitelj); // zmnožimo celo število rezulata pri deljenju in deljenca
        rezultat = Number(deljenec) - Number(rezultat2); // odštejemo
        document.getElementById("outputModul").innerHTML = rezultat; // končni rezultat je rezultat zadnjega deljenja
    }
}

// Lastna funkcija za potence
function calculatePotenca() {
    var osnova = $("#potencaOsnova").val();
    var potenca = $("#potencaPotenca").val();
    var rezultat = 1;
    for (var i = 0; i < potenca; i++) { // s for zanko iteriramo množenje glede na vrednost potence
        rezultat = rezultat * osnova; // množimo z osnovo
    }
    document.getElementById("outputPotenca").innerHTML = rezultat;
}

// Lastna funkcija za koren
// The Newton-Raphson method / Babylonian method
// Vir: https://www.geeksforgeeks.org/find-root-of-a-number-using-newtons-method/
// Vir: https://blogs.sas.com/content/iml/2016/05/16/babylonian-square-roots.html
function calculateKoren() {
    var korenjenec = $("#kkorenKorenjenec").val();
    var poskus = 1;
    let natancnost = 0.0000000001;
    while (true) {
        let razlika = poskus * poskus - korenjenec; // računanje razlike kvadrata iteracije poskusa in korenjenca
        if (razlika < 0) { // absolutna vrednost
            razlika = -razlika;
        }
        if (razlika <= natancnost) { // preverjanje natančnosti
            document.getElementById("outputKkoren").innerHTML = poskus;
            break;
        }
        poskus = (poskus + korenjenec / poskus) / 2; // iteracija iskanja korena parabolično po Babilonskem algoritmu
    }
}