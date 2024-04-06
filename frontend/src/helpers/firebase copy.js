import firebase from 'firebase/compat/app';
// Add the Firebase products that you want to use
import "firebase/compat/auth";
import "firebase/compat/firestore";
import { getDatabase, ref, onValue,push } from "firebase/database";
import { getMessaging, getToken, onMessage } from 'firebase/messaging';
import { APIClient } from './apiClient'
//import admin from 'firebase-admin';
class FirebaseAuthBackend {
    constructor(firebaseConfig) {
        if (firebaseConfig) {
            // Initialize Firebase
            firebase.initializeApp(firebaseConfig);
            
        }
    }
    
    GetMessages = () => {
        return new Promise((resolve, reject) => {
            const starCountRef = ref(getDatabase(), 'messages/9633bf81-e387-47ad-a7e7-5106433af8ff_40b4e9b9-e508-473c-b75d-75cd10adee79');
            onValue(starCountRef, (snapshot) => {
                resolve(snapshot.val());
            //console.log(data);
        });
        });


    
    }

    writeMessages = (fromUser,toUser,data) => {
        let tagId=fromUser.user_id+'_'+toUser.user_id;
        
        //let ly= time.getFullYear() +"-"+ time.getMonth()+1 +"-"+time.getDate() +" "+ time.getHours()+":"+ time.getMinutes()+":"+ time.getSeconds();
        
        push(ref(getDatabase(), 'messages/' + tagId), {
             fromUser: fromUser.user_id,
             dateTime: data.time,
             message : data.message
           });
           try{
            let datasend = {data:{
                    message:data.message,
                    id:fromUser.user_id,
                    name:fromUser.prename+' '+fromUser.lastname,
                    //token:toUser.firebase_token,
                    token:'eR9mJ5sKQLizuqC5ogICwD:APA91bEuTg4sAgfBtqShVlxcmSAe6NX02XqwUxaonxrDziUycLhBPSLG5ZmHn5g6ATPdNrwumzWwZ0PCNhHdzZHj_Wo0Oty7Ol186vY0Z5_R455AzB9DLdFcYi2rF8Ou1eyyAbLgdtZu',
                    date: data.time,
                }
            }
            //console.log(btoa())
            //console.log(fromUser);
            //new APIClient().get('https://apiv2.topazvn.vn/fcm.php?data='+btoa(JSON.stringify(datasend)));
           // const token=toUser.firebase_token;
           /* admin.messaging().sendMulticast(
                {
                    token,
                     data: { hello: 'world!' },
                })
           }*/
        }
           catch(error){
            console.log(error);
           }
           
       };
   

   // getMessagingToken = async () => {
      //  messaging.messaging().sendMulticast()
   // };
/*
    onMessageListener = () =>
    new Promise((resolve) => {
        messaging.onMessage((payload) => {
        resolve(payload);
        });
  });*/
    /**
     * Registers the user with given details
     * 
     * 
     * 
     */
    registerUser = (email, password) => {
        return new Promise((resolve, reject) => {
            firebase.auth().createUserWithEmailAndPassword(email, password).then((user) => {
                resolve(firebase.auth().currentUser);
            }, (error) => {
                reject(this._handleError(error));
            });
        });
    }

    /**
     * Login user with given details
     */
    loginUser = (email, password) => {
        return new Promise((resolve, reject) => {
            firebase.auth().signInWithEmailAndPassword(email, password).then((user) => {
                resolve(firebase.auth().currentUser);
            }, (error) => {
                reject(this._handleError(error));
            });
        });
    }

    /**
     * forget Password user with given details
     */
    forgetPassword = (email) => {
        return new Promise((resolve, reject) => {
            firebase.auth().sendPasswordResetEmail(email, { url: window.location.protocol + "//" + window.location.host + "/login" }).then(() => {
                resolve(true);
            }).catch((error) => {
                reject(this._handleError(error));
            })
        });
    }

    /**
     * Logout the user
     */
    logout = () => {
        return new Promise((resolve, reject) => {
            firebase.auth().signOut().then(() => {
                resolve(true);
            }).catch((error) => {
                reject(this._handleError(error));
            })
        });
    }

    setLoggeedInUser = (user) => {
        localStorage.setItem("authUser", JSON.stringify(user));
    }

    /**
     * Returns the authenticated user
     */
    getAuthenticatedUser = () => {
        if (!localStorage.getItem('authUser'))
            return null;
        return JSON.parse(localStorage.getItem('authUser'));
    }

    /**
     * Handle the error
     * @param {*} error 
     */
    _handleError(error) {
        // var errorCode = error.code;
        var errorMessage = error.message;
        return errorMessage;
    }
}


let _fireBaseBackend = null;

/**
 * Initilize the backend
 * @param {*} config 
 */
const initFirebaseBackend = (config) => {
    if (!_fireBaseBackend) {
        _fireBaseBackend = new FirebaseAuthBackend(config);
    }
    return _fireBaseBackend;
}

/**
 * Returns the firebase backend
 */
const getFirebaseBackend = () => {
    return _fireBaseBackend;
}

export { initFirebaseBackend, getFirebaseBackend };