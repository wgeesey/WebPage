"use strict";

/*
   New Perspectives on HTML5, CSS3, and JavaScript 6th Edition
   Tutorial 13
   Tutorial Case

   Payment Form Script
   
   Author: William Geesey
   Date:   7/18/2023
   
   Filename: co_payment.js
   
   Function List
   =============
   
   runSubmit()
      Runs validation tests when the submit button is clicked
      
   validateCVC()
      Validates the credit card CVC number
      
   validateMonth()
      Validates that the user has selected the expiration month of the credit card
      
   validateYear()
      Validates that the user has selected the expiration year of the credit card
      
   validateNumber()
      Validates that the user has entered a valid and legitimate card number
      
   validateCredit()
      Validates that the user has selected a credit card type
      
   validateName()
      Validates that the user has specified the name on the credit card
      
   sumDigits(numStr)
      Sums the digits characters in a text string
      
   luhn(idNum)
      Returns true of idNum satisfies the Luhn Algorithm
	  
	formatNumber(val, decimals)
	Formats the argument into a number with (, decimals) dictating the number of decimal positions.
	
	formatUSCurrency(val)
	Formats the argument into USD.

*/
var orderArray = [];
var data = sessionStorage.getItem('orderArray');
data = JSON.parse(data);
var main = document.getElementById('orderTable');
orderArray = data;

window.addEventListener("load", function() { 

	var orderForm = document.forms.order; 
	orderForm.elements.orderDate.value = new Date().toDateString ();
	
	// // Retrieve the field/value pairs from the URL - leave these in case of a future change
	// var formData = location.search.slice(1);
	// formData = formData.replace(/\+/g, " ");
	// formData = decodeURIComponent(formData);
	// var formFields = formData.split(/[&=]/g);
	
	// //Write the field values to the order form 
	// document.forms.order.elements.orderDate.value = formFields[1];
	// document.forms.order.elements.productType1.value = formFields[3];
	// document.forms.order.elements.cakeFlavor1.value = formFields[5];	
	// document.forms.order.elements.frostingFlavor1.value = formFields[7];
	// document.forms.order.elements.candyType1.value = formFields[9];	
	// document.forms.order.elements.qty1.value = formFields[11];
	
	// document.forms.order.elements.productType2.value = formFields[13];
	// document.forms.order.elements.cakeFlavor2.value = formFields[15];	
	// document.forms.order.elements.frostingFlavor2.value = formFields[17];
	// document.forms.order.elements.candyType2.value = formFields[19];	
	// document.forms.order.elements.qty2.value = formFields[21];	
	
	// document.forms.order.elements.subtotal.value = formFields[23]; 
	// document.forms.order.elements.salesTax.value = formFields[25]; 
	// document.forms.order.elements.totalCost.value = formFields[27];
	
	loadCart();
});

window.addEventListener("load", function() {
	document.getElementById("subButton").onclick = runSubmit; //calls runSubmit when Submit Payment clicked
	document.getElementById("cardName").onclick = validateName; //Calls validateName when data input in cardName field
	document.getElementById("cardNumber").oninput = validateNumber; // Called when user types into cardNumber field
	document.getElementById("expMonth").onchange = validateMonth; //Called when user changes the option in the selection list
	document.getElementById("expYear").onchange = validateYear; //Called when user changes the option in the selection list
	document.getElementById("cvc").oninput = validateCVC;
	
});

function loadCart() {
	
	var subTotCost = 0;
	
	for (var i = 0; i < orderArray.length; i++){
		
		// - leave commented-out lines in case of a future change
		// var ele = document.createElement('tr');
		// ele.setAttribute("id","row"+i);
		// var prod = document.createElement('td');
		// var cake = document.createElement('td');
		// var frost = document.createElement('td');
		// var can = document.createElement('td');
		// var quant = document.createElement('td');
		// var sub = document.createElement('td');
		var subtotal = parseFloat(orderArray[i][4] * orderArray[i][5]);
	
		// var deleteBtn = document.createElement('td');
		// var delBtn = document.createElement('input');
		var subTotal = parseFloat(subtotal);
		
		// main.appendChild(ele);
		// ele.appendChild(prod);
		// ele.appendChild(cake);
		// ele.appendChild(frost);
		// ele.appendChild(can);
		// ele.appendChild(quant);
		// ele.appendChild(sub);
		// ele.appendChild(deleteBtn);
		// deleteBtn.appendChild(delBtn);
		
	    // prod.innerHTML = orderArray[i][0];
		// cake.innerHTML = orderArray[i][1];
		// frost.innerHTML = orderArray[i][2];
		// can.innerHTML = orderArray[i][3];
		// quant.innerHTML = orderArray[i][5];
		// sub.innerHTML = formatUSCurrency(subtotal);
		// sub.setAttribute("id","subTot");
		// delBtn.setAttribute("type","button");
		// delBtn.setAttribute("id","deleteButton");
		// delBtn.setAttribute("onclick","updateOrder(" +i+")");
		// delBtn.setAttribute("value","Delete Item");

		subTotCost = parseFloat(subTotCost) + parseFloat(subTotal);
		var total = formatUSCurrency(subTotCost);
		document.getElementById("subtotal").value = total;
		var salesTax = 0.05 * parseFloat(subTotCost);
		var sTax = formatUSCurrency(salesTax);
		document.getElementById("salesTax").value = sTax;
		// console.log(salesTax, total);
		var gTotal = salesTax + subTotCost;
		var grandTotal = formatUSCurrency(gTotal);
		document.getElementById("totalCost").value = grandTotal;
	}	
		
}

