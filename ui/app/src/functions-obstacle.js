// GETTERS 

function getId(idObstacle){
	return tbObst[idObstacle][0];
}
function getCanvasX(idObstacle){
	return tbObst[idObstacle][1];
}
function getCanvasY(idObstacle){
	return tbObst[idObstacle][2];
}
function getSens(idObstacle){// aussi le nom et l'image
	return tbObst[idObstacle][3];;
}
function getXCliquable(idObstacle){
	return tbObst[idObstacle][4];
}
function getYCliquable(idObstacle){
	return tbObst[idObstacle][5];
}
function getAngle(idObstacle){
	return tbObst[idObstacle][6];
}
function getType(idObstacle){
	return tbObst[idObstacle][7];
}
function getModXTrajEntree(idObstacle){
	return tbObst[idObstacle][8];
}
function getModYTrajEntree(idObstacle){
	return tbObst[idObstacle][9];
}
function getModXTrajSortie(idObstacle){
	return tbObst[idObstacle][10];
}
function getModYTrajSortie(idObstacle){
	return tbObst[idObstacle][11];
}
function getAngleTrajSortie(idObstacle){
	return tbObst[idObstacle][12];
}
function getDistTrajCentre(idObstacle){
	return tbObst[idObstacle][13];
}
function getLongTraj(idObstacle){
	return tbObst[idObstacle][14];
}

// SETTERS

function setId(idObstacle,valeur){
	tbObst[idObstacle][0] = valeur;
}
function setCanvasX(idObstacle,valeur){
	tbObst[idObstacle][1] = valeur;
}
function setCanvasY(idObstacle,valeur){
	tbObst[idObstacle][2] = valeur;
}
function setImg(idObstacle,valeur){
	tbObst[idObstacle][3] = valeur;
}
function setXCliquable(idObstacle,valeur){
	tbObst[idObstacle][4] = valeur;
}
function setYCliquable(idObstacle,valeur){
	tbObst[idObstacle][5] = valeur;
}
function setAngle(idObstacle,valeur){
	tbObst[idObstacle][6] = valeur;
}
function setType(idObstacle,valeur){
	tbObst[idObstacle][7] = valeur;
}
function setModXTrajEntree(idObstacle,valeur){
	tbObst[idObstacle][8] = valeur;
}
function setModYTrajEntree(idObstacle,valeur){
	tbObst[idObstacle][9] = valeur;
}
function setModXTrajSortie(idObstacle,valeur){
	tbObst[idObstacle][10] = valeur;
}
function setModYTrajSortie(idObstacle,valeur){
	tbObst[idObstacle][11] = valeur;
}
function setAngleTrajSortie(idObstacle,valeur){
	tbObst[idObstacle][12] = valeur;
}
function setDistTrajCentre(idObstacle,valeur){
	tbObst[idObstacle][13] = valeur;
}
function setLongTraj(idObstacle,valeur){
	tbObst[idObstacle][14] = valeur;
}

// TUNNELS



function getIdTunnel(idTunnel){
	return tbTunnels[idTunnel][0];
}

function setIdTunnel(idTunnel,valeur){
	tbTunnels[idTunnel][0] = valeur;
}

//NUMEROS

function getIdNumero(idNum, numListe){
switch(numListe){
	case 1:
	return listeNumero[idNum][0];
	case 2:
	return listeNumero2[idNum][0];
	case 3:
	return listeNumero3[idNum][0];
	}
}
function getXNumero(idNum, numListe){
	return listeNumero[idNum][1];
}
function getYNumero(idNum, numListe){
	return listeNumero[idNum][2];
}

function setIdNumero(idNum,valeur, numListe){
	switch(numListe){
		case 1:
			listeNumero[idNum][0]=valeur;
		break;
		case 2:
			listeNumero2[idNum][0]=valeur;
		break;
		case 3:
			listeNumero3[idNum][0]=valeur;	
		break;
	}
}
function setXNumero(idNum,valeur, numListe){
	switch(numListe){
		case 1:
			listeNumero[idNum][1]=valeur;
		break;
		case 2:
			listeNumero2[idNum][1]=valeur;
		break;
		case 3:
			listeNumero3[idNum][1]=valeur;	
		break;
	}
}
function setYNumero(idNum,valeur, numListe){
	switch(numListe){
		case 1:
			listeNumero[idNum][2]=valeur;
		break;
		case 2:
			listeNumero2[idNum][2]=valeur;
		break;
		case 3:
			listeNumero3[idNum][2]=valeur;	
		break;
	}
}
