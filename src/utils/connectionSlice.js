import { createSlice } from "@reduxjs/toolkit";
import reducer from "./userSlice";

const connectionSlice = createSlice({
    name:"connection",
    initialState: null,
    reducers:{
        addConnections: (state, action)=>{
            return action.payload;
        },
        removeConnections: () => null
    }
});


export const {addConnections, removeConnections} = connectionSlice.actions;

export default connectionSlice.reducer;