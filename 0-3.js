var dif = 3; // 난이도
var t = 0; // 숫자를 몇 번 입력했는지(숫자 배열 하나 당)
var kc; // 키보드 무슨 키 눌렀는지
var img = ["3-0.png", "3-1.png", "3-2.png", "3-3.png", "3-4.png", "3-5.png", "3-6.png", "3-7.png", "3-8.png", "3-9.png", "blank3.png"]; // 이미지의 주소
var blankId = ["1st", "2nd", "3rd", "4st", "5st", "6st"]; // 숫자 이미지의 id
var blank; // 숫자가 들어갈 이미지의 id값
var guss = [];// 플레이어 예측값
var ans = []; // 정답 
var tries = 0; // 정답을 맞히기 위해 시도한 횟수
var turnTries = 0; // 게임이 몇 번 연속으로 돌아가는지(연승)
var gameStarted = false; // 게임 시작 여부
var gameOvered = false; // 게임 오버 여부
var strike = 0; // 스트라이크
var ball = 0; // 볼
var no; // 키보드로 들어온 값이 이상하면
var aver = []; // 그동안 시도 횟수 저장하는 배열
var averTries = 0; // 평균 시도 횟수
var inputs = []; // 플레이어가 시도한 숫자 배열
var r = 0; // 스톱워치를 위한 임시 변수
var stopWatch; // 시간 저장
var timerStart = false; // 스톱워치 시작 여부



// 키를 누르면 메인 함수를 실행하라는 뜻이오
makeWords();
setTimeout("alert('좋습니다. 이제 우리들의 게임을 시작합니다.')", 50);

function clock() {
	if(gameStarted === false || timerStart === false || gameOvered === true) return false; // 이 처리방식이 랙을 유발하는지는 잘 모르겠넴
	//var day = new Date();
	//var temp = day.getSeconds()-r;
	//stopWatch = day.getSeconds()-temp;
	stopWatch = r;
	if(document.fr.check2.checked) document.getElementById("time").innerHTML = stopWatch;
	else document.getElementById("time").innerHTML = "";
	r++;
}

var timer = setInterval(clock, 1000);


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
	timerStart = true;
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
					if(guss[i]==guss[j]) {
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
			for(var j = 0; j<dif ; j++) {
				if(guss[i]==ans[j]) {
					if(i==j) strike++;
					else ball++;
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
			if(i==0) tn[i] = document.createTextNode(guss.join(''));
			else if(i==1) tn[i] = document.createTextNode(strike);
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
		if(gameOvered === false) setTimeout("imageInit()", 700);
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
		var gg = confirm("정말로 포기하시겠습니까?");
		if(gg) {
			alert("포기를 선택하셨습니다. 정답은 "+ans.join(''));
			alert("연승 기록: "+turnTries);
			document.getElementById("end").innerHTML = "게임을 포기하였습니다."+" 답: "+ans.join('');
			document.getElementById("time").innerHTML = "게임 시간: "+stopWatch+"초";
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

function gameWon() {
	setTimeout("if(tries === 1) alert('치트 쓸 머리로 게임을 즐기란 말입니다.')", 50);
	turnTries++;
	setTimeout("if(turnTries>1) alert('현재 '+turnTries+'연승 째!')", 100);
	setTimeout("alert(tries+'번 만에 숫자를 맞혔습니다. 정말 축하합니다!'+' (시간: '+stopWatch+'초)')", 200);
	setTimeout("reGame()", 300);
	document.getElementById("winss").innerHTML = "연승 기록: "+turnTries;
	averTries = 0;
	aver.push(tries+1);
	for(var i=0 ; i<aver.length; i++) {
		averTries += aver[i];
	}
	averTries = averTries/aver.length;
	if(averTries-0.5<Math.floor(averTries)) averTries = Math.floor(averTries);
	else if(averTries-0.5>Math.floor(averTries)) averTries = Math.ceil(averTries);
	document.getElementById("aver").innerHTML = "평균 시도 횟수: "+averTries;
	gameStarted = false;
	gameOvered = true;
}

function reGame() {
	var reGame = confirm('다시 플레이하실 마음이 있으십니까?');
	if(reGame) {
		var tble = document.getElementById("tble");
		var tbd = document.getElementById("tbd");
		tble.removeChild(tbd);
		gameOvered = false;
		for(var j=0 ; j<tries; j++) inputs.pop();
		for(var i = 0; i<dif; i++) ans.pop();
		tries = 0; //reGame 함수 실행에 딜레이가 있어서 tries++ 다음 이게 실행됨
		stopWatch = 0;
		r = 0;
		document.getElementById("time").innerHTML = "";
		timerStart = false;
		imageInit();
		makeWords();
		alert('좋습니다. 이제 우리들의 게임을 시작합니다.');
	}
	else {
		alert("연승 기록: "+turnTries);
		document.getElementById("end").innerHTML = "게임이 끝났습니다.";
		document.getElementById("time").innerHTML = "게임 시간: "+stopWatch+"초";
		console.log('이 게임을 모란 센세께 바칩니ㄷ..');
	}
}

function makeWords() {
	var a = Math.floor(Math.random()*10);
	ans.push(a);
	var b = Math.floor(Math.random()*10);
	while(a==b) b = Math.floor(Math.random()*10);
	ans.push(b);
	var c = Math.floor(Math.random()*10);
	while(a==c || b==c) c = Math.floor(Math.random()*10);
	ans.push(c);
	if(dif>3) {
		var d = Math.floor(Math.random()*10);
		while(a==d || b==d || c==d) d = Math.floor(Math.random()*10);
		ans.push(d);
		if(dif>4) {
			var e = Math.floor(Math.random()*10);
			while(a==e || b==e || c==e || d==e) e = Math.floor(Math.random()*10);
			ans.push(e);
			if(dif>5) {
				var f = Math.floor(Math.random()*10);
				while(a==f || b==f || c==f || d==f || e==f) f = Math.floor(Math.random()*10);
				ans.push(f);
			}
		}
	}
	gameStarted = true;
}

function cancel() {
	if(t>0) t--;
	blank = document.getElementById(blankId[t]);
	blank.src = img[kc];
	guss.pop();
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

