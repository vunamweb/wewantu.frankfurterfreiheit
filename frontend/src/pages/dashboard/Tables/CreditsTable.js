import React from 'react';
import JsonData from '../../../data/credits.json';

 function CreditsDisplay(){
                    
    const rows = [...Array( Math.ceil(JsonData.length / 5) )];    
    const productRows = rows.map( (row, idx) => JsonData.slice(idx * 5, idx * 5 + 5) ); 
    const DisplayData = productRows.map((row, idx) => (
            row.map((info) => (
                <div className="col-md-2">
                    
                        <div className="credits-info">
                            <div className="row" style={{height: '150px'}}>
                                <div className="credits-content">
                                    <div className="credits-amount">{info.AMOUNT}</div>
                                    <span>CREDITS</span> <br />
                                    <span className='credits-price'>{info.PRICES}$</span> <br />
                                    <span>{info.DISCOUNT}</span>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-md">
                                    <button className="btn btn-primary form-control" id="addcredit-grey" type="submit">KAUFEN</button>
                                </div>
                            </div>
                        </div>
                </div>   
            ))
        )
    );
 
    return(
        <React.Fragment>
                   {DisplayData}

                       
        </React.Fragment>
        
    )
 }
 
 export default CreditsDisplay;