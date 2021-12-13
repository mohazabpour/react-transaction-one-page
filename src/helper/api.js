
import axios from 'axios'


export default class Api {
  constructor() {
    this.api_token = null;
    this.client = null;
    this.api_url = 'https://infra.devskills.app/api/accounting';
  }

  init = () => {
    

    let headers = {
      Accept: "application/json",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods" : "GET,PUT,POST,DELETE,PATCH,OPTIONS",
      "Content-Type" : "application/json"

    };

    if (this.api_token) {
      headers.Authorization = `Bearer ${this.api_token}`;
    }

    this.client = axios.create({
      baseURL: this.api_url,
      timeout: 31000,
      headers: headers,
    });

    return this.client;
  };

  getTransactionsList = (params) => {
    return this.init().get("/transactions", { params: params });
  };

  getTransactionsInfo = (params) => {
    return this.init().get("/transactions/"+params);
  };

  getAccountInfo = (params) => {
    return this.init().get("/accounts/"+params);
  };

  addNewTransaction = (data) => {
    return this.init().post("/transactions", data);
  };
}