//=================================================================================================================
//※ 변수 지정
//=================================================================================================================
//신규 변수
var autoRunning;
var autoLooting = [,,,,,,,,,];
var autoEffect = [,,,,,,,,,];
var autoSound = [,];//[0] : sound_appear, [1] : sound_land

var dateSettingList = [0,0,0,0,0,0,0];//[최대치,1회,1번,2번,3번,4번,5번];
var dateSettingName = ["하루 피로도 총량","1회 피로도 소모","1번 비약 피로도","2번 비약 피로도","3번 비약 피로도","4번 비약 피로도","5번 비약 피로도"];//
var dateSettingDefault = [156,4,0,0,0,0,0];//[최대치,1회,1번,2번,3번,4번,5번];

var dropCount = 0;//아이템 착지 개수
var maxJogak = 1000;//필요 조각 수

var zoneList = [];//일반 장비&초대장 드랍 위치

var content_num = [0,0,0,0];//최신 내용 입력시기 기억 ([record, inventory, set, craft])
var content_text = ["","","",""];//최신 내용 기억 ([record, inventory, set, craft])

//기존 변수 변경
var right_display = "";//초기엔 우측에 아무런 창도 열지 않음

//=================================================================================================================
//※ DOM 변수에 할당 (앞에 '$'를 붙임)
//=================================================================================================================
//frame_left
var $frame_left = document.getElementById("frame_left");

var $dungeon = document.getElementById('dungeon');
var $difficulty = document.getElementById('difficulty');
var $channel = document.getElementById('channel');

var $start1 = document.getElementById("start1");
var $start2 = document.getElementById("start2");

var $objective = document.getElementById('objective');
var $objective_list = document.getElementById('objective_list');
	var $objective_none = document.getElementById('objective_none');
	var $objective_item = document.getElementById('objective_item');
		var $objective_item_first = document.getElementById('objective_item_first');
		var $objective_item_second = document.getElementById('objective_item_second');
		var $objective_item_third = document.getElementById('objective_item_third');
		var $objective_item_name = document.getElementById('objective_item_name');
	var $objective_set = document.getElementById('objective_set');
		var $objective_set_first = document.getElementById('objective_set_first');
		var $objective_set_name = document.getElementById('objective_set_name');
	var $objective_count = document.getElementById('objective_count');
		var $objective_count_text = document.getElementById('objective_count_text');
	var $objective_cost = document.getElementById('objective_cost');
		var $objective_cost_text = document.getElementById('objective_cost_text');
	var $objective_fatigue = document.getElementById('objective_fatigue');
		var $objective_fatigue_max = document.getElementById('objective_fatigue_max');
		var $objective_fatigue_per = document.getElementById('objective_fatigue_per');

var $reset = document.getElementById("reset");


//frame_top - 일반
var $frame_top = document.getElementById("frame_top");

var $notice_dungeon = document.getElementById("notice_dungeon");
var $notice_difficulty = document.getElementById("notice_difficulty");
var $notice_channel = document.getElementById("notice_channel");

var $round_count = document.getElementById("round_count");
var $round_difficulty = document.getElementById("round_difficulty");

var $date = document.getElementById("date");
	var $date_count = document.getElementById("date_count");
	var $date_summary = document.getElementById("date_summary");
		var $date_summary_num = document.getElementById("date_summary_num");
	var $date_config = document.getElementById("date_config");
	
	var $date_setting = document.getElementById("date_setting");
		var $date_setting_1 = document.getElementById("date_setting_1");
		var $date_setting_2 = document.getElementById("date_setting_2");
		var $date_setting_3 = document.getElementById("date_setting_3");
		var $date_setting_4 = document.getElementById("date_setting_4");
		var $date_setting_5 = document.getElementById("date_setting_5");
		var $date_setting_6 = document.getElementById("date_setting_6");
		var $date_setting_7 = document.getElementById("date_setting_7");
		var $date_setting_summary = document.getElementById("date_setting_summary");
		var $date_cancel = document.getElementById("date_cancel");
		var $date_apply = document.getElementById("date_apply");

var $person_helper = document.getElementById("person_helper");

var $filter_name_normal = document.getElementById("filter_name_normal");
var $filter_name_jogak = document.getElementById("filter_name_jogak");
var $filter_sound = document.getElementById("filter_sound");
	var $label_sound = document.getElementById("label_sound");


//frame_top - popup & checkbox
var $popup = document.getElementById('popup');
	var $popup_title = document.getElementById('popup_title');

