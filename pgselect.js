//General Functions for online Script
$(function () {

    if (typeof localStorage.data === 'undefined') {
        localStorage.data = JSON.stringify(defaultData);
        localStorage.productList = JSON.stringify(defaultListOfProducts);
    }


    data = JSON.parse(localStorage.data);
    productList = JSON.parse(localStorage.productList);

    $('#channel').change(function () {
        populateSelect();
		
    });
	
	
});

//Tab DPSM Functions
function populateSelect() {
    var channel = $('#channel').val();
    var region = $('#region').val();
    $('#subchannel').html('');

    var subChannels = data[region][channel];

    $.each(subChannels, function (index, element) {
        $('#subchannel').append('<option value=' + index + '>' + element.fullname + '</option>');
    });
}

function validateselect() {
    var channel = $('#channel').val();
    var region = $('#region').val();
    var subchannel = $('#subchannel').val();

    
    if ((region !== null) && (subchannel !== null))
    {
        document.getElementById("skulink").setAttribute("href", "#skupage");
		populateTable();
        
		
    }
    else {
        document.getElementById("skulink").setAttribute("href", "#");
        $.afui.toast({message: "Please enter the required details",
            position: "bc",
            delay: 3000});
    }
}

function populateTable(){
	var channel = $('#channel').val();
    var region = $('#region').val();
    var subchannel = $('#subchannel').val();
	//get brands
	var product = [];
	var skulist = [];
	var brand = [];
	var productIDs = data[region][channel][subchannel]['productIDs'];	
	for (index = 0; index < productIDs.length; index++) {
		var individualProductID = productIDs[index];
		product[index] = productList[individualProductID];
		skulist[index] = product[index].toUpperCase();
		brand[index] = product[index].substring(0, product[index].indexOf(" ")).toUpperCase();
	}
	
	//gets the number of each brand
	brandsort = brand;
	brandsort.sort();
	var brandspan = {};
	var current = null;
	var cnt = 0;
	for (var i = 0; i < brandsort.length; i++) {       
        if (brandsort[i] != current) {
            if (cnt > 0) {
                brandspan[current] = cnt;
		}
		current = brandsort[i];
		cnt = 1;
        }
        else {
            cnt++;
        }
	}

	if (cnt > 0) {
        brandspan[current] = cnt;
	}


	//populate the html page
	var tablename = channel + " | " +data[region][channel][subchannel]['fullname'];
	var allProducts = "<table> <tr><th colspan='7'>"+tablename+"</th></tr><tr>"
							+"<th>BRAND</th>"
				+"<th>DESCRIPTION</th>"
				+"<th>D</th>"
							+"<th>P</th>"
							+"<th>S</th>"
							+"<th>M</th></tr>";

	var currentSKU = null;
	for (index = 0; index < skulist.length; index++) {
	  if (skulist[index].substring(0, skulist[index].indexOf(" ")) != currentSKU) {
		allProducts += "<tr>"
            +"<td id='" +skulist[index].substring(0, skulist[index].indexOf(" ")) + "'><img src='default.png'></td>" + "<td>" + skulist[index] + "</td>"
            +"<td><input type='checkbox' class='id_D' id='D"+index+"'><label for='D"+index+"'></label></td>"
			+"<td><input type='checkbox' class='id_P' id='P"+index+"'><label for='P"+index+"' ></label></td>"
			+"<td><input type='checkbox' class='id_S' id='S"+index+"'><label for='S"+index+"' ></label></td>"
			+"<td><input type='checkbox' class='id_M' id='M"+index+"'><label for='M"+index+"'></label></td></tr>";
      }
        else {
		allProducts += "<tr>"
            +"<td>" + skulist[index] + "</td>"
            +"<td><input type='checkbox' class='id_D' id='D"+index+"'><label for='D"+index+"'></label></td>"
            +"<td><input type='checkbox' class='id_P' id='P"+index+"'><label for='P"+index+"'></label></td>"
			+"<td><input type='checkbox' class='id_S' id='S"+index+"'><label for='S"+index+"'></label></td>"
			+"<td><input type='checkbox' class='id_M' id='M"+index+"'><label for='M"+index+"'></label></td></tr>";
        }
        currentSKU = skulist[index].substring(0, skulist[index].indexOf(" "));
	}

	allProducts += "</table>";

	$('#table').html(allProducts);
	editTable(brandspan);
	
}

function editTable(brandspan){
	//edit table attribute
	var valueof = [];
    var y = [];
	var x = document.getElementsByTagName("tr");
	for (i=0;i<x.length; i++){
		y[i] = x[i].innerHTML;
        
	}
    
    function checkindex(f, brand) {
		if (f.indexOf(brand)<0){
		   return false;
		}
		else{ 
			return true;
		}
	}
	
	for (i = 0; i < y.length; i++) {
		
		if ( checkindex( y[i], 'PAMPERS') === true) {
            x[i].style.backgroundColor = "green";
			document.getElementById("PAMPERS").rowSpan = brandspan["PAMPERS"];
			document.getElementById("PAMPERS").innerHTML="<img  src='pampers.png'/>";
		}
        
		if ( checkindex( y[i], 'ARIEL') === true) {
			x[i].style.backgroundColor = "green";
			document.getElementById("ARIEL").rowSpan = brandspan["ARIEL"];
			document.getElementById("ARIEL").innerHTML="<img  src='ariel.png'/>";
		}
		if ( checkindex( y[i], 'ALWAYS') === true) {
			x[i].style.backgroundColor = "#002060";
			document.getElementById("ALWAYS").rowSpan = brandspan["ALWAYS"];
			document.getElementById("ALWAYS").innerHTML="<img  src='always.png'/>";
		}
		if ( checkindex( y[i], 'ORALB') === true) {
			document.getElementById("ORALB").rowSpan = brandspan["ORALB"];
			document.getElementById("ORALB").innerHTML="<img  src='oralb.png'/>";
			x[i].style.backgroundColor = "#002060";
        }
		if ( checkindex( y[i], 'GILLETTE') === true) {
			x[i].style.backgroundColor = "#002060";
			document.getElementById("GILLETTE").rowSpan = brandspan["GILLETTE"];
			document.getElementById("GILLETTE").innerHTML="<img  src='gillette.png'/>";
        }
		if ( checkindex( y[i], 'SAFEGUARD') === true) {
			x[i].style.backgroundColor = "#FFFF00";
			document.getElementById("SAFEGUARD").rowSpan = brandspan["SAFEGUARD"];
			document.getElementById("SAFEGUARD").innerHTML="<img  src='safeguard.png'/>";
		}
		if ( checkindex( y[i], 'VICKS') === true) {
			x[i].style.backgroundColor = "#002060";
			document.getElementById("VICKS").rowSpan = brandspan["VICKS"];
			document.getElementById("VICKS").innerHTML="<img  src='vicks.png'/>";
		}
		if ( checkindex( y[i], 'FAIRY') === true){
			x[i].style.backgroundColor = "green";
			document.getElementById("FAIRY").rowSpan = brandspan["FAIRY"];
			document.getElementById("FAIRY").innerHTML="<img  src='fairy.png'/>";
		} 
	}
}
	
