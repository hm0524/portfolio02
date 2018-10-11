
(function () {

	// メニュー配置
	$('#id_menu').load('temp_menu.html', function() {

		$.when(

			// 【設定ファイル】読み込み
			loadSetting()

		).done(function(){
		
			// トップ配置
			$('#id_main').load('temp_top.html', function() {

				// IE対応
				moveHeadWidth();

				// 【作品一覧ファイル】読み込み 作品一覧 配置
				loadWorklist();

				// フッタ 配置
				$('#id_footer').load('temp_footer.html');

			});
		});
	});

}());