var $record_filter = document.getElementById('record_filter');
	var $record_filter_first = document.getElementById('record_filter_first');
	var $record_filter_second = document.getElementById('record_filter_second');
	var $record_filter_third = document.getElementById('record_filter_third');
	var $record_filter_level = document.getElementById('record_filter_level');
	var $record_filter_clear = document.getElementById('record_filter_clear');
var $record = document.getElementById('record');

var $inventory_filter = document.getElementById('inventory_filter');
	var $inventory_filter_first = document.getElementById('inventory_filter_first');
	var $inventory_filter_second = document.getElementById('inventory_filter_second');
	var $inventory_filter_third = document.getElementById('inventory_filter_third');
	var $inventory_filter_level = document.getElementById('inventory_filter_level');
	var $inventory_filter_clear = document.getElementById('inventory_filter_clear');
var $inventory = document.getElementById('inventory');
	var $inventory_display = document.getElementById('inventory_display');
	var $inventory_table = document.getElementById('inventory_table');

var $set_filter = document.getElementById('set_filter');
	var $set_filter_first = document.getElementById('set_filter_first');
	var $set_filter_second = document.getElementById('set_filter_second');
	var $set_filter_third = document.getElementById('set_filter_third');
	var $set_filter_level = document.getElementById('set_filter_level');
	var $set_filter_clear = document.getElementById('set_filter_clear');
var $set = document.getElementById('set');
	var $set_display = document.getElementById('set_display');
	var $set_table = document.getElementById('set_table');

var $craft_filter = document.getElementById('craft_filter');
	var $craft_filter_first = document.getElementById('craft_filter_first');
	var $craft_filter_second = document.getElementById('craft_filter_second');
	var $craft_filter_third = document.getElementById('craft_filter_third');
	var $craft_filter_level = document.getElementById('craft_filter_level');
	var $craft_filter_clear = document.getElementById('craft_filter_clear');
var $craft = document.getElementById('craft');
	var $craft_display = document.getElementById('craft_display');
	var $craft_table = document.getElementById('craft_table');
	
var $checkbox = document.getElementById('checkbox');
	
var $record_check = document.getElementById('record_check');
	var $record_check_cost = document.getElementById('record_check_cost');
	var $record_check_difficulty = document.getElementById('record_check_difficulty');
	var $record_check_quantity = document.getElementById('record_check_quantity');
	var $record_check_reset = document.getElementById('record_check_reset');
var $inventory_check = document.getElementById('inventory_check');
	var $inventory_check_confirm = document.getElementById('inventory_check_confirm');
	var $inventory_check_cost = document.getElementById('inventory_check_cost');
	var $inventory_check_all = document.getElementById('inventory_check_all');
	var $inventory_check_collect = document.getElementById('inventory_check_collect');
var $set_check = document.getElementById('set_check');
	var $set_check_confirm = document.getElementById('set_check_confirm');
	var $set_check_cost = document.getElementById('set_check_cost');
	var $set_check_all = document.getElementById('set_check_all');
	var $set_check_only = document.getElementById('set_check_only');
var $craft_check = document.getElementById('craft_check');
	var $craft_check_available = document.getElementById('craft_check_available');
	var $craft_check_all = document.getElementById('craft_check_all');
	var $craft_check_max = document.getElementById('craft_check_max');

var $disassemble_1 = document.getElementById('disassemble_1');
var $disassemble_2 = document.getElementById('disassemble_2');

var $shift1 = document.getElementById('shift1');
var $shift2 = document.getElementById('shift2');
var $shift3 = document.getElementById('shift3');
var $shift4 = document.getElementById('shift4');


//frame_bottom
var $result = document.getElementById('result');
	var $result_epic_get = document.getElementById('result_epic_get');
	var $result_epic_have = document.getElementById('result_epic_have');
	var $result_soul_get = document.getElementById('result_soul_get');
	var $result_soul_have = document.getElementById('result_soul_have');
	var $result_cost_get = document.getElementById('result_cost_get');
	var $result_beed_get = document.getElementById('result_beed_get');
	
	var $result_button_epicDisassemble = document.getElementById('result_button_epicDisassemble');
	var $result_button_soulDisassemble = document.getElementById('result_button_soulDisassemble');
	var $result_check_soulAuto = document.getElementById('result_check_soulAuto');
var $cost = document.getElementById('cost');	
	var $cost_invitation = document.getElementById('cost_invitation');
	var $cost_real = document.getElementById('cost_real');
	var $cost_gold = document.getElementById('cost_gold');
	var $cost_gold_real = document.getElementById('cost_gold_real');
	var $cost_set_gold = document.getElementById('cost_set_gold');

