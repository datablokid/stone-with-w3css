
let jsList={
	action:null,
	modul: null,
	
	parent_blok:'',
	parent_name:'',
	
	folder_blok:'',
	
	blok: null,
	path: null,
	
	file_folder: null,

	viewRead: function(){
		
		this.action = "read";
		
		var layout  = '';
		layout += '<div class="w3-container w3-round w3-theme-d4">';
		layout += '<h3>List: READ</h3>';
		layout += '</div><br>';
		
		layout += '<input type="text" id="parent_blok" value="" size=50 hidden>';
		layout += '<input type="text" id="folder_blok" value="" size=50 hidden>';
		
		/*
		 * top-bar
		 **/
		layout += '<div id="form_topfolder">';
		layout += '<div id="topbar"></div>';
		layout += '</div>';

		/*
		 * folderhis
		 **/ 
		
		layout += '<input type="button" value="New Folder" onclick="jsList.newFolder()" class="w3-btn w3-theme-l5 w3-border w3-round-large">&nbsp;';
		layout += '<input type="button" value="New File" onclick="jsList.newFile()" class="w3-btn w3-theme-l5 w3-border w3-round-large"><br>';
		layout += '<div class="gold"></div>';
		layout += '<p>';
		layout += 'Path: <span id="path"></span>';
		layout += '<input type="button" value="" onclick="jsList.klikUp(\'\')" id="btnUp"  class="w3-btn w3-theme-l5 w3-border w3-round-large">';
		layout += '</p>';
		layout += '<div class="gold"></div>';
		layout += '<div id="folderbar">ok</div>';
		
		/*
		 * File
		 **/ 
		layout += '<div id="fileBar"></div>';
		layout += '<div id="message"></div>';
		
		
		document.getElementById('viewMid').innerHTML = layout;

		/* start */
		let obj = {
			"login_blok":g.login_blok,
			"folder_blok":document.getElementById('folder_blok').value
		};
		
		loadDoc(myServer+"list/read.php",this.showTop,obj); 

	},
	
	showTop: function(xhttp){

		var deadpool = JSON.parse(xhttp.responseText);
		
		var hulk='';
		
		document.getElementById('parent_blok').value=deadpool.parent[0].parent_blok;
		document.getElementById('folder_blok').value=deadpool.folder[0].folder_blok;
		document.getElementById('btnUp').value=deadpool.folder[0].folder_name;
		document.getElementById('btnUp').onclick=function(){
				jsList.klikUp(deadpool.parent[0].parent_blok);
			};
		
		hulk += '<div class="w3-container w3-theme-d4">'
		hulk += '<h3>List Folder and File</h3>'
		hulk += '</div>';
		
		hulk +='<div class="w3-responsive">';
		hulk +='<table border=1 class="w3-table-all">';
		hulk +='<thead><tr class="w3-theme-l1">';
		
		hulk +='<th>Folder and File</th>';
		hulk +='<th>Type</th>';
		hulk +='<th class="w3-center">Read</th>';
		hulk +='<th class="w3-center">Update</th>';
		hulk +='<th>Created</th>';
		hulk +='<th class="w3-center">Action</th>';
		hulk +='</tr>';
		hulk +='</thead>';
		
		for (x in deadpool.data){

			hulk += '<tr>';
			hulk += '<td>';
			hulk += '<input type="button" onclick="jsList.klikFolder(\''+deadpool.data[x].folder_blok+'\',\''+deadpool.data[x].parent_blok+'\')" value=\''+deadpool.data[x].folder_name+'\' class="w3-button w3-theme-l5 w3-round-large w3-border w3-block w3-left-align">';
			hulk += '</td>';

			hulk += '<td style="color:green; font-weight:bold;">';
			hulk += 'Folder';
			hulk += '</td>';
			
			hulk += '<td class="w3-center">';
			hulk += deadpool.data[x].read_count;
			hulk += '</td>';

			hulk += '<td class="w3-center">';
			hulk += deadpool.data[x].update_count;
			hulk += '</td>';

			hulk += '<td>';
			hulk += deadpool.data[x].date_created;
			hulk += '</td>';

			hulk += '<td class="w3-center">';
			hulk += '<input type="button" onclick="jsList.editFolder(\''+deadpool.data[x].folder_blok+'\')" value="Edit" class="w3-btn w3-theme-l5 w3-round-large w3-border">';
			hulk += '</td>';
			
			hulk += '</tr>';
		}
		
		for (x in deadpool.file_records){

			hulk += '<tr>';
			hulk += '<td>';

			hulk += '<input type="button" onclick="jsList.klikFile(\''+deadpool.file_records[x].file_blok+'\')" value=\''+deadpool.file_records[x].file_name+'\' class="w3-button w3-theme-l5 w3-round-large w3-border w3-block w3-left-align">';
			hulk += '</td>';

			hulk += '<td style="color:blue; font-weight:bold;">';
			hulk += 'File';
			hulk += '</td>';


			hulk += '<td class="w3-center">';
			hulk += deadpool.file_records[x].read_count;
			hulk += '</td>';

			hulk += '<td class="w3-center">';
			hulk += deadpool.file_records[x].update_count;
			hulk += '</td>';

			hulk += '<td>';
			hulk += deadpool.file_records[x].date_created;
			hulk += '</td>';
						
			hulk += '<td class="w3-center">';
			hulk += '<input type="button" onclick="jsList.editFile(\''+deadpool.file_records[x].file_blok+'\')" value="Edit" class="w3-btn w3-theme-l5 w3-round w3-border">';
			hulk += '</td>';
			
			hulk += '</tr>';
		}		

		hulk += '</table>';
		hulk += '</div></p>';

		document.getElementById('folderbar').innerHTML = hulk;
				
	},

	bacaPath: function(){
		let gpath=this.path;
		let arr = {};
		let path=[];
		let baru=[];
		
		if (gpath==null){
			gpath=[];
			arr={};
			
			arr.parent_blok = "";
			arr.folder_blok = "";
			arr.folder_name = "";
			
			path.push(arr);
			
		}
		if (gpath.length > 0){
			path=gpath;
		}

		arr={};
		
		arr.parent_blok = document.getElementById('parent_blok').value;
		arr.folder_blok = document.getElementById('folder_blok').value;
		arr.folder_name = document.getElementById('btnUp').value;
		
		path.push(arr);

		let isi='';
		flen=path.length;
		
		for (i=0;i<flen;i++){
			baru[i]=path[i];
			
			if (path[i].folder_name==document.getElementById('btnUp').value){
				break;
			}
			if (path[i].folder_name==""){
				isi += "<input type='button' value='/' onclick='jsList.klikUp(\""+path[i].folder_blok+"\")' class='w3-btn w3-theme-l5 w3-round-large w3-border'> ";
			}else{
				isi += "<input type='button' value='"+path[i].folder_name+"' onclick='jsList.klikUp(\""+path[i].folder_blok+"\")'  class='w3-btn w3-theme-l5 w3-round-large w3-border'> ";
			}
			
		}

		this.path=baru;
		
		document.getElementById('path').innerHTML =isi;

	},

	klikFolder: function(blok,parent){
		
		this.folder_blok=blok;
		
		let obj = {
			"login_blok":g.login_blok
			,"folder_blok":this.folder_blok
		};
		
		loadDoc(myServer+"list/read.php",this.showTop,obj); 
		
		this.bacaPath();

	},

	klikUp: function(blok){
		
		let obj = {
			"login_blok":g.login_blok
			,"folder_blok":blok
		};

		loadDoc(myServer+"list/read.php",this.showTop,obj); 
		
		this.bacaPath();
		
	},

	newFolder: function(){
		this.action="create";
		this.folder_blok=document.getElementById("folder_blok").value;
		this.htmlFolder();
	},

	htmlFolder: function(){
		let parent="";
		let layout="";
		
		layout+='<div class="w3-container w3-theme-d4">';
		layout+='<h3>Folder: '+this.action.toUpperCase() +'</h3>';
		layout+='</div >';
		
		layout+='<div class="w3-container w3-card">';
		layout+='<p>';
		layout+='<input type="button" onclick="jsList.klikCancel()" value="Close" id="btnCancel" class="w3-btn w3-theme-l5 w3-round-large w3-border">&nbsp;';
		if (this.action=="create"){
			layout+='<input type="button" onclick="jsList.klikCreateFolder()" value="Create" id="btnCreate" class="w3-btn w3-theme-l5 w3-round-large w3-border">&nbsp;';
		}
		if (this.action=="edit"){
			layout+='<input type="button" onclick="jsList.klikUpdate()" value="Update" id="btnUpdate" class="w3-btn w3-theme-l5 w3-round-large w3-border">&nbsp;';
			layout+='<input type="button" onclick="jsList.klikDelete()" value="Delete" id="btnDelete" class="w3-btn w3-theme-l5 w3-round-large w3-border">&nbsp;';
		}
		layout+='</p>';
		layout+='<div id="msg"></div>';
		
		layout+='<p>';
		layout+='<label>Parent Name</label>';
		layout+='<span id="parent_name" class="w3-tag w3-theme-l1"></span>';
		layout+='</p>';
		
		layout+='<p>';
		layout+='<label>Folder Name</label>';
		layout+='<input type="text" id="folder_name" class="w3-input w3-border">';
		layout+='</p>';
		
		layout+='<p>';
		layout+='<labe>Sort</label>';
		layout+='<input type="text" id="folder_sort" class="w3-input w3-border">';
		layout+='</p>';

		layout+='<p>';
		layout+='<input type="checkbox" id="folder_hidden" class="w3-check"><label>Hidden (Private-only me can access)</label>';
		layout+='</p>';

		layout+='<p>';
		layout+='Path: <span id="folder_path" class="w3-tag w3-theme-l1"></span>';
		layout+='</p>';
		
		layout+='</div >';
		
		document.getElementById('folderbar').innerHTML = layout;
		document.getElementById('folder_name').focus();

	},

	klikCreateFolder: function(){
		if (document.getElementById('btnCreate').value=="Reset"){
			this.reset();

		}
		
		else{

			let obj = {
				"login_blok":g.login_blok,
				"parent_blok":this.folder_blok,
				"folder_name":document.getElementById("folder_name").value,
				"folder_sort":document.getElementById("folder_sort").value,
				"folder_hidden":document.getElementById("folder_hidden").checked
			};
					
			loadDoc(myServer+"folder/create_one.php",this.serverMessage, obj); 
		}

	},
	
	klikCancel: function(){
		
		let obj = {
			"login_blok":g.login_blok,
			"folder_blok": document.getElementById("folder_blok").value
		};
		
		loadDoc(myServer+"list/read.php",this.showTop,obj); 
		
	},
	
	editFolder: function(blok){
		
		this.blok=blok;
		this.action="edit";		
		this.htmlFolder();
		this.readOne();
		
	},
	
	readOne: function(){
		
		let obj={
			"login_blok":g.login_blok,
			"folder_blok":this.blok
		};

		loadDoc(myServer+"folder/read_one.php",loadData, obj); 

		function loadData(xhttp){
			
			let mbaku = JSON.parse(xhttp.responseText);
			
			if (mbaku.err == 0) {
				
				document.getElementById("parent_name").innerHTML = mbaku.data[0].parent_name;				
				document.getElementById("folder_name").value = mbaku.data[0].folder_name;
				document.getElementById("folder_sort").value = mbaku.data[0].folder_sort;
				document.getElementById("folder_path").innerHTML = mbaku.data[0].folder_path;				
				document.getElementById("folder_hidden").checked = parseInt(mbaku.data[0].folder_hidden);
				
			}else{

				messageBox(mbaku.msg);		

			}
		}

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
		document.getElementById("btnDelete").disabled=true;
		
	},

	newFile: function(){

		this.folder_blok=document.getElementById("folder_blok").value;
		this.action="create";
		this.htmlFile();
		this.file_folder=null;
		
	},

	htmlFile: function(){
		var btn='';
		btn+='<input type="button" id = "btnClose" onclick="jsList.klikCancel()" value="Close" class="w3-btn w3-theme-l5 w3-border w3-round-large">&nbsp;';
		
		if (this.action.toUpperCase() == 'CREATE'){
			btn+='<input type="button" id = "btnCreate" onclick="jsList.klikCreateFile()" value="Create" class="w3-btn w3-theme-l5 w3-border w3-round-large">&nbsp;';
		}
		
		if (this.action.toUpperCase() == 'EDIT'){
			btn+='<input type="button" id = "btnView" onclick="jsList.klikFile(\''+ this.blok +'\')" value="View" class="w3-btn w3-theme-l5 w3-border w3-round-large">&nbsp;';
			btn+='<input type="button" id = "btnUpdate" onclick="jsList.klikUpdateFile()" value="Update" class="w3-btn w3-theme-l5 w3-border w3-round-large">&nbsp;';
			btn+='<input type="button" id = "btnDelete" onclick="jsList.klikDeleteFile()" value="Delete" class="w3-btn w3-theme-l5 w3-border w3-round-large">&nbsp;';
		}
		
		let layout  = '';
		layout += '<div class="w3-container w3-theme-d4">';
		layout += '<h3>File: '+ this.action.toUpperCase() +'</h3>';
		layout += '</div>';

		layout += '<form class="w3-container w3-card">';
		layout += '<p>';
		layout += btn;
		layout += '</p>';
		layout += '<div id="msg"></div>';
		
		layout += '<p>';
		layout += '<label>File name</label>';
		layout += '<input type ="text" id = "file_name" class="w3-input w3-border">';
		layout += '</p>';
		
		layout += '<p>';
		layout += '<label>Content</label>';
		layout += '<textarea id = "file_content" rows="4" cols="70" class="w3-input w3-border"></textarea>';
		layout += '</p>';
		
		layout += '<p>';
		layout += '<label>Type</label>';
		layout += '<select id="file_type" class="w3-select w3-border">';
			layout += '<option value="TEXT">TEXT File</option>';
			layout += '<option value="JSON">JSON File</option>';
			layout += '<option value="XML">XML File</option>';
			layout += '<option value="HTML">HTML File</option>';
			layout += '<option value="HTML">WKWKWk</option>';
		layout += '</select>';
		layout += '</p>';
		
		layout += '<p>';
		layout += '<label>Labels</label>';
		layout += '<input type ="text" id = "file_labels" class="w3-input w3-border">';
		layout += '</p>';
		
		layout += '<p>';
		layout += '<label>Sort</label>';
		layout += '<input type ="text" id = "file_sort" class="w3-input w3-border">';
		layout += '</p>';
		
		layout += '<p>';
		layout += '<input type ="checkbox" id = "file_hidden" class="w3-check">';
		layout += '<label>Hidden (Private-only me can access)</label>';
		layout += '</p>';
		
		layout += '</form>';
		
		document.getElementById('folderbar').innerHTML = layout;
		document.getElementById('file_name').focus();

	},

	readFile: function(){
		let obj={
			"login_blok":g.login_blok,
			"file_blok":this.blok
		};
		
		loadDoc(myServer+"file/read_one.php",loadData, obj); 

		function loadData(xhttp){
			
			let wasp = JSON.parse(xhttp.responseText);
			
			if (wasp.err==0) {
				
				document.getElementById("file_name").value = wasp.data[0].file_name;
				document.getElementById("file_content").value = wasp.data[0].file_content;
				document.getElementById("file_type").value = wasp.data[0].file_type;
				document.getElementById("file_labels").value = wasp.data[0].file_labels;
				document.getElementById("file_sort").value = wasp.data[0].file_sort;
				document.getElementById("file_hidden").checked = parseInt(wasp.data[0].file_hidden);
				
				jsList.readFileFolder(wasp.data[0].file_folder);
				
			}else{

				messageBox(wasp.msg);		

			}
		}
	},
	

	klikCreateFile: function(){
		
		if (document.getElementById("btnCreate").value=="Create"){
			let baru = [];
			let isiEdit = {};
			
			isiEdit={};
			isiEdit.folder_blok=document.getElementById("folder_blok").value;
			
			baru.push(isiEdit);
			
			if (this.file_folder==null){
				this.file_folder=baru;
			}
				
			let obj = {
				"login_blok":g.login_blok,
				"file_name":document.getElementById("file_name").value,
				"file_content":document.getElementById("file_content").value,
				"file_type":document.getElementById("file_type").value,
				"file_labels":document.getElementById("file_labels").value,
				"file_sort":document.getElementById("file_sort").value,
				"file_hidden":document.getElementById("file_hidden").checked,
				"file_folder": this.file_folder
			};

			loadDoc(myServer+"file/create_one.php",this.serverMessage, obj); 
			
		}
		
		else{
			
			document.getElementById("btnCreate").value="Create";
			
			this.resetFile();
		}
	},

	resetFile: function(){

		document.getElementById("file_name").value="";
		document.getElementById("file_content").value="";
		document.getElementById("file_type").value="";
		document.getElementById("file_labels").value="";
		document.getElementById("file_sort").value="";
		document.getElementById("file_hidden").checked=0;
		document.getElementById('btnCreate').value="Create";

		document.getElementById("msg").innerHTML="";
	},
	
	editFile: function(blok){
		
		this.action="edit";
		this.blok=blok;
		this.htmlFile();
		this.readFile();
		
	},

	klikDeleteFile:function(){
		
		var obj = {
			"login_blok":g.login_blok,
			"file_blok":this.blok
		};
			
		loadDoc(myServer+"file/delete_one.php",this.serverMessage, obj); 
		
		document.getElementById("btnUpdate").disabled=true;
		document.getElementById("btnDelete").disabled=true;
		
	}, 

	klikUpdateFile:function(){

		var obj = {
			"login_blok":g.login_blok,
			"file_blok": this.blok,
			"file_name":document.getElementById("file_name").value,
			"file_content":document.getElementById("file_content").value,
			"file_type":document.getElementById("file_type").value,
			"file_labels":document.getElementById("file_labels").value,
			"file_sort":document.getElementById("file_sort").value,
			"file_hidden":document.getElementById("file_hidden").checked,
			"file_folder":this.file_folder
		};
			
		loadDoc(myServer+"file/update_one.php",this.serverMessage, obj); 
		
		document.getElementById("btnUpdate").disabled=true;
		document.getElementById("btnDelete").disabled=true;
		
	},
	
	serverMessage: function(xhttp){

		var magneto = JSON.parse(xhttp.responseText);
	
		if (magneto.err==0){

			if (magneto.metode=="Create"){
				
				document.getElementById("btnCreate").value="Reset";
				
			}
		
		} 
		
		document.getElementById("msg").innerHTML=papanInfo(magneto.msg, magneto.err);
		
	},

	reset:	function(){
		document.getElementById("msg").innerHTML = "";
	
		document.getElementById("folder_name").value = "";
		document.getElementById("folder_sort").value = "";
		
		document.getElementById("folder_name").focus();
		document.getElementById('btnCreate').value="Create";
	},

	klikDelete:function(){

		var obj = {
			"login_blok":g.login_blok,
			"folder_blok":this.blok
		};
			
		loadDoc(myServer+"folder/delete_one.php",this.serverMessage, obj); 
		
		document.getElementById("btnUpdate").disabled=true;
		document.getElementById("btnDelete").disabled=true;
		
	}, 

	klikFile: function(blok){

		let obj={
			"login_blok":g.login_blok,
			"file_blok":blok
		};
		
		loadDoc(myServer+"file/read_one.php",loadData, obj); 

		function loadData(xhttp){
			
			var antMan = JSON.parse(xhttp.responseText);
			var scotLang = '';
			
			scotLang += '<div class="w3-container w3-theme-d5">';
			scotLang += '<h3>File: VIEW</h3>';
			scotLang += '</div>';
			
			scotLang += '<div class="w3-container w3-card">';
			scotLang += "<p>";
			scotLang += '<input type="button" id = "btnClose" onclick="jsList.klikCancel()" value="Close" class="w3-btn w3-theme-l5 w3-border w3-round-large">&nbsp;';
			scotLang += "<input type='button' value='Edit' onclick='jsList.editFile(\""+antMan.data[0].file_blok+"\")' class='w3-btn w3-theme-l5 w3-border w3-round-large'> ";
			scotLang += "</p>";
			
			scotLang += "<h2>";
			scotLang += antMan.data[0].file_name;
			scotLang += "</h2>";
			scotLang += "<div class='gold'></div>";
			
			scotLang += "<p>";
			scotLang += antMan.data[0].file_content;
			scotLang += "</p>";
			
			scotLang += "<div class='gold'></div>";
			
			scotLang += "<small>";
			scotLang += "Labels: "+ antMan.data[0].file_labels.toUpperCase();
			scotLang += " | Type: "+ antMan.data[0].file_type.toUpperCase();
			scotLang += " | Created: "+ antMan.data[0].created.toUpperCase();
			scotLang += " | Private: "+ antMan.data[0].file_hidden;
			scotLang += " | Owner: "+ antMan.data[0].file_owner;
			scotLang += "</small><br>";
				
			scotLang += "</div>";
			
			document.getElementById('folderbar').innerHTML = scotLang;	
			
			
		}

	},

	readFileFolder: function(file_folder){

		this.file_folder = file_folder;
		
	}

// end //
}
