
function disableImg(img) {
    
	var img1 = document.getElementById(img);
	img1.style.display = "none";
}

function enableImg(img) {
   
	var img1 = document.getElementById(img);
	img1.style.display = "block";
}

function toggleImg(img, txt1) {
    
    var img1 = document.getElementById(img);
    var txt = document.getElementById(txt1);
    
    if (img1.style.display == "none") {
        img1.style.display = "block";
        txt.innerHTML = "Close Picture";
    } else {
        img1.style.display = "none";
        txt.innerHTML = "Open Picture";
    }
    
}

function toggleVideo(vid, txt1) {
    var img1 = document.getElementById(vid);
    var txt = document.getElementById(txt1);
    
    if (img1.style.display == "none") {
        //alert("true");
        img1.style.display = "block";
        txt.innerHTML = "Close Video";
    } else {
        //alert("false");
        img1.style.display = "none";
        txt.innerHTML = "Open Video";
    }
}