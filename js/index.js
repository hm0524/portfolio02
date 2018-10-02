
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
consol.log(this);
		this.render();
	},

	/**
	 * render
	 */
	render: function () {

		const that = this;

		// メニュー配置
		$('#id_menu').load('temp_menu.html', function() {

			// 配置が完了後、作品一覧配置
			that.collection.each(function (model, index) {
console.log(model);
				// ヘッダメニューの作品一覧
				$("#id-workList").append("<li><a id=" + model["attributes"]["id"] +" href='#'>" + model["attributes"]["menuTitle"] + "</a></li>");

				// サイドメニューの作品一覧
				$("#id-sub").append("<li class='class-side-nav-text'><a id=" + model["attributes"]["id"] +" href='#'>" + model["attributes"]["menuTitle"] + "</a></li>");

			}, this);
			return this;

		});



	}
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
//			const myViewInstance = new viewSetting({
//				// Collectionを渡す
//				collection:collectionInstanceSetting
//			});
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



