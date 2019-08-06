
var jsDef={
	blok:null,
	action: null,
	
	viewUpdate: function(){
		
		let layout  = '';
		layout += '<div class="w3-container w3-theme-d4">';
		layout += '<h3>Default: UPDATE</h3>';
		layout += '</div>';
		
		layout += '<form class="w3-container w3-card">';
		
		layout += '<p><input type="button" id = "btnUpdate" onclick="jsDef.klikUpdate()" value="Update" class="w3-btn w3-theme-l5 w3-round w3-border"></p>';
		layout += '<div id="msg"></div>';
		
		layout += '<p>';
		layout += '<label>Row per page:</label>';
		layout += '<input type ="text" id="default_row" class="w3-input w3-border">';
		layout += '</p>';
		layout += '</form>';
		
		document.getElementById('viewMid').innerHTML = layout;
		
		this.loadReadOne();

	},
	
	loadReadOne: function(){
		
		document.getElementById("default_row").value = 10;		
		
		let obj={"login_blok":g.login_blok};

		loadDoc(myServer+"default/read_one.php",this.loadData, obj); 

	},
	
	loadData: function(xhttp){

		let robin = JSON.parse(xhttp.responseText);
		
		if (robin.err ==0) {

			document.getElementById("default_row").value = robin.data[0].default_row;		
			
		}else{

			messageBox(robin.msg);

		}
	},
	
	klikUpdate: function(){
		
		let obj = {
			"login_blok":g.login_blok,
			"default_row":document.getElementById("default_row").value
		};			

		loadDoc(myServer+"default/update_one.php",this.serverMessage, obj); 
		
		document.getElementById("btnUpdate").disabled=true;
		
	},

	serverMessage: function(xhttp){

		var wonder = JSON.parse(xhttp.responseText);
		
		document.getElementById("msg").innerHTML=papanInfo(wonder.msg,wonder.err);
		
	}

}
