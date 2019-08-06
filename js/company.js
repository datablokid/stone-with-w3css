
var jsCompany={
	halaman: null,
	blok: null,
	
	viewCompany: function(){
		
		if (g.company_blok!=null){
			this.viewProfile(g.company_blok);
		}
		else{
			this.viewOpen();
		}
		
	},
	
	viewOpen: function(){
		
		this.blok=null;
		
		sessionStorage.removeItem("company_blok");
		
		sessionStorage.removeItem("company_name");
		
		g.company_blok=null;
		
		jsMenu.viewRead();
				
		jsMenusub.viewRead();
		
		jsLogin.isLogin();
		
		this.action = "open";
		
		var layout  = '';
		layout += '<div class="w3-container w3-theme-d4 w3-round w3-border">';
		layout += '<h3>Company: OPEN FILE</h3>';
		layout += '</div>';
		
		layout += '<div class="w3-container w3-card">';
		
		layout += '<div class="w3-row w3-section  w3-theme-d4">';
		layout += '<div class="w3-col w3-center" style="width:50px"><i class="w3-xxlarge fa fa-search"></i></div>';
		layout += '<div class="w3-rest">';
		layout += '<input type="text" onkeyup="jsCompany.viewSearch(this.value)" placeholder="Type to search..." id="cari" class="w3-input w3-border">';
		layout += '</div>';
		layout += '</div>';

		layout += '<p id="showPaging"></p>';
		layout += '<input type="button" onclick="jsCompany.viewCreate()" value="Create" class="w3-btn w3-theme-l5 w3-border w3-round-large"> ';
		layout += '<span id="count"></span>';
		
		layout += '<p id="showTable"></p>';
		layout += '</div>';
		
		document.getElementById('viewMid').innerHTML = layout;

		let obj = {"login_blok":g.login_blok};
		
		if (this.halaman==null){

			loadDoc(myServer+"company/read_paging.php",this.showData, obj); 
			
		}else{

			loadDoc(this.halaman,this.showData, obj)
		}		
		
		document.getElementById("cari").focus();

	},
	
	showData: function(xhttp){
		var txt;
		
		var jarvis = JSON.parse(xhttp.responseText);
		
		txt ='<div class="w3-responsive">';
		txt+='<table border=1 class="w3-table-all">';
		txt+='<thead><tr class="w3-theme-l1">';

		txt+="<th>No.</th>";
		txt+="<th>Company Name</th>";
		txt+="<th>Address Line 1</th>";
		txt+="<th>Address Line 2</th>";
		
		txt+="<th>Owner</th>";
		txt+="<th>Created</th>";
		txt+="<th>Select File</th>";
		txt+="<th colspan=2 class='w3-center'>Edit</th>";
		
		txt+="</tr></thead>"
		
	    if (jarvis.err===0){
			
			for (x in jarvis.data) {
				txt += "<tr>";
				txt += "<td>"+jarvis.data[x].nomer + "</td>";
				
				txt += "<td>"+jarvis.data[x].company_name + "</td>";
				txt += "<td>"+jarvis.data[x].company_address1 + "</td>";
				txt += "<td>"+jarvis.data[x].company_address2 + "</td>";
				
				txt += "<td>"+jarvis.data[x].user_name + "</td>";
				txt += "<td>"+jarvis.data[x].date_created + "</td>";

				txt += "<td class='w3-center'><input type='button' id='det' onClick='jsCompany.viewProfile(\"" + jarvis.data[x].company_blok + "\");' value='Open' class='w3-btn w3-theme-l5 w3-border w3-round-large'></td>";
				txt += "<td class='w3-center'><input type='button' id='upd' onClick='jsCompany.viewUpdate(\"" + jarvis.data[x].company_blok + "\");' value='Update' class='w3-btn w3-theme-l5 w3-border w3-round-large'></td>";
				txt += "<td class='w3-center'><input type='button' id='del' onClick='jsCompany.viewDelete(\"" + jarvis.data[x].company_blok + "\");' value='Delete' class='w3-btn w3-theme-l5 w3-border w3-round-large'></td>";
				
				txt += "</tr>";
			}

		}
		txt+="</table></div>";
		
		document.getElementById("count").innerHTML = "Total record: <span class='w3-tag w3-theme-l1'>" + jarvis.msg+'</span>';
		document.getElementById("showTable").innerHTML = txt;
		
		if (jsNote.action=="read"){
			
			txt="";
			
			if (jarvis.err===0){
				
				if (jarvis.paging.first!=""){
					
					txt+= "<input type='button' value= 'First' onclick='jsCompany.gotoPage(\"" + jarvis.paging.first + "\")'>" ;
					
				}
				
				for (x in jarvis.paging.pages) {
					
					if (jarvis.paging.pages[x].current_page=="yes"){
						
						txt+= "<input type='button' value = '"+ jarvis.paging.pages[x].page +"' onclick='jsCompany.gotoPage(\"" + jarvis.paging.pages[x].url + "\")' disabled>";	
						
					} 
					
					else{
						
						txt+= "<input type='button' value = '"+ jarvis.paging.pages[x].page +"' onclick='jsCompany.gotoPage(\"" + jarvis.paging.pages[x].url + "\")'>";	
						
					}
					
				}
				
				if (jarvis.paging.last!=""){
					
					txt+= "<input type='button' value= 'Last' onclick='jsCompany.gotoPage(\"" + jarvis.paging.last + "\")'>" ;
					
				}
				
			}
			
			document.getElementById("showPaging").innerHTML = txt; 

		}

		if (jarvis.err!=0){

			messageBox(jarvis.msg);

		}
		
	},
	
	gotoPage: function (ini){

		this.halaman = ini;
		
		this.viewRead();
	},
	
	viewCreate: function(){
		
		this.action="new file";
		this.htmlShow();
	
	},
	
	htmlShow: function(){
		
		var btn ='<input type="button" id = "btnBack" onclick="jsCompany.viewCompany()" value="Read" class="w3-btn w3-theme-l5 w3-border w3-round-large">&nbsp;';
		
		if (this.action=='new file'){
			btn +='<input type="button" id = "btnCreate" onclick="jsCompany.klikCreate()" value="Create" class="w3-btn w3-theme-l5 w3-border w3-round-large">&nbsp;';
		}
		if (this.action=='edit'){
			btn +='<input type="button" id = "btnBack" onclick="jsCompany.viewCompany()" value="Back" class="w3-btn w3-theme-l5 w3-border w3-round-large">&nbsp;';
		}
		if (this.action=='delete'){
			btn +='<input type="button" id = "btnDelete" onclick="jsCompany.klikDelete()" value="Delete" class="w3-btn w3-theme-l5 w3-border w3-round-large">&nbsp;';
		}
		if (this.action=='update'){
			btn +='<input type="button" id = "btnUpdate" onclick="jsCompany.klikUpdate()" value="Update" class="w3-btn w3-theme-l5 w3-border w3-round-large">&nbsp;';
		}
		
		
		let layout  = '';
		
		layout += '<div class="w3-container w3-theme-d4 w3-round w3-border">';
		layout += '<h3>Company: '+ this.action.toUpperCase() +'</h3>';
		layout += '</div>';
		
		layout += '<form class="w3-container w3-card">';
		layout += '<p>';
		layout += btn;
		layout += '</p>';
		
		layout += '<div id="msg"></div>';
		
		layout += '<p>';
		layout += '<label>Name:</label>';
		layout += '<input type="text" id = "company_name" class="w3-input w3-border">';		
		layout += '</p>';
		
		layout += '<p>';
		layout += '<label>Address Line 1:</label>';
		layout += '<input type="text" id = "company_address1" class="w3-input w3-border">';		
		layout += '</p>';
		
		layout += '<p>';
		layout += '<label>Address Line 2:</label>';
		layout += '<input type="text" id = "company_address2" class="w3-input w3-border">';		
		layout += '<p>';
		
		layout += '<p>';
		layout += '<label>Telephone:</label>';
		layout += '<input type="text" id = "company_phone" class="w3-input w3-border">';					
		layout += '</p>';

		layout += '</form>';
		
		document.getElementById('viewMid').innerHTML = layout;		
		
		document.getElementById("company_name").focus();
	},
	
	klikCreate: function(){

		if (document.getElementById("btnCreate").value=="Create"){		
			
			let obj = {
				"login_blok":g.login_blok,
				"company_name":document.getElementById("company_name").value,
				"company_address1":document.getElementById("company_address1").value,
				"company_address2":document.getElementById("company_address2").value,
				"company_phone":document.getElementById("company_phone").value
			};
				
			loadDoc(myServer+"company/create_one.php",this.serverMessage, obj); 
			
			
		}else{
			
			document.getElementById("btnCreate").value="Create";
			
			this.reset();
		}
	},

	serverMessage: function(xhttp){
		
		var pepper = JSON.parse(xhttp.responseText);
	
		if (pepper.err === 0){

			if (pepper.metode==="Create"){

				document.getElementById("btnCreate").value="Reset";

			}
		
		} 
		
		document.getElementById("msg").innerHTML=papanInfo(pepper.msg, pepper.err);
		
	},
	
	reset:	function(){

		document.getElementById("msg").innerHTML = "";
		
		document.getElementById("company_name").value = "";
		document.getElementById("company_address1").value = "";
		document.getElementById("company_address2").value = "";
		document.getElementById("company_phone").value = "";
		
		document.getElementById("company_name").focus();
	},
	
	viewProfile(blok){
		this.blok=blok;
		this.action="profile";
		this.readOne();
	},
	
	readOne: function(){
		
		let obj={
			"login_blok":g.login_blok,
			"company_blok":this.blok
		};
			
		loadDoc(myServer+"company/read_one.php",loadData, obj); 

		function loadData(xhttp){
			
			let hill = JSON.parse(xhttp.responseText);
			
			if (hill.err == 0) {

				var layout='';
				
				layout += '<div class="w3-container w3-theme-d4 w3-round w3-border">';
				layout += '<h3>Company: Profile</h3>';		
				layout += '</div>';
				
				layout += '<div class="w3-container w3-card">';
				layout += '<p>';
				layout += '<input type="button" id = "btnCreate" onclick="jsCompany.viewOpen()" value="Close" class="w3-btn w3-theme-l5 w3-border w3-round-large">';
				layout += '</p>';		
				
				layout += '<p>';
				layout += '<label>Blok: </label>';
				layout += '<span class="w3-tag w3-theme-l1">'+hill.data[0].company_blok+'</span>';		
				layout += '</p>';		
				
				layout += '<p>';
				layout += '<label>Company Name: </label>';		
				layout += '<span class="w3-tag w3-theme-l1">'+hill.data[0].company_name+'</span>';
				layout += '</p>';
				
				layout += '<p>';
				layout += '<label>Address Line 1: </label>';		
				layout += '<span class="w3-tag w3-theme-l1">'+hill.data[0].company_address1+'</span>';
				layout += '</p>';
				
				layout += '<p>';
				layout += '<label>Address Line 2: </label>';		
				layout += '<span class="w3-tag w3-theme-l1">'+hill.data[0].company_address2+'</span>';
				layout += '</p>';
				
				layout += '<p>';
				layout += '<label>Telephone: </label>';
				layout += '<span class="w3-tag w3-theme-l1">'+hill.data[0].company_phone+'</span>';	
				layout += '</p>';		
				
				layout += '</div>';

				document.getElementById('viewMid').innerHTML = layout;		
				
				sessionStorage.setItem("company_blok", hill.data[0].company_blok);
				sessionStorage.setItem("company_name", hill.data[0].company_name);
				
				g.company_blok=hill.data[0].company_blok;
				g.company_name=hill.data[0].company_name;
				
				this.blok=g.company_blok;
				
				jsLogin.isLogin();
				
				jsMenu.viewRead();
				
				jsMenusub.viewRead();
				
			}else{

				document.getElementById('msg').innerHTML = papanInfo(hill.msg, hill.err);		

			}
		}
	},
	
	viewEdit(){
		this.blok=blok;
		this.action="edit";
		this.htmlShow();
		this.readOneEdit();		
	},
	
	readOneEdit: function(){
		
		let obj={"login_blok":g.login_blok
			,"company_blok":this.blok};
			
		loadDoc(myServer+"company/read_one.php",loadData, obj); 

		function loadData(xhttp){
			
			let coulson = JSON.parse(xhttp.responseText);
			
			if (coulson.err ===0) {
				
				document.getElementById("company_name").value =coulson.data[0].company_name;
				document.getElementById("company_address1").value =coulson.data[0].company_address1;
				document.getElementById("company_address2").value =coulson.data[0].company_address2;
				document.getElementById("company_phone").value  =coulson.data[0].company_phone;
				
				document.getElementById("company_name").focus();
				
			}else{

				document.getElementById("msg").innerHTML=papanInfo(coulson.msg, coulson.err);

			}
		}
	},
	
	viewDelete(blok){
		this.blok=blok;
		this.action="delete";
		this.htmlShow();
		this.readOneEdit();		
	},
	
	klikDelete:function(){
		
		var obj = {
			"login_blok":g.login_blok,
			"company_blok":this.blok
		};
			
		loadDoc(myServer+"company/delete_one.php",this.serverMessage, obj); 
		
		document.getElementById("btnDelete").disabled=true;
		
	}, 

	viewUpdate(blok){
		this.blok=blok;
		this.action="update";
		this.htmlShow();
		this.readOneEdit();		
	},
	
	klikUpdate: function(){
		
		var obj = {"login_blok":g.login_blok
			, "company_blok":this.blok
			, "company_name":document.getElementById("company_name").value
			, "company_address1":document.getElementById("company_address1").value
			, "company_address2":document.getElementById("company_address2").value
			, "company_phone":document.getElementById("company_phone").value
		};
			
		loadDoc(myServer+"company/update_one.php",this.serverMessage, obj); 
		
		document.getElementById("btnUpdate").disabled=true;
		
	}
	
}
