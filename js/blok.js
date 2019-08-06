var jsBlok={
	
	halaman: null,
	blok:null,
	action:null,
	search: null,
	
	viewRead: function(){
		
		this.action='read';
		
		let layout  = '';
		layout += '<div class="w3-container w3-theme-d4 w3-round">';
		layout += '<h3>Blok: READ</h3>';
		layout += '</div>';
		
		layout += '<div class="w3-container w3-card">';
		layout += '<br>';
		
		layout += '<div class="w3-row w3-section  w3-theme-d4">';
		layout += '<div class="w3-col w3-center" style="width:40px;padding-top:5px;"><i class="w3-xlarge fa fa-search"></i></div>';
		layout += '<div class="w3-rest">';
		layout += '<input type="text" onkeyup="jsBlok.viewSearch(this.value)" placeholder="Type to search..." id="cari" class="w3-input w3-border">';
		layout += '</div>';
		layout += '</div>';

		layout += '</p>';
		layout += '<p id="showPaging"></p>';
		layout += '<span id="count"></span>';
		layout += '<p id="showTable"></p>';
		layout += '</div>';
		
		document.getElementById('viewMid').innerHTML = layout;

		const obj = {
			"login_blok":g.login_blok
		};
		
		if (this.halaman==null){

			loadDoc(myServer+"blok/read_paging.php",this.showData, obj); 
			
		}else{

			loadDoc(this.halaman,this.showData, obj)
		}		
		
		document.getElementById('cari').focus();
		
	},
	
	showData: function(xhttp){

		var txt;
		
		var superman = JSON.parse(xhttp.responseText);
		
		txt ='<div class="w3-responsive">';
		txt+='<table border=1 class="w3-table-all">';
		txt+='<thead><tr class="w3-theme-l1">';

		txt+="<th>No.</th>";
		
		txt+="<th>Hash</th>";
		txt+="<th>Module</th>";
		txt+="<th>Method</th>";
		
		txt+="<th>Owner</th>";
		txt+="<th>Created</th>";
		txt+="<th colspan=3>Action</th>";

		txt+="</tr></thead>";

	    if (superman.err===0){
		
			for (x in superman.data) {
				
				var blokend = superman.data[x].blok;
				var blokend3 = blokend.split("-");
				
				txt += "<tr>";
				txt += "<td>"+superman.data[x].nomer + "</td>";
				txt += "<td style='font-family: Courier New'>"+jsBlok.blokID(superman.data[x].blok)+ "</td>";
				
				txt += "<td>"+superman.data[x].modul + "</td>";
				txt += "<td>"+superman.data[x].metode + "</td>";
				
				txt += "<td>"+superman.data[x].user_name + "</td>";
				txt += "<td>"+superman.data[x].date_created + "</td>";

				txt += "<td class='w3-center'><input type='button' id='det' onClick='jsBlok.viewDetail(\"" + superman.data[x].blok + "\");' value='Detail' class='w3-btn w3-theme-l5 w3-round w3-border'></td>";

				txt += "</tr>";
			}

			
		}
		
		txt+="</table></div>";
		
		document.getElementById("showTable").innerHTML = txt;
		document.getElementById("count").innerHTML = 'Total record: <span class="w3-tag w3-theme-l2">' + superman.msg + '<span>' ;
		
		txt="";
		
		if (jsBlok.action=="read"){
			
			if (superman.err==0){
				
				if (superman.paging.first!=""){
					
					txt+= "<input type='button' value= 'First' onclick='jsBlok.gotoPage(\"" + superman.paging.first + "\")' class='w3-btn  w3-theme-l5 w3-large w3-round-xlarge'>&nbsp;" ;
					
				}
				
				for (x in superman.paging.pages) {
					
					if (superman.paging.pages[x].current_page=="yes"){
						
						txt+= "<input type='button' value = '"+ superman.paging.pages[x].page +"' onclick='jsBlok.gotoPage(\"" + superman.paging.pages[x].url + "\")' disabled  class='w3-btn w3-theme-l5 w3-border w3-round-xlarge'>&nbsp;";	
						
					} else {
						
						txt+= "<input type='button' value = '"+ superman.paging.pages[x].page +"' onclick='jsBlok.gotoPage(\"" + superman.paging.pages[x].url + "\")'  class='w3-btn w3-theme-l5 w3-border w3-round-xlarge'>&nbsp;";	
					}
					
				}
				
				if (superman.paging.last!=""){
					
					txt+= "<input type='button' value= 'Last' onclick='jsBlok.gotoPage(\"" + superman.paging.last + "\")'  class='w3-btn w3-theme-l5 w3-border w3-round-xlarge'>&nbsp;" ;
					
				}
				
			}

		}

		document.getElementById("showPaging").innerHTML = txt; 

		if (superman.err!=0){
			
			document.getElementById("count").innerHTML = "Total record:<span class='w3-tag  w3-theme-l2'> 0 Row(s)</span>";

			messageBox(superman.msg);
		}
		
	},
	
	gotoPage: function (ini){

		this.halaman = ini;
		
		this.viewRead();

	},
	
	viewDetail: function(blok){
		
		let layout='';
		layout+='<div class="w3-container w3-theme-d4">';
		layout+='<h3>Blok Created</h3>';
		layout+='</div>';
		
		layout+='<div class="w3-container w3-card">';
		layout+= '<p>';
		layout+='<input type="button" value="Back" onclick="jsBlok.viewRead()" class="w3-btn w3-theme-l5 w3-round w3-border"> ';
		layout+= '</p>';
		//layout+= '<div>';
		layout+= '<p id="showDetail"></p>';
		layout+= '</div>';		
		
		document.getElementById('viewMid').innerHTML = layout;
		
		const obj = {
			"login_blok":g.login_blok,
			"blok": blok
		};
		
		loadDoc(myServer+"blok/read_one.php",this.showDetail, obj); 
		
	},
	
	showDetail: function(xhttp){
		
		var str = xhttp.responseText
		var batman = JSON.parse(str);
		
		var txt = '';
		var splt = batman.data[0].blok;
		var blok2=splt.split("-");
		
		txt+='<p>Hash: <span class="w3-tag w3-theme-l1">' + jsBlok.blokID(batman.data[0].blok) + '</span></p>';
		txt+='<p>Timestamp: <span class="w3-tag w3-theme-l1">' + jsBlok.timeID(batman.data[0].blok) + '</span></p>';
		
		txt+='<p>Created: <span class="w3-tag w3-theme-l1">' + batman.data[0].tgl + '</span></p>';
		txt+='<p>Module: <span class="w3-tag w3-theme-l1">' + batman.data[0].modul + '</span></p>';
		txt+='<p>Method: <span class="w3-tag w3-theme-l1">' + batman.data[0].metode + '</span></p>';
		txt+='<p>Character: <span class="w3-tag w3-theme-l1">' + batman.data[0].size + '</span></p>';
		txt+='<p>Previous hash: <span class="w3-tag w3-theme-l1">' + jsBlok.blokID(batman.data[0].previous_blok) + '</span></p>';
		txt+='<p>Data: </p>';
		txt+='<div class="w3-container w3-theme-l1 w3-round">';

		// gunakan str.charAt(); 
		var alfred = batman.data[0].json;
		for (x =0;x<alfred.length;x++){
			if (alfred.charAt(x)=="{"){
				txt+=""+alfred.charAt(x)+"<br>&emsp;&emsp;";	
			}else if (alfred.charAt(x)==","){
				txt+=alfred.charAt(x)+"<br>&emsp;&emsp;";	
			}else if (alfred.charAt(x)=="}"){
				txt+="<br>"+alfred.charAt(x);	
			}else if (alfred.charAt(x)=="["){
				txt+="<br>"+alfred.charAt(x)+"<br>&emsp;&emsp;";	
			}else if (alfred.charAt(x)=="]"){
				txt+="<br>"+alfred.charAt(x);	
			}			
			else{
				txt+=alfred.charAt(x);	
			}
		}
		
		txt+="</div>"; 

		document.getElementById("showDetail").innerHTML = txt; 
		
	},
	
	blokID: function(blok){
		var blokend = blok;
		var blokend3 = blokend.split("-");
		return blokend3[2];
	},
	
	timeID: function(blok){
		var blokend = blok;
		var blokend3 = blokend.split("-");
		return blokend3[0];
	},

	viewSearch: function (ini){
		this.action="search";
		this.search = ini;
		
		if (ini.length==0){

			this.halaman=null;

			jsBlok.viewRead();
			
		}else{
			
			var obj = {
				"login_blok":g.login_blok,
				"blok_search":ini
			};
				
			loadDoc(myServer + "blok/search.php",this.showData, obj); 
		
		}
	
	}
	
}
