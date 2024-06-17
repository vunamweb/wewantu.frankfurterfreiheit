import { Input, Modal } from "antd";
import { Form, Formik, useFormik } from "formik";
import { useState } from "react";
import * as Yup from 'yup';
import { t } from "i18next"
import { getLoggedInUser, setLoggedInUser } from "../../../helpers/authUtils";
import { toast } from "react-toastify";
import { connect } from "react-redux";
import { updateCredits } from "../../../redux/actions";
import { APIClient } from "../../../helpers/apiClient";

function CreditPayment({ creditPackage, isOpen, onCloseModal, user, updateCredits }) {
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
            cardNumber: Yup.string().required(t('Please enter your card number')),
            name: Yup.string().required(t('Please enter Name')),
            expiryDate: Yup.string().required(t('Please enter expiry Date')),
            cvv: Yup.string().required(t('Please enter CVV'))
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


            new APIClient().create("payment", datapost).then((res) => {
                toast.success(t("t_success"));
                //update credit for user
                let userUpd = admin;
                userUpd.credits = parseInt(userUpd.credits) + parseInt(creditPackage.AMOUNT);
                setLoggedInUser([userUpd]);

                updateCredits(userUpd);
            });

            setOpenModal(false);
            onCloseModal();
            // handleSubmit(values);
        },
    });

    return (
        <Modal className="payment-form" open={openModal}
            onCancel={() => { setOpenModal(false); onCloseModal() }}
            footer={<button type="submit" onClick={() => formik.submitForm()} className="btn btn-primary form-control btn-sm">{"Pay $" + creditPackage.PRICES}</button>}
        >
            <div className="App">
                <h5>{t("t_payment_form")}</h5>
                <Formik enableReinitialize={true} initialValues={formik.initialValues}>
                    <Form onSubmit={(e) => {
                        e.preventDefault();
                        formik.handleSubmit();
                    }}>
                        <div className="row">
                            <div className="col-md">
                                <Input
                                    type="text"
                                    required={true}
                                    name="cardNumber"
                                    className="form-control"
                                    placeholder={t("t_card_number")}
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
                                    required={true}
                                    name="name"
                                    className="form-control"
                                    placeholder={t("t_name")}
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
                                    required={true}
                                    name="expiryDate"
                                    className="form-control"
                                    placeholder={t("t_expiry_date")}
                                    maxLength={5}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    value={formik.values.expiryDate}
                                />
                            </div>
                            <div className="col-md">
                                <Input
                                    type="text"
                                    required={true}
                                    name="cvv"
                                    className="form-control"
                                    placeholder={t("t_cvv")}
                                    maxLength={3}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    value={formik.values.cvv}
                                />
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md">
                                <Input
                                    type="text"
                                    name="amount"
                                    disabled
                                    className="form-control"
                                    placeholder={t("t_credits")}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    value={formik.values.amount}
                                />
                            </div>
                        </div>
                    </Form>

                </Formik>

            </div>
        </Modal>
    );
}


const mapStateToProps = (state) => {

    const { user } = state.Auth;
    return { user };
};

export default connect(mapStateToProps, { updateCredits })(CreditPayment);