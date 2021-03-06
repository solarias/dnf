﻿//=================================================================================================================
//※ 변수 지정
//=================================================================================================================
//임시 변수
var i, j, k, temp, temp2, temp3;
var tempArr=[];
var autoDrop;//자동 - 아이템 출력
var autoRun; //자동 - 실행
var running = 0; //"자동 실행 중" 표시 (1 : 연속 실행, 2: 탐색 시작)

var	images = "./images/hell/";
var imageList = []; //이미지 선로딩용 임시저장소

//입력용 변수
var input = [//확률 계산 시 사용
	,//[0] : 던전 코드 (0,1,2 : '시간의 문' / 3,4 : '파워스테이션' / 5 : '죽은 자의 성')
	,//[1] : 난이도
	,//[2] : 등급
	,//[3] : 고유 여부 (대상 던전 : 0,1,2,3,4)
	,//[4] : 부위
	//[5] : 레벨 (대상 전전 : 5)
];
var objective = [//탐색 목표
	"",//명칭
	"",//조건 1
	"",//조건 2
	"",//조건 3
	""//조건 4 (최대치)
];
var icon = [//아이콘 표기 시 사용
	[],//[0] : 개별 아이템 아이콘
	[],//[1] : 종류 아이콘
	[] //[2] : 등급 아이콘
];
var goyuList = [];//고유 에픽 리스트

var currentList = [];//구축용 : 레벨별 에픽 리스트
var currentList_level = []//구축용 : 해당 지역의 '특정 레벨' 아이템 수량
var currentList_goyu = [];//구축용 : 현재 지역 고유에픽 리스트


//저장용 변수
var count = 1; //회차
var cost = [0,0];//초대장 ([0] : 전체 / [1] : 실질)
var gold = 0;//골드 환산 (도전장 시세)
var get = [0,0,0,0];//획득 ([0] : 획득 에픽 / [1] : 보유 에픽 / [2] : 코스모 소울 / [3] : 지옥 구슬)
var collect = 0;//현재 수집된 장비 수
var maxQuantity = 0;//최대 드랍 가능 아이템 수

//기타 변수
var thisTime = [];//이번에 드랍한 에픽템
var right_display = "record";//우측 출력


//=================================================================================================================
//※ DOM 변수에 할당 (앞에 '_'를 붙임)
//=================================================================================================================
//frame_left
var _dungeon = document.getElementById('dungeon');
	var _dungeon_level = document.getElementById('dungeon_level');
	var _dungeon_cost = document.getElementById('dungeon_cost');
var _difficulty = document.getElementById('difficulty');	
var _run1 = document.getElementById('run1');
var _run2 = document.getElementById('run2');
var _objective = document.getElementById('objective');
var _objective_list = document.getElementById('objective_list');
	var _objective_none = document.getElementById('objective_none');
	var _objective_item = document.getElementById('objective_item');
		var _objective_item_first = document.getElementById('objective_item_first');
		var _objective_item_second = document.getElementById('objective_item_second');
		var _objective_item_third = document.getElementById('objective_item_third');
		var _objective_item_name = document.getElementById('objective_item_name');
	var _objective_set = document.getElementById('objective_set');
		var _objective_set_first = document.getElementById('objective_set_first');
		var _objective_set_name = document.getElementById('objective_set_name');
	var _objective_count = document.getElementById('objective_count');
		var _objective_count_text = document.getElementById('objective_count_text');
	var _objective_cost = document.getElementById('objective_cost');
		var _objective_cost_text = document.getElementById('objective_cost_text');
	var _objective_fatigue = document.getElementById('objective_fatigue');
		var _objective_fatigue_max = document.getElementById('objective_fatigue_max');
		var _objective_fatigue_per = document.getElementById('objective_fatigue_per');
var _difficulty = document.getElementById('difficulty');
var _channel = document.getElementById('channel');
var _clear = document.getElementById('clear');


//frame_center
var _frame_center_title = document.getElementById('frame_center_title');
var _message = document.getElementById('message');
	var _message_count = document.getElementById('message_count');
	var _message_difficulty = document.getElementById('message_difficulty');
