
(function () {

	// メニュー配置
	$('#id_menu').load('temp_menu.html', function() {

		// 【設定ファイル】読み込み
		loadSetting();

		// トップ配置
		$('#id_main').load('temp_top.html', function() {

			// Viewインスタンス生成 【PICK UP配置】
			const viewInstanceSetting = new viewPickup({
				// Collectionを渡す
				collection:collectionInstanceSetting
			});
			
			// 【作品一覧ファイル】読み込み 作品一覧 配置
			loadWorklist();

			// フッタ 配置
			$('#id_footer').load('temp_footer.html');

		});

	});

}());



