function changeColor(e, couleur) {
    if (!color) {
        document.getElementById(couleur).style.width = "256px";
        document.getElementById(couleur).style.backgroundImage =
            "url('palette.jpg')";
    } else {
        myFunction(e, couleur);
        changeCouleurObstacle(couleur);
        document.getElementById(couleur).style.width = "20px";
        document.getElementById(couleur).style.backgroundImage = "";
    }
    color = !color;
}

function colorOut(couleur) {
    document.getElementById(couleur).style.width = "20px";
    document.getElementById(couleur).style.backgroundImage = "";
    color = false;
}

var DECALX0 = 170;
var DECALY0 = 65;

var DECALX1 = 259;
var DECALY1 = 65;

var DECALX2 = 348;
var DECALY2 = 65;

var DECALX3 = 437;
var DECALY3 = 65;

var TAILLE_X = 256; // couleurs
var TAILLE_Y = 15; // luminosité

var rouge = 0;
var vert = TAILLE_X / 3;
var jaune = TAILLE_X / 6;
var bleu = TAILLE_X / 3 + TAILLE_X / 3;
var cyan = TAILLE_X / 6 + TAILLE_X / 3;
var majenta = TAILLE_X - TAILLE_X / 6;
var rouge2 = TAILLE_X;

var MaxColor = 255;
var r = 0;
var v = 0;
var b = 0;
function myFunction(e, couleur) {
    if (couleur == "Couleur1") {
        x = e.clientX - DECALX1;
        y = e.clientY - DECALY1;
    } else if (couleur == "Couleur2") {
        x = e.clientX - DECALX2;
        y = e.clientY - DECALY2;
    } else if (couleur == "Couleur3") {
        x = e.clientX - DECALX3;
        y = e.clientY - DECALY3;
    } else if (couleur == "Couleur0") {
        x = e.clientX - DECALX0;
        y = e.clientY - DECALY0;
    }

    r = 0;
    v = 0;
    b = 0;

    if (x < jaune) {
        r = MaxColor;
        v = (x / jaune) * MaxColor;
        b = 0;
    } else if (x > jaune && x < vert) {
        r = MaxColor - ((x - jaune) / jaune) * MaxColor;
        v = MaxColor;
        b = 0;
    } else if (x > vert && x < cyan) {
        r = 0;
        b = ((x - jaune * 2) / jaune) * MaxColor;
        v = MaxColor;
    } else if (x > cyan && x < bleu) {
        r = 0;
        v = MaxColor - ((x - jaune * 3) / jaune) * MaxColor;
        b = MaxColor;
    } else if (x > bleu && x < majenta) {
        r = ((x - jaune * 4) / jaune) * MaxColor;
        v = 0;
        b = MaxColor;
    } else if (x > majenta && x < rouge2) {
        r = MaxColor;
        v = 0;
        b = MaxColor - ((x - jaune * 5) / jaune) * MaxColor;
    }

    r = Math.round(r, 0);
    v = Math.round(v, 0);
    b = Math.round(b, 0);

    r = r + 70;
    v = v + 70;
    b = b + 70;
    if (r > MaxColor) {
        r = MaxColor;
    }
    if (v > MaxColor) {
        v = MaxColor;
    }
    if (b > MaxColor) {
        b = MaxColor;
    }

    if (r > MaxColor) {
        r = MaxColor;
    }
    if (v > MaxColor) {
        v = MaxColor;
    }
    if (b > MaxColor) {
        b = MaxColor;
    }
    document.getElementById(couleur).style.backgroundColor =
        "rgba(" + r + ", " + v + ", " + b + ", 1)";
}

