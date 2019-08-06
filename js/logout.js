
var jsLogout={
	
	htmlCreate: function(){
		let layout ='';
		layout +='<div class="w3-container w3-theme">';
		layout +='<h1>Logout </h1>';
		layout +='</div>';

		layout +='<form class="w3-container w3-light-gray w3-card">';

		layout +='<div id="msg"></div>';
		layout +='<p>';
		layout +='<label>Login blok:</label> <span class="w3-tag w3-dark-gray">'+g.login_blok+'</span>';

		layout +='</p>';
		layout +='<p>';
		layout +='<input type="button" value="Logout" onclick="jsLogout.klikLogout()" class="w3-btn w3-theme-d5 w3-round">';
		layout +='</p>';
		layout +='</form>';
		
		document.getElementById('viewMid').innerHTML = layout;
		
	},

	klikLogout: function(){

		let obj = {"login_blok":g.login_blok};

		loadDoc(myServer+"logout/create.php", jsLogout.showLogout, obj); 

	},

	showLogout: function (xhttp){

		var happy=JSON.parse(xhttp.responseText);

		if (happy.err == 0){

			//bersihkanMemory();
			bersihkanMemory();
			
			messageBox('Logout');
			
			jsLogin.htmlCreate();
			
		}
		
		// bila terjadi kesalahan/error
		else{
			
			document.getElementById("msg").innerHTML = papanInfo(happy.msg, happy.err);
			
		}
		
		// bersihkan memori login_block & user_block
		// PENTING!!! bersihkan memori/variabel session di browser.
		// bersihkam memory storage komputer
		sessionStorage.removeItem("login_blok");
		sessionStorage.removeItem("company_blok");
		sessionStorage.removeItem("company_name");

		//g.login_blok=null;
		//g.company_name=null;
		//g.company_blok=null;
		
		function bersihkanMemory(){
			// bersihkam memory global
			g.login_blok=null;
			g.company_name=null;
			g.company_blok=null;
			g.user_name=null;
			g.user_fullname=null;
			g.user_blok=null;			

			// bersihkam memory storage komputer
			sessionStorage.removeItem("login_blok");
			sessionStorage.removeItem("company_blok");
			sessionStorage.removeItem("company_name");

			// bersihkan layar
			document.getElementById("viewMid").innerHTML = "";
			//document.getElementById("message").innerHTML = "";

			
			// 8.2.2. link login menjadi login, kembali
			document.getElementById("menuLogin").value = "Login";				

			// 8.2.3. bersihkan menu
			document.getElementById("menu").innerHTML = "";
			document.getElementById("menuDua").innerHTML = "";
			document.getElementById("userAktif").innerHTML = "";
			
			document.getElementById("menuHome").style.display="inline";
			document.getElementById("menuLogout").style.display="none";
			document.getElementById("menuLogin").style.display="inline";
			document.getElementById("btnNew").style.display="inline";
			document.getElementById("btnForgot").style.display="inline";
			
			
		}
	}

// close var
}
