import React from 'react';
import JsonData from '../../../data/credits.json';
import { t } from "i18next"
import { getLoggedInUser } from '../../../helpers/authUtils';

function CreditsDisplay(props) {
    const admin = getLoggedInUser()[0];
    const handlePayment = props.onBuy;
    const rows = [...Array(Math.ceil(JsonData.length / 5))];
    const productRows = rows.map((row, idx) => JsonData.slice(idx * 5, idx * 5 + 5));
    const showButton = (admin.buy_credit == 1 || admin.userType == 0)
    const DisplayData = productRows.map((row, idx) => (
        row.map((info) => (
            <div className="col-md-2">

                <div className="credits-info">
                    <div className="row" style={{ height: '150px' }}>
                        <div className="credits-content">
                            <div className="credits-amount">{info.AMOUNT}</div>
                            <span>{t('t_credits').toUpperCase()}</span> <br />
                            <span className='credits-price'>{info.PRICES}$</span> <br />
                            <span>{info.DISCOUNT}</span>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md">
                            <button disabled={!showButton} className="btn btn-primary form-control" id="addcredit-grey" type="submit" onClick={() => handlePayment(info)}>KAUFEN</button>
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

export default CreditsDisplay;