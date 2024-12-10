import React, { useEffect, useState } from "react";
import axios from "axios";
import "../css/Record.css";

function Record() {
  const [activities, setActivities] = useState([]); //활동기록저장
  const [expandedIndex, setExpandedIndex] = useState(null);//새로들어온 활동
  const [searchTerm, setSearchTerm] = useState(""); //검색
  const [editActivity, setEditActivity] = useState(null);

  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    if (!user) {
      setActivities([]);
      return;
    }

    const fetchActivities = async () => { //활동기록을 서버에서 받아온다.
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

  //내용이 긴경우 ...로 표 크기를 유지시ㅣ킨다.
  const truncateText = (text, maxLength) => {
    return text.length > maxLength ? `${text.slice(0, maxLength)}...` : text;
  };

  const filteredActivities = [];
  for (let i = 0; i < activities.length; i++) {
    const activity = activities[i];
    const searchText = searchTerm.toLowerCase();
    if (
      activity.category.toLowerCase().includes(searchText) ||
      activity.title.toLowerCase().includes(searchText) ||
      activity.content.toLowerCase().includes(searchText)
    ) {
      filteredActivities.push(activity); // 조건에 맞으면 배열에 추가
      }
  }
  

  const handleDelete = async (id) => {
    try {
      //서버에 활동삭제 요청
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

  //활동 수정
  const handleEdit = async () => {
    if (!editActivity) return; //아무것도 없으면 return
  
    try {
      const response = await axios.put(`http://localhost:8080/update-activity/${editActivity.id}`, editActivity);
      if (response.data.ok) { //ok신호를 받았다면 활동목록 업데이트
        setActivities(prevActivities => 
          prevActivities.map(activity => 
            activity.id === editActivity.id 
              ? { ...activity, title: editActivity.title, content: editActivity.content } 
              : activity
          )
        );
        setEditActivity(null);
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
          onChange={(e) => setSearchTerm(e.target.value)}
        />

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
          {/* 위에서 해당사용자의 활동기록을 불러온다.  */}
          {filteredActivities.length > 0 ? (
            filteredActivities.map((activity, index) => (
              <React.Fragment key={index}>
                <tr onClick={() => toggleDetails(index)}>
                  <td>{activity.category}</td>
                  <td>{activity.title}</td>
                  <td>{truncateText(activity.content, 30)}</td> {/* 30글자 만 받아옴 */}
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
              </React.Fragment> //부모요소
            ))
          ) : (  //사용자에게 해당하는 기록이 없는경우
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
