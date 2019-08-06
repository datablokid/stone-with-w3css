
var jsLogin={
	
	htmlCreate: function(){
		var layout='';
		layout+= '<div id="msg"></div>';
		
		layout+= '<div class="w3-container w3-theme-d4 w3-round"><h2>Login</h2></div>';
		layout+= '<form class="w3-container w3-card">';
		
		layout+= '<input type="hidden" id = "myserver"  value="'+ myServer +'">';
		
		layout+= '<p>';
		layout+= '<label>User Name</label>';
		layout+= '<input id = "user_name" type="text" class="w3-input w3-border">';
		layout+= '</p>';
		
		layout+= '<p>';
		layout+= '<label>Password</label>';
		layout+= '<input id = "user_password" type="password" class="w3-input w3-border">';
		layout+= '</p>';
		
		layout+= '<p>';
		layout+= '<input type="button" id = "btnSubmit" onclick="jsLogin.klikLogin()" value="Login" class="w3-btn w3-theme-l5 w3-border w3-round-large">';
		layout+= '</p>';
		
		layout+= '<p id="testing">';
		layout+= '</form>';
			
		document.getElementById('viewMid').innerHTML = layout;
		
		document.getElementById('user_name').focus();
		
	},

	klikLogin: function(){
		myServer = document.getElementById('myserver').value;

		if (myServer=='' || myServer==null){
			return showSnackBar('Server tidak boleh kosong');
		}
		
		sessionStorage.setItem("myServer", myServer);
		
		if (g.login_blok==null){
			
			var obj;
			
			obj={
				"user_name":document.getElementById("user_name").value,
				"user_password":document.getElementById("user_password").value
			};
			
			loadDoc(myServer+"login/create.php",this.show, obj); 

		}else{
			
			alert('sudah login'+g.login_blok);
			
		}
	},

	show: function(xhttp){

		let respon = xhttp.responseText;

		if (respon.length==0){
			
			return messageBar('Server tidak terdapat API');
			
		}

		var hulk = JSON.parse(xhttp.responseText);
		
		if (hulk.err==0){

			g.login_blok=hulk.data.login_blok;

			sessionStorage.setItem("login_blok", g.login_blok);

			document.getElementById('viewMid').innerHTML ='Login blok: '+g.login_blok;

			document.location.reload();

		}
		else{

			document.getElementById('msg').innerHTML = papanInfo(hulk.msg,hulk.err);

	    }
	},
	
	isLogin: function(){

		let obj= {"login_blok":g.login_blok};
		
		loadDoc(myServer+"login/read.php",this.showLogin, obj);
	},
	
	showLogin: function (xhttp) {

		var stark = JSON.parse(xhttp.responseText);

		if (stark.err==0){
			
			var userAktif;
			
			g.user_name=stark.data[0].user_name;
			
			g.user_fullname=stark.data[0].user_fullname;
			
			userAktif="User Fullname: <i>" + stark.data[0].user_fullname+"</i> <br>";
			
			if (g.company_blok!=null){
				userAktif +="Company name: <i>" + g.company_name+"</i><br>";
			}
			
			document.getElementById("userAktif").innerHTML = userAktif;
			
		}
		
		else{
			
			document.getElementById("msgindex").innerHTML = stark.msg;
			document.getElementById("userAktif").innerHTML = "";
			
			//no login
			sessionStorage.removeItem("login_blok");

		}
	},
}
