
function disableImg(img) {
    
	var img1 = document.getElementById(img);
	img1.style.display = "none";
}

function enableImg(img) {
   
	var img1 = document.getElementById(img);
	img1.style.display = "block";
}

function toggleImgSize(img) {
    var img1 = document.getElementById(img);
    
    if (img1.dataset.setting == "max") {
        // going to become large
        img1.title = "Click to Enlarge";
        img1.style.width = '10%';
        img1.style.height = '10%';
        img1.dataset.setting = "min";
    } else {
        // going to become small
        img1.title = "Click to Minimize";
        img1.style.width = 'auto';
        img1.style.height = 'auto';
        img1.dataset.setting = "max";
    }
    
}

function hoverText(textID) {
    var txt = document.getElementByID(textID);
    
}