var $style_name_normal = document.getElementById("style_name_normal");
var $style_name_jogak = document.getElementById("style_name_jogak");
//=================================================================================================================
//※ 자료
//=================================================================================================================
var fieldList = [
	"field_무기_거너_리볼버",
	"field_무기_거너_머스켓",
	"field_무기_거너_보우건",
	"field_무기_거너_자동권총",
	"field_무기_거너_핸드캐넌",
	"field_무기_격투가_건틀릿",
	"field_무기_격투가_권투글러브",
	"field_무기_격투가_너클",
	"field_무기_격투가_클로",
	"field_무기_격투가_통파",
	"field_무기_귀검사，다크나이트，나이트_광검",
	"field_무기_귀검사，다크나이트，나이트_대검",
	"field_무기_귀검사，다크나이트，나이트_도",
	"field_무기_귀검사，다크나이트，나이트_둔기",
	"field_무기_귀검사，다크나이트，나이트_소검",
	"field_무기_도적_단검",
	"field_무기_도적_쌍검",
	"field_무기_도적_완드",
	"field_무기_도적_차크라웨펀",
	"field_무기_마창사_장창",
	"field_무기_마창사_미늘창",
	"field_무기_마법사，크리에이터_로드",
	"field_무기_마법사，크리에이터_봉",
	"field_무기_마법사，크리에이터_빗자루",
	"field_무기_마법사，크리에이터_스탭",
	"field_무기_마법사，크리에이터_창",
	"field_무기_프리스트_낫",
	"field_무기_프리스트_배틀액스",
	"field_무기_프리스트_십자가",
	"field_무기_프리스트_염주",
	"field_무기_프리스트_토템",
	"field_방어구_가죽_머리어깨",
	"field_방어구_가죽_벨트",
	"field_방어구_가죽_상의",
	"field_방어구_가죽_신발",
	"field_방어구_가죽_하의",
	"field_방어구_경갑_머리어깨",
	"field_방어구_경갑_벨트",
	"field_방어구_경갑_상의",
	"field_방어구_경갑_신발",
	"field_방어구_경갑_하의",
	"field_방어구_중갑_머리어깨",
	"field_방어구_중갑_벨트",
	"field_방어구_중갑_상의",
	"field_방어구_중갑_신발",
	"field_방어구_중갑_하의",
	"field_방어구_천_머리어깨",
	"field_방어구_천_벨트",
	"field_방어구_천_상의",
	"field_방어구_천_신발",
	"field_방어구_천_하의",
	"field_방어구_판금_머리어깨",
	"field_방어구_판금_벨트",
	"field_방어구_판금_상의",
	"field_방어구_판금_신발",
	"field_방어구_판금_하의",
	"field_악세서리／특수장비_악세서리_목걸이",
	"field_악세서리／특수장비_악세서리_반지",
	"field_악세서리／특수장비_악세서리_팔찌",
	"field_악세서리／특수장비_특수장비_마법석",
	"field_악세서리／특수장비_특수장비_보조장비"
];

var helpList = [
	//시간의 문
	"루리웹 하야링님",//대화재
	"루리웹 하야링님",//전염병
	"루리웹 하야링님",//결성! 카르텔
	"루리웹 하야링님",//검은 성전
	"루리웹 하야링님",//극비구역
	"루리웹 하야링님",//옛비명굴
	"루리웹 하야링님",//태동
	"루리웹 하야링님",//자각
	//파워스테이션
	"루리웹 하야링님",//코레 발전소
	"루리웹 하야링님",//푸르츠 발전소
	"루리웹 하야링님",//트롬베 발전소
	"루리웹 Aqua3님",//그란디네 발전소
	//죽은 자의 성
	"루리웹 하야링님",//매달린 망루
	"루리웹 하야링님",//루크린제
	"루리웹 하야링님",//강철의 브라키움
	"루리웹 하야링님",//샐러맨더의 화로
	"루리웹 하야링님"//빛의 연회장
];


var startList = [
	[260,50],//[0] : 대화재
	[190,230],//[1] : 전염병
	[245,55],//[2] : 카르텔
	[265,690],//[3] : 검은성전
	[170,590],//[4] : 극비구역
	[165,355],//[5] : 옛비명굴
	[100,240],//[6] : 태동
	[150,410],//[7] : 자각
	
	[220,400],//[8] : 코레 발전소
	[180,215],//[9] : 푸르츠 발전소
	[200,405],//[10] : 트롬베 발전소
	[180,485],//[11] : 그란디네 발전소
	
	[225,290],//[12] : 매달린 망루
	[170,560],//[13] : 루크린제
	[170,500],//[14] : 강철의 브라키움
	[180,470],//[15] : 샐러맨더의 화로
	[160,485]//[16] : 빛의 연회장
];

