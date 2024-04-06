import React from 'react'
import JsonData from '../../../data/messagecenter.json'
import { Link } from 'react-router-dom'
import { FcBookmark } from "react-icons/fc";
 function JsonDataDisplay(){
    const DisplayData=JsonData.map(
        (info)=>{
            return(   
                <li>
                    <Link>
                        <div className="row">
                            <div className="col-md-2">
                                <img src={`${process.env.PUBLIC_URL}/img/avatar.png`} width="99%" className="avatar"  alt=''/>
                            </div>
                            <div className="col-md-10">
                                <div className="row">
                                    <div className="col-md-8">{info.NAME}</div>
                                    <div className="col-4">{info.TIME}</div>
                                </div>
                                <div className="row">
                                    <div className="col-10">{info.MESSAGE}</div>
                                    <div className="col-2 bookmark-red"><FcBookmark /></div>
                                </div>
                            </div>
                        </div>
                    </Link>
                </li>                          
            )
        }
    )
 
    return(
        <React.Fragment>
            <div className="col-md-4 scroller s-center">
                <ul>
                    {DisplayData}
                </ul>
            </div>
            

        </React.Fragment>
        
    )
 }
 
 export default JsonDataDisplay;