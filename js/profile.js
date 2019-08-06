
var jsProfile={

	viewRead: function(){
		
		let layout='';

		layout+='<div class="w3-container w3-theme-d4">';
		layout+='<h3>Profile: READ</h3>';
		layout+='</div>';
		layout+='<div class="w3-container w3-card">';
		layout+='<p>';
		layout+='<input type="button" value="Edit" onclick="jsProfile.viewUpdate();" id="btnUpdate" class="w3-btn w3-theme-l5 w3-round w3-border">';
		layout+='</p>';
		
		layout+='User Blok: <span id="userBlok" class="w3-tag w3-theme-l1"></span></p>';
		layout+='User Name: <span id="userName" class="w3-tag w3-theme-l1"></span></p>';
		layout+='Full Name: <span id="userFullname" class="w3-tag w3-theme-l1"></span></p>';
		layout+='Email Address: <span id="emailAddress" class="w3-tag w3-theme-l1"></span></p>';
		layout+='Mobile Number: <span id="mobileNumber" class="w3-tag w3-theme-l1"></span></p>';
		layout+='Quota: <span id="userQuota" class="w3-tag w3-red"></span></p>';
		layout+='Used: <span id="userUsed" class="w3-tag w3-light-green"></span></p>';
		layout+='Ranking: <span id="userRank" class="w3-tag w3-blue">process...</span></p>';
		layout+='</div>';

		document.getElementById('viewMid').innerHTML = layout;

		const obj={"login_blok":g.login_blok};
		
		loadDoc(myServer+"login/read.php",this.showProfile, obj); 
	}, 

	showProfile: function(xhttp){
		
		let thor = JSON.parse(xhttp.responseText);
		
		document.getElementById("userBlok").innerHTML=thor.data[0].user_blok;
		document.getElementById("userName").innerHTML=thor.data[0].user_name;
		document.getElementById("userFullname").innerHTML=thor.data[0].user_fullname;
		document.getElementById("emailAddress").innerHTML=thor.data[0].email_address;
		document.getElementById("mobileNumber").innerHTML=thor.data[0].mobile_number;
		document.getElementById("userQuota").innerHTML=thor.data[0].quota_tx+" tx";
		document.getElementById("userUsed").innerHTML=thor.data[0].used_tx+" tx";

	},
	
	viewUpdate: function(){
		
		let layout='';
		layout+='<div class="w3-container w3-theme-d4">';
		layout+='<h3>Profile: UPDATE</h3>';
		layout+='</div>';
		
		layout+='<div class="w3-container w3-card">';
		layout+='<p id="userAktif"></p>';
		layout+='<input type="button" value="Read" onclick="jsProfile.viewRead();" id="btnBack" class="w3-btn w3-theme-l5 w3-round w3-border">&nbsp;';
		layout+='<input type="button" value="Update" onclick="jsProfile.klikUpdate();" id="btnUpdate" class="w3-btn w3-theme-l5 w3-round w3-border">';
		layout+='<div id="msg"></div>';
		
		layout+='<p><label>User Name</label>';
		layout+='<input type="text" id="userName" class="w3-input w3-border"></p>';
		
		layout+='<p><label>Full Name:</label>';
		layout+='<input type="text" id="userFullname" class="w3-input w3-border"></p>';
		
		layout+='<p><label>Email Address</label>';
		layout+='<input type="email" id="emailAddress" class="w3-input w3-border"></p>';
		
		layout+='<p><label>Mobile Number</label>';
		layout+='<input type="text" id="mobileNumber" class="w3-input w3-border"></p>';
		
		layout+='<p><label>Current datablok password</label>';
		layout+='<input type="password" id="oldPassword" class="w3-input w3-border"></p>';
		
		layout+='<p><label>Enter new datablok password</label>';
		layout+='<input type="password" id="newPassword" class="w3-input w3-border"></p>';
		
		layout+='<p><label>Retype new datablok password</label>';
		layout+='<input type="password" id="retypePassword" class="w3-input w3-border"></p>';
		
		layout+='</div>';
		
		document.getElementById('viewMid').innerHTML = layout;

		let obj={"login_blok":g.login_blok};
		
		loadDoc(myServer+"login/read.php",this.showProfileUpdate, obj); 
		
		document.getElementById('userName').focus();
	},
	
	showProfileUpdate:function(xhttp){
		
		let rocket = JSON.parse(xhttp.responseText);
		
		document.getElementById("userName").value=rocket.data[0].user_name;
		document.getElementById("userFullname").value=rocket.data[0].user_fullname;
		document.getElementById("emailAddress").value=rocket.data[0].email_address;
		document.getElementById("mobileNumber").value=rocket.data[0].mobile_number;		
		
	},
	
	klikUpdate: function(){

		var obj = {
			"login_blok":g.login_blok,
			"old_password":document.getElementById("oldPassword").value,
			"new_password":document.getElementById("newPassword").value,
			"retype_password":document.getElementById("retypePassword").value,
			"user_fullname":document.getElementById("userFullname").value,
			"email_address":document.getElementById("emailAddress").value,
			"mobile_number":document.getElementById("mobileNumber").value
		}

		loadDoc(myServer+"change/update_one.php",this.showMessage, obj); 

	},

	showMessage: function(xhttp){

		var panther = JSON.parse(xhttp.responseText);

		document.getElementById("msg").innerHTML=papanInfo(panther.msg,panther.err);
		
		if (panther.err===0){
			
			document.getElementById("btnUpdate").disabled=true;
			
		}

	}
}
