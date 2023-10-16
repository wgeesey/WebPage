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
   
	loadCart()
	Loads what is in the current cart from memory., creates rows to display it as well as a delete button.
	
	updateOrder(no)
	Receives argument to associate the delete button with a specified index to delete that item from memory,
	then reload the page to update what is displayed.
	
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
	var orderForm = document.forms.orderForm; 
	orderForm.elements.orderDate.value = new Date().toDateString ();
	
	loadCart();
});

function loadCart() {
	
	var subTotCost = 0;
	
	for (var i = 0; i < orderArray.length; i++){
		
		var ele = document.createElement('tr');
		ele.setAttribute("id","row"+i);
		var prod = document.createElement('td');
		var cake = document.createElement('td');
		var frost = document.createElement('td');
		var can = document.createElement('td');
		var quant = document.createElement('td');
		var sub = document.createElement('td');
		var subtotal = parseFloat(orderArray[i][4] * orderArray[i][5]);
	
		var deleteBtn = document.createElement('td');
		var delBtn = document.createElement('input');
		var subTotal = parseFloat(subtotal);
		
		main.appendChild(ele);
		ele.appendChild(prod);
		ele.appendChild(cake);
		ele.appendChild(frost);
		ele.appendChild(can);
		ele.appendChild(quant);
		ele.appendChild(sub);
		ele.appendChild(deleteBtn);
		deleteBtn.appendChild(delBtn);
		
	    prod.innerHTML = orderArray[i][0];
		cake.innerHTML = orderArray[i][1];
		frost.innerHTML = orderArray[i][2];
		can.innerHTML = orderArray[i][3];
		quant.innerHTML = orderArray[i][5];
		sub.innerHTML = formatUSCurrency(subtotal);
		sub.setAttribute("id","subTot");
		delBtn.setAttribute("type","button");
		delBtn.setAttribute("id","deleteButton");
		delBtn.setAttribute("onclick","updateOrder(" +i+")");
		delBtn.setAttribute("value","Delete Item");

		subTotCost = parseFloat(subTotCost) + parseFloat(subTotal);
		var total = formatUSCurrency(subTotCost);
		orderForm.elements.subtotal.value = total;
		var salesTax = 0.05 * parseFloat(subTotCost);
		var sTax = formatUSCurrency(salesTax);
		orderForm.elements.salesTax.value = sTax;
		console.log(salesTax, total);
		var gTotal = salesTax + subTotCost;
		var grandTotal = formatUSCurrency(gTotal);
		orderForm.elements.totalCost.value = grandTotal;
	}	
		
}

function updateOrder(no) {
	orderArray.splice(no, 1);
	sessionStorage.setItem('orderArray', JSON.stringify(orderArray));
	var data = sessionStorage.getItem('orderArray');
	data = JSON.parse(data);
	
	location.reload();
}

function formatNumber(val, decimals){ 
	return val.toLocaleString(undefined, {minimumFractionDigits: decimals, maximumFractionDigits: decimals}); 
}

function formatUSCurrency(val){
	return val.toLocaleString("en-US", {style: "currency", currency: "USD"} );
}