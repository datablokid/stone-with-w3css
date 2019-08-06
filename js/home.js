var jsHome={
	viewRead:function(){
		let layout='';
		layout += '<div class="w3-container w3-theme-d4 w3-round">';
		layout += '<h3>Home</h3>';
		layout += '</div>';
		layout += '<div class="w3-container w3-theme-l5">';
		layout += '<p>Resource URL:  <span class="w3-tag w3-theme-l1">'+ myServer +'</span></p>';
		layout += '<div id="msg"></div>';
		
		if (g.login_blok!=null){
			layout += '<p>User login: <span class="w3-tag w3-theme-l1">'+ g.user_name +'</span></p>';
			layout += '<p>Login blok: <span class="w3-tag w3-theme-l1">'+ g.login_blok +'</span></p>';
			layout += '<p>Full name: <span class="w3-tag w3-theme-l1">'+ g.user_fullname +'</span></p>';
		}
		layout += '</div>';
		layout += '<div class="gold"></div>';
		
		layout += '<div class="w3-container w3-theme-l5">';
		layout += '<h2>Server Information</h2>';
		layout += '<p>';		
		layout += 'Total User: <span id="total_user" class="w3-tag w3-theme-l1"> on proccess.. <span>';		
		layout += '</p>';		
		layout += '<p>';		
		layout += 'Total Blok: <span id="total_blok" class="w3-tag w3-theme-l1"> on proccess.. <span>';		
		layout += '</p>';		
		layout += '<div class="gold"></div>';
		
		layout += '<h2>Top 10 Trader</h2>';
		layout += '<div id="div_top10"> on proccess.... </div>';		

		layout += '<div class="gold"></div>';
		layout += '<h2>Game Trading Crypto Online</h2>';
		layout += '<strong>Aturan Permainan:</strong>';
		
		layout += '<p>';
		layout += '<ol type="1">';
		layout += '<li>';
		layout += 'Player baru(new user) akan mendapat source modal berupa blok sebanyak 1500 tx (transaction) atau senilai dengan 1.500.000 IDR';
		layout += '</li>';

		layout += '<li>';
		layout += 'Dengan modal blok 1500 tx, player bisa membelanjakan semua transaksi didalam aplikasi Datablok.id termasuk membuat deposito di menu <strong>Cryptocurrency/Deposit crypto</strong> hingga 3.000.000 IDR';
		layout += '</li>';
		
		layout += '<li>';
		layout += 'Dengan modal blok 1500 tx dan 3.000.000 IDR. Player bisa melakukan transaksi pembelian crypto di menu <strong>Cryptocurrency/Buy Crypto</strong> dan transaksi menjual crypto di menu <strong>Cryptocurrency/Sell Crypto </strong> dengan tujuh mata uang crypto.';
		layout += '</li>';
		
		
		//layout += '<li>';
		layout += 'Ketujuh mata uang tersebut adalah';
		layout += '<ul >';
		layout += '<li>BTC/Bitcoin</li>';
		layout += '<li>BTG/Bitcoin Gold</li>';
		layout += '<li>DOGE/Dogecoin</li>';
		layout += '<li>ETH/Ethereum</li>';
		layout += '<li>LTC/Litecoin</li>';
		layout += '<li>WAVE/WAVES</li>';
		layout += '<li>XRP/Ripple</li>';
		layout += '</ul>';
		//layout += '</li>';
		
		layout += '<li>';
		layout += 'Kurs cryptocurrency diambil realtime update setiap 5 detik dari server exchange ternama di Indonesia.&nbsp;';
		layout += 'Nilai kurs dan total digital asset bisa dilihat di menu <strong>Cryptocurrency/Market</strong>.';
		layout += '</li>';
		
		layout += '<li>';
		layout += '<strong>QUOTA BLOK</strong><br>';
		layout += 'Player/trader akan terhenti dari semua transaksi bila quota blok tx habis. Untuk itu player bisa terus cek pantau penggunaan blok di menu <strong>Setting/Blok</strong> dan informasi quota dan sisa blok tx di menu <strong>Setting/Profile</strong>.';
		layout += '</li>';

		layout += '<li>';
		layout += 'Player bisa membeli blok baru untuk menambah quota blok tx dengan harga 1.000 IDR di menu <strong>Datablok/Buy Blok</strong>.';
		layout += '</li>';
		
		layout += '</ol>';
		layout += '</p>';
		
		layout += '<p>';
		layout += 'Demikian 6 aturan permainan yang kami berikan.';
		layout += '</p>';
		
		layout += '<p>';
		layout += '<h3>VISI dan MISI</h3>';
		layout += 'Inti dari permainan trading cryptocurrency online ini adalah memperkenalkan dunia trading jual beli mata uang crypto. ';
		layout += 'Player mendapatkan informasi kurs cryptocurrency realtime dari market kemudian player bisa langsung melakukan transaksi simulasi trading jual beli berdasarkan pergerakan kurs tersebut. ';
		layout += 'Diharapkan nantinya player bisa menguasai strategi trading yang baik sehingga bisa mendapatkan profit dengan super cepat. ';
		layout += '</p>';
		
		layout += '<p>';
		layout += 'Seluruh player akan mendapatkan ranking berdasarkan banyaknya total digital asset yang dimiliki. ';
		layout += 'Ranking player bisa dilihat di menu <strong>Setting/Profile.</strong>';
		layout += '</p>';
		
		layout += '<p>';
		layout += 'Aplikasi akan secara otomatis menampilkan pergerakan 10 Top Trader yang memiliki total asset tertinggi. Bisakah Anda Menempati posisi TOP 10 TRADER???';
		layout += '</p>';
		
		layout += '<p>';
		layout += 'Bila player trading sudah sangat terlatih dalam membeli dan menjual asset digital serta sudah dilevel <strong>mahir</strong> mendapatkan <strong><i>profit</i></strong> setiap hari dari hasil trading, ';
		layout += 'maka player sudah <stong>otomatis</strong> bisa menerapkan sendiri pengalaman tradingnya didunia <span style="color:blue"><strong>DIGITAL ASSET</strong></span> dan menjadi pakar investasi.';
		layout += '</p>';
		
		
		layout += '<h2>Catatan</h2>';
		layout += '<p>';
		layout += 'Team datablok.id tidak mengambil atau mengumpulkan data pribadi seperti nomer email, handphone, dan akun sosial media atau infomasi player dalam bentuk apapun. ';
		layout += 'Game Trading cryptocurrency murni permainan online tanpa ada transaksi uang bentuk real atau uang bentuk virtual. ';
		layout += '</p>';
		
		layout += '<p>';
		layout += 'Jadi kami memastikan tidak ada pungutan uang untuk memainkan permainan ini. Semua Free dan gratis. ';
		layout += 'Game ini murni dari investor, iklan dan Donasi saja.';
		layout += '</p>';
		
		layout += '<p>';
		layout += 'Terima kasih. Selamat mencoba. Semoga berfaedah...';
		layout += '</p>';
		
		layout += '<br><br><br>';
		layout += '<p>';
		layout += '<strong>Salam Crypto!</strong>';
		layout += '</p>';
		
		layout += '<p>';
		layout += 'Budiono.<br>[Dev Datablok.id]';
		layout += '</p>';
		

		layout += '</div>';

		// footer home
		layout += '<footer class="w3-panel w3-padding-32 w3-card-4 w3-center w3-theme-l1">';
  		layout += '<p><nav>';
  		layout += '<a href="./web/index.html?user_name=budiono&topfolder=datablok&folder=DOWNLOAD" target="_blank">DOWNLOAD</a> | ';
  		layout += '<a href="./web/index.html?user_name=budiono&topfolder=datablok&folder=API" target="_blank">API</a> | ';
  		layout += '<a href="./web/index.html?user_name=budiono&topfolder=datablok&folder=ABOUT" target="_blank">ABOUT</a>';
  
		layout += '<p>Pertanyaan, kritik, saran dan diskusi,<a href="" target="_top">kontak kami</a>: </p>';
		layout += '<span><i class="fa fa-envelope" style="font-size:30px"></i> datablokid@gmail.com | </span>';
		layout += '<span><i class="fa fa-whatsapp" style="font-size:30px"></i> 0813-1704-9100 | </span>';
		layout += '<span><i class="fa fa-twitter" style="font-size:30px"></i> @datablokdotid | </span>';
		layout += '<span><i class="fa fa-github" style="font-size:30px"></i> www.github.com/datablokid</span>';

		layout += '<span class="w3-lobster font-effect-brick-sign">';
		layout += '<p  class="w3-xlarge w3-center">Datablok.id &copy;2019</p>';
		layout += '</span>';

  		layout += '</nav></p>';
		layout += '</footer>';

		document.getElementById('viewMid').innerHTML = layout;
	}
}
