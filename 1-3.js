var dif = 3; // 난이도
var t = 0; // 숫자를 몇 번 입력했는지(숫자 배열 하나 당)
var kc; // 키보드 무슨 키 눌렀는지
var img = ["3-0.png", "3-1.png", "3-2.png", "3-3.png", "3-4.png", "3-5.png", "3-6.png", "3-7.png", "3-8.png", "3-9.png", "blank3.png", "dot3.png"]; // 이미지의 주소
var blankId = ["1st", "2nd", "3rd", "4st", "5st", "6st"]; // 숫자 이미지의 id
var blank; // 숫자가 들어갈 이미지의 id값
var guss = [];// 플레이어 예측값
var ans = []; // 플레이어 1이 출제한 정답
var ans2 = []; // 플레이어 2가 출제한 정답
var tries = 0; // 정답을 맞히기 위해 시도한 횟수
var turnTries = 0; //플레이어 1, 2 순서가 몇 번 돌아갔는지
var gameStarted = false; // 게임 시작 여부
var gameOvered = false; // 게임 오버 여부
var strike = 0; // 스트라이크
var ball = 0; // 볼
var pturn = 2; // 누구 차례인지(플레이어 1,2)
var no; // 키보드로 들어온 값이 이상하면
var inputs = []; // 플레이어가 시도한 숫자 배열

// 일단 평균 시도 횟수나 그동안 시도한 숫자 배열이나 닉네임은 안 넣고 그냥 전체적으로 다듬음.

// 키를 누르면 메인 함수를 실행하라는 뜻이오
var player1 = prompt("플레이어 1의 이름을 입력해주시오.");
if(player1===null || player1==="") player1 = "무당벌레 1";

var player2 = prompt("플레이어 2의 이름을 입력해주시오.");
if(player2===null || player2==="") player2 = "무당벌레 2";

setTimeout("document.getElementById('h3').innerHTML = player2+'의 예측 숫자'", 10);
setTimeout("alert(player1+'님이 문제를 낼 차례입니다!')", 50);
setTimeout("document.getElementById('turn').innerHTML = player1+'님이 문제를 낼 차례입니다.'", 10);

document.onkeydown = function(e) {
	var result = "";

	if(typeof(e)!="undefined") result = e.which;
	else result = event.keyCode;

	if(result>=48 && result<=57) kc = result-48;
	else if(result == 8) kc = 10;
	else kc = no;

	main();
}

function main() {
	//press_key();

	if(gameStarted === false && gameOvered === false) {
		makeWords();
		return false;
	}

	if(gameOvered === true) {
		alert("이미 게임이 끝났습니다.");
		return false;
	}


	if(kc === no) {
		alert("나는 숫자만을 원합니다.");
		return false;
	}
	// 취소 키
	if(kc === 10) {
		cancel();
		return false;
	}

	// 숫자를 입력했을 때 실행되는
	blank = document.getElementById(blankId[t]);
	blank.src = img[kc];
	guss.push(kc);
	t++;

	// 마지막 숫자를 입력했다면
	if(t==dif) {
		// 오류 있는 지 확인
		for(var i = 0; i<guss.length ; i++) {
			for(var j = 0; j<guss.length ; j++) {
				if(i!=j) {
					if(guss[i]===guss[j]) {
						setTimeout("alert('중복된 숫자가 있는 것 같소만.')", 100);
						t--;
						blank = document.getElementById(blankId[t]);
						setTimeout("blank.src = img[10]", 100);
						guss.pop();
						return false;
					}
				}
			}
		}
		for(var i=0; i<tries; i++) {
			if(guss.join('')==inputs[i]) {
				setTimeout("alert('이미 입력한 숫자 배열 같소만.')", 100);
				setTimeout("imageInit()", 100);
				for(var i = 0; i<dif; i++) guss.pop();
				t = 0;
				return false;
			}
		}
		// S와 B 판단
		for(var i = 0; i<dif ; i++) {
			if(pturn===1) {
				for(var j = 0; j<dif ; j++) {
					if(guss[i]===ans[j]) {
						if(i===j) strike++;
						else ball++;
					}
				}
			} else {
				for(var j = 0; j<dif ; j++) {
					if(guss[i]===ans2[j]) {
						if(i===j) strike++;
						else ball++;
					}
				}
			}
		}
		// 아웃일 시 알림
		if(strike===0 && ball===0) setTimeout("alert('아웃!')", 50);
		//표에 출력한다.
		var tble = document.getElementById("tble");
		var tbd = document.createElement("tbody");
		tble.appendChild(tbd);
		tbd.setAttribute("id", "tbd");
		var tbd = document.getElementById("tbd");
		var trr = document.createElement("tr");
		var td = ["td1", "td2", "td3"];
		var tn = ["tn1", "tn2", "tn3"];
		for(var i = 0; i<3; i++) {
			td[i] = document.createElement("td");
			if(i===0) tn[i] = document.createTextNode(guss.join(''));
			else if(i===1) tn[i] = document.createTextNode(strike);
			else tn[i] = document.createTextNode(ball);
		}
		for(var i = 0; i<3 ; i++) {
			td[i].appendChild(tn[i]);
			trr.appendChild(td[i]);
		}
		tbd.appendChild(trr);
		// 승리 함수
		if(strike==dif) gameWon();
		else inputs.push(guss.join(''));
		// 변수 초기화
		for(var i = 0; i<dif; i++) guss.pop();
		strike = 0;
		ball = 0;
		t = 0;
		tries++;
		setTimeout("if(gameOvered === false) imageInit()", 700);
	}
	
}

// 이미지 초기화
function imageInit() {
	for(var i = 0; i<dif; i++) {
		blank = document.getElementById(blankId[i]);
		blank.src = img[10];
	}
}

