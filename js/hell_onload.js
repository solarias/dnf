//=================================================================================================================
//※ 실행
//=================================================================================================================

window.onload = function() {
	
	//선로딩 : 아이템 리스트
	_cover_notice.innerHTML = "아이템 리스트 불러오는 중...";
	loadJs("./js/hell_itemList.js", function() {
		//후작업 1 : 드랍되지 않는 아이템 제외
			//1. 던전 수집
			var tempList = [];
			for (i=0;i<_dungeon.options.length;i++) {
				if (tempList.indexOf(_dungeon.options[i].value) == -1) {
					tempList.push(_dungeon.options[i].value);
				}
			}
			//2. 던전 리스트를 통한 지역&레벨 수집
			var tempList2 = [];//레벨
			var tempList3 = [];//지역
			tempList3.push("");//"비 고유에픽"
			for (i=0;i<tempList.length;i++) {
				//레벨
				for (j=0;j<levelList[tempList[i]].length;j++) {
					if (tempList2.indexOf(levelList[tempList[i]][j]) == -1) {
						tempList2.push(levelList[tempList[i]][j]);
					}
				}
				//지역
				if (tempList3.indexOf(areaList[tempList[i]]) == -1) {
					tempList3.push(areaList[tempList[i]]);
				}
			}
			//3. 레벨&지역 해당하지 않는 것들만 입력
			var tempList4 = [];//제외시킬 리스트
			for (i=0;i<itemList.length;i++) {
				if (tempList2.indexOf(itemList[i][3]) == -1 || tempList3.indexOf(itemList[i][6]) == -1) {
					tempList4.push(i);
				}
			}
			//4. itemList에서 제외대상을 역순으로 제외 (순서 꼬임 방지)
			for (i=tempList4.length-1;i>=0;i--) {
				itemList.splice(tempList4[i],1);
			}
			itemList.push(["","","",,"","","","",0,0,0,0,0]);
			
		//후작업 2 : 일부 아이템리스트 세팅
		for (i=0;i<itemList.length;i++) {
			//고유 에픽
			if (itemList[i][6] != "") {
				goyuList.push(itemList[i]);
			}
		}
		
		//선로딩 : 이미지
		//0단계 : 이미지 스프라이트 추가(sprite_hell)
		imageList.push('./sprite/images/sprite_hell.png');
		
		//1단계 : 아이템 이미지 추가
		for (i=0;i<itemList.length;i++) {
			if (itemList[i][7] != "") {//아이콘 이름이 있다면
				icon[0].push(itemList[i][7]);//"아이콘 이름"을 불러올 대상으로 추가
				//imageList.push(images + "1_" + itemList[i][7] + ".png") (개별 이미지 대신 스프라이트 사용)
			}
		}
		//※ 일부 이미지는 다음 마이피에서 가져옴 - 트래픽 초과 방지
		//1-1단계 : 코스모소울, 지옥구슬 추가
		//imageList.push(images + "3_코스모소울.png");
		//imageList.push(images + "3_지옥구슬.png");
		imageList.push("http://img2.ruliweb.daum.net/mypi/gup/a/125/4/o/3771057034.jpg");//코스모소울 - 다음 마이피
		imageList.push("http://img2.ruliweb.daum.net/mypi/gup/a/125/4/o/3771057033.jpg");//지옥구슬 - 다음 마이피
		
		
		//2단계 : 부위 이미지 추가 (equipList 참고)
		for (i=0;i<equipList.length;i++) {
			icon[1].push(equipList[i]);
			imageList.push(images + "2_" + equipList[i] + ".png");
		}
		
		//3단계 : 등급 이미지 추가 (gradeList 참고)
		/*
		for (i=0;i<gradeList.length;i++) {
			icon[2].push(gradeList[i]);
			imageList.push(images + "3_" + gradeList[i] + ".png");
		}
		*/
		imageList.push("http://img2.ruliweb.daum.net/mypi/gup/a/125/4/o/3771057031.jpg");//언커먼 - 다음 마이피
		imageList.push("http://img2.ruliweb.daum.net/mypi/gup/a/125/4/o/3771057020.jpg");//마봉 - 다음 마이피
		imageList.push("http://img2.ruliweb.daum.net/mypi/gup/a/125/4/o/3771057032.jpg");//에픽 - 다음 마이피
		
		//4단계 : 기타
		imageList.push(images + "4_center.png");
		imageList.push(images + "4_record.png");
		imageList.push(images + "4_inventory.png");
		imageList.push(images + "4_set.png");
		imageList.push(images + "soul.png");
		imageList.push(images + "beed.png");
		imageList.push(images + "cost.png");
		
		//5단게 : 이미지 선로딩 실시
		loadImages(imageList,function(){
			//=================================================================================================================
			//※ 선로딩 끝, 본격적 실행 시작
			//=================================================================================================================
			
			//1. 선로딩 잔재 제거 (cover 제거)
			_cover.style.display = "none";
			
			//2. 일부 값 미리 입력
			dungeon_select();//2-1. 던전 선택
			
			//3-1. 인벤토리 구성 (만들어둔 첫 줄 아래로 생성)
			generateInventory();
			
			//3-2. 세트 아이템 구성 (만들어둔 첫 줄 아래로 생성)
			generateSet();
			
			//3-3. 결과물 창 구성
			generateShow();
			
			//4. 조건부 실행 - 아이템 탐색 구성
			var tempArr = [];//[0] : 일반 1차 분류,
			for (i=0;i<itemList.length;i++) {
				if (tempArr.indexOf(itemList[i][0]) == -1 && itemList[i][0] != "") {
					//일반 1차 분류
					tempArr.push(itemList[i][0]);
				}
			}
				//4-1. 일반 1차 분류 추가
				for (i=0;i<tempArr.length;i++) {
					var option = document.createElement("option");
					option.value = tempArr[i];
					option.text = tempArr[i];
					_objective_item_first.add(option);
				}
				//4-2.
			//5. 조건부 실행 - 세트 완성 구성
			var tempArr = [];//[0] : 일반 1차 분류,
			for (i=0;i<itemList.length;i++) {
				if (itemList[i][5] != "") {
					if (tempArr.indexOf(itemList[i][1]) == -1 && itemList[i][1] != "") {
						//일반 1차 분류
						tempArr.push(itemList[i][1]);
					}
				}
			}
				//5-1. 일반 1차 분류 추가
				for (i=0;i<tempArr.length;i++) {
					var option = document.createElement("option");
					option.value = tempArr[i];
					option.text = tempArr[i];
					_objective_set_first.add(option);
				}
			
			//6. 필터 구성
			var tempArr = [[],[],[],[]];//[0] : 일반 1차 분류, [1] : 일반 레벨, [2] : 세트 1차 분류, [3] : 세트 레벨
			for (i=0;i<itemList.length;i++) {
				//세트 아이템
				if (itemList[i][5] != "") {
					if (tempArr[2].indexOf(itemList[i][0]) == -1 && itemList[i][0] != "") {
						//세트 1차 분류
						tempArr[2].push(itemList[i][0]);
					}
					if (tempArr[3].indexOf(itemList[i][3]) == -1 && typeof itemList[i][3] != "undefined") {
						//세트 레벨
						tempArr[3].push(itemList[i][3]);
					}
				}
				//(세트 아이템을 포함한) 일반 아이템
				if (tempArr[0].indexOf(itemList[i][0]) == -1 && itemList[i][0] != "") {
					//일반 1차 분류
					tempArr[0].push(itemList[i][0]);
				}
				if (tempArr[1].indexOf(itemList[i][3]) == -1 && typeof itemList[i][3] != "undefined") {
					//일반 레벨
					tempArr[1].push(itemList[i][3]);
				}
			}
				//6-1. 일반 1차 분류 추가
				for (i=0;i<tempArr[0].length;i++) {
					var option1 = document.createElement("option");
					option1.value = tempArr[0][i];
					option1.text = tempArr[0][i];
					_record_filter_first.add(option1);
					
					var option2 = document.createElement("option");
					option2.value = tempArr[0][i];
					option2.text = tempArr[0][i];
					_inventory_filter_first.add(option2);
				}
				//6-2. 일반 레벨 추가
				for (i=0;i<tempArr[1].length;i++) {
					var option1 = document.createElement("option");
					option1.value = tempArr[1][i].toString();
					option1.text = tempArr[1][i].toString();
					_record_filter_level.add(option1);
					
					var option2 = document.createElement("option");
					option2.value = tempArr[1][i].toString();
					option2.text = tempArr[1][i].toString();
					_inventory_filter_level.add(option2);
				}
				//6-3. 세트 1차 분류 추가
				for (i=0;i<tempArr[2].length;i++) {
					var option = document.createElement("option");
					option.value = tempArr[2][i];
					option.text = tempArr[2][i];
					_set_filter_first.add(option);
				}
				//6-4. 세트 레벨 추가
				for (i=0;i<tempArr[3].length;i++) {
					var option = document.createElement("option");
					option.value = tempArr[3][i].toString();
					option.text = tempArr[3][i].toString();
					_set_filter_level.add(option);
				}
				
			//final. 조건부 실행, 필터, 체크박스, 버튼 세팅
				//final-1. 조건부 실행, 필터링, 체크박스
				//final-1-1. 조건부 실행, 필터링
				//final-1-1-0. 조건부 실행
				
				//final-1-1-0-1. 조건부 실행 - 목표 리스트
				_objective_list.onchange = function() {
					//설정창 변경
					for (i=0;i<_objective_list.options.length;i++) {
						if(_objective_list.options[i].value != "") {//구분선 제외
							if (_objective_list.options[i].value == _objective_list.value) {
								document.getElementById("objective_" + _objective_list.options[i].value).style.display = "block";
							} else {
								document.getElementById("objective_" + _objective_list.options[i].value).style.display = "none";
							}
						}
					}
					//리스트 색상 변경
					if (_objective_list.value != "none") {
						_objective_list.style.background = "#F4FA58";
					} else {
						_objective_list.style.background = "";
					}
				}
				
				//final-1-1-0-1. 조건부 실행 - 에픽 아이템 탐색
				_objective_item_first.onchange = function() {
					var value = _objective_item_first.value;
					//1. 두번째, 세번째, 네번째 '무조건' 초기화
						//나머지 탐색 선택지 초기화
						_objective_item_second.selectedIndex = 0;
						_objective_item_third.selectedIndex = 0;
						_objective_item_name.selectedIndex = 0;
						//나머지 필더링 비활성화
						_objective_item_second.disabled = "disabled";
						_objective_item_third.disabled = "disabled";
						_objective_item_name.disabled = "disabled";
						//select 배경색 변경
						_objective_item_second.style.backgroundColor = "white";
						_objective_item_third.style.backgroundColor = "white";
						_objective_item_name.style.backgroundColor = "white";
						//두번째 탐색 비우고 새로 입력
						var dropdown = _objective_item_second;
						clearSelect(dropdown);
						
						var option = document.createElement("option");
						option.value = "";
						option.text = "모든 에픽 아이템";
						dropdown.add(option);
						//세번째 탐색 비우고 새로 입력
						var dropdown = _objective_item_third;
						clearSelect(dropdown);
						
						var option = document.createElement("option");
						option.value = "";
						option.text = "모든 에픽 아이템";
						dropdown.add(option);
						//네번째 탐색 비우고 새로 입력
						var dropdown = _objective_item_name;
						clearSelect(dropdown);
						
						var option = document.createElement("option");
						option.value = "";
						option.text = "모든 에픽 아이템";
						dropdown.add(option);
					//2. 첫번째 값이 있으면 두번째 생성
					if (value != "") {
						//두번째 탐색 배경색 변경
						_objective_item_second.style.backgroundColor = "#F4FA58";
						//두번째 탐색 활성화
						_objective_item_second.disabled = "";
						//첫번째 탐색을 기준으로 두번째 탐색 구성
						var tempArr = [];
						for (i=0;i<itemList.length;i++) {
							//2차 기준 (1차 선택지가 있어야, 텅빈 건 제외)
							if (tempArr.indexOf(itemList[i][1]) == -1 && itemList[i][0] == value && itemList[i][1] != "") {
								tempArr.push(itemList[i][1]);
							}
						}
							//두번째 탐색 비우고 새로 입력
							var dropdown = _objective_item_second;
							clearSelect(dropdown);
							
							var option = document.createElement("option");
							option.value = "";
							option.text = "모든 " + value + " 아이템";
							dropdown.add(option);
							
							var option = document.createElement("option");
							option.value = "";
							option.disabled = "disabled";
							option.text = "===============";
							dropdown.add(option);
							
							for (i=0;i<tempArr.length;i++) {
								var option = document.createElement("option");
								option.value = tempArr[i];
								option.text = tempArr[i];
								dropdown.add(option);
							}
					}
				}
				
				_objective_item_second.onchange = function() {
					var value = _objective_item_second.value;
					//1. 세번째, 네번째 '무조건' 초기화
						//나머지 탐색 선택지 초기화
						_objective_item_third.selectedIndex = 0;
						_objective_item_name.selectedIndex = 0;
						//나머지 필더링 비활성화
						_objective_item_third.disabled = "disabled";
						_objective_item_name.disabled = "disabled";
						//select 배경색 변경
						_objective_item_third.style.backgroundColor = "white";
						_objective_item_name.style.backgroundColor = "white";
						//세번째 탐색 비우고 새로 입력
						var dropdown = _objective_item_third;
						clearSelect(dropdown);
						
						var option = document.createElement("option");
						option.value = "";
						option.text = "모든 에픽 아이템";
						dropdown.add(option);
						//네번째 탐색 비우고 새로 입력
						var dropdown = _objective_item_name;
						clearSelect(dropdown);
						
						var option = document.createElement("option");
						option.value = "";
						option.text = "모든 에픽 아이템";
						dropdown.add(option);
					//2. 두번째 값이 있으면 세번째 생성
					if (value != "") {
						//두번째 탐색 배경색 변경
						_objective_item_third.style.backgroundColor = "#F4FA58";
						//두번째 탐색 활성화
						_objective_item_third.disabled = "";
						//첫번째 탐색을 기준으로 두번째 탐색 구성
						var tempArr = [];
						for (i=0;i<itemList.length;i++) {
							//2차 기준 (1차 선택지가 있어야, 텅빈 건 제외)
							if (tempArr.indexOf(itemList[i][2]) == -1 && itemList[i][1] == value && itemList[i][0] == _objective_item_first.value && itemList[i][2] != "") {
								tempArr.push(itemList[i][2]);
							}
						}
							//두번째 탐색 비우고 새로 입력
							var dropdown = _objective_item_third;
							clearSelect(dropdown);
							
							var option = document.createElement("option");
							option.value = "";
							option.text = "모든 " + value + " 아이템";
							dropdown.add(option);
							
							var option = document.createElement("option");
							option.value = "";
							option.disabled = "disabled";
							option.text = "===============";
							dropdown.add(option);
							
							for (i=0;i<tempArr.length;i++) {
								var option = document.createElement("option");
								option.value = tempArr[i];
								option.text = tempArr[i];
								dropdown.add(option);
							}
					}
				}
				
				_objective_item_third.onchange = function() {
					var value = _objective_item_third.value;
					//1. 네번째 '무조건' 초기화
						//나머지 탐색 선택지 초기화
						_objective_item_name.selectedIndex = 0;
						//나머지 필더링 비활성화
						_objective_item_name.disabled = "disabled";
						//select 배경색 변경
						_objective_item_name.style.backgroundColor = "white";
						//네번째 탐색 비우고 새로 입력
						var dropdown = _objective_item_name;
						clearSelect(dropdown);
						
						var option = document.createElement("option");
						option.value = "";
						option.text = "모든 에픽 아이템";
						dropdown.add(option);
					//2. 첫번째 값이 있으면 두번째 생성
					if (value != "") {
						//두번째 탐색 배경색 변경
						_objective_item_name.style.backgroundColor = "#F4FA58";
						//두번째 탐색 활성화
						_objective_item_name.disabled = "";
						//첫번째 탐색을 기준으로 두번째 탐색 구성
						var tempArr = [[],[],[]];//[0] : 명칭, [1] : 레벨, [2] : 세트
						for (i=0;i<itemList.length;i++) {
							//이름 기준 (나머지 선택지가 있어야, 텅빈 건 제외)
							if (tempArr[0].indexOf(itemList[i][4]) == -1 && itemList[i][2] == value && itemList[i][1] == _objective_item_second.value && itemList[i][0] == _objective_item_first.value && itemList[i][4] != "") {
								tempArr[0].push(itemList[i][4]);
								tempArr[1].push(itemList[i][3]);
								tempArr[2].push(itemList[i][5]);
							}
						}
							//두번째 탐색 비우고 새로 입력
							var dropdown = _objective_item_name;
							clearSelect(dropdown);
							
							var option = document.createElement("option");
							option.value = "";
							option.text = "모든 " + value + " 아이템";
							dropdown.add(option);
							
							var option = document.createElement("option");
							option.value = "";
							option.disabled = "disabled";
							option.text = "===============";
							dropdown.add(option);
							
							for (i=0;i<tempArr[0].length;i++) {
								var option = document.createElement("option");
								option.value = tempArr[0][i];
								if (tempArr[2][i] != "") {
									option.text = "Lv." + tempArr[1][i] + " | " + tempArr[0][i] + " (" + tempArr[2][i] + ")";
								} else {
									option.text = "Lv." + tempArr[1][i] + " | " + tempArr[0][i];
								}
								dropdown.add(option);
							}
					}
				}
				
				//final-1-1-0-2. 조건부 실행 - 세트 완성
				_objective_set_first.onchange = function() {
					var value = _objective_set_first.value;
					//1. 두번째 '무조건' 초기화
						//두번째 탐색 선택지 초기화
						_objective_set_name.selectedIndex = 0;
						//두번째 비활성화
						_objective_set_name.disabled = "disabled";
						//select 배경색 변경
						_objective_set_name.style.backgroundColor = "white";
						//두번째 탐색 비우고 새로 입력
						var dropdown = _objective_set_name;
						clearSelect(dropdown);
						
						var option = document.createElement("option");
						option.value = "";
						option.text = "모든 세트";
						dropdown.add(option);
					//2. 첫번째 값이 있으면 두번째 생성
					if (value != "") {
						//두번째 배경색 변경
						_objective_set_name.style.backgroundColor = "#F4FA58";
						//두번째 활성화
						_objective_set_name.disabled = "";
						//첫번째를 기준으로 두번째 구성
						var tempArr = [[],[]];//[0] : 세트 명칭, [1] : 레벨
						for (i=0;i<itemList.length;i++) {
							//이름 기준 (나머지 선택지가 있어야, 텅빈 건 제외)
							if (tempArr[0].indexOf(itemList[i][5]) == -1 && itemList[i][1] == value && itemList[i][5] != "") {
								tempArr[0].push(itemList[i][5]);
								tempArr[1].push(itemList[i][3]);
							}
						}
							//두번째 탐색 비우고 새로 입력
							var dropdown = _objective_set_name;
							clearSelect(dropdown);
							
							var option = document.createElement("option");
							option.value = "";
							option.text = "모든 " + value + " 세트";
							dropdown.add(option);
							
							var option = document.createElement("option");
							option.value = "";
							option.disabled = "disabled";
							option.text = "===============";
							dropdown.add(option);
							
							for (i=0;i<tempArr[0].length;i++) {
								var option = document.createElement("option");
								option.value = tempArr[0][i];
								option.text = "Lv." + tempArr[1][i] + " | " + tempArr[0][i];
								dropdown.add(option);
							}
					}
				}
				
				_objective_set_name.onchange = function() {
					temp2 = _set_table.getElementsByTagName("tbody")[0].getElementsByTagName("tr").length;
					for (i=0;i<temp2;i++) {
						if (document.getElementById("set_row_" + i.toString()).getElementsByTagName("td")[0].innerHTML.indexOf(_objective_set_name.value) != -1) {
							tr_set = document.getElementById("set_row_" + i.toString());
							break;
						}
					}
					if (tr_set.getElementsByTagName("td")[5].innerHTML != "") {
						alert("＊경고 : 해당 세트는 이미 완성되었습니다.\n대상 : \"" + _objective_set_name.value + "\"");
						_objective_set_name.selectedIndex = 0;
					}
				}
				
				//final-1-1-1. record 필터링
				_record_filter_first.onchange = function() {
					var sheet = document.getElementById("style_record_filter_first");
					var value = _record_filter_first.value;
					try {
					
						//1. 모든 필터링 해제 후 두번째, 세번째 '무조건' 초기화
							//필터링 해체
							document.getElementById("style_record_filter_first").innerHTML = "";
							document.getElementById("style_record_filter_second").innerHTML = "";
							document.getElementById("style_record_filter_third").innerHTML = "";
							//나머지 필터링 선택지 초기화
							_record_filter_second.selectedIndex = 0;
							_record_filter_third.selectedIndex = 0;
							//나머지 필더링 비활성화
							_record_filter_second.disabled = "disabled";
							_record_filter_third.disabled = "disabled";
							//select 배경색 변경
							_record_filter_first.style.backgroundColor = "white";
							_record_filter_second.style.backgroundColor = "white";
							_record_filter_third.style.backgroundColor = "white";
							//두번째 필터링 비우고 새로 입력
							var dropdown = _record_filter_second;
							clearSelect(dropdown);
							
							var option = document.createElement("option");
							option.value = "";
							option.text = "2차 분류 (전체 보기)";
							dropdown.add(option);
							//세번째 필터링 비우고 새로 입력
							var dropdown = _record_filter_third;
							clearSelect(dropdown);
							
							var option = document.createElement("option");
							option.value = "";
							option.text = "3차 분류 (전체 보기)";
							dropdown.add(option);
						//2. 첫번째 값이 있으면 (필터링 후) 두번째 생성
						if (_record_filter_first.value != "") {
							//필터링 적용
							sheet.innerHTML = "\
							#record span.equip:not(." + value + ") {\
								display:none;\
							}";
							//select 배경색 변경
							_record_filter_first.style.backgroundColor = "#F4FA58";
							//두번째 필터링 활성화
							_record_filter_second.disabled = "";
							//첫번째 필터를 기준으로 두번째 필터링 구성
							var tempArr = [];
							for (i=0;i<itemList.length;i++) {
								//2차 기준 (1차 선택지가 있어야, 텅빈 건 제외)
								if (tempArr.indexOf(itemList[i][1]) == -1 && itemList[i][0] == value && itemList[i][1] != "") {
									tempArr.push(itemList[i][1]);
								}
							}
							//두번째 필터링 비우고 새로 입력
							var dropdown = _record_filter_second;
							clearSelect(dropdown);
							
							var option = document.createElement("option");
							option.value = "";
							option.text = "2차 분류 (전체 보기)";
							dropdown.add(option);
							
							var option = document.createElement("option");
							option.value = "";
							option.disabled = "disabled";
							option.text = "===============";
							dropdown.add(option);
							
							for (i=0;i<tempArr.length;i++) {
								var option = document.createElement("option");
								option.value = tempArr[i];
								option.text = tempArr[i];
								dropdown.add(option);
							}
						}
						
					} catch(e) {
						alert("＊경고 : \"1차 분류\" 필터링을 사용할 수 없습니다.\n(브라우저가 특정 기능을 지원하지 않습니다.)");
						_record_filter_first.selectedIndex = 0;
					}
				}
				
				_record_filter_second.onchange = function() {
					var sheet = document.getElementById("style_record_filter_second");
					var value = _record_filter_second.value;
					try {
						//1. 모든 필터링 해제 후 세번째 '무조건' 초기화
							//필터링 해체
							document.getElementById("style_record_filter_second").innerHTML = "";
							document.getElementById("style_record_filter_third").innerHTML = "";
							//나머지 필터링 선택지 초기화
							_record_filter_third.selectedIndex = 0;
							//두번째 필더링 비활성화
							_record_filter_third.disabled = "disabled";
							//select 배경색 복구
							_record_filter_second.style.backgroundColor = "white";
							_record_filter_third.style.backgroundColor = "white";
							//세번째 필터링 비우고 새로 입력
							var dropdown = _record_filter_third;
							clearSelect(dropdown);
							
							var option = document.createElement("option");
							option.value = "";
							option.text = "3차 분류 (전체 보기)";
							dropdown.add(option);
						
						
						//2. 두번째 값이 있으면 (필터링 후) 세번째 생성
						if (_record_filter_second.value != "") {
							//필터링 적용
							sheet.innerHTML = "\
							#record span.equip:not(." + value + ") {\
								display:none;\
							}";
							//select 배경색 변경
							_record_filter_second.style.backgroundColor = "#F4FA58";
							//두번째 필터링 활성화
							_record_filter_third.disabled = "";
							//두번째 필터를 기준으로 세번째 필터링 구성
							var tempArr = [];
							for (i=0;i<itemList.length;i++) {
								//3차 기준 (2차 선택지가 있어야, 텅빈 건 제외)
								if (tempArr.indexOf(itemList[i][2]) == -1 && itemList[i][1] == value && itemList[i][2] != "") {
									tempArr.push(itemList[i][2]);
								}
							}
							//세번째 필터링 비우고 새로 입력
							var dropdown = _record_filter_third;
							clearSelect(dropdown);
							
							var option = document.createElement("option");
							option.value = "";
							option.text = "3차 분류 (전체 보기)";
							dropdown.add(option);
							
							var option = document.createElement("option");
							option.value = "";
							option.disabled = "disabled";
							option.text = "===============";
							dropdown.add(option);
							
							for (i=0;i<tempArr.length;i++) {
								var option = document.createElement("option");
								option.value = tempArr[i];
								option.text = tempArr[i];
								dropdown.add(option);
							}
						}
						
					} catch(e) {
						alert("＊경고 : \"2차 분류\" 필터링을 사용할 수 없습니다.\n(브라우저가 특정 기능을 지원하지 않습니다.)");
						_record_filter_second.selectedIndex = 0;
					}
				}
				
				_record_filter_third.onchange = function() {
					var sheet = document.getElementById("style_record_filter_second");
					var value = _record_filter_third.value;
					try {
						//필터링 적용
						if (_record_filter_third.value != "") {
							sheet.innerHTML = "\
							#record span.equip:not(." + value + ") {\
								display:none;\
							}";
							//select 배경색 변경
							_record_filter_third.style.backgroundColor = "#F4FA58";
						} else {
							//필터링 해제
							sheet.innerHTML = "";
							//select 배경색 복구
							_record_filter_third.style.backgroundColor = "white";
						}
						
					} catch(e) {
						alert("＊경고 : \"3차 분류\" 필터링을 사용할 수 없습니다.\n(브라우저가 특정 기능을 지원하지 않습니다.)");
						_record_filter_second.selectedIndex = 0;
					}
				}
				
				_record_filter_level.onchange = function() {
					var sheet = document.getElementById("style_record_filter_level");
					var value = "lv" + _record_filter_level.value;
					try {
						//필터링 적용
						if (_record_filter_level.value != "") {
							sheet.innerHTML = "\
							#record span.equip:not(." + value + ") {\
								display:none;\
							}";
							//select 배경색 변경
							_record_filter_level.style.backgroundColor = "#F4FA58";
						} else {
							sheet.innerHTML = "";
							//select 배경색 복구
							_record_filter_level.style.backgroundColor = "white";
						}
					} catch(e) {
						alert("＊경고 : \"레벨 분류\" 필터링을 사용할 수 없습니다.\n(브라우저가 특정 기능을 지원하지 않습니다.)");
						_record_filter_level.selectedIndex = 0;
					}
				}
				
				_record_filter_clear.onclick = function() {
					//필터링 해제
					document.getElementById("style_record_filter_first").innerHTML = "";
					document.getElementById("style_record_filter_second").innerHTML = "";
					document.getElementById("style_record_filter_third").innerHTML = "";
					document.getElementById("style_record_filter_level").innerHTML = "";
					//필터링 선택지 복구
					_record_filter_first.selectedIndex = 0;
					_record_filter_second.selectedIndex = 0;
					_record_filter_third.selectedIndex = 0;
					_record_filter_level.selectedIndex = 0;
					//select 배경색 복구
					_record_filter_first.style.backgroundColor = "white";
					_record_filter_second.style.backgroundColor = "white";
					_record_filter_third.style.backgroundColor = "white";
					_record_filter_level.style.backgroundColor = "white";
					//첫번째, 레벨을 제외한 나머지 select 비활성화
					_record_filter_second.disabled = "disabled";
					_record_filter_third.disabled = "disabled";
				}

				//final-1-1-2. inventory 필터링
				_inventory_filter_first.onchange = function() {
					var sheet = document.getElementById("style_inventory_filter_first");
					var value = _inventory_filter_first.value;
					try {
						//1. 모든 필터링 해제 후 두번째, 세번째 '무조건' 초기화
							//필터링 해체
							document.getElementById("style_inventory_filter_first").innerHTML = "";
							document.getElementById("style_inventory_filter_second").innerHTML = "";
							document.getElementById("style_inventory_filter_third").innerHTML = "";
							//나머지 필터링 선택지 초기화
							_inventory_filter_second.selectedIndex = 0;
							_inventory_filter_third.selectedIndex = 0;
							//나머지 필더링 비활성화
							_inventory_filter_second.disabled = "disabled";
							_inventory_filter_third.disabled = "disabled";
							//select 배경색 변경
							_inventory_filter_first.style.backgroundColor = "white";
							_inventory_filter_second.style.backgroundColor = "white";
							_inventory_filter_third.style.backgroundColor = "white";
							//두번째 필터링 비우고 새로 입력
							var dropdown = _inventory_filter_second;
							clearSelect(dropdown);
							
							var option = document.createElement("option");
							option.value = "";
							option.text = "2차 분류 (전체 보기)";
							dropdown.add(option);
							//세번째 필터링 비우고 새로 입력
							var dropdown = _inventory_filter_third;
							clearSelect(dropdown);
							
							var option = document.createElement("option");
							option.value = "";
							option.text = "3차 분류 (전체 보기)";
							dropdown.add(option);
						//2. 첫번째 값이 있으면 (필터링 후) 두번째 생성
						if (_inventory_filter_first.value != "") {
							//필터링 적용
							sheet.innerHTML = "\
							#inventory_display table tr:not(." + value + ") {\
								display:none;\
							}";
							//select 배경색 변경
							_inventory_filter_first.style.backgroundColor = "#F4FA58";
							//두번째 필터링 활성화
							_inventory_filter_second.disabled = "";
							//첫번째 필터를 기준으로 두번째 필터링 구성
							var tempArr = [];
							for (i=0;i<itemList.length;i++) {
								//2차 기준 (1차 선택지가 있어야, 텅빈 건 제외)
								if (tempArr.indexOf(itemList[i][1]) == -1 && itemList[i][0] == value && itemList[i][1] != "") {
									tempArr.push(itemList[i][1]);
								}
							}
							//두번째 필터링 비우고 새로 입력
							var dropdown = _inventory_filter_second;
							clearSelect(dropdown);
							
							var option = document.createElement("option");
							option.value = "";
							option.text = "2차 분류 (전체 보기)";
							dropdown.add(option);
							
							var option = document.createElement("option");
							option.value = "";
							option.disabled = "disabled";
							option.text = "===============";
							dropdown.add(option);
							
							for (i=0;i<tempArr.length;i++) {
								var option = document.createElement("option");
								option.value = tempArr[i];
								option.text = tempArr[i];
								dropdown.add(option);
							}
						}
						
					} catch(e) {
						alert("＊경고 : \"1차 분류\" 필터링을 사용할 수 없습니다.\n(브라우저가 특정 기능을 지원하지 않습니다.)");
						_inventory_filter_first.selectedIndex = 0;
					}
				}
				
				_inventory_filter_second.onchange = function() {
					var sheet = document.getElementById("style_inventory_filter_second");
					var value = _inventory_filter_second.value;
					try {
						//1. 모든 필터링 해제 후 세번째 '무조건' 초기화
							//필터링 해체
							document.getElementById("style_inventory_filter_second").innerHTML = "";
							document.getElementById("style_inventory_filter_third").innerHTML = "";
							//나머지 필터링 선택지 초기화
							_inventory_filter_third.selectedIndex = 0;
							//두번째 필더링 비활성화
							_inventory_filter_third.disabled = "disabled";
							//select 배경색 복구
							_inventory_filter_second.style.backgroundColor = "white";
							_inventory_filter_third.style.backgroundColor = "white";
							//세번째 필터링 비우고 새로 입력
							var dropdown = _inventory_filter_third;
							clearSelect(dropdown);
							
							var option = document.createElement("option");
							option.value = "";
							option.text = "3차 분류 (전체 보기)";
							dropdown.add(option);
						
						
						//2. 두번째 값이 있으면 (필터링 후) 세번째 생성
						if (_inventory_filter_second.value != "") {
							//필터링 적용
							sheet.innerHTML = "\
							#inventory_display table tr:not(." + value + ") {\
								display:none;\
							}";
							//select 배경색 변경
							_inventory_filter_second.style.backgroundColor = "#F4FA58";
							//두번째 필터링 활성화
							_inventory_filter_third.disabled = "";
							//두번째 필터를 기준으로 세번째 필터링 구성
							var tempArr = [];
							for (i=0;i<itemList.length;i++) {
								//3차 기준 (2차 선택지가 있어야, 텅빈 건 제외)
								if (tempArr.indexOf(itemList[i][2]) == -1 && itemList[i][1] == value && itemList[i][2] != "") {
									tempArr.push(itemList[i][2]);
								}
							}
							//세번째 필터링 비우고 새로 입력
							var dropdown = _inventory_filter_third;
							clearSelect(dropdown);
							
							var option = document.createElement("option");
							option.value = "";
							option.text = "3차 분류 (전체 보기)";
							dropdown.add(option);
							
							var option = document.createElement("option");
							option.value = "";
							option.disabled = "disabled";
							option.text = "===============";
							dropdown.add(option);
							
							for (i=0;i<tempArr.length;i++) {
								var option = document.createElement("option");
								option.value = tempArr[i];
								option.text = tempArr[i];
								dropdown.add(option);
							}
						}
						
					} catch(e) {
						alert("＊경고 : \"2차 분류\" 필터링을 사용할 수 없습니다.\n(브라우저가 특정 기능을 지원하지 않습니다.)");
						_inventory_filter_second.selectedIndex = 0;
					}
				}
				
				_inventory_filter_third.onchange = function() {
					var sheet = document.getElementById("style_inventory_filter_second");
					var value = _inventory_filter_third.value;
					try {
						//필터링 적용
						if (_inventory_filter_third.value != "") {
							sheet.innerHTML = "\
							#inventory_display table tr:not(." + value + ") {\
								display:none;\
							}";
							//select 배경색 변경
							_inventory_filter_third.style.backgroundColor = "#F4FA58";
						} else {
							//필터링 해제
							sheet.innerHTML = "";
							//select 배경색 복구
							_inventory_filter_third.style.backgroundColor = "white";
						}
						
					} catch(e) {
						alert("＊경고 : \"3차 분류\" 필터링을 사용할 수 없습니다.\n(브라우저가 특정 기능을 지원하지 않습니다.)");
						_inventory_filter_second.selectedIndex = 0;
					}
				}
				
				_inventory_filter_level.onchange = function() {
					var sheet = document.getElementById("style_inventory_filter_level");
					var value = "lv" + _inventory_filter_level.value;
					try {
						//필터링 적용
						if (_inventory_filter_level.value != "") {
							sheet.innerHTML = "\
							#inventory_display table tr:not(." + value + ") {\
								display:none;\
							}";
							//select 배경색 변경
							_inventory_filter_level.style.backgroundColor = "#F4FA58";
						} else {
							sheet.innerHTML = "";
							//select 배경색 복구
							_inventory_filter_level.style.backgroundColor = "white";
						}
					} catch(e) {
						alert("＊경고 : \"레벨 분류\" 필터링을 사용할 수 없습니다.\n(브라우저가 특정 기능을 지원하지 않습니다.)");
						_inventory_filter_level.selectedIndex = 0;
					}
				}
				
				_inventory_filter_clear.onclick = function() {
					//필터링 해제
					document.getElementById("style_inventory_filter_first").innerHTML = "";
					document.getElementById("style_inventory_filter_second").innerHTML = "";
					document.getElementById("style_inventory_filter_third").innerHTML = "";
					document.getElementById("style_inventory_filter_level").innerHTML = "";
					//필터링 선택지 복구
					_inventory_filter_first.selectedIndex = 0;
					_inventory_filter_second.selectedIndex = 0;
					_inventory_filter_third.selectedIndex = 0;
					_inventory_filter_level.selectedIndex = 0;
					//select 배경색 복구
					_inventory_filter_first.style.backgroundColor = "white";
					_inventory_filter_second.style.backgroundColor = "white";
					_inventory_filter_third.style.backgroundColor = "white";
					_inventory_filter_level.style.backgroundColor = "white";
					//첫번째, 레벨을 제외한 나머지 select 비활성화
					_inventory_filter_second.disabled = "disabled";
					_inventory_filter_third.disabled = "disabled";
				}

				//final-1-1-2. set 필터링
				_set_filter_first.onchange = function() {
					var sheet = document.getElementById("style_set_filter_first");
					var value = _set_filter_first.value;
					try {
						//1. 모든 필터링 해제 후 두번째, 세번째 '무조건' 초기화
							//필터링 해체
							document.getElementById("style_set_filter_first").innerHTML = "";
							document.getElementById("style_set_filter_second").innerHTML = "";
							document.getElementById("style_set_filter_third").innerHTML = "";
							//나머지 필터링 선택지 초기화
							_set_filter_second.selectedIndex = 0;
							_set_filter_third.selectedIndex = 0;
							//나머지 필더링 비활성화
							_set_filter_second.disabled = "disabled";
							_set_filter_third.disabled = "disabled";
							//select 배경색 변경
							_set_filter_first.style.backgroundColor = "white";
							_set_filter_second.style.backgroundColor = "white";
							_set_filter_third.style.backgroundColor = "white";
							//두번째 필터링 비우고 새로 입력
							var dropdown = _set_filter_second;
							clearSelect(dropdown);
							
							var option = document.createElement("option");
							option.value = "";
							option.text = "2차 분류 (전체 보기)";
							dropdown.add(option);
							//세번째 필터링 비우고 새로 입력
							var dropdown = _set_filter_third;
							clearSelect(dropdown);
							
							var option = document.createElement("option");
							option.value = "";
							option.text = "3차 분류 (전체 보기)";
							dropdown.add(option);
						//2. 첫번째 값이 있으면 (필터링 후) 두번째 생성
						if (_set_filter_first.value != "") {
							//필터링 적용
							sheet.innerHTML = "\
							#set_display table tr:not(." + value + ") {\
								display:none;\
							}";
							//select 배경색 변경
							_set_filter_first.style.backgroundColor = "#F4FA58";
							//두번째 필터링 활성화
							_set_filter_second.disabled = "";
							//첫번째 필터를 기준으로 두번째 필터링 구성
							var tempArr = [];
							for (i=0;i<itemList.length;i++) {
								//2차 기준 (1차 선택지가 있어야, 텅빈 건 제외)
								if (tempArr.indexOf(itemList[i][1]) == -1 && itemList[i][0] == value && itemList[i][1] != "") {
									tempArr.push(itemList[i][1]);
								}
							}
							//두번째 필터링 비우고 새로 입력
							var dropdown = _set_filter_second;
							clearSelect(dropdown);
							
							var option = document.createElement("option");
							option.value = "";
							option.text = "2차 분류 (전체 보기)";
							dropdown.add(option);
							
							var option = document.createElement("option");
							option.value = "";
							option.disabled = "disabled";
							option.text = "===============";
							dropdown.add(option);
							
							for (i=0;i<tempArr.length;i++) {
								var option = document.createElement("option");
								option.value = tempArr[i];
								option.text = tempArr[i];
								dropdown.add(option);
							}
						}
						
					} catch(e) {
						alert("＊경고 : \"1차 분류\" 필터링을 사용할 수 없습니다.\n(브라우저가 특정 기능을 지원하지 않습니다.)");
						_set_filter_first.selectedIndex = 0;
					}
				}
				
				_set_filter_second.onchange = function() {
					var sheet = document.getElementById("style_set_filter_second");
					var value = _set_filter_second.value;
					try {
						//1. 모든 필터링 해제 후 세번째 '무조건' 초기화
							//필터링 해체
							document.getElementById("style_set_filter_second").innerHTML = "";
							document.getElementById("style_set_filter_third").innerHTML = "";
							//나머지 필터링 선택지 초기화
							_set_filter_third.selectedIndex = 0;
							//두번째 필더링 비활성화
							_set_filter_third.disabled = "disabled";
							//select 배경색 복구
							_set_filter_second.style.backgroundColor = "white";
							_set_filter_third.style.backgroundColor = "white";
							//세번째 필터링 비우고 새로 입력
							var dropdown = _set_filter_third;
							clearSelect(dropdown);
							
							var option = document.createElement("option");
							option.value = "";
							option.text = "3차 분류 (전체 보기)";
							dropdown.add(option);
						
						
						//2. 두번째 값이 있으면 (필터링 후) 세번째 생성
						if (_set_filter_second.value != "") {
							//필터링 적용
							sheet.innerHTML = "\
							#set_display table tr:not(." + value + ") {\
								display:none;\
							}";
							//select 배경색 변경
							_set_filter_second.style.backgroundColor = "#F4FA58";
							//두번째 필터링 활성화
							_set_filter_third.disabled = "";
							//두번째 필터를 기준으로 세번째 필터링 구성
							var tempArr = [];
							for (i=0;i<itemList.length;i++) {
								//3차 기준 (2차 선택지가 있어야, 텅빈 건 제외)
								if (tempArr.indexOf(itemList[i][2]) == -1 && itemList[i][1] == value && itemList[i][2] != "") {
									tempArr.push(itemList[i][2]);
								}
							}
							//세번째 필터링 비우고 새로 입력
							var dropdown = _set_filter_third;
							clearSelect(dropdown);
							
							var option = document.createElement("option");
							option.value = "";
							option.text = "3차 분류 (전체 보기)";
							dropdown.add(option);
							
							var option = document.createElement("option");
							option.value = "";
							option.disabled = "disabled";
							option.text = "===============";
							dropdown.add(option);
							
							for (i=0;i<tempArr.length;i++) {
								var option = document.createElement("option");
								option.value = tempArr[i];
								option.text = tempArr[i];
								dropdown.add(option);
							}
						}
						
					} catch(e) {
						alert("＊경고 : \"2차 분류\" 필터링을 사용할 수 없습니다.\n(브라우저가 특정 기능을 지원하지 않습니다.)");
						_set_filter_second.selectedIndex = 0;
					}
				}
				
				_set_filter_third.onchange = function() {
					var sheet = document.getElementById("style_set_filter_second");
					var value = _set_filter_third.value;
					try {
						//필터링 적용
						if (_set_filter_third.value != "") {
							sheet.innerHTML = "\
							#set_display table tr:not(." + value + ")  {\
								display:none;\
							}\
							#set_display table tr:not(." + _set_filter_second.value + ")  {\
								display:none;\
							}\
							#set_display table tr.hap:not(." + _set_filter_second.value + ")  {\
								display:none;\
							}";
							//select 배경색 변경
							_set_filter_third.style.backgroundColor = "#F4FA58";
						} else {
							//필터링 해제
							sheet.innerHTML = "";
							//select 배경색 복구
							_set_filter_third.style.backgroundColor = "white";
						}
						
					} catch(e) {
						alert("＊경고 : \"3차 분류\" 필터링을 사용할 수 없습니다.\n(브라우저가 특정 기능을 지원하지 않습니다.)");
						_set_filter_second.selectedIndex = 0;
					}
				}
				
				_set_filter_level.onchange = function() {
					var sheet = document.getElementById("style_set_filter_level");
					var value = "lv" + _set_filter_level.value;
					try {
						//필터링 적용
						if (_set_filter_level.value != "") {
							sheet.innerHTML = "\
							#set_display table tr:not(." + value + ") {\
								display:none;\
							}";
							//select 배경색 변경
							_set_filter_level.style.backgroundColor = "#F4FA58";
						} else {
							//필터링 해제
							document.getElementById("style_set_filter_level").innerHTML = "";
							//select 배경색 복구
							_set_filter_level.style.backgroundColor = "white";
						}
					} catch(e) {
						alert("＊경고 : \"레벨 분류\"필터링을 사용할 수 없습니다.\n(브라우저가 특정 기능을 지원하지 않습니다.)");
						_set_filter_level.selectedIndex = 0;
					}
				}
				
				_set_filter_clear.onclick = function() {
					//필터링 해제
					document.getElementById("style_set_filter_first").innerHTML = "";
					document.getElementById("style_set_filter_second").innerHTML = "";
					document.getElementById("style_set_filter_third").innerHTML = "";
					document.getElementById("style_set_filter_level").innerHTML = "";
					//필터링 선택지 복구
					_set_filter_first.selectedIndex = 0;
					_set_filter_second.selectedIndex = 0;
					_set_filter_third.selectedIndex = 0;
					_set_filter_level.selectedIndex = 0;
					//select 배경색 복구
					_set_filter_first.style.backgroundColor = "white";
					_set_filter_second.style.backgroundColor = "white";
					_set_filter_third.style.backgroundColor = "white";
					_set_filter_level.style.backgroundColor = "white";
					//첫번째, 레벨을 제외한 나머지 select 비활성화
					_set_filter_second.disabled = "disabled";
					_set_filter_third.disabled = "disabled";
				}

				//1-1-2. 체크박스
				_record_check_cost.setAttribute('checked', 'checked');//수동 체크 설정 : IE8용
				_record_check_cost.onclick = function() {
					var sheet = document.getElementById("style_record_check_cost");
					try {
						if (_record_check_cost.checked) {
							sheet.innerHTML = "\
							#record span.cost {\
								display:inline;\
							}";
						} else {
							sheet.innerHTML = "";
						}
					} catch(e) {
						alert("＊경고 : \"소모 초대장\" 설정을 변경할 수 없습니다.\n(브라우저가 특정 기능을 지원하지 않습니다.)");
						_record_check_cost.checked = false;
					}
				}
				_record_check_difficulty.setAttribute('checked', 'checked');//수동 체크 설정 : IE8용
				_record_check_difficulty.onclick = function() {
					var sheet = document.getElementById("style_record_check_difficulty");
					try {
						if (_record_check_difficulty.checked) {
							sheet.innerHTML = "#record span.difficulty_0, #record span.difficulty_1 {\
								display:inline;\
							}";
						} else {
							sheet.innerHTML = "";
						}
					} catch(e) {
						alert("＊경고 : \"획득 난이도\" 설정을 변경할 수 없습니다.\n(브라우저가 특정 기능을 지원하지 않습니다.)");
						_record_check_difficulty.checked = false;
					}
				}
				_record_check_quantity.setAttribute('checked', 'checked');//수동 체크 설정 : IE8용
				_record_check_quantity.onclick = function() {
					
					var sheet = document.getElementById("style_record_check_quantity");
					try {
						if (_record_check_quantity.checked) {
							sheet.innerHTML = "#record span.quantity {\
								display:inline;\
							}";
						} else {
							sheet.innerHTML = "";
						}
					} catch(e) {
						alert("＊경고 : \"중복 횟수\" 설정을 변경할 수 없습니다.\n(브라우저가 특정 기능을 지원하지 않습니다.)");
						_record_check_quantity.checked = false;
					}
				}
				
				_inventory_check_cost.onclick = function() {
					var sheet = document.getElementById("style_inventory_check_cost");
					try {
						if (_inventory_check_cost.checked) {
							sheet.innerHTML = "#inventory_display table .col_6 span.cost {\
								display:inline;\
							}";
						} else {
							sheet.innerHTML = "";
						}
					} catch(e) {
						alert("＊경고 : \"첫 획득시 소모 초대장\" 설정을 변경할 수 없습니다.\n(브라우저가 특정 기능을 지원하지 않습니다.)");
						_inventory_check_cost.checked = false;
					}
				}
				_inventory_check_all.onclick = function() {
					var sheet = document.getElementById("style_inventory_check_all");
					try {
						if (_inventory_check_all.checked) {
							sheet.innerHTML = "#inventory_display table tr.not_show {\
								display:inline;\
							}";
						} else {
							sheet.innerHTML = "";
						}
					} catch(e) {
						alert("＊경고 : \"모든 아이템 보기\" 설정을 변경할 수 없습니다.\n(브라우저가 특정 기능을 지원하지 않습니다.)");
						_inventory_check_all.checked = false;
					}
				}
				
				_set_check_cost.onclick = function() {
					var sheet = document.getElementById("style_set_check_cost");
					try {
						if (_set_check_cost.checked) {
							sheet.innerHTML = "#set_display table .col_6 span.cost {\
								display:inline;\
							}";
						} else {
							sheet.innerHTML = "";
						}
					} catch(e) {
						alert("＊경고 : \"첫 획득시 소모 초대장\" 설정을 변경할 수 없습니다.\n(브라우저가 특정 기능을 지원하지 않습니다.)");
						_set_check_cost.checked = false;
					}
				}
				_set_check_all.onclick = function() {
					var sheet = document.getElementById("style_set_check_all");
					try {
						if (_set_check_all.checked) {
							sheet.innerHTML = "#set_display table tr.not_show {\
								display:inline;\
							}";
						} else {
							sheet.innerHTML = "";
						}
					} catch(e) {
						alert("＊경고 : \"모든 아이템&세트\" 설정을 변경할 수 없습니다.\n(브라우저가 특정 기능을 지원하지 않습니다.)");
						_set_check_all.checked = false;
					}
				}
				_set_check_only.onclick = function() {
					var sheet = document.getElementById("style_set_check_only");
					try {
						if (_set_check_only.checked) {
							sheet.innerHTML = "#set_display table tr:not(.hap) {\
								display:none;\
							}";
						} else {
							sheet.innerHTML = "";
						}
					} catch(e) {
						alert("＊경고 : \"세트만 보기\" 설정을 변경할 수 없습니다.\n(브라우저가 특정 기능을 지원하지 않습니다.)");
						_set_check_only.checked = false;
					}
				}
				
				//번외-1. 획득 기록 초기화 버튼
				_record_check_reset.onclick = function() {
					if (confirm("\n획득 기록을 초기화하시겠습니까?\
						\n˙(각종 아이템 획득 및 소모 도전장 수치, 인벤토리, 세트 아이템 창은 초기화되지 않습니다)")) {
						_record.innerHTML = "";
					}
				}
				//번외-2. 해체 경고창 관련 체크박스
				_inventory_check_confirm.onclick = function() {
					if (_inventory_check_confirm.checked) {
						_set_check_confirm.checked = true;
					} else {
						_set_check_confirm.checked = false;
					}
				}
				_set_check_confirm.onclick = function() {
					if (_set_check_confirm.checked) {
						_inventory_check_confirm.checked = true;
					} else {
						_inventory_check_confirm.checked = false;
					}
				}
				//번외-3. 중복 에픽 일괄 해체
				_disassemble_1.onclick = function() {
					var temp = 0;
					for (i=0;i<itemList.length;i++) {
						if (itemList[i][9] > 1) {//2개 이상 보유 시
							temp += itemList[i][9] - 1;
						}
					}
					if (temp == 0) {
						alert("※ 경고 : 현재 중복 에픽 아이템이 없습니다.");
						return;
					} else if (confirm("\n중복 에픽 아이템을 각각 하나씩만 남기고 모두 해체하시겠습니까?\
					\n(총 " + temp.toString() + "개의 에픽 아이템이 해체됩니다.)")) {
						var not_checked = 0;
						if (! _inventory_check_confirm.checked || ! _set_check_confirm.checked) {
							not_checked = 1;//"해체 경고창 출력여부 체크박스" 상태 저장(1 : 켜져있었음)
							_set_check_confirm.checked = true;
							_inventory_check_confirm.checked = true;
						}
						for (i=0;i<itemList.length;i++) {
							if (itemList[i][9] > 1) {//2개 이상 보유 시
								recycle(i,itemList[i][9]-1)//1개만 남기고 모조리 해체
							}
						}
						//꺼둔 "해체 경고창 출력여부 체크박스" 다시 켜기
						if (not_checked == 1) {
							_set_check_confirm.checked = false;
							_inventory_check_confirm.checked = false;
						}
						alert("\"중복 에픽 아이템 일괄 해체\"가 완료되었습니다.\
						\n(실질 소모 초대장 감소 : " + thousand(temp*cutList[2]) + "장)\
						\n(실질 골드 환산 감소 : " + setWon(temp*cutList[2]*gold) + " Gold)");
					}
				}
				_disassemble_2.onclick = function() {
					var temp = 0;
					for (i=0;i<itemList.length;i++) {
						if (itemList[i][5] != "" && itemList[i][9] > 1) {//2개 이상 보유 시
							temp += itemList[i][9] - 1;
						}
					}
					if (temp == 0) {
						alert("※ 경고 : 현재 중복 세트 아이템이 없습니다.");
						return;
					} else if (confirm("\n중복 세트 아이템들을 각각 하나씩만 남기고 모두 해체하시겠습니까?\
					\n(총 " + temp.toString() + "개의 세트 아이템이 해체됩니다.)")) {
						var not_checked = 0;
						if (! _inventory_check_confirm.checked || ! _set_check_confirm.checked) {
							not_checked = 1;//"해체 경고창 출력여부 체크박스" 상태 저장(1 : 켜져있었음)
							_set_check_confirm.checked = true;
							_inventory_check_confirm.checked = true;
						}
						for (i=0;i<itemList.length;i++) {
							if (itemList[i][5] != "" && itemList[i][9] > 1) {//2개 이상 보유 시
								recycle(i,itemList[i][9]-1)//1개만 남기고 모조리 해체
							}
						}
						//꺼둔 "해체 경고창 출력여부 체크박스" 다시 켜기
						if (not_checked == 1) {
							_set_check_confirm.checked = false;
							_inventory_check_confirm.checked = false;
						}
						alert("\"중복 세트 아이템 일괄 해체\"가 완료되었습니다.\
						\n(실질 소모 초대장 감소 : " + thousand(temp*cutList[2]) + "장)\
						\n(실질 골드 환산 감소 : " + setWon(temp*cutList[2]*gold) + " Gold)");
					}
				}
				
				//2. 버튼 세팅
				//1. frame_left
				//1-1. 던전 선택
				_dungeon.onchange = function() {
					dungeon_select();
				};
				//1-2. 실행
				_run1.onclick = function() {
					onoff(1);//버튼 잠그기
					getEpicList();//에픽 리스트 구축
					simulate(1);//실행
				};
				_run2.onclick = function() {
					if (running != 1) {//0 : 정지상태
						//목표 입력
						objective = [];//목표 초기화
						objective.push(_objective_list.value);//입력 1. 목표 명칭
						switch (objective[0]) {
							case "none":
								break;
							case "item":
								objective.push(_objective_item_first.value);//입력 2. 1차 분류
								objective.push(_objective_item_second.value);//입력 3. 2차 분류
								objective.push(_objective_item_third.value);//입력 4. 3차 분류
								objective.push(_objective_item_name.value);//입력 5. 아이템 명칭
								break;
							case "set":
								objective.push(_objective_set_first.value);//입력 2. 세트 분류
								objective.push(_objective_set_name.value);//입력 3. 세트 병칭
								break;
							case "count":
								if (_objective_count_text.value == "") {
									alert("＊경고 : 실행 횟수를 입력하세요.");
									return;
								} else if (! isNumber(_objective_count_text.value)) {
									alert("＊경고 : 실행 횟수는 숫자를 입력해야 합니다.");
									return;
								} else if (parseInt(_objective_count_text.value) <= 0) {
									alert("＊경고 : 실행 횟수는 0보다 커야 합니다.");
									return;
								}
								objective.push(parseInt(_objective_count_text.value));//입력 2. 실행 횟수
								objective.push(0);//입력 3. 현재 진행한 횟수
								break;
							case "cost":
								if (_objective_cost_text.value == "") {
									alert("＊경고 : 초대장 개수를 입력하세요.");
									return;
								} else if (! isNumber(_objective_cost_text.value)) {
									alert("＊경고 : 초대장 개수는 숫자를 입력해야 합니다.");
									return;
								} else if (parseInt(_objective_cost_text.value) <= 0) {
									alert("＊경고 : 초대장 개수는 0보다 커야 합니다.");
									return;
								} else if (parseInt(_objective_cost_text.value) < costList[input[0]]) {
									alert("＊경고 : 초대장 개수가 입장 조건(" + costList[input[0]] + "장)보다 부족합니다.");
									return;
								}
								objective.push(parseInt(_objective_cost_text.value));//입력 2. 초대장 제한
								objective.push(0);//입력 3. 현재 소모한 초대장
								break;
							case "fatigue":
								if (_objective_fatigue_max.value == "") {
									alert("＊경고 : 전체 피로도를 입력하세요.");
									return;
								} else 
								if (_objective_fatigue_per.value == "") {
									alert("＊경고 : 1회동 소모 피로도를 입력하세요.");
									return;
								} else 
								if (! isNumber(_objective_fatigue_max.value)) {
									alert("＊경고 : 전체 피로도는 숫자를 입력해야 합니다.");
									return;
								} else if (! isNumber(_objective_fatigue_per.value)) {
									alert("＊경고 : 1회당 소모 피로도는 숫자를 입력해야 합니다.");
									return;
								} else if (parseInt(_objective_fatigue_max.value) <= 0) {
									alert("＊경고 : 전체 피로도는 0보다 커야 합니다.");
									return;
								} else if (parseInt(_objective_fatigue_per.value) <= 0) {
									alert("＊경고 : 1회동 소모 피로도는 0보다 커야 합니다.");
									return;
								}
								objective.push(parseInt(_objective_fatigue_max.value));//입력 2. 전체 피로도
								objective.push(parseInt(_objective_fatigue_per.value));//입력 3. 1회당 소모 피로도
								objective.push(0);//입력 4. 현재 소모한 피로도
								break;
						}
						running = 1;//'자동 실행 변수' ON
						onoff(2);//버튼 잠그기
						getEpicList();//에픽 리스트 구축
						simulate(2);//실행
					} else {
						//메세지 출력
						_record.innerHTML += "<span class='system'>====================&lt;연속 실행 종료&gt;====================</span>";
						_record.innerHTML += "<span class='system'>※ 종료 조건 : 수동 정지</span>";
						_record.innerHTML += "<span class='system'>======================================================</span>";
						//final. 스크롤바 이동 (종료 메세지가 보이도록)
						_record.scrollTop = _record.scrollHeight;
						//뒷처리
						clearTimeout(autoRun);//자동실행 해제
						running = 0;//'자동 실행 변수' OFF
						thisTime = [];//'이번에 드랍한 아이템' 초기화
						objective = []//목표 초기화
						onoff(0);//잠긴 버튼 복구
					}
				};
				
				_cost_set_gold.onclick = function() {
					var challenge = prompt("도전장 가격을 입력하세요.\n(현재 가격 : " + thousand(gold) + " Gold)");
					if (! isNumber(challenge)) {
						alert("※ 경고 : 숫자를 입력하지 않았거나, 취소를 누르셨습니다.\n다시 시도해주세요.");
					} else {
						gold = challenge;
						_cost_gold.innerHTML = setWon(cost[0]*gold);
						_cost_gold_real.innerHTML = setWon(cost[1]*gold);
					}
				}
				
				_clear.onclick = function() {
					if (confirm("초기화를 하면 모든 획득 아이템 정보와 기록들이 사라집니다.\n'정말로' 초기화하시겠습니까?")) {
						//1. 자동재생 종료
						clearTimeout(autoDrop);
						clearTimeout(autoRun);
						//2. itemList 초기화
						for (i=0;i<itemList.length;i++) {
							itemList[i][8] = 0;
							itemList[i][9] = 0;
							itemList[i][10] = 0;
							itemList[i][11] = 0;
							itemList[i][12] = 0;
						};
						//3. 각종 변수 초기화
							count = 1;
							get = [0,0,0,0];
							cost = [0,0];
							search = ["","","",""];
							collect = 0;
							//2-1. 초기화된 변수 적용
							_message_count.innerHTML = "0";
							_message_difficulty.innerHTML = "";
							_result_epic.innerHTML = "0";
							_result_epic_real.innerHTML = "0";
							_result_soul.innerHTML = "0";
							_result_beed.innerHTML = "0";
							_cost_invitation.innerHTML = "0";
							_cost_real.innerHTML = "0";
							_cost_gold.innerHTML = "0";
							_cost_gold_real.innerHTML = "0";
							_inventory_check_collect.innerHTML = "0";
						//4. 결과물 창, 획득 기록 초기화
						resetShow();
						_record.innerHTML = "";
						//5. 인벤토리 초기화
						_inventory_table.innerHTML = "";
						generateInventory();
						
						//6. 세트아이템 초기화
						_set_table.innerHTML = "";
						generateSet();
						
						//7. 필터링 초기화
							//7-1. record 필터링 초기화
							//필터링 해제
							document.getElementById("style_record_filter_first").innerHTML = "";
							document.getElementById("style_record_filter_second").innerHTML = "";
							document.getElementById("style_record_filter_third").innerHTML = "";
							document.getElementById("style_record_filter_level").innerHTML = "";
							//필터링 선택지 복구
							_record_filter_first.selectedIndex = 0;
							_record_filter_second.selectedIndex = 0;
							_record_filter_third.selectedIndex = 0;
							_record_filter_level.selectedIndex = 0;
							//select 배경색 복구
							_record_filter_first.style.backgroundColor = "white";
							_record_filter_second.style.backgroundColor = "white";
							_record_filter_third.style.backgroundColor = "white";
							_record_filter_level.style.backgroundColor = "white";
							//첫번째, 레벨을 제외한 나머지 select 비활성화
							_record_filter_second.disabled = "disabled";
							_record_filter_third.disabled = "disabled";
							
							//7-2. inventory 필터링 초기화
							document.getElementById("style_inventory_filter_first").innerHTML = "";
							document.getElementById("style_inventory_filter_second").innerHTML = "";
							document.getElementById("style_inventory_filter_third").innerHTML = "";
							document.getElementById("style_inventory_filter_level").innerHTML = "";
							//필터링 선택지 복구
							_inventory_filter_first.selectedIndex = 0;
							_inventory_filter_second.selectedIndex = 0;
							_inventory_filter_third.selectedIndex = 0;
							_inventory_filter_level.selectedIndex = 0;
							//select 배경색 복구
							_inventory_filter_first.style.backgroundColor = "white";
							_inventory_filter_second.style.backgroundColor = "white";
							_inventory_filter_third.style.backgroundColor = "white";
							_inventory_filter_level.style.backgroundColor = "white";
							//첫번째, 레벨을 제외한 나머지 select 비활성화
							_inventory_filter_second.disabled = "disabled";
							_inventory_filter_third.disabled = "disabled";
							
							//7-3. set 필터링 초기화
							document.getElementById("style_set_filter_first").innerHTML = "";
							document.getElementById("style_set_filter_second").innerHTML = "";
							document.getElementById("style_set_filter_third").innerHTML = "";
							document.getElementById("style_set_filter_level").innerHTML = "";
							//필터링 선택지 복구
							_set_filter_first.selectedIndex = 0;
							_set_filter_second.selectedIndex = 0;
							_set_filter_third.selectedIndex = 0;
							_set_filter_level.selectedIndex = 0;
							//select 배경색 복구
							_set_filter_first.style.backgroundColor = "white";
							_set_filter_second.style.backgroundColor = "white";
							_set_filter_third.style.backgroundColor = "white";
							_set_filter_level.style.backgroundColor = "white";
							//첫번째, 레벨을 제외한 나머지 select 비활성화
							_set_filter_second.disabled = "disabled";
							_set_filter_third.disabled = "disabled";
							
						//8. 버튼 정상화
						onoff(0);
					}
				}
				//2-2. frame_right
				_shift1.onclick = function() {
					if (right_display != "record") {
						right_display = "record";
						_frame_right_title.className = "title_record";//클래스 설정 이유 : 배경이미지 변경
						_frame_right_title.innerHTML = "획득 정보";
						
						_shift1.className = "selected";
						_shift2.className = "";
						_shift3.className = "";
						
						_record_filter.style.display = "block";
						_inventory_filter.style.display = "none";
						_set_filter.style.display = "none";
						
						_record.style.display = "block";
						_inventory.style.display = "none";
						_set.style.display = "none";
						
						_record_check.style.display = "block";
						_inventory_check.style.display = "none";
						_set_check.style.display = "none";
					}
				}
				
				_shift2.onclick = function() {
					if (right_display != "inventory") {
						right_display = "inventory";
						_frame_right_title.className = "title_inventory";//클래스 설정 이유 : 배경이미지 변경
						_frame_right_title.innerHTML = "인벤토리";
						
						_shift1.className = "";
						_shift2.className = "selected";
						_shift3.className = "";
						
						_record_filter.style.display = "none";
						_inventory_filter.style.display = "block";
						_set_filter.style.display = "none";
						
						_record.style.display = "none";
						_inventory.style.display = "block";
						_set.style.display = "none";
						
						_record_check.style.display = "none";
						_inventory_check.style.display = "block";
						_set_check.style.display = "none";
					}
				}
				
				_shift3.onclick = function() {
					if (right_display != "set") {
						right_display = "set";
						_frame_right_title.className = "title_set";//클래스 설정 이유 : 배경이미지 변경
						_frame_right_title.innerHTML = "세트 아이템";
						
						_shift1.className = "";
						_shift2.className = "";
						_shift3.className = "selected";
						
						_record_filter.style.display = "none";
						_inventory_filter.style.display = "none";
						_set_filter.style.display = "block";
						
						_record.style.display = "none";
						_inventory.style.display = "none";
						_set.style.display = "block";
						
						_record_check.style.display = "none";
						_inventory_check.style.display = "none";
						_set_check.style.display = "block";
					}
				}
			
			
		});	
	});	
}
