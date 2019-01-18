import axios from 'axios';

export const register = (newUser) => {
    
    return axios.post("users/register", {
        first_name: newUser.first_name,
        last_name: newUser.last_name,
        email: newUser.email,
        password: newUser.password,
        address: newUser.address

    })
        .then(response => {
            localStorage.setItem('registrationToken',response.data.registration_token)
            return response.data
        })
}

export const checkEmail = ()=> (dispatch)=>{
    return axios.get("users/emailverification",{
        headers: {
            Authorization: "Bearer " + localStorage.registrationToken
        }
        
    }).then(res=> {console.log(res)
        return res.data}).catch(err=>console.log(err));
    
    
};

export const sendOTP = (user_phone)=> async (dispatch) =>{
    console.log("Inside the sendOTP",user_phone)
    const response= await axios.post("users/phoneverification/",
    {
        phone:user_phone.phone
        
    },
    {headers:{ Authorization: "Bearer " + localStorage.registrationToken }},

    )
    return response.data;
}
export const verifyOTP = (user_otp)=> async (dispatch) =>{
    const response= await axios.post("users/otpverification/",
    {
        otp:user_otp.otp
        
    },
    {headers:{ Authorization: "Bearer " + localStorage.sms_token}},

    )
    return response.data;
}

export const login = (user) => {
    return axios.post("users/login", {
        email: user.email,
        password: user.password
    })
        .then(response => {
            return response.data
        })
    
}


export const getProfile = () => async (dispatch) => {
    const response = await axios.get("users/profile", {
        headers: {
            Authorization: "Bearer " + localStorage.usertoken
        }
    });
    dispatch({ type: 'GET_PROFILE', payload: response.data });

    return response.data;

};

export const update = (formValues) => async (dispatch) => {
    const response = await axios.patch("users/update/",
        {
            new_first_name: formValues.first_name,
            new_last_name: formValues.last_name,
            new_email: formValues.email,
            new_address: formValues.address
        },
        {headers:{ Authorization: "Bearer " + localStorage.usertoken }},
    )
    return response.data;

}

export const deactivate = () => async (dispatch) => {
    const response= await axios.delete("users/deactivate/",
    {
        headers: {
            Authorization: "Bearer " + localStorage.usertoken
        }
    });
    return response.data;
};