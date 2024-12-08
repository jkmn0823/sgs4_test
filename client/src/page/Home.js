import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "../css/Home.css";
import Activity from "./Activity";
import Record from "./Record";

function Home() {
  const user = JSON.parse(localStorage.getItem("user"));
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState('activity');


  const handleLogout = async () => {
    if (user) {
      try {
        const response = await axios.get(`http://localhost:8080/logout/${user.id}`);
        
        if (response.data.ok) {
          console.log("로그아웃 성공: ", response.data.message);
          localStorage.removeItem("user");
          navigate('/');
        } else {
          console.log("로그아웃 실패: ", response.data.message);
        }
      } catch (error) {
        console.log("로그아웃 중 오류 발생: ", error);
      }
    }
  };

  const handleGoToRecord = () => {
    setCurrentPage('record');
  };

  const handleGoToActivity = () => {
    setCurrentPage('activity');
  };

  return (
    <div className="Home">
      <div className="Home-header">
        <div className="Home_tittle">
          <h2>대외활동 기록 서비스</h2>
        </div>
        <div className="header_button">

          <button onClick={handleGoToActivity}>
            작성하기
          </button>
          <button onClick={handleGoToRecord}>
            기록보기
          </button>
        </div>
        <div className="h_login">
          {user ? (
            <>
              <p>{user.name}님 환영합니다!</p>
              <button onClick={handleLogout}>로그아웃</button>
            </>
          ) : (
            <Link to="/login">
              <button><p>로그인</p></button>
            </Link>
          )}
        </div>
      </div>

      <div className="main_body">
        {currentPage === 'record' ? (
          <Record user={user} />
        ) : (
          <Activity user={user} />
        )}
      </div>
    </div>
  );
}

export default Home;
