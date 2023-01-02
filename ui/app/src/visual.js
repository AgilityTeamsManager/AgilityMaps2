///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////GENERATION VISUELLE DU TERRAIN///////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function genererParcours() {
    genererTerrain();
    genererTrajectoires();
    genererObstacles();
    genererNumeros();
    genererMarges();
    genererInfos();
}
var gen = 0;
function genererTerrain() {
    context.strokeStyle = COLOR_TEXT;
    context.fillStyle = COLOR_TERRAIN;
    context.fillRect(0, 0, canvasSizeX, canvasSizeY);
    context.beginPath();
    context.strokeStyle = COLOR_GRILLE;
    for (
        var i = MARGE + TAILLE_GRILLAGE;
        i < canvasSizeY - MARGE * 2;
        i += TAILLE_GRILLAGE
    ) {
        context.moveTo(0 + MARGE, i);
        context.lineTo(canvasSizeX - MARGE, i);
    }
    for (
        var j = MARGE + TAILLE_GRILLAGE;
        j < canvasSizeX - MARGE;
        j += TAILLE_GRILLAGE
    ) {
        context.moveTo(j, 0 + MARGE);
        context.lineTo(j, canvasSizeY - MARGE * 2);
    }
    context.stroke();
}
function genererInfos() {
    //context.fillText(titre,MARGE,canvasSizeY);
    context.fillStyle = COLOR_TEXT;

    context.fillText(titre, MARGE, canvasSizeY - 20);

    if (unite == 1) {
        idUnite = 34;
    } else if (unite == 1.093613) {
        idUnite = 35;
    } else {
        //3.28084
        idUnite = 36;
    }
    if (document.getElementById("AfficherDistance").checked) {
        context.fillText(
            langues[idLg][8] +
                " : " +
                Math.round(longueurTotal) / 100 +
                " " +
                langues[idLg][idUnite],
            canvasSizeX - MARGE - 150,
            canvasSizeY - 20
        );
    }
    context.fillText(
        "www.AgilityMaps.com ",
        canvasSizeX - MARGE - 150,
        canvasSizeY - 8
    );
    var idUnite;

    if (auteur != "") {
        context.fillText(
            langues[idLg][9] + " : " + auteur,
            MARGE,
            canvasSizeY - 8
        );
    }
}
function genererNumeros() {
    context.font = "7pt Calibri";
    for (var i = 1; i < nextNumber; i++) {
        context.fillStyle = COLOR_BLANC;
        context.strokeStyle = COLOR_TEXT;
        rect(
            listeNumero[i][1] - LARGEUR_NUMERO / 2,
            listeNumero[i][2] - HAUTEUR_NUMERO / 2,
            LARGEUR_NUMERO,
            HAUTEUR_NUMERO
        );
        context.fillStyle = COLOR_TEXT;
        if (i < 10) {
            context.fillText(
                listeNumero[i][0],
                listeNumero[i][1] + 4 - LARGEUR_NUMERO / 2,
                listeNumero[i][2] + 7 - HAUTEUR_NUMERO / 2
            );
        } else {
            context.fillText(
                listeNumero[i][0],
                listeNumero[i][1] + 1 - LARGEUR_NUMERO / 2,
                listeNumero[i][2] + 7 - HAUTEUR_NUMERO / 2
            );
        }
    }
    for (var i = 1; i < nextNumber2; i++) {
        context.fillStyle = COLOR_METAL;
        context.strokeStyle = COLOR_TEXT;
        rect(
            listeNumero2[i][1] - LARGEUR_NUMERO / 2,
            listeNumero2[i][2] - HAUTEUR_NUMERO / 2,
            LARGEUR_NUMERO,
            HAUTEUR_NUMERO
        );
        context.fillStyle = COLOR_TEXT;
        if (i < 10) {
            context.fillText(
                listeNumero2[i][0],
                listeNumero2[i][1] + 4 - LARGEUR_NUMERO / 2,
                listeNumero2[i][2] + 7 - HAUTEUR_NUMERO / 2
            );
        } else {
            context.fillText(
                listeNumero2[i][0],
                listeNumero2[i][1] + 1 - LARGEUR_NUMERO / 2,
                listeNumero2[i][2] + 7 - HAUTEUR_NUMERO / 2
            );
        }
    }
    for (var i = 1; i < nextNumber3; i++) {
        context.fillStyle = COLOR_TEXT;
        context.strokeStyle = COLOR_BLANC;
        rect(
            listeNumero3[i][1] - LARGEUR_NUMERO / 2,
            listeNumero3[i][2] - HAUTEUR_NUMERO / 2,
            LARGEUR_NUMERO,
            HAUTEUR_NUMERO
        );
        context.fillStyle = COLOR_BLANC;
        if (i < 10) {
            context.fillText(
                listeNumero3[i][0],
                listeNumero3[i][1] + 4 - LARGEUR_NUMERO / 2,
                listeNumero3[i][2] + 7 - HAUTEUR_NUMERO / 2
            );
        } else {
            context.fillText(
                listeNumero3[i][0],
                listeNumero3[i][1] + 1 - LARGEUR_NUMERO / 2,
                listeNumero3[i][2] + 7 - HAUTEUR_NUMERO / 2
            );
        }
    }
}
function genererMarges() {
    context.strokeStyle = COLOR_CONTOURS;

    // contours
    context.fillStyle = COLOR_BLANC;
    context.fillRect(0, 0, canvasSizeX, MARGE);
    context.fillRect(0, 0, MARGE, canvasSizeY);

    context.fillRect(canvasSizeX - MARGE, 0, MARGE, canvasSizeY);
    context.fillRect(0, canvasSizeY - MARGE * 2, canvasSizeX, MARGE * 2);

    context.beginPath();

    context.moveTo(MARGE, MARGE);
    context.lineTo(canvasSizeX - MARGE, MARGE);
    context.lineTo(canvasSizeX - MARGE, canvasSizeY - MARGE * 2);
    context.lineTo(MARGE, canvasSizeY - MARGE * 2);
    context.lineTo(MARGE, MARGE);
    context.stroke();
    context.strokeStyle = COLOR_GRILLE;

    context.fillStyle = COLOR_TEXT;
    context.beginPath();
    context.lineWidth = 1;
    context.fillText(0, MARGE - 10, MARGE - 5);
    //context.fillText(0,canvasSizeX-MARGE+5,MARGE+4);
    //context.fillText(0,MARGE-6,MARGE-5);
    //context.fillText(0,MARGE-6,canvasSizeY-MARGE*2+15);

    for (
        var i = MARGE + TAILLE_GRILLAGE;
        i <= canvasSizeY - MARGE * 2 + 1;
        i += TAILLE_GRILLAGE
    ) {
        context.fillText(
            Math.round((((i - MARGE) * pixel) / 100) * unite),
            MARGE - 15,
            i + 4
        );
        context.fillText(
            Math.round((((i - MARGE) * pixel) / 100) * unite),
            canvasSizeX - MARGE + 5,
            i + 4
        );
    }
    for (
        var j = MARGE + TAILLE_GRILLAGE;
        j <= canvasSizeX - MARGE + 1;
        j += TAILLE_GRILLAGE
    ) {
        context.fillText(
            Math.round((((j - MARGE) * pixel) / 100) * unite),
            j - 6,
            MARGE - 5
        );
        context.fillText(
            Math.round((((j - MARGE) * pixel) / 100) * unite),
            j - 6,
            canvasSizeY - MARGE * 2 + 15
        );
    }
    context.stroke();
}
function genererObstacles() {
    if (selNumeroId != -1) {
        context.strokeStyle = "#ffff00";
        context.beginPath();
        context.lineWidth = 1;
        context.moveTo(xp, yp);
        context.lineTo(xpp, ypp);
        context.stroke();
    }
    context.strokeStyle = COLOR_CONTOURS;
    /////////////////////////////// affichage des tunnels //////////////////////////////////////////
    for (var j = 0; j < idTunnel; j++) {
        var idT = tbTunnels[j][0];
        // jonction entre les morceaux de tunels
        context.save();
        for (var art = 1; art < nbArticulationTunnel - 1; art++) {
            context.fillStyle = COLOR_1;
            context.strokeStyle = COLOR_CONTOURS;
            context.beginPath();
            context.arc(
                tbTunnels[j][art * 2 + 1],
                tbTunnels[j][art * 2 + 2],
                largeurTunnel / 2,
                0,
                2 * Math.PI
            ); //point d'encrage
            context.fill();
            context.translate(0.5, 0.5);
            context.stroke();
            context.translate(-0.5, -0.5);
        }
        context.restore();
        for (var art = 0; art < nbArticulationTunnel; art++) {
            if (art + 1 < nbArticulationTunnel) {
                x = art * 2 + 1;
                y = art * 2 + 2;
                x2 = art * 2 + 3;
                y2 = art * 2 + 4;
                //calcul de l'angle et de la distance avec le prochain point
                dist = Math.sqrt(
                    Math.pow(tbTunnels[j][x] - tbTunnels[j][x2], 2) +
                        Math.pow(tbTunnels[j][y] - tbTunnels[j][y2], 2)
                );
                angle =
                    (Math.atan2(
                        tbTunnels[j][y] - tbTunnels[j][y2],
                        tbTunnels[j][x] - tbTunnels[j][x2]
                    ) /
                        Math.PI) *
                    180;
                context.fillStyle = COLOR_1;
                context.save();
                context.translate(
                    tbTunnels[j][art * 2 + 1],
                    tbTunnels[j][art * 2 + 2]
                ); //translate to center of shape
                context.rotate((Math.PI / 180) * angle); //rotate 25 degrees
                context.translate(
                    -tbTunnels[j][art * 2 + 1],
                    -tbTunnels[j][art * 2 + 2]
                ); //translate center back to 0,0
                context.strokeStyle = COLOR_CONTOURS;
                context.translate(0.5, 0.5);
                context.strokeRect(
                    tbTunnels[j][x],
                    tbTunnels[j][y] - largeurTunnel / 2 - 1,
                    -dist,
                    1
                ); //tunnel
                context.strokeRect(
                    tbTunnels[j][x],
                    tbTunnels[j][y] + largeurTunnel / 2 - 1,
                    -dist,
                    1
                ); //tunnel
                context.translate(-0.5, -0.5);
                context.fillRect(
                    tbTunnels[j][x],
                    tbTunnels[j][y] - largeurTunnel / 2,
                    -dist,
                    largeurTunnel
                ); //tunnel
                context.fillStyle = COLOR_1b;
                context.strokeStyle = COLOR_1b;
                context.fillRect(
                    tbTunnels[j][x] - dist / 5,
                    tbTunnels[j][y] - largeurTunnel / 2,
                    1,
                    largeurTunnel
                ); //tunnel
                context.fillRect(
                    tbTunnels[j][x] - dist / 5 - dist / 5,
                    tbTunnels[j][y] - largeurTunnel / 2,
                    1,
                    largeurTunnel
                ); //tunnel
                context.fillRect(
                    tbTunnels[j][x] - dist / 5 - dist / 5 - dist / 5,
                    tbTunnels[j][y] - largeurTunnel / 2,
                    1,
                    largeurTunnel
                ); //tunnel
                context.fillRect(
                    tbTunnels[j][x] - dist / 5 - dist / 5 - dist / 5 - dist / 5,
                    tbTunnels[j][y] - largeurTunnel / 2,
                    1,
                    largeurTunnel
                ); //tunnel
                context.strokeRect(
                    tbTunnels[j][x],
                    tbTunnels[j][y] - largeurTunnel / 2,
                    -dist,
                    largeurTunnel
                ); //tunnel
                context.restore();
            }
            if (
                overTunnelComplet != -1 ||
                overPointTunnel != -1 ||
                moveTunnelComplet != -1 ||
                overTunnelId != -1
            ) {
                context.fillStyle = COLOR_3;
                context.strokeStyle = COLOR_CONTOURS;
                context.beginPath();
                context.arc(
                    tbTunnels[j][art * 2 + 1],
                    tbTunnels[j][art * 2 + 2],
                    3,
                    0,
                    2 * Math.PI
                ); //point d'encrage
                context.fill();
                context.stroke();
            }
        }
    }

    //////////////////////////////////////////// affichage des autres éléments  //////////////////////////////////////////
    for (var i = 0; i < id; i++) {
        var x = getCanvasX(i);
        var y = getCanvasY(i);
        var largx = getXCliquable(i);
        var hauty = getYCliquable(i);
        var type = getType(i);
        var angle = getAngle(i);
        var sens = getSens(i);

        context.fillStyle = COLOR_1;

        context.save();
        context.translate(largx / 2 + x, hauty / 2 + y); //translate to center of shape
        context.rotate((Math.PI / 180) * angle); //rotate 25 degrees
        context.translate(-largx / 2 - x, -hauty / 2 - y); //translate center back to 0,0

        if (type == "haie") {
            dessinerHaie(x, y, largx);
        } else if (type == "oxer") {
            dessinerOxer(x, y, largx);
        } else if (type == "passerelle") {
            dessinerPasserelle(x, y, largx, hauty);
        } else if (type == "balancoire") {
            dessinerBalance(x, y, largx, hauty);
        } else if (type == "palissade") {
            dessinerPalissade(x, y, largx, hauty);
        } else if (type == "slalom") {
            dessinerSlalom(x, y, largx, hauty);
        } else if (type == "slalom6") {
            dessinerSlalom6(x, y, largx, hauty);
        } else if (type == "chaussette") {
            dessinerChaussette(x, y, largx, hauty);
        } else if (type == "longueur") {
            dessinerLongueur(x, y, largx);
        } else if (type == "mur") {
            dessinerMur(x, y, largx, hauty);
        } else if (type == "table") {
            dessinerTable(x, y);
        } else if (type == "pneu") {
            dessinerPneu(x, y, largx, hauty);
        }
        context.fillStyle = "#FFFF00"; //jaune
        context.restore();
        if (overObject == i) {
            dessinerOverObstacle(x, y, largx, hauty, angle, i);
        }
    }

    //////////////////////////////////////////// affichage des conducteurs et chiens		//////////////////////////////////////////
    for (var i = 0; i < id; i++) {
        var x = getCanvasX(i);
        var y = getCanvasY(i);
        var largx = getXCliquable(i);
        var hauty = getYCliquable(i);
        var type = getType(i);
        var angle = getAngle(i);
        var sens = getSens(i);

        context.fillStyle = COLOR_1;

        context.save();
        context.translate(largx / 2 + x, hauty / 2 + y); //translate to center of shape
        context.rotate((Math.PI / 180) * angle); //rotate 25 degrees
        context.translate(-largx / 2 - x, -hauty / 2 - y); //translate center back to 0,0

        if (
            type == "conducteur" &&
            document.getElementById("AfficherConducteur").checked
        ) {
            dessinerConducteur(x, y, largx, hauty, sens);
        } else if (
            type == "chien" &&
            document.getElementById("AfficherConducteur").checked
        ) {
            dessinerChien(x, y, largx, hauty);
        }
        context.fillStyle = "#FFFF00"; //jaune
        context.restore();
        if (overObject == i) {
            dessinerOverObstacle(x, y, largx, hauty, angle, i);
        }
    }

    //afficherTest();
}
function rectBump(x, y, larg, haut) {
    context.translate(-0.5, -0.5);
    context.strokeRect(x, y, larg, haut); //mur
    context.translate(0.5, 0.5);
    context.fillRect(x, y, larg, haut); //mur
}
function rect(x, y, larg, haut) {
    context.fillRect(x, y, larg, haut); //mur
    context.translate(-0.5, -0.5);
    context.strokeRect(x, y, larg, haut); //mur
    context.translate(0.5, 0.5);
}

