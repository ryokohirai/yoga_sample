/**
*	jQuery Client List
*	@ version: 1.0
*	@ date:	2014-03-05
*	@ author: hirai
*/

var prints = [];	// 印刷チェック状態を保存

// 印刷チェックボックスにチェック状態を反映
function setCheck(){
	for(var i in prints){
		$('[name="print"]').each(function(){
			if($(this).val() === i) {
				$(this).prop('checked', prints[i]);
			}
		});
	}			
} 

// 印刷チェックボックスのチェック状態を取得
function getCheck(elem){
	var i = $(elem).val();
	prints[i] = $(elem).prop('checked');
}

$(function(){
	var clients = [
		{ id:"1", name:"テスト患者１", age:"35", sex:"M", dob:"1976/12/19", address:"東京都中央区" },
		{ id:"2", name:"テスト患者２", age:"48", sex:"F", dob:"1965/4/20", address:"東京都新宿区" },
		{ id:"3", name:"abcd efgh", age:"23", sex:"F", dob:"1991/8/2", address:"東京都港区" },
		{ id:"4", name:"テスト患者４", age:"15", sex:"M", dob:"2000/2/12", address:"東京都港区" },
		{ id:"5", name:"テスト患者５", age:"60", sex:"M", dob:"1940/12/29", address:"神奈川県" },
		{ id:"6", name:"テスト患者６", age:"38", sex:"F", dob:"1979/9/21", address:"埼玉県" },
		{ id:"7", name:"テスト患者７", age:"18", sex:"F", dob:"1997/10/30", address:"千葉県千葉市" },
		{ id:"8", name:"テスト患者８", age:"30", sex:"M", dob:"1984/1/5", address:"東京都多摩市" },
		{ id:"9", name:"テスト患者９", age:"56", sex:"F", dob:"1944/6/17", address:"神奈川県横浜市" },
		{ id:"10", name:"テスト患者１０", age:"50", sex:"M", dob:"1948/3/10", address:"茨城県" },
		{ id:"11", name:"テスト患者１１", age:"37", sex:"F", dob:"1974/8/26", address:"東京都杉並区" },
		{ id:"12", name:"テスト患者１２", age:"42", sex:"F", dob:"1970/10/1", address:"千葉県市川市" },
	];

	// jqGridを表示		
	jQuery("#list").jqGrid({
		data: clients,							// データ配列
		datatype: "local",					// ローカルのデータ
//		datatype: "json",
//		url: "clients_sample.json",
//		jsonReader: {
//			repeattimes: false,
//			id: "id"
//		},
		colNames: ['ID', 'Name', 'Age', 'Sex', 'D.O.B', 'Address', 'Print',],		// グリッドの列名
		colModel: [																					// グリッドの列定義とデータ配列の関連付け
			{index: 'id', name: 'id', key:true, sorttype: 'int'},
			{index: 'name', name: 'name'},
			{index: 'age', name: 'age'},
			{index: 'sex', name: 'sex'},
			{index: 'dob', name: 'dob'},
			{index: 'address', name: 'address'},
			{index: 'print', name:'print', align: 'center', classes:"print_check",
			formatter: function(cellvalue, options, rowobject){
				return '<input type="checkbox" name="print" value="' + options.rowId + '">'; }},
		],
		height: 'auto',
		width: 'auto',
		sortname: 'id',
		sortorder: "ASC",
		cellEdit: false,
		multiselect: false,			// false: 行の複数選択
		pager: '#pager',				// ページャのID
		rowNum: 10,
		rowList: [10,20,30],
		viewrecords: true,
		gridview: true,
		caption: 'Client List',			// グリッドのタイトル
		loadComplete: function() {	// gridロード完了後
			setCheck();						// チェック状態を反映する
		}
	});	
	// グリッドとページャの関連付け
	jQuery("#list").jqGrid('navGrid', "#pager", { add:false, edit:false, search:false, refresh:false, del:false })
	// 「追加」ボタンを追加
	.navButtonAdd("#pager", {
		caption: "Add",
		buttonicon: 'ui-icon-plus',
		onClickButton: function() {
			alert("患者を新規登録します。");
		}
	})
	// 「編集」ボタンを追加
	.navButtonAdd("#pager", {
		caption:"Edit",
		buttonicon:'ui-icon-pencil',
		onClickButton:function(){
			var rowid = jQuery("#list").jqGrid('getGridParam', 'selrow');
			if(rowid){
				var row = jQuery("#list").getRowData(rowid); 
				alert("ID: " + row.id + "を編集します。");
			} else {
				alert("編集するデータを選択して下さい");
			}
		}
	})
	// 「印刷」ボタンを追加
	.navButtonAdd("#pager", {
		caption:"Print",
		buttonicon:'ui-icon-print',
		onClickButton:function(){
			if(prints != null){
				var mes = '印刷します。ID: ';
				for(var i in prints){
					if(prints[i] == true)
						mes += String(i) + ",";
				}
				mes = mes.slice(0, -1);
				alert(mes);
			} else {
				alert("印刷するデータを選択して下さい");
			}
		}
	});
	// チェックボックスの状態を取得
	$(document).on('click', '[name="print"]', function(){
		getCheck(this);
	});	
});