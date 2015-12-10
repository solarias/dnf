



window.onload = function() {
	//탭 설정
	for (i=1;i<=5;i++) {
		document.getElementById("tab" + i.toString()).onclick = function(i) {
			return function() {
				for (j=1;j<=5;j++) {
					document.getElementById("tab" + j.toString()).className = "";
				}
				
				document.getElementById("tab" + i.toString()).className = "selected";
				
				for (j=1;j<=5;j++) {
					document.getElementById("frame_input_" + j.toString()).style.display = "none";
				}
				
				document.getElementById("frame_input_" + i.toString()).style.display = "block";
			}
		}(i);
	}
	
	//대미지 계산
};