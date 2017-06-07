
(function() {
"use strict";

var rank = {
    count:1,
    level:[0,100,1000,10000,100000,
        1000000,10000000,50000000,100000000,250000000,
        500000000,1000000000]
};


document.addEventListener("DOMContentLoaded", function(e) {
    $("#nameSlot").onclick = function() {
        var name = prompt("카드의 이름을 입력하세요");
        if (name !== null) $("#imageName").innerHTML = name;
    };

    var option = $("#detailBackground").value;
    $("#image_cover").style.background = option;
    $("#detailBackground").onchange = function() {
        var option = $("#detailBackground").value;
        $("#image_cover").style.background = option;
    };

    $("#imageSlot").onchange = function() {
        //버튼 비활성화
        $("#nameSlot").disabled = true;
        $("#imageSlot").disabled = "disabled";

        //대기 메세지
        $("#image").style.display = "none";
        $("#image_text").style.display = "block";
        $("#imagePower").innerHTML = "계산 중...";

        //이미지 불러오기
        var file = $("#imageSlot").files[0];
        var imageType = /image.*/;

        if (file) {
            if (file.type.match(imageType)) {
                var reader = new FileReader();
                if (file.name !== undefined) reader.fileName = file.name;

                reader.onload = function(readerEvt) {
                    //이미지 교체
                    $("#image").src = reader.result;

                    //이미지 출력
                    $("#image").style.display = "block";
                    $("#image_text").style.display = "none";

                    //이미지 이름 교체
                    if (readerEvt.target.fileName !== undefined) {
                        var title = readerEvt.target.fileName.split(".");
                        title.pop();
                        $("#imageName").innerHTML = title.join("");
                    }

                    //이미지 전투력 계산
                    var code = md5(reader.result.split(",")[1]);

                    var temp = 1;
                    for (var i=code.length-1;i>=0;i--) {
                        if (i % 4 === 3) {
                            temp *= parseInt(code[i],16);
                        } else {
                            temp += parseInt(code[i],16);
                        }
                    }
                    //이미지 전투력 출력
                    var num = {count:0,lv:1,star:0};
                    rank.count = 1;
                    $("#imageLevel").innerHTML = "";
                    setTimeout(function() {
                        TweenMax.to(num,3,
                            {count:temp,ease: Power3.easeOut,
                            onUpdate:function() {
                                $("#imagePower").innerHTML = setWon(Math.min(9999999999,Math.floor(num.count)));
                                //$("#imagePower").innerHTML = (num.count >= 100000000) ? setWon2(Math.floor(num.count/10000)*10000) : setWon2(Math.floor(num.count));
                                if (num.count >= rank.level[rank.count]) {
                                    rank.count += 1;
                                }
                            },
                            onComplete:function() {
                                TweenMax.to(num,rank.count*0.2,
                                    {lv:rank.count,ease: Power0.easeNone,
                                    onUpdate:function() {
                                        if (Math.floor(num.lv) >= num.star) {
                                            num.star += 1;
                                            $("#imageLevel").innerHTML = "<img src='./images/power_level/star.png'>".repeat(Math.floor(num.lv)-1);
                                            $("#imageLevel").innerHTML += "<span class='animated fadeIn'><img src='./images/power_level/star.png'></span>";
                                        }
                                    },
                                    onComplete:function() {
                                        //버튼 활성화
                                        $("#nameSlot").disabled = false;
                                        $("#imageSlot").disabled = "";
                                    }
                                    }
                                );
                            }
                            });
                    },500);
                };

                reader.readAsDataURL(file);
            } else {
                alert("※ 경고 : 지원되지 않는 파일입니다.");
                //버튼 활성화
                $("#nameSlot").disabled = false;
                $("#imageSlot").disabled = "";
            }
        } else {
            //버튼 활성화
            $("#nameSlot").disabled = false;
            $("#imageSlot").disabled = "";
        }

    };
/*
    //이미지 로드됨 확인
    if (sessionStorage["power_on"] === "on") {
        //이미지 로드 신호 끄기
        sessionStorage["power_on"] = "off";

        //이미지 교체 & 출력
        alert(sessionStorage["power_base64"]);
        $("#image").src = sessionStorage["power_base64"];
        $("#image").style.display = "block";

        //이미지 전투력 계산
        var code = md5(sessionStorage["power_base64"].split(",")[1]);

        var temp = 1;
        for (var i=0;i<code.length;i++) {
            if (i % 4 === 0) {
                temp *= parseInt(code[i],16);
            } else {
                temp += parseInt(code[i],16);
            }
        }
        $("#imagePower").innerHTML = setWon(temp);
    }
*/
});

})();
