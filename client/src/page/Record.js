import { useEffect, useState } from "react";
import axios from "axios";
import "../css/Record.css";

function Record() {
  const [activities, setActivities] = useState([]);

  useEffect(() => {
    const fetchActivities = async () => {
      try {
        const response = await axios.get("http://localhost:8080/get-activities");

        if (response.data.ok) {
          setActivities(response.data.activities); // 활동 기록 상태 업데이트
        } else {
          console.log("활동 기록을 가져오는 데 실패했습니다.");
        }
      } catch (error) {
        console.log("활동 기록 가져오기 중 오류 발생:", error);
      }
    };

    fetchActivities();
  }, []);

  return (
    <div className="M_foot">
      <h1>활동 기록 - 테이블</h1>
      <table>
        <thead>
          <tr>
            <th>카테고리</th>
            <th>제목</th>
            <th>내용</th>
            <th>날짜</th>
          </tr>
        </thead>
        <tbody>
          {activities.length > 0 ? (
            activities.map((activity, index) => (
              <tr key={index}>
                <td>{activity.category}</td>
                <td>{activity.title}</td>
                <td>{activity.content}</td>
                <td>{activity.date}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4">활동 기록이 없습니다.</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default Record;
