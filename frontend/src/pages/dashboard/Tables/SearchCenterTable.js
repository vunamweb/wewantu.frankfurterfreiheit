import React from 'react';
import JsonData from '../../../data/searchcenter.json';




 function SearchCenterDisplay(props){
                    
    const rows = [...Array( Math.ceil(JsonData.length / 4) )];    
    const productRows = rows.map( (row, idx) => JsonData.slice(idx * 4, idx * 4 + 4) ); 
    const DisplayData = productRows.map((row, idx) => (
            <tr key={idx}>
            {
                row.map((info) => (
                    <td>
                        <div className="info">
                            <div className="row">
                                <div className="col-md-6"><img src={`${process.env.PUBLIC_URL}/${info.AVATAR}`} className="avatar" alt=''/></div>
                                <div className="col-md-6">                                                    
                                        <button className="btn btn-primary form-control" type="submit" data-bs-toggle="modal" data-bs-target="#idDeitals">DETAILS</button>                                                  
                                        <button className="btn btn-primary form-control" type="submit" data-bs-toggle="modal" data-bs-target="#idWatchList">ADD TO WATCHLIST</button>                                         
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-md">
                                    <div className="name">{info.NAME}</div>
                                    <div><img src="assets/img/location.svg" alt=''/>{info.LOCATION}</div>
                                    <div><img src="assets/img/year.svg" alt=''/>{info.YOB}</div>
                                    <div><img src="assets/img/hand.svg" alt=''/></div> 
                                </div>
                            </div>
                        </div>
                    </td>
                ))
            }                                          
            </tr>  
        )
    );
 
    return(
        <React.Fragment>
            <table className="table table-searchcenter">
                <tbody>
                   {DisplayData}
                </tbody>
            </table>

                       
        </React.Fragment>
        
    )
 }
 
 export default SearchCenterDisplay;