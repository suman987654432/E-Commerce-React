
import { createSlice } from "@reduxjs/toolkit";
import {message} from "antd";
const cartSlice= createSlice({
    name:"mycart",
    initialState:{
        cart:[]
    },
    reducers:{
        addtoCart:(state, actions)=>{
            const data= state.cart.filter(key=>key.id==actions.payload.id)
            if (data.length>=1)
            {
              message.error("Product aleready added!!!");
            }
            else 
            {
                state.cart.push(actions.payload)
            }
        },

        qntyInc:(state, actions)=>{
             for (var i=0; i<state.cart.length; i++)
             {
                if (state.cart[i].id==actions.payload.id)
                {
                    state.cart[i].qnty++;
                }
             }
        },
        qntyDec:(state, actions)=>{
            for (var i=0; i<state.cart.length; i++)
            {
               if (state.cart[i].id==actions.payload.id)
               {
                   if (state.cart[i].qnty<=1)
                   {
                      message.error("Quantity not less than 1")
                   }
                   else 
                   {
                    state.cart[i].qnty--;
                   }
                  
               }
            }
       },

       proDelete:(state, actions)=>{
        state.cart= state.cart.filter(key=>key.id!=actions.payload)
       }

    }
})
export const {addtoCart, qntyInc, qntyDec, proDelete} = cartSlice.actions;
export default cartSlice.reducer;