function dessinerTable(x, y) {
    context.fillStyle = COLOR_1;
    context.strokeStyle = COLOR_CONTOURS;
    rect(x, y, DIM_TABLE, DIM_TABLE);
}

function dessinerPneu(x, y, largx, hauty) {
    context.fillStyle = COLOR_1;

    context.beginPath();
    context.save();
    context.fillStyle = COLOR_2;
    context.lineWidth = 2;

    context.strokeStyle = COLOR_JOINTURES;
    context.arc(x + largx / 2 - 0.5, y + hauty / 2 - 0.5, 8, 0, 2 * Math.PI);
    context.stroke();
    context.beginPath();
    context.strokeStyle = COLOR_JOINTURES;
    context.arc(x + largx / 2 - 0.5, y + hauty / 2 - 0.5, 6, 0, 2 * Math.PI);
    context.stroke();
    context.beginPath();
    context.strokeStyle = COLOR_2;
    context.arc(x + largx / 2 - 0.5, y + hauty / 2 - 0.5, 7, 0, 2 * Math.PI);
    //context.fill();
    context.stroke();
    context.restore();

    rect(x + largx, y + hauty / 2, 5, 2.5); //barre
    rect(x - 5, y + hauty / 2, 5, 2.5); //barre

    rect(x, y, 2.5, hauty); //barre
    rect(x + largx - 2.5, y, 2.5, hauty); //barre
    rect(x + 2.5, y, largx - 5, 2.5); //barre
    rect(x + 2.5, y + hauty - 2.5, largx - 5, 2.5); //barre
}

