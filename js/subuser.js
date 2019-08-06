
var jsSubuser={
	user_blok: null,
	blok: null,
	action: null,

	viewRead: function(user_blok){
		
		this.user_blok=user_blok;
		
		var layout='';

		layout += '<div class="w3-container w3-theme-l2 w3-round w3-border">';
		layout += '<h3>Subuser: MENU</h3>';
		layout += '</div>';
		
		layout += '<p id="companyOpen"></p>';
	
		layout += '<form>';
		layout += '<input type="button" onclick="oUser.viewRead()" value="Read" class="w3-btn w3-theme-l5 w3-round w3-border">&nbsp;';
		layout += '<input type="button" onclick="jsSubuser.klikCreate()" value="Create" id="btnCreate"  class="w3-btn w3-theme-l5 w3-round w3-border"><p>';
		
		layout += '<div id="msg"></div>';
		
		layout += 'User Name: ';
		layout += '<span id = "user_name" class="w3-tag w3-theme-l2"></span><p>';
		
		layout += 'Full Name: ';
		layout += '<span id = "user_fullname"  class="w3-tag w3-theme-l2"></span><p>';
		
		layout += '</form>';
		
		layout += '<p id="showIt"></p>';
		
		document.getElementById('viewMid').innerHTML = layout;

		let obj={"login_blok":g.login_blok
			,"user_blok":this.user_blok};

		loadDoc(myServer+"user/read_one.php",this.showIsi, obj); 
			
		loadDoc(myServer+"menu/read_menu.php",this.showMenu, obj); 
	},
	
	showIsi: function (xhttp){

		var marvel = JSON.parse(xhttp.responseText);
		
		if (marvel.err==0) {
			
			document.getElementById("user_name").innerHTML=marvel.data[0].user_name;
			document.getElementById("user_fullname").innerHTML=marvel.data[0].user_fullname;		
			
		}else{
			
			document.getElementById("msg").innerHTML=papanInfo(marvel.msg, marvel.err);		

		}
	},

	
	showMenu: function(xhttp){		

		var fury = JSON.parse(xhttp.responseText);
		
		txt ='<div class="w3-responsive">';
		txt+='<table border=1 class="w3-table-all">';
		txt+='<thead><tr class="w3-theme-l2">';


		txt+="<th>GROUP</th>";
		txt+="<th>MENU</th>";
		txt+="<th>ACCESS</th>";
		
		txt+="</tr></thead>";

		if (fury.err === 0) {	
			
			for (x in fury.data) {

				txt +="<tr>";
				txt +="<td>"+fury.data[x].menu_group+"</td>";
				txt += "<td><input type='text' name='menuName' value='" + fury.data[x].menu_name + "' hidden>" + fury.data[x].menu_name+"</td>";		
				txt += "<td>";
				txt += "<select name='menuAccess'>";
				
				if (fury.data[x].menu_access==0){
					txt += terPilih(fury.data[x].menu_name, fury.data[x].menu_access, fury.data[x].menu_selected);
					
				}else if (fury.data[x].menu_access==1){
					txt += terPilih(fury.data[x].menu_name, "0", fury.data[x].menu_selected);
					txt += terPilih(fury.data[x].menu_name, "1", fury.data[x].menu_selected);
					
				}else if (fury.data[x].menu_access==2){
					txt += terPilih(fury.data[x].menu_name, "0", fury.data[x].menu_selected);
					txt += terPilih(fury.data[x].menu_name, "1", fury.data[x].menu_selected);
					txt += terPilih(fury.data[x].menu_name, "2", fury.data[x].menu_selected);
					
				}else if (fury.data[x].menu_access==3){					
					txt += terPilih(fury.data[x].menu_name,"0", fury.data[x].menu_selected);
					txt += terPilih(fury.data[x].menu_name,"1", fury.data[x].menu_selected);
					txt += terPilih(fury.data[x].menu_name,"2", fury.data[x].menu_selected);
					txt += terPilih(fury.data[x].menu_name,"3", fury.data[x].menu_selected);
					
				}

				txt += "</select>";
				txt += "</td>";
				txt+="</tr>";
			}

		}
		
		txt+="</table></div>";
		
		document.getElementById("showIt").innerHTML = txt;
		
		function terPilih(menuNama,menuAccess,menuSelected){
			var str = "<option value='ok' selected>budi</option>";
			var strMenu;
			
			switch(menuAccess){
				case 0: // tidak punya access apa-apa.
					strMenu = "No Access"; 
					break;			
				case "1": // can read = hanya bisa membaca, tidak bisa buat, hapus atau update
					strMenu = "Can Read";
					break;
				case "2": // can create= bisa membuat data baru
					strMenu = "Can Create";
					break;
				case "3": // can edit= bisa update, bisa delete
					strMenu = "Can Edit";
					break;
				default:
					strMenu = "No Access";
				
			}
			
			if (menuAccess==menuSelected){
				str = "<option value='" + menuNama +":"+ menuAccess +"' selected>"+ strMenu +"</option>";	
			
			}else {
				str = "<option value='" + menuNama +":"+ menuAccess +"'>"+ strMenu +"</option>";	
			}
			
			return str;

		}
	},
	
	klikCreate: function(){
		
		let elem = document.getElementsByName("menuAccess");
		let names = [];
		
		for (let i = 0; i < elem.length; ++i) {
			names.push(elem[i].value);
		}
		
		let menuJSON = {};
		menuJSON["login_blok"] = g.login_blok;
		menuJSON["user_blok"] = this.user_blok;
		menuJSON["menu"] = names;
		
		let data;
		data = JSON.stringify(menuJSON);
		
		loadDoc(myServer+"menu/create_menu.php",this.showMessage, menuJSON); 
		
	},
	
	showMessage: function(xhttp){
		
		var loki = JSON.parse(xhttp.responseText);
		
		document.getElementById("btnCreate").disabled=true;
		
		document.getElementById("msg").innerHTML=papanInfo(loki.msg, loki.err);
		// showSnackBar(myObj1.message);
	}

}