function changeCouleurObstacle(couleur) {
    var r2 = r - 32;
    var v2 = v - 32;
    var b2 = b - 32;
    if (r2 < 0) {
        r2 = 0;
    }
    if (v2 < 0) {
        v2 = 0;
    }
    if (b2 < 0) {
        b2 = 0;
    }

    //var colorb= color
    color = "#" + toHexa(r) + "" + toHexa(v) + "" + toHexa(b);
    colorb = "#" + toHexa(r2) + "" + toHexa(v2) + "" + toHexa(b2);
    if (couleur == "Couleur1") {
        COLOR_1 = color;
        COLOR_1b = colorb;
    } else if (couleur == "Couleur2") {
        COLOR_2 = color;
        COLOR_2b = colorb;
    } else if (couleur == "Couleur3") {
        COLOR_3 = color;
    } else if (couleur == "Couleur0") {
        //fond
        r = r + 140;
        v = v + 140;
        b = b + 140;
        if (r > MaxColor) {
            r = MaxColor;
        }
        if (v > MaxColor) {
            v = MaxColor;
        }
        if (b > MaxColor) {
            b = MaxColor;
        }
        color = "#" + toHexa(r) + "" + toHexa(v) + "" + toHexa(b);
        colorb = "#" + toHexa(r2) + "" + toHexa(v2) + "" + toHexa(b2);
        COLOR_TERRAIN = color;
        COLOR_TEXT_UNDER =
            "rgba(" +
            toDec("r") +
            ", " +
            toDec("v") +
            ", " +
            toDec("b") +
            ", 0.7)"; // grilles
    }
    genererParcours();
}

function toHexa(initial) {
    var regDec = /^\d+$/;
    var converti = (converti = parseInt(initial, 10)
        .toString(16)
        .toUpperCase());
    if (converti.length < 2) {
        converti = "0" + converti;
    }
    return converti;
}
function toDec(initial) {
    var regHexa = /^[a-f\d]+$/i;
    var converti = parseInt(initial, 16);
    return converti;
}

function setColorPredef(id) {
    if (id == 1) {
        //standard
        COLOR_1 = "#22AAFF"; // principale
        COLOR_1b = "#028ADF"; // principale sombre
        COLOR_2 = "#CC3300"; // zones
        COLOR_2b = "#AC1300"; // zones sombre
        COLOR_3 = "#EEEEEE"; // couleur barre 2
        COLOR_TEXT_UNDER = "rgba(211, 228, 240, 0.7)"; // grilles
        COLOR_TERRAIN = "#d3e4f0"; // terrain CCFFCC
    } else if (id == 2) {
        //noir & blanc
        COLOR_1 = "#555555"; // principale
        COLOR_1b = "#353535"; // principale sombre
        COLOR_2 = "#aaaaaa"; // zones
        COLOR_2b = "#8a8a8a"; // zones sombre
        COLOR_3 = "#ffffff"; // couleur barre 2
        COLOR_TEXT_UNDER =
            "rgba(" +
            toDec("ee") +
            ", " +
            toDec("ee") +
            ", " +
            toDec("ee") +
            ", 0.7)"; // grilles
        COLOR_TERRAIN = "#eeeeee"; // terrain CCFFCC
    } else if (id == 3) {
        //noir & rouge
        COLOR_1 = "#555555"; // principale
        COLOR_1b = "#353535"; // principale sombre
        COLOR_2 = "#CC3300"; // zones
        COLOR_2b = "#AC1300"; // zones sombre
        COLOR_3 = "#ffffff"; // couleur barre 2
        COLOR_TEXT_UNDER = "rgba(211, 228, 240, 0.7)"; // grilles
        COLOR_TERRAIN = "#d3e4f0"; // terrain CCFFCC
    } else if (id == 4) {
        //eco color
        COLOR_1 = "#99DDFF"; // principale
        COLOR_1b = "#79BDDF"; // principale sombre
        COLOR_2 = "#ff6666"; // zones
        COLOR_2b = "#DF4646"; // zones sombre
        COLOR_3 = "#EEEEEE"; // couleur barre 2
        COLOR_TEXT_UNDER = "rgba(255, 255, 255, 0.7)"; // grilles
        COLOR_TERRAIN = "#ffffff"; // terrain CCFFCC
    } else if (id == 5) {
        //eco noir & blanc
        COLOR_1 = "#dddddd"; // principale
        COLOR_1b = "#bdbdbd"; // principale sombre
        COLOR_2 = "#bbbbbb"; // zones
        COLOR_2b = "#9b9b9b"; // zones sombre
        COLOR_3 = "#ffffff"; // couleur barre 2
        COLOR_TEXT_UNDER =
            "rgba(" +
            toDec("ff") +
            ", " +
            toDec("ff") +
            ", " +
            toDec("ff") +
            ", 0.7)"; // grilles
        COLOR_TERRAIN = "#ffffff"; // terrain CCFFCC
    } else if (id == 6) {
        //standard
        COLOR_1 = "#dddddd"; // principale
        COLOR_1b = "#bdbdbd"; // principale sombre
        COLOR_2 = "#CC3300"; // zones
        COLOR_2b = "#AC1300"; // zones sombre
        COLOR_3 = "#EEEEEE"; // couleur barre 2
        COLOR_TEXT_UNDER = "rgba(211, 228, 240, 0.7)"; // grilles
        COLOR_TERRAIN = "#CCFFCC"; // terrain CCFFCC
    }
    genererParcours();
}

