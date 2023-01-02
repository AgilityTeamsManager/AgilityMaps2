//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////LISTENER D EVENEMENTS/////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

function doTouchStart(event) {
    isTactil = true;
    setMargeSelect();

    //document.getElementById('outils').style.overflow="scroll";
    //document.getElementById('trajMaitre').style.overflow="scroll";
    window.removeEventListener("mousemove", doMouseMove, false);
    window.removeEventListener("mouseup", doMouseUp, false);
    canvas.removeEventListener("mousedown", doMouseDown, false);
    canvas.addEventListener("touchmove", doTouchMove, false);
    canvas.addEventListener("touchend", doTouchEnd, false);
    canvas.addEventListener("touchleave", doTouchEnd, false);
    canvas.addEventListener("touchcancel", doTouchEnd, false);

    //event.preventDefault();

    doTouchMove(event);

    doMouseDown(event);
}
function doTouchEnd(event) {
    //event.preventDefault();
    doMouseUp(event);
    doTouchMove(event);
}
function doTouchMove(event) {
    var touches = event.changedTouches;
    oldx = canvas_x;
    canvas_x = touches[0].pageX - DECAL_X_INTERFACE;
    canvas_x = canvas_x / scale;

    diffx = oldx - canvas_x;
    if (canvas_x > canvasSizeX - MARGE) {
        canvas_x = canvasSizeX - MARGE;
    } else if (canvas_x < MARGE) {
        canvas_x = MARGE;
    }
    oldy = canvas_y;
    canvas_y = touches[0].pageY - DECAL_Y_INTERFACE;
    canvas_y = canvas_y / scale;
    diffy = oldy - canvas_y;
    if (canvas_y > canvasSizeY - MARGE * 2) {
        canvas_y = canvasSizeY - MARGE * 2;
    } else if (canvas_y < MARGE) {
        canvas_y = MARGE;
    }
    doMove();

    if (isOverObstacle()) {
        log("over obstacle");
        event.preventDefault();
    } else {
        log("not over obstacle");
    }
}
function isOverObstacle() {
    if (
        overObject == -1 &&
        overTunnelId == -1 &&
        overPointTunnel == -1 &&
        overTunnelComplet == -1 &&
        overModifTrajId == -1 &&
        overModifTrajDepArr == -1 &&
        overNumeroId == -1 &&
        overNumeroId2 == -1 &&
        overNumeroId3 == -1 &&
        overObject == -1
    ) {
        return false;
    }
    return true;
}
function doMouseDown(event) {
    window.addEventListener("mouseup", doMouseUp, false);
    canvas.removeEventListener("mousedown", doMouseDown, false);
    if (suppression == true) {
        if (overNumeroId != -1) {
            listeNumero[overNumeroId] = "";
        } else if (overNumeroId2 != -1) {
            listeNumero2[overNumeroId2] = "";
        } else if (overNumeroId3 != -1) {
            listeNumero3[overNumeroId3] = "";
        } else if (overTunnelId != -1) {
            tbTunnels[overTunnelId] = "";
        } else if (overTunnelComplet != -1) {
            tbTunnels[overTunnelComplet] = "";
        } else if (overObject != -1) {
            tbObst[overObject] = "";
        }
    } else if (overNumeroId != -1) {
        selNumeroId = overNumeroId;
    } else if (overNumeroId2 != -1) {
        selNumeroId2 = overNumeroId2;
    } else if (overNumeroId3 != -1) {
        selNumeroId3 = overNumeroId3;
    } else if (overModifTrajId != -1) {
        modifTrajId = overModifTrajId;
        modifTrajDepArr = overModifTrajDepArr;
    } else if (overTunnelId != -1) {
        selTunnel = overTunnelId;
        selPointTunnel = overPointTunnel;
    } else if (overTunnelComplet != -1) {
        selTunnelComplet = overTunnelComplet;
    } else if (overObject != -1) {
        selObst = overObject;
        setCanvasX(selObst, canvas_x - decalX);
        setCanvasY(selObst, canvas_y - decalY);
        genererParcours();
    }
}
function doMouseUp(event) {
    //window.removeEventListener("mousemove", doMouseMove, false);
    window.removeEventListener("mouseup", doMouseUp, false);
    canvas.addEventListener("mousedown", doMouseDown, false);
    selObst = -1;
    selTunnel = -1;
    selPointTunnel = -1;
    selTunnelComplet = -1;
    rotate = false;
    moveTunnelComplet = -1;
    selNumeroId = -1;
    selNumeroId2 = -1;
    selNumeroId3 = -1;
    modifTrajId = -1;
    modifTrajDepArr = -1;
    genererParcours();
}
function doMouseMove(event) {
    oldx = canvas_x;
    canvas_x = event.pageX - DECAL_X_INTERFACE;
    canvas_x = canvas_x / scale;

    diffx = oldx - canvas_x;
    if (canvas_x > canvasSizeX - MARGE) {
        canvas_x = canvasSizeX - MARGE;
    } else if (canvas_x < MARGE) {
        canvas_x = MARGE;
    }
    oldy = canvas_y;
    canvas_y = event.pageY - DECAL_Y_INTERFACE;
    canvas_y = canvas_y / scale;
    diffy = oldy - canvas_y;
    if (canvas_y > canvasSizeY - MARGE * 2) {
        canvas_y = canvasSizeY - MARGE * 2;
    } else if (canvas_y < MARGE) {
        canvas_y = MARGE;
    }
    doMove();
}
///////////////////////////////////////////////////////////////////////MOUVEMENT///////////////////////////////////////////////////////////
function rchObstacleProche(xProche, yProche, numero) {
    var idPlusProche = 0;
    var xPlusProche = 1000;
    var yPlusProche = 1000;
    var distanceHypoPlusProche = 1000;
    var sens = 1;
    var type = "classique";
    for (var i = 0; i < id; i++) {
        var x = getCanvasX(i);
        var y = getCanvasY(i);
        var nom = getSens(i);
        var largx = getXCliquable(i);
        var hauty = getYCliquable(i);
        var angle = getAngle(i);
        var type = "classique";
        var modifXDep = getModXTrajEntree(i);
        var modifYDep = getModYTrajEntree(i);
        var modifXArr = getModXTrajSortie(i);
        var modifYArr = getModYTrajSortie(i);
        var angleSens2 = getAngleTrajSortie(i);
        var longTraj = getDistTrajCentre(i);
        var distanceSup = 3;
        var departX =
            x +
            modifXDep / 2 +
            Math.cos(((angle + angleSens2) / 180) * Math.PI) *
                (longTraj / 2 + distanceSup);
        var departY =
            y +
            modifYDep / 2 +
            Math.sin(((angle + angleSens2) / 180) * Math.PI) *
                (longTraj / 2 + distanceSup);

        var xDist = Math.abs(departX - xProche);
        var yDist = Math.abs(departY - yProche);
        var distanceHypo = Math.sqrt(Math.pow(xDist, 2) + Math.pow(yDist, 2));

        if (distanceHypo < distanceHypoPlusProche) {
            idPlusProche = i;
            xPlusProche = xDist;
            yPlusProche = yDist;
            distanceHypoPlusProche = distanceHypo;
            sens = 1;
            xpp = departX;
            ypp = departY;
            type = "classique";
        }

        var arriveX =
            x +
            modifXArr / 2 +
            Math.cos(((angle + angleSens2) / 180) * Math.PI) *
                (-longTraj / 2 - distanceSup);
        var arriveY =
            y +
            modifYArr / 2 +
            Math.sin(((angle + angleSens2) / 180) * Math.PI) *
                (-longTraj / 2 - distanceSup);

        var xDistArr = Math.abs(arriveX - xProche);
        var yDistArr = Math.abs(arriveY - yProche);
        var distanceHypoFin = Math.sqrt(
            Math.pow(xDistArr, 2) + Math.pow(yDistArr, 2)
        );

        if (distanceHypoFin < distanceHypoPlusProche) {
            idPlusProche = i;
            xPlusProche = xDistArr;
            yPlusProche = yDistArr;
            distanceHypoPlusProche = distanceHypoFin;
            sens = 0;
            xpp = arriveX;
            ypp = arriveY;
            type = "classique";
        }
    }
    for (var j = 0; j < idTunnel; j++) {
        var xTun = tbTunnels[j][1];
        var yTun = tbTunnels[j][2];
        var xTunFin = tbTunnels[j][(nbArticulationTunnel - 1) * 2 + 1];
        var yTunFin = tbTunnels[j][(nbArticulationTunnel - 1) * 2 + 2];
        //var x2Tun=tbTunnels[j][3];// pour le premier angle
        //var y2Tun=tbTunnels[j][4];// pour le premier angle

        var largXTun = 0;
        var largYTun = 0;
        var angleTun = 90;
        var modifXDepTun = 0;
        var modifYDepTun = 0;
        var modifXArrTun = 0;
        var modifYArrTun = 0;

        //var distXTun = xTun - x2Tun;
        //var distYTun = yTun - y2Tun;
        //var modifAngleArrTun = Math.atan2(distYTun,distXTun)/Math.PI*180-90;
        var longTrajTun = 0;

        var xDist = Math.abs(xProche - xTun);
        var yDist = Math.abs(yProche - yTun);
        var distanceHypo = Math.sqrt(Math.pow(xDist, 2) + Math.pow(yDist, 2));
        if (distanceHypo < distanceHypoPlusProche) {
            idPlusProche = j;
            xPlusProche = xDist;
            yPlusProche = yDist;
            distanceHypoPlusProche = distanceHypo;
            sens = 1;
            xpp = xTun;
            ypp = yTun;
            type = "tunnel";
        }
        var xDistFin = Math.abs(xProche - xTunFin);
        var yDistFin = Math.abs(yProche - yTunFin);
        var distanceHypoFin = Math.sqrt(
            Math.pow(xDistFin, 2) + Math.pow(yDistFin, 2)
        );

        if (distanceHypoFin < distanceHypoPlusProche) {
            idPlusProche = j;
            xPlusProche = xDistFin;
            yPlusProche = yDistFin;
            distanceHypoPlusProche = distanceHypoFin;
            sens = 0;
            xpp = xTunFin;
            ypp = yTunFin;
            type = "tunnel";
        }
    }
    xp = xProche;
    yp = yProche;
    var ordreObstacle = new Array();
    ordreObstacle[0] = idPlusProche;
    ordreObstacle[1] = type; //type
    var xNumProche;
    var yNumProche;
    var angleProche;
    var modXProche;
    var modYProche;
    if (ordreObst[numero] != null && ordreObst[numero][0] == idPlusProche) {
        if (type == "tunnel") {
            ordreObstacle[7] = 90;
            ordreObstacle[8] = 50;
            ordreObstacle[9] = 90;
            ordreObstacle[10] = 50;
            xNumProche = 0;
            yNumProche = 0;
            modXProche = 0;
            modYProche = 0;
            angleProche = 0;
        } else if (ordreObst[numero][1] == "tunnel") {
            xNumProche = getCanvasX(idPlusProche);
            yNumProche = getCanvasY(idPlusProche);
            ordreObstacle[7] = getAngleTrajSortie(idPlusProche);
            ordreObstacle[8] = getLongTraj(idPlusProche);
            ordreObstacle[9] = getAngleTrajSortie(idPlusProche);
            ordreObstacle[10] = getLongTraj(idPlusProche);
            modXProche = getModXTrajSortie(idPlusProche);
            modYProche = getModYTrajSortie(idPlusProche);
            angleProche = getAngle(idPlusProche);
        } else {
            if (ordreObst[numero][2] != sens) {
                xNumProche = getCanvasX(idPlusProche);
                yNumProche = getCanvasY(idPlusProche);
                ordreObstacle[7] = getAngleTrajSortie(idPlusProche);
                ordreObstacle[8] = getLongTraj(idPlusProche);
                ordreObstacle[9] = getAngleTrajSortie(idPlusProche);
                ordreObstacle[10] = getLongTraj(idPlusProche);
                modXProche = getModXTrajSortie(idPlusProche);
                modYProche = getModYTrajSortie(idPlusProche);
                angleProche = getAngle(idPlusProche);
            } else {
                xNumProche = getCanvasX(idPlusProche);
                yNumProche = getCanvasY(idPlusProche);
                ordreObstacle[7] = ordreObst[numero][7];
                ordreObstacle[8] = ordreObst[numero][8];
                ordreObstacle[9] = ordreObst[numero][9];
                ordreObstacle[10] = ordreObst[numero][10];
                modXProche = getModXTrajSortie(idPlusProche);
                modYProche = getModYTrajSortie(idPlusProche);
                angleProche = getAngle(idPlusProche);
                //log(ordreObstacle[7]+"_"+ordreObstacle[8]+"_"+ordreObstacle[9]+"_"+ordreObstacle[10]);
            }
        }
    } else {
        if (type == "tunnel") {
            ordreObstacle[7] = 90;
            ordreObstacle[8] = 50;
            ordreObstacle[9] = 90;
            ordreObstacle[10] = 50;
            xNumProche = 0;
            yNumProche = 0;
            modXProche = 0;
            modYProche = 0;
            angleProche = 0;
        } else {
            ordreObstacle[7] = getAngleTrajSortie(idPlusProche);
            ordreObstacle[8] = getLongTraj(idPlusProche);
            ordreObstacle[9] = getAngleTrajSortie(idPlusProche);
            ordreObstacle[10] = getLongTraj(idPlusProche);
            xNumProche = getCanvasX(idPlusProche);
            yNumProche = getCanvasY(idPlusProche);
            modXProche = getModXTrajSortie(idPlusProche);
            modYProche = getModYTrajSortie(idPlusProche);
            angleProche = getAngle(idPlusProche);
        }
    }

    ordreObstacle[2] = sens; //sens
    var xComp = listeNumero[numero][1] - xNumProche - modXProche / 2;
    var yComp = listeNumero[numero][2] - yNumProche - modYProche / 2;
    //  calcul de l'angle par rapport au centre.

    var dist = Math.sqrt(Math.pow(xComp, 2) + Math.pow(yComp, 2));

    var angleNumero = (Math.atan2(yComp, xComp) / Math.PI) * 180 - angleProche;

    listeNumero[numero][3] = angleNumero;
    listeNumero[numero][4] = dist;

    // calcul de l'angle avec le centre de l'obstacle qui lui est lié

    ordreObst[numero] = ordreObstacle;
}
var xp = 0;
var yp = 0;
var xpp = 0;
var ypp = 0;

