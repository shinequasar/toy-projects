import "./App.css";
import { Navbar, Container, Nav, Row, Col } from "react-bootstrap";
import {Suspense, lazy, useEffect, useState} from "react";
import data from "./data";
import { Routes, Route, Link, useNavigate, Outlet } from "react-router-dom";
import Main from "./routes/Main";
import Event from "./routes/Event";
import axios from "axios";
import {useQuery} from "@tanstack/react-query";

const Detail = lazy(()=> import('./routes/Detail'));
const Cart = lazy(()=>import('./routes/Cart'));

function App() {

  useEffect(()=>{
    localStorage.setItem('watched',JSON.stringify([]))
  },[])

  let obj = {name : 'kim'}
  localStorage.setItem('data',JSON.stringify(obj))

  let navigate = useNavigate();
  let [shoes] = useState(data);

  let result = useQuery(['loadName'],()=>
  axios.get('https://codingapple1.github.io/userdata.json').then((a)=>{
    return a.data
    })
  )


  return (
    <div className="App">
      <Navbar bg="dark" variant="dark">
        <Container>
          <Navbar.Brand href="#home">원트샵</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link onClick={()=>{navigate('/')}} href="#home">메인페이지</Nav.Link>
            <Nav.Link onClick={()=>{navigate('/detail/0')}} href="#features">자세히보기</Nav.Link>
            <Nav.Link onClick={()=>{navigate('/event')}} href="#features">이벤트</Nav.Link>
            <Nav.Link onClick={()=>{navigate('/cart')}} href="#features">장바구니</Nav.Link>
          </Nav>
          <Nav className="ms-auto text-white">반가워요 Want</Nav>
        </Container>
      </Navbar>

      <Suspense fallback={<div>로딩중입니다.</div>}>
        <Routes>
          <Route path="/" element={<Main shoes={shoes}/>}></Route>
          <Route path="/detail/:id" element={<Detail shoes={shoes}/>}></Route>
          <Route path="/event" element={<Event/>}>
            <Route path="one" element={<p>첫 주문시 배즙 서비스</p>}></Route>
            <Route path="two" element={<p>생일기념 쿠폰받기</p>}></Route>
          </Route>
          <Route path="/cart" element={<Cart/>}/>
          <Route path="*" element={<div>없는 페이지입니다.</div>}/>
        </Routes>
      </Suspense>
    </div>
  );
}

export default App;