var _show = document.getElementById('show');
	var _show_display = document.getElementById('show_display');
var _result = document.getElementById('result');
	var _result_epic = document.getElementById('result_epic');
	var _result_epic_real = document.getElementById('result_epic_real');
	var _result_soul = document.getElementById('result_soul');
	var _result_beed = document.getElementById('result_beed');
var _cost_invitation = document.getElementById('cost_invitation');
var _cost_real = document.getElementById('cost_real');
var _cost_gold = document.getElementById('cost_gold');
var _cost_gold_real = document.getElementById('cost_gold_real');
var _cost_set_gold = document.getElementById('cost_set_gold');


//frame_right
var _frame_right_title = document.getElementById('frame_right_title');

var _record_filter = document.getElementById('record_filter');
	var _record_filter_first = document.getElementById('record_filter_first');
	var _record_filter_second = document.getElementById('record_filter_second');
	var _record_filter_third = document.getElementById('record_filter_third');
	var _record_filter_level = document.getElementById('record_filter_level');
	var _record_filter_clear = document.getElementById('record_filter_clear');
var _inventory_filter = document.getElementById('inventory_filter');
	var _inventory_filter_first = document.getElementById('inventory_filter_first');
	var _inventory_filter_second = document.getElementById('inventory_filter_second');
	var _inventory_filter_third = document.getElementById('inventory_filter_third');
	var _inventory_filter_level = document.getElementById('inventory_filter_level');
	var _inventory_filter_clear = document.getElementById('inventory_filter_clear');
var _set_filter = document.getElementById('set_filter');
	var _set_filter_first = document.getElementById('set_filter_first');
	var _set_filter_second = document.getElementById('set_filter_second');
	var _set_filter_third = document.getElementById('set_filter_third');
	var _set_filter_level = document.getElementById('set_filter_level');
	var _set_filter_clear = document.getElementById('set_filter_clear');
	
var _record = document.getElementById('record');
var _inventory = document.getElementById('inventory');
	var _inventory_display = document.getElementById('inventory_display');
	var _inventory_table = document.getElementById('inventory_table');
var _set = document.getElementById('set');
	var _set_display = document.getElementById('set_display');
	var _set_table = document.getElementById('set_table');
	
var _record_check = document.getElementById('record_check');
	var _record_check_cost = document.getElementById('record_check_cost');
	var _record_check_difficulty = document.getElementById('record_check_difficulty');
	var _record_check_quantity = document.getElementById('record_check_quantity');
	var _record_check_reset = document.getElementById('record_check_reset');
var _inventory_check = document.getElementById('inventory_check');
	var _inventory_check_confirm = document.getElementById('inventory_check_confirm');
	var _inventory_check_cost = document.getElementById('inventory_check_cost');
	var _inventory_check_all = document.getElementById('inventory_check_all');
	var _inventory_check_collect = document.getElementById('inventory_check_collect');
var _set_check = document.getElementById('set_check');
	var _set_check_confirm = document.getElementById('set_check_confirm');
	var _set_check_cost = document.getElementById('set_check_cost');
	var _set_check_all = document.getElementById('set_check_all');
	var _set_check_only = document.getElementById('set_check_only');
var _disassemble_1 = document.getElementById('disassemble_1');
var _disassemble_2 = document.getElementById('disassemble_2');

var _shift1 = document.getElementById('shift1');
var _shift2 = document.getElementById('shift2');
var _shift3 = document.getElementById('shift3');


//etc
var _cover =  document.getElementById('cover');
var _cover_notice =  document.getElementById('cover_notice');
var _imagePreloader = document.getElementById('imagePreloader');
	
//=================================================================================================================
//※ 자료
//=================================================================================================================
	//던전 정보
