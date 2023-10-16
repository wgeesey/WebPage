"use strict";

/*
     Order Form Script
   
   Author: William Geesey
   Date:   8/4/2023
   
   Filename: commerce_order.js
   
   Function List
   =============
   
   editDisplay()
	calls picSwap and calcOrder when the product is changed
	
   addToOrder()
	write to SessionMemory the current items/options/quantity/price and displays the cart total	
   
   calcOrder()
      Calculates the cost of the current item/quantity
    
   picSwap()
	edits the currently displayed image based off the seelcted product.
	
   formatNumber(val, decimals)
      Format a numeric value, val, using the local
      numeric format to the number of decimal
      places specified by decimals
      
   formatUSCurrency(val)
      Formats val as U.S. currency
   
*/

var orderArray = [];

window.addEventListener ("load", function() { 
	var orderForm = document.forms.orderForm; 
	orderForm.elements.orderDate.value = new Date().toDateString ();
	
	//Event handles for the web Form
	orderForm.elements.addToCart.onclick = addToOrder;
	orderForm.elements.qty.onchange = calcOrder;
	orderForm.elements.product.onchange = editDisplay;

	
	var imgSwap = document.getElementById("productPic");
	imgSwap.src = "pinata1.png";
});

function editDisplay() {
	picSwap();
	calcOrder();
}
	

function addToOrder() {
	var productArray = ["Pi&#241;ata Cake", "Pi&#241;ata Cupcake"];
	var cakeArray = ["Chocolate Cake", "Vanilla Cake", "Yellow Cake"];
	var frostingArray = ["Chocolate Frosting", "Vanilla Frosting"];
	var candyArray = ["MandMs", "Reese\'s Pieces", "Sprinkles"];
	var priceArray = ["29.95", "19.99"];
	var array = [];
	var pIndex = orderForm.elements.product.selectedIndex;
	var cakeIndex = orderForm.elements.cake.selectedIndex;
	var fIndex = orderForm.elements.frosting.selectedIndex; 
	var candyIndex = orderForm.elements.candy.selectedIndex;
	var quantity = orderForm.elements.qty.selectedIndex;
	var cartTotal = 0;
	
	array = [productArray[pIndex], cakeArray[cakeIndex], frostingArray[fIndex], candyArray[candyIndex], priceArray[pIndex], quantity];
	orderArray.push(array);
	
	console.log(orderArray);
	window.sessionStorage.setItem('orderArray', JSON.stringify(orderArray));
	
	for (var i = 0; i < orderArray.length; i++) {
		cartTotal += orderArray[i][4] * orderArray[i][5];
		
		orderForm.elements.carttotal.value = formatUSCurrency(cartTotal);
	}
	

}
	
function calcOrder() { 

	var priceArray = ["29.95", "19.99"];
	
	var pIndex = orderForm.elements.product.selectedIndex;
	var quantity = orderForm.elements.qty.selectedIndex;
	var cost = 0;
	
	cost += priceArray[pIndex] * quantity;
	orderForm.elements.subtotal.value = formatUSCurrency(cost);
}

function picSwap() {
	var priceArray = ["PinataCake.png", "PinataCupcake.png"];
	var pIndex = orderForm.elements.product.selectedIndex;
	var imgSwap = document.getElementById("productPic");
	
	switch (pIndex) {
		case 0:
			imgSwap.src = "pinata1.png";
			break;
		case 1:
			imgSwap.src = "PinataCupcake.png";
			break;
	}
	
}

function formatNumber(val, decimals){ 
	return val.toLocaleString(undefined, {minimumFractionDigits: decimals, maximumFractionDigits: decimals}); 
}

function formatUSCurrency(val){
	return val.toLocaleString("en-US", {style: "currency", currency: "USD"} );
}