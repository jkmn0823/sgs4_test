import React,{ useEffect, useState } from "react";
import axios from "axios";
import "../css/Record.css";

function Record() {
  const [activities, setActivities] = useState([]);
  const [expandedIndex, setExpandedIndex] = useState(null);

  const truncateText = (text, maxLength) => {
    if (text.length > maxLength) {
      return text.slice(0, maxLength) + "...";
    }
    return text;
  };

  useEffect(() => {
    const fetchActivities = async () => {
      try {
        const response = await axios.get("http://localhost:8080/get-activities");

        if (response.data.ok) {
          setActivities(response.data.activities);
        } else {
          console.log("활동 기록을 가져오는 데 실패했습니다.");
        }
      } catch (error) {
        console.log("활동 기록 가져오기 중 오류 발생:", error);
      }
    };

    fetchActivities();
  }, []);

  const toggleDetails = (index) => {
    if (expandedIndex === index) {
      setExpandedIndex(null);
    } else {
      setExpandedIndex(index);
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
                  <td>{truncateText(activity.content, 30)}</td>
                  <td>{activity.date}</td>
                </tr>
                {expandedIndex === index && (
                  <tr>
                    <td colSpan="4" className="expanded-content">
                      {activity.content}
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
