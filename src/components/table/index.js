import React, { useCallback, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { IoMdAddCircleOutline } from 'react-icons/io';
import { AiOutlineClose } from 'react-icons/ai';
import Modal from 'react-modal';
import Numeral from 'numeral';

import { AddCryptoAction } from '../../store/actions';

import './table.scss';
import '../../design-tokens/modal.scss';

Modal.setAppElement('#root')
function Table({ crypto }) {
    const navigate = useNavigate();
    const handleOnClick = useCallback((it) => navigate(`/${it.id}`, { replace: false, state: it }), [navigate]);

    const [modalState, setModalState] = useState({
        isOpen: false,
        payload: {}
    });
    const [countCrypto, setCountCrypto] = useState(1);

    const dispatch = useDispatch();
    const addCrypto = (item) => {
        dispatch(AddCryptoAction(item));
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
                                setModalState({ ...modalState, isOpen: true, payload: { ...it } });
                                event.stopPropagation()
                            }} >
                                <IoMdAddCircleOutline />
                            </span>
                        </td>
                    </tr>
                )}
            </tbody>
            <Modal
                isOpen={modalState.isOpen}
                onRequestClose={() => setModalState({ ...modalState, isOpen: false })}
                style={{
                    overlay: {
                        backdropFilter: "blur(2px)",
                    },
                    content: {
                        width: "60%",
                        height: "60%",
                        position: "absolute",
                        top: "50%",
                        left: "50%",
                        transform: "translate(-50%, -50%)",
                        boxShadow: "0px 4px 22px 8px rgba(34, 60, 80, 0.2)",
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center",
                        alignItems: "center"
                    }
                }}>
                <span onClick={() => setModalState({ ...modalState, isOpen: false })} className="close-button">
                    <AiOutlineClose />
                </span>
                <div className="modal-body-container">
                    <h2>Input count of crypto</h2>
                    <div className="input-container">
                        <input className="input" type="number" min="1" value={countCrypto} onChange={(e) => setCountCrypto(e.target.value)} />
                        <span className="add-crypto-button" onClick={() => {
                            addCrypto({ data: modalState.payload, count: countCrypto })
                            setModalState({ ...modalState, isOpen: false });
                        }} >
                            <IoMdAddCircleOutline />
                        </span>
                    </div>
                    <div className="total-container">
                        <p>Total:</p>
                        <p>{Numeral(modalState.payload.priceUsd * countCrypto).format('$00,00.00')}</p>
                    </div>
                </div>
            </Modal>
        </table>
    )
}
export default Table;