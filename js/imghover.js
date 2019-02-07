
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
        
        img1.style.maxWidth = "30%";
        img1.style.maxHeight = "30%";
        
        //var values = downsize(img1, 0.3);
        //img1.style.maxWidth = values[0] + "px";
        //img1.style.maxHeight = values[1] + "px";
        
        img1.dataset.setting = "min";
        
    } else {
        // going to become small
        img1.title = "Click to Minimize";
        
        img1.style.maxWidth = "100%";
        img1.style.maxHeight = "100%";
        
        //var values = upsize(img1)
        //img1.style.width = values[0] + "px";
        //img1.style.height = values[1] + "px";
        
        img1.dataset.setting = "max";
        
    }
    
}

// depreceated functions
// percentages handle it pretty well
/*
// img should be an Image
function upsize(img) {
    var natW = img.naturalWidth;
    var natH = img.naturalHeight;
    
    //alert(natW);
    
    var aspRat;
    
    var retW = 0;
    var retH = 0;
    
    if (natW > window.innerWidth * 0.9) {
        retW = window.innerWidth * 0.9;
        aspRat = retW / natW;
        
        retH = natH * 0.9 * aspRat;
    } else {
        retW = natW;
        retH = natH;
    }
    
    return [retW, retH];
    
}

// img is an image, factor is the size % we're downscaling to
function downsize(img, factor) {
    var natW = img.naturalWidth;
    var natH = img.naturalHeight;
    
    var aspRat;
    
    var retW = 0;
    var retH = 0;
    
    if (natW > window.innerWidth) {
        retW = window.innerWidth * 0.9 * factor;
        
        aspRat = retW / natW;
        
        retH = natH * 0.9 * aspRat * factor;
    } else {
        retW = natW * factor;
        
        aspRat = retW / natW;
        
        retH = natH * factor;
    }
    
    // if it's less than (minsize)% [default: 15%] of the page resize accordingly, that's too small
    var minSize = 0.15;
    
    if (retW < window.innerWidth * minSize) {
        retW = window.innerWidth * minSize;
        aspRat = retW / natW;
        retH = natH * aspRat;
    }
    
    return [retW, retH];
    
}

function hoverText(textID) {
    var txt = document.getElementByID(textID);
    
}
*/

window.onload = function() {
    var imgList = document.getElementsByClassName("img");
    var i;
    
    for (i = 0; i < imgList.length; i++) {
        
        imgList[i].addEventListener("click", function() { 
            // in an event listener "this" refers to the calling HTML element
            // as such we can use it to get the attribute
            var imgID = this.getAttribute("id");
            toggleImgSize( imgID ); 
        } );
        
        //var values = downsize(imgList[i], 0.3);
        var values = "30%";
        
        imgList[i].dataset.setting = "min";
        //imgList[i].style.width = values[0] + "px";
        //imgList[i].style.height = values[1] + "px";
        
        imgList[i].style.maxWidth = values;
        imgList[i].style.maxHeight = values;
        
        
        
        imgList[i].title = "Click to Enlarge";
    }
    
    
}