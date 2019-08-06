
jsWithdrawCrypto ={
	blok:null,
	action:null,
	halaman:null,

	viewRead: function (){

		this.action = "read";

		var layout  = '';
		layout += '<div class="w3-container w3-theme-d4 w3-round w3-border">';
		layout += '<h3>Withdraw: READ</h3>';
		layout += '</div>';
		
		layout += '<div class="w3-container w3-card">';
		
		layout += '<div class="w3-row w3-section  w3-theme-d4">';
		layout += '<div class="w3-col w3-center" style="width:50px"><i class="w3-xxlarge fa fa-search"></i></div>';
		layout += '<div class="w3-rest">';
		layout += '<input type="text" onkeyup="jsWithdrawCrypto.viewSearch(this.value)" placeholder="Type to search..." id="cari" class="w3-input w3-border">';
		layout += '</div>';
		layout += '</div>';

		layout += '<p id="showPaging"></p>';
		layout += '<input type="button" onclick="jsWithdrawCrypto.viewCreate()" value="Create" class="w3-btn w3-theme-l5 w3-border w3-round-large"> ';		

		layout += '<span id="count"></span>';
		layout += '<p id="showTable"></p>';
		
		layout += '</div>';
		
		document.getElementById('viewMid').innerHTML = layout;

		let obj = {
			"login_blok":g.login_blok
		};
		
		if (this.halaman==null){

			loadDoc(myServer+"crypto/withdraw_read_paging.php",this.showData, obj); 
			
		}else{

			loadDoc(this.halaman,this.showData, obj)
		}		
		
		document.getElementById("cari").focus();
	},
	
	showData: function(xhttp){

		var txt;
		
		var valkyrie = JSON.parse(xhttp.responseText);
		
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
		
	    if (valkyrie.err==0){
			let amount=0;
			
			for (x in valkyrie.data) {
				amount = parseFloat(valkyrie.data[x].withdraw_amount);

				txt += "<tr>";
				txt += "<td>"+valkyrie.data[x].nomer + "</td>";
				txt += "<td>"+valkyrie.data[x].withdraw_name.toUpperCase() + "</td>";
				txt += "<td>"+valkyrie.data[x].withdraw_bank + "</td>";
				txt += "<td>"+valkyrie.data[x].withdraw_rekening + "</td>";
				txt += "<td class='w3-right-align'>"+formatSerebuan(amount.toFixed(2)) + " IDR</td>";
				
				txt += "<td>"+valkyrie.data[x].user_name + "</td>";
				txt += "<td>"+valkyrie.data[x].date_created + "</td>";

				txt += "</tr>";
			}

		}
		
		txt+="</table></div>";
		
		document.getElementById("count").innerHTML = "Total record: <span class='w3-tag w3-theme-l1'>" + valkyrie.msg +'</span>';
		
		document.getElementById("showTable").innerHTML = txt;
		

		txt="";
		if (jsWithdrawCrypto.action=="read"){
			
			if (valkyrie.err===0){
				
				if (valkyrie.paging.first!=""){
					
					txt+= "<input type='button' value= 'First' onclick='jsWithdrawCrypto.gotoPage(\"" + valkyrie.paging.first + "\")' class='w3-btn w3-theme-l5 w3-border w3-round-xlarge'>&nbsp;" ;
					
				}
				
				for (x in valkyrie.paging.pages) {
					
					if (valkyrie.paging.pages[x].current_page=="yes"){
						
						txt+= "<input type='button' value = '"+ valkyrie.paging.pages[x].page +"' onclick='jsWithdrawCrypto.gotoPage(\"" + valkyrie.paging.pages[x].url + "\")' disabled class='w3-btn w3-theme-l5 w3-border w3-round-xlarge'>&nbsp;";	
						
					} 
					else{
						
						txt+= "<input type='button' value = '"+ valkyrie.paging.pages[x].page +"' onclick='jsWithdrawCrypto.gotoPage(\"" + valkyrie.paging.pages[x].url + "\")' class='w3-btn w3-theme-l5 w3-border w3-round-xlarge'>&nbsp;";	
						
					}
				}
				
				if (valkyrie.paging.last!=""){
					
					txt+= "<input type='button' value= 'Last' onclick='jsWithdrawCrypto.gotoPage(\"" + valkyrie.paging.last + "\")' class='w3-btn w3-theme-l5 w3-border w3-round-xlarge'>&nbsp;" ;
					
				}
				
				 
			}

		}
		document.getElementById("showPaging").innerHTML = txt;

		if (valkyrie.err!=0){

			messageBox(valkyrie.msg);

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
		
		var btn ='<input type="button" onclick="jsWithdrawCrypto.viewRead()" value="Read" class="w3-btn w3-theme-l5 w3-border w3-round-large">&nbsp;';
		
		if (this.action.toUpperCase() == 'CREATE'){
			
			btn+='<input type="button" id = "btnCreate" onclick="jsWithdrawCrypto.klikCreate()" value="Create" class="w3-btn w3-theme-l5 w3-border w3-round-large">&nbsp;';
			
		}
		
		let layout  = '';
		
		layout += '<div class="w3-container w3-theme-d4 w3-round w3-border">';
		layout += '<h3>Withdraw: '+ this.action.toUpperCase() +'</h3>';
		layout += '</div>';
		
		layout += '<form class="w3-container w3-card">';
		layout += '<p>';
		layout += btn;
		layout += '</p>';
		
		layout += '<span id="msg"></span>';
		
		layout += '<p>';
		layout += '<label>Name:</label>';
		layout += '<select id="withdraw_name" class="w3-select w3-border">';
		layout += '<option selected>IDR</option>';
		layout += '<option>USD</option>';
		layout += '<option>YEN</option>';
		layout += '<option>EUR</option>';
		layout += '</select>';
		layout += '</p>';
		
		layout += '<p>';
		layout += '<label>Bank:</label>';
		layout += '<select id="withdraw_bank" class="w3-select w3-border">';
		layout += '<option selected>BNI</option>';
		layout += '<option>BCA</option>';
		layout += '<option>BNI</option>';
		layout += '<option>BRI</option>';
		layout += '<option>BSM</option>';
		layout += '</select>';
		layout += '</p>';
		
		layout += '<p>';
		layout += '<label>Tujuan No. Rekening: </label>';
		layout += '<input type ="text" id = "withdraw_rekening" class="w3-input w3-border">';
		layout += '</p>';
		
		layout += '<p>';
		layout += '<label>Amount: </label>';
		layout += '<input type ="text" id = "withdraw_amount" placeholder="10000000 (tanpa titik/koma)" class="w3-input w3-border">';
		layout += '</p>';

		layout += '</form>';
		
		document.getElementById('viewMid').innerHTML = layout;		
		document.getElementById('withdraw_rekening').focus();		
		
	},
	
	klikCreate: function(){

		if (document.getElementById("btnCreate").value=="Create"){		
			
			let obj = {
				"login_blok":g.login_blok,
				"withdraw_name":document.getElementById("withdraw_name").value,
				"withdraw_bank":document.getElementById("withdraw_bank").value,
				"withdraw_rekening":document.getElementById("withdraw_rekening").value,
				"withdraw_amount":document.getElementById("withdraw_amount").value
			};
				
			loadDoc(myServer+"crypto/withdraw_create_one.php",this.serverMessage, obj); 
			
		}
		
		else{
			
			document.getElementById("btnCreate").value="Create";
			
			this.reset();

		}
	},

	serverMessage: function(xhttp){

		var shuri = JSON.parse(xhttp.responseText);
	
		if (shuri.err==0){

			if (shuri.metode=="Create"){
				
				document.getElementById("btnCreate").value="Reset";
				
			}
		
		} 
		
		document.getElementById("msg").innerHTML = papanInfo(shuri.msg, shuri.err);
		
	},
	
	reset:	function(){
		
		document.getElementById("msg").innerHTML = "";
		
		document.getElementById("withdraw_rekening").value = "";
		document.getElementById("withdraw_amount").value = "";
		
		document.getElementById("withdraw_rekening").focus();

	},
	
	viewSearch: function (ini){
		
		this.action="search";
		
		if (ini.length==0){

			this.halaman=null;

			jsWithdrawCrypto.viewRead();
			
		}else{
			
			var obj = {
				"login_blok":g.login_blok,
				"search":ini
			};
			
			loadDoc(myServer + "crypto/Withdraw_search.php",this.showData, obj); 
		
		}
	
	},
	
}
