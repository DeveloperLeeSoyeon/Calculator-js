/**
 * 전역 변수
 */
let num1 = "0";
let operator = "";
let num2 = "";
let result = "";
let input; 
let output; 


/**
 * 호출
 */
window.onload = function() { // 웹브라우저 내의 모든 요소가 준비가 됐을 때 실행
    // html 엘리먼트 가져오기 (display창 출력)
    clickBtns();
    input = document.querySelector(".input");
    output = document.querySelector(".output");
}