var areaList = [//던전별 지역 명칭
	"시간의 문",//[0] : 대화재
	"시간의 문",//[1] :전염병
	"시간의 문",//[2] :카르텔
	"시간의 문",//[3] :검은 성전
	"시간의 문",//[4] :극비구역
	"시간의 문",//[5] :옛 비명굴
	"시간의 문",//[6] :태동
	"시간의 문",//[7] :자각
	
	"파워스테이션",//[8] :코레 발전수
	"파워스테이션",//[9] :푸르츠 발전소
	"파워스테이션",//[10] :트롬베 발전소
	"파워스테이션",//[11] :그란디네 발전소
	
	"죽은 자의 성",//[12] :매달린 망루
	"죽은 자의 성",//[13] :루크린제
	"죽은 자의 성",//[14] :강철의 브라키움
	"죽은 자의 성",//[15] :샐러맨더의 화로
	"죽은 자의 성"//[16] :빛의 연회장
]
var levelList = [//던전별 드랍 레벨
	[70, 75],//[0] : 대화재
	[70, 75],//[1] : 전염병
	[70, 75],//[2] : 카르텔
	[70, 75],//[3] : 검은 성전
	[70, 75],//[4] : 극비구역
	[75, 80],//[5] : 옛 비명굴
	[75, 80],//[6] : 태동
	[75, 80],//[7] : 자각
	
	[75, 80, 85],//[8] : 코레 발전소
	[80, 85],//[9] : 푸르츠 발전소
	[80, 85],//[10] : 트롬베 발전소
	[80, 85],//[11] : 그란디네 발전소
	
	[80, 85],//[12] : 매달린 망루
	[80, 85],//[13] : 루크린제
	[80, 85],//[14] : 강철의 브라키움
	[80, 85],//[15] : 샐러맨더의 화로
	[80, 85]//[16] : 빛의 연회장
];
var costList = [//던전별 드랍 레벨
	20,//[0] : 대화재
	20,//[1] : 전염병
	20,//[2] : 카르텔
	21,//[3] : 검은 성전
	21,//[4] : 극비구역
	22,//[5] : 옛 비명굴
	22,//[6] : 태동
	22,//[7] : 자각
	
	23,//[8] : 코레 발전소
	24,//[9] : 푸르츠 발전소
	24,//[10] : 트롬베 발전소
	24,//[11] : 그란디네 발전소
	
	26,//[12] : 매달린 망루
	26,//[13] : 루크린제
	26,//[14] : 강철의 브라키움
	26,//[15] : 샐러맨더의 화로
	26//[16] : 빛의 연회장
];
var cutList = [//던전별 실질 소모 초대장 감소, 에픽 해체
	20,//[0] : 코스모소울
	[//[1] : 지옥구슬
		//시간의 문
		400,//[0] : 대화재
		400,//[1] : 전염병
		400,//[2] : 카르텔
		400,//[3] : 검은성전
		400,//[4] : 극비구역
		400,//[5] : 옛비명굴
		400,//[6] : 태동
		400,//[7] : 자각
		//파워스테이션
		450,//[8] : 코레 발전소
		450,//[9] : 푸르츠 발전소
		450,//[10] : 트롬베 발전소
		450,//[11] : 그란디네 발전소
		//죽은 자의 성
		500,//[12] : 매달린 망루
		500,//[13] : 루크린제
		500,//[14] : 강철의 브라키움
		500,//[15] : 샐러맨더의 화로
		500//[16] : 빛의 연회장
	],
	120//[2] : 에픽 해체
]


	//확률_수치 1 (순서대로) (던전 난이도 미적용(슬레이어 기준) - 다른 시뮬레이터용)
var chanceList_num = [
	[//[0] : 난이도
	0.4,//어려움
	0.6//매우 어려움
	],
	[//[1] : 난이도별 드랍률 (아이템 개별)
		[//[1][0] : 어려움 드랍률
			0.5,//언커먼
			0.4695,//마봉
			0.005,//에픽
			0.0248,//코스모소울
			0.0007//지옥구슬
		],
		[//[1][1] : 매우어려움 드랍률
			0.47595,//언커먼
			0.5,//마봉
			0.007,//에픽
			0.0166,//코스모소울
			0.00045//지옥구슬
		]
	],
	[//[2] : 고유 에픽 드랍률
		0.995,//일반 에픽
		0.005//고유 에픽
	],
	[//[3] : 아이템 부위별 드랍률
		45,//무기(15)
		36,//방어구(6)
		6,//장신구(1)
		13//특수장비(2)
	],
	[//[4] : 지역 별 레벨 가중치
		[
			[//카테고리 1-1 : 죽은자의 성
				12,13,14,15,16
			],
			[//카테고리 1-2 : 해당 레벨
			60,//80제
			40//85제
			]
		]
	]
];
	//확률_명칭 1 (순서대로) (던전 난이도 미적용 - 다른 시뮬레이터용)