//DPSM Pop-ups
$(document).ready(function() {
	$('.button.widget.clearbox').click(function () {
		$(".id_D").prop("checked",false);
		$(".id_P").prop("checked",false);
		$(".id_S").prop("checked",false);
		$(".id_M").prop("checked",false);
	});
	
	$('.button.widget.calculatebox').click(function () {
		function savebox(){
			$.afui.popup({
				title:"Save Result",
				message: htmlform,
				cancelOnly: true,
				cancelText: "SUBMIT",
				cancelCallback: function(){
			
				}
			});
		}
		var lengthTotal = $('.id_D').length;
		var lengthD = parseInt ($('.id_D:checked').length / (lengthTotal) * 100);
		var lengthP = parseInt ($('.id_P:checked').length / (lengthTotal) * 100);
		var lengthS = parseInt ($('.id_S:checked').length / (lengthTotal) * 100);
		var lengthM = parseInt ($('.id_M:checked').length / (lengthTotal) * 100);
		var avg = parseInt ((lengthD+lengthP+lengthM+lengthS)/4);
		if (avg> 80){
			hype = "<p> <img style='vertical-align:middle' src='thumbsup.png'/>  Magnificent! Keep it up!!!</p>";
		}
		else if (avg > 60){
			hype = "<p> You are almost there!</p>";
		}
		else{
			hype = "<p> <img style='vertical-align:middle' src='sad.png'/>  You can do better</p>";
		}
	
		htmlform = "<div class='formGroupHead'>Information</div><div class='input-group'>"
					+"<div><label for='rdName'>Name of RD:</label><br><input type='text' id='rdName' placeholder='Distributor Name'></div><br>"
                    +"<div><label for='repName'>Name of Rep:</label><br><input type='text' id='repName' placeholder='Name of rep '></div><br>"
                    +"<div><label for='routeName'>Market Route:</label><br><input type='text' placeholder='Market Route' id='routeName'></div><br>"
					+"</div>";
		var popup = $.afui.popup({
			title: "Result",
			message: hype + "<ul class='list'><li style='font-weight: bold'>Average: "+avg+ "%</li><li>Distribution: " + lengthD + "%</li><li>Pricing: " + lengthP +"%</li><li>Shelving: " + lengthS + "%</li><li>Merchanidizing: "+lengthM + "%</li></ul>",
			cancelText: "OK",
			doneText: "SAVE",
			doneCallback: function () {
				savebox();
			},
			cancelOnly: false
		});
		$('#mask').click(function(){
		popup.hide();
		});
	});
		
});


//Tab KSA Functions

