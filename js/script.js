'use strict';

/**
 * Model定義 【設定ファイル】
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
 * Model定義 【作品一覧】
 */
const modelWorklist = Backbone.Model.extend({

	// インスタンス生成時に設定するデフォルト値を定義
	defaults: {
		"id": 0,
		"title": "",
		"subTitle": "",
		"url": ""
	}

});

/**
 * Collection定義
 */
const collectionDefine = Backbone.Collection.extend();

/**
 * View定義 【設定ファイル】
 */
const viewSetting = Backbone.View.extend({

	// DOMエレメントを指定
//	el: '#id-workList',
	el: '#element-id',

	// テンプレートをコンパイルする
//	compileTempHeadMenu: _.template($('#temp_headMenu').html()),
	compileTempHeadMenu: _.template(_render("headMenu")),

	initialize: function () {

		this.render();

		const events = {
            'click #id-siteName'		: '_onHomeBtn',			// ヘッダ [サイト名]
            'click #id-menuHomeBtn'		: '_onHomeBtn',			// ヘッダ [Home]
			'click #id-menuWorkListBtn'	: '_onWorkListBtn',		// ヘッダ [作品一覧]
			'click #id-blogBtn'			: '_onblogBtn',			// ヘッダ [ブログ]
			'click #id-enquiryBtn'		: '_onenquiryBtn',		// ヘッダ [お問い合わせ]
			'click #sidbarToggle'		: '_onSidbarToggle',	// ヘッダ [Ξ]
			'click #id-side-sub'		: '_onSideSub',			// サイド [作品一覧]
			'click #id-side-nav a'		: '_onSidbarToggle',	// サイド <a>
			'click #id-workList a'		: '_onWorkBtn',			// ヘッダ [作品一覧] <a>
			'click #id-sub a'			: '_onWorkBtn',			// サイド [作品一覧] <a>
			'click #id-slider img'		: '_onWorkBtn',			// PICK UP 画像 クリック
			'click #id-slider a'		: '_onWorkBtn',			// PICK UP タイトル クリック
			'click #id-goTop'			: '_onTopBtn'			// [Λ]
        };
        this.delegateEvents(events);
	},

	/**
	 * render
	 */
	render: function () {

		// 作品一覧配置
		this.collection.each(function (model, index) {

//			$(this.el).append(this.compileTempHeadMenu(model.toJSON()));
			$("#id-workList").append(this.compileTempHeadMenu(model.toJSON()));
			$("#id-sub").append(this.compileTempHeadMenu(model.toJSON()));

		}, this);

	},

	/**
	 * ページ内リンク移動
	 * @param jumpTarget リンク先id
	 */
	linkInThePageMove: function(jumpTarget){
		$("html,body").animate({scrollTop:$(jumpTarget).offset().top}, 500, 'swing');
	},

	/**
	 * ページ内リンク
	 * @param jumpTarget リンク先id
	 */
	linkInThePage: function(jumpTarget){

		let NowUrl = window.location.href;
		let _fileName = NowUrl.match(".+/(.+?)\.[a-z]+([\?#;].*)?$")[1];

		if (_fileName === "index" ) {
			this.linkInThePageMove(jumpTarget);
		} else {
			localStorage.setItem('homeTransition', jumpTarget);
			window.location.href = localStorage.getItem('homeUrl');
		}

	},

	/**
	 * [Home]ボタンクリック
	 * @param ev
	 */
	_onHomeBtn: function(ev){

		let NowUrl = window.location.href;
		let _fileName = NowUrl.match(".+/(.+?)\.[a-z]+([\?#;].*)?$")[1];

		if (_fileName === "index" ) {
			this.linkInThePageMove('#element-id');
		} else {
			window.location.href = localStorage.getItem('homeUrl');
		}
	},

	/**
	 * [Top]ボタンクリック
	 * @param ev
	 */
	_onTopBtn: function(ev){
		this.linkInThePageMove('#element-id');
	},

	/**
	 * [作品一覧]ボタンクリック
	 * @param ev
	 */
	_onWorkListBtn: function(ev){
		this.linkInThePage('#id-work-list-title');
	},

	/**
	 * [ブログ]ボタンクリック
	 * @param ev
	 */
	_onblogBtn: function(ev){
		this.linkInThePage('#id-blog');
	},

	/**
	 * [お問い合わせ]ボタンクリック
	 * @param ev
	 */
	_onenquiryBtn: function(ev){
		this.linkInThePage('#id-enquiry');
	},

	/**
	 * [Ξ]ボタンクリック
	 * @param ev
	 */
	_onSidbarToggle: function(ev){

		let exclusion = ev["target"]["id"];

		// 作品一覧は除外
		if ( exclusion !== 'id-side-sub' ) {

			// 作品一覧のアイコンも除外
			if ( exclusion !== 'id-sub-toggle' ) {

				// アイコン変更
				if ( $("#id-side-nav").attr('aria-expanded') === "true" ) {
					// [×] → [Ξ]
					$('#sidbarToggle span').removeClass('fa-times');
					$('#sidbarToggle span').addClass('fa-bars');
					$("#id-side-nav").collapse('hide');
				} else {
					// [Ξ] → [×]
					$('#sidbarToggle span').removeClass('fa-bars');
					$('#sidbarToggle span').addClass('fa-times');
				}
			}
		}
	},


	/**
	 * [作品一覧]ボタンクリック
	 * @param ev
	 */
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

	/**
	 * 作品遷移ボタンクリック
	 * @param ev
	 */
	_onWorkBtn: function(ev){
		let _target = ev["target"];
		let _id =  $(_target).attr("id");
		window.location.href = $(_target).data("url") + "?id=" + _id;
	}

});

