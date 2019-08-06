
var oUser={
	blok: null,
	company_blok: null,
	action: null,

	viewRead: function(){
		var layout  ='';
		layout += '<div class="w3-container w3-theme-d4">';
		layout += '<h3>User: READ</h3>';
		layout += '</div>';
		
		layout += '<div class="w3-container w3-card">';
		layout += '<p id="userAktif"></p>';
		layout += '<p id="companyOpen"></p>';
		
		layout += '<div class="w3-row w3-section  w3-theme-d4">';
		layout += '<div class="w3-col w3-center" style="width:40px;padding-top:5px"><i class="w3-xlarge fa fa-search"></i></div>';
		layout += '<div class="w3-rest">';
		layout += '<input type="text" onkeyup="search1(this.value)" placeholder="Type to search..." id="cari" class="w3-input w3-border">';
		layout += '</div>';
		layout += '</div>';
		
		layout += '<p>';
		layout += '<input type="button" onclick="oUser.viewCreate()" value="Create" class="w3-btn w3-theme-l5 w3-round w3-border">';
		layout += '</p>';
		
		layout += '<p id="showPaging"></p>';
		layout += '<span id="count"></span>';
		layout += '<p id="showTabel"></p>';
		layout += '<p id="msg"></p>';
		layout += '</div>';
		
		document.getElementById('viewMid').innerHTML = layout;
		
		let obj = {"login_blok": g.login_blok}
		
		if (this.halaman==null){

			loadDoc(myServer+"user/read_paging.php",this.showPaging, obj); 
		
		}else{
			
			loadDoc(this.halaman,this.showPaging, obj)
		}
	},
	showPaging: function(xhttp) {
		
		var txt;
		var starlord=JSON.parse(xhttp.responseText);
		
		txt ='<div class="w3-responsive">';
		txt+='<table border=1 class="w3-table-all">';
		txt+='<thead><tr class="w3-theme-l1">';
			txt+="<th>No.</th>";
			txt+="<th>User Name</th>";
			txt+="<th>Full Name</th>";
			txt+="<th>Owner</th>";
			txt+="<th>Created</th>";
			txt+="<th colspan=4 class='w3-center'>Action</th>";
		txt+="</tr></thead>";
		
		// 5.3. bila response -OK		
	    if (starlord.err==0){
			
			// 5.3.1 bila ada record data
			for (x in starlord.data) {
				txt += "<tr>";
				txt += "<td>"+starlord.data[x].nomer + "</td>";
				txt += "<td>"+starlord.data[x].user_name + "</td>";
				txt += "<td>"+starlord.data[x].user_fullname + "</td>";
				txt += "<td>"+starlord.data[x].user_parent + "</td>";
				txt += "<td>"+starlord.data[x].date_created + "</td>";
				txt += "<td class='w3-center'><input type='button' id='upd' onClick='oUser.viewUpdate(\"" + starlord.data[x].user_blok + "\");' value='Update' class='w3-btn w3-theme-l5 w3-border w3-round '></td>";
				txt += "<td class='w3-center'><input type='button' id='del' onClick='oUser.viewDelete(\"" + starlord.data[x].user_blok + "\");' value='Delete' class='w3-btn w3-theme-l5 w3-border w3-round'></td>";
				txt += "<td class='w3-center'><input type='button' id='men' onClick='oUser.viewMenu(\"" + starlord.data[x].user_blok + "\");' value='Menu' class='w3-btn w3-theme-l5 w3-border w3-round'></td>";
				txt += "<td class='w3-center'><input type='button' id='mnc' onClick='oUser.viewMenuCompany(\"" + starlord.data[x].user_blok + "\");' value='Menu by Company' class='w3-btn w3-theme-l5 w3-border w3-round w3-border'></td>";
				txt += "</tr>";
			}
			


		}
		txt+="</table>";
		txt+="</div>";

		document.getElementById("count").innerHTML = "Total record: <span class='w3-tag w3-theme-l1'>" + starlord.msg +'</span>';
		document.getElementById("showTabel").innerHTML = txt;
		
		txt="";
		if (starlord.err==0){
			
			if (myObj1.paging.first!=""){

				txt+= "<input type='button' value= 'First' onclick='oUser.gotoPage(\"" + myObj1.paging.first + "\")'>" ;
				
			}
			
			for (x in myObj1.paging.pages) {
				
				if (myObj1.paging.pages[x].current_page=="yes"){
					
					txt+= "<input type='button' value = '"+ myObj1.paging.pages[x].page +"' onclick='oUser.gotoPage(\"" + myObj1.paging.pages[x].url + "\")' disabled>";	
					
				} else {
					
					txt+= "<input type='button' value = '"+ myObj1.paging.pages[x].page +"' onclick='oUser.gotoPage(\"" + myObj1.paging.pages[x].url + "\")'>";	
				}
			}
			
			if (myObj1.paging.last!=""){
				
				txt+= "<input type='button' value= 'Last' onclick='oUser.gotoPage(\"" + myObj1.paging.last + "\")'>" ;
			}
			
		}
		
		document.getElementById("showPaging").innerHTML = txt; 

		if (starlord.err==1){

			document.getElementById("msg").innerHTML = starlord.msg;
			
		}
	},
	
	gotoPage: function(ini){
		
		this.halaman=ini;
		
		oUser.viewRead();

	},
	
	viewCreate: function(){

		this.action="create";
		
		this.htmlShow();
	},

	htmlShow: function(){
		
		var btn ='<input type="button" onclick="oUser.viewRead()" value="Read"  class="w3-btn w3-theme-l5 w3-border w3-round">&nbsp;';
		
		if (this.action.toUpperCase() == 'CREATE'){
			btn+='<input type="button" id = "btnCreate" onclick="oUser.klikCreate()" value="Create" class="w3-btn w3-theme-l5 w3-border w3-round">&nbsp;';
		}
		
		if (this.action.toUpperCase() == 'DELETE'){
			btn+='<input type="button" id = "btnDelete" onclick="oUser.klikDelete()" value="Delete" class="w3-btn w3-theme-l5 w3-border w3-round">&nbsp;';
		}
		
		if (this.action.toUpperCase() == 'UPDATE'){
			btn+='<input type="button" id = "btnUpdate" onclick="oUser.klikUpdate()" value="Update" class="w3-btn w3-theme-l5 w3-border w3-round">&nbsp;';
		}

		let layout  = '';

		layout += '<div class="w3-container w3-theme-d4">';
		layout += '<h3>User: '+ this.action.toUpperCase() +'</h3>';
		layout += '</div>';
		
		layout += '<form class="w3-container w3-card"><br>';
		layout += btn;
		layout += '<div id="msg"></div>';
		
		layout += '<p>';
		layout += '<label>User Name:</label>';
		layout += '<input type="text" id = "user_name" class="w3-input w3-border">';
		layout += '</p>';
		
		layout += '<p>';
		layout += '<label>Full Name:</label>';
		layout += '<input type="text" id = "user_fullname"  class="w3-input w3-border">';
		layout += '</p>';
		
		if (this.action.toUpperCase() == 'CREATE'){
			layout += '<p>';
			layout += 'Password:<br>';
			layout += '<input type="password" id = "user_password">';
			layout += '</p>';

			layout += '<p>';
			layout += 'Confirm Password:<br>';
			layout += '<input type="password" id = "confirm_password">';
			layout += '</p>';
		}

		layout += '</form>';
		
		// tampilkan //
		document.getElementById('viewMid').innerHTML = layout;	
		document.getElementById('user_name').focus();	
		
	},
	
	klikCreate: function(){
		if (document.getElementById("btnCreate").value=="Create"){		

			let obj = {
				"login_blok":g.login_blok,
				"user_name":document.getElementById("user_name").value,
				"user_fullname":document.getElementById("user_fullname").value,
				"user_password":document.getElementById("user_password").value,
				"confirm_password":document.getElementById("confirm_password").value
			};
				
			loadDoc(myServer+"user/create_one.php",this.showMessage, obj); 
			
		}else{
			
			document.getElementById("btnCreate").value="Create";
			
			this.reset();
		}
	},
	
	showMessage: function (xhttp) {
		// alert(xhttp.responseText);
		
		var hawkeye = JSON.parse(xhttp.responseText);
		
		if (hawkeye.err === 0){				
			// alert(this.action);
			if (oUser.action=="create"){
				
				document.getElementById("btnCreate").value="Reset";

			}
			
		}
		
		document.getElementById("msg").innerHTML = papanInfo(hawkeye.msg, hawkeye.err);

	},
	
	reset: function(){
		document.getElementById("user_name").value = "";
		document.getElementById("user_fullname").value = "";
		document.getElementById("user_password").value = "";
		document.getElementById("confirm_password").value = "";
		document.getElementById("msg").innerHTML = "";
		
		document.getElementById("user_name").focus();
	},
	
	viewDelete: function(blok){
		this.blok=blok;
		this.action="delete";
		
		this.htmlShow();
		this.loadReadOne();
	},

	loadReadOne: function(){
		
		let obj={
			"login_blok":g.login_blok,
			"user_blok":this.blok
		};
			
		loadDoc(myServer+"user/read_one.php",this.loadData, obj); 

	},

	loadData: function(xhttp){
		
		let widow = JSON.parse(xhttp.responseText);
		
		if (widow.err == 0) {

			document.getElementById("user_name").value = widow.data[0].user_name;
			document.getElementById("user_fullname").value = widow.data[0].user_fullname;
			document.getElementById("user_password").value = widow.data[0].user_password;
			document.getElementById("confirm_password").value = widow.data[0].user_password;
			
			
		}else{

			messageBox(myObj1.message);

		}

	},
	
	klikDelete: function(){
		
		let obj = {
			"login_blok":g.login_blok,
			"user_blok":this.blok
		};

		loadDoc(myServer+"user/delete_one.php",this.showMessage, obj); 
		
		document.getElementById("btnDelete").disabled=true;
	},
	
	viewUpdate: function(blok){
		this.blok=blok;
		this.action="update";
		
		this.htmlShow();
		this.loadReadOne();
	},

	klikUpdate: function(){
		
		var user_fullname=document.getElementById("user_fullname").value; 
		
		let obj = {"user_blok":this.blok
			, "login_blok":g.login_blok
			, "user_fullname":user_fullname};
			
		loadDoc(myServer+"user/update_one.php",this.showMessage, obj); 
		
		document.getElementById("btnUpdate").disabled=true;
	},
	
	viewMenu: function(blok){
		this.blok=blok;
		
		jsSubuser.viewRead(blok);
		
	},
	
	viewMenuCompany: function(blok){
		this.blok=blok;
		
		if (g.company_blok != null){
			
			this.company_blok=g.company_blok;
			
			jsSubusercompany.viewRead(blok);

		}
		else{
			messageBox("Company file not found. Open Company file to use it.");
		}
		
	}
	

}
