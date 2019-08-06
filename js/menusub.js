
var jsMenusub={

	viewRead: function(){
		
		var obj = {
			"login_blok":g.login_blok,
			"company_blok":g.company_blok
		};
		
		loadDoc(myServer+"menusub/read_company.php",this.showMenu, obj); 

	},
	
	showMenu: function (xhttp) {
		
		var txt;
		var bizarro = JSON.parse(xhttp.responseText);
		txt='<div>';
		
		var kelompok, cetak;
		
		if (bizarro.err==0){

			for (x in bizarro.data) {
				
				cetak = '<button onclick="menuFunction(\''+bizarro.data[x].menu_group+'\')"  class="w3-bar-item w3-button w3-theme-l3" >'+bizarro.data[x].menu_group+'&nbsp<i class="fa fa-caret-down"></i></button>';
				
				if (x==0){
					
					kelompok = bizarro.data[x].menu_group;
					
					txt+=cetak;
					
					txt += '<div id='+bizarro.data[x].menu_group+'   class="w3-hide">';

				}
				
				if (kelompok!=bizarro.data[x].menu_group){
					
					txt += '</div>';	
					
					txt+=cetak;
					
					txt += '<div id='+bizarro.data[x].menu_group+'   class="w3-hide">';
					
					txt += "<input type ='button' onClick='jsMenusub.menuKlik(this)' value='"+bizarro.data[x].menu_name+"' class='w3-bar-item w3-button'>";

				}
				
				else{

					txt += "<input type ='button' onClick='jsMenusub.menuKlik(this)' value='"+bizarro.data[x].menu_name+"' class='w3-bar-item w3-button'>";
					
				}
				
				kelompok = bizarro.data[x].menu_group;
				
			}

		}
		
		txt +='</div>';
		
		document.getElementById("menuDua").innerHTML = txt;
		
	},

	menuKlik(nameMenu){
		
		switch (nameMenu.value){

			case "Chart of Account":
				jsCoa.viewRead();
				break;

			case "Jobs":
				jsJob.viewRead();
				break;

			case "Journal Entry":
				jsJournal.viewRead();
				break;

		}
	},
	
	menuKlikX(nameMenu){
		alert(nameMenu);

	}
}
