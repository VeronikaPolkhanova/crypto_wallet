import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

import { IoMdAddCircleOutline } from 'react-icons/io';
import Numeral from 'numeral';

import './table.scss';

function Table({ crypto }) {
    const navigate = useNavigate();
    const handleOnClick = useCallback((id) => navigate(`/${id}`, { replace: false, state: id }), [navigate]);

    return (
        <table className="table">
            <thead>
                <tr>
                    <th>Rank</th>
                    <th>Name</th>
                    <th>Price</th>
                    <th>Market cap</th>
                    <th>VWAP(24hr)</th>
                    <th>Supply</th>
                    <th>Change(24hr)</th>
                    <th>Volume(24hr)</th>
                </tr>
            </thead>
            <tbody>
                {crypto.map(it =>
                    <tr key={it.id} onClick={() => handleOnClick(it.id)} >
                        <td>{it.rank}</td>
                        <td>{`${it.name} ${it.symbol}`}</td>
                        <td>{Numeral(it.priceUsd).format('$00,00.00')}</td>
                        <td>{Numeral(+it.marketCapUsd).format('($0.00a)')}</td>
                        <td>{Numeral(it.vwap24Hr).format('$00,00.00')}</td>
                        <td>{Numeral(+it.supply).format('($0.00a)')}</td>
                        <td style={{ color: `${+it.changePercent24Hr < 0 ? 'red' : 'green'}` }}>{Numeral(it.changePercent24Hr).format('0.00')}%</td>
                        <td className="td-button">
                            {Numeral(it.volumeUsd24Hr).format('($0.00a)')}
                            <span className="add-crypto-button">
                                <IoMdAddCircleOutline />
                            </span>
                        </td>
                    </tr>
                )}
            </tbody>
        </table>
    )
}
export default Table;