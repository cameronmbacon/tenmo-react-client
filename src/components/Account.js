import React from 'react';

import '../styles/Account.css';

const Account = ({ balance }) => {

  return (
    <div className='account-container'>
        <h2>Account Balance</h2>
        <h1>${balance.toFixed(2)}</h1>
    </div>
  );
}

export default Account;