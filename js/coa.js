
var jsCoa={	
	blok:null,
	action:null,
	halaman:null,
	
	viewRead: function(){

		this.action = "read";
		
		var layout  = '';
		layout += '<div class="w3-container w3-theme-d4 w3-round w3-border">';
		layout += '<h3>Chart of Accounts: READ</h3>';
		layout += '</div>';
		
		layout += '<div class="w3-container w3-card">';
		
		layout += '<div class="w3-row w3-section  w3-theme-d4">';
		layout += '<div class="w3-col w3-center" style="width:50px"><i class="w3-xxlarge fa fa-search"></i></div>';
		layout += '<div class="w3-rest">';
		layout += '<input type="text" onkeyup="jsCoa.viewSearch(this.value)" placeholder="Type to search..." id="cari" class="w3-input w3-border">';
		layout += '</div>';
		layout += '</div>';

		layout += '<p id="showPaging"></p>';
		layout += '<input type="button" onclick="jsCoa.viewCreate()" value="Create"  class="w3-btn w3-theme-l5 w3-border w3-round-large">';
		
		layout += '<span id="count"></span>';
		layout += '<p id="showTable"></p>';
		
		document.getElementById('viewMid').innerHTML = layout;

		let obj = {
			"login_blok":g.login_blok,
			"company_blok":g.company_blok
		};
		
		if (this.halaman==null){

			loadDoc(myServer+"coa/read_paging.php",this.showData, obj); 
			
		}else{

			loadDoc(this.halaman,this.showData, obj)
		}		
		
		document.getElementById("cari").focus();

	},
	
	showData: function(xhttp){
		
		var txt;
		
		var gundala = JSON.parse(xhttp.responseText);
		
		txt ='<div class="w3-responsive">';
		txt+='<table border=1 class="w3-table-all">';
		txt+='<thead><tr class="w3-theme-l1">';

		txt+="<th>No.</th>";
		txt+="<th>Class</th>";
		txt+="<th>Type</th>";
		txt+="<th>Number</th>";
		txt+="<th>Name</th>";
		
		txt+="<th>Owner</th>";
		txt+="<th>Created</th>";
		txt+="<th colspan=2 class='w3-center'>Edit</th>";
		
		txt+="</tr></thead>";
		
	    if (gundala.err==0){
			
			for (x in gundala.data) {
				txt += "<tr>";
				txt += "<td>"+gundala.data[x].nomer + "</td>";
				
				txt += "<td>"+gundala.data[x].coa_class + "</td>";
				txt += "<td>"+gundala.data[x].coa_type + "</td>";
				txt += "<td>"+gundala.data[x].coa_number + "</td>";
				txt += "<td>"+gundala.data[x].coa_name + "</td>";
				
				txt += "<td>"+gundala.data[x].user_name + "</td>";
				txt += "<td>"+gundala.data[x].date_created + "</td>";

				txt += "<td class='w3-center'><input type='button' id='upd' onClick='jsCoa.viewUpdate(\"" + gundala.data[x].coa_blok + "\");' value='Update'  class='w3-btn w3-theme-l5 w3-border w3-round-large'></td>";
				txt += "<td class='w3-center'><input type='button' id='del' onClick='jsCoa.viewDelete(\"" + gundala.data[x].coa_blok + "\");' value='Delete' class='w3-btn w3-theme-l5 w3-border w3-round-large'></td>";
				
				txt += "</tr>";
			}

			

		}
		txt+="</table></div>";
		
		document.getElementById("count").innerHTML = "Total record: <span class='w3-tag w3-theme-l1'>" + gundala.msg+"</span>";
		document.getElementById("showTable").innerHTML = txt;
		
		txt="";
		
		if (jsCoa.action=="read"){
			
			if (gundala.err==0){
				
				if (gundala.paging.first!=""){
					
					txt+= "<input type='button' value= 'First' onclick='jsCoa.gotoPage(\"" + gundala.paging.first + "\")' class='w3-btn w3-theme-l5 w3-border w3-round-large'>" ;
					
				}
				
				for (x in gundala.paging.pages) {
					
					if (gundala.paging.pages[x].current_page=="yes"){
						
						txt+= "<input type='button' value = '"+ gundala.paging.pages[x].page +"' onclick='jsCoa.gotoPage(\"" + gundala.paging.pages[x].url + "\")' disabled  class='w3-btn w3-theme-l5 w3-border w3-round-large'>";	
						
					} 
					
					else{
						
						txt+= "<input type='button' value = '"+ gundala.paging.pages[x].page +"' onclick='jsCoa.gotoPage(\"" + gundala.paging.pages[x].url + "\")' class='w3-btn w3-theme-l5 w3-border w3-round-large'>";	
						
					}
				}
				
				if (gundala.paging.last!=""){
					
					txt+= "<input type='button' value= 'Last' onclick='jsCoa.gotoPage(\"" + gundala.paging.last + "\")' class='w3-btn w3-theme-l5 w3-border w3-round-large'>" ;
					
				}
				
				
			}
			
		}
		
		document.getElementById("showPaging").innerHTML = txt; 

		if (gundala.err!=0){

			messageBox(gundala.msg);

		}
		
	},
	
	gotoPage: function (ini){

		this.halaman = ini;
		
		this.viewRead();

	},
	
	viewCreate: function(){
		
		this.action="create";
		this.htmlShow();
		this.readClass();
		this.readType();

	}, 

	htmlShow: function(){
		
		var btn ='<input type="button" onclick="jsCoa.viewRead()" value="Read"  class="w3-btn w3-theme-l5 w3-border w3-round-large">&nbsp;';
		
		if (this.action.toUpperCase() == 'CREATE'){
			btn+='<input type="button" id = "btnCreate" onclick="jsCoa.klikCreate()" value="Create" class="w3-btn w3-theme-l5 w3-border w3-round-large">&nbsp;';
		}
		
		if (this.action.toUpperCase() == 'DELETE'){
			btn+='<input type="button" id = "btnDelete" onclick="jsCoa.klikDelete()" value="Delete" class="w3-btn w3-theme-l5 w3-border w3-round-large">&nbsp;';
		}
		
		if (this.action.toUpperCase() == 'UPDATE'){
			btn+='<input type="button" id = "btnUpdate" onclick="jsCoa.klikUpdate()" value="Update" class="w3-btn w3-theme-l5 w3-border w3-round-large">&nbsp;';
		}
		
		let layout  = '';
		
		layout += '<div class="w3-container w3-theme-d4 w3-round w3-border">';
		layout += '<h3>Chart of Accounts: '+ this.action.toUpperCase() +'</h3>';
		layout += '</div>';
		
		layout += '<form class="w3-container w3-card">';
		layout += '<p>';
		layout += btn;
		layout += '</p>';
		
		layout += '<div id="msg"></div>';
		layout += '<div id="spanClass"></div>';
		layout += '<span id="spanType"></span>';
		
		layout += '<p>';
		layout += '<label>Number:</label>';
		layout += '<input type="text" id = "coa_number" class="w3-input w3-border">';
		layout += '</p>';
		
		layout += '<p>';
		layout += '<label>Name:</label>';
		layout += '<input type="text" id = "coa_name" class="w3-input w3-border">';
		layout += '</p>';
		
		layout += '<p>';
		layout += '<input type="checkbox" id = "coa_inactive" class="w3-check">';
		layout += '<label>Inactive</label>';
		layout += '<p>';

		layout += '</form>';
		
		document.getElementById('viewMid').innerHTML = layout;		
		document.getElementById('coa_number').focus();
		
		var msg = document.getElementById("msg");
	},

	klikCreate: function(){

		if (document.getElementById("btnCreate").value=="Create"){		
			
			let obj = {
				"login_blok":g.login_blok,
				"company_blok": g.company_blok,
				"coa_class":document.getElementById("coa_class").value,
				"coa_type":document.getElementById("coa_type").value,
				"coa_number":document.getElementById("coa_number").value,
				"coa_name":document.getElementById("coa_name").value,
				"coa_inactive":document.getElementById("coa_inactive").checked
			};
				
			loadDoc(myServer+"coa/create_one.php",this.serverMessage, obj); 
			
		}
		else{
			
			document.getElementById("btnCreate").value="Create";
			
			this.reset();

		}
	},

	serverMessage: function(xhttp){

		var godam = JSON.parse(xhttp.responseText);
	
		if (godam.err==0){
			
			if (godam.metode=="Create"){

				document.getElementById("btnCreate").value="Reset";
			}
		
		} 
		
		msg.innerHTML = papanInfo(godam.msg, godam.err);
		
	},
	
	reset:	function(){
		
		document.getElementById("msg").innerHTML = "";
		
		//document.getElementById("coa_class").value = "";
		//document.getElementById("coa_type").value = "";
		document.getElementById("coa_number").value = "";
		document.getElementById("coa_name").value = "";
		
		document.getElementById("coa_number").focus();
	},

	viewDelete: function(blok){

		this.blok=blok;
		this.action="delete";
		this.htmlShow();
		this.readClass();
		this.readType();
		this.readOne();

	}, 
	
	readClass: function(){
		
		let obj = '';

		loadDoc(myServer+"coa/classification.php",loadClass, obj); 
		
		function loadClass(xhttp){
			
			let aquanus=JSON.parse(xhttp.responseText);
			
			let layout = '';
			
			layout += '<select onchange="jsCoa.klikKelas(this.value)" id="coa_class" class="w3-select">';
			
			for (x in aquanus.classification) {
				layout += '<option value="'+ aquanus.classification[x] +'">'+ aquanus.classification[x] +'</option>';
			}
			
			layout += '</select>';
			
			document.getElementById("spanClass").innerHTML = "Classification: <br>"+layout;		
			
		}
	},
	
	klikKelas: function(isi){
		
		document.getElementById("coa_class").value = isi;
		
	},

	readType: function(){
		
		let obj = '';
		
		loadDoc(myServer+"coa/type.php",loadClass, obj); 
		
		function loadClass(xhttp){
			
			let gina=JSON.parse(xhttp.responseText);
			
			let layout = '';
			
			layout += '<select onchange="jsCoa.klikType(this.value)" id="coa_type" class="w3-select">';
			
			for (x in gina.type) {
				
				if (x==0){

					layout += '<option value="'+ gina.type[x] +'" selected>'+ gina.type[x] +'</option>';
					
				}
				
				else{
					
					layout += '<option value="'+ gina.type[x] +'">'+ gina.type[x] +'</option>';
					
				}
				
			}
			
			layout += '</select>';
			
			document.getElementById("spanType").innerHTML = "Type: <br>"+layout;		
			
		}
	},
	
	klikType: function(isi){
		//document.getElementById("coa_type").value = isi;
	},
	
	readOne: function(){
		
		let obj={
			"login_blok":g.login_blok,
			"company_blok":g.company_blok,
			"coa_blok":this.blok
		};
			
		loadDoc(myServer+"coa/read_one.php",loadData, obj); 

		function loadData(xhttp){
			
			let saras = JSON.parse(xhttp.responseText);
			
			if (saras.err == 0) {
				
				document.getElementById("coa_class").value = saras.data[0].coa_class;	
				document.getElementById("coa_type").value = saras.data[0].coa_type;
				document.getElementById("coa_number").value = saras.data[0].coa_number;		
				document.getElementById("coa_name").value = saras.data[0].coa_name;		
				document.getElementById("coa_inactive").checked = parseInt(saras.data[0].coa_inactive);		
				
			}else{

				messageBox(saras.msg);		

			}
		}
		
	},

	klikDelete:function(){
		
		var obj = {
			"login_blok":g.login_blok,
			"company_blok":g.company_blok,
			"coa_blok":this.blok
		};
			
		loadDoc(myServer+"coa/delete_one.php",this.serverMessage, obj); 
		
		document.getElementById("btnDelete").disabled=true;
		
	}, 

	viewUpdate: function(blok){

		this.blok=blok;
		this.action="update";		
		this.htmlShow();
		this.readClass(); // read kelas dulu, baru readone
		this.readType();
		this.readOne();	

	},

	klikUpdate:function(){

		var obj = {
			"login_blok":g.login_blok,
			"company_blok":g.company_blok,
			"coa_blok":this.blok,
			"coa_name":document.getElementById("coa_name").value,
			"coa_inactive":document.getElementById("coa_inactive").checked
		};
			
		loadDoc(myServer+"coa/update_one.php",this.serverMessage, obj); 
		
		document.getElementById("btnUpdate").disabled=true;
		
	},
	
	viewSearch: function (ini){
		
		this.action="search";
		
		if (ini.length==0){

			this.halaman=null;

			jsCoa.viewRead();
			
		}else{
			
			
			var obj = {
				"login_blok":g.login_blok,
				"company_blok":g.company_blok,
				"coa_search":ini
			};
			
			loadDoc(myServer + "coa/search.php",this.showData, obj); 
		
		}
	
	},
	
	viewFind: function(baris,blok,modul){
		gCoa.baris=baris;
		gCoa.coa_blok=blok;
		gCoa.modul=modul;
		
		document.getElementById('id01').style.display='block';

		let obj = {
			"login_blok":g.login_blok,
			"company_blok":g.company_blok
		};
		
		if (this.halaman==null){

			loadDoc(myServer+"coa/read_paging.php",this.showModal, obj); 
			
		}
		else{

			loadDoc(this.halaman,this.showModal, obj)
			
		}

	},
	
	showModal: function(xhttp){
		
		var sembrani = JSON.parse(xhttp.responseText);
		
		var txt='';
		
		txt ='<div class="w3-responsive">';
		txt+='<table border=1 class="w3-table-all">';
		txt+='<thead><tr class="w3-theme-l1">';


		//txt+="<th>No.</th>";
		txt+="<th>Name</th>";
		txt+="<th>Number</th>";
		
		
		txt+="<th>Select</th>";
		
		txt+="</tr></thead>";
		
		if (sembrani.err==0){
			
			for (x in sembrani.data) {
				txt += "<tr>";
				//txt += "<td>"+myObj1.data[x].nomer + "</td>";
				txt += "<td>"+sembrani.data[x].coa_name + "</td>";
				txt += "<td>"+sembrani.data[x].coa_number + "</td>";
				txt += "<td><input type='button'  onClick='jsCoa.klikPilih(\"" + sembrani.data[x].coa_blok + "\",\"" + sembrani.data[x].coa_number + "\",\"" + sembrani.data[x].coa_name + "\");' value='Select'></td>";
				txt += "</tr>";
			}
		}
		
		else{
			txt += "<tr><td>no record</td></tr>";
		}
		
		txt+="</table>";
		txt+="</div>";
		
		document.getElementById('headerModal').innerHTML = "Chart of Account";
		document.getElementById('isiModal').innerHTML = txt;	
		document.getElementById("cari2").focus();
	
	},		

	
	searchModal: function (ini){
	
		this.action="search";
	
		if (ini.length==0){

			this.halaman=null;

			jsCoa.viewFind(gCoa.baris, gCoa.coa_blok, gCoa.modul);
			
		}else{
			
			var obj = {
				"login_blok":g.login_blok,
				"company_blok":g.company_blok,
				"coa_search":ini
			};
			
			loadDoc(myServer + "coa/search.php",this.showModal, obj); 
		
		}

	},
	
	klikPilih: function(coa_blok,coa_number,coa_name){
		
		document.getElementById('id01').style.display='none'
		
		if (gCoa.modul =='journal'){
			jsJournal.readCoa(gCoa.baris,coa_blok,coa_number,coa_name);
		}
		if (gCoa.modul =='opening'){
			// bila di modul opening mau browse master COA
		}
		if (gCoa.modul =='receivable'){
			// bila di modul receivable mau browse master COA
		}
		if (gCoa.modul =='payable'){
			// bila di modul payable mau browse master COA
		}
	}

}