function dessinerMur(x, y, largx, hauty) {
    context.fillStyle = COLOR_3;
    context.strokeStyle = COLOR_CONTOURS;
    rect(x, y, largx, hauty);
    context.fillStyle = COLOR_1;
    rect(
        x,
        y - (LARGEUR_MUR_TOUR / pixel / 2 - hauty / 2),
        LARGEUR_MUR_TOUR / pixel,
        LARGEUR_MUR_TOUR / pixel
    );
    rect(
        x + largx - LARGEUR_MUR_TOUR / pixel,
        y - (LARGEUR_MUR_TOUR / pixel / 2 - hauty / 2),
        LARGEUR_MUR_TOUR / pixel,
        LARGEUR_MUR_TOUR / pixel
    );
    context.fillStyle = COLOR_1b;
    context.fillStyle = COLOR_1;
    var largTuille = (largx - 30) / 3;
    context.fillRect(x + 7, y + 0.5, 4.5, hauty - 2); //tuille
    context.fillRect(x + 13, y + 0.5, 4.5, hauty - 2); //tuille
    context.fillRect(x + 19, y + 0.5, 4.5, hauty - 2); //tuille
    context.fillRect(x + 25, y + 0.5, 4.5, hauty - 2); //tuille
}

function dessinerLongueur(x, y, largx) {
    context.fillStyle = COLOR_2;
    rect(x, y, largx, 4);
    rect(x, y + 7, largx, 4);
    rect(x, y + 14, largx, 4);
    rect(x, y + 21, largx, 4);
    context.fillStyle = COLOR_3;

    rect(x, y, largx, 4);
    rect(x + 3, y + 7, largx - 6, 4);
    rect(x + 6, y + 14, largx - 12, 4);
    rect(x + 10, y + 21, largx - 20, 4);

    context.fillStyle = COLOR_2;
    rect(x + 5, y, largx - 10, 4);
    rect(x + 8, y + 7, largx - 16, 4);
    rect(x + 11, y + 14, largx - 22, 4);

    context.fillStyle = COLOR_1;
}

