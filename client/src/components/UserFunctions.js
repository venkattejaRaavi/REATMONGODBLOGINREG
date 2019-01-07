import axios from 'axios';

export const register = (newUser) =>{
    return axios.post("users/register",{
        first_name:newUser.first_name,
        last_name: newUser.last_name,
        email:newUser.email,
        password: newUser.password,
        address: newUser.address

    })
    .then(response => {
        alert(newUser.email+" have been registered")
    })
}

export const login = (user) =>{
    return axios.post("users/login",{
        email: user.email,
        password:user.password
    })
    .then(response=>{
        if(response.data.status_code === 200){    
            localStorage.setItem('usertoken',response.data.token)
            return { 'token': response.data.token }
        }
        else if(response.data.status_code === 400)
        {
                // alert('Check your name and password')
               // window.location.href('/login')
                return { error : "check your name and password" }
        }
        else if(response.data.status_code === 404)
        {
            // alert('User not found')
            return { error : "User not found" }
            // window.location.('/register')
        }
    })
    /*.catch(err => {
        alert("Check your mailID and password")
        this.props.history.push('/login')
    })*/
}


export const getProfile = (id) =>async(dispatch)=>{
    const response= await axios.get("users/profile/"+id);
        
        dispatch({type:'GET_PROFILE',payload:response.data});
   
};


export const update = (id,formValues) => (dispatch)=>{
    return axios.patch("users/update/"+id,{
        new_first_name:formValues.first_name,
        new_last_name: formValues.last_name,
        new_email:formValues.email,
        new_address: formValues.address
    })
    .then(response=>{alert("Your details have been updated")})
}

export const deactivate = (id) => (dispatch)=>{
    return axios.delete("users/deactivate/"+id).then(response=>{alert("Goodbye!")})
}