var xTst = 0;
var yTst = 0;
var xTst2 = 0;
var yTst2 = 0;
var xTst3 = 0;
var yTst3 = 0;
/*
function afficherTest(){
	context.fillStyle="#ff0000";
	rect(xTst,yTst,1,1);
	//jaune
	context.fillStyle="#ffFF00";
	rect(xTst2,yTst2,1,1);
	context.fillStyle="#00FF00";
	rect(xTst3,yTst3,1,1);
}*/
function recupereListeNumero(id, type) {
    // récupère la liste des numéros qui sont liés à un obstacle.
    for (var i = 1; i < nextNumber; i++) {
        if (ordreObst[i][0] == id && ordreObst[i][1] == type) {
            listeNumero[i][1] = listeNumero[i][1] - diffx;
            listeNumero[i][2] = listeNumero[i][2] - diffy;
        }
    }
}
function recupereListeNumeroAngle(id, type, angle) {
    // déplace le numéro lors d'une rotation
    // récupère la liste des numéros qui sont liés à un obstacle.
    for (var i = 1; i < nextNumber; i++) {
        if (ordreObst[i][0] == id && ordreObst[i][1] == type) {
            if (type == "tunnel") {
            } else {
                //  calcul de l'angle par rapport au centre.

                var distance = listeNumero[i][4];
                var newAngle = getAngle(id) + listeNumero[i][3];
                var newX =
                    getCanvasX(id) +
                    getModXTrajSortie(id) / 2 +
                    Math.cos((newAngle / 180) * Math.PI) * distance;
                var newY =
                    getCanvasY(id) +
                    getModYTrajSortie(id) / 2 +
                    Math.sin((newAngle / 180) * Math.PI) * distance;
                listeNumero[i][1] = newX;
                listeNumero[i][2] = newY;
            }
        }
    }
}
function doMove() {
    if (
        overObject == -1 &&
        selTunnel == -1 &&
        selTunnelComplet == -1 &&
        !suppression &&
        !color &&
        overModifTrajId == -1
    ) {
        document.body.style.cursor = "default";
    } else if (color) {
        document.body.style.cursor = "crosshair";
    }
    if (
        selNumeroId == -1 &&
        selObst == -1 &&
        selTunnel == -1 &&
        selTunnelComplet == -1 &&
        modifTrajId == -1 &&
        selNumeroId2 == -1 &&
        selNumeroId3 == -1
    ) {
        overObject = -1;
        overTunnelId = -1;
        overPointTunnel = -1;
        overTunnelComplet = -1;
        overModifTrajId = -1;
        overModifTrajDepArr = -1;

        overNumero(canvas_x, canvas_y);
        overNumero2(canvas_x, canvas_y);
        overNumero3(canvas_x, canvas_y);
        overObstacle(canvas_x, canvas_y);
        overRotate(canvas_x, canvas_y);
        overTunnel(canvas_x, canvas_y);
        if (document.getElementById("ModifierTrajectoires").checked) {
            overModifTraj(canvas_x, canvas_y);
        }
        genererParcours();
    } else {
        if (modifTrajId != -1) {
            var idObst = ordreObst[modifTrajId][0];
        } else if (selNumeroId != -1) {
            listeNumero[selNumeroId][1] = canvas_x - decalX;
            listeNumero[selNumeroId][2] = canvas_y - decalY;
            if (listeNumero[selNumeroId][1] - LARGEUR_NUMERO / 2 < MARGE) {
                listeNumero[selNumeroId][1] = MARGE + LARGEUR_NUMERO / 2;
            } else if (
                listeNumero[selNumeroId][1] + LARGEUR_NUMERO / 2 >
                canvasSizeX - MARGE
            ) {
                listeNumero[selNumeroId][1] =
                    canvasSizeX - MARGE - LARGEUR_NUMERO / 2;
            }
            if (listeNumero[selNumeroId][2] - HAUTEUR_NUMERO / 2 < MARGE) {
                listeNumero[selNumeroId][2] = MARGE + HAUTEUR_NUMERO / 2;
            } else if (
                listeNumero[selNumeroId][2] + HAUTEUR_NUMERO / 2 >
                canvasSizeY - MARGE * 2
            ) {
                listeNumero[selNumeroId][2] =
                    canvasSizeY - MARGE * 2 - HAUTEUR_NUMERO / 2;
            }
            rchObstacleProche(
                listeNumero[selNumeroId][1],
                listeNumero[selNumeroId][2],
                selNumeroId
            );
            // calcul de l'angle
        } else if (selNumeroId2 != -1) {
            listeNumero2[selNumeroId2][1] = canvas_x - decalX;
            listeNumero2[selNumeroId2][2] = canvas_y - decalY;

            if (listeNumero2[selNumeroId2][1] - LARGEUR_NUMERO / 2 < MARGE) {
                listeNumero2[selNumeroId2][1] = MARGE + LARGEUR_NUMERO / 2;
            } else if (
                listeNumero2[selNumeroId2][1] + LARGEUR_NUMERO / 2 >
                canvasSizeX - MARGE
            ) {
                listeNumero2[selNumeroId2][1] =
                    canvasSizeX - MARGE - LARGEUR_NUMERO / 2;
            }
            if (listeNumero2[selNumeroId2][2] - HAUTEUR_NUMERO / 2 < MARGE) {
                listeNumero2[selNumeroId2][2] = MARGE + HAUTEUR_NUMERO / 2;
            } else if (
                listeNumero2[selNumeroId2][2] + HAUTEUR_NUMERO / 2 >
                canvasSizeY - MARGE * 2
            ) {
                listeNumero2[selNumeroId2][2] =
                    canvasSizeY - MARGE * 2 - HAUTEUR_NUMERO / 2;
            }
        } else if (selNumeroId3 != -1) {
            listeNumero3[selNumeroId3][1] = canvas_x - decalX;
            listeNumero3[selNumeroId3][2] = canvas_y - decalY;
            if (listeNumero3[selNumeroId3][1] - LARGEUR_NUMERO / 2 < MARGE) {
                listeNumero3[selNumeroId3][1] = MARGE + LARGEUR_NUMERO / 2;
            } else if (
                listeNumero3[selNumeroId3][1] + LARGEUR_NUMERO / 2 >
                canvasSizeX - MARGE
            ) {
                listeNumero3[selNumeroId3][1] =
                    canvasSizeX - MARGE - LARGEUR_NUMERO / 2;
            }
            if (listeNumero3[selNumeroId3][2] - HAUTEUR_NUMERO / 2 < MARGE) {
                listeNumero3[selNumeroId3][2] = MARGE + HAUTEUR_NUMERO / 2;
            } else if (
                listeNumero3[selNumeroId3][2] + HAUTEUR_NUMERO / 2 >
                canvasSizeY - MARGE * 2
            ) {
                listeNumero3[selNumeroId3][2] =
                    canvasSizeY - MARGE * 2 - HAUTEUR_NUMERO / 2;
            }
        } else if (selTunnelComplet != -1) {
            //déplace le tunnel complet
            var decallageReelX =
                tbTunnels[selTunnelComplet][1] - canvas_x + decalX;
            var decallageReelY =
                tbTunnels[selTunnelComplet][2] - canvas_y + decalY;
            for (var art = 0; art < nbArticulationTunnel; art++) {
                tbTunnels[selTunnelComplet][art * 2 + 1] =
                    tbTunnels[selTunnelComplet][art * 2 + 1] - decallageReelX;
                tbTunnels[selTunnelComplet][art * 2 + 2] =
                    tbTunnels[selTunnelComplet][art * 2 + 2] - decallageReelY;
            }
            recupereListeNumero(selTunnelComplet, "tunnel");
        } else if (selTunnel != -1) {
            // déplace une articulation
            moveTunnel(selTunnel, selPointTunnel, canvas_x, canvas_y, -1);
            recupereListeNumero(selTunnel, "tunnel");
        } else if (moveTunnelComplet != -1) {
            for (var art = 0; art < nbArticulationTunnel; art++) {
                if (art == 1 || art == 3 || art == 5 || art == 6) {
                    tbObst[selObst][art] = tbObst[selObst][art] + moveTunnelX;
                } else {
                    tbObst[selObst][art] = tbObst[selObst][art] + moveTunnelY;
                }
            }
            recupereListeNumero(moveTunnelComplet, "tunnel");
        } else if (!rotate) {
            setCanvasX(selObst, canvas_x - decalX);
            setCanvasY(selObst, canvas_y - decalY);
            recupereListeNumero(selObst, "classique");
        } else {
            //  calcul de l'angle par rapport au centre.
            var distX =
                canvas_x - getCanvasX(selObst) - getXCliquable(selObst) / 2;
            var distY =
                canvas_y - getCanvasY(selObst) - getYCliquable(selObst) / 2;
            var angle = (Math.atan2(distY, distX) / Math.PI) * 180;
            if (rotateCote == "gauche") {
                setAngle(selObst, angle);
            } else {
                if (angle > 0) {
                    setAngle(selObst, angle - 180);
                } else {
                    setAngle(selObst, angle + 180);
                }
            }
            recupereListeNumeroAngle(selObst, "classique", getAngle(selObst));
        }
        genererParcours();
    }
}
function moveTunnel(idTunnel, idPointTunnel, X, Y, idPointTunnelPrecedent) {
    var newX;
    var newY;
    var oldX = tbTunnels[idTunnel][idPointTunnel * 2 + 1];
    var oldY = tbTunnels[idTunnel][idPointTunnel * 2 + 2];
    var type = tbTunnels[idTunnel][nbArticulationTunnel * 2 + 3];
    var dist;
    var angle;

    newX = X;
    newY = Y;
    if (idPointTunnel - 1 >= 0) {
        var xPre = tbTunnels[idTunnel][(idPointTunnel - 1) * 2 + 1];
        var yPre = tbTunnels[idTunnel][(idPointTunnel - 1) * 2 + 2];
        var anglePrecedent =
            180 + (Math.atan2(yPre - newY, xPre - newX) / Math.PI) * 180;
    }

    if (idPointTunnel + 1 < nbArticulationTunnel) {
        var xSui = tbTunnels[idTunnel][(idPointTunnel + 1) * 2 + 1];
        var ySui = tbTunnels[idTunnel][(idPointTunnel + 1) * 2 + 2];
        var angleSuivant =
            180 + (Math.atan2(ySui - newY, xSui - newX) / Math.PI) * 180;
    }

    if (idPointTunnel - 1 >= 0 && idPointTunnel + 1 < nbArticulationTunnel) {
        angleSurplus = 0;
        if (
            !(
                Math.abs(anglePrecedent - angleSuivant) > ANGLE_MIN &&
                Math.abs(anglePrecedent - angleSuivant) < 360 - ANGLE_MIN
            )
        ) {
            angleSurplus = diffAngle(angleSuivant, anglePrecedent);
        }
    }

    // si aucun point n'a été bougé précédement on bouge l point actuel
    if (idPointTunnelPrecedent == -1) {
        tbTunnels[idTunnel][idPointTunnel * 2 + 1] = newX;
        tbTunnels[idTunnel][idPointTunnel * 2 + 2] = newY;
    }

    // Effectuer le déplacement des point dans les cotés
    //if(idPointTunnelPrecedent!=-1){
    // point suivant
    if (idPointTunnel - 1 >= 0 && idPointTunnel - 1 != idPointTunnelPrecedent) {
        var distPre = Math.sqrt(
            Math.pow(xPre - newX, 2) + Math.pow(yPre - newY, 2)
        );
        var anglePreced =
            (Math.atan2(yPre - newY, xPre - newX) / Math.PI) * 180;
        anglePreced = anglePreced - angleSurplus;

        //anglePreced=anglePreced-angleSurplus;

        var newXPre = 0;
        var newYPre = 0;
        if (type == 3) {
            var distMax = distMaxTunnel3;
            var distMin = distMinTunnel3;
        } else {
            var distMax = distMaxTunnel;
            var distMin = distMinTunnel;
        }
        if (distPre > distMax) {
            newXPre = Math.cos((anglePreced / 180) * Math.PI) * distMax + X;
            newYPre = Math.sin((anglePreced / 180) * Math.PI) * distMax + Y;
        } else if (distPre < distMin) {
            newXPre = Math.cos((anglePreced / 180) * Math.PI) * distMin + X;
            newYPre = Math.sin((anglePreced / 180) * Math.PI) * distMin + Y;
        } else {
            // pas de transmission de mouvement si les écarts sont respectés.
            newXPre = Math.cos((anglePreced / 180) * Math.PI) * distPre + X;
            newYPre = Math.sin((anglePreced / 180) * Math.PI) * distPre + Y;

            //return;
        }
        tbTunnels[idTunnel][(idPointTunnel - 1) * 2 + 1] = newXPre;
        tbTunnels[idTunnel][(idPointTunnel - 1) * 2 + 2] = newYPre;
        //moveTunnel(idTunnel,idPointTunnel-1, newX, newY, idPointTunnel)
    }
    // transmission du mouvement vers suivants
    if (
        idPointTunnel + 1 < nbArticulationTunnel &&
        idPointTunnel + 1 != idPointTunnelPrecedent
    ) {
        var distSui = Math.sqrt(
            Math.pow(xSui - newX, 2) + Math.pow(ySui - newY, 2)
        );
        var angleSuiv = (Math.atan2(ySui - newY, xSui - newX) / Math.PI) * 180;
        angleSuiv = angleSuiv + angleSurplus;
        var newXSui = 0;
        var newYSui = 0;
        if (type == 3) {
            var distMax = distMaxTunnel3;
            var distMin = distMinTunnel3;
        } else {
            var distMax = distMaxTunnel;
            var distMin = distMinTunnel;
        }
        if (distSui > distMax) {
            newXSui = Math.cos((angleSuiv / 180) * Math.PI) * distMax + X;
            newYSui = Math.sin((angleSuiv / 180) * Math.PI) * distMax + Y;
        } else if (distSui < distMin) {
            newXSui = Math.cos((angleSuiv / 180) * Math.PI) * distMin + X;
            newYSui = Math.sin((angleSuiv / 180) * Math.PI) * distMin + Y;
        } else {
            newXSui = Math.cos((angleSuiv / 180) * Math.PI) * distSui + X;
            newYSui = Math.sin((angleSuiv / 180) * Math.PI) * distSui + Y;
        }
        tbTunnels[idTunnel][(idPointTunnel + 1) * 2 + 1] = newXSui;
        tbTunnels[idTunnel][(idPointTunnel + 1) * 2 + 2] = newYSui;
    }

    // on transmet le mouvement aux autres points

    // transmission du mouvement vers précédents
    if (idPointTunnel - 1 >= 0 && idPointTunnel - 1 != idPointTunnelPrecedent) {
        moveTunnel(
            idTunnel,
            idPointTunnel - 1,
            newXPre,
            newYPre,
            idPointTunnel
        );
    }
    // transmission du mouvement vers suivants
    if (
        idPointTunnel + 1 < nbArticulationTunnel &&
        idPointTunnel + 1 != idPointTunnelPrecedent
    ) {
        moveTunnel(
            idTunnel,
            idPointTunnel + 1,
            newXSui,
            newYSui,
            idPointTunnel
        );
    }
}
