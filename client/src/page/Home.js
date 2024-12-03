import { Link, useNavigate } from "react-router-dom";
import "../css/Home.css";

function Home() {
  const user = JSON.parse(localStorage.getItem("user"));
  const navigate = useNavigate(); // 페이지 이동을 위한 useNavigate

  const handleLogout = () => {
    localStorage.removeItem("user"); // 로컬스토리지에서 사용자 정보 제거
    navigate('/login'); // 로그인 페이지로 리디렉션
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
    </div>
  );
}

export default Home;
