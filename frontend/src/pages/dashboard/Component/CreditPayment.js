import { Input, Modal } from "antd";
import { Form, Formik, useFormik } from "formik";
import { useState } from "react";
import * as Yup from 'yup';
import { t } from "i18next"
import { APIClient } from "../../../helpers/apiClient";
import { getLoggedInUser } from "../../../helpers/authUtils";
import { toast } from "react-toastify";

function CreditPayment({ creditPackage, isOpen, onCloseModal }) {
    const admin = getLoggedInUser()[0];
    const [message, setMessage] = useState('');
    const [openModal, setOpenModal] = useState(isOpen);

    const handleSubmit = async (e) => {
        e.preventDefault();
        // const response = await fetch('http://localhost:8080/payment', {
        //     method: 'POST',
        //     headers: {
        //         'Content-Type': 'application/json',
        //     },
        //     body: JSON.stringify({ cardNumber, expiryDate, cvv, amount }),
        // });
        // const data = await response.json();
        // setMessage(data.message);
    };

    const formik = useFormik({
        enableReinitialize: true,
        validationSchema: Yup.object({

        }),
        initialValues: {
            cardNumber: "",
            name: "",
            expiryDate: "",
            cvv: "",
            amount: creditPackage.AMOUNT
        },
        onSubmit: (values) => {
            var datapost = {
                user_id: admin.user_id,
                price: creditPackage.PRICES,
                credit: creditPackage.AMOUNT,
                package: "",
                type: 0
            }
            new APIClient().create("payment",datapost).then((res) => {
                toast.success(t("t_success"));
                //update credit for user
                
            });
            setOpenModal(false);
            onCloseModal();
            // handleSubmit(values);
        },
    });

    return (
        <Modal className="payment-form" open={openModal}
            onCancel={() => { setOpenModal(false); onCloseModal() }}
            footer={<button type="submit" onClick={() => formik.submitForm()} className="btn btn-primary form-control btn-sm">{"Pay $" + creditPackage.AMOUNT}</button>}
        >
            <div className="App">
                <h5>Payment Form</h5>
                <Formik enableReinitialize={true} initialValues={formik.initialValues}>
                    <Form onSubmit={(e) => {
                        e.preventDefault();
                        formik.handleSubmit();
                    }}>
                        <div className="row">
                            <div className="col-md">
                                <Input
                                    type="text"
                                    required
                                    name="cardNumber"
                                    className="form-control"
                                    placeholder={"Card Number"}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    value={formik.values.cardNumber}
                                />
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md">
                                <Input
                                    type="text"
                                    required
                                    name="name"
                                    className="form-control"
                                    placeholder={"Name"}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    value={formik.values.name}
                                />
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md">
                                <Input
                                    type="text"
                                    required
                                    name="expiryDate"
                                    className="form-control"
                                    placeholder={"Expiry Date"}
                                    maxLength={5}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    value={formik.values.expiryDate}
                                />
                            </div>
                            <div className="col-md">
                                <Input
                                    type="text"
                                    name="cvv"
                                    className="form-control"
                                    placeholder={"CVV"}
                                    maxLength={3}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    value={formik.values.cvv}
                                />
                            </div>
                        </div>
                        {/* <div className="row">
                            <div className="col-md">
                                <Input
                                    type="text"
                                    name="amount"
                                    disabled
                                    className="form-control"
                                    placeholder={"Amount"}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    value={formik.values.amount}
                                />
                            </div>
                        </div> */}
                        {message && <p>{message}</p>}
                    </Form>

                </Formik>

            </div>
        </Modal>
    );
}

export default CreditPayment;