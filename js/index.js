
(function () {

	// メニュー配置
	$('#id_menu').load('temp_menu.html', function() {

		$.when(
//		var promise = $.when(
		
			// 【設定ファイル】読み込み
			loadSetting()
//			let promise = loadSetting();
//		);
//		promise.done(function() {
		).done(function(){
		
			// トップ配置
			$('#id_main').load('temp_top.html', function() {


		// Collectionインスタンス生成 【設定ファイル】
//		createInstanceSetting(_data)

		// Viewインスタンス生成
//		const viewInstanceSetting = new viewSetting({
//			// Collectionを渡す
//			collection:collectionInstanceSetting
//		});









				// IE対応
				moveHeadWidth();

//				// Viewインスタンス生成 【PICK UP配置】
//				const viewInstancePickup = new viewPickup({
//					// Collectionを渡す
//					collection:collectionInstanceSetting
//				});
			
				// 【作品一覧ファイル】読み込み 作品一覧 配置
				loadWorklist();

				// フッタ 配置
				$('#id_footer').load('temp_footer.html');

			});
		});
	});

}());



