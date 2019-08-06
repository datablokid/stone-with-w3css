function loadDoc(url, cFunction, obj) {
	
	var xhttp, dbParam;
	dbParam = JSON.stringify(obj);
	xhttp = new XMLHttpRequest();
	xhttp.onreadystatechange = function() {
		if (this.readyState == 4) {
			cFunction(this);
		}
	};
	xhttp.open("POST", url, false);
	xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
	xhttp.send(dbParam);
}

var paket={
	xhttp2:null,
	hasil:"def",
	loadDoc: function(url, callback, obj){
		// alert('test');
		var args = Array.prototype.slice.call(arguments, 3);
		var xhttp, dbParam;
		
		dbParam = JSON.stringify(obj);
		
		xhttp = new XMLHttpRequest();
		
		// xhttp.onreadystatechange = function() {
		xhttp.onload = function(){
			if (xhttp.readyState == 4) {
				// cFunction(this);
				// this.showMessage(this);
				// this.xhttp2 = this.readyState;
				// callback.apply(xhttp, args);
				callback.apply(this);
			}
		};
		xhttp.open("POST", url, true);
		xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
		xhttp.send(dbParam);
		
	},
	
	showMessage: function (message){
		
		this.hasil = 'budi ';// + this.responseText;
		document.getElementById("message").innerHTML = 'budi '+ this.status + this.responseText;
		//modelTry.hasil = this.responseText;
		abc.hasil = this.responseText;
		
	}
	
}

class model {
	constructor(jNote,jTry){
		this.jNote = jNote;
		this.jTry = jTry;
	}
}

const gModel = new model('Note','try');
