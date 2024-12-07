// import { useState, useEffect } from "react";
import "../css/Activity.css";
import Main from "./Main";
import shinnan from "../images/shinnan.jpg";
import lg from "../images/LG.jpg"
import hyundai from "../images/Hyundai.jpg"
import isg from "../images/ISG.jpg"


function Activity({ user }) {
  return (
    <div className="Program">
      <div className="Program_h">
        <h1>추천 대외활동</h1>
        <div className="big_box">
          <a href="https://linkareer.com/activity/209656" 
          alt="신한투자증권 대학생 팬슈머 클럽 2기 모집" 
          target="_blank" 
          rel="noreferrer noopener">
            <div className="box">
              <div className="image_dis">
                <div className="image">
                    <img src={shinnan} title="페이지로 이동" alt=""/>
                </div>
              </div>
              <p className="tittle">신한투자증권 대학생 팬슈머 클럽 &lt;쏠-루션&gt; 2기 모집</p>
              <p className="date">2024.11.18 ~ 2024.12.08</p>
            </div>
          </a>
          <a href="https://linkareer.com/activity/208868" alt="" target="_blank" rel="noreferrer noopener">
            <div className="box">
              <div className="image_dis">
                <div className="image">
                  <img src={lg} title="페이지로 이동" alt=""/>
                </div>
              </div>
              <p className="tittle">[LG유플러스]유레카 SW 교육 과정 2기</p>
              <p className="date">2024.11.11 ~ 2024.12.15</p>
            </div>
          </a>
          <a href="https://linkareer.com/activity/211955" target="_blank" rel="noreferrer noopener">
            <div className="box">
              <div className="image_dis">
                <div className="image">
                  
                    <img src={hyundai} title="페이지로 이동" alt=""/>
                </div>
              </div>
              <p className="tittle">[H-점프스쿨] 현대차그룹 대학생 교육봉사단 H-점프스쿨 12기 장학샘 모집(~12/29까지)</p>
              <p className="date">2024.11.19 ~ 2024.12.29</p>
            </div>
          </a>
          <a href="https://linkareer.com/activity/212915" target="_blank" rel="noreferrer noopener">
            <div className="box">
              <div className="image_dis">
                <div className="image">
                  
                    <img src={isg} title="페이지로 이동" alt="">
                    </img>

                </div>
                
              </div>
              <p className="tittle">[인터내셔널스포츠그룹] ISG 서포터즈 11기 모집</p>
              <p className="date">2024.11.30 ~ 2024.12.29</p>
            </div>
          </a>
        </div>
      </div>

      <div className="Program_b">
        {user ? (
          <>
            <Main />
          </>
        ) : (
          <p>로그인 후 대외활동을 확인하세요.</p>
        )}
      </div>
    </div>
  );
}

export default Activity;
