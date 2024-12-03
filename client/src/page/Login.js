import { useState } from "react";
import { useNavigate } from "react-router-dom"; // 페이지 이동을 위한 useNavigate import
import axios from "axios";
import "../css/Login.css";

function Login() {
  const [id, setId] = useState("");
  const [pw, setPw] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate(); // navigate 훅을 사용하여 페이지 이동

  const handleLogin = async () => {
    if (id && pw) {
      try {
        const response = await axios.get(`http://localhost:8080/login/${id}/${pw}`);
        if (response.data.ok) {
          // 로그인 성공 시 사용자 정보 로컬스토리지에 저장
          localStorage.setItem("user", JSON.stringify(response.data.user));
          setMessage(`로그인 성공! 환영합니다, ${response.data.user.name}님`);
          navigate('/'); // 로그인 후 홈으로 이동
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

  const goToSignup = () => {
    navigate('/signup'); // 회원가입 페이지로 이동
  };

  return (
    <div className="login_sh">
      <div className="Login_box">
        <div className="Login_header">
          <h1>로그인</h1>
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
        </div>
        <div className="sign_move">
          <p onClick={goToSignup}>회원가입</p>
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
