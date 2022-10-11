const changeFocus1 = () => {
  let phone1 = document.getElementById('p1').value;
  if (phone1.length === 3) {
    document.getElementById('p2').focus();
  }
};
const changeFocus2 = () => {
  let phone2 = document.getElementById('p2').value;
  if (phone2.length === 4) {
    document.getElementById('p3').focus();
  }
};
const changeFocus3 = () => {
  let phone3 = document.getElementById('p3').value;
  if (phone3.length === 4) {
    document.getElementById('authBtn').style =
      'color:#0068ff;background-color:white;cursor:pointer';
    document.getElementById('authBtn').disabled = false;
  }
};
let isStarted = false;
let auth = () => {
  document.getElementById('finish').style =
    'background-color:#0068ff;color:white;';
  if (isStarted == false) {
    //타이머가 작동중이 아닐 때
    isStarted = true;
    document.getElementById('finish').disabled = false;
    const token = String(Math.floor(Math.random() * 1000000)).padStart(6, '0');
    document.getElementById('target').innerText = token;

    let time = 180;
    let timer;
    timer = setInterval(function () {
      if (time >= 0) {
        //인증시간이 남아있을때
        let min = Math.floor(time / 60);
        let sec = String(time % 60).padStart(2, '0');
        document.getElementById('timer').innerText = min + ':' + sec;
        time = time - 1;
      } else {
        //인증시간이 끝났을때 => 타이머가 끝난 이후에도 1초마다 setInterval함수가 작동함. 그래서 clearInterval해주어야함
        document.getElementById('finish').disabled = true;
        isStarted = false;
        document.getElementById('finish').style =
          'background-color:white;color:#797979';
        clearInterval(timer);
      }
    }, 1000);
  } else {
    //타이머가 작동중일때
  }
};

//인증 완료하기
let authFinish = () => {
  if (document.getElementById('finish').disabled == false) {
    alert('인증이 완료되었습니다');
    document.getElementById('finish').disabled = true;
    document.getElementById('finish').innerText = '인증 완료';
    document.getElementById('target').innerText = '000000';

    console.log(document.getElementById('timer').innerText);
    document.getElementById('finish').style =
      'background-color:white;color:#797979';
    //가입하기버튼 활성화
    document.getElementById('submitBtn').disabled = false;
    document.getElementById('submitBtn').style =
      'background-color:white;color:#0068ff;border:1px solid #0068ff';
  } else {
    //3분 시간 지났을때
    document.getElementById('finish').disabled = true;
    document.getElementById('target').innerText = '000000';
    document.getElementById('timer').innerText = '3:00';
  }
};

//가입하기 버튼 onclick
let submit = () => {
  let email = document.getElementById('email').value;
  let name = document.getElementById('name').value;
  let pw1 = document.getElementById('pw1').value;
  let pw2 = document.getElementById('pw2').value;
  let area = document.getElementById('area').value;
  let female = document.getElementById('female').checked;
  let male = document.getElementById('male').checked;

  if (document.getElementById('finish').innerText === '인증 완료') {
    //가입하기 버튼 활성화
    document.getElementById('submitBtn').disabled = false;
    //유효성 검사
    if (email !== '') {
      if (!email.includes('@')) {
        document.getElementById('emailCheck').style =
          'color:red;font-size:11px;text-align:center';
        document.getElementById('emailCheck').innerText =
          '@가 포함되어야 합니다.';
      } else {
        document.getElementById('emailCheck').innerText = '';
      }
    } else {
      document.getElementById('emailCheck').style =
        'color:red;font-size:11px;text-align:center';
      document.getElementById('emailCheck').innerText =
        '이메일이 올바르지 않습니다';
    }

    if (name === '') {
      document.getElementById('nameCheck').style =
        'color:red;font-size:11px;text-align:center';
      document.getElementById('nameCheck').innerText =
        '이름이 올바르지 않습니다';
    } else {
      document.getElementById('nameCheck').innerText = '';
    }

    if (pw1 === '') {
      document.getElementById('pw1Check').style =
        'color:red;font-size:11px;text-align:center';
      document.getElementById('pw1Check').innerText =
        '비밀번호를 입력해 주세요';
    }

    if (pw2 === '') {
      document.getElementById('pw2Check').style =
        'color:red;font-size:11px;text-align:center';
      document.getElementById('pw2Check').innerText =
        '비밀번호를 입력해 주세요';
    } else if (pw1 !== pw2) {
      document.getElementById('pw2Check').innerText =
        '비밀번호1과 비밀번호2가 동일해야합니다.';
    } else if (pw1 === pw2) {
      document.getElementById('pw1Check').innerText = '';
      document.getElementById('pw2Check').innerText = '';
    }

    if (area === '지역을 선택하세요') {
      document.getElementById('areaCheck').style =
        'color:red;font-size:11px;text-align:center';
      document.getElementById('areaCheck').innerText = '지역을 선택해 주세요';
    } else {
      document.getElementById('areaCheck').innerText = '';
    }

    if (female === false && male === false) {
      document.getElementById('genderCheck').style =
        'color:red;font-size:11px;text-align:center';
      document.getElementById('genderCheck').innerText = '성별을 선택해 주세요';
    } else {
      document.getElementById('genderCheck').innerText = '';
    }

    if (
      email !== '' &&
      name !== '' &&
      pw1 !== '' &&
      pw2 !== '' &&
      area !== '지역을 선택하세요' &&
      (female === true || male === true)
    ) {
      alert('코드캠프 가입을 축하합니다');
    }
  }
};
