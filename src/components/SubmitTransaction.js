import {BsCreditCard2Back} from "react-icons/bs"
import {useState} from "react"
import Api from "../helper/api";





const SubmitTransaction = ({onSubmitTransaction,setTransactionInfoPost}) => {
  
var today = new Date();
var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
var dateTime = date+' '+time;
var rawDateTime = dateTime.toLocaleString('en-GB', { timeZone: 'UTC' });




  const clearData = {
        account_id : '',
        amount : '',
    }
    let [toggleForm, setToggleForm] = useState(true);
    let [formData , setFormData] = useState(clearData);
    let [formErrors,setFormErrors] = useState(false);
    let [amountError,setAmountError] = useState(false);
    let [error,setError] = useState(null);
    
    
//Form basic validation
 function accountIdPatternValidation(accountid){
    const regex = new RegExp("[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}");    
    setFormErrors(regex.test(accountid));
  };

function amountValidation(amount)  {
  const regex = new RegExp("/^d*.?d*$/");
  (amount !== "" || regex.test(amount)) ? setAmountError(true) : setAmountError(false);
}

  //end of basic form validation

    function formDataPublish(){   
      const transactionInfo = {
          account_id : formData.account_id,
          amount: formData.amount,
          created_at:rawDateTime
        }

        const api = new Api();
            api
            .addNewTransaction(transactionInfo)
            .then(response => setTransactionInfoPost(response.data))
            .catch(error => setError(error))
          
          if(error){
             <pre>Server Error 500</pre>
          } else{
            onSubmitTransaction(transactionInfo);
            setFormData(clearData);
            setToggleForm(!toggleForm);
          }

          
    }
    
  
    return (
        <div>
        <button onClick = {() => {setToggleForm(!toggleForm)}}
        className={
            `bg-blue-400 text-white px-2 py-3 w-full text-left rounded-t-md ${toggleForm ? 'rounded-t-md' : 'rounded-md'}`
        }>
          <div><BsCreditCard2Back className="inline-block align-text-top" /> Submit Transaction</div>
        </button>
        {toggleForm && 

                <div className="border-r-2 border-b-2 border-l-2 border-light-blue-500 rounded-b-md pl-4 pr-4 pb-4">
                <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start  sm:pt-5">
                  <label htmlFor="account_id" className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2">
                    Account Id
                  </label>
                  <div className="mt-1 sm:mt-0 sm:col-span-2">
                    <input type="text" name="account_id" id="account_id"
                      onChange = {(event) =>  {setFormData({...formData, account_id: event.target.value});accountIdPatternValidation(event.target.value)}}
                    value={formData.account_id}
                      className="max-w-lg block w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:max-w-xs sm:text-sm border-gray-300 rounded-md"
                      placeholder ="UUID4 pattern"
                     />
                     {!formErrors && <span className="text-red-400">Please use the UUID4 pattern.</span>}
                     <span className="text-gray-400 block">(e.g. 16aabb48-5ac0-11ec-bf63-0242ac130002, fa0c3125-7f63-4286-9013-bdc8a91ba3db)</span>
                  </div>
                </div>
        
                <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start  sm:pt-5">
                  <label htmlFor="amount" className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2">
                    Amount
                  </label>
                  <div className="mt-1 sm:mt-0 sm:col-span-2">
                    <input type="text" name="amount" id="amount"
                    onChange = {(event) =>  {setFormData({...formData, amount: event.target.value});amountValidation(event.target.value)}}
                     value={formData.amount}
                      className="max-w-lg block w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:max-w-xs sm:text-sm border-gray-300 rounded-md"
                      placeholder ="e.g. 20 or -20"
                      />
                      {!amountError && <span className="text-red-400">Do not leave the field empty.</span>}
                  </div>
                </div>
                          
        
                <div className="pt-5">
                  <div className="flex justify-end">
                    <button type="submit" onClick={formDataPublish} 
                    className="ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-400 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-400"
                    disabled={!amountError || !formErrors}
                    >
                      Submit
                    </button>
                  </div>
                </div>
              </div>
        
        }
      </div>
    )
}

export default SubmitTransaction