// 포기 함수.. 포기 버튼을 따로 만들어서 그 버튼을 누르면 실행되는 걸로.
function giveUp() {
	if(gameOvered === true || gameStarted === false) return false;
	if(tries===0) alert("아아, 그걸 누르기 전, 단 한 번의 시도라도.");
	else {
		var gg = confirm("아, 정말로 포기하실 생각입니까?");
		if(gg) {
			if(pturn===1) {
				alert("포기를 선택하셨습니다. 정답은 "+ans.join(''));
				alert((turnTries+1)+"번의 플레이 끝에 "+player2+" 승리!");
				document.getElementById("yay").innerHTML = "<b>"+player2+"의 승리! \\(°∀° )/</b>";
				document.getElementById("turn").innerHTML = " 답: "+ans.join('');
			} else {
				alert("포기를 선택하셨습니다. 정답은 "+ans2.join(''));
				alert((turnTries+1)+"번의 플레이 끝에 "+player1+" 승리!");
				document.getElementById("yay").innerHTML = "<b>"+player1+"의 승리! \\(°∀° )/</b>";
				document.getElementById("turn").innerHTML = " 답: "+ans2.join('');
			}
			document.getElementById("winss").innerHTML = "";
			console.log('이 게임을 모란 센세께 바칩니ㄷ..');
			gameOvered = true;	
		}
	}
}

// 키를 눌렀을 때
function press_key() {
	if(event.keyCode>=48 && event.keyCode<=57) kc = event.keyCode-48;
	else if(event.keyCode == 8) kc = 10;
	else kc = no;
}

function makeWords() {
	if(kc === no) {
		alert("나는 숫자만을 원합니다.");
		return false;
	}
	if(kc === 10) {
		cancel();
		return false;
	}
	blank = document.getElementById(blankId[t]);
	blank.src = img[11];
	t++;
	switch(pturn) {
		case(1) :
			ans.push(kc);
			if(ans.length == dif) {
				for(var i = 0; i<ans.length ; i++) {
					for(var j = 0; j<ans.length ; j++) {
						if(i!=j) {
							if(ans[i]===ans[j]) {
								alert("중복된 숫자가 있는 것 같소만.");
								t = 0;
								for(var k = 0; k<dif; k++) {
									blank = document.getElementById(blankId[k]);
									blank.src = img[10];
									ans.pop();
								}
								return false;
							}
						}
					}
				}
				setTimeout("alert('좋습니다. 이제 우리들의 게임을 시작합니다.')", 100);
				setTimeout("imageInit()", 100);
				document.getElementById("turn").innerHTML = "현재 "+player1+"의 차례입니다.";
				gameStarted = true;
				t = 0;
			}
			break;
		case(2):
			ans2.push(kc);
			if(ans2.length == dif) {
				for(var i = 0; i<ans2.length ; i++) {
					for(var j = 0; j<ans2.length ; j++) {
						if(i!=j) {
							if(ans2[i]===ans2[j]) {
								alert("중복된 숫자가 있는 것 같소만.");
								t = 0;
								for(var k = 0; k<dif; k++) {
									blank = document.getElementById(blankId[k]);
									blank.src = img[10];
									ans2.pop();
								}
								return false;
							}
						}
					}
				}
				setTimeout("alert('좋습니다. 이제 우리들의 게임을 시작합니다.')", 100);
				setTimeout("imageInit()", 100);
				document.getElementById("turn").innerHTML = "현재 "+player2+"의 차례입니다.";
				gameStarted = true;
				t = 0;
			}
	}

}

function gameWon() {
	if(pturn===1) {
		setTimeout("alert(player1 + '님이 ' + tries + '번 만에 성공적으로 숫자를 맞혔습니다! 다음 게임으로 이동합니다.')", 100);
		pturn++;
	} else {
		setTimeout("alert(player2 + '님이 ' + tries + '번 만에 성공적으로 숫자를 맞혔습니다! 다음 게임으로 이동합니다.')", 100);
		pturn--;
	}
	gameStarted = false;
	turnTries++;
	setTimeout("tries = 0", 200);
	for(var i = 0; i<dif; i++) {
		if(pturn===1) ans.pop();
		else ans2.pop();
	}
	for(var j=0 ; j<tries; j++) inputs.pop();
	var tble = document.getElementById("tble");
	var tbd = document.getElementById("tbd");
	tble.removeChild(tbd);
	if(pturn===1) {
		setTimeout("if(t===0) alert((turnTries+1)+'번째 게임! '+player2+'님이 문제를 낼 차례입니다!')", 200);
		document.getElementById("turn").innerHTML = "현재 "+player2+"님이 문제를 낼 차례입니다.";
		document.getElementById('h3').innerHTML = player1+'의 예측 숫자'
	} else {
		setTimeout("if(t===0) alert((turnTries+1)+'번째 게임! '+player1+'님이 문제를 낼 차례입니다!')", 200);
		document.getElementById("turn").innerHTML = "현재 "+player1+"님이 문제를 낼 차례입니다.";
		document.getElementById('h3').innerHTML = player2+'의 예측 숫자'
	}
	document.getElementById("winss").innerHTML = "연속 "+(turnTries+1)+"게임 째"
}

function cancel() {
	if(t>0) t--;
	blank = document.getElementById(blankId[t]);
	blank.src = img[kc];
	if(gameStarted === false) {
		if(pturn === 1) ans.pop();
		else ans2.pop();
	} else guss.pop();
}

function gogo() {
	var gogo = confirm("정말로 게임을 떠나실 겁니까?");
	if(gogo) window.location = 'index.html'
}

function moranTeacher() {
	console.log("이것은 숨겨진 함수입니다.");
	console.log("모란센세를 사모하는 마음을 담고 있죠.");
	console.log("언제나 화이팅");
}