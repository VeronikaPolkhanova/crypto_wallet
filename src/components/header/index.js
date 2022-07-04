import { IoBagRemoveOutline } from 'react-icons/io5';
import Numeral from 'numeral';

import './header.scss';

function Header({ crypto }) {
    return (
        <div className="header">
            <div className="rank-crypto">
                {crypto.filter(it => it.rank <= 3).map(it => <p key={it.symbol}>{`${it.symbol}: ${Numeral(it.priceUsd).format('$00,00.00')}`}</p>)}
            </div>
            <div className="wallet">
                <p>{`134,32 USD +2,38 (1,80 %)`}</p>
                <span className="wallet-button">
                    <IoBagRemoveOutline />
                </span>
            </div>
        </div>
    )
}
export default Header;