//Runs when Submit Payment button clicked
function runSubmit() {
	validateName();
	validateCredit();
	validateNumber();
	validateMonth();
	validateYear();
	validateCVC();
}

//Verifies the correct CVC pattern is entered for the card selected
function validateCVC() { 
	var cardCVC = document.getElementById("cvc"); 
	var creditCard = document.querySelector('input[name="credit"]:checked').value; //Gets the value of the checked card (which card option)
	if (cardCVC.validity.valueMissing){ 
		cardCVC.setCustomValidity("Enter your CVC number"); 
	} else if ((creditCard === "amex") && (/^\d{4}$/.test(cardCVC.value) === false)) { 
		cardCVC.setCustomValidity("Enter a 4-digit CVC number"); 
	} else if ((creditCard !== "amex") && (/^\d{3}$/.test(cardCVC.value) === false)) { 
		cardCVC.setCustomValidity("Enter a 3-digit CVC number"); 
	} else { 
		cardCVC.setCustomValidity (""); 
	} 
}

function validateMonth() { 
	var cardMonth = document.getElementById("expMonth"); 
	if (cardMonth.selectedIndex === 0){ // if the first option is selected (mm) = invalid and display error message below
		cardMonth.setCustomValidity("Select the expiration month"); 
	} else { 
		cardMonth.setCustomValidity(""); //if option other than the first (mm) = invalid
	} 
}

function validateYear() { 
	var cardYear = document.getElementById("expYear"); 
	if (cardYear.selectedIndex === 0){  // if the first option is selected (yy) = invalid and display error message below
		cardYear.setCustomValidity("Select the expiration year"); 
	} else { 
		cardYear.setCustomValidity(""); //if option other than the first (yy) = invalid
	} 
}

function validateNumber() { 
	var cardNumber = document.getElementById("cardNumber"); 
	if(cardNumber.validity.valueMissing){ 
		cardNumber.setCustomValidity("Enter your card number"); //Custom error message for no card number
	} else if (cardNumber.validity.patternMismatch){ //Test for mismatch card number pattern
		cardNumber.setCustomValidity("Enter a valid card number"); //Message for when invalid number entered
	} else if (luhn(cardNumber.value) === false) { 
		cardNumber.setCustomValidity("Enter a legitimate card number"); 
	} else { 
		cardNumber.setCustomValidity(""); //no message for valid number/entry
	} 
}

function validateCredit() {
	var creditCard = document.forms.payment.elements.credit[0];
	if (creditCard.validity.valueMissing) { //Tests first option button for missing value (applied to first = applied to all)
		creditCard.setCustomValidity("Select your credit card"); //Custom error message
	} else {
		creditCard.setCustomValidity(""); //No message if a card is selected
	}
}

//Function to validate the name field (Credit Card cardholder name)
function validateName() {
	var cardName = document.getElementById("cardName");
	
	//Tests if the required value is missing from the cardName field.
	if (cardName.validity.valueMissing) {
		cardName.setCustomValidity("Enter your name as it appears on the card"); //Custom message
	} else {
		cardName.setCustomValidity(""); //Empty string field = no popup error message
	}
}

//Sums the digits to use in Luhn Algorithm

function sumDigits(numStr) { // numStr holds the ID/number to be used
	var digitTotal = 0; 
	for (var i = 0; i < numStr.length; i++) { 
		digitTotal += parseInt(numStr.charAt(i)); 
	} 
	return digitTotal; 
}

// //Luhn Algorithm - adds 2 groups of digits, doubling the the values of the individual digit in the second set
function luhn(idNum) {
	//variable to hold the groups of digits
	var string1 = "";
	var string2 = "";
	
	//Retrieve the odd-numbered digits 
	for (var i = idNum.length - 1; i >= 0; i-= 2) { 
		string1 += idNum.charAt(i); 
	}
	
	//Retrieve the even-numbered digits and double them 
	for (var i = idNum.length - 2; i >= 0; i-= 2) { 
		string2 += 2 * idNum.charAt(i); 
	}
	
	//Return whether the sum of the digits is divisible by 10 
	return sumDigits(string1 + string2) % 10 === 0;  
}

function formatNumber(val, decimals){ 
	return val.toLocaleString(undefined, {minimumFractionDigits: decimals, maximumFractionDigits: decimals}); 
}

function formatUSCurrency(val){
	return val.toLocaleString("en-US", {style: "currency", currency: "USD"} );
}