$(document).ready(function(){
	
	//delete list item
	$(".list").on("click",".trash",function(obj){
		var $li=$(obj.target).closest("li");
		$li.remove();
	});
		
	//toggle-hide subitem
	$('ul li.swipe-reveal div.swipe-content > div.module')
	.attr('data-active','0')
	.click(function(event){
		$('.subitem').hide();
		var resultKSA = calculateKSA();
		showKSAResult(resultKSA);
		if($(this).attr('data-active')==0){
			$(this).parent().find('ul').slideToggle('fast');
			$(this).attr('data-active','1');
		}
		else
		$(this).attr('data-active','0');        
	});
	
	//pop-up after delete
	$('.ui.button.del').bind("tap",function(){
		$.afui.toast(
		{
			message:"Swipe Left to delete",
			position:"tr",
			delay:2000
		});
	});
	
	//reload the list item
	$('.ui.button.reset').bind("tap",function(){
		document.location.reload(true);
		window.location.hash = '#tab3';
		
	});
	
	//evaluate the KSA result
	$('.ui.button.saveKSA').click(function () {
		var result = calculateKSA();
		
		var popup = $.afui.popup({
			title:"KSA Result",
			message: "<div class='formGroupHead'>Information</div><div class='input-group'>"
							+"<div><label for='rdName'>Name of RD:</label><br><input type='text' id='rdName' placeholder='Distributor Name'></div><br>"
                            +"<div><label for='repName'>Name:</label><br><input type='text' id='repName' placeholder='Name'></div><br>"
                            +"<div><label for='repName'>Role:</label><br><input type='text' id='repName' placeholder='SR/FSS/FSM'></div>"
                        +"</div>",
			cancelOnly: true,
			cancelText: "SUBMIT",
			cancelCallback: function(){
		
			}
		});
		//$('#mask').click(function(){
		//popup.hide();
		//});
		
	});
	
	//enable sublist item
	$('#act1').click(function() {
		if ($(this).is( ":checked" )){
			$('#KN1').removeAttr('disabled');
			$('#SK1').removeAttr('disabled');
		}
		else{
			$("#KN1").attr("disabled", "disabled");
			$("#SK1").attr("disabled", "disabled");
			$("#KN1").attr("checked", false);
			$("#SK1").attr("checked", false);
		}
	});
	$('#act2').click(function() {
		if ($(this).is( ":checked" )){
			$('#KN2').removeAttr('disabled');
			$('#SK2').removeAttr('disabled');
		}
		else{
			$("#KN2").attr("disabled", "disabled");
			$("#SK2").attr("disabled", "disabled");
			$("#KN2").attr("checked", false);
			$("#SK2").attr("checked", false);
		}
	});
	$('#act3').click(function() {
		if ($(this).is( ":checked" )){
			$('#KN3').removeAttr('disabled');
			$('#SK3').removeAttr('disabled');
		}
		else{
			$("#KN3").attr("disabled", "disabled");
			$("#SK3").attr("disabled", "disabled");
			$("#KN3").attr("checked", false);
			$("#SK3").attr("checked", false);
		}
	});
	$('#act4').click(function() {
		if ($(this).is( ":checked" )){
			$('#KN4').removeAttr('disabled');
			$('#SK4').removeAttr('disabled');
		}
		else{
			$("#KN4").attr("disabled", "disabled");
			$("#SK4").attr("disabled", "disabled");
			$("#KN4").attr("checked", false);
			$("#SK4").attr("checked", false);
		}
	});
	$('#act5').click(function() {
		if ($(this).is( ":checked" )){
			$('#KN5').removeAttr('disabled');
			$('#SK5').removeAttr('disabled');
		}
		else{
			$("#KN5").attr("disabled", "disabled");
			$("#SK5").attr("disabled", "disabled");
			$("#KN5").attr("checked", false);
			$("#SK5").attr("checked", false);
		}
	});
	$('#act6').click(function() {
		if ($(this).is( ":checked" )){
			$('#KN6').removeAttr('disabled');
			$('#SK6').removeAttr('disabled');
		}
		else{
			$("#KN6").attr("disabled", "disabled");
			$("#SK6").attr("disabled", "disabled");
			$("#KN6").attr("checked", false);
			$("#SK6").attr("checked", false);
		}
	});
	$('#act7').click(function() {
		if ($(this).is( ":checked" )){
			$('#KN7').removeAttr('disabled');
			$('#SK7').removeAttr('disabled');
		}
		else{
			$("#KN7").attr("disabled", "disabled");
			$("#SK7").attr("disabled", "disabled");
			$("#KN7").attr("checked", false);
			$("#SK7").attr("checked", false);
		}
	});
	$('#act8').click(function() {
		if ($(this).is( ":checked" )){
			$('#KN8').removeAttr('disabled');
			$('#SK8').removeAttr('disabled');
		}
		else{
			$("#KN8").attr("disabled", "disabled");
			$("#SK8").attr("disabled", "disabled");
			$("#KN8").attr("checked", false);
			$("#SK8").attr("checked", false);
		}
	});
	$('#act9').click(function() {
		if ($(this).is( ":checked" )){
			$('#KN9').removeAttr('disabled');
			$('#SK9').removeAttr('disabled');
		}
		else{
			$("#KN9").attr("disabled", "disabled");
			$("#SK9").attr("disabled", "disabled");
			$("#KN9").attr("checked", false);
			$("#SK9").attr("checked", false);
		}
	});
	$('#act10').click(function() {
		if ($(this).is( ":checked" )){
			$('#KN10').removeAttr('disabled');
			$('#SK10').removeAttr('disabled');
		}
		else{
			$("#KN10").attr("disabled", "disabled");
			$("#SK10").attr("disabled", "disabled");
			$("#KN10").attr("checked", false);
			$("#SK10").attr("checked", false);
		}
	});
	$('#act11').click(function() {
		if ($(this).is( ":checked" )){
			$('#KN11').removeAttr('disabled');
			$('#SK11').removeAttr('disabled');
		}
		else{
			$("#KN11").attr("disabled", "disabled");
			$("#SK11").attr("disabled", "disabled");
			$("#KN11").attr("checked", false);
			$("#SK11").attr("checked", false);
		}
	});
	$('#act12').click(function() {
		if ($(this).is( ":checked" )){
			$('#KN12').removeAttr('disabled');
			$('#SK12').removeAttr('disabled');
		}
		else{
			$("#KN12").attr("disabled", "disabled");
			$("#SK12").attr("disabled", "disabled");
			$("#KN12").attr("checked", false);
			$("#SK12").attr("checked", false);
		}
	});
	$('#act13').click(function() {
		if ($(this).is( ":checked" )){
			$('#KN13').removeAttr('disabled');
			$('#SK13').removeAttr('disabled');
		}
		else{
			$("#KN13").attr("disabled", "disabled");
			$("#SK13").attr("disabled", "disabled");
			$("#KN13").attr("checked", false);
			$("#SK13").attr("checked", false);
		}
	});
	$('#act14').click(function() {
		if ($(this).is( ":checked" )){
			$('#KN14').removeAttr('disabled');
			$('#SK14').removeAttr('disabled');
		}
		else{
			$("#KN14").attr("disabled", "disabled");
			$("#SK14").attr("disabled", "disabled");
			$("#KN14").attr("checked", false);
			$("#SK14").attr("checked", false);
		}
	});$('#act14').click(function() {
		if ($(this).is( ":checked" )){
			$('#KN14').removeAttr('disabled');
			$('#SK14').removeAttr('disabled');
		}
		else{
			$("#KN14").attr("disabled", "disabled");
			$("#SK14").attr("disabled", "disabled");
			$("#KN14").attr("checked", false);
			$("#SK14").attr("checked", false);
		}
	});
	$('#act15').click(function() {
		if ($(this).is( ":checked" )){
			$('#KN15').removeAttr('disabled');
			$('#SK15').removeAttr('disabled');
		}
		else{
			$("#KN15").attr("disabled", "disabled");
			$("#SK15").attr("disabled", "disabled");
			$("#KN15").attr("checked", false);
			$("#SK15").attr("checked", false);
		}
	});
	$('#act16').click(function() {
		if ($(this).is( ":checked" )){
			$('#KN16').removeAttr('disabled');
			$('#SK16').removeAttr('disabled');
		}
		else{
			$("#KN16").attr("disabled", "disabled");
			$("#SK16").attr("disabled", "disabled");
			$("#KN16").attr("checked", false);
			$("#SK16").attr("checked", false);
		}
	});
	$('#act17').click(function() {
		if ($(this).is( ":checked" )){
			$('#KN17').removeAttr('disabled');
			$('#SK17').removeAttr('disabled');
		}
		else{
			$("#KN17").attr("disabled", "disabled");
			$("#SK17").attr("disabled", "disabled");
			$("#KN17").attr("checked", false);
			$("#SK17").attr("checked", false);
		}
	});
	$('#act18').click(function() {
		if ($(this).is( ":checked" )){
			$('#KN18').removeAttr('disabled');
			$('#SK18').removeAttr('disabled');
		}
		else{
			$("#KN18").attr("disabled", "disabled");
			$("#SK18").attr("disabled", "disabled");
			$("#KN18").attr("checked", false);
			$("#SK18").attr("checked", false);
		}
	});
	$('#act19').click(function() {
		if ($(this).is( ":checked" )){
			$('#KN19').removeAttr('disabled');
			$('#SK19').removeAttr('disabled');
		}
		else{
			$("#KN19").attr("disabled", "disabled");
			$("#SK19").attr("disabled", "disabled");
			$("#KN19").attr("checked", false);
			$("#SK19").attr("checked", false);
		}
	});
	$('#act20').click(function() {
		if ($(this).is( ":checked" )){
			$('#KN20').removeAttr('disabled');
			$('#SK20').removeAttr('disabled');
		}
		else{
			$("#KN20").attr("disabled", "disabled");
			$("#SK20").attr("disabled", "disabled");
			$("#KN20").attr("checked", false);
			$("#SK20").attr("checked", false);
		}
	});
	
	//calculate KSA checkbox
	function calculateKSA(){
		var numberOfCheckedBoxes_OH = $('.activate.oh:checked').length;
		var numberOfCheckedBoxes_OH_K = $('.KN_oh:checked').length;
		var numberOfCheckedBoxes_OH_S = $('.SK_oh:checked').length;
		var score_OH_K = (numberOfCheckedBoxes_OH_K / numberOfCheckedBoxes_OH * 5).toFixed(1);
		var score_OH_S = (numberOfCheckedBoxes_OH_S / numberOfCheckedBoxes_OH * 5).toFixed(1);
		
		
		var numberOfCheckedBoxes_PSF = $('.activate.psf:checked').length;
		var numberOfCheckedBoxes_PSF_K = $('.KN_psf:checked').length;
		var numberOfCheckedBoxes_PSF_S = $('.SK_psf:checked').length;
		var score_PSF_K = (numberOfCheckedBoxes_PSF_K / numberOfCheckedBoxes_PSF * 5).toFixed(1);
		var score_PSF_S = (numberOfCheckedBoxes_PSF_S / numberOfCheckedBoxes_PSF * 5).toFixed(1);
		
		
		
		var numberOfCheckedBoxes_SOC = $('.activate.soc:checked').length;
		var numberOfCheckedBoxes_SOC_K = $('.KN_soc:checked').length;
		var numberOfCheckedBoxes_SOC_S = $('.SK_soc:checked').length;
		var score_SOC_K = (numberOfCheckedBoxes_SOC_K / numberOfCheckedBoxes_SOC * 5).toFixed(1);
		var score_SOC_S = (numberOfCheckedBoxes_SOC_S / numberOfCheckedBoxes_SOC * 5).toFixed(1);
		
		var numberOfCheckedBoxes_CS = $('.activate.cs:checked').length;
		var numberOfCheckedBoxes_CS_K = $('.KN_cs:checked').length;
		var numberOfCheckedBoxes_CS_S = $('.SK_cs:checked').length;
		var score_CS_K = (numberOfCheckedBoxes_CS_K / numberOfCheckedBoxes_CS * 5).toFixed(1);
		var score_CS_S = (numberOfCheckedBoxes_CS_S / numberOfCheckedBoxes_CS * 5).toFixed(1);
		
		return {
			score_OH_K: score_OH_K, score_OH_S:score_OH_S,
			score_PSF_K: score_PSF_K, score_PSF_S:score_PSF_S,
			score_SOC_K: score_SOC_K, score_SOC_S:score_SOC_S,
			score_CS_K: score_CS_K, score_CS_S:score_CS_S
		};
	}
	
	
	//write KSA Result to List
	function showKSAResult(resultKSA){
		if (document.getElementById('message_OH') !=null){
		document.getElementById("message_OH").innerHTML= 'Knowledge: <b>'+ resultKSA.score_OH_K +' </b><br> Skill: <b>' + resultKSA.score_OH_S + '</b>';
		}
		if (document.getElementById('message_PSF') !=null){
		document.getElementById('message_PSF').innerHTML = 'Knowledge: <b>'+ resultKSA.score_PSF_K +' </b><br> Skill: <b>' + resultKSA.score_PSF_S + '</b>';
		}
		if (document.getElementById('message_SOC') !=null){
		document.getElementById('message_SOC').innerHTML = 'Knowledge: <b>'+ resultKSA.score_SOC_K +' </b><br> Skill: <b>' + resultKSA.score_SOC_S+ '</b>';
		}
		if (document.getElementById('message_CS') !=null){
		document.getElementById('message_CS').innerHTML = 'Knowledge: <b>'+ resultKSA.score_CS_K +' </b><br> Skill: <b>'+ resultKSA.score_CS_S+ '</b>';
		}
	}
	
	//save KSA Result to File
	function saveKSAResult(resultKSA){
		
	}
	
});

