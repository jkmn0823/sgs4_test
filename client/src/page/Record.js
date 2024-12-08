import React, { useEffect, useState } from "react";
import axios from "axios";
import "../css/Record.css";

function Record() {
  const [activities, setActivities] = useState([]);
  const [expandedIndex, setExpandedIndex] = useState(null);

  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    if (!user) { //사용자가 없다면 테이블 초기화해라
      setActivities([]);
      return;
    }

    const fetchActivities = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/get-activities/${user.id}`);
        if (response.data.ok) {
          setActivities(response.data.activities);
        } else {
          setActivities([]);
        }
      } catch (error) {
        setActivities([]);
      }
    };

    fetchActivities();
  }, [user]);

  const toggleDetails = (index) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  const truncateText = (text, maxLength) => {
    return text.length > maxLength ? `${text.slice(0, maxLength)}...` : text;
  };

  return (
    <div className="M_foot">
      <h1>활동 기록</h1>

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
