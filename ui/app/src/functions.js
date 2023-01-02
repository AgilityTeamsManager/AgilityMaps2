///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////FONCTIONS//////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

var isOpenBarreOutil = true;
var isOpenBarreTitre = true;
function switchBarreOutil() {
    if (isOpenBarreOutil) {
        //fermeture
        DECAL_X_INTERFACE = 15;
        document.getElementById("barreOutilCache").style.left = "0px";
        document.getElementById("contentCanvas").style.left = "15px";
        document.getElementById("outils").style.visibility = "hidden";
        document.getElementById("trajMaitre").style.visibility = "hidden";
    } else {
        //ouverture
        DECAL_X_INTERFACE = 110;
        document.getElementById("barreOutilCache").style.left = "95px";
        document.getElementById("contentCanvas").style.left = "110px";
        document.getElementById("outils").style.visibility = "visible";
        document.getElementById("trajMaitre").style.visibility = "visible";
    }
    isOpenBarreOutil = !isOpenBarreOutil;
}

function switchBarreTitre() {
    if (isOpenBarreTitre) {
        //fermeture
        DECAL_Y_INTERFACE = 15;
        document.getElementById("barreOutilCache").style.top = "15px";
        document.getElementById("outils").style.top = "15px";
        document.getElementById("trajMaitre").style.top = "15px";

        document.getElementById("barreTitreCache").style.top = "0px";
        document.getElementById("contentCanvas").style.top = "15px";
        document.getElementById("titre").style.visibility = "hidden";
        document.getElementById("options").style.visibility = "hidden";
        document.getElementById("logo").style.visibility = "hidden";
        document.getElementById("medaille").style.visibility = "hidden";
        document.getElementById("barreInfo").style.visibility = "hidden";
        document.getElementById("titreLogo").style.visibility = "hidden";
    } else {
        //ouverture
        DECAL_Y_INTERFACE = 88;
        document.getElementById("barreOutilCache").style.top = "103px";
        document.getElementById("outils").style.top = "103px";
        document.getElementById("trajMaitre").style.top = "103px";
        document.getElementById("barreTitreCache").style.top = "88px";
        document.getElementById("contentCanvas").style.top = "103px";
        document.getElementById("titre").style.visibility = "visible";
        document.getElementById("options").style.visibility = "visible";
        document.getElementById("logo").style.visibility = "visible";
        document.getElementById("medaille").style.visibility = "visible";
        document.getElementById("barreInfo").style.visibility = "visible";
        document.getElementById("titreLogo").style.visibility = "visible";
    }
    isOpenBarreTitre = !isOpenBarreTitre;
}
function toDegrees(angle) {
    return (angle * Math.PI) / 180;
}
function ajouterSupprimerTrajectoires() {
    trajectoire = !trajectoire;
    genererParcours();
}
function changeLargeur() {
    var largeurP = document.getElementById("largeurParcours").value;
    // Enlever tous les charactères sauf les chiffres
    largeurP = largeurP.replace(/[^0-9]/g, "");
    if (largeurP != 0) {
        canvas.width = ((largeurP * 100) / pixel / unite + MARGE * 2) * scale;
        canvasSizeX = canvas.width / scale;
        context.scale(scale, scale);
        genererParcours();
    }
}
function changeLongueur() {
    var longueurP = document.getElementById("longueurParcours").value;
    // Enlever tous les charactères sauf les chiffres
    longueurP = longueurP.replace(/[^0-9]/g, "");
    if (longueurP != 0) {
        canvas.height = ((longueurP * 100) / pixel / unite + MARGE * 3) * scale;
        canvasSizeY = canvas.height / scale;
        context.scale(scale, scale);
        genererParcours();
    }
}

