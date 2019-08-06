
var jsFolderlookup={

	viewFind: function(modul,baris,folder_blok){

		gFolder.modul=modul;
		gFolder.baris=baris;
		gFolder.folder_blok=folder_blok;
		
		document.getElementById('id01').style.display='block';

		let obj = {
			"login_blok":g.login_blok
		};
		
		if (this.halaman==null){

			loadDoc(myServer+"folder/read_paging.php",this.showModal, obj); 
			
		}else{

			loadDoc(this.halaman,this.showModal, obj)
		}

		txt = '<p>';
		txt += '<input type="text" onkeyup="jsFolderlookup.searchModal(this.value)" placeholder="Type to search..." id="cari" value="" class="w3-input w3-border">';
		txt += '</p>';
		document.getElementById('searchModal').innerHTML = txt;	
		document.getElementById("cari").focus();

	},
	
	showModal: function(xhttp){
		
		var venom = JSON.parse(xhttp.responseText);
		
		var txt='';
		txt ='<div class="w3-responsive">';
		txt+='<table border=1 class="w3-table-all">';
		txt+='<thead><tr class="w3-theme-d4">';

		txt+="<th>Folder Path</th>";
		
		txt+="<th class='w3-center'>Action</th>";
		
		txt+="</tr></thead>";
		if (venom.err==0){
			
			for (x in venom.data) {
				txt += "<tr>";
				txt += "<td>"+venom.data[x].folder_path + "</td>";
				txt += "<td class='w3-center'><input type='button' onClick='jsFolderlookup.klikPilih(\"" + venom.data[x].folder_blok + "\",\"" + venom.data[x].folder_name + "\",\"" + venom.data[x].folder_path + "\")' value='Select' class='w3-btn w3-theme-l5 w3-border w3-round-large'></td>";
				txt += "</tr>";
			}
		}
		
		else{
			
			txt += "<tr><td>no record</td></tr>";
			
		}
		
		txt+="</table>";
		txt+="</div>";
		
		document.getElementById('headerModal').innerHTML = "Folder";
		document.getElementById('isiModal').innerHTML = txt;	
		
	
	},		

	klikPilih: function(folder_blok,folder_name,folder_path){

		document.getElementById('id01').style.display='none'
		
		if (gFolder.modul =='folder'){
			
			jsFolder.readFolder(folder_blok,folder_name,folder_path);
			
		}
		
		if (gFolder.modul =='file'){

			jsFile2.readFolder(folder_blok,folder_name,folder_path);
			
		}
	},
		
	searchModal: function (ini){
	
		this.action="search";
	
		if (ini.length==0){

			this.halaman=null;

			jsFolderlookup.viewFind(gFolder.modul, gFolder.baris, gFolder.folder_blok);
			
		}else{
			
			let obj = {"login_blok":g.login_blok
				,"search": ini
			};
			
			loadDoc(myServer + "folder/search.php",this.showModal, obj); 
		
		}

	},
	

}
