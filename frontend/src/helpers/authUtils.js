import { jwtDecode } from "jwt-decode";

/**
 * Checks if user is authenticated
 */
const isUserAuthenticated = () => {
    const user = getLoggedInUser();
    if (!user) {
        return false;
    }
    
    try {
        const decoded = jwtDecode(user.token);
        const currentTime = Date.now() / 1000;
        if (decoded.exp < currentTime) {
            console.warn('access token expired');
            return false;
        }
        else {
            return true;
        }
    } catch(e) {
        console.warn('access token expired');
        return false;
    }
}

/**
 * Sets the logged in user
 */
const setLoggedInUser = (user) => {
    localStorage.setItem('authUser', JSON.stringify(user));
}

/**
 * Returns the logged in user
 */
const getLoggedInUser = () => {
    const user = localStorage.getItem('authUser');
    return user ? (typeof (user) == 'object' ? user : JSON.parse(user)) : null;
}
/**
 * the professions
 */


const setAllUser = (alluser) =>{
    localStorage.setItem('alluser', JSON.stringify(alluser));
}

const getAllUser = () => {
    const alluser = localStorage.getItem('alluser');
    return alluser ? (typeof (alluser) == 'object' ? alluser : JSON.parse(alluser)) : null;
}

const setProfessions = (professions) =>{
    localStorage.setItem('professions', JSON.stringify(professions));
}

const getProfessions = () => {
    const professions = localStorage.getItem('professions');
    return professions ? (typeof (alluser) == 'object' ? professions : JSON.parse(professions)) : null;
}

const setjob_search_profiles =(job_search_profile) =>{
    const dataBody=job_search_profile && job_search_profile.map(info=>{
        return {
            job_search_profile_id:info.job_search_profile_id,
            job_id:info.job_id,
            job_decription:info.job_decription,
            profession:info.profession.profession,
            requested:info.requested,
            messages:info.messages,
        }
    })
    localStorage.setItem('job_search_profile', JSON.stringify(dataBody));
}

const getjob_search_profiles =() =>{
    const job_search_profile = localStorage.getItem('job_search_profile');
    return job_search_profile ? (typeof (user) == 'object' ? job_search_profile : JSON.parse(job_search_profile)) : null;
}

const setdriver_licenses =(driver_licenses) =>{
    localStorage.setItem('driver_licenses', JSON.stringify(driver_licenses));
}

const setjob_search_profiles_all =(job_search_profiles_all) =>{
    localStorage.setItem('job_search_profiles_all', JSON.stringify(job_search_profiles_all));
}

const getjob_search_profiles_all = () => {
    const job_search_profile = localStorage.getItem('job_search_profiles_all');
    return job_search_profile ? (typeof (user) == 'object' ? job_search_profile : JSON.parse(job_search_profile)) : null;
}

const getdriver_licenses =() =>{
    
    const driver_licenses = localStorage.getItem('driver_licenses');
    return driver_licenses ? (typeof (user) == 'object' ? driver_licenses : JSON.parse(driver_licenses)) : null;
}

const setjob =(job) =>{
    localStorage.setItem('job', JSON.stringify(job));
}

const getjob =() =>{
    const job = localStorage.getItem('job');
    return job ? (typeof (user) == 'object' ? job : JSON.parse(job)) : null;
}



const setlanguages =(languages) =>{
    localStorage.setItem('languages', JSON.stringify(languages));
    localStorage.setItem('foreign_language', JSON.stringify(languages));
}

const getlanguages =() =>{
    const languages = localStorage.getItem('languages');
    return languages ? (typeof (user) == 'object' ? languages : JSON.parse(languages)) : null;
}

const getforeign_language =() =>{
    const foreign_language = localStorage.getItem('foreign_language');
    return foreign_language ? (typeof (user) == 'object' ? foreign_language : JSON.parse(foreign_language)) : null;
}

export { getAllUser,setAllUser,getjob,setjob,isUserAuthenticated, setLoggedInUser, getLoggedInUser,setProfessions,getProfessions,getjob_search_profiles,setjob_search_profiles,getdriver_licenses,setdriver_licenses,getlanguages,setlanguages,getforeign_language, setjob_search_profiles_all,getjob_search_profiles_all };