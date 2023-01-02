///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////AJOUT DES OBSTACLES////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function createItem(id) {
    if (suppression) {
        supprimerObstacle();
    }
    decalX = 0;
    decalY = 0;
    if (overTunnelId != -1) {
        decalX = canvas_x - tbTunnels[id][nbArticulationTunnel * 2 + 1];
        decalY = canvas_y - tbTunnels[id][nbArticulationTunnel * 2 + 2];
        document.body.style.cursor = "pointer";

        selTunnel = overTunnelId;
        selPointTunnel = overPointTunnel;
    } else if (overObject != -1) {
        document.body.style.cursor = "move";
        selObst = overObject;

        decalX = getXCliquable(selObst) / 2;
        decalY = getYCliquable(selObst) / 2;
        setCanvasX(selObst, canvas_x - decalX);
        setCanvasY(selObst, canvas_y - decalY);
        genererParcours();
    }
}
function ajouterHaie() {
    var obstacle = new Array();
    obstacle[0] = id; // id
    overObject = id;
    obstacle[1] = canvas_x; // position X
    obstacle[2] = canvas_y; // position Y
    obstacle[3] = "IMG"; // Image affich� � l'�cran
    obstacle[4] = (144 + 50 + 50) / pixel; //largeur X cliquable
    obstacle[5] = 1; //hauteur Y cliquable
    obstacle[6] = 0; //angle en degr�
    obstacle[7] = "haie"; //type
    obstacle[8] = obstacle[4]; // modif sur X pour trajectoires d'entr�e
    obstacle[9] = obstacle[5]; // modif sur Y pour trajectoires d'entr�e
    obstacle[10] = obstacle[4]; // modif sur X pour trajectoires de sortie
    obstacle[11] = obstacle[5]; // modif sur Y pour trajectoires de sortie
    obstacle[12] = 90; // modif sur angle pour trajectoires de sortie
    obstacle[13] = obstacle[5]; // longueur pour trajectoires (X ou Y selon obstacle)
    obstacle[14] = distObstTrajectoire; // distance de la trajectoire
    tbObst[id] = obstacle;
    createItem(id);
    id++;
    genererParcours();
}
function ajouterPasserelle() {
    var obstacle = new Array();
    obstacle[0] = id;
    overObject = id;
    obstacle[1] = canvas_x; // position X
    obstacle[2] = canvas_y; // position Y
    obstacle[3] = "IMG"; // Image affich� � l'�cran
    obstacle[4] = 1140 / pixel; //largeur X cliquable
    obstacle[5] = 30 / pixel; //hauteur Y cliquable
    obstacle[6] = 0; //angle en degr�
    obstacle[7] = "passerelle"; //type
    obstacle[8] = obstacle[4]; // modif sur X pour trajectoires d'entr�e
    obstacle[9] = obstacle[5]; // modif sur Y pour trajectoires d'entr�e
    obstacle[10] = obstacle[4]; // modif sur X pour trajectoires de sortie
    obstacle[11] = obstacle[5]; // modif sur Y pour trajectoires de sortie
    obstacle[12] = 0; // modif sur angle pour trajectoires de sortie
    obstacle[13] = obstacle[4]; // longueur pour trajectoires (X ou Y selon obstacle)
    obstacle[14] = distObstTrajectoire; // distance de la trajectoire

    tbObst[id] = obstacle;
    createItem(id);
    id++;
    genererParcours();
}
function ajouterBalancoire() {
    var obstacle = new Array();
    obstacle[0] = id;
    overObject = id;
    obstacle[1] = canvas_x; // position X
    obstacle[2] = canvas_y; // position Y
    obstacle[3] = "IMG"; // Image affich� � l'�cran
    obstacle[4] = 380 / pixel; //largeur X cliquable
    obstacle[5] = 30 / pixel; //hauteur Y cliquable
    obstacle[6] = 0; //angle en degr�
    obstacle[7] = "balancoire"; //type
    obstacle[8] = obstacle[4]; // modif sur X pour trajectoires d'entr�e
    obstacle[9] = obstacle[5]; // modif sur Y pour trajectoires d'entr�e
    obstacle[10] = obstacle[4]; // modif sur X pour trajectoires de sortie
    obstacle[11] = obstacle[5]; // modif sur Y pour trajectoires de sortie
    obstacle[12] = 0; // modif sur angle pour trajectoires de sortie
    obstacle[13] = obstacle[4]; // longueur pour trajectoires (X ou Y selon obstacle)
    obstacle[14] = distObstTrajectoire; // distance de la trajectoire

    tbObst[id] = obstacle;
    createItem(id);
    id++;
    genererParcours();
}
function ajouterSlalom() {
    var obstacle = new Array();
    obstacle[0] = id;
    overObject = id;
    obstacle[1] = canvas_x; // position X
    obstacle[2] = canvas_y; // position Y
    obstacle[3] = "IMG"; // Image affich� � l'�cran
    obstacle[4] = (11 * 60) / pixel; //largeur X cliquable
    obstacle[5] = 1; //hauteur Y cliquable
    obstacle[6] = 0; //angle en degr�
    obstacle[7] = "slalom"; //type
    obstacle[8] = obstacle[4]; // modif sur X pour trajectoires d'entr�e
    obstacle[9] = obstacle[5]; // modif sur Y pour trajectoires d'entr�e
    obstacle[10] = obstacle[4]; // modif sur X pour trajectoires de sortie
    obstacle[11] = obstacle[5]; // modif sur Y pour trajectoires de sortie
    obstacle[12] = 0; // modif sur angle pour trajectoires de sortie
    obstacle[13] = obstacle[4]; // longueur pour trajectoires (X ou Y selon obstacle)
    obstacle[14] = distObstTrajectoire; // distance de la trajectoire

    tbObst[id] = obstacle;
    createItem(id);
    id++;
    genererParcours();
}

