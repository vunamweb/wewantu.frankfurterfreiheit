import React,{ useState } from 'react';
import { getLoggedInUser } from '../../../helpers/authUtils';
import { Avatar } from 'antd';

import { connect} from "react-redux";
import { setActiveTab } from "../../../redux/actions";
import SerchCenterModal from '../Modal/SerchCenterModal';
import SerchCenterWachlistModal from '../Modal/SerchCenterWachlistModal';
import { APIClient } from '../../../helpers/apiClient';
 function SearchCenterDisplay(props){
    const JsonData=props.searchData;
    const [loading, setloading] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isModalOpenDetail, setIsModalOpenDetail] = useState(false);
    const [currentUser, setcurrentUser] = useState({});
    const [currentIndex, setcurrentIndex] = useState(-1);
    const admin=getLoggedInUser()[0];
    
    const handleCancel = () => {
        setIsModalOpen(false);
    };
    const handleCancelDetail =()=>{

        
        setIsModalOpenDetail(false);
    }
    
    const handleDTClick = (id,index) =>{
        setcurrentIndex(index)
        setIsModalOpenDetail(true)        
        setcurrentUser(id)
      }
      const handleWLClick = (id,index) =>{
       addwatclist(id)
        JsonData.splice(index, 1);
        setIsModalOpenDetail(false);
      }

      const handleHiddenClick = (id,index) =>{
        JsonData.splice(index, 1);
        setIsModalOpenDetail(false);
      }

      const addwatclist = (values) => {
       if(currentUser){
            new APIClient().get('user/ce5ed1af-adb5-4336-bc04-e70f17f30a16/user_template')
            .then(res=>{
                if(res){
                    let tmp = values.user.prename+' '+ values.user.lastname+',\r'+ res[0].description;
                    let obj_watchlist={
                        message: tmp,
                        job_search_profile_id: values.job_search_profile_id,
                        user_id:admin.user_id
                    };
                    console.log(obj_watchlist);
                    new APIClient().create('user_watchlist',obj_watchlist).then(val=>{
                        if(val){
                            alert('add successfully')
                        }
                    })
                } 
            });
        }
        
        /**/
      }
    const rows = [...Array( Math.ceil(JsonData.length / 4) )];    
    const productRows = rows.length>0 && rows.map( (row, idx) => JsonData.slice(idx * 4, idx * 4 + 4) ); 
    const DisplayData = productRows.length >0 && productRows.map((row, idx) => (
            <tr key={idx}>
            {
                row.map((info,index) => {
                    info.address = (info.address != undefined) ? info.address : [
                        {
                            street: null,
                            city: null,
                            country: null,
                        }
                    ];

                   return  (
                    <td>
                        <div className="info">
                            <div className="row">
                                <div className="col-md-6"><Avatar className='avatar' size={80}>{(info.user.prename.slice(0,1)).toUpperCase()}{(info.user.lastname.slice(0,1)).toUpperCase()}</Avatar></div>
                                <div className="col-md-6">                                                    
                                        <button onClick={(e)=>handleDTClick(info,idx*4 + index)} data-id={'detail_'+ info.job_search_profile_id}  className="btn btn-primary form-control" type="submit" data-bs-toggle="modal" data-bs-target="#idDeitals">DETAILS</button>                                                  
                                        <button onClick={(e)=>handleWLClick(info,idx*4 + index)} data-id={'watchlist_'+ info.job_search_profile_id} className="btn btn-primary form-control" type="submit" data-bs-toggle="modal" data-bs-target="#idWatchList">ADD TO WATCHLIST</button>                                         
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-md">
                                    <div className="name">{info.user.prename} {info.user.lastname}</div>
                                    <div><img src="assets/img/location.svg" alt=''/> {info.address[0].street} {info.address[0].city} {info.address[0].country === null?'':','+info.address[0].country}</div>
                                    <div><img src="assets/img/year.svg" alt=''/>{info.address[0].year_birthday}</div>
                                   {/**<div><img src="assets/img/hand.svg" alt=''/> </div>*/}
                                </div>
                            </div>
                        </div>
                        </td>
                )
                } 
               )
                
            }                                          
            </tr>  
        )
    );
    return(
        <React.Fragment>
            {loading === true ? (<div className="loader"></div>):""}
            <table className="table table-searchcenter">
                <tbody>
                   {DisplayData}
                </tbody>
            </table>
            {Object.keys(currentUser).length >0 && (<SerchCenterModal currentUser={currentUser} handleWLClick={handleWLClick} handleHiddenClick={handleHiddenClick} currentIndex={currentIndex} JsonData={JsonData ? JsonData : null} isModalOpenDetail={isModalOpenDetail} handleCancelDetail={handleCancelDetail}/>)}
            {Object.keys(currentUser).length >0 && (<SerchCenterWachlistModal currentUser={currentUser} JsonData={JsonData ? JsonData : null} isModalOpen={isModalOpen}  handleCancel={handleCancel}/>)}
            
                       
        </React.Fragment>
        
    )
 }
 
 const mapStatetoProps = state => {
    return {
        ...state.Layout
    };
};

export default connect(mapStatetoProps, {
    setActiveTab
})(SearchCenterDisplay);