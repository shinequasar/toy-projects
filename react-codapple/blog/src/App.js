import logo from "./logo.svg";
import "./App.css";
import { useState } from "react";

function App() {
  let post = "의정부 우동 맛집";
  let [글제목, 글제목변경] = useState([
    "남자코트추천",
    "의정부 피자맛집",
    "강남 맥주맛집",
  ]);
  let [따봉, 따봉변경] = useState([0,0,0]);
  let [modal, setMotal] = useState(false);
  let [title, setTitle] = useState(0);
  let [입력값, 입력값변경] = useState('');

  return (
    <div className="App">
      <div className="black-nav">
        <h4>대충 블로그임</h4>
      </div>

      <button
        onClick={() => {
          let copy = [...글제목];
          copy[0] = "여자코트추천";
          글제목변경(copy);
        }}
      >
        글자바꾸기
      </button>

      <button
        onClick={() => {
          let copy = [...글제목];
          copy.sort();
          글제목변경(copy);
        }}
      >
        가나다정렬
      </button>


      {글제목.map(function (a, i) {
        return(
          <div className="list" key={i}>
          <h4 onClick={()=>{setMotal(true); setTitle(i);}}>{a}
            <span onClick={() => {
              // e.stopPropagation();  버블링 막아주는 거
                let copy = [...따봉];
                copy[i] = copy[i] + 1;
                따봉변경(copy);
              }}> 👍 :{" "}</span>
            {따봉[i]}
          </h4>
          <p>8월 18일 발행</p>
          <button onClick={()=>{
            let copy = [...글제목];
            copy.splice(i,1);
            글제목변경(copy);
            let copy따봉 = [...따봉];
            copy따봉.splice(i,1);
            따봉변경(copy따봉);
          }}>글 삭제하기</button>
        </div>
        )
      })}

      <input onChange={(e)=>{ 입력값변경(e.target.value); }}></input>
      <button onClick={()=>{
        let copy = [...글제목];
        copy.push(입력값);
        글제목변경(copy);

        let copy따봉 = [...따봉];
        copy따봉.push(0);
        따봉변경(copy따봉);
      }}>글 등록하기</button>

      {modal == true ? <Modal 글제목={글제목} 글제목변경={글제목변경} title={title}/> : null}
    </div>
  );
}

function Modal(props) {
  return (
    <div className="modal">
      <h4>{props.글제목[props.title]}</h4>
      <p>날짜</p>
      <p>상세내용</p>
      <button onClick={()=>{
        let copy = [...props.글제목];
        copy[0] = "여자외투추천";
        props.글제목변경(copy);
      }}>글수정</button>
    </div>
  );
}

export default App;