function ajouterSlalom6() {
    var obstacle = new Array();
    obstacle[0] = id;
    overObject = id;
    obstacle[1] = canvas_x; // position X
    obstacle[2] = canvas_y; // position Y
    obstacle[3] = "IMG"; // Image affich� � l'�cran
    obstacle[4] = (11 * 28) / pixel; //largeur X cliquable
    obstacle[5] = 1; //hauteur Y cliquable
    obstacle[6] = 0; //angle en degr�
    obstacle[7] = "slalom6"; //type
    obstacle[8] = obstacle[4]; // modif sur X pour trajectoires d'entr�e
    obstacle[9] = obstacle[5]; // modif sur Y pour trajectoires d'entr�e
    obstacle[10] = obstacle[4]; // modif sur X pour trajectoires de sortie
    obstacle[11] = obstacle[5]; // modif sur Y pour trajectoires de sortie
    obstacle[12] = 0; // modif sur angle pour trajectoires de sortie
    obstacle[13] = obstacle[4]; // longueur pour trajectoires (X ou Y selon obstacle)
    obstacle[14] = distObstTrajectoire; // distance de la trajectoire

    tbObst[id] = obstacle;
    createItem(id);
    id++;
    genererParcours();
}

function ajouterPalissade() {
    var obstacle = new Array();
    obstacle[0] = id;
    overObject = id;
    obstacle[1] = canvas_x; // position X
    obstacle[2] = canvas_y; // position Y
    obstacle[3] = "IMG"; // Image affich� � l'�cran
    obstacle[4] = 390 / pixel; //largeur X cliquable
    obstacle[5] = 102 / pixel; //hauteur Y cliquable
    obstacle[6] = 0; //angle en degr�
    obstacle[7] = "palissade"; //type
    obstacle[8] = obstacle[4]; // modif sur X pour trajectoires d'entr�e
    obstacle[9] = obstacle[5]; // modif sur Y pour trajectoires d'entr�e
    obstacle[10] = obstacle[4]; // modif sur X pour trajectoires de sortie
    obstacle[11] = obstacle[5]; // modif sur Y pour trajectoires de sortie
    obstacle[12] = 0; // modif sur angle pour trajectoires de sortie
    obstacle[13] = obstacle[4]; // longueur pour trajectoires (X ou Y selon obstacle)
    obstacle[14] = distObstTrajectoire; // distance de la trajectoire

    tbObst[id] = obstacle;
    createItem(id);
    id++;
    genererParcours();
}
function ajouterChaussette() {
    var obstacle = new Array();
    obstacle[0] = id;
    overObject = id;
    obstacle[1] = canvas_x; // position X
    obstacle[2] = canvas_y; // position Y
    obstacle[3] = "IMG"; // Image affich� � l'�cran
    obstacle[4] = 73; //largeur X cliquable
    obstacle[5] = 10; //hauteur Y cliquable
    obstacle[6] = 0; //angle en degr�
    obstacle[7] = "chaussette"; //type
    obstacle[8] = obstacle[4]; // modif sur X pour trajectoires d'entr�e
    obstacle[9] = obstacle[5]; // modif sur Y pour trajectoires d'entr�e
    obstacle[10] = obstacle[4]; // modif sur X pour trajectoires de sortie
    obstacle[11] = obstacle[5]; // modif sur Y pour trajectoires de sortie
    obstacle[12] = 0; // modif sur angle pour trajectoires de sortie
    obstacle[13] = obstacle[4]; // longueur pour trajectoires (X ou Y selon obstacle)
    obstacle[14] = distObstTrajectoire; // distance de la trajectoire

    tbObst[id] = obstacle;
    createItem(id);
    id++;
    genererParcours();
}
function ajouterLongueur() {
    var obstacle = new Array();
    obstacle[0] = id;
    overObject = id;
    obstacle[1] = canvas_x; // position X
    obstacle[2] = canvas_y; // position Y
    obstacle[3] = "IMG"; // Image affich� � l'�cran
    obstacle[4] = 150 / pixel; //largeur X cliquable
    obstacle[5] = 150 / pixel; //hauteur Y cliquable
    obstacle[6] = 0; //angle en degr�
    obstacle[7] = "longueur"; //type
    obstacle[8] = obstacle[4]; // modif sur X pour trajectoires d'entr�e
    obstacle[9] = obstacle[5]; // modif sur Y pour trajectoires d'entr�e
    obstacle[10] = obstacle[4]; // modif sur X pour trajectoires de sortie
    obstacle[11] = obstacle[5]; // modif sur Y pour trajectoires de sortie
    obstacle[12] = 90; // modif sur angle pour trajectoires de sortie
    obstacle[13] = obstacle[5]; // longueur pour trajectoires (X ou Y selon obstacle)
    obstacle[14] = distObstTrajectoire; // distance de la trajectoire

    tbObst[id] = obstacle;
    createItem(id);
    id++;
    genererParcours();
}
function ajouterMur() {
    var obstacle = new Array();
    obstacle[0] = id; // id
    overObject = id;
    obstacle[1] = canvas_x; // position X
    obstacle[2] = canvas_y; // position Y
    obstacle[3] = "IMG"; // Image affich� � l'�cran
    obstacle[4] = (144 + LARGEUR_MUR_TOUR + LARGEUR_MUR_TOUR) / pixel; //largeur X cliquable
    obstacle[5] = 4; //hauteur Y cliquable
    obstacle[6] = 0; //angle en degr�
    obstacle[7] = "mur"; //type
    obstacle[8] = obstacle[4]; // modif sur X pour trajectoires d'entr�e
    obstacle[9] = obstacle[5]; // modif sur Y pour trajectoires d'entr�e
    obstacle[10] = obstacle[4]; // modif sur X pour trajectoires de sortie
    obstacle[11] = obstacle[5]; // modif sur Y pour trajectoires de sortie
    obstacle[12] = 90; // modif sur angle pour trajectoires de sortie
    obstacle[13] = obstacle[5]; // longueur pour trajectoires (X ou Y selon obstacle)
    obstacle[14] = distObstTrajectoire; // distance de la trajectoire
    tbObst[id] = obstacle;
    createItem(id);
    id++;
    genererParcours();
}
function ajouterTable() {
    var obstacle = new Array();
    obstacle[0] = id; // id
    overObject = id;
    obstacle[1] = canvas_x; // position X
    obstacle[2] = canvas_y; // position Y
    obstacle[3] = "IMG"; // Image affich� � l'�cran
    obstacle[4] = DIM_TABLE; //largeur X cliquable
    obstacle[5] = DIM_TABLE; //hauteur Y cliquable
    obstacle[6] = 0; //angle en degr�
    obstacle[7] = "table"; //type
    obstacle[8] = obstacle[4]; // modif sur X pour trajectoires d'entr�e
    obstacle[9] = obstacle[4]; // modif sur Y pour trajectoires d'entr�e
    obstacle[10] = obstacle[4]; // modif sur X pour trajectoires de sortie
    obstacle[11] = obstacle[4]; // modif sur Y pour trajectoires de sortie
    obstacle[12] = 0; // modif sur angle pour trajectoires de sortie
    obstacle[13] = obstacle[4]; // longueur pour trajectoires (X ou Y selon obstacle)
    obstacle[14] = distObstTrajectoire; // distance de la trajectoire
    tbObst[id] = obstacle;
    createItem(id);
    id++;
    genererParcours();
}
function ajouterOxer() {
    var obstacle = new Array();
    obstacle[0] = id; // id
    overObject = id;
    obstacle[1] = canvas_x; // position X
    obstacle[2] = canvas_y; // position Y
    obstacle[3] = "IMG"; // Image affich� � l'�cran
    obstacle[4] = (144 + 50 + 50) / pixel; //largeur X cliquable
    obstacle[5] = 55 / pixel; //hauteur Y cliquable
    obstacle[6] = 0; //angle en degr�
    obstacle[7] = "oxer"; //type
    obstacle[8] = obstacle[4]; // modif sur X pour trajectoires d'entr�e
    obstacle[9] = obstacle[5]; // modif sur Y pour trajectoires d'entr�e
    obstacle[10] = obstacle[4]; // modif sur X pour trajectoires de sortie
    obstacle[11] = obstacle[5]; // modif sur Y pour trajectoires de sortie
    obstacle[12] = -90; // modif sur angle pour trajectoires de sortie
    obstacle[13] = obstacle[5]; // longueur pour trajectoires (X ou Y selon obstacle)
    obstacle[14] = distObstTrajectoire; // distance de la trajectoire
    tbObst[id] = obstacle;
    createItem(id);
    id++;
    genererParcours();
}
function ajouterPneu() {
    var obstacle = new Array();
    obstacle[0] = id; // id
    overObject = id;
    obstacle[1] = canvas_x; // position X
    obstacle[2] = canvas_y; // position Y
    obstacle[3] = "IMG"; // Image affich� � l'�cran
    obstacle[4] = 150 / pixel; //largeur X cliquable
    obstacle[5] = 150 / pixel; //hauteur Y cliquable
    obstacle[6] = 0; //angle en degr�
    obstacle[7] = "pneu"; //type
    obstacle[8] = obstacle[4]; // modif sur X pour trajectoires d'entr�e
    obstacle[9] = obstacle[5]; // modif sur Y pour trajectoires d'entr�e
    obstacle[10] = obstacle[4]; // modif sur X pour trajectoires de sortie
    obstacle[11] = obstacle[5]; // modif sur Y pour trajectoires de sortie
    obstacle[12] = 90; // modif sur angle pour trajectoires de sortie
    obstacle[13] = obstacle[5]; // longueur pour trajectoires (X ou Y selon obstacle)
    obstacle[14] = distObstTrajectoire; // distance de la trajectoire
    tbObst[id] = obstacle;
    createItem(id);
    id++;
    genererParcours();
}