function changeEchelle() {
    var echelle = document.getElementById("echelle").value;
    if (echelle > 0) {
        TAILLE_GRILLAGE = ((100 / pixel) * echelle) / unite;
        genererParcours();
    }
}
function changeInfos() {
    titre = document.getElementById("titreParcours").value;
    auteur = document.getElementById("auteurParcours").value;
    genererParcours();
}
function log(valeur) {
    document.getElementById("texte").innerHTML = valeur;
}
function exportToPNG2() {
    //window.open(canvas.toDataURL('image/png'));
    var d = canvas.toDataURL("image/png");
    var w = window.open("about:blank", "image from canvas");
    w.document.write("<img src='" + d + "' alt='from canvas'/>");
}
function exportToPNG(qualite) {
    document.getElementById("globalContent").style.display = "none";

    var oldScale = scale;
    if (qualite == 0) {
        // on ne fait rien car on utilise les paramètres par defaut
    } else if (qualite == 4) {
        zoom(4);
    } else if (qualite == 8) {
        zoom(8);
    }

    var canvasimg = document.getElementById("canvasimg");

    var fond = document.getElementById("fondImage");
    canvasimg.src = canvas.toDataURL("img/png");

    canvasimg.style.visibility = "visible";
    var conteneurImg = document.getElementById("conteneurImgExport");
    conteneurImg.className = "imageExport";

    fond.className = "fondExport";
    zoom(oldScale);
}
function fermerExport() {
    document.getElementById("globalContent").style.display = "block";
    //var fond = document.getElementById('fondImage');
    var conteneurImg = document.getElementById("conteneurImgExport");
    conteneurImg.className = "imageNotExport";
    //fond.className ="fondNotExport";
    var canvasimg = document.getElementById("canvasimg");
    canvasimg.style.visibility = "hidden";
    zoom(1);
    //canvasimg.style.display='none';
}

function zoom(niveau) {
    if (niveau == "p") {
        scale = scale + 0.2;
    } else if (niveau == "m") {
        scale = scale - 0.2;
    } else {
        scale = niveau;
    }

    changeLongueur();
    changeLargeur();
    genererParcours();
}

function changeUniteMesure() {
    var oldUnit = unite;

    unite = document.getElementById("uniteMesure").value;
    var convertion = unite / oldUnit;
    // convertion des longueurs/largeurs
    var longueurP =
        document.getElementById("longueurParcours").value * convertion;
    document.getElementById("longueurParcours").value = Math.round(longueurP);
    var largeurP =
        document.getElementById("largeurParcours").value * convertion;
    document.getElementById("largeurParcours").value = Math.round(largeurP);
    changeEchelle();
}

var xBz;
var yBz;
var vitesseTraj = 20;
var vitMax = 100;
function customBez(t, x0, y0, x1, y1, x2, y2, x3, y3) {
    var cX = 3 * (x1 - x0),
        bX = 3 * (x2 - x1) - cX,
        aX = x3 - x0 - cX - bX;

    var cY = 3 * (y1 - y0),
        bY = 3 * (y2 - y1) - cY,
        aY = y3 - y0 - cY - bY;

    xBz = aX * Math.pow(t, 3) + bX * Math.pow(t, 2) + cX * t + x0;
    yBz = aY * Math.pow(t, 3) + bY * Math.pow(t, 2) + cY * t + y0;
}

