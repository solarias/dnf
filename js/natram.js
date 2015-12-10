//전역 변수
var FPS = 60;
var upgrade_win = "off";//업그레이드창 활성화 여부

var motion1 = 0;//공격단계
var motion2 = 0;//공격단계 내 모션단계


var natram = {//드래곤스톤 능력치
	level:1,
	HP_now:10,
	HP_max:10
};
var nen = 0;//넨 결정

var delay = 3;//1레벨 기준 공격 딜레이 (기준 : 이펙트 간격 / 준비 -> 이펙트 : 2배 딜레이)
var stat = {//각종 능력치 레벨
	attack:3,
	speed:1,
	criticalPercent:1,
	criticalAttack:1,
	motion:6,
	money:1
}

var spritePosition = [
	["0px 0px","-417px 0px","-834px 0px","-1251px 0px"],
	["0px -281px","-417px -281px","-834px -281px","-1251px -281px"],
	["0px -562px","-417px -562px","-834px -562px","-1251px -562px"],
	["0px -843px","-417px -843px","-834px -843px","-1251px -843px"],
	["0px -1124px","-417px -1124px","-834px -1124px","-1251px -1124px"],
	["0px -1405px","-417px -1405px","-834px -1405px","-1251px -1405px"]
]
//함수
		//===============================================================================================================
		//※ 기본 함수
		//===============================================================================================================
		function $(parameter) {
			return document.getElementById(parameter);
		}
		
		//천단위 콤마 표시 (출처 : http://stackoverflow.com/questions/2901102/how-to-print-a-number-with-commas-as-thousands-separators-in-javascript)
		function thousand(num) {
			return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
		};
//===============================================================================================================
//※ 본격 함수
//===============================================================================================================


//애니메이션
function animation() {
	//캐릭터 애니메이션
	motion2 = (motion2 == 3 ? 0 : motion2 + 1);
	if (motion2 == 0) {
		motion1 = (motion1 == stat.motion - 1 ? 0 : motion1 + 1)
	}
	$("character").style.backgroundPosition = spritePosition[motion1][motion2];
	
	//스톤 애니메이션
	if (motion2 == 1) {
		$("stone").style.right = "-120px";
	} else {
		$("stone").style.right = "-110px";
	}
	
	//능력치 변경 (모션 1 한정)
	if (motion2 == 1) {
		natram.HP_now -= stat.attack;
		//토벌 완료
		if (natram.HP_now <= 0) {
			//넨 결정 획득
			nen += natram.HP_max;
			$("nen_num").innerHTML = thousand(nen);
			//레벨업
			natram.level += 1;
				$("natram_level_num").innerHTML = thousand(natram.level);
			natram.HP_max += 5;
			natram.HP_now = natram.HP_max;
		}
		//HP 갱신
		$("natram_num").innerHTML = thousand(natram.HP_now);
		$("natram_health_bar").style.width = ((natram.HP_now/natram.HP_max)*100).toString() + "%";
	}
	
	//향후
	switch (motion2) {
		case 0:
			var auto = setTimeout(function() {
				animation();
			},1000*delay*2/FPS);
			
			break;
		default:
			var auto = setTimeout(function() {
				animation();
			},1000*delay/FPS);
			
			break;
	}
}

//===============================================================================================================
//※ 실행
//===============================================================================================================

window.onload = function() {
	//이미지 선로딩
	
	
	
	//본격
	
	//메뉴 열고 닫기
	$("upgrade_title").onmouseenter = function() {
		if (upgrade_win == "off") {
			function moveRight() {
				if ($("upgrade").offsetLeft + 40 < -2) {
					$("upgrade").style.left = ($("upgrade").offsetLeft + 40).toString() + "px";
					setTimeout(function() {
						moveRight();
					},1000/FPS);
				} else {
					$("upgrade").style.left = "-2px";
					upgrade_win = "on";
				}
			}
			
			moveRight();
		};
	}
	$("upgrade").onmouseleave = function() {
		if (upgrade_win == "on") {
			function moveLeft() {
				if ($("upgrade").offsetLeft - 40 > -406) {
					$("upgrade").style.left = ($("upgrade").offsetLeft - 40).toString() + "px";
					setTimeout(function() {
						moveLeft();
					},1000/FPS);
				} else {
					$("upgrade").style.left = "-406px";
					upgrade_win = "off";
				}
			}
			
			moveLeft();
		};
	}
	
	//애니메이션
	animation();
}