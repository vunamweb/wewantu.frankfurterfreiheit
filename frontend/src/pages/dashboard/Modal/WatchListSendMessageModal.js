import React, { useState, useEffect } from 'react';

import { getLoggedInUser } from '../../../helpers/authUtils';
import { Modal, Form, Input, Button, message } from 'antd';
import { FaRegStar } from "react-icons/fa";
import { useTranslation } from 'react-i18next';
import 'swiper/css';
import 'swiper/css/scrollbar';
import { Avatar } from 'antd';
import { APIClient } from '../../../helpers/apiClient';
import TextArea from 'antd/es/input/TextArea';
import { setActiveTab } from "../../../redux/actions";
import { connect } from "react-redux";
//Import Images
import avatar4 from "../../../assets/images/users/avatar-4.jpg";
import { getFirebaseBackend } from '../../../helpers/firebase';
import { toast } from 'react-toastify';
import ConfirmModal from './ConfirmModal';
import RatingStar from '../Component/RatingStar';

function WatchListSendMessageModal(props) {
    const currentUser = props.currentUser
    const fireBaseBackend = getFirebaseBackend();
    const type = props.type;

    const { t } = useTranslation();
    const [form] = Form.useForm();
    const [form2] = Form.useForm();

    const admin = getLoggedInUser()[0];
    const [isModalOpenUserTemplate, setIsModalOpenUserTemplate] = useState(false);
    const [loadlang, setloadlang] = useState(true);
    const [templateData, settemplateData] = useState([]);
    const [hasPayment, setHasPayment] = useState(false);
    const [isOpenConfirmModal, setIsOpenConfirmModal] = useState(false);
    const [address, setAddress] = useState({});

    // const [user,setUser] = useState(null);
    let user = null;
    if (currentUser.user) {
        user = currentUser.user;
    }
    else {
        user = currentUser;
    }

    const handleOpenUserTemplate = (e, id) => {
        setIsModalOpenUserTemplate(true)
    }
    const handleCancelUserTemplate = () => {
        setIsModalOpenUserTemplate(false);
    }
    const onReset = () => {
        form.resetFields();
    };
    const handleSubmit = (values) => {
        values.user_id = admin.user_id;
        new APIClient().create('user_template', values).then(val => {
            if (val) {
                toast.success('Added template successfully')
                onReset()
                setloadlang(true)
                handleCancelUserTemplate()
            }
        })
    }

    const handleOnTemplateItemClick = (event) => {
        let tmp = user.prename + ' ' + user.lastname + ',\r' + event.target.value;
        form2.setFieldsValue({
            message: tmp,
            job_search_profile_id: user.job_search_profile_id,
            user_id: admin.user_id
        });
    }

    const handleSendMessage = (values) => {
        var messageObj = null;
        let d = new Date();
        let time = d.getTime();

        var y = d.getFullYear();
        var m = d.getMonth() + 1 < 10 ? "0" + (d.getMonth() + 1) : d.getMonth() + 1;
        var dd = d.getDay() < 10 ? "0" + d.getDay() : d.getDay();
        var h = d.getHours() < 10 ? "0" + d.getHours() : d.getHours();
        var mm = d.getMinutes() < 10 ? "0" + d.getMinutes() : d.getMinutes();
        var s = d.getSeconds() < 10 ? "0" + d.getSeconds() : d.getSeconds();
        var fulltime = y + "-" + m + "-" + dd + " " + h + ":" + mm + ":" + s;
        messageObj = {
            id: time,
            message: values.message,
            time: fulltime,
            userType: "sender",
            image: avatar4,
            isFileMessage: false,
            isImageMessage: false
        }
        if (getLoggedInUser().length > 0) {
            const admin = getLoggedInUser()[0];
            if (type == "message")
                fireBaseBackend.writeMessages(admin, user, messageObj);
            else {
                const dataToSend = {
                    from_user_id:admin.user_id,
                    to_user_id:user.user_id,
                    message: values.message
                }
                new APIClient().create("/user/sendmail",dataToSend).then(res=>{

                })
            }
            toast.success("Message sent successfully");
        }

    }

    const hanleCancelConfirm = () => {
        setIsOpenConfirmModal(false);
    }

    const handleConfirm = () => {
        if (user) {
            const user_payment_data = {
                user_id: admin.user_id,
                user_id_payment: user.user_id,
                credit: 1,
                type: type
            }
            new APIClient().create("user_payment", user_payment_data).then((res) => {
                setHasPayment(true);
                toast.success("Buy credit successfully");
                setIsOpenConfirmModal(false);
            });
        }
    }

    const handleBuyCredit = () => {
        setIsOpenConfirmModal(true);
    }


    useEffect(() => {
        if (currentUser) {
            //set address
            if (currentUser.address && currentUser.address.length > 0)
                setAddress(currentUser.address[0]);

            //check payment
            new APIClient().get('user/' + admin.user_id + '/user_payment').then(res => {
                if (res.length > 0) {
                    let user_payment_list = res.filter((payment) => { return payment.user_id_payment == user.user_id && payment.type == type });
                    if (user_payment_list.length > 0) {
                        setHasPayment(true);
                    }
                } else {
                    setHasPayment(false);
                }
            })
            new APIClient().get('user/' + admin.user_id + '/user_template').then(res => {
                if (res.length > 0) {
                    let tmp = user.prename + ' ' + user.lastname + ',\r' + res[0].description;
                    form2.setFieldsValue({
                        message: tmp,
                        job_search_profile_id: user.job_search_profile_id,
                        user_id: admin.user_id
                    });
                    settemplateData(res);
                }
            });
        }

    }, [currentUser])

    if (!user || Object.keys(user).length == 0) {
        return null;
    }

    return (
        <React.Fragment>
            <Modal title="Write a message for Bäckereifachverkäufer/in Berlin Mitte" open={props.isModalOpen} onCancel={props.handleCancel} width={1000} footer=" ">
                <div className="row write-msg">
                    <div className="col-md-3 pleft">
                        <Avatar className='avatar' size={80}>{(user.prename.slice(0, 1)).toUpperCase()}{(user.lastname.slice(0, 1)).toUpperCase()}</Avatar>
                        <div className="name">{user.prename} {user.lastname}</div>
                        <div className='popup-infor'><img src="assets/img/year.svg" alt='' />{user.year_of_birth}</div>
                        <div className='popup-infor' style={{ "paddingTop": "10%" }}><img src="assets/img/location.svg" alt='' />{address.city} {address.postal_code ? ',' + address.postal_code : ''}</div>
                        <div className='popup-infor'><img src="assets/img/hand.svg" alt='' /></div>
                        {/* <div className='popup-infor'><img src="assets/img/safari.svg" alt=''/></div> */}
                        <RatingStar user_id={user.user_id} />
                    </div>
                    <div className="col-md about">
                        <Form
                            form={form2}
                            name="userwatchlist"
                            onFinish={handleSendMessage}
                        >
                            <Form.Item
                                name="message"
                            >
                                <TextArea rows={11} cols={63} className="scroll scroll-searchcenter" style={{ "width": "100%" }} />
                            </Form.Item>
                            <Form.Item
                                name="job_search_profile_id"
                                hidden={true}
                            >
                                <Input />
                            </Form.Item>
                            <Form.Item
                                name="user_id"
                                hidden={true}
                            >
                                <Input />
                            </Form.Item>

                            <div className="row">
                                <div className="col-md-4">
                                    {!hasPayment && (admin.buy_credit) && <button type="button" onClick={handleBuyCredit} className="btn btn-secondary form-control">{t('t_buy_credits').toUpperCase()}</button>}
                                </div>
                                <div className="col-md-4"></div>
                                <div className="col-md-4">
                                    {hasPayment && <button type="primary" className="btn btn-primary form-control btn-sm">{(type == "mail") ? t('t_send_mail').toUpperCase() : t('t_send_message').toUpperCase()}</button>}
                                </div>
                            </div>
                        </Form>
                    </div>
                </div>

                <div className="row template" style={{ "marginTop": "3%" }}>
                    <div className="col-md">
                        <div className="col-md-5" style={{ "marginBottom": "3%" }}><button type="button" onClick={handleOpenUserTemplate} className="btn btn-primary btn-newtemplate">NEW TEMPLATE</button> </div>
                        <div className="row">
                            {templateData.map(item => (
                                <div className="col-md-3 py-2 template-item" >
                                    <div><h6>{item.name}</h6></div>
                                    <TextArea name="mess" rows="5" readOnly={true} className='scroll scroll-searchcenter' value={item.description} onClick={handleOnTemplateItemClick} />
                                </div>
                            ))}
                        </div>
                    </div>
                </div>


            </Modal>
            <Modal title="New UserTemplate" open={isModalOpenUserTemplate} onOk={form.submit} onCancel={handleCancelUserTemplate}>
                <Form
                    form={form}
                    name="usertemplate"
                    onFinish={handleSubmit}
                >
                    <Form.Item
                        label="Name"
                        name="name"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your name!',
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        label="description"
                        name="description"
                        rules={[
                            {
                                required: false,
                                message: 'Please input your description!',
                            },
                        ]}
                    >
                        <TextArea />
                    </Form.Item>
                </Form>
            </Modal>
            <ConfirmModal isOpen={isOpenConfirmModal} onCancel={hanleCancelConfirm} onConfirm={handleConfirm} messageText={"Do you want to chat with this person for 1 credit?"}></ConfirmModal>
        </React.Fragment>
    )
}

const mapStatetoProps = state => {
    return {
        ...state.Layout
    };
};

export default connect(mapStatetoProps, {
    setActiveTab
})(WatchListSendMessageModal);