

const INITIAL_STATE={
    'first_name':'',
    'last_name':'',
    'email':'',
    'address': ''
}

const userReducer = (state=INITIAL_STATE,action) =>{
    if(action.type=='GET_PROFILE'){
        return {...state,first_name:action.payload.first_name,
                last_name:action.payload.last_name,
                email:action.payload.email,
                address:action.payload.address
                }
     }
     else {
         return state;
     }

}

export default userReducer;
