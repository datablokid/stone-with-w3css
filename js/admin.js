
var jsAdmin={
	folder: "admin",
	viewCreate: function(){
		
		let layout='';
		
		layout += '<div class="w3-container w3-theme-d4 w3-round">';
		layout += '<h2>Administrator: CREATE</h2></div>';
		layout += '<form class="w3-container w3-card"> ';
		
		layout += '<div id="msg"></div>';
		
		layout += '<p>';
		layout += '<label>User Name:</label>';
		layout += '<input type="text" id = "user_name" class="w3-input w3-border">';
		layout += '</p>';
		
		layout += '<p>';
		layout += '<label>Full Name:</label>';
		layout += '<input type="text" id = "user_fullname" class="w3-input w3-border">';
		layout += '</p>';
		
		layout += '<p>';	
		layout += '<label>Password:</label>';
		layout += '<input type="password" id = "user_password" class="w3-input w3-border">';
		layout += '</p>';
		
		layout += '<p>';		
		layout += '<label>Confirm Password</label>';
		layout += '<input type="password" id = "confirm_password"  class="w3-input w3-border">';
		layout += '</p>';
		
		let alamat1 = myServer + "/passcode/xyzimg.php";
		layout += '<p>';
		//layout += '<label>Passcode</label><br>';
		layout += 'Passcode <img src=\'' + alamat1 + '\' id="passcode_image" border=1 " class="w3-border"><br>';
		layout += '</p>';
		
		layout += '<p>';
		layout += '<label>Retype Passcode</label>';
		layout += '<input type="text" id = "user_passcode" placeholder="Passcode"  class="w3-input w3-border" style="width:50%">';
		layout += '</p>';

		layout += '<p>';
		layout += '<input type="button" id = "btnCreate" onclick="jsAdmin.klikCreate()" value="Create" class="w3-btn w3-theme-l5 w3-border w3-round-large">';
		layout += '</p>';

		layout += '</form>';

		
		document.getElementById('viewMid').innerHTML = layout;
		document.getElementById('user_name').focus();
		
	},
	
	klikCreate: function(){

		if (document.getElementById("btnCreate").value =="Create"){
			
			const obj = {
				"company_key":null,
				"user_name":document.getElementById("user_name").value,
				"user_fullname":document.getElementById("user_fullname").value,
				"user_password":document.getElementById("user_password").value,
				"confirm_password":document.getElementById("confirm_password").value,
				"user_passcode":document.getElementById("user_passcode").value
			};
			
			loadDoc(myServer+this.folder+"/create.php",this.showMessage, obj); 
			
		}else{

			document.getElementById("btnCreate").value = "Create";

			this.reset();
			
		}
	},
	
	reset: function(){
		
		document.getElementById("user_name").value = "";
		document.getElementById("user_fullname").value = "";
		document.getElementById("user_password").value = "";
		document.getElementById("confirm_password").value = "";
		document.getElementById("user_passcode").value = "";

		document.getElementById("msg").innerHTML = "";
		
		window.location.replace(window.location.href);

		jsAdmin.viewCreate();
	},
	
	
	showMessage: function(xhttp) {

		var ironman = JSON.parse(xhttp.responseText);
		
		if (ironman.err==0){
			
			document.getElementById("btnCreate").value = "Reset";

		}
		
		document.getElementById("msg").innerHTML = papanInfo(ironman.msg,ironman.err);
		
		
	}
	
}
