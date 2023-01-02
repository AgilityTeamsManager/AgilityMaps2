function masquerTout() {
    document.getElementById("blocOSav").className = "blocOptions";
    document.getElementById("blocOObst").className = "blocOptions";
    document.getElementById("blocOTrj").className = "blocOptions";
    document.getElementById("blocOParam").className = "blocOptions";
    document.getElementById("blocOLangue").className = "blocOptions";
    document.getElementById("blocOCon").className = "blocOptions";
    document.getElementById("imgParam").src = "images/paramBW.png";
    document.getElementById("imgTrj").src = "images/trjBW.png";
    document.getElementById("imgSav").src = "images/savBW.png";
    document.getElementById("imgObs").src = "images/obstaclesBW.png";
    document.getElementById("imgCon").src = "images/conducteurBW.png";

    // barre d'outils
    document.getElementById("outils").style.display = "none";
    document.getElementById("barreOConduct").style.display = "none";
    document.getElementById("barreOParam").style.display = "none";
    document.getElementById("barreOTraj").style.display = "none";
    document.getElementById("barreOSav").style.display = "none";
    document.getElementById("barreOLangue").style.display = "none";

    document.getElementById("blocInfoDim2").style.display = "none";
    masquerLangue();
}
function setInfoSauvegarde() {
    masquerTout();
    document.getElementById("barreOSav").style.display = "block";
    //document.getElementById("blocOSav").className="blocOptionsSel";
    document.getElementById("imgSav").src = "images/sav.png";
}

function setInfoTrajectoires() {
    masquerTout();
    //document.getElementById("blocOTrj").className="blocOptionsSel";
    document.getElementById("imgTrj").src = "images/trj.png";
    document.getElementById("barreOTraj").style.display = "block";
}

function setInfoConducteur() {
    masquerTout();
    document.getElementById("barreOConduct").style.display = "block";
    document.getElementById("imgCon").src = "images/conducteur.png";
    //document.getElementById("blocOCon").className="blocOptionsSel";
}
function setInfoObstacles() {
    masquerTout();
    //document.getElementById("outils").className="blocOptionsSel";
    document.getElementById("outils").style.display = "block";
    document.getElementById("imgObs").src = "images/obstacles.png";
}
function setInfoParam() {
    masquerTout();
    //document.getElementById("blocOParam").className="blocOptionsSel";
    document.getElementById("imgParam").src = "images/param.png";
    document.getElementById("barreOParam").style.display = "block";
    document.getElementById("blocInfoDim2").style.display = "block";
}
