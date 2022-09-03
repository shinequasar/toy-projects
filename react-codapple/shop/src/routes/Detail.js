import {Container, Row, Col,Button} from 'react-bootstrap';
import {Link, useParams} from 'react-router-dom'
import styled from "styled-components";
import {useEffect, useState} from "react";
import event from "./Event";
import Nav from 'react-bootstrap/Nav';
import {useDispatch} from "react-redux";
import {addCart} from "../store";

function Detail(props){
  let {id} = useParams();
  let [alert, setAlert] = useState(true);
  let [count, setCount] = useState(0);
  let [text, setText] = useState('');
  let [textState, setTextState] = useState(true);
  let [tab, setTab] = useState(0);
  let [fade2, setFade2] = useState('');

  const findShoe = props.shoes.find((shoe)=>shoe.id == id);

  useEffect(()=>{
      let a = setTimeout(()=>{ setAlert(false)},2000);
      return ()=> {
          clearTimeout(a)
      }
  },[])

    useEffect(()=>{
        if (isNaN(text) == true) setTextState(false);
        else setTextState(true);
    },[text])

    useEffect(()=>{
        let time = setTimeout(()=>{setFade2('end')},10)
        return ()=>{
            clearTimeout(time);
            setFade2('')
        }
    },[])

    return(
        <div className={`container2 start ${fade2}`}>
            <div>
                {
                    alert == true
                        ? <div className="alert alert-warning">2초 이내 구매시 할인</div>
                        : null
                }
                {
                    textState != true
                    ?<div className="alert alert-danger">숫자만 입력 가능합니다.</div>
                    :null
                }
            </div>

          <div className="container">
            <Row>
                {
                    findShoe!==undefined
                    ? <Product shoes={findShoe} num={findShoe.id}/>
                    :<h3>존재하지 않는 상품입니다.</h3>
                }
            </Row>
          </div>
            <div className="container">
                <Link to="/" className="link">
                    메인페이지
                </Link>
                <Link to="/about" className="link">
                    상세페이지
                </Link>
            </div>
            <div  className="container">
                <h3>{count}</h3>
                <button onClick={()=>{setCount(++count)}}>버튼</button>
                <input type="text" onChange={(e)=>{
                    setText(e.target.value);
                }}/>
            </div>
            <Nav variant="tabs" defaultActiveKey="link0">
                <Nav.Item>
                    <Nav.Link eventKey="link0" onClick={()=>{setTab(0)}}>상세정보</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link eventKey="link1"  onClick={()=>{setTab(1)}}>리뷰</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link eventKey="link2"  onClick={()=>{setTab(2)}}>사이즈안내</Nav.Link>
                </Nav.Item>
            </Nav>
            <Tap tab={tab}/>
      </div>
    );
}

/**
 * 상품정보들 나오는 컴포넌트
 * @param {string} props 프롭스
 * @returns {JSX.Element}
 * @constructor
 */
function Product(props){
    let dispatch = useDispatch();
    let link="https://codingapple1.github.io/shop/shoes"+(Number(props.num)+1)+".jpg";
    let copyProduct = {id:props.shoes.id, name:props.shoes.title, count:1}
    return(
      <Col className="col-bg">
          <img src={link} alt="신발사진"/>
          <h4>{props.shoes.title}</h4>
          <p>{props.shoes.price}\</p>
          <button onClick={()=>{
            dispatch(addCart(copyProduct))
            console.log(props.shoes)
          }}>구매하기</button>
      </Col>
    )
}

function Tap({tab}){
    let [fade, setFade] = useState('');

    useEffect(()=>{
        let time = setTimeout(()=>{setFade('end')},10)
        return ()=>{
            clearTimeout(time);
            setFade('')
        }
    },[tab])

    return (<div className={`start ${fade}`}>
        {[<div>상세정보</div>,<div>리뷰</div>,<div>사이즈안내</div>][tab]}
    </div>)
}

export default Detail;