var chanceList_name = [
	[//[0] : 난이도
		"어려움",//[0][0]
		"매우 어려움"//[0][1]
	],
	[//[1] : 난이도별 드랍률 (아이템 개별)
		[//[1][0] : 어려움 드랍률
			"언커먼",
			"마봉",
			"에픽",
			"코스모소울",
			"지옥구슬"
		],
		[//[1][2] : 매우어려움 드랍률
			"언커먼",
			"마봉",
			"에픽",
			"코스모소울",
			"지옥구슬"
		]
	],
	[//[2] : 고유 에픽 드랍률
		"일반에픽",
		"고유에픽"
	],
	[//[3] : 아이템 부위별 드랍률
		"무기",
		"방어구",
		"악세서리",
		"특수장비"
	],
	[//[4] : 지역 별 레벨 가중치
		[
			[//카테고리 1-1 : 죽은자의 성
				12,13,14,15,16
			],
			[//카테고리 1-2 : 해당 레벨
			80,
			85
			]
		]
	]
];


	//확률_수치 2 (순서대로) (던전 난이도 적용 - 지옥파티 시뮬레이터 전용)
var chanceList2_num = [
	[//[0] : 난이도
	0.4,//어려움
	0.6//매우 어려움
	],
	[//[1] : 난이도별 드랍률 (아이템 개별)
		[//[1][0] : 어려움 드랍률
			[//[1][0][0] : 노멀 어려움 드랍률
				0.5,//언커먼
				0.481,//마봉
				0.005,//에픽
				0.0138,//코스모소울
				0.0002//지옥구슬
			],
			[//[1][0][1] : 익스 어려움 드랍률
				0.5,//언커먼
				0.4782,//마봉
				0.005,//에픽
				0.0165,//코스모소울
				0.0003//지옥구슬
			],
			[//[1][0][2] : 마스터 어려움 드랍률
				0.5,//언커먼
				0.4754,//마봉
				0.005,//에픽
				0.0192,//코스모소울
				0.0004//지옥구슬
			],
			[//[1][0][3] : 킹 어려움 드랍률
				0.5,//언커먼
				0.4725,//마봉
				0.005,//에픽
				0.022,//코스모소울
				0.0005//지옥구슬
			],
			[//[1][0][4] : 슬레 어려움 드랍률
				0.5,//언커먼
				0.4695,//마봉
				0.005,//에픽
				0.0248,//코스모소울
				0.0007//지옥구슬
			]
		],
		[//[1][1] : 매우어려움 드랍률
			[//[1][1][0] : 노멀 매우어려움 드랍률
				0.4837,//언커먼
				0.5,//마봉
				0.007,//에픽
				0.0092,//코스모소울
				0.0001//지옥구슬
			],
			[//[1][1][1] : 익스 매우어려움 드랍률
				0.4818,//언커먼
				0.5,//마봉
				0.007,//에픽
				0.011,//코스모소울
				0.0002//지옥구슬
			],
			[//[1][1][2] : 마스터 매우어려움 드랍률
				0.4798,//언커먼
				0.5,//마봉
				0.007,//에픽
				0.0129,//코스모소울
				0.0003//지옥구슬
			],
			[//[1][1][3] : 킹 매우어려움 드랍률
				0.47794,//언커먼
				0.5,//마봉
				0.007,//에픽
				0.0147,//코스모소울
				0.00036//지옥구슬
			],
			[//[1][1][4] : 슬레 매우어려움 드랍률
				0.47595,//언커먼
				0.5,//마봉
				0.007,//에픽
				0.0166,//코스모소울
				0.00045//지옥구슬
			]
		]
	],
	[//[2] : 고유 에픽 드랍률
		0.995,//일반 에픽
		0.005//고유 에픽
	],
	[//[3] : 아이템 부위별 드랍률
		45,//무기(15)
		36,//방어구(6)
		6,//장신구(1)
		13//특수장비(2)
	],
	[//[4] : 지역 별 레벨 가중치
		[
			[//카테고리 1-1 : 죽은자의 성
				12,13,14,15,16
			],
			[//카테고리 1-2 : 해당 레벨
			60,//80제
			40//85제
			]
		]
	]
];
	//확률_명칭 2 (순서대로) (던전 난이도 적용 - 지옥파티 시뮬레이터 전용)
