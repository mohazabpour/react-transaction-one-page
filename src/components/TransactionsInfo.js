import {useState,useEffect} from "react"

const TransactionsInfo = ({transaction}) => {
 let date = new Date(transaction.created_at);


  let [accountInfo,setAccountInfo] = useState([]);
  let [error,setError] = useState(null);


var requestOptions = {
  method: 'GET',
  redirect: 'follow'
};
useEffect(() => {
  fetch("https://infra.devskills.app/api/accounting/accounts/"+transaction.account_id, requestOptions)
  .then(response => response.json())
  .then(result => setAccountInfo(result))
  .catch(error => setError(error));
},[])



  if(error){
    console.log(error);
    return <pre>Server Error 500</pre>
  }
   return (
        <li className="px-3 py-3 flex items-start">
        <div className="flex-grow">
          <div className="flex items-center">
            <span className="flex-none font-medium text-2xl text-blue-500">
            Transferred {(transaction.amount < 0) ? 'from' : 'to'} account {transaction.account_id}</span>
            <span className="flex-grow text-right">{transaction.amount}$</span>
          </div>
          {}
            <div><b className="font-bold text-red-400">The current account balance is </b> 
           {accountInfo.balance}$
           
           </div>
           
     
          
          <div className="leading-tight">At: {date.toLocaleString('sv-SE')}</div>
        </div>
      </li>
    )
}

export default TransactionsInfo