function dessinerChaussette(x, y, largx, hauty) {
    context.fillStyle = COLOR_2;
    context.strokeRect(x, y, 15, hauty);
    context.fillRect(x, y, 15, hauty);
    context.fillStyle = COLOR_1;
    context.beginPath();
    context.moveTo(x + 15, y);
    context.lineTo(x + largx, y - 5);
    context.lineTo(x + largx, y + hauty + 5);
    context.lineTo(x + 15, y + hauty);
    context.closePath(x + 15, y + hauty + 5);
    context.stroke();
    context.fill();
}

function dessinerSlalom(x, y, largx, hauty) {
    context.fillStyle = COLOR_METAL;
    context.fillRect(x, y, largx, hauty);
    context.fillStyle = COLOR_2;
    context.strokeStyle = COLOR_2b;
    context.beginPath();
    context.arc(
        x,
        y + DIAM_BARRE_SLALOM / 2,
        DIAM_BARRE_SLALOM,
        0,
        2 * Math.PI
    );
    context.fill();
    context.stroke();
    context.beginPath();
    context.arc(
        x + 20,
        y + DIAM_BARRE_SLALOM / 2,
        DIAM_BARRE_SLALOM,
        0,
        2 * Math.PI
    );
    context.fill();
    context.stroke();
    context.beginPath();
    context.arc(
        x + 40,
        y + DIAM_BARRE_SLALOM / 2,
        DIAM_BARRE_SLALOM,
        0,
        2 * Math.PI
    );
    context.fill();
    context.stroke();
    context.beginPath();
    context.arc(
        x + 60,
        y + DIAM_BARRE_SLALOM / 2,
        DIAM_BARRE_SLALOM,
        0,
        2 * Math.PI
    );
    context.fill();
    context.stroke();
    context.beginPath();
    context.arc(
        x + 80,
        y + DIAM_BARRE_SLALOM / 2,
        DIAM_BARRE_SLALOM,
        0,
        2 * Math.PI
    );
    context.fill();
    context.stroke();
    context.beginPath();
    context.arc(
        x + 100,
        y + DIAM_BARRE_SLALOM / 2,
        DIAM_BARRE_SLALOM,
        0,
        2 * Math.PI
    );
    context.fill();
    context.stroke();

    context.fillStyle = COLOR_1;
    context.strokeStyle = COLOR_1b;

    context.beginPath();
    context.strokeStyle = COLOR_JOINTURES;

    context.arc(
        x + 10,
        y + DIAM_BARRE_SLALOM / 2,
        DIAM_BARRE_SLALOM,
        0,
        2 * Math.PI
    );
    context.fill();
    context.stroke();
    context.beginPath();
    context.arc(
        x + 30,
        y + DIAM_BARRE_SLALOM / 2,
        DIAM_BARRE_SLALOM,
        0,
        2 * Math.PI
    );
    context.fill();
    context.stroke();
    context.beginPath();
    context.arc(
        x + 50,
        y + DIAM_BARRE_SLALOM / 2,
        DIAM_BARRE_SLALOM,
        0,
        2 * Math.PI
    );
    context.fill();
    context.stroke();
    context.beginPath();
    context.arc(
        x + 70,
        y + DIAM_BARRE_SLALOM / 2,
        DIAM_BARRE_SLALOM,
        0,
        2 * Math.PI
    );
    context.fill();
    context.stroke();
    context.beginPath();
    context.arc(
        x + 90,
        y + DIAM_BARRE_SLALOM / 2,
        DIAM_BARRE_SLALOM,
        0,
        2 * Math.PI
    );
    context.fill();
    context.stroke();
    context.beginPath();
    context.arc(
        x + 110,
        y + DIAM_BARRE_SLALOM / 2,
        DIAM_BARRE_SLALOM,
        0,
        2 * Math.PI
    );
    context.fill();
    context.stroke();
    context.beginPath();
}

