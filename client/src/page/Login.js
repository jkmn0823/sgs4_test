import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../css/Login.css";

function Login() {
  const [id, setId] = useState("");
  const [pw, setPw] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    if (id && pw) {
      try {
        const response = await axios.get(`http://localhost:8080/login/${id}/${pw}`);
        if (response.data.ok) {
          localStorage.setItem("user", JSON.stringify(response.data.user));
          navigate('/'); // 메인 페이지로 이동
        } else {
          setMessage("ID 또는 비밀번호가 잘못되었습니다.");
        }
      } catch (error) {
        setMessage("로그인 중 오류가 발생했습니다.");
      }
    } else {
      setMessage("ID와 비밀번호를 입력해주세요.");
    }
  };

  return (
    <div className="login_sh">
      <div className="Login_box">
        <div className="hh">
          <div className="Login_header" onClick={() => navigate("/")}>
            <h1>대외활동</h1>
          </div>
        </div>
        <h2>로그인</h2>
        <div className="Login_minibox">
          <div className="name_id">
            <p>ID</p>
          </div>
          <div className="input_id">
            <input
              type="text"
              value={id}
              onChange={(e) => setId(e.target.value)}
              placeholder="아이디 입력"
            />
          </div>
          <div className="name_pw">
            <p>PW</p>
          </div>
          <div className="input_pw">
            <input
              type="password"
              value={pw}
              onChange={(e) => setPw(e.target.value)}
              placeholder="비밀번호 입력"
            />
          </div>
        </div>
        <div className="sign_move">
          <p onClick={() => navigate('/signup')}>회원가입</p>
        </div>
        <div className="login_button">
          <button className="login_b" onClick={handleLogin}>
            로그인
          </button>
        </div>
        {message && <p>{message}</p>}
      </div>
    </div>
  );
}

export default Login;
