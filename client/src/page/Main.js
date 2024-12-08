import { useState } from "react";
import axios from "axios";
import "../css/Main.css";

function Main() {
  const [category, setCategory] = useState("");
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [date, setDate] = useState("");
  const [message, setMessage] = useState("");

  const user = JSON.parse(localStorage.getItem("user"));

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!user) {
      setMessage("로그인 정보가 없습니다.");
      return;
    }

    const activityData = {
      userId: user.id,
      category,
      title,
      content,
      date,
    };

    try {
      const response = await axios.post("http://localhost:8080/submit-activity", activityData);

      if (response.data.ok) {
        alert("활동 기록이 제출되었습니다!");
        setCategory("");
        setTitle("");
        setContent("");
        setDate("");
        setMessage(""); // 메시지 초기화
      } else {
        alert("활동 기록 제출 실패: " + response.data.message);
        setMessage(response.data.message);
      }
    } catch (error) {
      console.error("서버에 요청하는 중 오류 발생:", error);
      setMessage("서버 요청 중 오류가 발생했습니다.");
    }
  };

  return (
    <div className="M_body">
      <h1>활동 양식 내용</h1>
      <form onSubmit={handleSubmit} className="formm">
        <div className="c_t_d">
          <div className="category">
            <label>카테고리:</label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              required
            >
              <option value="">선택하세요</option>
              <option value="봉사">봉사</option>
              <option value="대외활동">대외활동</option>
              <option value="공모전">공모전</option>
            </select>
          </div>
          <div className="tittle">
            <label>제목:</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>
          <div className="date">
            <label>날짜:</label>
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              required
            />
          </div>
        </div>

        <div className="내용">
          <textarea
            placeholder="내용을 입력해주세요"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
          />
        </div>
        <div className="form_button">
          <button type="submit">제출</button>
        </div>
      </form>

      {message && <p className="message">{message}</p>}
    </div>
  );
}

export default Main;
