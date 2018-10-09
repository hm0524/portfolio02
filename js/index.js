
(function () {

	// メニュー配置
	$('#id_menu').load('temp_menu.html', function() {

		$.when(
		
			// 【設定ファイル】読み込み
			loadSetting()
			
		).done(function(){
		
			// トップ配置
			$('#id_main').load('temp_top.html', function() {
			
				const userAgent = window.navigator.userAgent.toLowerCase();
				if(userAgent.indexOf('msie') != -1 || userAgent.indexOf('trident') != -1) {
					alert('Internet Explorerをお使いですね');
				}

				// Viewインスタンス生成 【PICK UP配置】
				const viewInstancePickup = new viewPickup({
					// Collectionを渡す
					collection:collectionInstanceSetting
				});
			
				// 【作品一覧ファイル】読み込み 作品一覧 配置
				loadWorklist();

				// フッタ 配置
				$('#id_footer').load('temp_footer.html');

			});
		});
	});

}());



