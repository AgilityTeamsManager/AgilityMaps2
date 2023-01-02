///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////PASSAGE AU DESSUS DES OBSTACLES////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/*
retourne la marge de tol�rence pour la s�l�ction d'un objet
*/
function setMargeSelect() {
    if (isTactil) {
        DIAM_ROND_SELECTION = 14;
        DIAM_ROND_SELECTION_TUNNEL = 6;
        DIAM_ROND_SELECTION_TUNNEL_MOVE = DIAM_ROND_SELECTION_TUNNEL + 15;
        RECT_MARGE_SELECTION = 25;
        ROTATE_MARGE_SELECTION = 25;
        LARGEUR_NUMERO_SELECT = LARGEUR_NUMERO + RECT_MARGE_SELECTION;
        HAUTEUR_NUMERO_SELECT = HAUTEUR_NUMERO + RECT_MARGE_SELECTION;
    } else {
        DIAM_ROND_SELECTION = 7;
        DIAM_ROND_SELECTION_TUNNEL = 3;
        DIAM_ROND_SELECTION_TUNNEL_MOVE = DIAM_ROND_SELECTION_TUNNEL + 10;
        RECT_MARGE_SELECTION = 15;
        ROTATE_MARGE_SELECTION = 0;
        LARGEUR_NUMERO_SELECT = LARGEUR_NUMERO;
        HAUTEUR_NUMERO_SELECT = HAUTEUR_NUMERO;
    }
}

function overObstacle(posX, posY) {
    var x;
    var y;
    var xlarg;
    var ylarg;
    var angle;
    var xRotateGauche;
    var xRotateDroit;
    var yRotateGauche;
    var yRotateDroit;
    for (var i = 0; i < id; i++) {
        x = getCanvasX(i);
        y = getCanvasY(i);
        xlarg = getXCliquable(i) + RECT_MARGE_SELECTION;
        ylarg = getYCliquable(i) + RECT_MARGE_SELECTION;
        angle = getAngle(i);
        if (
            checkPointInRect(
                x + xlarg / 2,
                y + ylarg / 2 - RECT_MARGE_SELECTION / 2,
                xlarg,
                ylarg,
                angle,
                posX,
                posY
            )
        ) {
            overObject = i;
            decalX = posX - x;
            decalY = posY - y;
            if (!suppression) {
                document.body.style.cursor = "move";
            }
        }
    }
}
function overTunnel(posX, posY) {
    moveTunnelComplet = -1;
    for (var j = 0; j < idTunnel; j++) {
        //D�placement d'un point du tunnel
        for (var art = 0; art < nbArticulationTunnel; art++) {
            if (
                posX > tbTunnels[j][art * 2 + 1] - DIAM_ROND_SELECTION_TUNNEL &&
                posX < tbTunnels[j][art * 2 + 1] + DIAM_ROND_SELECTION_TUNNEL &&
                posY > tbTunnels[j][art * 2 + 2] - DIAM_ROND_SELECTION_TUNNEL &&
                posY < tbTunnels[j][art * 2 + 2] + DIAM_ROND_SELECTION_TUNNEL
            ) {
                decalX = posX - tbTunnels[j][art * 2 + 1];
                decalY = posY - tbTunnels[j][art * 2 + 2];
                overTunnelId = j;
                overPointTunnel = art;
                if (!suppression) {
                    document.body.style.cursor = "pointer";
                }
            }
        }
        // d�placement du tunnel complet
        if (overPointTunnel == -1) {
            for (var art = 0; art < nbArticulationTunnel; art++) {
                if (
                    posX >
                        tbTunnels[j][art * 2 + 1] -
                            DIAM_ROND_SELECTION_TUNNEL_MOVE &&
                    posX <
                        tbTunnels[j][art * 2 + 1] +
                            DIAM_ROND_SELECTION_TUNNEL_MOVE &&
                    posY >
                        tbTunnels[j][art * 2 + 2] -
                            DIAM_ROND_SELECTION_TUNNEL_MOVE &&
                    posY <
                        tbTunnels[j][art * 2 + 2] +
                            DIAM_ROND_SELECTION_TUNNEL_MOVE
                ) {
                    decalX = posX - tbTunnels[j][1];
                    decalY = posY - tbTunnels[j][2];
                    overTunnelComplet = j;
                    if (!suppression) {
                        document.body.style.cursor = "move";
                    }
                }
            }
        }
    }
}
// permet de d�finir quel objet est sous la souris
function overRotate(posX, posY) {
    var x;
    var y;
    var xlarg;
    var ylarg;
    var angle;
    var xRotateGauche;
    var xRotateDroit;
    var yRotateGauche;
    var yRotateDroit;
    rotate = false;
    for (var i = 0; i < id; i++) {
        x = getCanvasX(i);
        y = getCanvasY(i);
        xlarg = getXCliquable(i);
        ylarg = getYCliquable(i);
        angle = getAngle(i);

        // bouton des cot�s pour rotation

        xRotateGauche =
            (Math.round(Math.cos(toDegrees(angle)) * 100) / 100) *
                ((xlarg + ROTATE_MARGE_SELECTION) / 2) +
            x +
            xlarg / 2;
        yRotateGauche =
            (Math.round(Math.sin(toDegrees(angle)) * 100) / 100) *
                ((xlarg + ROTATE_MARGE_SELECTION) / 2) +
            y +
            ylarg / 2;
        if (
            posX > xRotateGauche - DIAM_ROND_SELECTION &&
            posX < xRotateGauche + DIAM_ROND_SELECTION &&
            posY > yRotateGauche - DIAM_ROND_SELECTION &&
            posY < yRotateGauche + DIAM_ROND_SELECTION
        ) {
            //selObst=i;
            overObject = i;
            decalX = posX - x;
            decalY = posY - y;
            rotate = true;
            rotateCote = "gauche";
        }
        xRotateDroit =
            x +
            xlarg / 2 -
            (Math.round(Math.cos(toDegrees(angle)) * 100) / 100) *
                ((xlarg + ROTATE_MARGE_SELECTION) / 2);
        yRotateDroit =
            y +
            ylarg / 2 -
            (Math.round(Math.sin(toDegrees(angle)) * 100) / 100) *
                ((xlarg + ROTATE_MARGE_SELECTION) / 2);
        if (
            posX > xRotateDroit - DIAM_ROND_SELECTION &&
            posX < xRotateDroit + DIAM_ROND_SELECTION &&
            posY > yRotateDroit - DIAM_ROND_SELECTION &&
            posY < yRotateDroit + DIAM_ROND_SELECTION
        ) {
            //selObst=i;
            overObject = i;
            decalX = posX - x;
            decalY = posY - y;
            rotate = true;
            rotateCote = "droit";
        }

        if (rotate) {
            if (!suppression) {
                document.body.style.cursor = "pointer";
            }
        }
    }
}
function checkPointInRect(
    rectCentreX,
    rectCentreY,
    rectWidth,
    rectHeight,
    rot,
    px,
    py
) {
    // rotation in radians, because flash likes to be a pain and use them instead.
    var rotRad = (Math.PI * rot) / 180;
    var dx = px - rectCentreX;
    var dy = py - rectCentreY;
    // distance between point and centre of rectangle.
    var h1 = Math.sqrt(dx * dx + dy * dy);
    var currA = Math.atan2(dy, dx);
    // angle of point rotated by the rectangle amount around the centre of rectangle.
    var newA = currA - rotRad;
    // x2 and y2 are the new positions of the point when rotated to offset the rectangles orientation.
    var x2 = Math.cos(newA) * h1;
    var y2 = Math.sin(newA) * h1;
    // the above points are relative to the centre of the rectangle, so the check is simple.

    if (
        x2 > -0.5 * rectWidth &&
        x2 < 0.5 * rectWidth &&
        y2 > -0.5 * rectHeight &&
        y2 < 0.5 * rectHeight
    ) {
        return true;
    }

    return false;
}

