import axios from 'axios';
import config from "./../config";


// default
axios.defaults.baseURL = config.API_URL;

// content type

axios.defaults.headers.common['Wewantu-Agent'] = 'Web';
//axios.defaults.headers.common['Authorization'] = 'Basic '+btoa('thanhtamth8b@gmail.com:12345');
// intercepting to capture errors
axios.interceptors.response.use(function (response) {
    return response.data ? response.data : response;
}, function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    let message;
    
    switch (error.status) {
        
        case 500: message = 'Internal Server Error'; break;
        case 401: message = 'Invalid credentials'; break;
        case 404: message = "Sorry! the data you are looking for could not be found"; break;
        case 201: message = "Account created successfully, please check your email to activate your account"; break;
        default: message = error.message || error;
    }
    return Promise.reject(message);
});

/**
 * Sets the default authorization
 * @param {*} token 
 */
const setAuthorization = (token) => {
    axios.defaults.headers.common['Authorization'] = 'Bearer ' + token;
}


class APIClient {
    /**
     * Fetches data from given url
     */
    get = async (url, params) => {
        let authUser=JSON.parse(localStorage.getItem("session_secret"));
        if(authUser){            
            //console.log(authUser);
            setAuthorization(authUser.session_secret);
        }
        return await axios.get(url, params);
    }

    /**
     * post given data to url
     */
    create = async (url, data) => {
        let authUser=JSON.parse(localStorage.getItem("session_secret"));
        if(authUser){            
            //console.log(authUser);
            setAuthorization(authUser.session_secret);
        }
        return await axios.post(url, data);
    }

    auth = async (url,data) =>{
        let info_auth= await axios.post(config.API_URL+url, {},{
            auth: {
              username: data.username,
              password: data.password
            }
          });
          if(info_auth){
            setAuthorization(info_auth.session_secret);
          }
        return info_auth;
    }

    createJobsCat = async (url,data)=>{
        let info_auth= await axios.post(config.API_URL+url, data);
        return info_auth;
    }

    /**
     * Updates data
     */
    update = async (url, data) => {
        return await axios.patch(url, data);
    }


    put = async (url, data) => {
        return await axios.put(url, data);
    }

    /**
     * Delete 
     */
    delete = async (url) => {
        //console.log(s)
        let authUser=JSON.parse(localStorage.getItem("session_secret"));
        if(authUser){            
            //console.log(authUser);
            setAuthorization(authUser.session_secret);
        }
        return await axios.delete(url);
    }

   // post

   
}

export { APIClient, setAuthorization };