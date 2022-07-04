import { IoBagRemoveOutline } from 'react-icons/io5';

import './header.scss';

const crypto = [
    {
        symbol: "BTC",
        price: "19202.4438924234897938"
    },
    {
        symbol: "ETH",
        price: "1055.7169247745401146"
    },
    {
        symbol: "USDT",
        price: "0.9984889186681922"
    }
];
function Header() {
    return (
        <div className="header">
            <div className="rank-crypto">
                {crypto.map(it => <p key={it.symbol}>{`${it.symbol}: ${it.price}$`}</p>)}
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