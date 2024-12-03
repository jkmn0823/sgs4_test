import "../css/Activity.css"
import Main from "./Main";
import Record from "./Record";
function Activity(){

  return(
    <div className="Program">
      <div className="Program_h">
        <h1>추천 대외활동</h1>
      </div>
      <div className="Program_b">
        <Main/>
      </div>
      <div className="Program_f">
        <Record/>
      </div>

    </div>
  );
}

export default Activity;