/**
 * View定義 【設定ファイル - PICK UP】
 */
const viewPickup = Backbone.View.extend({

	// DOMエレメントを指定
	el: '#id-slider',

	// テンプレートをコンパイルする
	compileTempPickup: _.template(_render("pickup")),

	initialize: function () {
		this.render();
	},

	/**
	 * render
	 */
	render: function () {

		// PICK UP配置
		this.collection.each(function (model, index) {

			// PICK UP 表示
			if(model["attributes"]["pickUpUrl"]){	// PICK UPアドレスが空白はスルー
				$(this.el).append(this.compileTempPickup(model.toJSON()));
			}

		}, this);

		// PICK UP配置 完了後 スライダー初期設定
		this.iniSlider();

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

	}

});

/**
 * View定義 【作品一覧】
 */
const viewWorklist = Backbone.View.extend({

	el: '#id-works',

	// テンプレートをコンパイルする
	compileTempworkList: _.template(_render("workList")),

	initialize: function () {
		this.render();
	},

	/**
	 * render
	 */
	render: function () {

		this.collection.each(function (model, index) {
			// 作品一覧
			$(this.el).append(this.compileTempworkList(model.toJSON()));
		}, this);

	},

});

/**
 * localStorageに保存
 */
const setLocalStorage = function(_list){
	localStorage.setItem('setting', JSON.stringify(_list));
};

let collectionInstanceSetting;

/**
 * Collectionインスタンス生成 【設定ファイル】
 */
const createInstanceSetting = function(_json){

	// Collectionインスタンス生成
	collectionInstanceSetting = new collectionDefine();

	$.each(_json, function(index, element) {
		collectionInstanceSetting.add(new Backbone.Model(element));
	});

};

/**
 * 【設定ファイル】読み込み
 */
const loadSetting = function(){

	let defer = $.Deferred();

	let _data;

	$.when(
		// 設定ファイル 読み込み
		$.getJSON('../data/setting.json')
	)
	.done(function(json){
		// 成功

		// .json
		_data = json;

	})
	.fail(function(){
		// 失敗

		// 配列
		_data = seting;

	})
	.always(function(){
		// 必ず実行

		$.when(
			// Collectionインスタンス生成 【設定ファイル】
			createInstanceSetting(_data)
		)
		.done(function(){
			// Viewインスタンス生成 【設定ファイル】
			const viewInstanceSetting = new viewSetting({
				// Collectionを渡す
				collection:collectionInstanceSetting
			});

			// Homeのみ
			if ( window.location.href.indexOf('home/index.html') != -1 ) {

				// Viewインスタンス生成 【PICK UP配置】
				const viewInstancePickup = new viewPickup({
					// Collectionを渡す
					collection:collectionInstanceSetting
				});

			// localStorageに保存
			setLocalStorage(collectionInstanceSetting);
		}
	})
		return defer.promise();

	});

};

/**
 * 【作品一覧ファイル】読み込み
 */
const loadWorklist = function(){

	// 作品一覧ファイル 読み込み
	$.getJSON('../data/worklist.json')
		.done(function(json){
			// 成功

			// インスタンス生成 【作品一覧ファイル】
			createInstanceWorklist(json);

		})
		.fail(function(){
			// 失敗

			// インスタンス生成 【作品一覧ファイル】
			createInstanceWorklist(worklist);

		})
		.always(function(){
			// 必ず実行

			// Viewインスタンス生成
			const viewInstanceWorklist = new viewWorklist({
				// Collectionを渡す
				collection:collectionInstanceWorklist
			});

		});
};

let collectionInstanceWorklist;
/**
 * インスタンス生成 【作品一覧ファイル】
 */
const createInstanceWorklist = function(_json){

	// Collectionインスタンス生成
	collectionInstanceWorklist = new collectionDefine();

	$.each(_json, function(index, element) {
		collectionInstanceWorklist.add(new Backbone.Model(element));
	});

};

/**
 * テンプレートファイル読み込み
 */
var tmpl_cache;
function _render(tmpl_name) {
	if ( !tmpl_cache ) {
		tmpl_cache = {};
	}
	if ( ! tmpl_cache[tmpl_name] ) {
		let tmpl_url = '../temp/' + tmpl_name + '.html';
		let tmpl_string;
		$.ajax({
			url: tmpl_url,
			method: 'GET',
			async: false,
			dataType: "html",
			success: function(data) {
				tmpl_string = data;
			}
		});
		tmpl_cache[tmpl_name] = tmpl_string;
	}
	return tmpl_cache[tmpl_name];
};

/**
 * ヘッダ位置調整【IE対応】
 */
const moveHeadWidth = function(){

	const userAgent = window.navigator.userAgent.toLowerCase();
	if(userAgent.indexOf('msie') != -1 || userAgent.indexOf('trident') != -1) {
		const winWidth = $(window).width();
		let elementWidth = $('.class-menu-bar').width() + 30;
		$('.class-menu-bar').css('left', (winWidth - elementWidth) / 2);
	}

};

$(window).on('load resize', function(){
	moveHeadWidth();
});
