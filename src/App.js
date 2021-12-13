import { useState,useEffect,useCallback } from "react"
import {BsBank2} from "react-icons/bs"
import SubmitTransaction from "./components/SubmitTransaction"
import TransactionsInfo from "./components/TransactionsInfo"
import Api from "./helper/api";




function App() {
  
  //let [transactionsList,setTransactionsList] = useState([]);
  let [transactionsInfo,setTransactionsInfo] = useState([]);
  let [transactionInfoPost , setTransactionInfoPost] = useState([
    {
      account_id: '16aabb48-5ac0-11ec-bf63-0242ac130002', 
      amount: 36,
      transaction_id: '5ba70f79-b785-4049-bffa-a49c7619206d',
      created_at: '2021-12-12T17:31:05.468937'
    }
  ]);

  let [error,setError] = useState(null);

  let sortBy = 'created_at';
  let orderBy = 'desc';

  const api = new Api();

const fetchTransactions = useCallback(()=>{
    let transId = transactionInfoPost.pop().transaction_id;
    api
      .getTransactionsInfo(transId)
      .then(response => setTransactionsInfo([...transactionsInfo,response.data]))
      .catch(error => setError(error))
    },[]);
    useEffect(() => {
      fetchTransactions()
    },[fetchTransactions])
      
  if(error){
        console.log(error);
        return <pre>Server Error 500</pre>
      }

    return (
      <div className="App container mx-auto mt-3 font-thin">
        <h1 className="text-5xl mb-3"><BsBank2 className="inline-block text-red-400"/>Transaction Page</h1>
        
        <SubmitTransaction
        onSubmitTransaction = {myTransaction =>  setTransactionsInfo([...transactionsInfo,myTransaction])}
        setTransactionInfoPost = {myTransactionPost => setTransactionInfoPost([...transactionInfoPost,myTransactionPost])}
        />
        <ul className="divide-y divide-gray-200">
      
        {transactionsInfo.length>0 && transactionsInfo.map(transaction => (
              <TransactionsInfo 
              key={transaction.created_at}
              transaction = {transaction} 
            
              />
          
          )
          ).sort((a,b) => {
            let order = (orderBy  === 'asc') ? 1 : -1;
            let adate = new Date(a.props.transaction[sortBy]);
            let bdate = new Date(b.props.transaction[sortBy]);
            return (
              adate.toLocaleString('sv-SE') < bdate.toLocaleString('sv-SE')
               ? -1 * order : 1 * order
            )
          })
        } 
        
        </ul>
  
      </div>
    );
    
  

}

export default App;
