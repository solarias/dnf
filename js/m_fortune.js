//=================================================================================================================
//※ 변수 지정
//=================================================================================================================
var i, temp, temp2; //임시 변수
var tempArr = []; //임시 배열
var auto;

var images = "./images/m_fortune/";
var imageList = []; //이미지 선로딩용 임시저장소

	//=================================================================================================================
	//※ DOM 변수 지정
	//=================================================================================================================
	var wrapper = document.getElementById("wrapper");
	var top = document.getElementById("top");
			var top_inner = document.getElementById("top_inner");
		var cookie_left = document.getElementById("cookie_left");
		var result = document.getElementById("result");
			var result_text = document.getElementById("result_text");
			var result_flash = document.getElementById("result_flash");
		var cookie_right = document.getElementById("cookie_right");

	var character = document.getElementById("character");
	var text = document.getElementById("text");

	var footer = document.getElementById("footer");
		var progress = document.getElementById("progress");
		var click = document.getElementById("click");
	
	var imagePreloader = document.getElementById("imagePreloader");
	
//=================================================================================================================
//※ 자료
//=================================================================================================================
var fortuneList = [
	0,1,2,3,
	4,
	5,6,7,8
];
var fortuneWeight = [
	4, 7, 12, 17,
	20,
	17, 12, 7, 4
];
var fortuneResult = [
	"대대길","대길","중길","소길",
	"평(平)",
	"소흉","중흉","대흉","대대흉"
];
var fortuneText = [
	"하늘이 자네를 도우려 하시는군. 그래도 너무 풀어지면 일을 그르칠 수 있으니, 항상 최선을 다하시게.",//"대대길 텍스트",
	"오늘은 원하는걸 이룰 수 있다는 예감이 드는군. 잘해보게나.",//"대길 텍스트",
	"오늘은 운이 좋군. 이 정도면 희망을 걸어도 괜찮지 않겠나?",//"중길 텍스트",
	"약간의 길함이 느껴지네. 자네의 실력으로 그 길함을 잘 살려보게나.",//"소길 텍스트",
	"평범한 게 가장 좋은 것이지. 부담가지지 말고 늘 하던대로 하면 될 걸세.",//"평(平) 텍스트",
	"약간의 불운이 느껴지는군. 자네라면 그 정도 불운은 얼마든지 떨쳐낼 수 있지 않겠나?",//"소흉 텍스트",
	"예감이 좋지 않군. 오늘은 조심스럽게 행동하시게.",//"중흉 텍스트",
	"괜찮겠는가? 정 불안하면 오늘은 쉬고 내일 다시 도전해보시게.",//"대흉 텍스트",
	"이렇게 안 좋은 결과가 나오는 것도 쉬운 일이 아닐세. 서운해지 말고, 액땜했다고 여기시게."//"대대흉 텍스트"
];
var otherText = [
	"어서 오시게. 마침 과인이 포춘쿠키를 만들었는데, 이걸로 <span class='orange'>길흉점</span>을 보는 건 어떻겠나?",//첫 화면 텍스트
	"포춘쿠키를 개봉 중이니, 잠시만 기다리시게."//로딩 중 텍스트
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
	//쿠키 이미지 세팅
	cookie_center.style.display = "block";
	//텍스트 변경
	text.innerHTML = otherText[1];
	//로딩 바 세팅
	click.style.display = "none";
	progress.style.display = "block";
	check();
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
		//차후 결과 확률 공개용
		result_chance.innerHTML = "";
		result_chance.style.display = "block";
		//텍스트 제거
		text.innerHTML = "";
		//쿠키 이미지 변경
		cookie_center.style.display = "none";
		cookie_left.style.display = "inline-block";//가운데 정렬을 하기 위해
		cookie_right.style.display = "inline-block";//가운데 정렬을 하기 위해
		result.style.display = "inline-block";//가운데 정렬을 하기 위해
		//플래시 미리 불러오기 (로딩을 위해)
		result_flash.src = result_flash.src.replace(/\?.*$/,"")+"?x="+Math.random();
		//result 이미지 늘어나는 거 대비 ('틀'을 미리 늘려둠)
		document.getElementById('top').style.width = (parseInt(cookie_left.offsetWidth + cookie_right.offsetWidth + wrapper.offsetWidth) + 10).toString() + "px";
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
		//쿠키 이미지 제거
		cookie_left.style.display = "none";
		cookie_right.style.display = "none";
		//결과물 생성
		for (i=0;i<fortuneWeight.length;i++) {
			for (j=0;j<fortuneWeight[i];j++) {
				tempArr.push(fortuneList[i]);
			}
		}
		temp = Math.floor(Math.random() * tempArr.length);
		//결과물 출력
		result_text.src = images + "grade" + (tempArr[temp]+1).toString() + ".png";
		result_text.style.display = "block";
		//플래시 번쩍
		result_flash.style.display = "block";
		//결과물 확률
		result_chance.innerHTML = "<span class='yellow'>" + fortuneResult[tempArr[temp]] + " (확률 : <span class='orange'>" + fortuneWeight[tempArr[temp]].toString() + "</span>%)";
		//1.5초 후 황녀님 말씀
		auto = setTimeout(function() {
			finish(1);
		},1500);
	}
};

function finish(num) {
	if (num < fortuneText[tempArr[temp]].length) {
		text.innerHTML = fortuneText[tempArr[temp]].substr(0,num+1);
		auto = setTimeout(function() {
			finish(num+1);
		},50);
	} else {
		result_chance.style.display = "none";
		click.value = "다시 해보기";
		click.style.display = "block";
		click.onclick = function() {
			//일부 이미지 숨기기
			result.style.width = "0px";//재개봉을 위해 길이 줄여두기
			result.style.display = "none";
			result_text.style.display = "none";
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
	for (i=0;i<fortuneList.length;i++) {
		imageList.push(images + "grade" + (i+1).toString() + ".png");
	}
	//2. 쿠키, 플래시, 결과배경
	imageList.push(images + "cookie_left.png");
	imageList.push(images + "cookie_right.png");
	imageList.push(images + "cookie_center.png");
	imageList.push(images + "flash.gif");
	imageList.push(images + "result_back.png");
	//3. 캐릭터, 배경
	imageList.push(images + "normal_cha.png");
	imageList.push(images + "normal_back.png");
	//4. 호출
	loadImages(imageList,function(){
		
		//본격
		//1. 배경 출력
		wrapper.style.backgroundImage = "url('./images/m_fortune/normal_back.png')";
		//2. 캐릭터 출력
		character.style.display = "block";
		//3. 텍스트 출력
		text.innerHTML = otherText[0];
		//4. 로딩 바 제거, 버튼 출력
		progress.style.width = "0px";//차후 로딩을 위해 길이 초기화
		progress.style.display = "none";
		click.style.display = "block";
		click.onclick = function() {//버튼 클릭 시
			main();
		}
		
	});
}