//offline script json files
var defaultListOfProducts = { 
	skuID1:'ALWAYS ULTRA NORMAL',
	skuID2:'ALWAYS ULTRA SUPER',
	skuID3:'ALWAYS DUO NORMAL',
	skuID4:'ALWAYS DUO SUPER',
	skuID5:'ALWAYS PLATINUM NORMAL',
	skuID6:'ALWAYS PLATINUM SUPER',
	skuID7:'ALWAYS PLATINUM DUO NORMAL',
	skuID8:'ALWAYS PLATINUM DUO NORMAL',
	skuID9:'ALWAYS CLASSIC NORMAL',
	skuID10:'ALWAYS CLASSIC SUPER',
	skuID101:'ARIEL 30g HS',
	skuID102:'ARIEL 90g HS',
	skuID103:'ARIEL 250g HS',
	skuID104:'ARIEL 500g HS',
	skuID105:'ARIEL 1kg HS',
	skuID106:'ARIEL 2kg HS',
	skuID107:'ARIEL 1kg LS',
	skuID108:'ARIEL 2kg LS',
	skuID201:'FAIRY 500ML ORIGINAL',
	skuID202:'FAIRY 500ML LEMON',
	skuID301:'GILLETTE Nacet',
	skuID302:'GILLETTE Silver Blue',
	skuID303:'GILLETTE PROGLIDE POWER RAZOR',
	skuID304:'GILLETTE PROGLIDE MANUAL RAZOR',
	skuID305:'GILLETTE PROGLIDE POWER BLADE',
	skuID306:'GILLETTE PROGLIDE MANUAL BLADE',
	skuID307:'GILLETTE MACH 3 RAZOR',
	skuID308:'GILLETTE MACH 3T RAZOR',
	skuID309:'GILLETTE MACH 3  CART (2S)',
	skuID310:'GILLETTE MACH 3T CART (4S)',
	skuID311:'GILLETTE MACH 3 CART (4S)',
	skuID312:'GILLETTE II POUCH',
	skuID313:'GILLETTE BLUE II PLUS POUCH',
	skuID314:'GILLETTE BLUE III POUCH',
	skuID315:'GILLETTE BLUE III PLUS POUCH',
	skuID316:'GILLETTE II HRDC',
	skuID401:'PAMPERS PPC VP MINI',
	skuID402:'PAMPERS PPC VP MIDI',
	skuID403:'PAMPERS PPC VP MAXI',
	skuID404:'PAMPERS PPC CP MINI',
	skuID405:'PAMPERS PPC CP MIDI',
	skuID406:'PAMPERS PPC CP MAXI',
	skuID407:'PAMPERS MEGA BOX/VP MIDI',
	skuID408:'PAMPERS MEGA BOXES/VP MAXI',
	skuID409:'PAMPERS BABY DRY MINI CP',
	skuID410:'PAMPERS BABY DRY MIDI CP',
	skuID411:'PAMPERS BABY DRY MAXI CP',
	skuID412:'PAMPERS BABY DRY MINI VP',
	skuID413:'PAMPERS BABY DRY MIDI VP',
	skuID414:'PAMPERS BABY DRY MAXI VP',
	skuID415:'PAMPERS JUMBO PACK MINI',
	skuID416:'PAMPERS JUMBO PACK MIDI',
	skuID417:'PAMPERS JUMBO PACK MAXI',
	skuID418:'PAMPERS WIPES',
	skuID501:'ORALB Plus HTDC',
	skuID502:'ORALB 123 CASSETTE',
	skuID503:'ORALB Herbal Mint 50ML',
	skuID504:'ORALB NATURAL FRESH',
	skuID505:'ORALB FRESH GEL 40g',
	skuID506:'ORALB ARP 95g',
	skuID507:'ORALB ARP 158g',
	skuID508:'ORALB MINT GEL 140g',
	skuID509:'ORALB Herbal Mint 140g',
	skuID510:'ORALB FRESH GEL 140g',
	skuID511:'ORALB Prem Gum Protect',
	skuID512:'ORALB ARP White 96g',
	skuID513:'ORALB 123 BRUSH',
	skuID514:'ORALB CLASSIC BRUSH',
	skuID515:'ORALB Pro-EXPERT BRUSH',
	skuID516:'ORALB Proflex BRUSH',
	skuID601:'SAFEGUARD 70G PURE WHITE',
	skuID602:'SAFEGUARD 70G LEMON FRESH',
	skuID603:'SAFEGUARD 70G MENTHOL COOL',
	skuID604:'SAFEGUARD 70G SOFT CARE WITH ALOE',
	skuID605:'SAFEGUARD 175G PURE WHITE',
	skuID606:'SAFEGUARD 175G LEMON FRESH',
	skuID607:'SAFEGUARD 175G MENTHOL COOL',
	skuID608:'SAFEGUARD 175G SOFT CARE WITH ALOE',
	skuID701:'VICKS Lemon',
	skuID702:'VICKS Blue',
	skuID703:'VICKS Apple',
	skuID704:'VICKS Mixed Cases',
	skuID705:'VICKS NV lemon',
	skuID706:'VICKS NV Blue',
};

