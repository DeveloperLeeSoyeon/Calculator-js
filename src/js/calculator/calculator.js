/**
 * 계산기 로직 관련 함수
 */


/**
 * display 출력  
 * @param {} input : 입력한 식 display
 * @param {*} output : 최근에 누른 숫자 or 결과값 display 
 */
const printDisplay = (input,output) => {
    let texts = [...input.value];

    texts.forEach(text => {
        let spanTag = document.createElement("span");

        spanTag.textContent = text;
        spanTag.className = isNaN(text) && !(text == ".")
            ? "span-oper"
            : "span-num";

        input.appendChild(spanTag);
    });
    output.textContent = output.value;
}


/**
 * 자식 요소 삭제 함수
 * @param {*} parent 
 */
const removeAllChild = (parent) => {
    while(parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
    input.value = "";
}


/**
 * 변수 초기화 함수
 */
const varReset = () => {
    num1 = "";
    num2 = "";
    operator = "";
    result = "";
    output.value = "0";
    removeAllChild(input);
}


/**
 * 클릭 이벤트
 * @param {*} value : 클릭한 버튼 (숫자 or 연산자)
 * @returns 
 */
const onClickHandler = value => () => {
    
    // (A) 연산자일 때 
    if(isNaN(value)){ 
        if (value == ".") onClickDot();
        else if (value == "%") onClickPercent();
        else if (value == "") onClickDelete();
        else if (value == "=") onClickCalculate();    
        else if (value == "C") onClickClear();
        
        // 위의 경우를 제외하고 연산자가 없을 때 
        else if (!operator) { 
            operator = value;
            input.value = " "+operator+" ";
        }
        
        // 이미 연산자가 있을 경우 (이전 계산 존재)
        else if (operator && result) {
            removeAllChild(input);
            num1 = result; // 이전 계산의 결과값을 num1로 할당
            operator = value; // 방금 누른 연산자를 다시 operator에 할당
            num2 = ""; // 기존 값들 초기화
            result = "";
            input.value = num1 + " "+ operator + " ";
        }

    // (B) 숫자일 때
    } else { 
        if( num1 === "0" ){
            num1 = value;
            output.value = num1;
        }
       else if (!operator) {
            // 연산자 X
            num1 += value;
            output.value = num1;
        } else if (operator && !result) {
            // 연산자 O , 첫 계산
            num2 += value;
            output.value = num2;
        } else if (operator && result) {
            // 연산자 O, 이전 계산(결과값) 존재 -> 초기화 후 재할당
            varReset();
            num1 += value;
            output.value = num1;
        }
        input.value = value;
    }
    printDisplay(input, output);
};


/**
 * 클릭 이벤트 리스너 생성 함수
 */
const clickBtns = () => {
    const btns = document.querySelectorAll('button');
    btns.forEach(btn => {
        btn.addEventListener("click", onClickHandler(btn.textContent));
    })
}
