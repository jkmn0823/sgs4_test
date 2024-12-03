import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "../css/Home.css";
import Activity from "./Activity";

function Home() {
  const user = JSON.parse(localStorage.getItem("user"));
  const navigate = useNavigate(); // 페이지 이동을 위한 useNavigate

  const handleLogout = async () => {
    if (user) {
      try {
        // 서버에 로그아웃 요청
        const response = await axios.get(`http://localhost:8080/logout/${user.id}`);
        
        if (response.data.ok) {
          console.log("로그아웃 성공: ", response.data.message);
          localStorage.removeItem("user"); // 로컬스토리지에서 사용자 정보 제거
          navigate('/'); // 로그인 페이지로 리디렉션
        } else {
          console.log("로그아웃 실패: ", response.data.message);
        }
      } catch (error) {
        console.log("로그아웃 중 오류 발생: ", error);
      }
    }
  };

  return (
    <div className="Home">
      <div className="Home-header">
        <div className="Home_tittle">
          <h2>대외활동 기록 서비스</h2>
        </div>
        <div className="h_login">
          {user ? (
            <>
              <p>{user.name}님 환영합니다!</p> {/* 로그인된 사용자 이름 출력 */}
              <button onClick={handleLogout}>로그아웃</button> {/* 로그아웃 버튼 */}
            </>
          ) : (
            <Link to="/login">
              <button><p>로그인</p></button>
            </Link>
          )}
        </div>
      </div>
      <div className="main_body">
        <Activity user={user} />
      </div>
    </div>
  );
}

export default Home;