function customBezier(x1, y1, x1b, y1b, x2b, y2b, x2, y2) {
    var accuracy = 0.01;

    context.strokeStyle = "rgba(255, 0, 0, 1)"; // grilles

    var newX = x1;
    var newY = y1;
    var i = 0;
    var avance = ((longueurMetre / 100) * accuracy * vitMax) / 13;
    var oldX;
    var oldY;
    var oldX2;
    var oldY2;
    var oldAngle;
    for (i = 0; i <= 1 + accuracy; i += accuracy) {
        context.beginPath();
        context.moveTo(newX, newY);

        if (document.getElementById("VitesseTrajectoires").checked) {
            context.lineWidth = 1.5;
            context.strokeStyle = getColor(vitesseTraj); // grilles
        } else {
            context.lineWidth = 1;
            context.strokeStyle = "black"; // grilles
        }
        customBez(i, x1, y1, x1b, y1b, x2b, y2b, x2, y2);
        context.lineTo(xBz, yBz);
        context.stroke();
        if (document.getElementById("VitesseTrajectoires").checked) {
            if (i > 0) {
                //calcul de l'angle actuel
                newAngle = (Math.atan2(newY - yBz, newX - xBz) / Math.PI) * 180;
                var diffAngle = oldAngle - newAngle;
                if (diffAngle >= 0) {
                    if (diffAngle > 6) {
                        vitesseTraj -= avance * 5; // cas d'un virage séré
                    } else if (diffAngle > 5) {
                        vitesseTraj -= avance * 3; // cas d'un virage séré
                    } else if (diffAngle > 4) {
                        vitesseTraj -= avance * 2; // cas d'un virage séré
                    } else if (diffAngle > 3) {
                        vitesseTraj -= avance * 1; // cas d'un virage séré
                    } else if (diffAngle > 2) {
                        //vitesseTraj+=avance*0.2;// cas d'un virage séré
                    } else if (diffAngle > 1.5) {
                        vitesseTraj += avance * 0.4; // cas d'un virage séré
                    } else if (diffAngle > 1) {
                        vitesseTraj += avance * 0.6; // cas d'un virage séré
                    } else if (diffAngle > 0.5) {
                        vitesseTraj += avance * 0.8; // cas d'un virage peu séré
                    } else {
                        vitesseTraj += avance; // cas d'une ligne a peu pres droite
                    }
                }
                if (diffAngle < 0) {
                    if (diffAngle < -6) {
                        vitesseTraj -= avance * 5; // cas d'un virage séré
                    } else if (diffAngle < -5) {
                        vitesseTraj -= avance * 3; // cas d'un virage séré
                    } else if (diffAngle < -4) {
                        vitesseTraj -= avance * 2; // cas d'un virage séré
                    } else if (diffAngle < -3) {
                        vitesseTraj -= avance * 1; // cas d'un virage séré
                    } else if (diffAngle < -2) {
                        //vitesseTraj+=avance*0.2;// cas d'un virage séré
                    } else if (diffAngle < -1.5) {
                        vitesseTraj += avance * 0.4; // cas d'un virage peu séré
                    } else if (diffAngle < -1) {
                        vitesseTraj += avance * 0.6; // cas d'un virage peu séré
                    } else if (diffAngle < -0.5) {
                        vitesseTraj += avance * 0.8; // cas d'un virage peu séré
                    } else {
                        vitesseTraj += avance; // cas d'une ligne a peu pres droite
                    }
                }
                oldAngle = newAngle;
            } else {
                vitesseTraj += avance; // cas d'une ligne droite
            }
            if (vitesseTraj > vitMax) {
                vitesseTraj = vitMax;
            }
            if (vitesseTraj < 0) {
                vitesseTraj = 0;
            }
        }

        newX = xBz;
        newY = yBz;
    }

    context.lineWidth = 1;
}

function getColor(vitesseTraj) {
    var colorV = 0;
    var colorR = 255;
    if (vitesseTraj <= vitMax / 2) {
        colorR = 255;
    } else {
        colorR = 255 - ((vitesseTraj - vitMax / 2) / vitMax) * 255;
    }
    if (vitesseTraj >= vitMax / 2) {
        colorV = 255;
    } else {
        colorV = (vitesseTraj / vitMax) * 2 * 255;
    }

    if (colorV > 255) {
        colorV = 255;
    } else if (colorV < 0) {
        colorV = 0;
    }
    if (colorR > 255) {
        colorR = 255;
    } else if (colorR < 0) {
        colorR = 0;
    }
    return "rgba(" + Math.round(colorR) + ", " + Math.round(colorV) + ", 0, 1)";
}
