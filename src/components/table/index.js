import React, { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { IoMdAddCircleOutline } from 'react-icons/io';
import Numeral from 'numeral';
import { Table, Header, HeaderCell, HeaderRow, Body, Row, Cell } from '@table-library/react-table-library/table';
import { usePagination } from '@table-library/react-table-library/pagination';

import { SetModalAction } from '../../store/actions';

import './table.scss';
import '../../design-tokens/modal.scss';

function Tableb({ crypto }) {
    const navigate = useNavigate();
    const handleOnClick = useCallback((it) => navigate(`/${it.id}`, { replace: false, state: it }), [navigate]);

    const dispatch = useDispatch();
    const setModal = (stateModal) => {
        dispatch(SetModalAction(stateModal))
    }

    const data = { nodes: crypto };
    const pagination = usePagination(data, {
        state: {
            page: 0,
            size: 15,
        },
    });

    return (
        <>
            <Table data={data} pagination={pagination} className="table">{(tableList) =>
                <>
                    <Header>
                        <HeaderRow className="table-header">
                            <HeaderCell>Rank</HeaderCell>
                            <HeaderCell>Name</HeaderCell>
                            <HeaderCell>Price</HeaderCell>
                            <HeaderCell>Market cap</HeaderCell>
                            <HeaderCell>VWAP(24hr)</HeaderCell>
                            <HeaderCell>Supply</HeaderCell>
                            <HeaderCell>Change(24hr)</HeaderCell>
                            <HeaderCell>Volume(24hr)</HeaderCell>
                        </HeaderRow>
                    </Header>
                    <Body>
                        {tableList.map((item) => (
                            <Row className="table-row" key={item.id} item={item} key={item.id} onClick={() => handleOnClick(item)}>
                                <Cell>{item.rank}</Cell>
                                <Cell>{`${item.name} ${item.symbol}`}</Cell>
                                <Cell>{Numeral(item.priceUsd).format('$00,00.00')}</Cell>
                                <Cell>{Numeral(item.marketCapUsd).format('($0.00a)')}</Cell>
                                <Cell>{Numeral(item.vwap24Hr).format('$00,00.00')}</Cell>
                                <Cell>{Numeral(item.supply).format('($0.00a)')}</Cell>
                                <Cell style={{ color: `${+item.changePercent24Hr < 0 ? 'red' : 'green'}` }}>{Numeral(item.changePercent24Hr).format('0.00')}%</Cell>
                                <Cell>
                                    <div style={{
                                        display: "flex",
                                        justifyContent: "space-between",
                                        alignItems: "center"
                                    }}>
                                        <p style={{ margin: "0" }}>{Numeral(item.volumeUsd24Hr).format('($0.00a)')}</p>
                                        <span className="add-crypto-button" onClick={(event) => {
                                            setModal({ isOpen: true, payload: { ...item } });
                                            event.stopPropagation()
                                        }} >
                                            <IoMdAddCircleOutline />
                                        </span>
                                    </div>
                                </Cell>
                            </Row>
                        ))}
                    </Body>
                </>
            }
            </Table>
            <div
                style={{ display: 'flex', justifyContent: 'space-between', width:'80%', margin: '10px 10%' }}
            >
                <span>
                    Total Pages: {pagination.state.getTotalPages(data.nodes)}
                </span>

                <span>
                    Page:{' '}
                    {pagination.state.getPages(data.nodes).map((_, index) => (
                        <button
                            key={index}
                            type="button"
                            style={{
                                fontWeight:
                                    pagination.state.page === index
                                        ? 'bold'
                                        : 'normal',
                            }}
                            onClick={() => pagination.fns.onSetPage(index)}
                        >
                            {index + 1}
                        </button>
                    ))}
                </span>
            </div>
        </>

    )
}
export default Tableb;