function ajouterConducteur(sens) {
    var obstacle = new Array();
    obstacle[0] = id; // id
    obstacle[3] = sens; // sens
    overObject = id;
    obstacle[1] = canvas_x; // position X
    obstacle[2] = canvas_y; // position Y
    obstacle[4] = 30; //largeur X cliquable
    obstacle[5] = 30; //hauteur Y cliquable
    obstacle[6] = 0; //angle en degr�
    obstacle[7] = "conducteur"; //type
    tbObst[id] = obstacle;
    createItem(id);
    id++;
    genererParcours();
}

function ajouterChien() {
    var obstacle = new Array();
    obstacle[0] = id; // id
    obstacle[3] = 0; // sens
    overObject = id;
    obstacle[1] = canvas_x; // position X
    obstacle[2] = canvas_y; // position Y
    obstacle[4] = 30; //largeur X cliquable
    obstacle[5] = 25; //hauteur Y cliquable
    obstacle[6] = 0; //angle en degr�
    obstacle[7] = "chien"; //type
    tbObst[id] = obstacle;
    createItem(id);
    id++;
    genererParcours();
}

function ajouterTunnel(type) {
    if (type == 3) {
        var distMax = distMaxTunnel3;
    } else {
        var distMax = distMaxTunnel;
    }
    var tunnel = new Array();
    tunnel[0] = idTunnel;
    tunnel[nbArticulationTunnel * 2 + 3] = type;
    overPointTunnel = nbArticulationTunnel;
    overTunnelId = idTunnel;

    for (var art = 0; art < nbArticulationTunnel; art++) {
        tunnel[art * 2 + 1] = canvas_x + art * distMax; // position X premier point
        tunnel[art * 2 + 2] = canvas_y; // position Y premier point
    }

    tbTunnels[idTunnel] = tunnel;
    createItem(idTunnel);
    idTunnel++;
    genererParcours();
}
function ajouterNumero(type) {
    if (suppression) {
        supprimerObstacle();
    }
    var numero = new Array();

    if (type == 1) {
        if (id == 0 && idTunnel == 0) {
            return;
        }
        var newNumber = nextNumber;
    } else if (type == 2) {
        var newNumber = nextNumber2;
    } else if (type == 3) {
        var newNumber = nextNumber3;
    }

    if (type == 1) {
        for (var i = 1; i < nextNumber && newNumber != i - 1; i++) {
            if (listeNumero[i] == "") {
                newNumber = i;
            }
        }
    } else if (type == 2) {
        for (var i = 1; i < nextNumber2 && newNumber != i - 1; i++) {
            if (listeNumero2[i] == "") {
                newNumber = i;
            }
        }
    } else if (type == 3) {
        for (var i = 1; i < nextNumber3 && newNumber != i - 1; i++) {
            if (listeNumero3[i] == "") {
                newNumber = i;
            }
        }
    }

    decalX = LARGEUR_NUMERO / 2;
    decalY = HAUTEUR_NUMERO / 2;
    document.body.style.cursor = "move";
    numero[0] = newNumber;

    //if(canvas_x==null || canvas_x<0){
    numero[1] = MARGE; //X
    numero[2] = MARGE; //Y
    //}
    //numero[1]=canvas_x;//X
    //numero[2]=canvas_y;//Y
    if (type == 1) {
        listeNumero[newNumber] = numero;
        selNumeroId = newNumber;
        if (newNumber == nextNumber) {
            nextNumber++;
        }
    } else if (type == 2) {
        listeNumero2[newNumber] = numero;
        selNumeroId2 = newNumber;
        if (newNumber == nextNumber2) {
            nextNumber2++;
        }
    } else if (type == 3) {
        listeNumero3[newNumber] = numero;
        selNumeroId3 = newNumber;
        if (newNumber == nextNumber3) {
            nextNumber3++;
        }
    }

    doMove();
    genererParcours();
}
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////SUPPRESSION DES OBSTACLES//////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function supprimerObstacle() {
    suppression = !suppression;
    if (suppression) {
        document.body.style.cursor = "no-drop";
    } else {
        document.body.style.cursor = "default";
    }
}
