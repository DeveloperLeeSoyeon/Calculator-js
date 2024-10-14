/**
 * 연산자 함수
 */
const onClickCalculate = () => {
    if (operator && !num2) { // num2 클릭 하지않고 = 눌렀을 경우
        num2 = num1; // 같은 숫자 할당
    }

    // (1) 연산
    if (operator === "+") {
        result = parseFloat(num1) + parseFloat(num2);
    } else if (operator === "-") {
        result = parseFloat(num1) - parseFloat(num2);
    } else if (operator === "×") {
        result = parseFloat(num1) * parseFloat(num2);
    } else if (operator === "÷") {
        result = num1 / num2;
    }

    // (2) 계산값 디스플레이 데이터 저장 
    if (result) {
        input.value = " = ";
        output.value = result;
    } else if (!result) {
        // = 만 눌렀을 경우 (숫자X 연산자X)
        num1 = "";
        input.value = "";
        output.value = "0";
    }
};


/**
 * . 소수점 계산
 */
const onClickDot = () => {
    result = "";

    if (!operator && !num1.includes(".")) { // 연산자 X num1 O (. X) -> num1 .
        num1 += ".";
    } else if (!operator && !num1) { // 연산자 X num1 X -> num1 = 0. ~
        num1 = "0.";
    } else if (operator && !num2.includes(".")) { // 연산자 O num1 O num2 O (.X)-> num2 . // 연산자가 있으면 num1은 항상 있음 ! 연산클릭함수에서 0을 할당해줬으므로
        num2 += ".";
    } else if (operator && !num2) { // 연산자 O num1 O num2 X -> num2 = 0. ~
        num2 = "0.";
    }
    input.value =".";
    !num2 ? (output.value = num1) : (output.value = num2);
};


/**
 * % 퍼센트 계산
 */
const onClickPercent = () => {
    if (num1 && !operator) { // num1 O oper X - 0 으로 초기화
        varReset();
    } else if (operator && !num2) { // oper O num2 X - num1 의 num1% 구하기
        num2 = num1 * (num1 / 100);
    } else if (operator && num2) { // oper O num2 O - num1 의 num2 퍼센트 구하기
        num2 = num1 * (num2 / 100);
    }

    input.value = "%";
    output.value = num2;
};


/**
 * C 초기화
 */
const onClickClear = () => {
    varReset();
};


/**
 * 삭제
 */
const onClickDelete = () => {
    removeAllChild(input);
    if (!operator) {
        // 연산자 X
        num = output.value.slice(0, -1);
        num1 = num;
        input.value = num1;
        output.value = num1;
    } else if (operator && !result) {
        // 첫 계산
        num = output.value.slice(0, -1);
        num2 = num;
        input.value = num2;
        output.value = num2;
    }
    
};