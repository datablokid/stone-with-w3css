
var jsSubusercompany={
	blok: null,
	user_blok: null,
	company_blok:null,
	
	viewRead: function(user_blok){
		
		this.user_blok=user_blok;
		this.company_blok= g.company_blok
		
		var layout='';

		layout += '<h3>Subuser Company: MENU</h3>';
		
		layout += '<p id="companyOpen"></p>';
	
		layout += '<form>';
		layout += '<input type="button" onclick="oUser.viewRead()" value="Read">';
		layout += '<input type="button" onclick="jsSubusercompany.klikCreate()" value="Create" id="btnCreate"><p>';
		layout += '<p id="msg"></p>';
		
		layout += 'Company Name: ';
		layout += '<span id = "company_name" ></span><p>';

		layout += 'User Name: ';
		layout += '<span id = "user_name" ></span><p>';
		
		layout += 'Full Name: ';
		layout += '<span id = "user_fullname" ></span><p>';
		layout += '</form>';
		
		layout += '<p id="showIt"></p>';
		
		document.getElementById('viewMid').innerHTML = layout;

		let obj={
			"login_blok":g.login_blok,
			"user_blok":this.user_blok,
			"company_blok": this.company_blok
		};

		loadDoc(myServer+"user/read_one.php",this.showIsi, obj); 
		
		loadDoc(myServer+"menusub/read_menu_company.php",this.showMenu, obj); 
	},
	
	showIsi: function (xhttp){
		
		var spidey = JSON.parse(xhttp.responseText);
		
		if (spidey.err == 0) {
			
			document.getElementById("company_name").innerHTML = g.company_name;		
			document.getElementById("user_name").innerHTML = spidey.data[0].user_name;		
			document.getElementById("user_fullname").innerHTML = spidey.data[0].user_fullname;		
			
		}else{
			
			document.getElementById("msg").innerHTML = papanInfo(spidey.msg, spidey.err);

		}
	},

	showMenu: function(xhttp){		
		
		var falcon = JSON.parse(xhttp.responseText);
		
		txt ="<div >";
		txt+="<table border=1 >";
		txt+="<thead><tr >";

		txt+="<th>GROUP</th>";
		txt+="<th>MENU</th>";
		txt+="<th>ACCESS</th>";
		
		txt+="</tr></thead>";

		// 6.3. bila berhasil dibaca
		if (falcon.err ==0) {	
			
			// 6.3.1. urai berdasarkan record. 
			for (x in falcon.data) {

				txt+="<tr>";
				txt += "<td>"+falcon.data[x].menu_group +"</td>";
				txt += "<td><input type='text' name='menuName' value='" + falcon.data[x].menu_name + "' hidden>" + falcon.data[x].menu_name+"</td>";		
				txt += "<td>";
				txt += "<select name='menuAccess'>";
				
				if (falcon.data[x].menu_access==0){
					txt += terPilih(falcon.data[x].menu_name, falcon.data[x].menu_access, falcon.data[x].menu_selected);
					
				}else if (falcon.data[x].menu_access==1){
					txt += terPilih(falcon.data[x].menu_name,"0", falcon.data[x].menu_selected);
					txt += terPilih(falcon.data[x].menu_name,"1", falcon.data[x].menu_selected);
					
				}else if (falcon.data[x].menu_access==2){
					txt += terPilih(falcon.data[x].menu_name,"0", falcon.data[x].menu_selected);
					txt += terPilih(falcon.data[x].menu_name,"1", falcon.data[x].menu_selected);
					txt += terPilih(falcon.data[x].menu_name,"2", falcon.data[x].menu_selected);
					
				}else if (falcon.data[x].menu_access==3){					
					txt += terPilih(falcon.data[x].menu_name,"0", falcon.data[x].menu_selected);
					txt += terPilih(falcon.data[x].menu_name,"1", falcon.data[x].menu_selected);
					txt += terPilih(falcon.data[x].menu_name,"2", falcon.data[x].menu_selected);
					txt += terPilih(falcon.data[x].menu_name,"3", falcon.data[x].menu_selected);
					
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
		menuJSON["company_blok"] = this.company_blok;
		menuJSON["menu"] = names;
		
		// document.getElementById("msg").innerHTML = JSON.stringify(menuJSON);
		
		let data;
		data = JSON.stringify(menuJSON);
		
		loadDoc(myServer+"menusub/create_menu_company.php",this.showMessage, menuJSON); 
		
	},
	
	showMessage: function(xhttp){
		
		var bucky = JSON.parse(xhttp.responseText);
		
		document.getElementById("btnCreate").disabled=true;
		
		document.getElementById("msg").innerHTML = papanInfo(bucky.msg, bucky.err);
		
	}
}
