
var jsDepositCrypto ={
	blok:null,
	action:null,
	halaman:null,
	
	viewRead: function (){
		this.action = "read";

		var layout  = '';
		
		layout += '<div class="w3-container w3-theme-d4 w3-round w3-border">';
		layout += '<h3>Deposit: READ</h3>';
		layout += '</div>';
		
		layout += '<span id="msg"></span>';
		
		layout += '<div class="w3-container w3-card">';
		
		layout += '<div class="w3-row w3-section  w3-theme-d4">';
		layout += '<div class="w3-col w3-center" style="width:50px"><i class="w3-xxlarge fa fa-search"></i></div>';
		layout += '<div class="w3-rest">';
		layout += '<input type="text" onkeyup="jsDepositCrypto.viewSearch(this.value)" placeholder="Type to search..." id="cari" class="w3-input w3-border">';
		layout += '</div>';
		layout += '</div>';

		layout += '<p id="showPaging"></p>';
		layout += '<input type="button" onclick="jsDepositCrypto.viewCreate()" value="Create" class="w3-btn w3-theme-l5 w3-round w3-border">&nbsp;';
		
		layout += '<span id="count"></span>';
		layout += '<p id="showTable"></p>';
		
		layout += '</div>';
		
		document.getElementById('viewMid').innerHTML = layout;

		let obj = {
			"login_blok":g.login_blok
		};
		
		if (this.halaman==null){

			loadDoc(myServer+"crypto/deposit_read_paging.php",this.showData, obj); 
			
		}else{

			loadDoc(this.halaman,this.showData, obj)
		}		
		
		document.getElementById("cari").focus();
	},
	
	showData: function(xhttp){

		var txt;
		
		var scarlet = JSON.parse(xhttp.responseText);
		
		txt ='<div class="w3-responsive">';
		txt+='<table border=1 class="w3-table-all">';
		txt+='<thead><tr class="w3-theme-l1">';

		txt+="<th>No.</th>";
		txt+="<th>Name</th>";
		txt+="<th>Bank</th>";
		txt+="<th>Rekening</th>";
		txt+="<th class='w3-right-align'>Amount</th>";
		
		txt+="<th>Owner</th>";
		txt+="<th>Created</th>";
		
		txt+="</tr></thead>";
		
	    if (scarlet.err===0){
			
			let amount=0;

			for (x in scarlet.data) {
				
				amount=parseFloat(scarlet.data[x].deposit_amount);
				
				txt += "<tr>";
				txt += "<td>"+scarlet.data[x].nomer + "</td>";
				txt += "<td>"+scarlet.data[x].deposit_name.toUpperCase() + "</td>";
				txt += "<td>"+scarlet.data[x].deposit_bank + "</td>";
				txt += "<td>"+scarlet.data[x].deposit_rekening + "</td>";
				txt += "<td class='w3-right-align'>"+formatSerebuan(amount) + " IDR</td>";
				
				txt += "<td>"+scarlet.data[x].user_name + "</td>";
				txt += "<td>"+scarlet.data[x].date_created + "</td>";

				txt += "</tr>";
			}

		}

		txt+="</table></div>";
		
		document.getElementById("showTable").innerHTML = txt;
		document.getElementById("count").innerHTML = "Total record: <span class='w3-tag w3-theme-l1'>" + scarlet.msg+'</span>';
		
		txt="";
		
		if (jsDepositCrypto.action=="read"){
			
			if (scarlet.err===0){
				
				if (scarlet.paging.first!=""){
					
					txt+= "<input type='button' value= 'First' onclick='jsDepositCrypto.gotoPage(\"" + scarlet.paging.first + "\")'  class='w3-btn w3-theme-l5 w3-round w3-border'>&nbsp;" ;
					
				}
				
				for (x in scarlet.paging.pages) {
					
					if (scarlet.paging.pages[x].current_page=="yes"){
						
						txt+= "<input type='button' value = '"+ scarlet.paging.pages[x].page +"' onclick='jsDepositCrypto.gotoPage(\"" + scarlet.paging.pages[x].url + "\")' disabled class='w3-btn w3-theme-l5 w3-round w3-border'>&nbsp;";	
						
					} 
					else{
						
						txt+= "<input type='button' value = '"+ scarlet.paging.pages[x].page +"' onclick='jsDepositCrypto.gotoPage(\"" + scarlet.paging.pages[x].url + "\")' class='w3-btn w3-theme-l5 w3-round w3-border'>&nbsp;";	
						
					}

				}
				
				if (scarlet.paging.last!=""){
					
					txt+= "<input type='button' value= 'Last' onclick='jsDepositCrypto.gotoPage(\"" + scarlet.paging.last + "\")' class='w3-btn w3-theme-l5 w3-round w3-border'>&nbsp;" ;
					
				}
				
			}
		}
		
		document.getElementById("showPaging").innerHTML = txt; 

		if (scarlet.err!=0){

			messageBox(scarlet.msg);

		}
		
	},
	
	gotoPage: function (ini){

		this.halaman = ini;
		
		this.viewRead();
	},
	
	viewCreate: function(){
		
		this.action="create";
		this.htmlShow();

	}, 

	htmlShow: function(){
		
		var btn ='<input type="button" onclick="jsDepositCrypto.viewRead()" value="Read" class="w3-btn w3-theme-l5 w3-round w3-border">&nbsp;';
		
		if (this.action.toUpperCase() == 'CREATE'){
			
			btn+='<input type="button" id = "btnCreate" onclick="jsDepositCrypto.klikCreate()" value="Create" class="w3-btn w3-theme-l5 w3-round w3-border"><p>';
			
		}
				
		let layout  = '';
		
		layout += '<div class="w3-container w3-theme-d4 w3-round w3-border">';
		layout += '<h3>Deposit: '+ this.action.toUpperCase() +'</h3>';
		layout += '</div>';
		
		layout += '<form class="w3-container w3-card">';
		layout += '<p>';
		layout += btn;
		layout += '</p>';
		layout += '<span id="msg"></span>';
		
		layout += '<p>';
		layout += '<label>Name:</label>';
		layout += '<select id="deposit_name" class="w3-select w3-border">';
		layout += '<option selected>IDR</option>';
		layout += '<option>USD</option>';
		layout += '<option>YEN</option>';
		layout += '<option>EUR</option>';
		layout += '</select>';
		layout += '</p>';
		
		layout += '<p>';
		layout += '<label>Bank:</label>';
		layout += '<select id="deposit_bank" class="w3-select w3-border">';
		layout += '<option selected>BNI</option>';
		layout += '<option>BCA</option>';
		layout += '<option>BNI</option>';
		layout += '<option>BRI</option>';
		layout += '<option>BSM</option>';
		layout += '</select>';
		layout += '</p>';
		
		layout += '<p>';
		layout += '<label>Dari No. Rekening: </label>';
		layout += '<input type ="text" id = "deposit_rekening" class="w3-input w3-border">';
		layout += '</p>';
		
		layout += '<p>';
		layout += '<label>Amount: </label>';
		layout += '<input type ="text" id = "deposit_amount" placeholder="10000000 (tanpa titik/koma)" class="w3-input w3-border">';
		layout += '</p>';

		layout += '</form>';
		
		document.getElementById('viewMid').innerHTML = layout;		
		document.getElementById('deposit_rekening').focus();
		
	},
	
	klikCreate: function(){

		if (document.getElementById("btnCreate").value=="Create"){		
			
			let obj = {
				"login_blok":g.login_blok,
				"deposit_name":document.getElementById("deposit_name").value,
				"deposit_bank":document.getElementById("deposit_bank").value,
				"deposit_rekening":document.getElementById("deposit_rekening").value,
				"deposit_amount":document.getElementById("deposit_amount").value
			};
				
			loadDoc(myServer+"crypto/deposit_create_one.php",this.serverMessage, obj); 
			
		}
		else{
			
			document.getElementById("btnCreate").value="Create";
			
			this.reset();
		}

	},

	serverMessage: function(xhttp){

		var wong = JSON.parse(xhttp.responseText);
	
		if (wong.err==0){

			if (wong.metode=="Create"){
				
				document.getElementById("btnCreate").value="Reset";
			}
		
		} 

		document.getElementById("msg").innerHTML=papanInfo(wong.msg, wong.err);
		
	},
	
	reset:	function(){
		
		document.getElementById("msg").innerHTML = "";
		
		document.getElementById("deposit_rekening").value = "";
		document.getElementById("deposit_amount").value = "";
		
		document.getElementById("deposit_rekening").focus();

	},
	
	viewSearch: function (ini){
		
		this.action="search";
		
		if (ini.length==0){

			this.halaman=null;

			jsDepositCrypto.viewRead();
			
		}
		else{
			
			var obj = {
				"login_blok":g.login_blok,
				"search":ini
			};
			
			loadDoc(myServer + "crypto/deposit_search.php",this.showData, obj); 
		
		}
	
	}
}
