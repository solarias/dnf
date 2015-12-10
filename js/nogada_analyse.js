
//=================================================================================================================
//※ 함수
//=================================================================================================================
//특정 클래스 삭제
function removeClass(target,toErase) {
target.className = target.className.replace( new RegExp('(?:^|\\s)'+toErase+'(?!\\S)') ,'');
}

//IE8에 배열 indexOf 적용
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

//천단위 콤마 표시 (출처 : http://stackoverflow.com/questions/2901102/how-to-print-a-number-with-commas-as-thousands-separators-in-javascript)
function thousand(num) {
return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

//숫자 여부 판단
function isNumeric(n) {
  return !isNaN(parseFloat(n)) && isFinite(n);
}

//ie8 - arr.map polyfill
// Production steps of ECMA-262, Edition 5, 15.4.4.19
// Reference: http://es5.github.io/#x15.4.4.19
if (!Array.prototype.map) {

  Array.prototype.map = function(callback, thisArg) {

    var T, A, k;

    if (this == null) {
      throw new TypeError(' this is null or not defined');
    }

    // 1. Let O be the result of calling ToObject passing the |this| 
    //    value as the argument.
    var O = Object(this);

    // 2. Let lenValue be the result of calling the Get internal 
    //    method of O with the argument "length".
    // 3. Let len be ToUint32(lenValue).
    var len = O.length >>> 0;

    // 4. If IsCallable(callback) is false, throw a TypeError exception.
    // See: http://es5.github.com/#x9.11
    if (typeof callback !== 'function') {
      throw new TypeError(callback + ' is not a function');
    }

    // 5. If thisArg was supplied, let T be thisArg; else let T be undefined.
    if (arguments.length > 1) {
      T = thisArg;
    }

    // 6. Let A be a new array created as if by the expression new Array(len) 
    //    where Array is the standard built-in constructor with that name and 
    //    len is the value of len.
    A = new Array(len);

    // 7. Let k be 0
    k = 0;

    // 8. Repeat, while k < len
    while (k < len) {

      var kValue, mappedValue;

      // a. Let Pk be ToString(k).
      //   This is implicit for LHS operands of the in operator
      // b. Let kPresent be the result of calling the HasProperty internal 
      //    method of O with argument Pk.
      //   This step can be combined with c
      // c. If kPresent is true, then
      if (k in O) {

        // i. Let kValue be the result of calling the Get internal 
        //    method of O with argument Pk.
        kValue = O[k];

        // ii. Let mappedValue be the result of calling the Call internal 
        //     method of callback with T as the this value and argument 
        //     list containing kValue, k, and O.
        mappedValue = callback.call(T, kValue, k, O);

        // iii. Call the DefineOwnProperty internal method of A with arguments
        // Pk, Property Descriptor
        // { Value: mappedValue,
        //   Writable: true,
        //   Enumerable: true,
        //   Configurable: true },
        // and false.

        // In browsers that support Object.defineProperty, use the following:
        // Object.defineProperty(A, k, {
        //   value: mappedValue,
        //   writable: true,
        //   enumerable: true,
        //   configurable: true
        // });

        // For best browser support, use the following:
        A[k] = mappedValue;
      }
      // d. Increase k by 1.
      k++;
    }

    // 9. return A
    return A;
  };
}
//=================================================================================================================
//※ 실행
//=================================================================================================================
window.onload = function() {
	document.getElementById("to_input").onclick = function() {
		//버튼 변경
		document.getElementById("to_input").style.display = "none";
		document.getElementById("to_output").style.display = "block";
		
		//카드 뒤집기
		removeClass(document.getElementById("card"),"flipped");
	}
	document.getElementById("to_output").onclick = function() {
		//숫자 여부 체크(빈칸 : 0 입력)
		for (var i=0;i<3;i++) {
			if (document.getElementById("input_" + (i+1).toString()).value == "") {
				document.getElementById("input_" + (i+1).toString()).value = "0";
			}
			if (! isNumeric(document.getElementById("input_" + (i+1).toString()).value)) {
				alert("※ 경고 : " + name_material[i] + " 가격이 숫자로 입력되지 않았습니다.");
				return;
			}
		}
		//수익 계산
		tempArr = [,,];
		for (var i=0;i<3;i++) {
			if (document.getElementById("input_" + (i+1).toString()).value == "") document.getElementById("input_" + (i+1).toString()).value = "0";
			tempArr[i] = quantity[i] * parseInt(document.getElementById("input_" + (i+1).toString()).value) + base[i]*10000;
		}
		//랭크 계산
		var sortedArr = tempArr.slice().sort(function(a,b){return b-a});
		var rankArr = tempArr.slice().map(function(v){ return sortedArr.indexOf(v)+1 });;
		//랭크 표시
		for (var i=0;i<rankArr.length;i++) {
			document.getElementById("output_" + (i+1).toString()).innerHTML = name_dungeon[rankArr.indexOf(i+1)];
			document.getElementById("gold_" + (i+1).toString()).innerHTML = thousand(tempArr[rankArr.indexOf(i+1)]);
		}
		//추천 던전 표시
		document.getElementById("recommend").innerHTML = name_dungeon[rankArr.indexOf(1)];
		
		//버튼 변경
		document.getElementById("to_input").style.display = "block";
		document.getElementById("to_output").style.display = "none";
		
		//카드 뒤집기
		document.getElementById("card").className += " flipped";
	}
}