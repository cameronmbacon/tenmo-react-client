import React, { useEffect, useState } from 'react';
import Transfer from './Transfer';

import '../styles/Transfers.css';

const Transfers = ({ transfers, account }) => {

    const [filteredTransfers, setFilteredTransfers] = useState(transfers);

    useEffect(() => {
        setFilteredTransfers(transfers);
    }, [transfers]);

    if (!transfers || transfers.length === 0) {
        return (
            <div className='transfers-container'>
                 <p>No transfer data available.</p>
            </div>
        );
    }

    const filterTransfers = (status) => {
        if (!status || status === 'All') {
            setFilteredTransfers(transfers);
        } else {
            setFilteredTransfers(transfers.filter(transfer => transfer.transferStatus === status));
        }
    };

  return (
    <div className='transfers-container'>
        <h2>Transfers</h2>
        <div className='filter-transfers-container'>
            <ul>
                <li><button className='btn small' onClick={() => filterTransfers('PENDING')}>Pending</button></li>
                <li><button className='btn small' onClick={() => filterTransfers('APPROVED')}>Approved</button></li>
                <li><button className='btn small' onClick={() => filterTransfers('REJECTED')}>Rejected</button></li>
                <li><button className='btn small' onClick={() => filterTransfers('All')}>All</button></li>
            </ul>
        </div>
        <ul className='transfers-list'>
            <li className='transfers-headers'>
                <h6>ID</h6>
                <h6>From</h6>
                <h6>To</h6>
                <h6>Amount</h6>
                <h6 className='status-field'>Status</h6>
            </li>
            {filteredTransfers.map(transfer => (
                <li key={transfer.id} id={`transfer-${transfer.id}`}>
                    <Transfer transfer={transfer} account={account} />
                </li>
            ))}
        </ul>
    </div>
  );
}

export default Transfers;