var chanceList2_name = [
	[//[0] : 난이도
		"어려움",//[0][0]
		"매우 어려움"//[0][1]
	],
	[//[1] : 난이도별 드랍률 (아이템 개별)
		[//[1][0] : 어려움 드랍률
			[//[1][0][0] : 노멀 어려움 드랍률
				"언커먼",
				"마봉",
				"에픽",
				"코스모소울",
				"지옥구슬"
			],
			[//[1][0][1] : 익스 어려움 드랍률
				"언커먼",
				"마봉",
				"에픽",
				"코스모소울",
				"지옥구슬"
			],
			[//[1][0][2] : 마스터 어려움 드랍률
				"언커먼",
				"마봉",
				"에픽",
				"코스모소울",
				"지옥구슬"
			],
			[//[1][0][3] : 킹 어려움 드랍률
				"언커먼",
				"마봉",
				"에픽",
				"코스모소울",
				"지옥구슬"
			],
			[//[1][0][4] : 슬레 어려움 드랍률
				"언커먼",
				"마봉",
				"에픽",
				"코스모소울",
				"지옥구슬"
			]
		],
		[//[1][1] : 매우어려움 드랍률
			[//[1][1][0] : 노멀 매우어려움 드랍률
				"언커먼",
				"마봉",
				"에픽",
				"코스모소울",
				"지옥구슬"
			],
			[//[1][1][1] : 익스 매우어려움 드랍률
				"언커먼",
				"마봉",
				"에픽",
				"코스모소울",
				"지옥구슬"
			],
			[//[1][1][2] : 마스터 매우어려움 드랍률
				"언커먼",
				"마봉",
				"에픽",
				"코스모소울",
				"지옥구슬"
			],
			[//[1][1][3] : 킹 매우어려움 드랍률
				"언커먼",
				"마봉",
				"에픽",
				"코스모소울",
				"지옥구슬"
			],
			[//[1][1][4] : 슬레 매우어려움 드랍률
				"언커먼",
				"마봉",
				"에픽",
				"코스모소울",
				"지옥구슬"
			]
		]
	],
	[//[2] : 고유 에픽 드랍률
		"일반에픽",
		"고유에픽"
	],
	[//[3] : 아이템 부위별 드랍률
		"무기",
		"방어구",
		"악세서리",
		"특수장비"
	],
	[//[4] : 지역 별 레벨 가중치
		[
			[//카테고리 1-1 : 죽은자의 성
				12,13,14,15,16
			],
			[//카테고리 1-2 : 해당 레벨
			80,
			85
			]
		]
	]
];

	//드랍 정보
var dropQuantityList = [//난이도별 드랍 분량
	[5,6,7],//어려움
	[8,9,10]//매우 어려움
]

var equipList = [
	"소검","도","둔기","대검","광검",
	"너클","건틀릿","클로","권투글러브","통파",
	"리볼버","자동권총","머스켓","핸드캐넌","보우건",
	"창","봉","로드","스탭","빗자루",
	"십자가","염주","토템","낫","배틀액스",
	"단검","쌍검","완드","차크라웨펀",
	"천","가죽","경갑","중갑","판금",
	"목걸이","팔찌","반지","보조장비","마법석"
];

var gradeList = [
	"언커먼","마봉","에픽"
];