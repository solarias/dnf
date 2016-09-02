
//=================================================================================================================
//※ 저장되는 정보들
//=================================================================================================================
//입력용 변수
var input = {
	"dungeon":0,//던전 종류 (0~7 : '시간의 문' / 8~11 : '파워스테이션' / 12~17 : '죽은 자의 성')
	"dun_diff":"",//[1] : 던전 난이도
	"hell_diff":"",//[2] : 지옥파티 난이도
	"rarity":"",//[3] : 아이템 등급
	"goyu":"",//[4] : 에픽 고유 여부 (대상 던전 : 0~11)
	"type":"",//[5] : 에픽 부위
	"level":null//[6] : 레벨 (일반 장비)
};

//저장용 변수
var count = 0; //회차
//비용 정보
var cost = {
	"invite":0,//초대정 전체
	"invite_real":0,//초대장 실질
	"gold":0,//골드 전체
	"gold_real":0//골드 실질
};
var gold = 0;//골드 환산 (도전장 시세)
//획득 정보
var get = {
	"epic_get":0,//획득 에픽
	"epic_have":0,//보유 에픽
	"soul_get":0,//획득 코소
	"soul_have":0,//보유 코소
	"invite_get":0,//획득 초대장
	"beed_get":0//획득 지옥구슬
};
var collect = 0;//현재 수집된 장비 수
var content_text = ["","","",""];//최신 내용 기억 ([record, inventory, set, craft])

//날짜
var dateCount = 0;//날짜 계산용 별도 변수
var dateState = {
	"changed":2,//0 : 날짜 계산 완료, 1 : 날짜 재계산 필요, 2 : 날짜 최초 계산
	"len_wd":0,//평일 실행 횟수
	"len_we":0,//주말 실행 횟수
	"remain":0,//오늘 남은 횟수
	"date":1,//~일차
	"week":1,//~주차
	"day":"월",//~요일
	"dayType":"wd"//평일 or 주말
};
var dayTypeList = {//요일 구분
	"월":"wd", "화":"wd", "수":"wd", "목":"wd", "금":"wd",
	"토":"we", "일":"we"
};
var dateSettingList = [0,0,0,0,0,0,0,0];//[최대치1,최대치2,1회,1번,2번,3번,4번,5번];
var dateSettingName = ["평일 피로도 총량","주말 피로도 총량","1회 피로도 소모","1번 비약 피로도","2번 비약 피로도","3번 비약 피로도","4번 비약 피로도","5번 비약 피로도"];//
var dateSettingDefault = [156,176,4,0,0,0,0,0];//[최대치,1회,1번,2번,3번,4번,5번];
var dateSettingWeek = ["월","화","수","목","금","토","일"];
var dateSettingWeekDefault = ["월","화","수","목","금","토","일"];

//옵션 정보
var optionList = {
	"name_normal":true,
	"name_jogak":false,
	"character":true,
	"sound":false,
	"hitsound":false,
	"bgm":false,
	"bgm_type":"dungeon",
	"gabriel":false,
	"gabriel_type":"manual",
	"freepass":false,
	"soul":true,
	"basicItem":false
};

//내 캐릭터 정보
var playMode = "rpg";//RPG 모드인지 기억
	var playSpeed = {
		"normal":30,
		"rpg":60,
		"beckey":120
	};
var myCharacter = "";
var power = 1500;//전투력
var hellgate = 0;//헬 기둥 체력
var tower = 0;//100일 도달 횟수
var wearingList = {
	"무기":null,
	"상의":null,
	"하의":null,
	"머리어깨":null,
	"벨트":null,
	"신발":null,
	"목걸이":null,
	"팔찌":null,
	"반지":null,
	"보조장비":null,
	"마법석":null,
	"귀걸이":null
};

//확률_수치
var chanceList_num = [];
