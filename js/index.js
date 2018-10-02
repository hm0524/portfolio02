
/**
 * Model定義
 */
const modelSetting = Backbone.Model.extend({

	// インスタンス生成時に設定するデフォルト値を定義
	defaults: {
		"id": 0,
		"menuTitle": "",
		"pickUpUrl": "",
		"workUrl": "",
		"pickUpTitle": "",
		"caption": "",
		"comment": ""
	}

});

/**
 * Collection定義
 */
const collectionDefine = Backbone.Collection.extend();

/**
 * View定義
 */
const viewSetting = Backbone.View.extend({

	// DOMエレメントを指定
//	el_workList: $('#id-workList'),

	events: {
		'click #id-menuHomeBtn'		: '',
	},
	
	// テンプレートをコンパイルする
//	compileTempWorkList: _.template($('#id-tempWorkList').html()),

	initialize: function () {
		this.render();
	},

	/**
	 * render
	 */
	render: function () {

		const that = this;

		// メニュー配置
		$('#id_menu').load('temp_menu.html', function() {

			// メニュー配置完了後、作品一覧配置
			that.collection.each(function (model, index) {

				// 作品一覧 表示
				that.viewWorkList(model);

			}, this);

		});
		
		// トップ配置
		$('#id_main').load('temp_top.html', function() {

			// トップ配置 完了後 PICK UP配置
			that.collection.each(function (model, index) {

				// PICK UP 表示
				that.viewPickup(model);

			}, this);

			// PICK UP配置 完了後 スライダー初期設定
			that.iniSlider();

			// 配置が終わったらフッタ配置
			$('#id_footer').load('temp_footer.html');

		});

	},

	/**
	 * 作品一覧 表示
	 */
	viewWorkList: function(_model){

		// ヘッダメニューの作品一覧
		$("#id-workList").append("<li><a id=" + _model["attributes"]["id"] +" href='#'>" + _model["attributes"]["menuTitle"] + "</a></li>");

		// サイドメニューの作品一覧
		$("#id-sub").append("<li class='class-side-nav-text'><a id=" + _model["attributes"]["id"] +" href='#'>" + _model["attributes"]["menuTitle"] + "</a></li>");

	},
	
	/**
	 * スライダー初期設定
	 */
	iniSlider: function(){

		// 画像がlazyLoadされる度に呼ばれるイベント
		$('.class-slider').on('lazyLoaded', function(event, slick, image, imageSource){

			// 作品一覧 縦位置調整
			workListPaddingTop(image[0].height);

		});

		$('.class-slider').slick({
			accessibility: false,	// 矢印キーでスライドを切り替える
			adaptiveHeight: false,	// スライドの高さが違うときに自動調整する
			autoplay: true,			// 自動再生する
			slidesToShow: 4,		// 表示させるスライド数
			arrows: false,			// 前次ボタンを表示するか
			autoplaySpeed: 1000,	// 自動再生で切り替えする時間(ミリ秒) [初期値:3000]
			responsive: [{
				breakpoint: 992,
					settings: {
						slidesToShow: 2,	// 表示させるスライド数
					}
			},{
				breakpoint: 768,
					settings: {
						slidesToShow: 1,	// 表示させるスライド数
					}
			}]
		});

	},

	/**
	 * PICK UP配置
	 */
	viewPickup: function(_model){

		let _code;
		
		// PICK UPアドレスが空白はスルー
		if(_model["attributes"]["pickUpUrl"]){
//			_code = $("<div><figure class='pick-up-title'><img id=" + _model["attributes"]["id"] +" data-lazy=" + _model["attributes"]["pickUpUrl"] + "><figcaption><h2>" + _model["attributes"]["pickUpTitle"] + "</h2><p>" + _model["attributes"]["caption"] + "</p></figcaption><a id=" + _model["attributes"]["id"] +"></a></figure></div>");
			_code = $("<div><figure class='pick-up-title'><img id=" + _model["attributes"]["id"] +" src=" + _model["attributes"]["pickUpUrl"] + "><figcaption><h2>" + _model["attributes"]["pickUpTitle"] + "</h2><p>" + _model["attributes"]["caption"] + "</p></figcaption><a id=" + _model["attributes"]["id"] +"></a></figure></div>");
			$("#id-slider").append(_code);
		}

	},




});

(function () {
	
	let collectionInstanceSetting;
	
	/**
	 * Collectionインスタンス生成
	 */
	const createCollectionInstance = function(_json){

		let tmpList = [];
		$.each(_json, function(index, element) {
    		tmpList.push(new modelSetting(element));
		});

		// Collectionインスタンス生成
		collectionInstanceSetting = new collectionDefine([]);

		$.each(tmpList, function(index, element) {
    		collectionInstanceSetting.add(new Backbone.Model(element.attributes));
		});
	
	};
	
	// 設定ファイル 読み込み
	$.getJSON('data/setting.json')
		.done(function(json){
			// 成功
			
			// Collectionインスタンス生成
			createCollectionInstance(json);

		})
		.fail(function(){
			// 失敗
			
			// Collectionインスタンス生成
			createCollectionInstance(seting);
			
		})
		.always(function(){
			// 必ず実行
			
//console.log(JSON.stringify(collectionInstanceSetting.where({ id: 3 })));
console.log(JSON.stringify(collectionInstanceSetting.models[0]));
			// Viewインスタンス生成
			const myViewInstance = new viewSetting({
				// Collectionを渡す
				collection:collectionInstanceSetting
			});
		});
		
//	console.log(JSON.stringify(collectionInstanceSetting));
//console.log(JSON.stringify(collectionInstanceSetting.where({ id: 3 })));
	
	// 
	$.getJSON('data/worklist.json')
		.done(function(json){
			// 成功

		})
		.fail(function(){
			// 失敗

		})
		.always(function(){
			// 必ず実行
			
		});
}());



