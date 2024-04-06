import React, { Component } from 'react';
import { getDatabase, ref, onValue, push } from "firebase/database";
class JsonDataDisplay extends Component {
    constructor(props) {
        super(props);
        this.state = {
            searchChat: "",
            recentMessages: this.props.recentMessages
        }
    }

    getUserData = (tagId) => {
        const starCountRef = ref(getDatabase(), 'messages/'+tagId);
            const val= onValue(starCountRef, (snapshot) => {
                const data = snapshot.val();
                this.setState({
                    recentMessages: data
                })
            });
      };

      writeUserData = (tagId) => {
       push(ref(getDatabase(), 'messages/' + tagId), {
            fromUser: 'fc5e9483-2207-49c5-ad83-ab8b1a24fe23',
            dateTime: new Date().getFullYear() +"-"+new Date().getMonth() +"-"+new Date().getDate() +" "+ new Date().getHours()+":"+ new Date().getMinutes()+":"+ new Date().getSeconds(),
            message : Math.floor(Math.random() *100)
          });
      };
    componentDidMount() {
        this.getUserData('fc5e9483-2207-49c5-ad83-ab8b1a24fe23_aea10910-6a5d-496d-88a0-69af12fbe47a')
        //this.writeUserData('fc5e9483-2207-49c5-ad83-ab8b1a24fe23_aea10910-6a5d-496d-88a0-69af12fbe47a')
      }
    render(){
        document.title = "Dashboard | WEWANTU";
        console.log(this.state)
        return (<></>);

 }
}
 export default JsonDataDisplay;