function dessinerSlalom6(x, y, largx, hauty) {
    context.fillStyle = COLOR_METAL;
    context.fillRect(x, y, largx, hauty);
    context.fillStyle = COLOR_2;
    context.strokeStyle = COLOR_2b;
    context.beginPath();
    context.arc(
        x,
        y + DIAM_BARRE_SLALOM / 2,
        DIAM_BARRE_SLALOM,
        0,
        2 * Math.PI
    );
    context.fill();
    context.stroke();
    context.beginPath();
    context.arc(
        x + 20,
        y + DIAM_BARRE_SLALOM / 2,
        DIAM_BARRE_SLALOM,
        0,
        2 * Math.PI
    );
    context.fill();
    context.stroke();
    context.beginPath();
    context.arc(
        x + 40,
        y + DIAM_BARRE_SLALOM / 2,
        DIAM_BARRE_SLALOM,
        0,
        2 * Math.PI
    );
    context.fill();
    context.stroke();

    context.fillStyle = COLOR_1;
    context.strokeStyle = COLOR_1b;

    context.beginPath();
    context.strokeStyle = COLOR_JOINTURES;

    context.arc(
        x + 10,
        y + DIAM_BARRE_SLALOM / 2,
        DIAM_BARRE_SLALOM,
        0,
        2 * Math.PI
    );
    context.fill();
    context.stroke();
    context.beginPath();
    context.arc(
        x + 30,
        y + DIAM_BARRE_SLALOM / 2,
        DIAM_BARRE_SLALOM,
        0,
        2 * Math.PI
    );
    context.fill();
    context.stroke();
    context.beginPath();
    context.arc(
        x + 50,
        y + DIAM_BARRE_SLALOM / 2,
        DIAM_BARRE_SLALOM,
        0,
        2 * Math.PI
    );
    context.fill();
    context.stroke();
}

function dessinerPalissade(x, y, largx, hauty) {
    context.fillStyle = COLOR_2;
    context.strokeRect(x, y, 15, hauty);
    context.fillRect(x, y, 15, hauty);
    context.fillStyle = COLOR_1;
    context.strokeRect(x + 15, y, largx - 30, hauty);
    context.fillRect(x + 15, y, largx - 30, hauty);
    context.fillStyle = COLOR_2;
    context.strokeRect(x + largx - 15, y, 15, hauty);
    context.fillRect(x + largx - 15, y, 15, hauty);
    context.fillStyle = COLOR_JOINTURES;
    context.fillRect(x + largx / 2, y, 1, hauty);

    // ralentisseurs descente
    context.fillStyle = COLOR_2b;
    context.fillRect(x + 5, y, 1, hauty);
    context.fillRect(x + 10, y, 1, hauty);
    context.fillRect(x + largx - 5, y, 1, hauty);
    context.fillRect(x + largx - 10, y, 1, hauty);
    context.fillStyle = COLOR_1b;
    context.fillRect(x + 20, y, 1, hauty);
    context.fillRect(x + 25, y, 1, hauty);
    context.fillRect(x + 30, y, 1, hauty);
    context.fillRect(x + largx - 20, y, 1, hauty);
    context.fillRect(x + largx - 25, y, 1, hauty);
    context.fillRect(x + largx - 30, y, 1, hauty);
}

