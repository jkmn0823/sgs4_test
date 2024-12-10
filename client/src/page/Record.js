import React, { useEffect, useState } from "react";
import axios from "axios";
import "../css/Record.css";

function Record() {
  const [activities, setActivities] = useState([]);
  const [expandedIndex, setExpandedIndex] = useState(null);
  const [searchTerm, setSearchTerm] = useState(""); // 검색어 상태 추가
  const [editActivity, setEditActivity] = useState(null); // 수정할 활동 상태 추가

  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    if (!user) {
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

  // 검색어에 맞는 활동만 필터링
  const filteredActivities = activities.filter(activity => {
    const searchText = searchTerm.toLowerCase();
    return (
      activity.category.toLowerCase().includes(searchText) ||
      activity.title.toLowerCase().includes(searchText) ||
      activity.content.toLowerCase().includes(searchText)
    );
  });

  const handleDelete = async (id) => {
    try {
      const response = await axios.delete(`http://localhost:8080/delete-activity/${id}`);
      if (response.data.ok) {
        setActivities(activities.filter(activity => activity.id !== id));
        alert("삭제가 완료되었습니다.")
      } else {
        alert("삭제 실패");
      }
    } catch (error) {
      alert("삭제 오류");
    }
  };

  const handleEdit = async () => {
    if (!editActivity) return;
  
    try {
      const response = await axios.put(`http://localhost:8080/update-activity/${editActivity.id}`, editActivity);
      if (response.data.ok) {
        // 수정된 데이터를 상태에 반영
        setActivities(prevActivities => 
          prevActivities.map(activity => 
            activity.id === editActivity.id 
              ? { ...activity, title: editActivity.title, content: editActivity.content } 
              : activity
          )
        );
        setEditActivity(null); // 수정 완료 후 초기화
        alert("수정이 완료되었습니다.");
      } else {
        alert("수정 실패");
      }
    } catch (error) {
      alert("수정 오류");
    }
  };
  

  return (
    <div className="M_foot">
      <h1>활동 기록</h1>
        <input
          className="search"
          type="text"
          placeholder="검색"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)} // 검색어 상태 업데이트
        />


      {/* 수정 폼 */}
      {editActivity && (
        <div className="editbox">
          <h3>활동 수정</h3>
          <div className="e_tittle">
            <input
              type="text"
              value={editActivity.title}
              onChange={(e) => setEditActivity({ ...editActivity, title: e.target.value })}
              placeholder="제목"
            />
          </div>
          <textarea
            className="edit_t"
            value={editActivity.content}
            onChange={(e) => setEditActivity({ ...editActivity, content: e.target.value })}
            placeholder="내용"
          />
          <div>
            <button
            className="edit_fin" 
            onClick={handleEdit}>수정 완료</button>
          </div>
        </div>
      )}

      <table>
        <thead>
          <tr>
            <th>카테고리</th>
            <th>제목</th>
            <th>내용</th>
            <th>날짜</th>
            <th>수정</th>
            <th>삭제</th>
          </tr>
        </thead>
        <tbody>
          {filteredActivities.length > 0 ? (
            filteredActivities.map((activity, index) => (
              <React.Fragment key={index}>
                <tr onClick={() => toggleDetails(index)}>
                  <td>{activity.category}</td>
                  <td>{activity.title}</td>
                  <td>{truncateText(activity.content, 30)}</td> 
                  <td>{activity.date}</td>
                  <td><button className="edit" onClick={() => setEditActivity(activity)}>수정</button></td>
                  <td><button className="delte" onClick={() => handleDelete(activity.id)}>삭제</button></td>
                </tr>
                {expandedIndex === index && (
                  <tr>
                    <td colSpan="6" className="expanded-content">
                      {activity.content}
                    </td>
                  </tr>
                )}
              </React.Fragment>
            ))
          ) : (
            <tr>
              <td colSpan="6">활동 기록이 없습니다.</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default Record;
