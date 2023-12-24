import React from "react";
import { Form, Modal, message } from "antd";
import StripeCheckout from "react-stripe-checkout";
import { DepositFunds } from "../../apicalls/transactions";
import { useDispatch } from "react-redux";
import { HideLoading, ShowLoading } from "../../redux/loaderSlice";

function DepositModal({ showDepositModal, setShowDepositModal, reloadData }) {
  const dispatch = useDispatch();
  const [form] = Form.useForm();

  const onToken = async (token) => {
    try {
      dispatch(ShowLoading());
      const response = await DepositFunds({
        token,
        amount: form.getFieldValue("amount"),
      });
      dispatch(HideLoading());
      if (response.success) {
        reloadData();
        setShowDepositModal(false);
        message.success(response.message);
      } else {
        message.error(response.message);
      }
    } catch (error) {
      dispatch(HideLoading());
      message.error(error.message);
    }
  };

  return (
    <Modal
      title="Deposit"
      open={showDepositModal}
      onCancel={() => setShowDepositModal(false)}
      footer={null}
    >
      <div className="flex-col gap-1">
        <Form layout="vertical" form={form}>
          <Form.Item
            label="Amount"
            name="amount"
            rules={[
              {
                required: true,
                message: "Please input amount!",
              },
            ]}
          >
            <input type="number" />
          </Form.Item>

          <div className="flex justify-end gap-1">
            <button className="primary-outlined-btn">Cancel</button>
            <StripeCheckout
              token={onToken}
              currency="USD"
              amount={form.getFieldValue("amount") * 100}
              // shippingAddress
              stripeKey="pk_test_51OOzPmSFhzLliHYtqfcNruEEKK3hwKJ8o3q18WpdYk2CkDGPEWPaHIyXYdn5Kh9UDNHvXZR4LNcwGL0MZytPEEke00yt641SDG"
            >
              <button className="primary-contained-btn"> Deposit</button>
            </StripeCheckout>
          </div>
        </Form>
      </div>
    </Modal>
  );
}

export default DepositModal;
