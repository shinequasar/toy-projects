import { Table } from 'react-bootstrap'
import {useDispatch, useSelector} from "react-redux";
import {changeName, addCount, addAge} from "../store";
import {memo, useState} from "react";

let Child = memo(function (){
    console.log('재랜더링됨')
    return <div>자식입니다.</div>
})

function Cart(){
    let dispatch = useDispatch();
    let state = useSelector((state)=>{return state})
    let products = state.products
    let [count, setCount] = useState(0)

    return(
        <div>
            <Child count={{count}}></Child>
            <button onClick={()=>{setCount(count+1)}}>+</button>
            <h5 className="container">{state.user.age}짤 {state.user.name}의 장바구니 </h5>
            <button onClick={()=>{
                dispatch(changeName())
            }}>이름변경</button>
            <button onClick={()=>{
                dispatch(addAge(10))
            }}>나이변경</button>
        <Table>
            <thead>
            <tr>
                <th>상품번호</th>
                <th>상품명</th>
                <th>수량</th>
                <th>변경하기</th>
            </tr>
            </thead>
            <tbody>
            {
                products.map((product,i)=>
                    <tr key={i}>
                        <td>{product.id}</td>
                        <td>{product.name}</td>
                        <td>{product.count}</td>
                        <td><button onClick={()=>{
                            dispatch(addCount(product))
                        }}>+</button></td>
                    </tr>
                )
            }
            </tbody>
        </Table>
    </div>)
}

export default Cart