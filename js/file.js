
var jsFile2={	
	blok:null,
	action:null,
	halaman:null,
	isi:null,
	
	viewRead: function(){
		this.action = "read";
		
		var layout  = '';
		layout += '<div class="w3-container w3-theme-d4 w3-round">';
		layout += '<h3>File: READ</h3>';
		layout += '</div>';
		
		layout += '<div class="w3-container">';
		layout += '<br>';

		layout += '<div class="w3-row w3-section  w3-theme-d4">';
		layout += '<div class="w3-col w3-center" style="width:40px;padding-top:7px"><i class="w3-xlarge fa fa-search"></i></div>';
		layout += '<div class="w3-rest">';
		layout += '<input type="text" onkeyup="jsFile2.viewSearch(this.value)" placeholder="Type to search..." id="cari" class="w3-input w3-border">';
		layout += '</div>';
		layout += '</div>';
		
		layout += '<p id="showPaging"></p>';
		layout += '<input type="button" onclick="jsFile2.viewCreate()" value="Create"  class="w3-btn w3-theme-l5 w3-round-large w3-border">&nbsp;';
		layout += '<span id="count"></span>';
		layout += '<p id="showTable"></p>';
		layout += '</div>';
		
		document.getElementById('viewMid').innerHTML = layout;

		let obj = {
			"login_blok":g.login_blok
		};
		
		if (this.halaman==null){

			loadDoc(myServer+"file/read_paging.php",this.showData, obj); 
			
		}else{

			loadDoc(this.halaman,this.showData, obj)
		}		
		
		document.getElementById("cari").focus();

	},
	
	showData: function(xhttp){
		
		var txt;
		
		var strange = JSON.parse(xhttp.responseText);
		
		txt ='<div class="w3-responsive">';
		txt+='<table border=1 class="w3-table-all">';
		txt+='<thead><tr class="w3-theme-l1">';

		txt+="<th>No.</th>";
		txt+="<th>Name</th>";
		txt+="<th>Type</th>";
		txt+="<th>Sort</th>";
		txt+="<th>Hidden</th>";
		
		txt+="<th>Owner</th>";
		txt+="<th>Created</th>";
		txt+="<th colspan=2 class='w3-center'>Edit</th>";
		
		txt+="</tr></thead>";
		
	    if (strange.err===0){
			
			for (x in strange.data) {
				txt += "<tr>";
				txt += "<td>"+strange.data[x].nomer + "</td>";
				txt += "<td>"+strange.data[x].file_name + "</td>";
				txt += "<td>"+strange.data[x].file_type + "</td>";
				txt += "<td>"+strange.data[x].file_sort + "</td>";
				txt += "<td>"+strange.data[x].file_hidden + "</td>";
				
				txt += "<td>"+strange.data[x].user_name + "</td>";
				txt += "<td>"+strange.data[x].date_created + "</td>";

				txt += "<td class='w3-center'><input type='button' id='upd' onClick='jsFile2.viewUpdate(\"" + strange.data[x].file_blok + "\");' value='Update' class='w3-btn w3-theme-l5 w3-border w3-round-large'></td>";
				txt += "<td class='w3-center'><input type='button' id='del' onClick='jsFile2.viewDelete(\"" + strange.data[x].file_blok + "\");' value='Delete' class='w3-btn w3-theme-l5 w3-border w3-round-large'></td>";
				
				txt += "</tr>";
			}

		}
		txt+="</table></div>";
		
		document.getElementById("count").innerHTML = "Total record: <span class='w3-tag w3-theme-l1 w3-round'>" + strange.msg+"</span>";
		document.getElementById("showTable").innerHTML = txt;
		
		txt="";
		document.getElementById("showPaging").innerHTML = ''; 
		
		if (jsFile2.action=="read"){
			
			if (strange.err==0){
				
				if (strange.paging.first!=""){
					
					txt+= "<input type='button' value= 'First' onclick='jsFile2.gotoPage(\"" + strange.paging.first + "\")' class='w3-btn w3-theme-l5 w3-round-large w3-border'>&nbsp;" ;
					
				}
				
				for (x in strange.paging.pages) {
					
					if (strange.paging.pages[x].current_page=="yes"){
						
						txt+= "<input type='button' value = '"+ strange.paging.pages[x].page +"' onclick='jsFile2.gotoPage(\"" + strange.paging.pages[x].url + "\")' disabled  class='w3-btn w3-theme-l5 w3-round-large w3-border'>&nbsp;";	
						
					} 
					
					else{
						
						txt+= "<input type='button' value = '"+ strange.paging.pages[x].page +"' onclick='jsFile2.gotoPage(\"" + strange.paging.pages[x].url + "\")'  class='w3-btn w3-theme-l5 w3-round-large w3-border'>&nbsp;";	
						
					}
				}
				
				if (strange.paging.last!=""){
					
					txt+= "<input type='button' value= 'Last' onclick='jsFile2.gotoPage(\"" + strange.paging.last + "\")' class='w3-btn w3-theme-l5 w3-round-large w3-border'>&nbsp;" ;
					
				}
				
				document.getElementById("showPaging").innerHTML = txt; 
				
			}
		}

		if (strange.err!=0){

			messageBox(strange.msg);

		}
				
	},
	
	gotoPage: function (ini){

		this.halaman = ini;
		this.viewRead();
		
	},
	
	viewCreate: function(){
		
		this.action="create";
		this.htmlShow();

		var isi = [];
		jsFile2.readDetail(isi);

	}, 

	htmlShow: function(){
		
		var btn ='<input type="button" onclick="jsFile2.viewRead()" value="Read" class="w3-btn w3-theme-l5 w3-round-large w3-border">&nbsp;';
		
		if (this.action.toUpperCase() == 'CREATE'){
			
			btn+='<input type="button" id = "btnCreate" onclick="jsFile2.klikCreate()" value="Create" class="w3-btn w3-theme-l5 w3-round-large w3-border"><p>';
			
		}
		
		if (this.action.toUpperCase() == 'DELETE'){
			
			btn+='<input type="button" id = "btnDelete" onclick="jsFile2.klikDelete()" value="Delete" class="w3-btn w3-theme-l5 w3-round w3-border"><p>';
			
		}
		
		if (this.action.toUpperCase() == 'UPDATE'){
			
			btn+='<input type="button" id = "btnUpdate" onclick="jsFile2.klikUpdate()" value="Update" class="w3-btn w3-theme-l5 w3-round w3-border"><p>';
			
		}
		
		let layout  = '';
		layout += '<div class="w3-container w3-theme-d4 w3-round">';
		layout += '<h3>File: '+ this.action.toUpperCase() +'</h3>';
		layout += '</div>';
		
		layout += '<form class="w3-container w3-card"><br>';
		layout += btn;
		layout += '<div id="msg"></div>';
		
		layout += '<p>';
		layout += '<label>File name:</label>';
		layout += '<input type ="text" id = "file_name" class="w3-input w3-border">';
		layout += '</p>';
		
		layout += '<p>';
		layout += '<label>Content</label>';
		layout += '<textarea id = "file_content" rows="4" cols="70" class="w3-input w3-border"></textarea>';
		layout += '</p>';
		
		layout += '<p>';
		layout += '<label>Type:<label>';
		layout += '<select id="file_type" class="w3-select w3-border">';
			layout += '<option value="TEXT">TEXT File</option>';
			layout += '<option value="JSON">JSON File</option>';
			layout += '<option value="XML">XML File</option>';
			layout += '<option value="HTML">HTML File</option>';
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
		layout += '<input type ="checkbox" id = "file_hidden" class="w3-check"> Hidden (Private-only me can access)';
		layout += '<p>';
		
		layout += '<p>';
		layout += '<input type="button" onclick="jsFile2.klikTambah()" value="Add Folder" class="w3-btn w3-theme-l5 w3-round-large w3-border">';
		layout += '<div id="folder_detail"></div>';
		layout += '<p>';
		
		layout += '</form>';
		
		document.getElementById('viewMid').innerHTML = layout;		
		document.getElementById('file_name').focus();		
		
	},
	
	klikCreate: function(){
		
		if (document.getElementById("btnCreate").value=="Create"){
			
			let isi = this.isi;
			let baru = []; 
			let isiEdit = {};

			for (i=0;i<isi.length; i++){

				isiEdit = {};
				
				isiEdit.folder_blok=isi[i].folder_blok;
				
				baru.push(isiEdit);
			}

			let obj = {"login_blok":g.login_blok
				,"file_name":document.getElementById("file_name").value
				,"file_content":document.getElementById("file_content").value
				,"file_type":document.getElementById("file_type").value
				,"file_labels":document.getElementById("file_labels").value
				,"file_sort":document.getElementById("file_sort").value
				,"file_hidden":document.getElementById("file_hidden").checked
				,"file_folder": baru
				
			};
		// alert('disini');		
			loadDoc(myServer+"file/create_one.php",this.serverMessage, obj); 
			
		}else{
			
			document.getElementById("btnCreate").value="Create";
			
			this.reset();
		}
	},

	serverMessage: function(xhttp){

		var luthor = JSON.parse(xhttp.responseText);
	
		if (luthor.err==0){
			
			if (luthor.metode=="Create"){
				
				document.getElementById("btnCreate").value="Reset";

			}
		
		} 
		
		document.getElementById("msg").innerHTML=papanInfo(luthor.msg, luthor.err);
		
	},
	
	reset:	function(){
		document.getElementById("msg").innerHTML = "";
		
		document.getElementById("file_name").value = "";
		document.getElementById("file_content").value = "";
		document.getElementById("file_type").value = "";
		document.getElementById("file_labels").value = "";
		document.getElementById("file_sort").value = "";
		document.getElementById("file_hidden").checked = false;
		
		document.getElementById("file_name").focus();
	},

	viewDelete: function(blok){
		this.blok=blok;
		this.action="delete";
		this.htmlShow();
		this.readOne();

	}, 
	
	readOne: function(){
		
		let obj={
			"login_blok":g.login_blok,
			"file_blok":this.blok
		};
		
		loadDoc(myServer+"file/read_one.php",loadData, obj); 

		function loadData(xhttp){
			
			let penguin = JSON.parse(xhttp.responseText);
			
			if (penguin.err==0) {

				document.getElementById("file_name").value = penguin.data[0].file_name;
				document.getElementById("file_content").value = penguin.data[0].file_content;
				document.getElementById("file_type").value = penguin.data[0].file_type;
				document.getElementById("file_labels").value = penguin.data[0].file_labels;
				document.getElementById("file_sort").value = penguin.data[0].file_sort;
				document.getElementById("file_hidden").checked = parseInt(penguin.data[0].file_hidden);

				jsFile2.readDetail(penguin.data[0].file_folder);
				
			}else{

				messageBox(penguin.msg);		

			}
		}
		
	},

	klikDelete:function(){
		
		var obj = {"login_blok":g.login_blok
			,"file_blok":this.blok
		};
			
		loadDoc(myServer+"file/delete_one.php",this.serverMessage, obj); 
		
		document.getElementById("btnDelete").disabled=true;
		
	}, 

	viewUpdate: function(blok){

		this.blok=blok;
		this.action="update";		
		this.htmlShow();
		this.readOne();	

	},
	
	klikUpdate:function(){

		let baru = this.filterArray();

		var obj = {
			"login_blok":g.login_blok,
			"file_blok": this.blok,
			"file_name":document.getElementById("file_name").value,
			"file_content":document.getElementById("file_content").value,
			"file_type":document.getElementById("file_type").value,
			"file_labels":document.getElementById("file_labels").value,
			"file_sort":document.getElementById("file_sort").value,
			"file_hidden":document.getElementById("file_hidden").checked,
			"file_folder":baru
		};
			
		loadDoc(myServer+"file/update_one.php",this.serverMessage, obj); 
		
		document.getElementById("btnUpdate").disabled=true;
		
	},
	
	viewSearch: function (ini){
		
		this.action="search";
		
		if (ini.length==0){

			this.halaman=null;

			jsFile2.viewRead();
			
		}else{
			
			var obj = {
				"login_blok":g.login_blok,
				"search":ini
			};
			
			loadDoc(myServer + "file/search.php",this.showData, obj); 
		
		}
	
	},
	
	readFolder: function(folder_blok,folder_name,folder_path){
		
		let baris=gFolder.baris;
		var isi = this.isi;
		var baru = [];
		var isiEdit = {}
		let sudahAda = false;
		
		for (i=0;i<isi.length; i++){
			if (folder_blok==isi[i].folder_blok){
				sudahAda=true;
			}
		}
		
		if (sudahAda==true){
			messageBox("Folder already add....");
			return;
		}
		
		
		for (i=0;i<isi.length; i++){
			if (i != baris){
				baru.push(isi[i]);
				
			}else{
				
				isiEdit = isi[i];
				
				isiEdit.folder_blok=folder_blok;
				isiEdit.folder_name=folder_name;
				isiEdit.folder_path=folder_path;

				baru.push(isiEdit);
			}
		}
		
		jsFile2.readDetail(baru);
		
	},
	
	readDetail: function(isi){

		this.isi = isi;
		var flen, i;
		
		var txt='';

		txt ='<div class="w3-responsive">';
		txt+='<table border=1 class="w3-table-all">';
		txt+='<thead><tr class="w3-theme-l1">';

		txt+="<th>No.</th>";
		txt+="<th>Save to Folder</th>";
		
		txt+="<th colspan=2>Action</th>";
		
		txt+="</tr></thead>";
		
		// urai isi disini 
		
		flen=isi.length;
		
		if (isi.length != 0){
			for (i=0; i<flen; i++){
				txt+= "<tr>";
				txt+= "<td>"+isi[i].nomer+"</td>";
				
				txt+= "<td>";
					txt+= "<input type ='hidden' id='folder_name' value= '"+isi[i].folder_name+"' >";
					txt+= "<input type ='text' id='folder_path' value= '"+isi[i].folder_path+"' readonly class='w3-input w3-border'>";
				txt+= "</td>";				
				
				txt+= '<td class="w3-center"><input type="button" onclick="jsFolderlookup.viewFind(\'file\',\''+i+'\',\''+isi[i].folder_blok+'\')" value="Find..." class="w3-btn w3-theme-l5 w3-border w3-round-large"></td>';
				txt+= "<td class='w3-center'><input type = 'button' onclick='jsFile2.klikKurang(\""+i+"\")' value='Remove' class='w3-btn w3-theme-l5 w3-border w3-round-large'></td>";
				txt+= "</tr>";
			}
		}
		
		txt+="</table></div><p>";
		
		var budi = JSON.stringify(isi);
		
		document.getElementById('folder_detail').innerHTML = txt;		
	},
	
	klikTambah: function(){
		
		let barisBaru = [];
		
		if (this.isi==null){
			this.isi = barisBaru;
		}else{
			barisBaru = this.isi;
		}
		
		let kolom = {};
		
		kolom.nomer = barisBaru.length+1;
		
		kolom.folder_blok="";
		kolom.folder_name="";
		kolom.folder_path="";
		
		barisBaru.push (kolom);
		
		jsFile2.readDetail(barisBaru);	
	},


	klikKurang: function(baris){
		var i,j;
		var isi = this.isi;
		var baru = [];
		
		j=1;
		for (i=0;i<isi.length; i++){
			if (i != baris){
				isi[i].nomer=j++;
				baru.push(isi[i]);
			}
		}
		
		jsFile2.readDetail(baru);
		
	},

	filterArray: function(){
		// tidak semua dikirim, hanya kolom penting saja: Folder_blok
		let isi = this.isi;
		let baru = []; 
		let isiEdit = {};

		for (i=0;i<isi.length; i++){

			isiEdit = {};
			
			isiEdit.folder_blok=isi[i].folder_blok;
			
			baru.push(isiEdit);
		}
		return baru;
	}

}
