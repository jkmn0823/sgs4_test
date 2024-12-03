import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../css/Login.css";

function Signup() {
  const [id, setId] = useState("");
  const [pw, setPw] = useState("");
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [message, setMessage] = useState("");

  // 페이지 이동을 위한 useNavigate 훅
  const navigate = useNavigate();

  const handleSignup = async () => {
    if (id && pw && name && age) {
      try {
        const response = await axios.get(`http://localhost:8080/signup/${id}/${pw}/${name}/${age}`);
        if (response.data.ok) {
          setMessage("회원가입 성공! 로그인 페이지로 이동합니다.");
          // 회원가입 성공 후 로그인 페이지로 이동
          setTimeout(() => {
            navigate("/login");
          }, 2000); // 2초 후에 로그인 페이지로 이동
        } else {
          setMessage("아이디가 이미 존재합니다.");
        }
      } catch (error) {
        setMessage("회원가입 중 오류가 발생했습니다.");
      }
    } else {
      setMessage("모든 필드를 입력해주세요.");
    }
  };

  return (
    <div className="login_sh">
      <div className="Login_box">
        <div className="Login_header">
          <h1>회원가입</h1>
        </div>
        <div className="Login_minibox">
          <div className="name_id">
            <p>ID</p>
          </div>
          <div className="input_id">
            <input type="text" value={id} onChange={(e) => setId(e.target.value)} placeholder="아이디 입력" />
          </div>
          <div className="name_pw">
            <p>PW</p>
          </div>
          <div className="input_pw">
            <input type="password" value={pw} onChange={(e) => setPw(e.target.value)} placeholder="비밀번호 입력" />
          </div>
          <div className="name_name">
            <p>이름</p>
          </div>
          <div className="input_name">
            <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="이름 입력" />
          </div>
          <div className="name_age">
            <p>나이</p>
          </div>
          <div className="input_age">
            <input type="number" value={age} onChange={(e) => setAge(e.target.value)} placeholder="나이 입력" />
          </div>
        </div>
        <div className="login_button">
          <button className="login_b" onClick={handleSignup}>
            회원가입
          </button>
        </div>
        {message && <p>{message}</p>}
      </div>
    </div>
  );
}

export default Signup;
