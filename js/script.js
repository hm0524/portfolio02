/**
 * 作品一覧(Model)
 * @param  {Number} id
 * @param  {String} title
 * @param  {String} subtitle
 * @param  {String} url
 */
var workListModel = Backbone.Model.extend({

	// インスタンス生成時に設定するデフォルト値を定義
	defaults: {
		"id": "",
		"title": "",
		"subtitle": "",
		"url": ""
	},

});

/**
 * 作品一覧(Collection)
 */
var workListCollection = Backbone.Collection.extend({
	model: workListModel
});

var _Model = Backbone.Model.extend({
	//constructor: function() {},
	//url: '',

	defaults:{
		id: "",
		title: "",
		pickUpUrl: "",
		workUrl: "",
		comment: "",
		etc1: "",
		etc2: "",
	},

//	defaults: function() {
//		return {
//		};
//	},
	validate: function(attrs) {
	},
	initialize: function(attrs, options) {
		//this.set({cid: this.cid});
	}
});

var _View = Backbone.View.extend({

	el: '#element-id',
	//id: '',
	//tagName: '',
	//className: '',

	events: {
		'click #id-menuHomeBtn'		: '_onTopBtn',
		'click #id-menuWorkListBtn'	: '_onWorkListBtn',
		'click #id-blogBtn'			: '_onblogBtn',
		'click #id-enquiryBtn'		: '_onenquiryBtn',
		'click #sidbarToggle'		: '_onSidbarToggle',
		'click #id-side-sub'		: '_onSideSub',
		'click #id-side-nav a'		: '_onSidbarToggle',
		'click #id-workList a'		: '_onWorkBtn',			// ヘッダ 作品一覧 クリック
		'click #id-sub a'			: '_onWorkBtn',			// サイド 作品一覧 クリック
		'click #id-slider img'		: '_onWorkBtn',			// PICK UP 画像 クリック
		'click #id-slider a'		: '_onWorkBtn',			// PICK UP タイトル クリック
		'click #id-goTop'			: '_onTopBtn'
	},

	//template: _.template($('').html()),

	/**
	 * csv読み込み
	 */
	readCsvData: function(){

		var that = this;

		$.get('setting.csv',function(data){

			// 設定ファイルのリスト化
			settingFile._list = $.csv()(data);

// -- ▼▼▼▼▼ model set ▼▼▼▼▼
			that.model.set($.csv()(data));
			console.table(that.model.changed);
			var xxx = that.model.get(2);
			console.log(xxx[1]);
// -- ▲▲▲▲▲ model set ▲▲▲▲▲

			// メニュー配置
			$('#id_menu').load('temp_menu.html', function() {

				// 配置が終わったら作品一覧配置
				that.viewWorkList();
			});

			// トップ配置
			$('#id_main').load('temp_top.html', function() {

				// 配置が終わったらPICK UP配置
				that.viewPickup();

				// 配置が終わったらフッタ配置
				$('#id_footer').load('temp_footer.html');

			});

		})

	},

	/**
	 * 作品一覧
	 */
	viewWorkList: function(){

		// 設定ファイル
		var csvList = settingFile._list;

		// ヘッダメニューの作品一覧
		$(csvList).each(function(i){
			if (i > 1) {
				$("#id-workList").append("<li><a id=" + this[ 0 ] +" href='#'>" + this[ 1 ] + "</a></li>");
			}
		})

		// サイドメニューの作品一覧
		$(csvList).each(function(i){
			if (i > 1) {
				$("#id-sub").append("<li class='class-side-nav-text'><a id=" + this[ 0 ] +" href='#'>" + this[ 1 ] + "</a></li>");
			}
		})

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
	viewPickup: function(){

		var that = this;

		// 設定ファイル
		var csvList = settingFile._list;

		// PICK UP
		var _code;
		$(csvList).each(function(i){

			// データはリストの2行目から
			if (i > 1) {

				// PICK UPアドレスが空白はスルー
				if(this[ 2 ]){
					_code = $("<div><figure class='pick-up-title'><img id=" + this[ 0 ] +" data-lazy=" + this[ 2 ] + "><figcaption><h2>" + this[ 4 ] + "</h2><p>" + this[ 5 ] + "</p></figcaption><a id=" + this[ 0 ] +"></a></figure></div>");
					$("#id-slider").append(_code);
				}

				// 最後までappendできたか確認
				if((csvList.length -1) == i) {

					_code.ready(function() {

						// 最後までappendできたらスライダー初期設定
						that.iniSlider();

					});
				}
			}
		})
	},

	render: function() {
		return this;
	},

	_onSidbarToggle: function(ev){

		var exclusion = ev.target.id

		// 作品一覧は除外
		if ( exclusion !== 'id-side-sub' ) {

			// 作品一覧のアイコンも除外
			if ( exclusion !== 'id-sub-toggle' ) {

				// アイコン変更
				if ( $("#id-side-nav").attr('aria-expanded') === "true" ) {
					// [×] → [三]
					$('#sidbarToggle span').removeClass('fa-times');
					$('#sidbarToggle span').addClass('fa-bars');
					$("#id-side-nav").collapse('hide');
				} else {
					// [三] → [×]
					$('#sidbarToggle span').removeClass('fa-bars');
					$('#sidbarToggle span').addClass('fa-times');
				}
			}
		}
	},

	/**
	 * 作品ボタンクリック
	 * @param ev
	 */
	_onWorkBtn: function(ev){

		alert('作品クリック id:' + ev.currentTarget.id);
		console.log(ev);

	},

	/**
	 * ページ内リンク
	 * @param jumpTarget リンク先id
	 */
	linkInThePage: function(jumpTarget){

		$("html,body").animate({scrollTop:$(jumpTarget).offset().top}, 500, 'swing');
	},

	/**
	 * Topボタンクリック
	 * @param ev
	 */
	_onTopBtn: function(ev){

		this.linkInThePage('#element-id');

	},

	/**
	 * 作品一覧ボタンクリック
	 * @param ev
	 */
	_onWorkListBtn: function(ev){

		this.linkInThePage('#id-work-list');

	},

	/**
	 * ブログボタンクリック
	 * @param ev
	 */
	_onblogBtn: function(ev){

		this.linkInThePage('#id-blog');

	},

	/**
	 * お問い合わせボタンクリック
	 * @param ev
	 */
	_onenquiryBtn: function(ev){

		this.linkInThePage('#id-enquiry');

	},

	_onSideSub: function(ev){

		// アイコン変更
		if ( $("#id-sub").attr('aria-expanded') === "true" ) {
			// [↓] → [→]
			$('#id-sub-toggle').removeClass('fa-chevron-down');
			$('#id-sub-toggle').addClass('fa-chevron-right');
		} else {
			// [→] → [↓]
			$('#id-sub-toggle').removeClass('fa-chevron-right');
			$('#id-sub-toggle').addClass('fa-chevron-down');
		}

	},

	initialize: function(options) {
		this.options = options;

		// csv読み込み
		this.readCsvData();

	},
});

/**
 * 設定ファイルのリスト set/get
 */
settingFile = function() {
	var _rtn;
	return {
		get _list() {
			return _rtn;
		},
		set _list(val) {
			_rtn = val;
		}
	}
};

/**
 * PICK UPの高さ set/get
 */
pickUpArea = function(){

	var _rtn;

	return {
		get _height() {
			return _rtn;
		},
		set _height(val) {
			_rtn = val;
		}
	}
};

/**
 * 作品一覧 縦位置調整
 */
workListPaddingTop = function(xxx){

	// 大きい方をset
	pickUpArea._height = $('.class-pick-up').height();

	var _pickUpHeight = pickUpArea._height;

	$('.class-work-list').css('padding-top', pickUpArea._height);

};




/**
 * ウインドウリサイズ完了(一応)処理
 */
(function () {
	var timer = 0;

	window.onresize = function () {
		if (timer > 0) {
			clearTimeout(timer);
		}

		timer = setTimeout(function () {

			// サイドメニューが開いていたら閉じる
			$('#sidbarToggle span').removeClass('fa-times');
			$('#sidbarToggle span').addClass('fa-bars');
			$("#id-side-nav").collapse('hide');

			// 作品一覧 縦位置調整
			workListPaddingTop();

		}, 200);
	};

}());

(function () {

	var _workListCollection

	/**
	 * CSVデータをJSON形式に変換
	 * @param  {Object} csvArray
	 * @return {Object} jsonArray
	 */
	function csv2json(csvArray){
		var jsonArray = [];

		// 1行目から「項目名」の配列を生成する
		var items = csvArray[0].split(',');

		// CSVデータの配列の各行をループ処理する
		//// 配列の先頭要素(行)は項目名のため処理対象外
		//// 配列の最終要素(行)は空のため処理対象外
		for (var i = 1; i < csvArray.length - 1; i++) {
			var a_line = new Object();
			// カンマで区切られた各データに分割する
			var csvArrayD = csvArray[i].split(',');
			//// 各データをループ処理する
			for (var j = 0; j < items.length; j++) {
				// 要素名：items[j]
				// データ：csvArrayD[j]
				a_line[items[j]] = csvArrayD[j];
			}
			jsonArray.push(a_line);
		}
		//console.debug(jsonArray);
		return jsonArray;
	}

	/**
	 * csvファイル読み込み
	 * @param  {String} _fileName 読み込むファイル名
	 */
	readCsvData = function(_fileName){

		$.get(_fileName,function(data){

			var d = data.split('\n'); // 1行ごとに分割する
			var jsonArray = csv2json(d); // JSON形式に変換

			_workListCollection = new workListCollection([jsonArray]);

			console.log("objs: " + JSON.stringify(_workListCollection));

		})

	};

	readCsvData('worklist.csv');

//	var objs = new Backbone.Collection([jsonWorklist]);
//	console.log("objs: " + JSON.stringify(objs));

	var _M = new _Model();
	var _V = new _View({model:_M});

	// View インスタンス生成
//	var _V = new _View();

	_V.render();

	return _V;

}());