function dessinerPasserelle(x, y, largx, hauty) {
    context.fillStyle = COLOR_JOINTURES;

    context.fillRect(x + largx / 3, y - 5, 2, hauty + 10);
    context.strokeRect(x + largx / 3, y - 5, 2, hauty + 10);

    context.fillStyle = COLOR_JOINTURES;
    context.fillRect(x + largx / 3 + largx / 3, y - 5, 2, hauty + 10);
    context.translate(-0.5, -0.5);
    context.strokeRect(x + largx / 3 + largx / 3, y - 5, 2, hauty + 10);
    context.translate(0.5, 0.5);

    dessinerBalPassCommun(x, y, largx, hauty);

    // tiges metal de jonction
    context.fillRect(x + largx / 3, y, 1, hauty);
    context.fillRect(x + largx / 3 + largx / 3, y, 1, hauty);
    // ralentisseurs descente
    context.fillStyle = COLOR_2b;
    context.fillRect(x + 5, y, 1, hauty);
    context.fillRect(x + 10, y, 1, hauty);
    context.fillRect(x + largx - 5, y, 1, hauty);
    context.fillRect(x + largx - 10, y, 1, hauty);
    context.fillStyle = COLOR_1b;
    context.fillRect(x + 20, y, 1, hauty);
    context.fillRect(x + 25, y, 1, hauty);
    context.fillRect(x + 30, y, 1, hauty);
    context.fillRect(x + 35, y, 1, hauty);
    context.fillRect(x + 40, y, 1, hauty);
    context.fillRect(x + 45, y, 1, hauty);
    context.fillRect(x + 50, y, 1, hauty);
    context.fillRect(x + 55, y, 1, hauty);
    context.fillRect(x + 60, y, 1, hauty);
    context.fillRect(x + largx - 20, y, 1, hauty);
    context.fillRect(x + largx - 25, y, 1, hauty);
    context.fillRect(x + largx - 30, y, 1, hauty);
    context.fillRect(x + largx - 35, y, 1, hauty);
    context.fillRect(x + largx - 40, y, 1, hauty);
    context.fillRect(x + largx - 45, y, 1, hauty);
    context.fillRect(x + largx - 50, y, 1, hauty);
    context.fillRect(x + largx - 55, y, 1, hauty);
    context.fillRect(x + largx - 60, y, 1, hauty);
}

function dessinerBalance(x, y, largx, hauty) {
    context.fillStyle = COLOR_JOINTURES;
    context.fillRect(x + largx / 2, y - 5, 2, hauty + 10);
    context.fillStyle = COLOR_CONTOURS;
    context.strokeRect(x + largx / 2, y - 5, 2, hauty + 10);
    dessinerBalPassCommun(x, y, largx, hauty);
}

function dessinerBalPassCommun(x, y, largx, hauty) {
    // planche principale
    context.fillStyle = COLOR_2;
    context.strokeRect(x, y, 15, hauty);
    context.fillRect(x, y, 15, hauty);
    context.fillStyle = COLOR_1;
    context.strokeRect(x + 15, y, largx - 30, hauty);
    context.fillRect(x + 15, y, largx - 30, hauty);
    context.fillStyle = COLOR_2;
    context.strokeRect(x + largx - 15, y, 15, hauty);
    context.fillRect(x + largx - 15, y, 15, hauty);
    context.fillStyle = COLOR_JOINTURES;
}

function dessinerHaie(x, y, largx) {
    context.fillStyle = COLOR_2;

    rectBump(x + 10, y, largx - 20, DIAM_BARRE); //barre

    context.fillStyle = COLOR_3;
    rectBump(x + 18, y, largx - 36, DIAM_BARRE); //barre

    context.fillStyle = COLOR_1;
    rectBump(x, y, 10, DIAM_BARRE); //montants

    rectBump(x + largx - 10, y, 10, DIAM_BARRE);
    rectBump(x + largx - 11, y - 3, 1, 9);
    rectBump(x + 10, y - 3, 1, 9);
}

function dessinerOxer(x, y, largx) {
    dessinerHaie(x, y, largx);

    context.fillStyle = COLOR_2;

    rectBump(x + 1 + 10, y + 55 / pixel, largx - 20 - 2, DIAM_BARRE); //barre

    context.fillStyle = COLOR_3;
    rectBump(x + 1 + 18 - 1, y + 55 / pixel, largx - 36, DIAM_BARRE); //barre

    context.fillStyle = COLOR_1;
    rectBump(x + 1, y + 55 / pixel, 10, DIAM_BARRE); //montants

    rectBump(x + 1 + largx - 10 - 2, y + 55 / pixel, 10, DIAM_BARRE);
    rectBump(x + 1 + largx - 11 - 2, y - 3 + 55 / pixel, 1, 9);
    rectBump(x + 1 + 10, y - 3 + 55 / pixel, 1, 9);
}

