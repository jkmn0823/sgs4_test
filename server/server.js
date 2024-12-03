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
