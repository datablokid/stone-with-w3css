
jsSellCrypto ={
	blok:null,
	action:null,
	halaman:null,

	viewRead: function (){

		this.action = "read";

		var layout  = '';
		layout += '<div id="msg"></div>';
		
		layout += '<div class="w3-container w3-theme-d4 w3-round w3-border">';
		layout += '<h3>Sell: READ</h3>';
		layout += '</div>';
		
		layout += '<div class="w3-container w3-card">';

		layout += '<div class="w3-row w3-section  w3-theme-d4">';
		layout += '<div class="w3-col w3-center" style="width:50px"><i class="w3-xxlarge fa fa-search"></i></div>';
		layout += '<div class="w3-rest">';
		layout += '<input type="text" onkeyup="jsSellCrypto.viewSearch(this.value)" placeholder="Type to search..." id="cari" class="w3-input w3-border">';
		layout += '</div>';
		layout += '</div>';

		layout += '<p id="showPaging"></p>';
		layout += '<span id="count"></span>';
		layout += '<p id="showTable"></p>';
		
		layout += '</div>';
		
		document.getElementById('viewMid').innerHTML = layout;

		let obj = {
			"login_blok":g.login_blok
		};
		
		if (this.halaman==null){

			loadDoc(myServer+"crypto/sell_read_paging.php",this.showData, obj); 
			
		}else{

			loadDoc(this.halaman,this.showData, obj)
		}		
		
		document.getElementById("cari").focus();
	},
	
	showData: function(xhttp){
		
		var txt;
		var sell_close;
		
		var okoye = JSON.parse(xhttp.responseText);
		
		txt ='<div class="w3-responsive">';
		txt+='<table border=1 class="w3-table-all">';
		txt+='<thead><tr class="w3-theme-l1">';

		txt+="<th>No.</th>";
		txt+="<th>Name</th>";
		txt+="<th class='w3-right-align'>Amount</th>";
		txt+="<th class='w3-right-align'>Price</th>";
		txt+="<th class='w3-right-align'>Stock</th>";
		txt+="<th>Status</th>";
		
		txt+="<th>Owner</th>";
		txt+="<th>Created</th>";
		txt+="<th class='w3-center'>Action</th>";
		
		txt+="</tr></thead>";
		
	    if (okoye.err===0){
			
			let amount = 0;
			let price=0;
			
			for (x in okoye.data) {
				sell_close="CLOSE"
				if (okoye.data[x].sell_close==null){
					sell_close="OPEN"
				}
				
				amount = parseFloat(okoye.data[x].sell_amount);
				price=parseFloat(okoye.data[x].sell_price);
				stock=amount*price;

				txt += "<tr>";
				txt += "<td>"+okoye.data[x].nomer + "</td>";
				txt += "<td>"+okoye.data[x].sell_name.toUpperCase() + "</td>";
				txt += "<td class='w3-right-align'>"+amount+" "+okoye.data[x].sell_name.toUpperCase()+ "</td>";
				txt += "<td class='w3-right-align'>"+formatSerebuan(price.toFixed(2)) + " IDR </td>";
				txt += "<td class='w3-right-align'>"+formatSerebuan(stock.toFixed(2)) + " IDR </td>";
				if (sell_close=="OPEN"){
					txt += "<td style='color:red'><strong>"+sell_close+"</strong></td>";
				}else{
					txt += "<td style='color:green'><strong>"+sell_close+"</strong></td>";
				}
				
				txt += "<td>"+okoye.data[x].user_name + "</td>";
				txt += "<td>"+okoye.data[x].date_created + "</td>";
				
				txt += "<td class='w3-center'><input type='button' id='btnCancel' onClick='jsSellCrypto.viewCancel(\"" + okoye.data[x].sell_blok + "\");' value='Cancel' class='w3-btn w3-theme-l5 w3-round w3-border'></td>";

				txt += "</tr>";
			}

			

		}
		txt+="</table></div>";
		
		document.getElementById("count").innerHTML = "Total record: <span class='w3-tag w3-theme-l1'>" + okoye.msg+'</span>';
		document.getElementById("showTable").innerHTML = txt;
		
		txt="";

		if (jsSellCrypto.action=="read"){
			
			if (okoye.err==0){
				
				if (okoye.paging.first!=""){
					
					txt+= "<input type='button' value= 'First' onclick='jsSellCrypto.gotoPage(\"" + okoye.paging.first + "\")' class='w3-btn w3-theme-l5 w3-round w3-border'>&nbsp;" ;
					
				}
				
				for (x in okoye.paging.pages) {
					
					if (okoye.paging.pages[x].current_page=="yes"){
						
						txt+= "<input type='button' value = '"+ okoye.paging.pages[x].page +"' onclick='jsSellCrypto.gotoPage(\"" + okoye.paging.pages[x].url + "\")' disabled  class='w3-btn w3-theme-l5 w3-round w3-border'>&nbsp;";	
						
					} 
					else{
						
						txt+= "<input type='button' value = '"+ okoye.paging.pages[x].page +"' onclick='jsSellCrypto.gotoPage(\"" + okoye.paging.pages[x].url + "\")' class='w3-btn w3-theme-l5 w3-round w3-border'>&nbsp;";	

					}
				}
				
				if (okoye.paging.last!=""){
					
					txt+= "<input type='button' value= 'Last' onclick='jsSellCrypto.gotoPage(\"" + okoye.paging.last + "\")' class='w3-btn w3-theme-l5 w3-round w3-border'>&nbsp;" ;
					
				}
				
			}
			
		}
		
		document.getElementById("showPaging").innerHTML = txt; 

		if (okoye.err!=0){

			messageBox(okoye.msg);

		}
		
	},
	
	gotoPage: function (ini){

		this.halaman = ini;
		
		this.viewRead();
	},
	
	viewCancel: function(blok) {

		this.blok = blok;
		this.htmlCancel();
		this.readOne();
	},
	
	htmlCancel: function (){
		var layout  = '';
		
		layout += '<div class="w3-container w3-theme-d4 w3-round w3-border">';
		layout += '<h3>Sell: CANCEL</h3>';
		layout += '</div>';
		
		layout += '<form class="w3-container w3-card">';
		layout += '<p>';
		layout += '<input type="button" onclick="jsSellCrypto.viewRead()" value="Back" class="w3-btn w3-theme-l5 w3-round w3-border">&nbsp;';
		layout += '<input type="button" id="btnDelete" onclick="jsSellCrypto.klikCancel()" value="Delete" class="w3-btn w3-theme-l5 w3-round w3-border">';
		layout += '</p>';
		
		layout += '<div id="msg"></div>';
		
		layout += '<p>';
		layout += 'Name: <span id="sell_name" class="w3-tag w3-theme-l1"></div>';
		layout += '</p>';
		
		layout += '<p>';
		layout += 'Amount: <span id="sell_amount" class="w3-tag w3-theme-l1"></div> ';
		layout += '</p>';
		
		layout += '<p>';
		layout += 'Price: <span id="sell_price" class="w3-tag w3-theme-l1"></div>';
		layout += '</p>';

		layout += '<p>';
		layout += 'Stock: <span id="sell_stok" class="w3-tag w3-theme-l1"></div>';
		layout += '</p>';
		
		layout += '</form>';
		
		document.getElementById('viewMid').innerHTML = layout;

	},
	
	readOne: function(){
		let obj = {
			"login_blok":g.login_blok,
			"sell_blok": this.blok
		};

		loadDoc(myServer+"crypto/sell_read_one.php",showOne, obj); 
		
		function showOne(xhttp){
		
			var stark = JSON.parse(xhttp.responseText);
			let amount=parseFloat(stark.data[0].sell_amount);
			let price=parseFloat(stark.data[0].sell_price);
			let stock=amount*price;
			
			document.getElementById('sell_name').innerHTML = stark.data[0].sell_name;	
			document.getElementById('sell_amount').innerHTML = amount+" "+stark.data[0].sell_name.toUpperCase();	
			document.getElementById('sell_price').innerHTML = formatSerebuan(price.toFixed(2)) + " IDR" ;	
			document.getElementById('sell_stok').innerHTML = formatSerebuan(stock.toFixed(2)) + " IDR" ;	

		}
		
	},
	
	klikCancel: function(){
		
		let obj = {
			"login_blok":g.login_blok,
			"sell_blok": this.blok
		};

		loadDoc(myServer+"crypto/sell_delete_one.php",this.serverMessage, obj); 
		
	},
	
	serverMessage: function(xhttp){

		var marvel = JSON.parse(xhttp.responseText);
	
		if (marvel.err == 0){

			document.getElementById("btnDelete").disabled = true;
		
		} 
		
		document.getElementById("msg").innerHTML = papanInfo(marvel.msg, marvel.err);
		
	},

}
