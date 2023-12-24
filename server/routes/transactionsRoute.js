const router = require("express").Router();
const Transaction = require("../models/transactionModel");
const authMiddileware = require("../middlewares/authMiddleware");
const User = require("../models/userModel");

const stripe = require("stripe")(process.env.stripe_key);
const {uuid} = require("uuidv4");
//Transfer Money from one account to another.
router.post("/transfer-funds", authMiddileware, async (req, res) => {
  try {
    // Saving the traansaction
    const newTransaction = new Transaction(req.body);
    await newTransaction.save();

    // Decrease the sender balance
    await User.findByIdAndUpdate(req.body.sender, {
      $inc: { balance: -req.body.amount },
    });

    // Increaing Recivers Anmount
    await User.findByIdAndUpdate(req.body.receiver, {
      $inc: { balance: req.body.amount },
    });

    res.send({
      message: "Transaction Successfull",
      data: newTransaction,
      success: true,
    });
  } catch (error) {
    res.send({
      message: "Transaction Failed",
      data: error.message,
      success: false,
    });
  }
});

// Verify reciver's account number,
router.post("/verify-account", authMiddileware, async (req, res) => {
  try {
    const user = await User.findOne({ _id: req.body.receiver });
    if (user) {
      res.send({
        message: "Account Verified",
        data: user,
        success: true,
      });
    } else {
      res.send({
        message: "Account Not Found",
        data: null,
        success: false,
      });
    }
  } catch (error) {
    res.send({
      message: "Account Not Found",
      data: error.message,
      success: false,
    });
  }
});

// get all transactions for a user
router.post(
  "/get-all-transactions-by-user",
  authMiddileware,
  async (req, res) => {
    try {
      const transactions = await Transaction.find({
        $or: [{ sender: req.body.userId }, { receiver: req.body.userId }],
      }).sort({ createdAt: -1 });

      res.send({
        message: "Transactions Fetched",
        data: transactions,
        success: true,
      });
    } catch (error) {
      res.send({
        message: "Transactions Not Fetched",
        data: error.message,
        success: false,
      });
    }
  }
);

// deposit funds using Stripe
router.post("/deposit-funds", authMiddileware, async (req, res) => {
  try {
    const { token, amount } = req.body;
    //create a customer

    const customer = await stripe.customers.create({
      email: token.email,
      source: token.id,
    });

    //create a charge

    const charge = await stripe.charges.create(
      {
        amount: amount,
        currency: "USD",
        customer: customer.id,
        receipt_email: token.email,
        description: "Depositted to your Vinimay account",
      },
      {
        idempotencyKey: uuid(),
      }
    );

    //save the transaction

    if (charge.status === "succeeded") {
      const newTransaction = new Transaction({
        sender: req.body.userId,
        receiver: req.body.userId,
        amount: amount,
        type: "deposit",
        reference: "stripe deposit",
        status: "success",
      });
      await newTransaction.save();

      //increase User's Balance
      await User.findByIdAndUpdate(req.body.userId, {
        $inc: { balance: amount },
      });
      res.send({
        message: "Funds deposited successfully",
        data: newTransaction,
        success: true,
      });
    } else {
      res.send({
        message: "Transaction failed",
        data:charge,
        success: false,
      });
    }
  } catch (error) {
    res.send({
      message: "Transaction failed with error",
      data: error.message,
      success: false,
    });
  }
});
module.exports = router;
