import React from 'react'
import JsonData from '../../../data/watchlist.json'
import { FaRegStar } from "react-icons/fa";
import { Button } from 'reactstrap';
 function WatchListTable(){
    const DisplayData=JsonData.map(
        (info)=>{
            return(                
                <tr>
                    <td data-checkbox="true"></td>
                    <td>
                        <div className="info_watchlist">
                            <div className="row">
                                <div className="col-md-2">
									<input type="checkbox" className="check" /> <img src={`${process.env.PUBLIC_URL}/img/avatar.png`} className="avatar" alt="avatar" />
									<div className="name">{info.NAME}</div>
								</div>
                                <div className="col-md-4">
									<p className="about">{info.ABOUT}</p> 
                                    <FaRegStar /> <FaRegStar /> <FaRegStar /> <FaRegStar /> <FaRegStar />
                                </div>
                                <div className="col-md-4 watchlist_content">{info.CONTENT}</div>
                                <div className="col-md-2">
									<Button className="btn btn-primary form-control" size="sm" type="submit" data-bs-toggle="modal" data-bs-target="#idDeitals">DETAILS</Button>
									<Button className="btn btn-primary form-control" size="sm" type="submit" data-bs-toggle="modal" data-bs-target="#idWatchList">SEND MASSAGE</Button>
									<Button className="btn btn-primary form-control" size="sm" type="submit">DELETE</Button>
								</div>
                            </div>

                        </div>
                    </td>
                </tr>                
            )
        }
    )
 
    return(
        <React.Fragment>
            <table className="table">
                <tbody className='table-watchlist'>
                    {DisplayData}
                </tbody>
            </table>
        </React.Fragment>
        
    )
 }
 
 export default WatchListTable;