var defaultData = {
    SouthWest: {
        
		HSM: {
			LT: {
                fullname: 'Large Traditional',
                productIDs: ['skuID1', 'skuID2', 'skuID3', 'skuID4', 'skuID5', 'skuID6', 'skuID7', 'skuID8', 'skuID9', 'skuID10', 'skuID104', 'skuID105', 'skuID106', 'skuID107', 'skuID108', 'skuID201', 'skuID202', 'skuID303', 'skuID304', 'skuID305', 'skuID306', 'skuID307', 'skuID308', 'skuID310', 'skuID312', 'skuID313', 'skuID314', 'skuID401', 'skuID402', 'skuID403', 'skuID404', 'skuID405', 'skuID406', 'skuID407', 'skuID408', 'skuID409', 'skuID410', 'skuID411', 'skuID412', 'skuID413', 'skuID414', 'skuID415', 'skuID416', 'skuID417', 'skuID418', 'skuID506', 'skuID507', 'skuID508', 'skuID510', 'skuID511', 'skuID514', 'skuID515', 'skuID516', 'skuID601', 'skuID602', 'skuID603', 'skuID604', 'skuID605', 'skuID606', 'skuID607', 'skuID608', 'skuID701', 'skuID702']
            },
			MT: {
                fullname: 'Medium Traditional',
                productIDs: ['skuID1', 'skuID2', 'skuID3', 'skuID4', 'skuID9', 'skuID10', 'skuID101', 'skuID102', 'skuID104', 'skuID105', 'skuID201', 'skuID202', 'skuID312', 'skuID313', 'skuID315', 'skuID401', 'skuID402', 'skuID403', 'skuID409', 'skuID410', 'skuID411', 'skuID412', 'skuID413', 'skuID414', 'skuID418', 'skuID506', 'skuID507', 'skuID510', 'skuID513', 'skuID514', 'skuID601', 'skuID602', 'skuID605', 'skuID606', 'skuID701', 'skuID702']
            },
			CP: {
                fullname: 'Chain Pharmacy',
                productIDs: ['skuID1', 'skuID2', 'skuID3', 'skuID4', 'skuID5', 'skuID6', 'skuID9', 'skuID10', 'skuID303', 'skuID305', 'skuID307', 'skuID308', 'skuID310', 'skuID311', 'skuID312', 'skuID313', 'skuID315', 'skuID401', 'skuID402', 'skuID403', 'skuID407', 'skuID408', 'skuID412', 'skuID413', 'skuID414', 'skuID415', 'skuID416', 'skuID417', 'skuID418', 'skuID506', 'skuID507', 'skuID510', 'skuID511', 'skuID514', 'skuID515', 'skuID516', 'skuID605', 'skuID606', 'skuID701', 'skuID702']
            }
		},
		
		HFS: {
			MT: {
                fullname: 'Medium Traditional',
                productIDs: ['skuID1',	'skuID2', 'skuID3', 'skuID4', 'skuID5', 'skuID6', 'skuID9', 'skuID10', 'skuID303', 'skuID305', 'skuID307', 'skuID308', 'skuID310', 'skuID311', 'skuID312', 'skuID313', 'skuID315', 'skuID401', 'skuID402', 'skuID403', 'skuID407', 'skuID408', 'skuID412', 'skuID413', 'skuID414', 'skuID415', 'skuID416', 'skuID417', 'skuID418', 'skuID506', 'skuID507', 'skuID510', 'skuID511', 'skuID514', 'skuID515', 'skuID516', 'skuID605', 'skuID606', 'skuID701', 'skuID702']
            },
			ST: {
                fullname: 'Small Traditional',
                productIDs: ['skuID1', 'skuID2', 'skuID9', 'skuID10', 'skuID101', 'skuID102', 'skuID105', 'skuID201', 'skuID202', 'skuID313', 'skuID316', 'skuID409', 'skuID410', 'skuID411', 'skuID502', 'skuID505', 'skuID510', 'skuID601', 'skuID602', 'skuID605', 'skuID606', 'skuID701', 'skuID702']
            },
			KS: {
                fullname: 'Kiosk',
                productIDs: ['skuID1', 'skuID2', 'skuID9', 'skuID10', 'skuID101', 'skuID102', 'skuID316', 'skuID409', 'skuID410', 'skuID411', 'skuID502', 'skuID505', 'skuID508', 'skuID601', 'skuID602', 'skuID701', 'skuID702']
            },
			IB: {
                fullname: 'Independent Baby',
                productIDs: ['skuID1', 'skuID2', 'skuID9', 'skuID10', 'skuID508', 'skuID514', 'skuID601', 'skuID602', 'skuID605', 'skuID606']
            },
			SB: {
                fullname: 'Small Baby',
                productIDs: ['skuID409', 'skuID410', 'skuID411', 'skuID412', 'skuID413', 'skuID414', 'skuID415', 'skuID416', 'skuID417', 'skuID418']
            },
			LB: {
                fullname: 'Large Baby',
                productIDs: ['skuID401', 'skuID402', 'skuID403', 'skuID407', 'skuID408', 'skuID412', 'skuID413', 'skuID414', 'skuID415', 'skuID416', 'skuID417', 'skuID418']
            },
			CP: {
                fullname: 'Chain Pharmacy',
                productIDs: ['skuID1', 'skuID2', 'skuID3', 'skuID4', 'skuID5', 'skuID6', 'skuID9', 'skuID10', 'skuID303', 'skuID305', 'skuID307', 'skuID308', 'skuID310', 'skuID311', 'skuID312', 'skuID313', 'skuID315', 'skuID401', 'skuID402', 'skuID403', 'skuID407', 'skuID408', 'skuID412', 'skuID413', 'skuID414', 'skuID415', 'skuID416', 'skuID417', 'skuID418', 'skuID506', 'skuID507', 'skuID510', 'skuID511', 'skuID514', 'skuID515', 'skuID516', 'skuID605', 'skuID606', 'skuID701', 'skuID702']
            },
			IP: {
                fullname: 'Independent Pharmacy',
                productIDs: ['skuID1', 'skuID2', 'skuID9', 'skuID10', 'skuID312', 'skuID313', 'skuID409', 'skuID410', 'skuID411', 'skuID505', 'skuID510', 'skuID514', 'skuID601', 'skuID602', 'skuID701', 'skuID702']
            },
			WSR: {
                fullname: 'Wholesale/Retail',
                productIDs: ['skuID1', 'skuID2', 'skuID3', 'skuID4', 'skuID9', 'skuID10', 'skuID101', 'skuID102', 'skuID104', 'skuID105', 'skuID201', 'skuID202', 'skuID312', 'skuID313', 'skuID401', 'skuID402', 'skuID403', 'skuID409', 'skuID410', 'skuID411', 'skuID412', 'skuID413', 'skuID414', 'skuID415', 'skuID416', 'skuID417', 'skuID418', 'skuID502', 'skuID505', 'skuID506', 'skuID510', 'skuID601', 'skuID602', 'skuID605', 'skuID606', 'skuID701', 'skuID702']
            }
		}
	},
	SouthEast: {
        
		HSM: {
			LT: {
                fullname: 'Large Traditional',
                productIDs: ['skuID1', 'skuID2', 'skuID3', 'skuID4', 'skuID5', 'skuID6', 'skuID7', 'skuID8', 'skuID9', 'skuID10', 'skuID104', 'skuID105', 'skuID106', 'skuID107', 'skuID108', 'skuID201', 'skuID202', 'skuID303', 'skuID304', 'skuID305', 'skuID306', 'skuID307', 'skuID308', 'skuID310', 'skuID312', 'skuID313', 'skuID314', 'skuID401', 'skuID402', 'skuID403', 'skuID404', 'skuID405', 'skuID406', 'skuID407', 'skuID408', 'skuID409', 'skuID410', 'skuID411', 'skuID412', 'skuID413', 'skuID414', 'skuID415', 'skuID416', 'skuID417', 'skuID418', 'skuID506', 'skuID507', 'skuID508', 'skuID510', 'skuID511', 'skuID514', 'skuID515', 'skuID516', 'skuID601', 'skuID602', 'skuID603', 'skuID604', 'skuID605', 'skuID606', 'skuID607', 'skuID608', 'skuID701', 'skuID702']
            },
			MT: {
                fullname: 'Medium Traditional',
                productIDs: ['skuID1', 'skuID2', 'skuID3', 'skuID4', 'skuID9', 'skuID10', 'skuID101', 'skuID102', 'skuID104', 'skuID105', 'skuID201', 'skuID202', 'skuID312', 'skuID313', 'skuID315', 'skuID401', 'skuID402', 'skuID403', 'skuID409', 'skuID410', 'skuID411', 'skuID412', 'skuID413', 'skuID414', 'skuID418', 'skuID506', 'skuID507', 'skuID510', 'skuID513', 'skuID514', 'skuID601', 'skuID602', 'skuID605', 'skuID606', 'skuID701', 'skuID702']
            },
			CP: {
                fullname: 'Chain Pharmacy',
                productIDs: ['skuID1', 'skuID2', 'skuID3', 'skuID4', 'skuID5', 'skuID6', 'skuID9', 'skuID10', 'skuID303', 'skuID305', 'skuID307', 'skuID308', 'skuID310', 'skuID311', 'skuID312', 'skuID313', 'skuID315', 'skuID401', 'skuID402', 'skuID403', 'skuID407', 'skuID408', 'skuID412', 'skuID413', 'skuID414', 'skuID415', 'skuID416', 'skuID417', 'skuID418', 'skuID506', 'skuID507', 'skuID510', 'skuID511', 'skuID514', 'skuID515', 'skuID516', 'skuID605', 'skuID606', 'skuID701', 'skuID702']
            }
		},
		
		HFS: {
			MT: {
                fullname: 'Medium Traditional',
                productIDs: ['skuID1',	'skuID2', 'skuID3', 'skuID4', 'skuID5', 'skuID6', 'skuID9', 'skuID10', 'skuID303', 'skuID305', 'skuID307', 'skuID308', 'skuID310', 'skuID311', 'skuID312', 'skuID313', 'skuID315', 'skuID401', 'skuID402', 'skuID403', 'skuID407', 'skuID408', 'skuID412', 'skuID413', 'skuID414', 'skuID415', 'skuID416', 'skuID417', 'skuID418', 'skuID506', 'skuID507', 'skuID510', 'skuID511', 'skuID514', 'skuID515', 'skuID516', 'skuID605', 'skuID606', 'skuID701', 'skuID702']
            },
			ST: {
                fullname: 'Small Traditional',
                productIDs: ['skuID1', 'skuID2', 'skuID9', 'skuID10', 'skuID101', 'skuID102', 'skuID105', 'skuID201', 'skuID202', 'skuID313', 'skuID316', 'skuID409', 'skuID410', 'skuID411', 'skuID502', 'skuID505', 'skuID510', 'skuID601', 'skuID602', 'skuID605', 'skuID606', 'skuID701', 'skuID702']
            },
			KS: {
                fullname: 'Kiosk',
                productIDs: ['skuID1', 'skuID2', 'skuID9', 'skuID10', 'skuID101', 'skuID102', 'skuID316', 'skuID409', 'skuID410', 'skuID411', 'skuID502', 'skuID505', 'skuID508', 'skuID601', 'skuID602', 'skuID701', 'skuID702']
            },
			IB: {
                fullname: 'Independent Baby',
                productIDs: ['skuID1', 'skuID2', 'skuID9', 'skuID10', 'skuID508', 'skuID514', 'skuID601', 'skuID602', 'skuID605', 'skuID606']
            },
			SB: {
                fullname: 'Small Baby',
                productIDs: ['skuID409', 'skuID410', 'skuID411', 'skuID412', 'skuID413', 'skuID414', 'skuID415', 'skuID416', 'skuID417', 'skuID418']
            },
			LB: {
                fullname: 'Large Baby',
                productIDs: ['skuID401', 'skuID402', 'skuID403', 'skuID407', 'skuID408', 'skuID412', 'skuID413', 'skuID414', 'skuID415', 'skuID416', 'skuID417', 'skuID418']
            },
			CP: {
                fullname: 'Chain Pharmacy',
                productIDs: ['skuID1', 'skuID2', 'skuID3', 'skuID4', 'skuID5', 'skuID6', 'skuID9', 'skuID10', 'skuID303', 'skuID305', 'skuID307', 'skuID308', 'skuID310', 'skuID311', 'skuID312', 'skuID313', 'skuID315', 'skuID401', 'skuID402', 'skuID403', 'skuID407', 'skuID408', 'skuID412', 'skuID413', 'skuID414', 'skuID415', 'skuID416', 'skuID417', 'skuID418', 'skuID506', 'skuID507', 'skuID510', 'skuID511', 'skuID514', 'skuID515', 'skuID516', 'skuID605', 'skuID606', 'skuID701', 'skuID702']
            },
			IP: {
                fullname: 'Independent Pharmacy',
                productIDs: ['skuID1', 'skuID2', 'skuID9', 'skuID10', 'skuID312', 'skuID313', 'skuID409', 'skuID410', 'skuID411', 'skuID505', 'skuID510', 'skuID514', 'skuID601', 'skuID602', 'skuID701', 'skuID702']
            },
			WSR: {
                fullname: 'Wholesale/Retail',
                productIDs: ['skuID1', 'skuID2', 'skuID3', 'skuID4', 'skuID9', 'skuID10', 'skuID101', 'skuID102', 'skuID104', 'skuID105', 'skuID201', 'skuID202', 'skuID312', 'skuID313', 'skuID401', 'skuID402', 'skuID403', 'skuID409', 'skuID410', 'skuID411', 'skuID412', 'skuID413', 'skuID414', 'skuID415', 'skuID416', 'skuID417', 'skuID418', 'skuID502', 'skuID505', 'skuID506', 'skuID510', 'skuID601', 'skuID602', 'skuID605', 'skuID606', 'skuID701', 'skuID702']
            }
		}
	},
	North: {
        
		HSM: {
			LT: {
                fullname: 'Large Traditional',
                productIDs: ['skuID1', 'skuID2', 'skuID3', 'skuID4', 'skuID5', 'skuID6', 'skuID7', 'skuID8', 'skuID9', 'skuID10', 'skuID104', 'skuID105', 'skuID106', 'skuID107', 'skuID108', 'skuID201', 'skuID202', 'skuID303', 'skuID304', 'skuID305', 'skuID306', 'skuID307', 'skuID308', 'skuID310', 'skuID312', 'skuID313', 'skuID314', 'skuID401', 'skuID402', 'skuID403', 'skuID404', 'skuID405', 'skuID406', 'skuID407', 'skuID408', 'skuID409', 'skuID410', 'skuID411', 'skuID412', 'skuID413', 'skuID414', 'skuID415', 'skuID416', 'skuID417', 'skuID418', 'skuID506', 'skuID507', 'skuID508', 'skuID510', 'skuID511', 'skuID514', 'skuID515', 'skuID516', 'skuID601', 'skuID602', 'skuID603', 'skuID604', 'skuID605', 'skuID606', 'skuID607', 'skuID608', 'skuID701', 'skuID702']
            },
			MT: {
                fullname: 'Medium Traditional',
                productIDs: ['skuID1', 'skuID2', 'skuID3', 'skuID4', 'skuID9', 'skuID10', 'skuID101', 'skuID102', 'skuID104', 'skuID105', 'skuID201', 'skuID202', 'skuID312', 'skuID313', 'skuID315', 'skuID401', 'skuID402', 'skuID403', 'skuID409', 'skuID410', 'skuID411', 'skuID412', 'skuID413', 'skuID414', 'skuID418', 'skuID506', 'skuID507', 'skuID510', 'skuID513', 'skuID514', 'skuID601', 'skuID602', 'skuID605', 'skuID606', 'skuID701', 'skuID702']
            },
			CP: {
                fullname: 'Chain Pharmacy',
                productIDs: ['skuID1', 'skuID2', 'skuID3', 'skuID4', 'skuID5', 'skuID6', 'skuID9', 'skuID10', 'skuID303', 'skuID305', 'skuID307', 'skuID308', 'skuID310', 'skuID311', 'skuID312', 'skuID313', 'skuID315', 'skuID401', 'skuID402', 'skuID403', 'skuID407', 'skuID408', 'skuID412', 'skuID413', 'skuID414', 'skuID415', 'skuID416', 'skuID417', 'skuID418', 'skuID506', 'skuID507', 'skuID510', 'skuID511', 'skuID514', 'skuID515', 'skuID516', 'skuID605', 'skuID606', 'skuID701', 'skuID702']
            }
		},
		
		HFS: {
			MT: {
                fullname: 'Medium Traditional',
                productIDs: ['skuID1',	'skuID2', 'skuID3', 'skuID4', 'skuID5', 'skuID6', 'skuID9', 'skuID10', 'skuID303', 'skuID305', 'skuID307', 'skuID308', 'skuID310', 'skuID311', 'skuID312', 'skuID313', 'skuID315', 'skuID401', 'skuID402', 'skuID403', 'skuID407', 'skuID408', 'skuID412', 'skuID413', 'skuID414', 'skuID415', 'skuID416', 'skuID417', 'skuID418', 'skuID506', 'skuID507', 'skuID510', 'skuID511', 'skuID514', 'skuID515', 'skuID516', 'skuID605', 'skuID606', 'skuID701', 'skuID702']
            },
			ST: {
                fullname: 'Small Traditional',
                productIDs: ['skuID1', 'skuID2', 'skuID9', 'skuID10', 'skuID101', 'skuID102', 'skuID105', 'skuID201', 'skuID202', 'skuID313', 'skuID316', 'skuID409', 'skuID410', 'skuID411', 'skuID502', 'skuID505', 'skuID510', 'skuID601', 'skuID602', 'skuID605', 'skuID606', 'skuID701', 'skuID702']
            },
			KS: {
                fullname: 'Kiosk',
                productIDs: ['skuID1', 'skuID2', 'skuID9', 'skuID10', 'skuID101', 'skuID102', 'skuID316', 'skuID409', 'skuID410', 'skuID411', 'skuID502', 'skuID505', 'skuID508', 'skuID601', 'skuID602', 'skuID701', 'skuID702']
            },
			IB: {
                fullname: 'Independent Baby',
                productIDs: ['skuID1', 'skuID2', 'skuID9', 'skuID10', 'skuID508', 'skuID514', 'skuID601', 'skuID602', 'skuID605', 'skuID606']
            },
			SB: {
                fullname: 'Small Baby',
                productIDs: ['skuID409', 'skuID410', 'skuID411', 'skuID412', 'skuID413', 'skuID414', 'skuID415', 'skuID416', 'skuID417', 'skuID418']
            },
			LB: {
                fullname: 'Large Baby',
                productIDs: ['skuID401', 'skuID402', 'skuID403', 'skuID407', 'skuID408', 'skuID412', 'skuID413', 'skuID414', 'skuID415', 'skuID416', 'skuID417', 'skuID418']
            },
			CP: {
                fullname: 'Chain Pharmacy',
                productIDs: ['skuID1', 'skuID2', 'skuID3', 'skuID4', 'skuID5', 'skuID6', 'skuID9', 'skuID10', 'skuID303', 'skuID305', 'skuID307', 'skuID308', 'skuID310', 'skuID311', 'skuID312', 'skuID313', 'skuID315', 'skuID401', 'skuID402', 'skuID403', 'skuID407', 'skuID408', 'skuID412', 'skuID413', 'skuID414', 'skuID415', 'skuID416', 'skuID417', 'skuID418', 'skuID506', 'skuID507', 'skuID510', 'skuID511', 'skuID514', 'skuID515', 'skuID516', 'skuID605', 'skuID606', 'skuID701', 'skuID702']
            },
			IP: {
                fullname: 'Independent Pharmacy',
                productIDs: ['skuID1', 'skuID2', 'skuID9', 'skuID10', 'skuID312', 'skuID313', 'skuID409', 'skuID410', 'skuID411', 'skuID505', 'skuID510', 'skuID514', 'skuID601', 'skuID602', 'skuID701', 'skuID702']
            },
			WSR: {
                fullname: 'Wholesale/Retail',
                productIDs: ['skuID1', 'skuID2', 'skuID3', 'skuID4', 'skuID9', 'skuID10', 'skuID101', 'skuID102', 'skuID104', 'skuID105', 'skuID201', 'skuID202', 'skuID312', 'skuID313', 'skuID401', 'skuID402', 'skuID403', 'skuID409', 'skuID410', 'skuID411', 'skuID412', 'skuID413', 'skuID414', 'skuID415', 'skuID416', 'skuID417', 'skuID418', 'skuID502', 'skuID505', 'skuID506', 'skuID510', 'skuID601', 'skuID602', 'skuID605', 'skuID606', 'skuID701', 'skuID702']
            }
		}
	},
	Lagos: {  
		HSM: {
			LT: {
                fullname: 'Large Traditional',
                productIDs: ['skuID1', 'skuID2', 'skuID3', 'skuID4', 'skuID5', 'skuID6', 'skuID7', 'skuID8', 'skuID9', 'skuID10', 'skuID104', 'skuID105', 'skuID106', 'skuID107', 'skuID108', 'skuID201', 'skuID202', 'skuID303', 'skuID304', 'skuID305', 'skuID306', 'skuID307', 'skuID308', 'skuID310', 'skuID312', 'skuID313', 'skuID314', 'skuID401', 'skuID402', 'skuID403', 'skuID404', 'skuID405', 'skuID406', 'skuID407', 'skuID408', 'skuID409', 'skuID410', 'skuID411', 'skuID412', 'skuID413', 'skuID414', 'skuID415', 'skuID416', 'skuID417', 'skuID418', 'skuID506', 'skuID507', 'skuID508', 'skuID510', 'skuID511', 'skuID514', 'skuID515', 'skuID516', 'skuID601', 'skuID602', 'skuID603', 'skuID604', 'skuID605', 'skuID606', 'skuID607', 'skuID608', 'skuID701', 'skuID702']
            },
			MT: {
                fullname: 'Medium Traditional',
                productIDs: ['skuID1', 'skuID2', 'skuID3', 'skuID4', 'skuID9', 'skuID10', 'skuID101', 'skuID102', 'skuID104', 'skuID105', 'skuID201', 'skuID202', 'skuID312', 'skuID313', 'skuID315', 'skuID401', 'skuID402', 'skuID403', 'skuID409', 'skuID410', 'skuID411', 'skuID412', 'skuID413', 'skuID414', 'skuID418', 'skuID506', 'skuID507', 'skuID510', 'skuID513', 'skuID514', 'skuID601', 'skuID602', 'skuID605', 'skuID606', 'skuID701', 'skuID702']
            },
			CP: {
                fullname: 'Chain Pharmacy',
                productIDs: ['skuID1', 'skuID2', 'skuID3', 'skuID4', 'skuID5', 'skuID6', 'skuID9', 'skuID10', 'skuID303', 'skuID305', 'skuID307', 'skuID308', 'skuID310', 'skuID311', 'skuID312', 'skuID313', 'skuID315', 'skuID401', 'skuID402', 'skuID403', 'skuID407', 'skuID408', 'skuID412', 'skuID413', 'skuID414', 'skuID415', 'skuID416', 'skuID417', 'skuID418', 'skuID506', 'skuID507', 'skuID510', 'skuID511', 'skuID514', 'skuID515', 'skuID516', 'skuID605', 'skuID606', 'skuID701', 'skuID702']
            }
		},
		
		HFS: {
			MT: {
                fullname: 'Medium Traditional',
                productIDs: ['skuID1',	'skuID2', 'skuID3', 'skuID4', 'skuID5', 'skuID6', 'skuID9', 'skuID10', 'skuID303', 'skuID305', 'skuID307', 'skuID308', 'skuID310', 'skuID311', 'skuID312', 'skuID313', 'skuID315', 'skuID401', 'skuID402', 'skuID403', 'skuID407', 'skuID408', 'skuID412', 'skuID413', 'skuID414', 'skuID415', 'skuID416', 'skuID417', 'skuID418', 'skuID506', 'skuID507', 'skuID510', 'skuID511', 'skuID514', 'skuID515', 'skuID516', 'skuID605', 'skuID606', 'skuID701', 'skuID702']
            },
			ST: {
                fullname: 'Small Traditional',
                productIDs: ['skuID1', 'skuID2', 'skuID9', 'skuID10', 'skuID101', 'skuID102', 'skuID105', 'skuID201', 'skuID202', 'skuID313', 'skuID316', 'skuID409', 'skuID410', 'skuID411', 'skuID502', 'skuID505', 'skuID510', 'skuID601', 'skuID602', 'skuID605', 'skuID606', 'skuID701', 'skuID702']
            },
			KS: {
                fullname: 'Kiosk',
                productIDs: ['skuID1', 'skuID2', 'skuID9', 'skuID10', 'skuID101', 'skuID102', 'skuID316', 'skuID409', 'skuID410', 'skuID411', 'skuID502', 'skuID505', 'skuID508', 'skuID601', 'skuID602', 'skuID701', 'skuID702']
            },
			IB: {
                fullname: 'Independent Baby',
                productIDs: ['skuID1', 'skuID2', 'skuID9', 'skuID10', 'skuID508', 'skuID514', 'skuID601', 'skuID602', 'skuID605', 'skuID606']
            },
			SB: {
                fullname: 'Small Baby',
                productIDs: ['skuID409', 'skuID410', 'skuID411', 'skuID412', 'skuID413', 'skuID414', 'skuID415', 'skuID416', 'skuID417', 'skuID418']
            },
			LB: {
                fullname: 'Large Baby',
                productIDs: ['skuID401', 'skuID402', 'skuID403', 'skuID407', 'skuID408', 'skuID412', 'skuID413', 'skuID414', 'skuID415', 'skuID416', 'skuID417', 'skuID418']
            },
			CP: {
                fullname: 'Chain Pharmacy',
                productIDs: ['skuID1', 'skuID2', 'skuID3', 'skuID4', 'skuID5', 'skuID6', 'skuID9', 'skuID10', 'skuID303', 'skuID305', 'skuID307', 'skuID308', 'skuID310', 'skuID311', 'skuID312', 'skuID313', 'skuID315', 'skuID401', 'skuID402', 'skuID403', 'skuID407', 'skuID408', 'skuID412', 'skuID413', 'skuID414', 'skuID415', 'skuID416', 'skuID417', 'skuID418', 'skuID506', 'skuID507', 'skuID510', 'skuID511', 'skuID514', 'skuID515', 'skuID516', 'skuID605', 'skuID606', 'skuID701', 'skuID702']
            },
			IP: {
                fullname: 'Independent Pharmacy',
                productIDs: ['skuID1', 'skuID2', 'skuID9', 'skuID10', 'skuID312', 'skuID313', 'skuID409', 'skuID410', 'skuID411', 'skuID505', 'skuID510', 'skuID514', 'skuID601', 'skuID602', 'skuID701', 'skuID702']
            },
			WSR: {
                fullname: 'Wholesale/Retail',
                productIDs: ['skuID1', 'skuID2', 'skuID3', 'skuID4', 'skuID9', 'skuID10', 'skuID101', 'skuID102', 'skuID104', 'skuID105', 'skuID201', 'skuID202', 'skuID312', 'skuID313', 'skuID401', 'skuID402', 'skuID403', 'skuID409', 'skuID410', 'skuID411', 'skuID412', 'skuID413', 'skuID414', 'skuID415', 'skuID416', 'skuID417', 'skuID418', 'skuID502', 'skuID505', 'skuID506', 'skuID510', 'skuID601', 'skuID602', 'skuID605', 'skuID606', 'skuID701', 'skuID702']
            }
		}
	}
};