function dessinerConducteur(x, y, largx, hauty, sens) {
    var scalePersonnage = 2;

    modifx = x + largx / 2 - 6;
    modify = y + hauty / 2 - 8;

    //corps
    context.fillStyle = COLOR_VETEMENTS;
    context.beginPath();
    context.moveTo(modifx + 0.77, modify + 3.08);
    context.lineTo(modifx + 11.54, modify + 3.08);
    if (sens == "d") {
        context.lineTo(modifx + 13.08, modify + 1.54);
        context.lineTo(modifx + 16.15, modify - 3.08);
        context.lineTo(modifx + 17.69, modify - 2.31);
        context.lineTo(modifx + 16.15, modify + 1.54);
        context.lineTo(modifx + 14.62, modify + 5.38);
    } else if (sens == "dL") {
        context.lineTo(modifx + 12.31, modify + 0.77);
        context.lineTo(modifx + 12.31, modify - 3.85);
        context.lineTo(modifx + 13.85, modify - 3.85);
        context.lineTo(modifx + 14.62, modify + 0.77);
        context.lineTo(modifx + 14.62, modify + 5.38);
    } else if (sens == "dC") {
        context.lineTo(modifx + 16.15, modify + 2.31);
        context.lineTo(modifx + 20, modify - 0.77);
        context.lineTo(modifx + 20.77, modify + 1.54);
        context.lineTo(modifx + 16.92, modify + 5.38);
    } else {
        context.lineTo(modifx + 14.62, modify + 5.38);
    }
    context.lineTo(modifx + 13.85, modify + 6.92);
    context.lineTo(modifx + 11.54, modify + 8.46);
    context.lineTo(modifx + 0.77, modify + 8.46);
    context.lineTo(modifx - 1.54, modify + 6.92);
    if (sens == "g") {
        context.lineTo(modifx - 2.31, modify + 5.38);
        context.lineTo(modifx - 3.85, modify + 1.54);
        context.lineTo(modifx - 5.38, modify - 2.31);
        context.lineTo(modifx - 3.85, modify - 3.08);
        context.lineTo(modifx - 0.77, modify + 1.54);
    } else if (sens == "gL") {
        context.lineTo(modifx - 2.31, modify + 5.38);
        context.lineTo(modifx - 2.31, modify + 0.77);
        context.lineTo(modifx - 1.54, modify - 3.85);
        context.lineTo(modifx + 0, modify - 3.85);
        context.lineTo(modifx + 0, modify + 0.77);
    } else if (sens == "gC") {
        context.lineTo(modifx - 4.62, modify + 5.38);
        context.lineTo(modifx - 9.23, modify + 1.54);
        context.lineTo(modifx - 7.69, modify - 0.77);
        context.lineTo(modifx - 3.85, modify + 2.31);
    } else {
        context.lineTo(modifx - 2.31, modify + 5.38);
    }
    context.lineTo(modifx + 0.77, modify + 3.08);
    context.fill();
    context.stroke();

    // MAINS
    //main droite
    context.fillStyle = COLOR_PEAU;
    if (sens == "d") {
        //main
        context.fillStyle = "#ffff88";
        context.beginPath();
        context.arc(modifx + 16.92, modify - 3.08, 1.3, 0, 2 * Math.PI); //point d'encrage

        context.fill();
        context.stroke();
    } else if (sens == "dL") {
        context.fillStyle = "#ffff88";
        context.beginPath();
        context.arc(modifx + 13.08, modify - 4.62, 1.3, 0, 2 * Math.PI); //point d'encrage

        context.fill();
        context.stroke();
    } else if (sens == "dC") {
        context.fillStyle = "#ffff88";
        context.beginPath();
        context.arc(modifx + 20.77, modify, 1.3, 0, 2 * Math.PI); //point d'encrage
        context.fill();
        context.stroke();
    }

    // main gauche
    if (sens == "g") {
        //main
        context.beginPath();
        context.arc(modifx - 4.62, modify - 3.08, 1.3, 0, 2 * Math.PI); //point d'encrage
        context.fill();
        context.stroke();
    } else if (sens == "gL") {
        context.beginPath();
        context.arc(modifx - 0.77, modify - 4.62, 1.3, 0, 2 * Math.PI); //point d'encrage
        context.fill();
        context.stroke();
    } else if (sens == "gC") {
        context.beginPath();
        context.arc(modifx - 9.23, modify, 1.3, 0, 2 * Math.PI); //point d'encrage
        context.fill();
        context.stroke();
    }
    //TETE
    //cheveux
    context.fillStyle = COLOR_CHEVEUX;
    context.beginPath();
    context.moveTo(modifx + 3.08, modify + 4.62);
    context.lineTo(modifx + 3.85, modify + 3.08);
    context.lineTo(modifx + 4.62, modify + 3.85);
    context.lineTo(modifx + 7.69, modify + 3.85);
    context.lineTo(modifx + 8.46, modify + 3.08);
    context.lineTo(modifx + 9.23, modify + 4.62);
    context.lineTo(modifx + 8.46, modify + 6.92);
    context.lineTo(modifx + 6.92, modify + 7.69);
    context.lineTo(modifx + 5.38, modify + 7.69);
    context.lineTo(modifx + 3.85, modify + 6.92);
    context.lineTo(modifx + 3.08, modify + 4.62);
    context.fill();
    context.stroke();
    //visage
    context.fillStyle = COLOR_PEAU;
    context.beginPath();
    context.moveTo(modifx + 3.85, modify + 3.08);
    context.lineTo(modifx + 4.62, modify + 3.85);
    context.lineTo(modifx + 7.69, modify + 3.85);
    context.lineTo(modifx + 8.46, modify + 3.08);
    context.lineTo(modifx + 7.69, modify + 2.31);
    context.lineTo(modifx + 6.92, modify + 2.31);
    context.lineTo(modifx + 6.15, modify + 1.54);
    context.lineTo(modifx + 5.38, modify + 2.31);
    context.lineTo(modifx + 4.62, modify + 2.31);
    context.lineTo(modifx + 3.85, modify + 3.08);
    context.fill();
    context.stroke();
}

