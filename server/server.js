const express = require('express');
const cors = require('cors');
const app = express();

let userdata = [
    { id: 'test', pw: 'test', name: 'test', age: '23' },
];

app.use(express.json())
app.use(cors());
app.listen(8080,function(){
    console.log("listening on 8080")
});

//[ID중복체크]
app.get('/idcheck/:id', function(req, res) {
    const id = req.params.id;   
    const idcheck = userdata.some(user => user.id === id);
    res.send({ "ok": !idcheck });
});

//[회원가입 API]
app.get('/signup/:id/:pw/:name/:age', function(req, res) {
    const id = req.params.id;
    const pw = req.params.pw;
    const name = req.params.name;
    const age = req.params.age;
    const idcheck = userdata.some(user => user.id === id);
    if(idcheck){
        res.send({ "ok": false});
    }
    else if (id && pw && name && age) {
        userdata.push({ id, pw, name, age });

        console.log("회원가입 완료 : ", userdata);
        res.send({ "ok": true });
    } 
    else {
        res.send({ "ok": false});
    }
});

// [로그인 API]
app.get('/login/:id/:pw', function (req, res) {
    const id = req.params.id;
    const pw = req.params.pw;
    if (id && pw) {
        const user = userdata.find(user => user.id === id && user.pw === pw);

        if (user) {
            console.log("로그인 성공한 사용자: ", user); // 로그인 성공 시 서버 콘솔에 사용자 정보 출력
            res.send({
                "ok": true,
                user: { id: user.id, name: user.name, pw: user.pw, age: user.age }
            });
        } else {
            res.send({ "ok": false });
        }
    } else {
        res.send({ "ok": false });
    }
});


// [로그아웃 API]
app.get('/logout/:id', function (req, res) {
    const id = req.params.id;
    const user = userdata.find(user => user.id === id);

    if (user) {
        // 서버에서 사용자 정보를 제거하거나 처리하는 로직 (예: 세션 상태 변경)
        console.log(`${user.name}님 로그아웃 완료`);
        res.send({ "ok": true, message: `${user.name}님 로그아웃 완료` });
    } else {
        res.send({ "ok": false, message: "사용자가 존재하지 않습니다." });
    }
});

// [활동 기록 제출 API]
app.post('/submit-activity', function(req, res) {
    const { category, title, content, date } = req.body;

    if (category && title && content && date) {
        // 새로운 활동 기록을 배열에 추가
        const newActivity = { category, title, content, date };
        activities.push(newActivity);  // 새로운 기록을 활동 배열에 추가

        console.log("활동 기록 제출:", newActivity);
        res.send({ ok: true, activities, message: "활동 기록이 성공적으로 제출되었습니다." });
    } else {
        res.send({ ok: false, message: "모든 필드를 작성해주세요." });
    }
});


// [활동 기록 조회 API]
let activities = [
    { category: "봉사", title: "봉사활동 1", content: "어린이 도서관 봉사", date: "2024-11-01" },
    { category: "대외활동", title: "외부 행사 참여", content: "대학생 캠프 참가", date: "2024-11-05" },
    // 예시 데이터 추가
];

app.get('/get-activities', function (req, res) {
    // 실제로는 DB에서 활동 기록을 가져오거나, 다른 방법으로 데이터를 조회해야 합니다.
    res.send({ ok: true, activities });
});