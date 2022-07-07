import React, { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { IoMdAddCircleOutline } from 'react-icons/io';
import Numeral from 'numeral';



import { SetModalAction } from '../../store/actions';

import './table.scss';
import '../../design-tokens/modal.scss';

function Table({ crypto }) {
    const navigate = useNavigate();
    const handleOnClick = useCallback((it) => navigate(`/${it.id}`, { replace: false, state: it }), [navigate]);

    const dispatch = useDispatch();
    const setModal = (stateModal) => {
        dispatch(SetModalAction(stateModal))
    }

    return (
        <table className="table">
            <thead>
                <tr className="table-header">
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
                    <tr className="table-row" key={it.id} onClick={() => handleOnClick(it)} >
                        <td>{it.rank}</td>
                        <td>{`${it.name} ${it.symbol}`}</td>
                        <td>{Numeral(it.priceUsd).format('$00,00.00')}</td>
                        <td>{Numeral(it.marketCapUsd).format('($0.00a)')}</td>
                        <td>{Numeral(it.vwap24Hr).format('$00,00.00')}</td>
                        <td>{Numeral(it.supply).format('($0.00a)')}</td>
                        <td style={{ color: `${+it.changePercent24Hr < 0 ? 'red' : 'green'}` }}>{Numeral(it.changePercent24Hr).format('0.00')}%</td>
                        <td className="td-whith-button">
                            {Numeral(it.volumeUsd24Hr).format('($0.00a)')}
                            <span className="add-crypto-button" onClick={(event) => {
                                setModal({ isOpen: true, payload: { ...it } });
                                event.stopPropagation()
                            }} >
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