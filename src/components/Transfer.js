import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useTenmoApi from '../hooks/useTenmoApi';
import { FaCheckSquare, FaWindowClose } from 'react-icons/fa';

import '../styles/Transfer.css';

const Transfer = ({ transfer, account }) => {

    const navigate = useNavigate();
    const [showTransferDetails, setShowTransferDetails] = useState(false);

    const {
        acceptTransfer,
        rejectTransfer,
        fetchAccountByUserId,
    } = useTenmoApi();

    const handleClick = (event) => {
        event.preventDefault();
        setShowTransferDetails(!showTransferDetails);
        (showTransferDetails) ?
        document.getElementById(event.currentTarget.id).classList.remove('show-details') :
        document.getElementById(event.currentTarget.id).classList.add('show-details');
    };

    const handleAccept = async (event) => {
        event.preventDefault();
        const updatedTransfers = await acceptTransfer(transfer.id, account.userId);
        const updatedAccount = await fetchAccountByUserId(account.userId);
        navigate('/dashboard',
            { state: {
                user: JSON.parse(localStorage.getItem('user')),
                account: updatedAccount,
                transfers: updatedTransfers,
            },
        });
    };

    const handleReject = async (event) => {
        event.preventDefault();
        const updatedTransfers = await rejectTransfer(transfer.id, account.userId);
        const updatedAccount = await fetchAccountByUserId(account.userId);
        navigate('/dashboard',
            { state: {
                user: JSON.parse(localStorage.getItem('user')),
                account: updatedAccount,
                transfers: updatedTransfers,
            },
        });
    };

    return (
        <div className='transfer-container' id={transfer.id} onClick={handleClick}>
            {(showTransferDetails) ? 
                (<ul>
                    <li>Amount: ${parseFloat(transfer.amount).toFixed(2)}</li>
                    <li>From Acct: {transfer.accountFrom}</li>
                    <li>To Acct: {transfer.accountTo}</li>
                    <li>Status: {transfer.transferStatus}</li>
                    {(transfer.transferStatus === 'PENDING' && transfer.transferType === 'REQUEST' && transfer.accountTo !== account.id) ?
                    (<li className='submit-transfer-container'>
                        <div className='accept-container'>
                            Accept: <FaCheckSquare onClick={handleAccept} />
                        </div>
                        <div className='reject-container'>
                            Reject: <FaWindowClose onClick={handleReject} />
                        </div>
                    </li>) : ''}
                </ul>) :
                    (<ul className='transfer-brief-details'>
                        <li>{transfer.id}</li>
                        <li>{transfer.accountFrom}</li>
                        <li>{transfer.accountTo}</li>
                        <li>${parseFloat(transfer.amount).toFixed(2)}</li>
                        <li className='status-field'>{transfer.transferStatus}</li>
                    </ul>)}
        </div>
    )
};

export default Transfer;