//일반 장비 드랍 좌표 (기존 좌표 활용, y축 첫 이동 속도는 "5"로 유지)
var coopList = [
	//시간의 문
	[//[0] : 대화재
		[5, 16, 5],
		[18, 13, 5],
		[28, 16, 5],
		[35, 13, 5],
		[39, 19, 5],
		[22, 28, 5],
		[30, 25, 5],
		[36, 30, 5],
		[46, 28, 5],
		[50, 25, 5],
		[52, 22, 5]
	],
	[//[1] : 전염병
		[-12, 14, 5],
		[-3, 17, 5],
		[1, 12, 5],
		[11, 15, 5],
		[12, 10, 5],
		[24, 24, 5],
		[36, 22, 5],
		[28, 19, 5],
		[37, 16, 5],
		[28, 13, 5],
		[33, 10, 5]
	],
	[//[2] : 카르텔
		[5, 16, 5],
		[16, 12, 5],
		[25, 15, 5],
		[23, 29, 5],
		[35, 26, 5],
		[47, 29, 5],
		[24, 22, 5],
		[40, 20, 5],
		[52, 23, 5],
		[46, 17, 5],
		[50, 14, 5]
	],
	[//[3] : 검은 성전
		[-53, 27, 5],
		[-45, 23, 5],
		[-35, 26, 5],
		[-32, 20, 5],
		[-23, 23, 5],
		[-52, 20, 5],
		[-42, 17, 5],
		[-38, 13, 5],
		[-21, 18, 5],
		[-13, 15, 5],
		[-6, 13, 5]
	],
	[//[4] : 극비구역
		[-43, 21, 5],
		[-30, 24, 5],
		[-22, 19, 5],
		[-32, 16, 5],
		[-40, 12, 5],
		[-42, 6, 5],
		[-26, 8, 5],
		[-17, 13, 5],
		[-15, 4, 5],
		[-7, 10, 5],
		[2, 6, 5]
	],
	[//[5] : 옛비명굴
		[-21, 18, 5],
		[-12, 13, 5],
		[-22, 9, 5],
		[-5, 8, 5],
		[-2, 17, 5],
		[6, 11, 5],
		[0, 4, 5],
		[15, 15, 5],
		[23, 20, 5],
		[16, 6, 5],
		[23, 10, 5]
	],
	[//[6] : 태동
		[-5, 16, 5],
		[-12, 12, 5],
		[4, 9, 5],
		[-6, 5, 5],
		[0, 1, 5],
		[14, 14, 5],
		[28, 10, 5],
		[16, 6, 5],
		[25, 3, 5],
		[28, 17, 5],
		[20, -1, 5]
	],
	[//[7] : 자각
		[-28, 17, 5],
		[-20, 14, 5],
		[-29, 10, 5],
		[-25, 5, 5],
		[-1, 16, 5],
		[14, 14, 5],
		[2, 11, 5],
		[18, 9, 5],
		[-1, 6, 5],
		[17, 5, 5],
		[9, 2, 5]
	],
	//파워스테이션
	[//[8] : 코레 발전소
		[-28, 11, 5],
		[-14, 13, 5],
		[0, 14, 5],
		[-28, 16, 5],
		[-19, 19, 5],
		[-10, 22, 5],
		[-27, 25, 5],
		[-15, 27, 5],
		[18, 30, 5],
		[10, 28, 5],
		[20, 25, 5]
	],
	[//[9] : 푸르츠 발전소
		[-7, 14, 5],
		[-11, 19, 5],
		[-11, 24, 5],
		[8, 10, 5],
		[15, 14, 5],
		[26, 17, 5],
		[37, 14, 5],
		[18, 25, 5],
		[12, 20, 5],
		[26, 23, 5],
		[36, 20, 5]
	],
	[//[10] : 트롬베 발전소
		[-22, 32, 5],
		[-28, 26, 5],
		[-20, 21, 5],
		[-12, 25, 5],
		[-28, 15, 5],
		[-21, 11, 5],
		[-13, 17, 5],
		[-6, 14, 5],
		[-12, 8, 5],
		[13, 15, 5],
		[0, 35, 5]
	],
	[//[11] : 그란디네 발전소
		[-35, 16, 5],
		[-33, 23, 5],
		[-27, 19, 5],
		[-20, 26, 5],
		[-13, 22, 5],
		[-20, 14, 5],
		[-13, 17, 5],
		[1, 11, 5],
		[10, 26, 5],
		[14, 14, 5],
		[11, 20, 5]
	],
	//죽은 자의 성
	[//[12] : 매달린 망루
		[-15, 27, 5],
		[-11, 22, 5],
		[-10, 14, 5],
		[-10, 31, 5],
		[9, 32, 5],
		[14, 27, 5],
		[10, 22, 5],
		[25, 19, 5],
		[12, 16, 5],
		[24, 13, 5],
		[10, 10, 5]
	],
	[//[13] : 루크린제
		[-39, 27, 5],
		[-28, 23, 5],
		[-16, 26, 5],
		[-36, 19, 5],
		[-26, 16, 5],
		[-13, 18, 5],
		[-40, 13, 5],
		[-28, 9, 5],
		[-15, 13, 5],
		[-10, 7, 5],
		[0, 10, 5]
	],
	[//[14] : 강철의 브라키움
		[-35, 25, 5],
		[-26, 21, 5],
		[-13, 24, 5],
		[-36, 17, 5],
		[-22, 12, 5],
		[-13, 16, 5],
		[-24, 29, 5],
		[-13, 9, 5],
		[-2, 13, 5],
		[9, 10, 5],
		[2, 6, 5]
	],
	[//[15] : 샐러맨더의 화로
		[-24, 26, 5],
		[-12, 23, 5],
		[-33, 22, 5],
		[-28, 16, 5],
		[-14, 18, 5],
		[-31, 10, 5],
		[-18, 7, 5],
		[-10, 12, 5],
		[3, 9, 5],
		[12, 25, 5],
		[13, 19, 5]
	],
	[//[16] : 빛의 연회장
		[-29, 26, 5],
		[-34, 20, 5],
		[-22, 16, 5],
		[-14, 21, 5],
		[-33, 12, 5],
		[-23, 8, 5],
		[-12, 12, 5],
		[-1, 8, 5],
		[9, 12, 5],
		[12, 18, 5],
		[11, 24, 5]
	]
];