function dessinerChien(x, y, largx, hauty, sens) {
    modifx = x + largx / 2 - 3;
    modify = y + hauty / 2 - 10;

    //corps
    context.fillStyle = "grey";
    context.strokeStyle = "black";
    context.beginPath();
    context.moveTo(modifx + 2.8, modify + 0);
    context.lineTo(modifx + 1.8, modify + 1.4);
    context.lineTo(modifx + 1.4, modify + 3);
    context.lineTo(modifx + 0.4, modify + 4.4);
    context.lineTo(modifx + 1.6, modify + 4.4);
    context.lineTo(modifx + 1.6, modify + 5.2);
    context.lineTo(modifx + 0.2, modify + 6.4);
    context.lineTo(modifx + 0, modify + 9);
    context.lineTo(modifx + 0.2, modify + 11.2);
    context.lineTo(modifx + 0.6, modify + 11.4);
    context.lineTo(modifx + 0.6, modify + 14.8);
    context.lineTo(modifx + 0.2, modify + 15.2);
    context.lineTo(modifx + 0.2, modify + 17);
    context.lineTo(modifx + 2.6, modify + 20);
    context.lineTo(modifx + 2.6, modify + 22);
    context.lineTo(modifx + 2.8, modify + 22.6);
    context.lineTo(modifx + 3, modify + 22);
    context.lineTo(modifx + 3, modify + 20);
    context.lineTo(modifx + 5.4, modify + 17);
    context.lineTo(modifx + 5.4, modify + 15.2);
    context.lineTo(modifx + 5, modify + 14.8);
    context.lineTo(modifx + 5, modify + 11.4);
    context.lineTo(modifx + 5.4, modify + 11.2);
    context.lineTo(modifx + 5.6, modify + 9);
    context.lineTo(modifx + 5.4, modify + 6.4);
    context.lineTo(modifx + 4, modify + 5.2);
    context.lineTo(modifx + 4, modify + 4.4);
    context.lineTo(modifx + 5.2, modify + 4.4);
    context.lineTo(modifx + 4.2, modify + 3);
    context.lineTo(modifx + 3.8, modify + 1.4);
    context.lineTo(modifx + 2.8, modify + 0);

    context.fill();
    context.stroke();
}

function dessinerOverObstacle(x, y, largx, hauty, angle, i) {
    xRotateGauche =
        (Math.round(Math.cos(toDegrees(angle)) * 100) / 100) *
            ((largx + ROTATE_MARGE_SELECTION) / 2) +
        x +
        largx / 2;
    yRotateGauche =
        (Math.round(Math.sin(toDegrees(angle)) * 100) / 100) *
            ((largx + ROTATE_MARGE_SELECTION) / 2) +
        y +
        hauty / 2;
    xRotateDroit =
        x +
        largx / 2 -
        (Math.round(Math.cos(toDegrees(angle)) * 100) / 100) *
            ((largx + ROTATE_MARGE_SELECTION) / 2);
    yRotateDroit =
        y +
        hauty / 2 -
        (Math.round(Math.sin(toDegrees(angle)) * 100) / 100) *
            ((largx + ROTATE_MARGE_SELECTION) / 2);

    context.save();
    context.translate(xRotateGauche, yRotateGauche); //translate to center of shape
    context.rotate((Math.PI / 180) * (getAngle(i) + 90)); //rotate 25 degrees
    context.translate(-xRotateGauche, -yRotateGauche); //translate center back to 0,0

    // CERCLE 1
    context.beginPath();
    context.arc(xRotateGauche, yRotateGauche, 6, 0, 2 * Math.PI);
    context.closePath();
    context.stroke();
    context.fillStyle = "#ccc"; //jaune
    context.fill();
    // FLECHE 1
    context.beginPath();
    context.moveTo(xRotateGauche + 1, yRotateGauche + 4);
    context.lineTo(xRotateGauche + 5, yRotateGauche);
    context.lineTo(xRotateGauche + 1, yRotateGauche - 4);
    context.closePath();
    context.stroke();
    context.fillStyle = "#fff"; //jaune
    context.fill();
    // FLECHE 2
    context.beginPath();
    context.moveTo(xRotateGauche - 1, yRotateGauche + 4);
    context.lineTo(xRotateGauche - 5, yRotateGauche);
    context.lineTo(xRotateGauche - 1, yRotateGauche - 4);
    context.closePath();
    context.stroke();
    context.fillStyle = "#fff"; //jaune
    context.fill();

    context.restore();

    context.save();
    context.translate(xRotateDroit, yRotateDroit); //translate to center of shape
    context.rotate((Math.PI / 180) * (getAngle(i) - 90)); //rotate 25 degrees
    context.translate(-xRotateDroit, -yRotateDroit); //translate center back to 0,0

    // CERCLE 1
    context.beginPath();
    context.arc(xRotateDroit, yRotateDroit, 6, 0, 2 * Math.PI);
    context.closePath();
    context.fillStyle = "#ccc"; //gris

    context.stroke();
    context.fill();
    // FLECHE 1
    context.beginPath();
    context.moveTo(xRotateDroit + 1, yRotateDroit + 4);
    context.lineTo(xRotateDroit + 5, yRotateDroit);
    context.lineTo(xRotateDroit + 1, yRotateDroit - 4);
    context.closePath();
    context.fillStyle = "#fff"; //blanc
    context.stroke();
    context.fill();
    // FLECHE 2
    context.beginPath();
    context.moveTo(xRotateDroit - 1, yRotateDroit + 4);
    context.lineTo(xRotateDroit - 5, yRotateDroit);
    context.lineTo(xRotateDroit - 1, yRotateDroit - 4);
    context.closePath();
    context.stroke();
    context.fillStyle = "#fff"; //blanc
    context.fill();

    context.restore();
}
