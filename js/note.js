var jsNote={	
	blok:null,
	action:null,
	halaman:null,
	viewRead: function(){
		this.action = "read";
		
		var layout  = '';
		layout += '<div class="w3-container w3-theme-d4 w3-round">';
		layout += '<h3>Note: READ</h3>';
		layout += '</div>';
		
		layout += '<div class="w3-container w3-card">';
		layout += '<br>';
		
		layout += '<div class="w3-row w3-section  w3-theme-d4">';
		layout += '<div class="w3-col w3-center" style="width:40px;padding-top:7px"><i class="w3-xlarge fa fa-search"></i></div>';
		layout += '<div class="w3-rest">';
		layout += '<input type="text" onkeyup="jsNote.viewSearch(this.value)" placeholder="Type to search..." id="cari" class="w3-input w3-border">';
		layout += '</div>';
		layout += '</div>';

		layout += '<p id="showPaging"></p>';
		layout += '<input type="button" onclick="jsNote.viewCreate()" value="Create" class="w3-btn w3-theme-l5 w3-round w3-border">';
		layout += '<span id="count"></span>';
		layout += '<p id="showTable"></p>';
		
		layout += '</div>';
		
		document.getElementById('viewMid').innerHTML = layout;

		let obj = {"login_blok":g.login_blok};
		
		if (this.halaman==null){

			loadDoc(myServer+"note/read_paging.php",this.showData, obj); 
			
		}else{

			loadDoc(this.halaman,this.showData, obj)
		}		
		
		document.getElementById("cari").focus();
	},
	
	showData: function(xhttp){
		
		var txt;
		
		var drax = JSON.parse(xhttp.responseText);
		
		txt ='<div class="w3-responsive">';
		txt+='<table border=1 class="w3-table-all">';
		txt+='<thead><tr class="w3-theme-l1">';


		txt+="<th>No.</th>";
		txt+="<th>Title</th>";
		txt+="<th>Note Content</th>";
		txt+="<th>Owner</th>";
		txt+="<th>Created</th>";
		txt+="<th colspan=2 class='w3-center'>Edit</th>";
		
		txt+="</tr></thead>"
		
	    if (drax.err==0){
			
			for (x in drax.data) {
				txt += "<tr>";
				txt += "<td>"+drax.data[x].nomer + "</td>";
				txt += "<td>"+drax.data[x].note_title + "</td>";
				txt += "<td>"+drax.data[x].note_content.substring(0,50) + "</td>";
				txt += "<td>"+drax.data[x].user_name + "</td>";
				txt += "<td>"+drax.data[x].date_created + "</td>";

				txt += "<td class='w3-center'><input type='button' id='upd' onClick='jsNote.viewUpdate(\"" + drax.data[x].note_blok + "\");' value='Update' class='w3-btn w3-theme-l5 w3-round w3-border'></td>";
				txt += "<td class='w3-center'><input type='button' id='del' onClick='jsNote.viewDelete(\"" + drax.data[x].note_blok + "\");' value='Delete' class='w3-btn w3-theme-l5 w3-round w3-border'></td>";
				
				txt += "</tr>";
			}

		}
		
		txt+="</table></div>";
		
		document.getElementById("showTable").innerHTML = txt;
		document.getElementById("count").innerHTML = " Total record: <span class='w3-tag w3-theme-l1'>" + drax.msg+'</div>';
		
		txt="";
		
		if (jsNote.action=="read"){
			
			if (drax.err===0){
				
				if (drax.paging.first!=""){
					
					txt+= "<input type='button' value= 'First' onclick='jsNote.gotoPage(\"" + drax.paging.first + "\")' class='w3-btn w3-theme-l5 w3-border w3-round'>&nbsp;" ;
					
				}
				
				for (x in drax.paging.pages) {
					
					if (drax.paging.pages[x].current_page=="yes"){
						
						txt+= "<input type='button' value = '"+ drax.paging.pages[x].page +"' onclick='jsNote.gotoPage(\"" + drax.paging.pages[x].url + "\")' disabled class='w3-btn w3-theme-l5 w3-border w3-round' >&nbsp;";	
						
					} 
					else{
						
						txt+= "<input type='button' value = '"+ drax.paging.pages[x].page +"' onclick='jsNote.gotoPage(\"" + drax.paging.pages[x].url + "\")' class='w3-btn w3-theme-l5 w3-border w3-round'>&nbsp;";	
						
					}

				}
				
				if (drax.paging.last!=""){
					
					txt+= "<input type='button' value= 'Last' onclick='jsNote.gotoPage(\"" + drax.paging.last + "\")' class='w3-btn w3-theme-l5 w3-border w3-round'>&nbsp;" ;
					
				}
				
			}
		}
		
		document.getElementById("showPaging").innerHTML = txt; 

		if (drax.err !=0){

			messageBox(drax.msg);

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
		
		var btn ='<input type="button" onclick="jsNote.viewRead()" value="Read" class="w3-btn w3-theme-l5 w3-border w3-round">&nbsp;';
		
		if (this.action.toUpperCase() == 'CREATE'){
			
			btn+='<input type="button" id = "btnCreate" onclick="jsNote.klikCreate()" value="Create" class="w3-btn w3-theme-l5 w3-border w3-round">&nbsp;';
			
		}
		
		if (this.action.toUpperCase() == 'DELETE'){
			
			btn+='<input type="button" id = "btnDelete" onclick="jsNote.klikDelete()" value="Delete" class="w3-btn w3-theme-l5 w3-border w3-round">&nbsp;';
			
		}
		
		if (this.action.toUpperCase() == 'UPDATE'){
			
			btn+='<input type="button" id = "btnUpdate" onclick="jsNote.klikUpdate()" value="Update" class="w3-btn w3-theme-l5 w3-border w3-round">&nbsp;';
			
		}
		
		let layout  = '';
		
		layout += '<div class="w3-container w3-theme-d4 w3-round w3-border">';
		layout += '<h3>Note: '+ this.action.toUpperCase() +'</h3>';
		layout += '</div>';
		
		layout += '<form class="w3-container w3-card">';
		layout += '<p>';
		layout += btn;
		layout += '</p>';

		layout += '<div id="msg"></div>';
		
		layout += '<p>';
		layout += '<label>Title:</label>';
		layout += '<input type="text" id = "note_title" class="w3-input w3-border">';		
		layout += '</p>';
		
		layout += '<p>';
		layout += '<label>Content</label>';
		layout += '<textarea id = "note_content" rows="15" cols="50" class="w3-input w3-border"></textarea>';
		layout += '</p>';

		layout += '</form>';
		
		document.getElementById('viewMid').innerHTML = layout;		
		
		document.getElementById("note_title").focus();
		
	},
	
	klikCreate: function(){

		if (document.getElementById("btnCreate").value=="Create"){		
			
			let obj = {
				"login_blok":g.login_blok,
				"note_title":document.getElementById("note_title").value,
				"note_content":document.getElementById("note_content").value
			};
				
			loadDoc(myServer+"note/create_one.php",this.serverMessage, obj); 
			
			
		}
		else{
			
			document.getElementById("btnCreate").value="Create";
			
			this.reset();

		}
	},

	serverMessage: function(xhttp){
		
		var groot = JSON.parse(xhttp.responseText);

	
		if (groot.err==0){
			
			if (groot.metode=="Create"){

				document.getElementById("btnCreate").value="Reset";
			}
		
		} 

		document.getElementById("msg").innerHTML=papanInfo(groot.msg, groot.err);
				
	},
	
	reset:	function(){
		
		document.getElementById("msg").innerHTML = "";
		
		document.getElementById("note_title").value = "";
		document.getElementById("note_content").value = "";
		
		document.getElementById("note_title").focus();
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
			"note_blok":this.blok
		};
			
		loadDoc(myServer+"note/read_one.php",loadData, obj); 

		function loadData(xhttp){

			let hope = JSON.parse(xhttp.responseText);
			
			if (hope.err==0) {
				
				document.getElementById("note_title").value = hope.data[0].note_title;		
				document.getElementById("note_content").value = hope.data[0].note_content;
				
			}else{

				messageBox(hope.msg);		
			}
			
		}
	},

	klikDelete:function(){
		
		var obj = {
			"login_blok":g.login_blok,
			"note_blok":this.blok
		};
			
		loadDoc(myServer+"note/delete_one.php",this.serverMessage, obj); 
		
		document.getElementById("btnDelete").disabled=true;
		
	}, 

	viewUpdate: function(blok){

		this.blok=blok;
		this.action="update";		
		this.htmlShow();
		this.readOne();	

	},
	
	klikUpdate:function(){

		var obj = {
			"login_blok":g.login_blok,
			"note_blok":this.blok,
			"note_title":document.getElementById("note_title").value,
			"note_content":document.getElementById("note_content").value
		};
			
		loadDoc(myServer+"note/update_one.php",this.serverMessage, obj); 
		
		document.getElementById("btnUpdate").disabled=true;
		
	},
	
	viewSearch: function (ini){

		this.action="search";
		
		if (ini.length==0){

			this.halaman=null;

			jsNote.viewRead();
			
		}else{
			
			var obj = {
				"login_blok":g.login_blok,
				"note_search":ini
			};
				
			loadDoc(myServer + "note/search.php",this.showData, obj); 
		
		}
	
	}
	
}
