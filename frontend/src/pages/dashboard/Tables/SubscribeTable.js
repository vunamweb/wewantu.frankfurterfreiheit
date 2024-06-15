import React from 'react';
import JsonData from '../../../data/subcribe.json';

function SubcribeDisplay(props) {
    const handlePayment = props.onBuy;
    const rows = [...Array(Math.ceil(JsonData.length / 5))];
    const productRows = rows.map((row, idx) => JsonData.slice(idx * 5, idx * 5 + 5));
    const DisplayData = productRows.map((row, idx) => (
        row.map((info) =>
        (
            <div className="col-md-4">

                <div className="credits-info">
                    <div className="row" style={{ height: '200px' }}>
                        <div className="credits-content">
                            <span style={{ fontSize: '25px', fontWeight: 'bold' }}>{info.TYPE}</span> <br />
                            <p>Beschreibung: Jemand musste Josef K. <br />verleumdet haben, denn ohne dass</p>
                            <span className='credits-price' style={{ fontSize: '50px', fontWeight: 'bold' }}>{info.PRICES}$</span>/Monat <br />
                            <span>{info.LEAD} Leads/Monat</span>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md">
                            <button className="btn btn-primary form-control" id="addcredit-grey" type="submit" onClick={() => handlePayment(info)}>KAUFEN</button>
                        </div>
                    </div>
                </div>
            </div>
        ))
    )
    );

    return (
        <React.Fragment>
            {DisplayData}


        </React.Fragment>

    )
}

export default SubcribeDisplay;