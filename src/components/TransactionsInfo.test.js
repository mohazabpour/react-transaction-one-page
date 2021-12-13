import React from 'react'
import ReactDOM from 'react-dom';
import TransactionsInfo from "./TransactionsInfo"


test("Transaction Info", () =>{
  const transaction = {
    account_id : '16aabb48-5ac0-11ec-bf63-0242ac130002',
    amount : '20',
    createt_at: '2021-12-11 20:22:49'
}

const transactionInfoPost = {
  amount: '20'
}

  const div = document.createElement('div');
  ReactDOM.render(<TransactionsInfo transaction = {transaction} transactionInfoPost = {transactionInfoPost} />, div);

})