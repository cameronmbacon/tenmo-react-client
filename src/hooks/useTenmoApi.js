import { listUsers, getUserById, getUserByUsername } from '../api/user';
import { getAccountBalance, getAccountByUserId } from '../api/account';
import { createSendTransfer, createRequestTransfer, acceptRequestTransfer, rejectRequestTransfer, listTransfersForUser, getTransferDetails } from '../api/transfer';

const useTenmoApi = () => {

    // User methods
    const fetchUsers = async () => {
        try {
            const data = await listUsers();
            return data;
        } catch (error) {
            console.error('Error fetching users:', error);
        }
    };

    const fetchUserById = async (id) => { 
        try {
            const data = await getUserById(id);
            return data;
        } catch (error) {
            console.error('Error fetching user by ID:', error);
        }
     };

     const fetchUserByUsername = async (username) => { 
        let data = {};
        try {
            data = await getUserByUsername(username);
            return data;
        } catch (error) {
            console.error('Error fetching user by username:', error);
        }
     };

     // Account methods
     const fetchAccountBalance = async (userId) => { 
        let data = 0.0;
        try {
            data = await getAccountBalance(userId);
            return data;
        } catch (error) {
            console.error('Error fetching account balance:', error);
        }
    };

    const fetchAccountByUserId = async (userId) => {
        let data = {};
        try {
            data = await getAccountByUserId(userId);
            return data;
        } catch (error) {
            console.error('Error fetching account by user ID:', error);
        }
    };

    // Transfer methods
    const sendTransfer = async (transferData) => {
        try {
            const transfer = await createSendTransfer(transferData);
            return transfer;
        } catch (error) {
            console.error('Error creating send transfer', error);
        }
    };

    const requestTransfer = async (transferData) => {
        try {
            const transfer = await createRequestTransfer(transferData);
            return transfer;
        } catch (error) {
            console.error('Error creating request transfer', error);
        }
    };

    const acceptTransfer = async (transferId, userId) => {
        try {
            await acceptRequestTransfer(transferId);
            return fetchTransfersForUser(userId);
        } catch (error) {
            console.error('Error accepting request transfer', error);
        }
    };

    const rejectTransfer = async (transferId, userId) => {
        try {
            await rejectRequestTransfer(transferId);
            return fetchTransfersForUser(userId);
        } catch (error) {
            console.error('Error rejecting request transfer', error);
        }
    };

    const fetchTransfersForUser = async (userId) => {
        let data = [];
        try {
            data = await listTransfersForUser(userId);
            return data;
        } catch (error) {
            console.error('Error fetching transfers for user', error);
        }
    };

    const fetchTransferDetails = async (transferId) => {
        let data = {};
        try {
            data = await getTransferDetails(transferId);
        } catch (error) {
            console.error('Error fetching transfer details', error);
        } finally {
            return data;
        }
    };

    return {
        fetchUsers,
        fetchUserById,
        fetchUserByUsername,
        fetchAccountBalance,
        fetchAccountByUserId,
        sendTransfer,
        requestTransfer,
        acceptTransfer,
        rejectTransfer,
        fetchTransfersForUser,
        fetchTransferDetails,
    };
}

export default useTenmoApi;