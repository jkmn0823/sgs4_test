import React,{ useEffect, useState } from "react";
import axios from "axios";
import "../css/Record.css";

function Record() {
  const [activities, setActivities] = useState([]);
  const [expandedIndex, setExpandedIndex] = useState(null); // 클릭한 항목의 인덱스를 저장

  // 내용이 길면 자르고 "..."으로 표시하는 함수
  const truncateText = (text, maxLength) => {
    if (text.length > maxLength) {
      return text.slice(0, maxLength) + "..."; // 최대 길이를 넘으면 잘라서 "..." 추가
    }
    return text;
  };

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

  // 클릭한 항목의 인덱스를 토글하는 함수
  const toggleDetails = (index) => {
    if (expandedIndex === index) {
      setExpandedIndex(null); // 이미 펼쳐져 있으면 닫음
    } else {
      setExpandedIndex(index); // 클릭한 항목을 펼침
    }
  };

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
              <React.Fragment key={index}>
                <tr onClick={() => toggleDetails(index)}>
                  <td>{activity.category}</td>
                  <td>{activity.title}</td>
                  <td>{truncateText(activity.content, 30)}</td> {/* 내용 30자 제한 */}
                  <td>{activity.date}</td>
                </tr>
                {/* 클릭한 항목이 펼쳐졌으면 전체 내용 표시 */}
                {expandedIndex === index && (
                  <tr>
                    <td colSpan="4" className="expanded-content">
                      {activity.content} {/* 전체 내용 표시 */}
                    </td>
                  </tr>
                )}
              </React.Fragment>
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
