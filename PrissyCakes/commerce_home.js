"use strict";

/*
   Author: William Geesey
   Date:   8/7/2023
   
   Filename: commerce_home.js
   

	For the home page of my e-commerce site.
*/

// Alternates the images on the home page.
window.addEventListener("load", function() {
	
	var image = document.getElementById("image");
	var images = ["pinata1.png","pinata2.png", "pinata3.png", "PinataCake.png"];
	var index = 0;
	setInterval(function() {
		if (index < images.length) {
			image.src = images[index];
			index++;
		}		
}, 4000);
});