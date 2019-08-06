
var jsFolder={	
	blok:null,
	action:null,
	halaman:null,
	
	viewRead: function(){
		this.action = "read";
		
		var layout  = '';
		layout += '<div class="w3-container w3-theme-d4">';
		layout += '<h3>Folder: READ</h3>';
		layout += '</div>';
		
		layout += '<div class="w3-container w3-card">';
		layout += '<br>';
		
		layout += '<div class="w3-row w3-section  w3-theme-d4">';
		layout += '<div class="w3-col w3-center" style="width:40px;padding-top:7px"><i class="w3-xlarge fa fa-search"></i></div>';
		layout += '<div class="w3-rest">';
		layout += '<input type="text" onkeyup="jsFolder.viewSearch(this.value)" placeholder="Type to search..." id="cari" class="w3-input w3-border">';
		layout += '</div>';
		layout += '</div>';

		layout += '<p id="showPaging"></p>';
		layout += '<input type="button" onclick="jsFolder.viewCreate()" value="Create" class="w3-btn w3-theme-l5 w3-round w3-border"> &nbsp;';		
		layout += '<span id="count"></span>';
		layout += '<p id="showTable"></p>';
		layout += '</div>';
		
		document.getElementById('viewMid').innerHTML = layout;

		let obj = {
			"login_blok":g.login_blok
		};
		
		if (this.halaman==null){

			loadDoc(myServer+"folder/read_paging.php",this.showData, obj); 
			
		}else{

			loadDoc(this.halaman,this.showData, obj)
		}		
		
		document.getElementById("cari").focus();

	},
	
	showData: function(xhttp){

		var txt;
		
		var aquaman = JSON.parse(xhttp.responseText);
		
		txt ='<div class="w3-responsive">';
		txt+='<table border=1 class="w3-table-all">';
		txt+='<thead><tr class="w3-theme-l1">';


		txt+="<th>No.</th>";
		txt+="<th>Name</th>";
		txt+="<th>Path</th>";
		txt+="<th>Sort</th>";
		txt+="<th>Hidden</th>";
		
		txt+="<th>Owner</th>";
		txt+="<th>Created</th>";
		txt+='<th colspan=2 class="w3-center">Edit</th>';
		
		txt+="</tr></thead>";
		
	    if (aquaman.err===0){
			
			for (x in aquaman.data) {

				txt += "<tr>";
				txt += "<td>"+aquaman.data[x].nomer + "</td>";
				txt += "<td>"+aquaman.data[x].folder_name + "</td>";
				txt += "<td>"+aquaman.data[x].folder_path + "</td>";
				txt += "<td>"+aquaman.data[x].folder_sort + "</td>";
				txt += "<td>"+aquaman.data[x].folder_hidden + "</td>";
				
				txt += "<td>"+aquaman.data[x].user_name + "</td>";
				txt += "<td>"+aquaman.data[x].date_created + "</td>";

				txt += "<td class='w3-center'><input type='button' id='upd' onClick='jsFolder.viewUpdate(\"" + aquaman.data[x].folder_blok + "\");' value='Update' class='w3-btn w3-theme-l5 w3-border w3-round'></td>";
				txt += "<td class='w3-center'><input type='button' id='del' onClick='jsFolder.viewDelete(\"" + aquaman.data[x].folder_blok + "\");' value='Delete' class='w3-btn w3-theme-l5 w3-border w3-round'></td>";
				
				txt += "</tr>";

			}

			

		}
		txt+="</table></div>";
		
		document.getElementById("count").innerHTML = "Total record: <span class='w3-tag w3-theme-l1'>" + aquaman.msg + '</span>';
		document.getElementById("showTable").innerHTML = txt;
		
		txt="";
		
		document.getElementById("showPaging").innerHTML = ''; 
		
		if (jsFolder.action=="read"){
			
			if (aquaman.err==0){
				
				if (aquaman.paging.first!=""){
					
					txt+= "<input type='button' value= 'First' onclick='jsFolder.gotoPage(\"" + aquaman.paging.first + "\")' class='w3-btn w3-theme-l5 w3-round w3-border'>&nbsp;" ;
					
				}
				
				for (x in aquaman.paging.pages) {
					
					if (aquaman.paging.pages[x].current_page=="yes"){
						
						txt+= "<input type='button' value = '"+ aquaman.paging.pages[x].page +"' onclick='jsFolder.gotoPage(\"" + aquaman.paging.pages[x].url + "\")' disabled  class='w3-btn w3-theme-l5 w3-round w3-border'>&nbsp;";	
						
					} 
					else{
						
						txt+= "<input type='button' value = '"+ aquaman.paging.pages[x].page +"' onclick='jsFolder.gotoPage(\"" + aquaman.paging.pages[x].url + "\")'  class='w3-btn w3-theme-l5 w3-round w3-border'>&nbsp;";	
						
					}

				}
				
				if (aquaman.paging.last!=""){
					
					txt+= "<input type='button' value= 'Last' onclick='jsFolder.gotoPage(\"" + aquaman.paging.last + "\")'  class='w3-btn w3-theme-l5 w3-round w3-border'>&nbsp;" ;
					
				}
				
				document.getElementById("showPaging").innerHTML = txt; 

			}
		}

		if (aquaman.err!=0){

			messageBox(aquaman.msg);

		}
		
	},
	
	gotoPage: function (ini){

		this.halaman = ini;
		
		this.viewRead();
	},
	
	viewCreate: function(){
		
		this.action="create";
		this.htmlShow();
		this.readDrive();

	}, 

	htmlShow: function(){
		
		var btn ='<input type="button" onclick="jsFolder.viewRead()" value="Read" class="w3-btn w3-theme-l5 w3-border w3-round">&nbsp;';
		
		if (this.action.toUpperCase() == 'CREATE'){
			btn+='<input type="button" id = "btnCreate" onclick="jsFolder.klikCreate()" value="Create" class="w3-btn w3-theme-l5 w3-border w3-round">&nbsp;';
		}
		
		if (this.action.toUpperCase() == 'DELETE'){
			btn+='<input type="button" id = "btnDelete" onclick="jsFolder.klikDelete()" value="Delete" class="w3-btn w3-theme-l5 w3-border w3-round">&nbsp;';
		}
		
		if (this.action.toUpperCase() == 'UPDATE'){
			btn+='<input type="button" id = "btnUpdate" onclick="jsFolder.klikUpdate()" value="Update" class="w3-btn w3-theme-l5 w3-border w3-round">&nbsp;';
		}
		
		let layout  = '';
		layout += '<div class="w3-container w3-theme-d4">';
		layout += '<h3>Folder: '+ this.action.toUpperCase() +'</h3>';
		layout += '</div>';
		
		layout += '<form class="w3-container w3-card">';
		layout += '<p>';
		layout += btn;
		layout += '<div id="msg"></div>';
		layout += '</p>';
		layout += '<p>';
		layout += '<input type ="hidden" id = "parent_blok">';
		layout += '<input type="button" onclick="jsFolderlookup.viewFind(\'folder\',0,\''+this.blok+'\')" value="Parent folder" id="btnparent"  class="w3-btn w3-theme-l5 w3-border w3-round">';
		layout += '<input type ="hidden" id = "parent_name">';
		layout += '<input type ="text" id = "folder_path" readonly="readonly" class="w3-input w3-border">';
		layout += '</p>';
		
		layout += '<p><label>Folder name</label><input type ="text" id = "folder_name" class="w3-input w3-border"></p>';
		
		layout += '<p><label>Sort</label><input type ="text" id = "folder_sort" class="w3-input w3-border"></p>';
		
		layout += '<p><input type ="checkbox" id = "folder_hidden" class="w3-check"><label>Private [not for public]</label></p>';

		layout += '</form>';
		
		document.getElementById('viewMid').innerHTML = layout;	
		document.getElementById('folder_name').focus();	
		
	},
	
	klikCreate: function(){

		if (document.getElementById("btnCreate").value=="Create"){		
			
			let obj = {
				"login_blok":g.login_blok,
				"parent_blok":document.getElementById("parent_blok").value,
				"folder_name":document.getElementById("folder_name").value,
				"folder_sort":document.getElementById("folder_sort").value,
				"folder_hidden":document.getElementById("folder_hidden").checked
			};
				
			loadDoc(myServer+"folder/create_one.php",this.serverMessage, obj); 
			
		}
		else{
			
			document.getElementById("btnCreate").value="Create";
			
			this.reset();
		}
	},

	serverMessage: function(xhttp){

		var flash = JSON.parse(xhttp.responseText);
		
		if (flash.err===0){
			
			if (flash.metode=="Create"){
				
				document.getElementById("btnCreate").value="Reset";
				
			}
			
		}
		
		document.getElementById("msg").innerHTML=papanInfo(flash.msg, flash.err);
		
	},
	
	reset:	function(){
		
		document.getElementById("msg").innerHTML = "";
		
		document.getElementById("parent_blok").value = "";
		document.getElementById("parent_name").value = "";
		
		document.getElementById("folder_name").value = "";
		document.getElementById("folder_sort").value = "";
		document.getElementById("folder_path").value = "";
		document.getElementById("folder_hidden").checked = false;
		
		document.getElementById("folder_name").focus();

	},

	viewDelete: function(blok){
		this.blok=blok;
		this.action="delete";
		this.htmlShow();
		this.readOne();
		this.disabledEdit();

	}, 
	
	readOne: function(){
		
		let obj={
			"login_blok":g.login_blok,
			"folder_blok":this.blok
		};
		
		loadDoc(myServer+"folder/read_one.php",loadData, obj); 

		function loadData(xhttp){
			
			let joker = JSON.parse(xhttp.responseText);
			
			if (joker.err===0) {

				document.getElementById("parent_blok").value = joker.data[0].parent_blok;	
				document.getElementById("parent_name").value = joker.data[0].parent_name;	
				
				document.getElementById("folder_name").value = joker.data[0].folder_name;
				document.getElementById("folder_sort").value = joker.data[0].folder_sort;
				document.getElementById("folder_path").value = joker.data[0].folder_path;
				document.getElementById("folder_hidden").checked = parseInt(joker.data[0].folder_hidden);
				
			}else{

				messageBox(joker.msg);		

			}
		}
		
	},

	klikDelete:function(){
		
		var obj = {
			"login_blok":g.login_blok,
			"folder_blok":this.blok
		};
			
		loadDoc(myServer+"folder/delete_one.php",this.serverMessage, obj); 
		
		document.getElementById("btnDelete").disabled=true;
		
	}, 

	viewUpdate: function(blok){

		this.blok=blok;
		this.action="update";		
		this.htmlShow();

		this.readOne();	
		this.disabledEdit();

	},
	
	disabledEdit: function(){

		document.getElementById("btnparent").disabled=true;	
		
	},
	
	klikUpdate:function(){

		var obj = {
			"login_blok":g.login_blok,
			"folder_blok": this.blok,
			"folder_name":document.getElementById("folder_name").value,
			"folder_sort":document.getElementById("folder_sort").value,
			"folder_hidden":document.getElementById("folder_hidden").checked
		};
			
		loadDoc(myServer+"folder/update_one.php",this.serverMessage, obj); 
		
		document.getElementById("btnUpdate").disabled=true;
		
	},
	
	viewSearch: function (ini){
		
		this.action="search";
		
		if (ini.length==0){

			this.halaman=null;

			jsFolder.viewRead();
			
		}else{
			
			
			var obj = {
				"login_blok":g.login_blok,
				"search":ini
			};
			
			loadDoc(myServer + "folder/search.php",this.showData, obj); 
		
		}
	
	},
	
	readFolder: function(folder_blok,folder_name,folder_path){
		
		document.getElementById("parent_blok").value = folder_blok;
		document.getElementById("parent_name").value = folder_name;
		document.getElementById("folder_path").value = folder_path;
		
	}

}
