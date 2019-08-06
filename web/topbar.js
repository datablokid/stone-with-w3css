/*
 * modul: topbar.js
 * name: budiono
 * date: 2-aug-2019.jumat
 * 
 */ 
var jsTopbar = {

	//myServer:"http://localhost/free/blog/api/",
	myServer:"https://www.datablok.id/v1/",
	user_name:"c",
	topfolder_name:"datablok",
	
	load : function(){
		var alamat = 'index.html';
		var Prmtr = window.location.search.substring(1);
		var user_name,topfolder_name,folder_name,subfolder_name,file_name;		

		// looping untuk mengambil parameter url
		var hulk;
		var hawkeye = Prmtr.split("&");
		for (i = 0; i < hawkeye.length; i++) {
			hulk = hawkeye[i].split("=");
			if (hulk[0]=="user_name"){
				user_name=hulk[1];
			}
			if (hulk[0]=="topfolder"){
				topfolder_name=hulk[1];
			}
			if (hulk[0]=="folder"){
				folder_name=hulk[1];
			}
			if (hulk[0]=="subfolder"){
				subfolder_name=hulk[1];
			}			
			if (hulk[0]=="file"){
				file_name=hulk[1];
			}

		}

		if (topfolder_name==undefined){topfolder_name='';}
		if (folder_name==undefined){folder_name='';}
		if (subfolder_name==undefined){subfolder_name='';}
		if (file_name==undefined){file_name='';}
		
		if (user_name==""){
			user_name=this.user_name;
		}
		if (topfolder_name==""){
			topfolder_name=this.topfolder_name;
		}
		
		let param='';
		param+=this.myServer;
		param+="list/public.php";
		param+="?user_name="+this.user_name;
		param+="&topfolder="+topfolder_name;
		param+="&folder="+folder_name;
		param+="&subfolder="+subfolder_name;
		param+="&file="+file_name;
		
		loadDoc(param,this.topbar_load);
	},
	
	topbar_load: function(xhttp){
		
		let myObj = JSON.parse(xhttp.responseText);
		let aktif_folder_name='';
		let aktif_subfolder_name='';
		let layout = '';
		
		for (x in myObj.aktif) {
			aktif_folder_name=myObj.aktif[x].folder_name;	
			aktif_subfolder_name=myObj.aktif[x].subfolder_name;	
			aktif_file_name=myObj.aktif[x].file_name;	
			
		}
		
		/*
		 * record: TOP-FOLDER
		 **/ 
		layout += '<div id="navbar" class="w3-bar w3-dark-grey w3-card-4" style="font-size:18px">';
		for (x in myObj.topfolder_records) {
			
			if (x==0){
				if (aktif_folder_name==myObj.topfolder_records[x].folder_name){
					layout += '<a href="'+myObj.topfolder_records[x].klikAja+'" class="w3-bar-item w3-button w3-teal"><i class="fa fa-home "></i>'+myObj.topfolder_records[x].folder_name+'</a>';
				}else{
					layout += '<a href="'+myObj.topfolder_records[x].klikAja+'" class="w3-bar-item w3-button"><i class="fa fa-home"></i>'+myObj.topfolder_records[x].folder_name+'</a>';
				}
			}
			else{
				if (aktif_folder_name==myObj.topfolder_records[x].folder_name){
					layout += '<a href="'+myObj.topfolder_records[x].klikAja+'" class="w3-bar-item w3-button w3-hide-small w3-teal">'+myObj.topfolder_records[x].folder_name+'</a>';
				}else{
					layout += '<a href="'+myObj.topfolder_records[x].klikAja+'" class="w3-bar-item w3-button w3-hide-small">'+myObj.topfolder_records[x].folder_name+'</a>';
				}
			}
		}
		layout += '<a href="javascript:void(0)" class="w3-bar-item w3-button w3-right w3-hide-large w3-hide-medium" onclick="myFunction()">&#9776;</a>';
		layout += '</div>';
		
		/*
		 * mobile view
		 */ 
		layout += '<div id="demo" class="w3-bar-block w3-black w3-hide w3-hide-large w3-hide-medium">';
		for (x in myObj.topfolder_records) {
			if (x==0){
				// home tidak ditulis
			}else{
				layout += '<a href="'+myObj.topfolder_records[x].klikAja+'" class="w3-bar-item w3-button">'+myObj.topfolder_records[x].folder_name+'</a>';
			}
		}
		layout += '</div>';
		
		document.getElementById("div_topbar").innerHTML=layout;

		

		
		/*
		 * record: FOLDER LEFT
		 **/
		layout ='<p>';
		layout += '<div class="w3-bar-block w3-light-grey">';
		for (x in myObj.folder_records) {
			
			if ((aktif_subfolder_name==myObj.folder_records[x].folder_name)){
				layout+='<a href="'+myObj.folder_records[x].klikAja+'" class="w3-bar-item w3-button w3-teal">'+myObj.folder_records[x].folder_name+ '</a>';
			}
			else{
				layout+='<a href="'+myObj.folder_records[x].klikAja+'" class="w3-bar-item w3-button">'+myObj.folder_records[x].folder_name+ '</a>';
			}
		
		}
		
		/*
		 * record : list FILE FOLDER-LEFT
		 */ 
		for (x in myObj.file_folder_records) {
			
			if (aktif_file_name==myObj.file_folder_records[x].file_name){
				layout+='<a href="'+myObj.file_folder_records[x].klikAja+'" class="w3-bar-item w3-button w3-teal">'+myObj.file_folder_records[x].file_name+ '</a>';
			}else{
				layout+='<a href="'+myObj.file_folder_records[x].klikAja+'" class="w3-bar-item w3-button">'+myObj.file_folder_records[x].file_name+ '</a>';
			}
		
		}
		
		/*
		 * bila record kosong, tidak perlu direplace
		 */ 
		if (myObj.folder_records.length==0){
			layout +='empty';
		}
		layout += "</div>";
		
		document.getElementById("div_leftbar").innerHTML=layout;
		
		

		/*
		 * mengambil: SUB-FOLDER-MIDDLE
		 * bila ada parameter file=xxxx maka file khusus untuk Content, list dihilangkan
		 */ 
		 
		layout ='<p>';
		layout += '<div class="w3-container w3-white">';

		for (x in myObj.subfolder_records) {

			layout += '<div class="gold">';	
			layout+= "<p>";
			layout+='<a href="'+myObj.subfolder_records[x].klikAja+'">'+myObj.subfolder_records[x].folder_name+ '</a>';
			layout+= "</p>";
			layout+= "</div>";
		}
		//layout +='<i class="fa fa-eye"></i>';
		
		/* 
		 * tambah isi content file
		 */ 

		for (x in myObj.file_content) {
			layout += '<div class="gold">';
			layout+= "<h1>"+myObj.file_content[x].file_name+"</h1>";
			layout+= myObj.file_content[x].file_content;
			layout += "</div><br>";
			layout +='<small><i class="fa fa-calendar"></i> <span class="w3-green">'+myObj.file_content[x].file_date+'</span></small>';
		}

		/*
		 * tambah list file di sub-folder
		 */ 

		for (x in myObj.file_subfolder_records) {
			layout += '<div class="gold">';	
			layout += "<p>";
			layout += myObj.file_subfolder_records[x].file_content;
			layout += "</p>";;
			layout += "</div>";
			layout +='<small><i class="fa fa-calendar"></i> <span class="w3-green">'+myObj.file_subfolder_records[x].file_date+'</span></small>';
		}
		//layout +='<i class="fa fa-eye"></i>';

		if (myObj.subfolder_records.length==0){
			//layout +='<small><s>sub-folder</s></small><p>';
		}

		if (myObj.file_subfolder_records.length==0){
			//layout +='<small><s>file-list</s></small><p>';
		}
		

		if (myObj.file_content.length==0){
			// layout +='<small><s>file-content</s></small><p>';
		}

		layout += "</div>";

		document.getElementById("div_midbar").innerHTML=layout;

		
	}
}
