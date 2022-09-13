import {Link} from 'react-router-dom'
import axios from "axios";
import {Col} from "react-bootstrap";
import {useEffect, useState} from "react";

function Main(props) {
    let [update, setUpdate] = useState(props.shoes);
    useEffect(()=>{
        console.log(update)
    },[update])


  return (
    <>
      <div className="main-bg"></div>
      <div className="container">
        <Link to="/" className="link">
          메인페이지
        </Link>
        <Link to="/about" className="link">
          상세페이지
        </Link>
      </div>
        <div className="container">
            {
                update.map((shoe, i)=>{
                    return <Product shoes={shoe} num={i}/>
                })
            }
        </div>
        <button className="btn" onClick={()=>{
            axios.get('https://codingapple1.github.io/shop/data2.json')
                .then((result)=>{
                    // console.log(result.data)
                    let copyUpdate = [...update];
                    result.data.map((data)=>{
                        copyUpdate.push(data)
                    })
                    setUpdate(copyUpdate);
                })
                .catch(()=>[
                    console.log("실패함")
                ])
        }}>더보기</button>
    </>
  );
}
function Product(props){
    let link="https://codingapple1.github.io/shop/shoes"+(Number(props.num)+1)+".jpg";
    return(
        <Col className="col-bg">
            <img src={link} alt="신발사진"/>
            <h4>{props.shoes.title}</h4>
            <p>{props.shoes.price}\</p>
            <button>구매하기</button>
        </Col>
    );}

export default Main;