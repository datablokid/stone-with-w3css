var crypto_now=[];

jsMarket={
	timerOn: true,
	kode: null,
	blok: null,
	price: null,
	viewRead: function(){
		
		let layout='';
		layout += '<div class="w3-container w3-theme-d4 w3-round w3-border">';
		layout += '<h3>Market: READ</h3>';
		layout += '</div>';
		
		layout += '<div id="div_timer"></div>';
		layout += '<div class="w3-right-align"><sup class="w3-large">BALANCE <strong>IDR</strong></sup>&nbsp;<span id="market_balance" class="w3-xxxlarge">1.000,-</span></div>';
		
		layout += '<div class="w3-right-align w3-black" id="div_idr"></div>';
		layout += '<div id="div_market"></div>';
		layout += '<div id="msg"></div>';
		
		document.getElementById("viewMid").innerHTML =layout;

		this.loadMarket();
		
	},
	
	loadMarket: function(){
		if (typeof div_market == 'undefined') {

			//console.log("www.datablok.id is an undefined variable.");

		}else{

			jsMarket.myTimer();

			let obj = {
				"login_blok":g.login_blok
			};
			
			loadDoc(myServer+"market/read.php",jsMarket.showMarket, obj); 

		}		
	},
	
	showMarket: function(xhttp){

		var thanos = JSON.parse(xhttp.responseText);
		var txt='';
		var crypto=[];
		var saldo=0;
		var saldo_idr=0;
		var saldo_crypto=0;
		var saldo_open=0;
		var saldo_crypto_open=0;
		var stok=0;
		
		txt+="<div class='w3-responsive'>";
		txt+="<table border=1 class='w3-table-all'>";
		txt+="<thead><tr class='w3-theme-l1'>";

		txt+="<th>Name</th>";
		txt+="<th class='w3-right-align'>Price (IDR)</th>";
		txt+="<th class='w3-right-align'>High (IDR)</th>";
		txt+="<th class='w3-right-align'>Low (IDR)</th>";
		txt+="<th class='w3-right-align'>Stock</th>";
		txt+="<th colspan=2 class='w3-center'>Action</th>";

		txt+="</tr></thead>";
		crypto=crypto_now;
	    if (thanos.err===0){
			// IDR
			txt += "<tr>";
			txt += "<td><h3>IDR</h3><small>RUPIAH</small></td>";
			txt += "<td class='w3-right-align'><h4>1,-</h4></td>";
			txt += "<td class='w3-right-align'><h4>&nbsp-</h4></td>";
			txt += "<td class='w3-right-align'><h4>&nbsp-</h4></td>";
			stok =(parseFloat(thanos.balance_idr)+parseFloat(thanos.balance_open));
			txt += "<td class='w3-right-align'><h4>"+formatSerebuan(stok.toFixed(2))+" IDR </h4>"; // stock
			txt += "<td>&nbsp</td>";
			txt += "<td>&nbsp</td>";
			txt += "</tr>";
			
			// CRYPTO-COIN
			for (x in thanos.data) {				
				txt += "<tr>";
				txt += "<td><h3>"+thanos.data[x].code.toUpperCase()+"</h3><small>"+thanos.data[x].name+"</small></td>";
				if (parseInt(thanos.data[x].price)!=parseInt(crypto[x])){
					//merah
					txt += "<td class='w3-right-align'><h4 style='color:red'>"+formatSerebuan(parseInt(thanos.data[x].price)) + ",-</h4></td>";
				}else{
					txt += "<td class='w3-right-align'><h4>"+formatSerebuan(parseInt(thanos.data[x].price)) + ",-</h4></td>";
				}
				txt += "<td class='w3-right-align'><h4>"+formatSerebuan(parseInt(thanos.data[x].high)) + ",-</h4></td>";
				txt += "<td class='w3-right-align'><h4>"+formatSerebuan(parseInt(thanos.data[x].low)) + ",-</h4></td>";
				
				stok = parseFloat(thanos.data[x].saldo)+parseFloat(thanos.data[x].tmp)
				txt += "<td class='w3-right-align'><h4>"+stok+" "+ thanos.data[x].code.toUpperCase() +"</h4>"; // stock
				
				stok=((parseFloat(thanos.data[x].saldo)+parseFloat(thanos.data[x].tmp)) * thanos.data[x].price)
				txt += "<small>"+ stok.toFixed(2) + " IDR</small>";
				txt += "</td>";
				
				txt += "<td class='w3-center'><input type='button' value='BUY' onclick='jsMarket.klikBuy(\""+thanos.data[x].code+"\",\""+parseInt(thanos.data[x].price)+"\", \""+thanos.balance_idr+"\")' class='w3-btn w3-theme-l5 w3-round w3-border'></td>";
				txt += "<td class='w3-center'><input type='button' value='SELL' onclick='jsMarket.klikSell(\""+thanos.data[x].code+"\",\""+parseInt(thanos.data[x].price)+"\", \""+thanos.data[x].saldo+"\")' class='w3-btn w3-theme-l5 w3-round w3-border'></td>";
				txt += "</tr>";

				crypto_now[x] = thanos.data[x].price;
				
				saldo_crypto += parseFloat(thanos.data[x].saldo) * thanos.data[x].price;
				saldo_crypto_open += parseFloat(thanos.data[x].tmp) * thanos.data[x].price;
			}
			
			saldo = parseInt(thanos.balance_idr) + parseInt(saldo_crypto) + parseInt(thanos.balance_open) + parseInt(saldo_crypto_open);
			saldo_idr = parseInt(thanos.balance_idr);
			saldo_crypto = parseInt(saldo_crypto);
			saldo_open = parseFloat(thanos.balance_open) + parseFloat(saldo_crypto_open);
		}
		
		txt+='</table>';
		txt+='</div><p><p>';
		
		document.getElementById("div_market").innerHTML =txt;
		document.getElementById("market_balance").innerHTML = formatSerebuan(parseInt(saldo)) +",-" ; 
		
		var total;
		total  = "Stock Rupiah: " + formatSerebuan(parseInt(saldo_idr)) +" IDR | ";
		total += "Stock Crypto: "  + formatSerebuan(parseInt(saldo_crypto)) + " IDR | ";
		total += "Open Order: "  + formatSerebuan(parseInt(saldo_open)) +" IDR" ;
		document.getElementById("div_idr").innerHTML = total; 
		
	},
	
	myTimer: function() {
		
		var d = new Date();
		document.getElementById("div_timer").innerHTML = "Time: "+d.toLocaleTimeString() + " (This page will refresh every 5 second.)";
		
	},
	
	klikBuy: function(kode, price, balance){
		
		this.kode = kode;
		this.price=price;
		var layout='';
		let rupiah = parseFloat(balance);
		
		layout += '<div class="w3-container w3-theme-d4 w3-round w3-border">';
		layout += '<h3>Buy: '+ kode.toUpperCase() +'</h3>';
		layout += '</div>';
		
		layout += '<form class="w3-container w3-card">';
		layout += '<p>';
		layout += '<input type="Button" value="Back" onclick="jsMarket.viewRead()" class="w3-btn w3-theme-l5 w3-border w3-round">&nbsp;';
		layout += '<input type="Button" id="btnCreate" value="Create" onclick="jsMarket.klikBuyOrder()" class="w3-btn w3-theme-l5 w3-border w3-round">';
		layout += '</p>';
		layout += '<div id="msg"></div>';

		layout += '<p>';
		layout += '<label>Balance IDR</label>';
		layout += '<input type ="text" id= "buy_balance" value="'+formatSerebuan(rupiah.toFixed(2))+'" readonly class="w3-input w3-border">';
		layout += '</p>';
		
		layout += '<p>';
		layout += '<label>Amount IDR</label>';
		layout += '<input type ="text" id="buy_amount" placeholder="input tanpa titik/koma" class="w3-input w3-border">';
		layout += '</p>';
		
		layout += '<p>';
		layout += 'Price per '+kode.toUpperCase()
		layout += '<input type ="text" id="buy_price" value="'+ price +'" class="w3-input w3-border">';
		layout += '</p>';

		layout += '</form>';
		
		document.getElementById("viewMid").innerHTML =layout;
		document.getElementById("buy_amount").focus();

	},
	
	klikBuyOrder: function(){

		var price_est=document.getElementById("buy_price").value;
		
		// bila menawar harga lebih tinggi, diambil sama dengan harga price market
		if (parseInt(this.price) < parseInt(price_est)){
			price_est = this.price;
		}
		
		var obj = {
			"login_blok": g.login_blok
			,"buy_name":this.kode
			,"buy_amount":document.getElementById("buy_amount").value
			,"buy_price":price_est
		}
		
		loadDoc(myServer+"crypto/buy_create_one.php",this.serverMessage, obj); 
		
	},
	
	serverMessage: function(xhttp){
		
		var nebula = JSON.parse(xhttp.responseText);
	
		if (nebula.err == 0){

			if (nebula.metode=="Create"){
				
				document.getElementById("btnCreate").disabled = true;
				
			}
		
		} 

		document.getElementById("msg").innerHTML = papanInfo(nebula.msg, nebula.err);

	},
	
	klikSell: function(kode, price, balance){
		
		this.kode = kode;
		this.price=price;
		var layout='';
		
		layout += '<div class="w3-container w3-theme-d4 w3-round w3-border">';
		layout += '<h3>Sell: '+ kode.toUpperCase() +'</h3>';
		layout += '</div>';
		
		layout += '<form class="w3-container w3-card">';
		layout += '<p>';
		layout += '<input type="Button" value="Back" onclick="jsMarket.viewRead()" class="w3-btn w3-theme-l5 w3-border w3-round">&nbsp;';
		layout += '<input type="Button" id="btnCreate" value="Create" onclick="jsMarket.klikSellOrder()" class="w3-btn w3-theme-l5 w3-border w3-round">';
		layout += '</p>'
		
		layout += '<div id="msg"></div>';

		layout += '<p>';
		layout += '<label>Balance '+ kode.toUpperCase() + '</label>';
		layout += '<input type ="text"  value="'+balance+'" readonly class="w3-input w3-border">';
		layout += '</p>';
		
		layout += '<p>';
		layout += '<label>Amount '+ kode.toUpperCase() +'</label>';
		layout += '<input type ="text" id="sell_amount"  placeholder="input tanpa titik/koma" class="w3-input w3-border">';
		layout += '</p>';
		
		layout += '<p>';
		
		layout += '<label>Price per IDR</label>';
		layout += '<input type ="text" id="sell_price"  value="'+ price +'" class="w3-input w3-border">';
		layout += '</p>';
		
		layout += '</form>';
		
		document.getElementById("viewMid").innerHTML =layout;
		document.getElementById("sell_amount").focus();

	},
	
	klikSellOrder: function(){

		var price_est=document.getElementById("sell_price").value;
		
		// bila menawar harga lebih rendah, diambil sama dengan harga price market
		if (parseInt(this.price) > parseInt(price_est)){
			price_est = this.price;
		}
		
		var obj = {
			"login_blok": g.login_blok,
			"sell_name":this.kode,
			"sell_amount":document.getElementById("sell_amount").value,
			"sell_price":price_est
		}
		
		loadDoc(myServer+"crypto/sell_create_one.php",this.serverMessage, obj); 
		
	},
	
}

// market refreash page setiap 5 detik
var myVar = setInterval(jsMarket.loadMarket, 5000);

function formatSerebuan(num) {
  return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
}
