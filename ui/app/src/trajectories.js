///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////CALCUL DES TRAJECTOIRES///////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function longueurTunnel(idTunnel) {
    var longueurTunnel = 0;
    for (var art = 0; art < nbArticulationTunnel - 1; art++) {
        var x = art * 2 + 1;
        var y = art * 2 + 2;
        var x2 = art * 2 + 3;
        var y2 = art * 2 + 4;
        dist = Math.sqrt(
            Math.pow(tbTunnels[idTunnel][x] - tbTunnels[idTunnel][x2], 2) +
                Math.pow(tbTunnels[idTunnel][y] - tbTunnels[idTunnel][y2], 2)
        );
        longueurTunnel = longueurTunnel + dist;
    }
    return longueurTunnel;
}
function genererTrajectoires() {
    vitesseTraj = 0;
    var angleModSui = 0;
    var angleMod = 0;

    if (!trajectoire) {
        return;
    }
    longueurTotal = 0;

    context.lineWidth = 1;
    var distObstTrajectoireSui = 50;
    var distObstTrajectoire = 50;
    for (var j = 1; j < nextNumber - 1; j++) {
        var i = ordreObst[j][0];
        var iSui = ordreObst[j + 1][0]; //TODO BUG, valeur de la propriété 0 non déf
        var sens = ordreObst[j][2];
        var sensSui = ordreObst[j + 1][2];
        if (sens == 0) {
            var angleMod = ordreObst[j][7];
            var distMod = ordreObst[j][8];
        } else {
            var angleMod = ordreObst[j][9];
            var distMod = ordreObst[j][10];
        }
        if (sensSui == 0) {
            var angleModSui = ordreObst[j + 1][9];
            var distModSui = ordreObst[j + 1][10];
        } else {
            var angleModSui = ordreObst[j + 1][7];
            var distModSui = ordreObst[j + 1][8];
        }

        if (ordreObst[j][1] == "tunnel") {
            if (sens == 0) {
                var x = tbTunnels[i][1];
                var y = tbTunnels[i][2];
                var x2 = tbTunnels[i][3]; // pour le premier angle
                var y2 = tbTunnels[i][4]; // pour le premier angle
                var distX = x - x2;
                var distY = y - y2;
                var angle = -90;
                var modifAngleArr =
                    (Math.atan2(distY, distX) / Math.PI) * 180 - 90;
            } else {
                var x = tbTunnels[i][(nbArticulationTunnel - 2) * 2 + 1];
                var y = tbTunnels[i][(nbArticulationTunnel - 2) * 2 + 2];
                var x2 = tbTunnels[i][(nbArticulationTunnel - 2) * 2 + 3]; // pour le premier angle
                var y2 = tbTunnels[i][(nbArticulationTunnel - 2) * 2 + 4]; // pour le premier angle
                var distX = x2 - x;
                var distY = y2 - y;
                x = x2;
                y = y2;
                var angle = 0;
                var modifAngleArr = (Math.atan2(distY, distX) / Math.PI) * 180;
            }
            var largX = 0;
            var hauty = 0;
            var type = "tunnel";
            var modifXDep = 0;
            var modifYDep = 0;
            var modifXArr = 0;
            var modifYArr = 0;

            //calcul de l'angle de la table
            var longTraj = 0;

            if (i == 0) {
                longueurTotal = longueurTotal + longueurTunnel(i) * pixel;
            }
            distObstTrajectoire = distMod; // distance de la trajectoire
        } else {
            distObstTrajectoire = distMod; // distance de la trajectoire
            var x = getCanvasX(i);
            var y = getCanvasY(i);
            var largX = getXCliquable(i);
            var hauty = getYCliquable(i);
            var type = getType(i);

            // conversion en fonction du sens de départ
            if (sens == 1) {
                var modifXDep = getModXTrajSortie(i);
                var modifYDep = getModYTrajSortie(i);
                var modifAngleArr = angleMod;
                var longTraj = getDistTrajCentre(i);
                var angle = -180 - getAngle(i);
            } else {
                var modifXDep = getModXTrajEntree(i);
                var modifYDep = getModYTrajEntree(i);
                var modifAngleArr = angleMod;
                var longTraj = getDistTrajCentre(i);
                var angle = -getAngle(i);
            }
        }
        if (ordreObst[j + 1][1] == "tunnel") {
            if (sensSui == 1) {
                var xSui = tbTunnels[iSui][1];
                var ySui = tbTunnels[iSui][2];
                var xSui2 = tbTunnels[iSui][3]; // pour le premier angle
                var ySui2 = tbTunnels[iSui][4]; // pour le premier angle
                var distX = xSui - xSui2;
                var distY = ySui - ySui2;
                var angleSui = -90;
                var modifAngleArrSui =
                    (Math.atan2(distY, distX) / Math.PI) * 180 - 90;
            } else {
                var xSui = tbTunnels[iSui][(nbArticulationTunnel - 2) * 2 + 1];
                var ySui = tbTunnels[iSui][(nbArticulationTunnel - 2) * 2 + 2];
                var xSui2 = tbTunnels[iSui][(nbArticulationTunnel - 2) * 2 + 3]; // pour le premier angle
                var ySui2 = tbTunnels[iSui][(nbArticulationTunnel - 2) * 2 + 4]; // pour le premier angle
                var distX = xSui2 - xSui;
                var distY = ySui2 - ySui;
                xSui = xSui2;
                ySui = ySui2;
                var angleSui = 180;
                var modifAngleArrSui =
                    (Math.atan2(distY, distX) / Math.PI) * 180;
            }
            /*			
			var xSui=tbTunnels[iSui][(nbArticulationTunnel-1)*2+1];
			var ySui=tbTunnels[iSui][(nbArticulationTunnel-1)*2+2];
			var xSui2=tbTunnels[iSui][(nbArticulationTunnel-2)*2+1];
			var ySui2=tbTunnels[iSui][(nbArticulationTunnel-2)*2+2];*/
            var largXSui = 0;
            var largYSui = 0;
            //var angleSui=90;
            var typeSui = "tunnel";
            var modifXDepSui = 0;
            var modifYDepSui = 0;
            var modifXArrSui = 0;
            var modifYArrSui = 0;

            //var modifAngleArrSui=0;
            var longTrajSui = 0;
            longueurTotal = longueurTotal + longueurTunnel(iSui) * pixel;
            distObstTrajectoireSui = distModSui; // distance de la trajectoire
        } else {
            distObstTrajectoireSui = distModSui; // distance de la trajectoire

            var xSui = getCanvasX(iSui);
            var ySui = getCanvasY(iSui);
            var largXSui = getXCliquable(iSui);
            var largYSui = getYCliquable(iSui);
            var typeSui = getType(iSui);

            if (sensSui == 1) {
                var modifXArrSui = getModXTrajSortie(iSui);
                var modifYArrSui = getModYTrajSortie(iSui);
                var modifAngleArrSui = angleModSui;
                var longTrajSui = getDistTrajCentre(iSui);
                var angleSui = -180 + getAngle(iSui);
            } else {
                var modifXArrSui = getModXTrajEntree(iSui);
                var modifYArrSui = getModYTrajEntree(iSui);
                var modifAngleArrSui = angleModSui;
                var longTrajSui = getDistTrajCentre(iSui);
                var angleSui = getAngle(iSui);
            }
        }

        if (j == 0) {
            longueurTotal = longueurTotal + longTraj * pixel;
        }
        longueurTotal = longueurTotal + longTrajSui * pixel;

        angle = -angle + modifAngleArr;
        angleSui = angleSui + modifAngleArrSui;

        var departX =
            x +
            modifXDep / 2 +
            (Math.cos((angle / 180) * Math.PI) * longTraj) / 2;
        var departY =
            y +
            modifYDep / 2 +
            (Math.sin((angle / 180) * Math.PI) * longTraj) / 2;
        var interDepX =
            x +
            modifXDep / 2 +
            Math.cos((angle / 180) * Math.PI) *
                (longTraj / 2 + distObstTrajectoire);
        var interDepY =
            y +
            modifYDep / 2 +
            Math.sin((angle / 180) * Math.PI) *
                (longTraj / 2 + distObstTrajectoire);

        if (typeSui == "table") {
            //calcul de l'angle de la table
            var distX = xSui + largXSui / 2 - interDepX;
            var distY = interDepY - ySui + largYSui / 2;
            var angleSui = (Math.atan2(distY, distX) / Math.PI) * -180;
        }

        //var arriveX = xSui+modifXArrSui/2+Math.cos(angleSui/180*Math.PI)*(-longTrajSui/2);
        //var arriveY= ySui+modifYArrSui/2+Math.sin(angleSui/180*Math.PI)*(-longTrajSui/2);

        var arriveX =
            xSui +
            modifXArrSui / 2 +
            Math.cos((angleSui / 180) * Math.PI) * (-longTrajSui / 2);
        var arriveY =
            ySui +
            modifYArrSui / 2 +
            Math.sin((angleSui / 180) * Math.PI) * (-longTrajSui / 2);

        var interArrX =
            xSui +
            modifXArrSui / 2 +
            Math.cos((angleSui / 180) * Math.PI) *
                (-longTrajSui / 2 - distObstTrajectoireSui);
        var interArrY =
            ySui +
            modifYArrSui / 2 +
            Math.sin((angleSui / 180) * Math.PI) *
                (-longTrajSui / 2 - distObstTrajectoireSui);
        if (type == "table") {
            //calcul de l'angle de la table
            var distX = interArrX - x - largX / 2;
            var distY = interArrY - y - hauty / 2;

            var angle = (Math.atan2(distY, distX) / Math.PI) * +180;
            departX =
                x +
                modifXDep / 2 +
                (Math.cos((angle / 180) * Math.PI) * longTraj) / 2;
            departY =
                y +
                modifYDep / 2 +
                (Math.sin((angle / 180) * Math.PI) * longTraj) / 2;
            interDepX =
                x +
                modifXDep / 2 +
                Math.cos((angle / 180) * Math.PI) *
                    (longTraj / 2 + distObstTrajectoire);
            interDepY =
                y +
                modifYDep / 2 +
                Math.sin((angle / 180) * Math.PI) *
                    (longTraj / 2 + distObstTrajectoire);
        }
        var xText = Math.round((interDepX + interArrX) / 2);
        var yText = Math.round((interArrY + interDepY) / 2);

        /////////////////////////// modification des trajectoires ///////////////////////
        if (document.getElementById("ModifierTrajectoires").checked) {
            if (modifTrajId == j && modifTrajDepArr == "dep") {
                interDepY = canvas_y - decalY;
                interDepX = canvas_x - decalX;
                var xModif = departX - interDepX;
                var yModif = departY - interDepY;
                var modifAngle = (Math.atan2(yModif, xModif) / Math.PI) * 180;
                var modifDist = Math.sqrt(
                    Math.pow(xModif, 2) + Math.pow(yModif, 2)
                );

                if (
                    type == "haie" ||
                    type == "oxer" ||
                    type == "mur" ||
                    type == "longueur"
                ) {
                    var angleOrigine = getAngle(i);
                    var angleTrajReel = modifAngle;
                    var angleTrajRelatif;

                    if (angleOrigine >= 0 && angleTrajReel >= 0) {
                        angleTrajRelatif = angleTrajReel - angleOrigine;
                    } else if (angleOrigine >= 0 && angleTrajReel <= 0) {
                        angleTrajRelatif = angleTrajReel - angleOrigine;
                    } else if (angleOrigine <= 0 && angleTrajReel <= 0) {
                        angleTrajRelatif = angleTrajReel - angleOrigine;
                    } else if (angleOrigine <= 0 && angleTrajReel >= 0) {
                        angleTrajRelatif = angleTrajReel - angleOrigine;
                    }

                    var oldAngleMod = angleMod;
                    if (sens == 1) {
                        if (angleMod > 0) {
                            angleMod = angleTrajRelatif - 360;
                        } else {
                            angleMod = angleTrajRelatif + 360;
                        }
                    } else {
                        if (angleMod > 0) {
                            angleMod = angleTrajRelatif - 180;
                        } else {
                            angleMod = angleTrajRelatif + 180;
                        }
                    }
                }

                distMod = modifDist;
            } else if (modifTrajId == j + 1 && modifTrajDepArr == "arr") {
                interArrY = canvas_y - decalY;
                interArrX = canvas_x - decalX;
                var xModif = arriveX - interArrX;
                var yModif = arriveY - interArrY;
                var modifAngle = (Math.atan2(yModif, xModif) / Math.PI) * 180;
                var modifDist = Math.sqrt(
                    Math.pow(xModif, 2) + Math.pow(yModif, 2)
                );

                if (
                    typeSui == "haie" ||
                    typeSui == "oxer" ||
                    typeSui == "mur" ||
                    typeSui == "longueur"
                ) {
                    var angleOrigine = getAngle(iSui);
                    var angleTrajReel = modifAngle;
                    var angleTrajRelatif;

                    if (angleOrigine >= 0 && angleTrajReel >= 0) {
                        angleTrajRelatif = angleTrajReel - angleOrigine;
                    } else if (angleOrigine >= 0 && angleTrajReel <= 0) {
                        angleTrajRelatif = angleTrajReel - angleOrigine;
                    } else if (angleOrigine <= 0 && angleTrajReel <= 0) {
                        angleTrajRelatif = angleTrajReel - angleOrigine;
                    } else if (angleOrigine <= 0 && angleTrajReel >= 0) {
                        angleTrajRelatif = angleTrajReel - angleOrigine;
                    }

                    angleModSui = angleTrajRelatif;

                    if (sensSui == 1) {
                        if (angleModSui > 0) {
                            angleModSui = angleTrajRelatif - 180;
                        } else {
                            angleModSui = angleTrajRelatif + 180;
                        }
                    }
                }
                distModSui = modifDist;
            }
        }

        var longueurBez = bezierSize(
            departX,
            departY,
            interDepX,
            interDepY,
            interArrX,
            interArrY,
            arriveX,
            arriveY
        );

        longueurMetre = longueurBez * pixel;
        longueurTotal = longueurTotal + longueurMetre;

        context.strokeStyle = COLOR_TRACE_OK;

        //ralentissement de la vitesse en fonction de l'obstacle :

        if (type == "haie") {
            vitesseTraj = vitesseTraj * 0.75;
        } else if (type == "oxer") {
            vitesseTraj = vitesseTraj * 0.65;
        } else if (type == "mur") {
            vitesseTraj = vitesseTraj * 0.7;
        } else if (type == "pneu") {
            vitesseTraj = vitesseTraj * 0.7;
        } else if (type == "table") {
            vitesseTraj = 0;
        } else if (type == "balancoire") {
            vitesseTraj = vitesseTraj * 0.2;
        } else if (type == "chaussette") {
            vitesseTraj = vitesseTraj * 0.5;
        } else if (type == "slalom") {
            vitesseTraj = vitMax * 0.3;
        } else if (type == "slalom6") {
            vitesseTraj = vitMax * 0.3;
        } else if (type == "passerelle") {
            //running
            if (document.getElementById("2on2off").checked) {
                vitesseTraj = vitMax * 0.2;
            } else {
                vitesseTraj = vitMax * 0.9;
            }
        } else if (type == "palissade") {
            if (document.getElementById("2on2off").checked) {
                vitesseTraj = vitMax * 0.2;
            } else {
                vitesseTraj = vitMax * 0.7;
            }
        } else if (type == "longueur") {
            vitesseTraj = vitesseTraj * 0.9;
        } else if (type == "tunnel") {
            vitesseTraj = vitesseTraj * 0.9;
        }

        customBezier(
            departX,
            departY,
            interDepX,
            interDepY,
            interArrX,
            interArrY,
            arriveX,
            arriveY
        );

        // FLECHE
        context.save();
        context.translate(arriveX, arriveY); //translate to center of shape
        context.rotate((Math.PI / 180) * angleSui); //rotate 25 degrees
        context.translate(-arriveX, -arriveY); //translate center back to 0,0

        context.beginPath();
        context.moveTo(arriveX - 5, arriveY + 4);
        context.lineTo(arriveX, arriveY);
        context.lineTo(arriveX - 5, arriveY - 4);
        context.closePath();
        context.fillStyle = COLOR_TRACE_OK; //blanc
        context.stroke();
        context.fill();

        context.restore();
        //////////
        context.fillStyle = COLOR_TERRAIN;
        context.fillStyle = COLOR_TEXT_UNDER;
        context.fillRect(xText - 15, yText - 8, 25, 12);
        context.fillStyle = COLOR_TEXT;
        context.fillText(
            Math.round(longueurMetre * unite, 3) / 100,
            xText - 14,
            yText
        );
        //TPS = Math.round(longueurTotal)/100/document.getElementById('vitesseEvo').value

        // modification des trajectoires
        if (document.getElementById("ModifierTrajectoires").checked) {
            ordreObst[j][3] = interDepX;
            ordreObst[j][4] = interDepY;
            ordreObst[j + 1][5] = interArrX;
            ordreObst[j + 1][6] = interArrY;
            if (modifTrajId == j && modifTrajDepArr == "dep") {
                if (sens == 0) {
                    ordreObst[j][8] = distMod;
                } else {
                    ordreObst[j][10] = distMod;
                }
            } else if (modifTrajId == j + 1 && modifTrajDepArr == "arr") {
                if (sensSui == 0) {
                    ordreObst[j + 1][10] = distModSui;
                } else {
                    ordreObst[j + 1][8] = distModSui;
                }
            }
            /* A MODIFIER SI IL Y A DES ANGLES NON DEPENDANTS ENTRE ENTREE ET SORTIE
			if(sens==0){

			}else{

			}
			if(sensSui==0){

			}else{

			}*/
            ordreObst[j][7] = angleMod;
            ordreObst[j][9] = angleMod;
            ordreObst[j + 1][9] = angleModSui;
            ordreObst[j + 1][7] = angleModSui;

            context.fillStyle = COLOR_JAUNE;
            context.strokeStyle = COLOR_TRACE_TRANSPARENT;
            // tracé des points jaune pour modif de trajectoires
            // vérification de leur distance avec le pointeur de la souris
            if (
                Math.abs(interDepX - canvas_x) +
                    Math.abs(interDepY - canvas_y) <
                200
            ) {
                context.beginPath();
                context.arc(interDepX, interDepY, 4, 0, 2 * Math.PI);
                context.stroke();
                context.fill();
                context.beginPath();
                context.moveTo(departX, departY);
                context.lineTo(interDepX, interDepY);
                context.stroke();
            }
            if (
                Math.abs(interArrX - canvas_x) +
                    Math.abs(interArrY - canvas_y) <
                200
            ) {
                context.beginPath();
                context.moveTo(arriveX, arriveY);
                context.lineTo(interArrX, interArrY);
                context.stroke();
                context.beginPath();
                context.arc(interArrX, interArrY, 4, 0, 2 * Math.PI);
                context.stroke();
                context.fill();
            }
        }
    }
    longueurTotal = longueurTotal * unite;
    context.fillStyle = COLOR_TEXT_UNDER;
    rect(canvasSizeX / 4, canvasSizeY - 30, canvasSizeX / 2, 30);
}
function bezierSize(x1, y1, x1B, y1B, x2, y2, x2B, y2B) {
    var inc = 50;
    var length = 0;
    var t = 0;
    var ptX = 0;
    var ptY = 0;
    var prevPtX = 0;
    var prevPtY = 0;
    var xB;
    var yY;
    for (var i = 0; i < inc; i++) {
        t = i / inc;
        var t1 = 1.0 - t;
        var t1_3 = t1 * t1 * t1;
        var t1_3a = 3 * t * (t1 * t1);
        var t1_3b = 3 * (t * t) * t1;
        var t1_3c = t * t * t;
        ptX = x1 * t1_3 + t1_3a * x1B + t1_3b * x2 + t1_3c * x2B;
        ptY = y1 * t1_3 + t1_3a * y1B + t1_3b * y2 + t1_3c * y2B;
        if (i > 0) {
            xB = ptX - prevPtX;
            yY = ptY - prevPtY;
            length = length + Math.sqrt(xB * xB + yY * yY);
        }
        prevPtX = ptX;
        prevPtY = ptY;
    }
    return length;
}
function diffAngle(firstAngle, secondAngle) {
    var difference = secondAngle - firstAngle;
    if (difference < -180) {
        difference += 360;
    }
    if (difference > 180) {
        difference -= 360;
    }
    if (difference > 0) {
        difference -= ANGLE_MIN;
    } else {
        difference += ANGLE_MIN;
    }
    return difference;
}
