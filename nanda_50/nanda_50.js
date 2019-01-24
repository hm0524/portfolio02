
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

			let setHtml = 		'<section class="post-21572 post type-post status-publish format-standard has-post-thumbnail hentry category-gif_manga category-nanda_gakuen category-creator category-1225 tag-gif tag-nanda_gakuen tag-15 tag-10 tag-28 tag-35 tag-1225" data-title="【第56難】奴らに気をつけろ[いざゆけ!難田学園中等部/GIF漫画/神盾双月]" data-link="http://cre-m.jp/gif_manga_nanda_56/">';
			setHtml = setHtml + '<h4 class="entry-title">【第50難】熱き記憶[いざゆけ!難田学園中等部/GIF漫画/神盾双月]</h4>';
			setHtml = setHtml + '<p class="imgCenter"><img src="http://static.cre-m.jp/wp-content/uploads/2016/07/coma012.gif" data-src="http://static.cre-m.jp/wp-content/uploads/2016/07/coma012.gif" alt="coma01" class="lazyload"></p>';
			setHtml = setHtml + '<p class="imgCenter"><img src="http://static.cre-m.jp/wp-content/uploads/2016/07/coma022.gif" data-src="http://static.cre-m.jp/wp-content/uploads/2016/07/coma022.gif" alt="coma02" class="lazyload"></p>';
			setHtml = setHtml + '<p class="imgCenter"><img src="http://static.cre-m.jp/wp-content/uploads/2016/07/coma032.gif" data-src="http://static.cre-m.jp/wp-content/uploads/2016/07/coma032.gif" alt="coma03" class="lazyload"></p>';
			setHtml = setHtml + '<p class="imgCenter"><img src="http://static.cre-m.jp/wp-content/uploads/2016/07/coma042.gif" data-src="http://static.cre-m.jp/wp-content/uploads/2016/07/coma042.gif" alt="coma04" class="lazyload"></p>';
			setHtml = setHtml + '<p class="imgCenter"><img src="http://static.cre-m.jp/wp-content/uploads/2016/07/coma052.gif" data-src="http://static.cre-m.jp/wp-content/uploads/2016/07/coma052.gif" alt="coma05" class="lazyload"></p>';
			setHtml = setHtml + '<p class="imgCenter"><img src="http://static.cre-m.jp/wp-content/uploads/2016/07/coma062.gif" data-src="http://static.cre-m.jp/wp-content/uploads/2016/07/coma062.gif" alt="coma06" class="lazyload"></p>';
			setHtml = setHtml + '<p>次回へ続きます。[神盾双月/GIFマンガ]</p>';
			setHtml = setHtml + '<p><a title="【第1話】いざゆけ!難田学園中等部[GIF漫画/神盾双月]" href="http://cre-m.jp/gif_manga_nanda_01/"><img class="lazy alignnone size-full wp-image-1131 data-lazy-ready" src="http://sinkr.main.jp/creators_magazine/wp-content/uploads/2015/02/to_1_button.png" data-lazy-type="image" data-lazy-src="http://sinkr.main.jp/creators_magazine/wp-content/uploads/2015/02/to_1_button.png" alt="第1回へ" width="150" height="44" style="display: block;"><noscript><img class="alignnone size-full wp-image-1131" src="http://sinkr.main.jp/creators_magazine/wp-content/uploads/2015/02/to_1_button.png" alt="第1回へ" width="150" height="44" /></noscript></a><br>';
			setHtml = setHtml + '<a title="全エピソードへ" href="http://cre-m.jp/category/gif_manga/nanda_gakuen/"><img class="lazy alignnone size-full wp-image-1230 data-lazy-ready" src="http://sinkr.main.jp/creators_magazine/wp-content/uploads/2015/02/episode_all.png" data-lazy-type="image" data-lazy-src="http://sinkr.main.jp/creators_magazine/wp-content/uploads/2015/02/episode_all.png" alt="エピソード一覧へ" width="150" height="44" style="display: block;"><noscript><img class="alignnone size-full wp-image-1230" src="http://sinkr.main.jp/creators_magazine/wp-content/uploads/2015/02/episode_all.png" alt="エピソード一覧へ" width="150" height="44" /></noscript></a></p>';
			setHtml = setHtml + '<h4>クリエイター：神盾双月</h4>';
			setHtml = setHtml + '<p><img src="http://static.cre-m.jp/wp-content/uploads/2015/05/nanda_icon.jpg" data-lazy-type="image" data-lazy-src="http://static.cre-m.jp/wp-content/uploads/2015/05/nanda_icon.jpg" alt="nanda_icon" width="100px" class="lazy alignnone size-full wp-image-6831 data-lazy-ready" style="display: block;"><noscript><img src="http://static.cre-m.jp/wp-content/uploads/2015/05/nanda_icon.jpg" alt="nanda_icon" width="100px" class="alignnone size-full wp-image-6831" /></noscript><br>池袋を拠点とするIT企業の中で、イラスト・WEBデザイン、Gifアニメ、Flashアニメ制作など色んなことしてます。<br>ライフワークはカラオケとサバゲです。</p>';
			setHtml = setHtml + '</section>';
			$("#id_main").prepend(setHtml);

			// IE対応
			moveHeadWidth();

			// フッタ 配置
			$('#id_footer').load('../temp_footer.html');

		});
	});

}());



