var A = []; // 반드시 포함
var B = [1,2,3,4,5,6,7,8,9]; // 후보

function how() {
	for(var i = 0; i<dif ; i++) {
		for(var j = 0; j<dif ; j++) {
			if(guss[i]==ans[j]) {
				if(i==j) strike++;
				else ball++;
			}
		}
	}
	// 아웃일 시 알림
	if(strike===0 && ball===0) alert('아웃!');


function AI() {
	var kotae = []; // 대답
	var num = [0,1,2,3,4,5,6,7,8]; // 0부터 배열 길이까지 숫자를 일렬로 정렬한 배열..

	for(var i=0; i<=A.length; i++) {
		var num = [];
		num.push(i);
	}
	for(var i=0; i<=A.length; i++) {
		var rd = Math.floor(Math.random()*num.length);
		kotae.push(A[rd]);
		num.splice(rd, 1);
	}

	for(var i=0; i<=A.length; i++) {
		var num = [];
		num.push(i);
	}
	for(var i=0; i<=3; i++) {
		var rd = Math.floor(Math.random()*num.length);
		kotae.push(B[rd]);
		num.splice(rd, 1);
	}
}