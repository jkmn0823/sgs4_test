import { useState, useEffect } from "react";
import "../css/Activity.css";
import Main from "./Main";
import Record from "./Record";

function Activity({ user }) {
  return (
    <div className="Program">
      <div className="Program_h">
        <h1>추천 대외활동</h1>
      </div>
      <div className="Program_b">
        {/* 로그인했을 때만 Main과 Record 컴포넌트를 표시 */}
        {user ? (
          <>
            <Main />
            <Record />
          </>
        ) : (
          <p>로그인 후 대외활동을 확인하세요.</p>
        )}
      </div>
    </div>
  );
}

export default Activity;
