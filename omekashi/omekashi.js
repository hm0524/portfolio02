
let listId;

(function () {

	// ID取得
	let urlData = location.search;
	listId = urlData.split('=')[1] -1;

	// localStorage(全体)取得
	let _localStorage = localStorage.getItem('setting');
	_localStorage = JSON.parse(_localStorage);
	
	// 
	console.log(_localStorage[listId]);

	// メニュー配置
	$('#id_menu').load('../temp_menu.html', function() {
	
		$.when(

			// 【設定ファイル】読み込み
			loadSetting()

		).done(function(){

			let setHtml = 		'<h4 class="entry-title">おめかしスタイル</h4>';
			setHtml = setHtml + '<p class="imgCenter"><img src="../img/j0006.jpg" data-src="../img/j0006.jpg" class="lazyload"></p>';
			$("#id_main").prepend(setHtml);

			// IE対応
			moveHeadWidth();

			// フッタ 配置
			$('#id_footer').load('../temp_footer.html');

		});
	});

}());

