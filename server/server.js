const express = require('express');
const cors = require('cors');
const app = express();

let userdata = [
    { id: 'test', pw: 'test', name: 'test', age: '23' },];
let activities = [
    { id: '1', userId: 'test', category: "봉사", title: "봉사활동 1", content: "어린이 도서관 봉사", date: "2024-11-01" },
    { id: '2', userId: 'test', category: "대외활동", title: "외부 행사 참여", content: "대학생 캠프 참가", date: "2024-11-05" },];

app.use(express.json());
app.use(cors());

app.listen(8080, function () {
    console.log("listening on 8080");
});

// [ID 중복 체크 API]
app.get('/idcheck/:id', function (req, res) {
    const id = req.params.id;
    const idcheck = userdata.some(user => user.id === id);
    res.send({ "ok": !idcheck });
});

// [회원가입 API]
app.get('/signup/:id/:pw/:name/:age', function (req, res) {
    const id = req.params.id;
    const pw = req.params.pw;
    const name = req.params.name;
    const age = req.params.age;

    const idcheck = userdata.some(user => user.id === id);
    if (idcheck) {
        res.send({ "ok": false });
    } else if (id && pw && name && age) {
        userdata.push({ id, pw, name, age });
        console.log("회원가입 완료 : ", userdata);
        res.send({ "ok": true });
    } else {
        res.send({ "ok": false });
    }
});

// [로그인 API]
app.get('/login/:id/:pw', function (req, res) {
    const id = req.params.id;
    const pw = req.params.pw;

    if (id && pw) {
        const user = userdata.find(user => user.id === id && user.pw === pw);
        if (user) {
            console.log("로그인 성공한 사용자: ", user);
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
        console.log(`${user.name}님 로그아웃 완료`);
        res.send({ "ok": true, message: `${user.name}님 로그아웃 완료` });
    } else {
        res.send({ "ok": false, message: "사용자가 존재하지 않습니다." });
    }
});

// [활동 기록 제출 API]
app.post('/submit-activity', function (req, res) {
    const { userId, category, title, content, date } = req.body;

    if (userId && category && title && content && date) {
        const newActivity = { 
            id: (activities.length + 1).toString(), //새로운 활동의 경우 id+1
            userId, 
            category, 
            title, 
            content, 
            date 
        };
        activities.push(newActivity); //배열에 푸쉬

        res.send({ ok: true, activities, message: "활동 기록이 성공적으로 제출되었습니다." });
    } else {
        res.send({ ok: false, message: "모든 필드를 작성해주세요." });
    }
});


// [활동 기록 조회 API]
app.get('/get-activities/:userId', function (req, res) {
    const userId = req.params.userId;

    if (userId) { //유저아이디 받아서 그에 맞는 활동 기록 조회해준다.(=필터링)
        const userActivities = activities.filter(activity => activity.userId === userId);

        if (userActivities.length > 0) {
            res.send({ ok: true, activities: userActivities });
        } else {
            res.send({ ok: false, message: "활동 기록이 없습니다." });
        }
    } else {
        res.send({ ok: false, message: "사용자 ID가 필요합니다." });
    }
});

// [활동 기록 삭제 API]
app.delete('/delete-activity/:id', function (req, res) {
    const activityId = req.params.id; //id를 받는다.
    const deletedActivity = activities.find(activity => activity.id === activityId); // activities 배열에서 id가 activityId와 일치하는 활동을 찾는다
    if (deletedActivity) {
        activities = activities.filter(activity => activity.id !== activityId);
        res.send({ ok: true, message: "활동이 삭제되었습니다." });
    } else {
        res.send({ ok: false, message: "활동을 찾을 수 없습니다." });
    }
});

// [활동 기록 수정 API]
app.put('/update-activity/:id', function (req, res) {
    const activityId = req.params.id;
    const { title, content } = req.body;

    const activity = activities.find(activity => activity.id === activityId); //activities배열에서 id가 activityId와 일치하는 활동을 찾음
    if (activity) {
        const oldActivity = { ...activity };
        activity.title = title || activity.title; //새로운 값(title)이 있다면 = activity.tile / 없다면 기존 유지
        activity.content = content || activity.content; //아래도 동일
        console.log("기존 내용: ", oldActivity);
        console.log("수정 완료 내용: ", activity);

        res.send({ ok: true, message: "활동이 수정되었습니다.", activity });
    } else {
        res.send({ ok: false, message: "활동을 찾을 수 없습니다." });
    }
});
