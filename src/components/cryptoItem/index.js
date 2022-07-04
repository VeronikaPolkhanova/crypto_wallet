import React from "react";
import { useLocation } from "react-router-dom";

import './cryptoItem.scss';

function CryptoItem() {
    const location = useLocation();
    const { state } = location;
    console.log(location)
    return (
        <React.Fragment>
            <div className="crypto-item">
                <p>{state}</p>
            </div>
        </React.Fragment>
    )
}
export default CryptoItem;