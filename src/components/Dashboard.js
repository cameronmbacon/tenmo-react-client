import React, { useEffect, useRef, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Navbar from './Navbar';
import Account from './Account';
import Transfers from './Transfers';
import TransferMenu from './TransferMenu';
import useTenmoApi from '../hooks/useTenmoApi';

import '../styles/Dashboard.css';

const Dashboard = () => {

    const { fetchAccountByUserId, fetchTransfersForUser } = useTenmoApi();

    const location = useLocation();
    const navigate = useNavigate();
    const { user, account: initialAccount, transfers } = location.state || {};
    const [initialized, setInitialized] = useState(false);
    const [currentUser, setCurrentUser] = useState(JSON.parse(localStorage.getItem('user')) || user);
    const [account, setAccount] = useState(initialAccount || {});
    const [currentTransfers, setCurrentTransfers] = useState(transfers || []);
    const [showMenu, setShowMenu] = useState(false);
    const [showTransferMenu, setShowTransferMenu] = useState(false);

    const initialLoad = useRef(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                let userData = currentUser;

                if (!userData) {
                    userData = JSON.parse(localStorage.getItem('user'));
                    if (!userData) {
                        navigate('/login');
                        return;
                    }
                    setCurrentUser(userData);
                }

                if (!account || Object.keys(account).length === 0) {
                    const accountData = await fetchAccountByUserId(userData.id);
                    setAccount(accountData);
                }

                if (!transfers || transfers.length === 0) {
                    const transfersData = await fetchTransfersForUser(userData.id);
                    setCurrentTransfers(transfersData);
                }

                setInitialized(true);
            } catch (error) {
                console.error('Error fetching data', error);
                navigate('/login');
            }
        };

        if (initialLoad.current) {
            initialLoad.current = false;
            fetchData();
        }
    }, [currentUser, account, transfers, initialized, navigate, fetchAccountByUserId, fetchTransfersForUser]);

    useEffect(() => {
        if (user) {
            setCurrentUser(user);
        }
        if (initialAccount) {
            setAccount(initialAccount);
        }
        if (currentTransfers) {
            setCurrentTransfers(transfers);
        }
    }, [user, initialAccount, transfers, currentTransfers]);

    const toggleMenu = (event) => {
        event.preventDefault();
        setShowMenu(!showMenu);
    };

    const toggleTransferMenu = () => {
      setShowTransferMenu(!showTransferMenu);
    };
    
    return (
        <div className='dashboard-container'>
            <div className='content'>
                <h1>Dashboard</h1>
                <div className='greeting-container'>
                    <h2>Welcome {currentUser.username}</h2>
                </div>
                {<Account balance={account?.balance || 0.0 } />}
                {<Transfers transfers={currentTransfers} account={account} />}
            </div>
            <Navbar
                user={user} account={account} transfers={transfers}
                toggleMenu={toggleMenu}
                toggleTransferMenu={toggleTransferMenu}
                showMenu={showMenu}
                showTransferMenu={showTransferMenu} />

            {showTransferMenu && <TransferMenu toggleTransferMenu={toggleTransferMenu} user={currentUser} />}
        </div>
    );
}

export default Dashboard;