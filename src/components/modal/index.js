import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { AiOutlineClose } from 'react-icons/ai';
import { IoMdAddCircleOutline } from 'react-icons/io';
import Modal from 'react-modal';
import Numeral from 'numeral';

import { AddCryptoAction, SetModalAction } from '../../store/actions';

Modal.setAppElement('#root')
const ModalComponent = () => {

    const modalState = useSelector(state => state.modal);
    const [countCrypto, setCountCrypto] = useState(1);
    const dispatch = useDispatch();

    const setModal = (it) => {
        dispatch(SetModalAction(it))
    }
    const addCrypto = (it) => {
        dispatch(AddCryptoAction(it))
    }


    return (
        <Modal
            isOpen={modalState.isOpen}
            onRequestClose={() => setModal({ ...modalState, isOpen: false })}
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
            <span onClick={() => setModal({ ...modalState, isOpen: false })} className="close-button">
                <AiOutlineClose />
            </span>
            <div className="modal-body-container">
                <h2>Input count of crypto</h2>
                <div className="input-container">
                    <input className="input" type="number" min="1" value={countCrypto} onChange={(e) => setCountCrypto(e.target.value)} />
                    <span className="add-crypto-button" onClick={() => {
                        addCrypto({ data: modalState.payload, count: countCrypto })
                        setModal({ ...modalState, isOpen: false });
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
    )
}
export default ModalComponent;