import {configureStore, createSlice, current} from '@reduxjs/toolkit'
//state 만들기
let user = createSlice({
    name : 'user',
    initialState : {name:'원트', age:20},
    reducers : {
        changeName(state){
            state.name = '쏘'
        },
        addAge(state, action){
            state.age+=action.payload
        }
    }
})

export let {changeName, addAge} = user.actions

let stock = createSlice({
    name : 'stock',
    initialState : [10,11,12]
})

let products = createSlice({
    name : 'products',
    initialState : [
        {id : 0, name : 'White and Black', count : 2},
        {id : 2, name : 'Grey Yordan', count : 1}
    ],
    reducers : {
        addCount(state,action){
            let product = action.payload
            state.map((p,i)=>{
                if(product.id == p.id){
                    state[i].count+=1
                }
            })
        },
        addCart(state, action){
            state.push(action.payload);
            console.log(action.payload)
            console.log(current(state))
        }
    }
})

export let {addCount, addCart} = products.actions

//state 등록
export default configureStore({
    reducer: {
        user : user.reducer,
        stock : stock.reducer,
        products : products.reducer
    }
})