//에픽조각 드랍 범위 (y축 첫 이동 속도는 "5"로 유지)
var jogakRange = [
	//시간의 문
	[//[0] : 대화재
		[19, 42],[13, 30]//[[x축 min, x축 max],[y축 min, y축 max]]
	],
	[//[1] : 전염병
		[-3, 35],[8, 16]//[[x축 min, x축 max],[y축 min, y축 max]]
	],
	[//[2] : 카르텔
		[19, 50],[18, 32]//[[x축 min, x축 max],[y축 min, y축 max]]
	],
	[//[3] : 검은 성전
		[-53, -19],[18, 27]//[[x축 min, x축 max],[y축 min, y축 max]]
	],
	[//[4] : 극비구역
		[-43, 2],[6, 16]//[[x축 min, x축 max],[y축 min, y축 max]]
	],
	[//[5] : 옛비명굴
		[-21, 23],[6, 16]//[[x축 min, x축 max],[y축 min, y축 max]]
	],
	[//[6] : 태동
		[-9, 28],[1, 15]//[[x축 min, x축 max],[y축 min, y축 max]]
	],
	[//[7] : 자각
		[-4, 19],[2, 16]//[[x축 min, x축 max],[y축 min, y축 max]]
	],
	//파워스테이션
	[//[8] : 코레 발전소
		[-27, -6],[10, 28]//[[x축 min, x축 max],[y축 min, y축 max]]
	],
	[//[9] : 푸르츠 발전소
		[6, 36],[12, 26]//[[x축 min, x축 max],[y축 min, y축 max]]
	],
	[//[10] : 트롬베 발전소
		[-31, -6],[8, 31]//[[x축 min, x축 max],[y축 min, y축 max]]
	],
	[//[11] : 그란디네 발전소
		[-35, -9],[12, 26]//[[x축 min, x축 max],[y축 min, y축 max]]
	],
	//죽은 자의 성
	[//[12] : 매달린 망루
		[6, 21],[8, 30]//[[x축 min, x축 max],[y축 min, y축 max]]
	],
	[//[13] : 루크린제
		[-39, -6],[6, 32]//[[x축 min, x축 max],[y축 min, y축 max]]
	],
	[//[14] : 강철의 브라키움
		[-35, -6],[14, 33]//[[x축 min, x축 max],[y축 min, y축 max]]
	],
	[//[15] : 샐러맨더의 화로
		[-32, -6],[6, 24]//[[x축 min, x축 max],[y축 min, y축 max]]
	],
	[//[16] : 빛의 연회장
		[-34, -6],[6, 24]//[[x축 min, x축 max],[y축 min, y축 max]]
	]
];