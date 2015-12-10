//=================================================================================================================
//※ 변수 지정
//=================================================================================================================
var i, temp, temp2; //임시 변수
var auto;
var answer; //추천 결과물

var images = "./images/m_jum/";
var imageList = []; //이미지 선로딩용 임시저장소

	//=================================================================================================================
	//※ DOM 변수 지정
	//=================================================================================================================
	var wrapper = document.getElementById("wrapper");
	var top = document.getElementById("top");
			var top_inner = document.getElementById("top_inner");
		var result = document.getElementById("result");
			var result_num1 = document.getElementById("result_num1");
			var result_num2 = document.getElementById("result_num2");
			var result_flash = document.getElementById("result_flash");

	var character = document.getElementById("character");
	var text = document.getElementById("text");

	var footer = document.getElementById("footer");
		var progress = document.getElementById("progress");
		var click = document.getElementById("click");
	
	var imagePreloader = document.getElementById("imagePreloader");
	
//=================================================================================================================
//※ 자료
//=================================================================================================================
var channelList= [//서버별 채널 리스트
	1,6,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,56//
];

var showText = [
	"어서 오거라. 이 몸이 그대에게 좋은 <span class='orange'>채널</span> 하나를 점지해주겠다.<br/>\
	<span class='green'>&lt;범위 : 서버 공통(1, 6, 56, 10~35)&gt;</span>",//첫 화면 텍스트
	"사신 드레이퓨스 님께서 길한 채널을 살펴보는 중입니다.",//로딩 중 텍스트
	"번 채널이 길한 듯 하다. 그곳에서 행운을 만끽하도록 하거라."//결과물
];

//=================================================================================================================
//※ 퍼온 함수
//=================================================================================================================
function loadImages(arr,callBack){ // 이미지 불러오기

	//출처 : http://stackoverflow.com/questions/8264528/image-preloader-javascript-that-supports-eventNames/8265310#8265310
	var imagesArray = [];
	var img;
	var remaining = arr.length;
	for (var i = 0; i < arr.length; i++) {
		img = new Image();
		img.onload = function() {
			//외부 처리 
			text.innerHTML = "\
			로딩 중 ("+Math.round((((arr.length - remaining + 1)/arr.length)*100),0).toString()+"%)";
			progress.style.width = Math.round((((arr.length - remaining + 1)/arr.length)*100),0) + "%";
			//내부 처리
			--remaining;
			if (remaining <= 0) {
				callBack();
			};
		};
		img.onerror = function() {
			//외부 처리 
			text.innerHTML = "\
			로딩 중 ("+Math.round((((arr.length - remaining + 1)/arr.length)*100),0).toString()+"%)";
			progress.style.width = Math.round((((arr.length - remaining + 1)/arr.length)*100),0) + "%";
			--remaining;
			if (remaining <= 0) {
				callBack();
			};
		};
		img.src = arr[i];
		imagePreloader.innerHTML += "\
		<img src='" + img.src + "'>";
		imagesArray.push(img);
	};
	
};



//=================================================================================================================
//※ 함수 설정
//=================================================================================================================
function main() {
	//텍스트 변경
	text.innerHTML = showText[1];
	//로딩 바 세팅
	click.style.display = "none";
	progress.style.display = "block";
	check();
	//플래시 미리 불러오기 (로딩을 위해)
	result_flash.src = result_flash.src.replace(/\?.*$/,"")+"?x="+Math.random();
};

function check() {
	if (progress.offsetWidth < footer.offsetWidth) {
		progress.style.width = ((progress.offsetWidth/footer.offsetWidth)*100 + 2).toString() + "%";
		auto = setTimeout(function() {
				check();
			},50);
	} else {//로딩 완료 시
		//로딩 바 제거
		progress.style.width = "0px";//차후 로딩을 위해 길이 초기화
		progress.style.display = "none";
		//텍스트 제거
		text.innerHTML = "";
		//결과 창 출력
		result.style.display = "inline-block";//가운데 정렬을 하기 위해
		//다음 함수 실행
		open();
	};
}

function open() {
	if (result.offsetWidth < wrapper.offsetWidth) {
		result.style.width = (((result.offsetWidth/wrapper.offsetWidth) + 0.1)*wrapper.offsetWidth).toString() + "px";
		//result.style.width = ((result.offsetWidth/wrapper.offsetWidth)*100 + 5).toString() + "%";
		auto = setTimeout(function() {
				open();
			},50);
	} else {
		//(혹시나 모르니 길이 재조절)
		result.style.width = wrapper.offsetWidth;
		//결과물 생성
		temp = channelList[Math.floor(Math.random() * channelList.length)].toString();
		//결과물 출력
		switch (temp.length) {
			case 1:
				result_num1.src = images + "number_" + temp + ".png";
				result_num1.style.display = "inline-block";
				break;
			case 2:
				result_num1.src = images + "number_" + parseInt(temp / 10).toString() + ".png";
				result_num2.src = images + "number_" + (temp % 10).toString() + ".png";
				result_num1.style.display = "inline-block";
				result_num2.style.display = "inline-block";
				break;
		}
		//플래시 번쩍
		result_flash.style.display = "block";
		//출력용 종료 대사 준비
		temp2 = "<span class='orange'>" + temp + "</span>" + showText[2];
		//1.5초 후 황녀님 말씀
		auto = setTimeout(function() {
			finish(1);
		},1500);
	}
};

function finish(num) {
	if (num < temp2.length) {
		if ((temp2.substr(0,num+1).match(/</g) || []).length == (temp2.substr(0,num+1).match(/>/g) || []).length) {
			text.innerHTML = temp2.substr(0,num+1);
		} else {
			auto = setTimeout(function() {
				finish(num+1);
			},0);
			return;
		}
		auto = setTimeout(function() {
			finish(num+1);
		},50);
	} else {
		click.value = "다시 추천받기";
		click.style.display = "block";
		click.onclick = function() {
			//일부 이미지 숨기기
			result.style.width = "0px";//재개봉을 위해 길이 줄여두기
			result.style.display = "none";
			result_num1.style.display = "none";
			result_num2.style.display = "none";
			result_flash.style.display = "none";
			//재실행
			main();
		}
	}
};

//=================================================================================================================
//※ 실행
//=================================================================================================================

window.onload = function() {
	//이미지 선로딩
	//1. 결과물
	for (i=0;i<10;i++) {
		imageList.push(images + "number_" + i.toString() + ".png");
	}
	//2. 쿠키, 플래시, 결과배경
	imageList.push(images + "flash.gif");
	imageList.push(images + "result_back.png");
	//3. 캐릭터, 배경
	imageList.push(images + "cha_dreyfus.png");
	imageList.push(images + "back_dreyfus.png");
	//4. 호출
	loadImages(imageList,function(){
		
		//본격
		//1. 배경 출력
		wrapper.style.backgroundImage = "url('./images/m_jum/back_dreyfus.png')";
		//2. 캐릭터 출력
		character.style.display = "block";
		//3. 텍스트 출력
		text.innerHTML = showText[0];
		//4. 로딩 바 제거, 버튼 출력
		progress.style.width = "0px";//차후 로딩을 위해 길이 초기화
		progress.style.display = "none";
		click.style.display = "block";
		click.onclick = function() {//버튼 클릭 시
			main();
		}
		
	});
}