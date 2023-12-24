const { axiosInstance } = require(".");

// Verify Receiver Account

export const VerifyAccount = async (payload) => {
  try {
    const { data } = await axiosInstance.post(
      "/api/transactions/verify-account",
      payload
    );
    return data;
  } catch (error) {
    return error.response.data;
  }
};

//transfer funds

export const TransferFunds = async (payload) => {
  try {
    const { data } = await axiosInstance.post(
      "/api/transactions/transfer-funds",
      payload
    );
    return data;
  } catch (error) {
    return error.response.data;
  }
};


// get all transactions for a user

export const GetTransationsOfUser = async()=>{

  try {
    const { data} = await axiosInstance.post("/api/transactions/get-all-transactions-by-user");
    return data;
  } catch (error) {
    return error.response.data;
  }
}

// Deposit Funds using Stripe

export const DepositFunds = async (payload) => {
  try {
    const { data } = await axiosInstance.post("/api/transactions/deposit-funds",payload);
    return data;
  } catch (error) {
    return error.response.data;
  }
}