import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { IoBagRemoveOutline } from 'react-icons/io5';
import { AiOutlineClose, AiOutlineMinusCircle } from 'react-icons/ai';
import Modal from 'react-modal';
import Numeral from 'numeral';

import fetchCrypto from '../../store/asyncAction';
import { RemoveCryptoAction } from '../../store/actions';

import './header.scss';
import '../../design-tokens/modal.scss';

Modal.setAppElement('#root')
function Header() {
    const [isOpen, setIsOpen] = useState(false);

    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(fetchCrypto());
    }, [dispatch])

    const crypto = useSelector(state => state.crypto);
    const wallet = useSelector(state => state.wallet);

    const walletMoney = wallet.reduce((accumulator, curr) => accumulator + (curr.count * curr.data.priceUsd), 0);

    const removeCrypto = (id) => {
        dispatch(RemoveCryptoAction(id));
    }

    return (
        <div className="header">
            <div className="rank-crypto">
                {crypto.filter(it => it.rank <= 3).map(it => <p className="rank-crypto-p" key={it.symbol}>{`${it.symbol}: ${Numeral(it.priceUsd).format('$00,00.00')}`}</p>)}
            </div>
            <div className="wallet">
                <p className="wallet-p">{`${Numeral(walletMoney).format('00,00.00')} USD +2,38 (1,80 %)`}</p>
                <span className="wallet-button" onClick={() => setIsOpen(true)}>
                    <IoBagRemoveOutline />
                </span>
            </div>
            <Modal
                isOpen={isOpen}
                onRequestClose={() => setIsOpen(false)}
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
                <span onClick={() => setIsOpen(false)} className="close-button">
                    <AiOutlineClose />
                </span>
                <div className="modal-body-container modal-wallet">
                    <h1>Wallet</h1>
                    {
                        wallet.length === 0 ? <p>Wallet is empty</p> : <div>
                            <ul className="wallet-ul">
                                {wallet.map(it =>
                                    <li className="wallet-li" key={it.data.id}>
                                        <p>{it.data.symbol}</p>
                                        <p>{Numeral(it.data.priceUsd).format('$00,00.00')}</p>
                                        <p>{it.count}</p>
                                        <span className="remove-crypto-button" onClick={() => removeCrypto(it.data.id)}>
                                            <AiOutlineMinusCircle />
                                        </span>
                                    </li>)}
                            </ul>
                            <div className="wallet-total-container">
                                <p className="total-p">Total</p>
                                <p>{Numeral(walletMoney).format('$00,00.00')}</p>
                            </div>
                        </div>
                    }
                </div>
            </Modal>
        </div>
    )
}
export default Header;