import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { BiX } from 'react-icons/bi';
import useTenmoApi from '../hooks/useTenmoApi';

import '../styles/TransferMenu.css';

const TransferMenu = ({ toggleTransferMenu, user }) => {

    const {
        fetchUsers,
        sendTransfer,
        requestTransfer,
        fetchTransfersForUser,
        fetchAccountByUserId,
    } = useTenmoApi();
    const navigate = useNavigate();

    const [initialized, setInitialized] = useState(false);
    const [error, setError] = useState(null);
    const [transferCreated, setTransferCreated] = useState(false);
    const [users, setUsers] = useState([]);
    const [transferTypeId, setTransferTypeId] = useState(1);
    const [userTo, setUserTo] = useState({});
    const [usernameTo, setUsernameTo] = useState('' || userTo.username);
    const [account, setAccount] = useState({});
    const [accountTo, setAccountTo] = useState({});
    const [amount, setAmount] = useState(0.01);
    const [newTransfer, setNewTransfer] = useState({});

    useEffect(() => {
        const fetchData = async () => {
            if (!initialized) {
                const usersData = await fetchUsers();
                setUsers(usersData);
                if (usersData.length > 0) {
                    setUserTo(usersData[0]);
                    const accountTo = await fetchAccountByUserId(usersData[0].id);
                    setAccountTo(accountTo);
                }
            }
    
            setInitialized(true);
        };

        fetchData();
    }, [initialized, fetchUsers, fetchAccountByUserId]);

    const handleUserChange =  async (event) => {
        const selectedUsername = event.target.value;
        setUsernameTo(selectedUsername);
        const selectedUser = users.find(user => user.username === selectedUsername);
        if (selectedUser) {
            setUserTo(selectedUser);
            const accountTo = await fetchAccountByUserId(selectedUser.id);
            setAccountTo(accountTo);
        }
    };

    const createTransfer = async () => {
        try {
            const accountFrom = await fetchAccountByUserId(user.id);
            let accountFromId = accountFrom.id;
            let accountToId = accountTo.id;
            let newTransfer = {};

            if (accountFromId === accountToId) {
                setError('Cannot transfer to the same account:');
                return;
            } else if (transferTypeId % 2 === 0) {
                newTransfer = await sendTransfer({ transferTypeId, accountFromId, accountToId, amount });
            } else {
                accountFromId = accountTo.id;
                accountToId = accountFrom.id;
                newTransfer = await requestTransfer({ transferTypeId, accountFromId, accountToId, amount });
            }

            setNewTransfer(newTransfer);
            setAccount(accountFrom);
            setTransferCreated(true);
        } catch (error) {
            console.error('Cannot transfer to the same account:', error);
        }
    };

    const navigateToDashboard = async () => {
        const updatedTransfers = await fetchTransfersForUser(user.id);
        toggleTransferMenu();
        navigate('/dashboard',
            { state: {
                user,
                account: account,
                transfers: updatedTransfers,
            },
        });
    };

    return (
        <div className='menu tall-menu'>
            {transferCreated ?
            (
                <div>
                    <h2>New transfer created!</h2>
                    <ul className='new-transfer'>
                        <li><p>Transfer ID: </p>{newTransfer.id}</li>
                        <li><p>Transfer Type: </p>{newTransfer.transferType}</li>
                        <li><p>Transfer Status: </p>{newTransfer.transferStatus}</li>
                        <li><p>To Account #: </p>{newTransfer.accountTo}</li>
                        <li><p>From Account #: </p>{newTransfer.accountFrom}</li>
                        <li><p>Amount: </p>${newTransfer.amount.toFixed(2)}</li>
                    </ul>
                    <button className='btn' onClick={navigateToDashboard}>Dashboard</button>
                </div>
            ) :
            (
                <div>
                    <button className='close-btn' onClick={toggleTransferMenu}><BiX /></button>
                    <ul className='transfer-options'>
                        <li>
                            <label htmlFor='transferType'>
                                Transfer Type: 
                                <select id='transferType'
                                        value={transferTypeId}
                                        className='transfer-type-select'
                                        onChange={(e) => setTransferTypeId(parseInt(e.target.value))}>
                                    <option value={1}>Request</option>
                                    <option value={2}>Send</option>
                                </select>
                            </label>
                        </li>
                        <li>
                            <label htmlFor='accountTo'>
                                User: 
                                <select id='accountTo'
                                        value={usernameTo}
                                        className='account-to-select'
                                        onChange={handleUserChange}>
                                    {users.map(user => (
                                        <option key={user.id} value={user.username}>
                                            {user.username}
                                        </option>
                                    ))}
                                </select>
                            </label>
                        </li>
                        <li>
                            <label>
                                Amount: $
                            </label>
                            <input type='number'
                                value={amount} 
                                step={'0.01'}
                                className='amount-input'
                                onChange={(e) => setAmount(parseFloat(e.target.value).toFixed(2))} />
                        </li>
                    </ul>
                    {error && <p style={{ color: 'red', fontSize: '0.8em' }}>{error}</p>}
                    <button className='btn' onClick={createTransfer}>Submit</button>
                </div>
            )}
        </div>
    );
}

export default TransferMenu;