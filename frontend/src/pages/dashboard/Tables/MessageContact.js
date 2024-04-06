import React from 'react'
import JsonData from '../../../data/contactor.json'
import { Link } from 'react-router-dom'
import { FcBookmark } from "react-icons/fc";
 function JsonDataDisplay(){
    const DisplayData=JsonData.map(
        (info)=>{
            return(
                <ul>
                    <li>
                        <Link>{info.NAME}</Link>
                    </li>
                </ul>
                // <div className="row content-m">
                //     <div className="col-md"><b>{info.SENDER}</b></div>
                //     <div className="col-md" style={{textAlign: 'right'}}><b>{info.TIME}</b></div>
                //     <p>{info.CONTENT}
                //     <br></br>{info.SIGN}</p>
                // </div>                      
            )
        }
    )
 
    return(
        <>
        <div className="col-md-3 scroller mess-l" >
                {
                    JsonData && JsonData.map(
                        (info)=>{
                            return(
                                <ul>
                                    <li>
                                        <Link>{info.NAME}</Link>
                                    </li>
                                </ul>
                                // <div className="row content-m">
                                //     <div className="col-md"><b>{info.SENDER}</b></div>
                                //     <div className="col-md" style={{textAlign: 'right'}}><b>{info.TIME}</b></div>
                                //     <p>{info.CONTENT}
                                //     <br></br>{info.SIGN}</p>
                                // </div>                      
                            )
                        }
                    )
                }
            </div>
        </>
            
            

        
    )
 }
 
 export default JsonDataDisplay;