import React, { useCallback, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { IoMdAddCircleOutline } from 'react-icons/io';
import { AiOutlineClose } from 'react-icons/ai';
import Modal from 'react-modal';
import Numeral from 'numeral';

import './table.scss';
import '../../design-tokens/modal.scss';

Modal.setAppElement('#root')
function Table({ crypto }) {
    const navigate = useNavigate();
    const handleOnClick = useCallback((it) => navigate(`/${it.id}`, { replace: false, state: it }), [navigate]);

    const [modalIsOpen, setModalIsOpen] = useState(false);
    return (
        <React.Fragment>
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
                        <tr key={it.id} onClick={(e) => handleOnClick(it)} >
                            <td>{it.rank}</td>
                            <td>{`${it.name} ${it.symbol}`}</td>
                            <td>{Numeral(it.priceUsd).format('$00,00.00')}</td>
                            <td>{Numeral(it.marketCapUsd).format('($0.00a)')}</td>
                            <td>{Numeral(it.vwap24Hr).format('$00,00.00')}</td>
                            <td>{Numeral(it.supply).format('($0.00a)')}</td>
                            <td style={{ color: `${+it.changePercent24Hr < 0 ? 'red' : 'green'}` }}>{Numeral(it.changePercent24Hr).format('0.00')}%</td>
                            <td className="td-button">
                                {Numeral(it.volumeUsd24Hr).format('($0.00a)')}
                                <span className="add-crypto-button" onClick={(event) => {
                                    setModalIsOpen(true);
                                    event.stopPropagation()
                                }} >
                                    <IoMdAddCircleOutline />
                                </span>
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
            <Modal
                isOpen={modalIsOpen}
                onRequestClose={() => setModalIsOpen(false)}
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
                <span onClick={() => setModalIsOpen(false)} className="close-button">
                    <AiOutlineClose />
                </span>
                <h2>Input count of crypto</h2>
                <div className="input-container">
                    <input className="input" type="number" min="0" />
                    <p></p>
                    <span className="add-crypto-button" onClick={() => setModalIsOpen(false)} >
                        <IoMdAddCircleOutline />
                    </span>
                </div>
            </Modal>
        </React.Fragment>
    )
}
export default Table;