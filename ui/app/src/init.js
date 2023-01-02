var canvas;
var pixel = 6; //taille en centimetre d'un pixel
var TPS = 0;
var distObstTrajectoire = 40;
var tbObst = new Array();
var tbTunnels = new Array();
var id = 0;
var idTunnel = 0;
var selObst = -1;
var rotate = false;
var rotateCote = "";
var decalX = 0;
var decalY = 0;
var afficheCercle = false;
var DIAM_ROND_SELECTION = 7;
var DIAM_BARRE_SLALOM = 1.5;
var DIAM_ROND_SELECTION_TUNNEL = 3;
var overNumeroId = -1;
var overNumeroId2 = -1;
var overNumeroId3 = -1;
var overObject = -1;
var canvas_x;
var canvas_y;

var longueurMetre;

//COULEURS
var COLOR_1 = "#22AAFF"; // principale
var COLOR_1b = "#0088DD"; // principale sombre

var COLOR_2 = "#CC3300"; // zones
var COLOR_2b = "#AA1100"; // zones sombre

var COLOR_3 = "#EEEEEE"; // couleur barre 2

var color = false;

var COLOR_CONTOURS = "#000000"; // contours
var COLOR_JOINTURES = "#444444"; // jointures entre éléments
var COLOR_TERRAIN = "#d3e4f0"; // terrain CCFFCC

var COLOR_GRILLE = "#bbbbbb"; // grilles
var COLOR_METAL = "#999999"; // grilles
var COLOR_BLANC = "#ffffff"; // grilles

var COLOR_TEXT = "#000000"; // grilles
var COLOR_TEXT_UNDER = "rgba(211, 228, 240, 0.7)"; // grilles
var COLOR_SPECIAL = "rgba(255, 255, 255, 1)"; // grilles
var COLOR_TRACE_MAUVAIS = "#DD0000";
var COLOR_TRACE_OK = "#555555";
var COLOR_JAUNE = "#ffff00";
var COLOR_TRACE_TRANSPARENT = "rgba(44, 44, 44, 0.3)"; // grilles
var COLOR_PEAU = "#ffff88";
var COLOR_CHEVEUX = "black";
var COLOR_VETEMENTS = "#CC3300";

////////////////////////////////////////////////
var LARGEUR_MUR_TOUR = 40;
var unite = 1;
var TAILLE_GRILLAGE = ((100 / pixel) * 2) / unite;
var MARGE = 25;
var ANGLE_MIN = 145;
var DIAM_BARRE = 1.5;
var nbArticulationTunnel = 9;
var distMaxTunnel = 600 / (nbArticulationTunnel - 1) / pixel;
var distMinTunnel = 400 / (nbArticulationTunnel - 1) / pixel;
var distMinTunnel3 = 300 / (nbArticulationTunnel - 1) / pixel;
var distMaxTunnel3 = 400 / (nbArticulationTunnel - 1) / pixel;
var largeurTunnel = 63 / pixel;
var selTunnel = -1;
var selPointTunnel = -1;
var overTunnelId = -1;
var overPointTunnel = -1;
var overTunnelComplet = -1;
var selTunnelComplet = -1;
var angleSurplus = 0;
var trajectoire = true;
// dimension des obstacles
var moveTunnelComplet = -1;
var suppression = false;
var DIM_TABLE = 120 / pixel;
var ordreObst = new Array();
var idOrdre = 0;
var longueurTotal = 0;

var auteur = "";
var titre = "";
var listeNumero = new Array();
var listeNumero2 = new Array();
var listeNumero3 = new Array();
var nextNumber = 1;
var nextNumber2 = 1;
var nextNumber3 = 1;
var selNumeroId = -1;
var selNumeroId2 = -1;
var selNumeroId3 = -1;
var idLg = 0;
var LARGEUR_NUMERO = 13;
var HAUTEUR_NUMERO = 9;
var oldx = 0;
var oldy = 0;
var diffx = 0;
var diffy = 0;
var DECAL_X_INTERFACE = 120;
var DECAL_Y_INTERFACE = 90;

var modifTrajId = -1;
var modifTrajDepArr = -1;

var overModifTrajId = -1;
var overModifTrajDepArr = -1;

var langues = new Array();
var scale = 1.2;
//var scale=3;//PROVISOIRE

var canvasSizeX = 0;
var canvasSizeY = 0;

var isTactil = false;
var RECT_MARGE_SELECTION = 0;
var DIAM_ROND_SELECTION_TUNNEL_MOVE;
var LARGEUR_NUMERO_SELECT;
var HAUTEUR_NUMERO_SELECT;
var ROTATE_MARGE_SELECTION;
function init() {
    document.getElementById("longueurParcours").value = "22";
    document.getElementById("largeurParcours").value = "40";
    document.getElementById("echelle").value = "2";
    canvas = document.getElementById("canvas");
    unite = document.getElementById("uniteMesure").value;
    context = canvas.getContext("2d");
    context.scale(scale, scale);
    changeUniteMesure();
    changeLargeur();
    changeLongueur();
    setMargeSelect();
    /*
	COLOR_TERRAIN=context.createLinearGradient(0,0,canvasSizeX,0);
	COLOR_TERRAIN.addColorStop(0,"#d3e4f0");
	COLOR_TERRAIN.addColorStop(1,"#c3d4e0");
	COLOR_BLANC=context.createLinearGradient(0,0,canvasSizeX,0);
	COLOR_BLANC.addColorStop(0,"#eeeeff");
	COLOR_BLANC.addColorStop(1,"white");*/
    //canvasSizeX= canvas.width;
    //canvasSizeY= canvas.height;
    // Attach the mousemove event handler
    context.font = "8pt Calibri";
    genererParcours();
    window.addEventListener("mousemove", doMouseMove, false);
    canvas.addEventListener("mousedown", doMouseDown, false);

    canvas.addEventListener("touchstart", doTouchStart, false);
    initLangue();

    genererParcours();
}
