//=================================================================================================================
//※ 변수 지정
//=================================================================================================================
//신규 변수
var autoRunning;
var autoLooting;
var autoEffect;

//=================================================================================================================
//※ 자료
//=================================================================================================================
var fieldList = [
	"field_기타"
];

			//=================================================================================================================
			//※ 함수 - 선로딩, 내부작업용
			//=================================================================================================================
					//IE8에 indexOf 적용
					if (!Array.prototype.indexOf)
					{
					  Array.prototype.indexOf = function(elt /*, from*/)
					  {
						var len = this.length >>> 0;

						var from = Number(arguments[1]) || 0;
						from = (from < 0)
							 ? Math.ceil(from)
							 : Math.floor(from);
						if (from < 0)
						  from += len;

						for (; from < len; from++)
						{
						  if (from in this &&
							  this[from] === elt)
							return from;
						}
						return -1;
					  };
					};
					
					//특정 클래스 지우기
					function removeClass(target,toErase) {
						target.className = target.className.replace( new RegExp('(?:^|\\s)'+toErase+'(?!\\S)') ,'');
					}
					
					//천단위 콤마 표시 (출처 : http://stackoverflow.com/questions/2901102/how-to-print-a-number-with-commas-as-thousands-separators-in-javascript)
					function thousand(num) {
						return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
					};
	
					//가중치 적용 랜덤
					function rand(target) {//target : 숫자가 들어있는 배열
						var number = 0;
						for (i=0;i<target.length;i++) {
							number += target[i];
						}
						var tmp = Math.random() * number;
						
						number = 0;
						for (i=0;i<target.length;i++) {
							number += target[i];
							if (tmp < number) {
								return i;
							}
						}
					}
					
					//만단위 한글로 전환 (출처 : http://kin.naver.com/qna/detail.nhn?d1id=1&dirId=1040202&docId=159019083&qb=amF2YXNjcmlwdCDsiKvsnpAgNOuLqOychCDtlZzquIA=&enc=utf8&section=kin&rank=2&search_sort=0&spq=0&pid=R6VWNc5Y7vKssb7f6YZsssssssd-312648&sid=UKssqHJvLDEAAC0QENA)
					function setWon(pWon) {
						var won  = pWon.toString();
						var arrWon  = ["", "만 ", "억 ", "조 ", "경 ", "해 ", "자 ", "양 ", "구 ", "간 ", "정 "];
						var changeWon = "";
						var pattern = /(-?[0-9]+)([0-9]{4})/;
						while(pattern.test(won)) {
							won = won.replace(pattern,"$1,$2");
						}
						won = won + "";
						var arrCnt = won.split(",").length-1;
						for(var ii=0; ii<won.split(",").length; ii++) {
							changeWon += won.split(",")[ii]+arrWon[arrCnt];
							arrCnt--;
						}
						return changeWon;
					}

					//숫자인지 판단 (출처 : http://mwultong.blogspot.com/2007/01/isnum-isnumeric-isnumber-javascript.html)
					function isNumber(s) {
						s += ''; // 문자열로 변환
						s = s.replace(/^\s*|\s*$/g, ''); // 좌우 공백 제거
						if (s == '' || isNaN(s)) return false;
						return true;
					}
					
//=================================================================================================================
//※ 함수 - 창 생성용
//=================================================================================================================