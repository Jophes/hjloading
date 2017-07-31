
function randomBackground() {
    var mapId = 1 + Math.floor(Math.random() * 9);
    document.getElementsByTagName('body')[0].style = 'background-image: url(resources/backgrounds/' + mapId + '.jpg);';
}

window.addEventListener('load', randomBackground);

var barObj, statusObj, percentageObj, totalFiles = 1, filesNeeded = 1, progress = 0.0;

function GameDetails(servername, serverurl, mapname, maxplayers, steamid, gamemode) {
    document.getElementById('map').innerHTML = mapname;
    document.getElementById('gamemode').innerHTML = gamemode;
    //document.getElementById('steamid').innerHTML = steamid;
    //document.getElementById('slots').innerHTML = maxplayers;

    barObj = document.getElementById('bar');
    statusObj = document.getElementById('status');
    percentageObj = document.getElementById('percentage');

    randomBackground();
}

function SetFilesTotal(total) {
    totalFiles = Math.max(0, total);
}

function SetFilesNeeded(needed) {
    filesNeeded = Math.max(0, needed);
}

function updateProgress() {
    var filesRemaining = Math.max(0, totalFiles - filesNeeded), progress = (totalFiles > 0) ? (filesRemaining / totalFiles) : 1;
    progress = Math.round(progress * 100);
    percentageObj.innerHTML = progress + '%';
    barObj.style.width = progress + '%';
}

function changeStatus(status) {
    statusObj.innerHTML = status;
}

function SetStatusChanged(status) {
    if (status === 'Sending client info...') {
        filesNeeded = 0;
        updateProgress();
    }
    changeStatus(status);
}

function DownloadingFile(fileName) {
    filesNeeded = Math.max(0, filesNeeded - 1);
    updateProgress();

    var status = 'Downloading' + fileName + '...';
    changeStatus(status);
}