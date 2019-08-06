
jsBuyCrypto ={
	blok:null,
	action:null,
	halaman:null,

	viewRead: function (){

		this.action = "read";

		var layout  = '';
		layout += '<span id="msg"></span>';
		layout += '<div class="w3-container w3-theme-d4 w3-round w3-border">';
		layout += '<h3>Buy: READ</h3>';
		layout += '</div>';
				
		layout += '<div class="w3-container w3-card">';
		
		layout += '<div class="w3-row w3-section  w3-theme-d4">';
		layout += '<div class="w3-col w3-center" style="width:50px"><i class="w3-xxlarge fa fa-search"></i></div>';
		layout += '<div class="w3-rest">';
		layout += '<input type="text" onkeyup="jsBuyCrypto.viewSearch(this.value)" placeholder="Type to search..." id="cari" class="w3-input w3-border">';
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

			loadDoc(myServer+"crypto/buy_read_paging.php",this.showData, obj); 
			
		}else{

			loadDoc(this.halaman,this.showData, obj)
		}		
		
		document.getElementById("cari").focus();
	},
	
	showData: function(xhttp){

		var txt;
		var buy_close;
		
		var wiro=JSON.parse(xhttp.responseText);
		
		txt ='<div class="w3-responsive">';
		txt+='<table border=1 class="w3-table-all">';
		txt+='<thead><tr class="w3-theme-l1">';

		txt+="<th>No.</th>";
		txt+="<th>Name</th>";
		txt+="<th class='w3-right-align'>Amount</th>";
		txt+="<th class='w3-right-align'>Price</th>";
		txt+="<th class='w3-right-align'>Est Stock</th>";
		txt+="<th>Status</th>";
		
		txt+="<th>Owner</th>";
		txt+="<th>Created</th>";
		txt+="<th class='w3-right-align'>Action</th>";
		
		txt+="</tr></thead>";
		let amount = 0;
		let price = 0;
		let stok = 0;
		
		
	    if (wiro.err==0){
			
			for (x in wiro.data) {
				buy_close="CLOSE"
				if (wiro.data[x].buy_close==null){
					buy_close="OPEN"
				}
				
				txt += "<tr>";
				txt += "<td>"+wiro.data[x].nomer + "</td>";
				txt += "<td>"+wiro.data[x].buy_name.toUpperCase() + "</td>";
				
				amount = parseFloat(wiro.data[x].buy_amount);
				price = parseFloat(wiro.data[x].buy_price);
				stok=amount/price;
				
				txt += "<td class='w3-right-align'>"+formatSerebuan(amount.toFixed(2)) + " IDR</td>";
				txt += "<td class='w3-right-align'>"+formatSerebuan(price.toFixed(2))+" IDR</td>";
				txt += "<td class='w3-right-align'>"+stok+" "+wiro.data[x].buy_name.toUpperCase()+"</td>";
				
				if (buy_close=="OPEN"){
					txt += "<td style='color:red'><strong>"+buy_close+"</strong></td>";
				}else{
					txt += "<td style='color:green'><strong>"+buy_close+"</strong></td>";
				}

				
				txt += "<td>"+wiro.data[x].user_name + "</td>";
				txt += "<td>"+wiro.data[x].date_created + "</td>";
				
				txt += "<td class='w3-center'><input type='button' id='btnCancel' onClick='jsBuyCrypto.viewCancel(\"" + wiro.data[x].buy_blok + "\");' value='Cancel' class='w3-btn w3-theme-l5 w3-border w3-round'></td>";

				txt += "</tr>";
			}

		}
		txt+="</table></div>";
		
		document.getElementById("count").innerHTML = "Total record: <span class='w3-tag w3-theme-l1'>" + wiro.msg +'</span>';
		document.getElementById("showTable").innerHTML = txt;
		
		// bila search tidak menggunakan paging
		txt="";
		if (jsBuyCrypto.action=="read"){
			
			if (wiro.err==0){
				
				if (wiro.paging.first!=""){
					
					txt+= "<input type='button' value= 'First' onclick='jsBuyCrypto.gotoPage(\"" + wiro.paging.first + "\")' class='w3-btn w3-theme-l5 w3-round w3-border'>&nbsp;" ;
					
				}
				
				for (x in wior.paging.pages) {
					
					if (wiro.paging.pages[x].current_page=="yes"){
						
						txt+= "<input type='button' value = '"+ wiro.paging.pages[x].page +"' onclick='jsBuyCrypto.gotoPage(\"" + wiro.paging.pages[x].url + "\")' disabled class='w3-btn w3-theme-l5 w3-round w3-border'>&nbsp;";	
						
					} 
					else{
						
						txt+= "<input type='button' value = '"+ wiro.paging.pages[x].page +"' onclick='jsBuyCrypto.gotoPage(\"" + wiro.paging.pages[x].url + "\")' class='w3-btn w3-theme-l5 w3-round w3-border'>&nbsp;";	
					}
				}
				
				if (wiro.paging.last!=""){
					txt+= "<input type='button' value= 'Last' onclick='jsBuyCrypto.gotoPage(\"" + wiro.paging.last + "\")' class='w3-btn w3-theme-l5 w3-round w3-border'>&nbsp;" ;
				}
				
				
			}
		}
		document.getElementById("showPaging").innerHTML = txt; 

		if (wiro.err!=0){

			messageBox(wiro.msg, wiro.err);

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
		layout += '<h3>Buy: CANCEL</h3>';
		layout += '</div>';

		layout += '<form class="w3-container w3-card">';
		
		layout += '<p>';
		layout += '<input type="button" onclick="jsBuyCrypto.viewRead()" value="Back" class="w3-btn w3-theme-l5 w3-round w3-border">&nbsp;';
		layout += '<input type="button" id="btnDelete" onclick="jsBuyCrypto.klikCancel()" value="Delete" class="w3-btn w3-theme-l5 w3-round w3-border">';
		layout += '</p>';
		
		layout += '<span id="msg"></span>';
		
		layout += '<p>';
		layout += '<label>Name: </label><span id="buy_name" class="w3-tag w3-theme-l1"></div>';
		layout += '</p>';
		
		layout += '<p>';
		layout += '<label>Amount: </label> <span id="buy_amount" class="w3-tag w3-theme-l1"></div> ';
		layout += '</p>';
		
		layout += '<p>';
		layout += '<label>Price:</label> <span id="buy_price" class="w3-tag w3-theme-l1"></div>';
		layout += '</p>';

		layout += '<p>';
		layout += '<label>Stock:</label> <span id="buy_stock" class="w3-tag w3-theme-l1"></div>';
		layout += '</p>';
		
		layout += '</form>';
		
		document.getElementById('viewMid').innerHTML = layout;
	},
	
	readOne: function(){
		let obj = {
			"login_blok":g.login_blok,
			"buy_blok": this.blok
		};

		loadDoc(myServer+"crypto/buy_read_one.php",showOne, obj); 
		
		function showOne(xhttp){
			let serebuan = 0;
			let amount=0;
			let price=0;
			let stock=0;
			
			var stark = JSON.parse(xhttp.responseText);
			amount = parseFloat(stark.data[0].buy_amount);
			price= parseFloat(stark.data[0].buy_price);
			stock=amount/price;
			
			document.getElementById('buy_name').innerHTML = stark.data[0].buy_name.toUpperCase();	
			document.getElementById('buy_amount').innerHTML = formatSerebuan(amount.toFixed(2)) + " IDR" ;	
			document.getElementById('buy_price').innerHTML = formatSerebuan(price.toFixed(2)) + " IDR";	
			document.getElementById('buy_stock').innerHTML = stock +" "+stark.data[0].buy_name.toUpperCase();	

		}
		
	},
	
	klikCancel: function(){
		let obj = {
			"login_blok":g.login_blok,
			"buy_blok": this.blok
		};

		loadDoc(myServer+"crypto/buy_delete_one.php",this.serverMessage, obj); 
		
	},
	
	serverMessage: function(xhttp){

		var marvel = JSON.parse(xhttp.responseText);
	
		if (marvel.err == 0){
			
			document.getElementById("btnDelete").disabled = true;
		
		} 
		
		document.getElementById("msg").innerHTML = papanInfo(marvel.msg, marvel.err);
		
	},

}