function setBackgroundColor(id) {
    if (id == 1) {
        COLOR_TEXT_UNDER = "rgba(255, 255,255, 0.7)";
        COLOR_TERRAIN = "#ffffff";
        COLOR_GRILLE = "#cccccc"; // grilles
    } else if (id == 2) {
        COLOR_TEXT_UNDER = "rgba(211, 228, 240, 0.7)";
        COLOR_TERRAIN = "rgba(211, 228, 240, 1)";
        COLOR_GRILLE = "#bdcdd8"; // grilles
    } else if (id == 3) {
        COLOR_TEXT_UNDER = "rgba(211, 228, 240, 0.7)";
        COLOR_TERRAIN = "rgba(204, 255, 204, 1)";
        COLOR_GRILLE = "#b2e0b2"; // grilles
    }
    genererParcours();
}

function setDriverColor(id) {
    if (id == 1) {
        COLOR_VETEMENTS = "#bbbbbb";
    } else if (id == 2) {
        COLOR_VETEMENTS = "#CC3300";
    } else if (id == 3) {
        COLOR_VETEMENTS = "#22AAFF";
    }
    genererParcours();
}

function setObstacleColor(id) {
    if (id == 1) {
        //eco noir & blanc
        COLOR_1 = "#dddddd"; // principale
        COLOR_1b = "#bdbdbd"; // principale sombre
        COLOR_2 = "#bbbbbb"; // zones
        COLOR_2b = "#9b9b9b"; // zones sombre
        COLOR_3 = "#ffffff"; // couleur barre 2
    } else if (id == 2) {
        //standard
        COLOR_1 = "#22AAFF"; // principale
        COLOR_1b = "#028ADF"; // principale sombre
        COLOR_2 = "#CC3300"; // zones
        COLOR_2b = "#AC1300"; // zones sombre
        COLOR_3 = "#EEEEEE"; // couleur barre 2
    } else if (id == 3) {
        //noir & rouge
        COLOR_1 = "#555555"; // principale
        COLOR_1b = "#353535"; // principale sombre
        COLOR_2 = "#CC3300"; // zones
        COLOR_2b = "#AC1300"; // zones sombre
        COLOR_3 = "#ffffff"; // couleur barre 2
    } else if (id == 4) {
        //blanc rouge
        COLOR_1 = "#dddddd"; // principale
        COLOR_1b = "#bdbdbd"; // principale sombre
        COLOR_2 = "#CC3300"; // zones
        COLOR_2b = "#AC1300"; // zones sombre
        COLOR_3 = "#EEEEEE"; // couleur barre 2
    } else if (id == 5) {
        //noir & rouge
        COLOR_1 = "#555555"; // principale
        COLOR_1b = "#353535"; // principale sombre
        COLOR_2 = "#e07ecd "; // zones
        COLOR_2b = "#ae629f"; // zones sombre
        COLOR_3 = "#ffffff"; // couleur barre 2
    }
    genererParcours();
}

/*
var COLOR_1="#22AAFF";// principale
var COLOR_1b="#0088DD";// principale sombre
var COLOR_2="#CC3300";// zones
var COLOR_2b="#AA1100";// zones sombre
var COLOR_3="#EEEEEE";// couleur barre 2
*/