function overNumero(x, y) {
    overNumeroId = -1;
    for (var i = 1; i < nextNumber; i++) {
        if (
            checkPointInRect(
                listeNumero[i][1] + 7 - LARGEUR_NUMERO / 2,
                listeNumero[i][2] + 6 - HAUTEUR_NUMERO / 2,
                LARGEUR_NUMERO_SELECT,
                HAUTEUR_NUMERO_SELECT,
                0,
                x,
                y
            )
        ) {
            overNumeroId = i;
            if (!suppression) {
                document.body.style.cursor = "move";
            }
            decalX = x - listeNumero[i][1];
            decalY = y - listeNumero[i][2];
        }
    }
}
function overNumero2(x, y) {
    overNumeroId2 = -1;
    for (var i = 1; i < nextNumber2; i++) {
        if (
            checkPointInRect(
                listeNumero2[i][1] + 7 - LARGEUR_NUMERO / 2,
                listeNumero2[i][2] + 6 - HAUTEUR_NUMERO / 2,
                LARGEUR_NUMERO_SELECT,
                HAUTEUR_NUMERO_SELECT,
                0,
                x,
                y
            )
        ) {
            overNumeroId2 = i;
            if (!suppression) {
                document.body.style.cursor = "move";
            }
            decalX = x - listeNumero2[i][1];
            decalY = y - listeNumero2[i][2];
        }
    }
}
function overNumero3(x, y) {
    overNumeroId3 = -1;
    for (var i = 1; i < nextNumber3; i++) {
        if (
            checkPointInRect(
                listeNumero3[i][1] + 7 - LARGEUR_NUMERO / 2,
                listeNumero3[i][2] + 6 - HAUTEUR_NUMERO / 2,
                LARGEUR_NUMERO_SELECT,
                HAUTEUR_NUMERO_SELECT,
                0,
                x,
                y
            )
        ) {
            overNumeroId3 = i;
            if (!suppression) {
                document.body.style.cursor = "move";
            }
            decalX = x - listeNumero3[i][1];
            decalY = y - listeNumero3[i][2];
        }
    }
}
function overModifTraj(x, y) {
    for (var i = 1; i < nextNumber; i++) {
        var xDep = ordreObst[i][3];
        var yDep = ordreObst[i][4];
        var xArr = ordreObst[i][5];
        var yArr = ordreObst[i][6];
        if (checkPointInRect(xDep, yDep, 8, 8, 0, x, y)) {
            if (!suppression) {
                document.body.style.cursor = "pointer";
                overModifTrajId = i;
                overModifTrajDepArr = "dep";
                decalX = x - xDep;
                decalY = y - yDep;
            }
        }
        if (checkPointInRect(xArr, yArr, 8, 8, 0, x, y)) {
            if (!suppression) {
                document.body.style.cursor = "pointer";
                overModifTrajId = i;
                overModifTrajDepArr = "arr";
                decalX = x - xArr;
                decalY = y - yArr;
            }
        }
    }
}
