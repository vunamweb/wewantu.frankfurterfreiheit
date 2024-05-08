import React,{ useState,useEffect } from 'react';
import { getLoggedInUser } from '../../../helpers/authUtils';
import { Modal,Form, Input,Button } from 'antd';
import { FaRegStar } from "react-icons/fa";
import { useTranslation } from 'react-i18next';
import 'swiper/css';
import 'swiper/css/scrollbar';
import { Avatar } from 'antd';
import { APIClient } from '../../../helpers/apiClient';
import TextArea from 'antd/es/input/TextArea';
import { setActiveTab } from "../../../redux/actions";
import { connect} from "react-redux";
import { toast } from 'react-toastify';

function SerchCenterWachlistModal(props){
    const currentUser = props.currentUser
    const { t } = useTranslation();
    const [form] = Form.useForm();
    const [form2] = Form.useForm();
    
    const admin=getLoggedInUser()[0];
    const [isModalOpenUserTemplate, setIsModalOpenUserTemplate] = useState(false);
    const [loadlang, setloadlang] = useState(true);
    const [templateData, settemplateData] = useState([]);
    const toggleTab = tab => {
        props.setActiveTab(tab)
    }
        const handleOpenUserTemplate = (e,id) =>{
            setIsModalOpenUserTemplate(true)   
          }
        const handleCancelUserTemplate =()=>{
            setIsModalOpenUserTemplate(false);
        }
        const onReset = () => {
            form.resetFields();
          };
        const handleSubmit = (values) => {
            values.user_id=admin.user_id;
            new APIClient().create('user_template',values).then(val=>{
                if(val){
                    toast.success('add successfully')
                    onReset()
                    setloadlang(true)
                    handleCancelUserTemplate()
                }
            })
          }

          const addwatclist = (values) => {
            
            
            new APIClient().create('user_watchlist',values).then(val=>{
                if(val){
                    toast.success('add successfully')
                    toggleTab("jobs")
                }
            })
          }
          
          useEffect(() => {
            if(currentUser){
                new APIClient().get('user/'+admin.user_id+'/user_template').then(res=>{
                    if(res){
                        let tmp = currentUser.user.prename+' '+ currentUser.user.lastname+',\r'+ res[0].description;
                        form2.setFieldsValue({
                            message: tmp,
                            job_search_profile_id: currentUser.job_search_profile_id,
                            user_id:admin.user_id
                        });
                        
                        settemplateData(res)
                    } 
                });
            }
                
        },[currentUser])
    if(templateData.length > 0){
        
        return(

            <React.Fragment>
                <Modal title="Write a message for Bäckereifachverkäufer/in Berlin Mitte" open={props.isModalOpen} onCancel={props.handleCancel} width={1000} footer=" ">
                                <div className="row write-msg">
                                    <div className="col-md-3 pleft">
                                    <Avatar className='avatar' size={80}>{(currentUser.user.prename.slice(0,1)).toUpperCase()}{(currentUser.user.lastname.slice(0,1)).toUpperCase()}</Avatar>
                                        <div className="name">{currentUser.user.prename} {currentUser.user.lastname}</div>
                                        <div className='popup-infor' style={{ "paddingTop": "10%"}}><img src="assets/img/location.svg" alt=''/>{currentUser.address[0].city} {currentUser.address[0].country ? ','+currentUser.address[0].country : ''}</div>
                                        <div className='popup-infor'><img src="assets/img/year.svg" alt=''/>{currentUser.address[0].year_birthday}</div>
                                        <div className='popup-infor'><img src="assets/img/hand.svg" alt=''/></div>
                                        {/* <div className='popup-infor'><img src="assets/img/safari.svg" alt=''/></div> */}
                                        <FaRegStar /> <FaRegStar /> <FaRegStar /> <FaRegStar /> <FaRegStar />
                                    </div>
                                    <div className="col-md about"> 
                                            <Form
                                                form={form2}
                                                name="userwatchlist"
                                                onFinish={addwatclist}
                                        >
                                            <Form.Item
                                                name="message"
                                            >
                                                <TextArea  rows={11} cols={63} className="scroll scroll-searchcenter" style={{"width":"100%"}} />
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
                                            <div className="col-md-4"><button type="button" className="btn btn-secondary">BUY CREDITS</button></div>
                                            <div className="col-md-3"></div> 
                                            <div className="col-md-5">
                                                <div className='row'>
                                                <Form.Item>
                                                    <Button type="primary" className="btn btn-primary" htmlType="submit">GET LEAD FOR x CREDIT(S)</Button> 
                                                </Form.Item>
                                            </div>
                                                <div className='row'></div>
                                            </div>
                                        </div>
                                        </Form>
    
                                            
                                        
                                    </div>
                                </div>
    
                                <div className="row template" style={{ "marginTop":"3%"}}>  
                                    <div className="col-md">
                                        <div className="col-md-5" style={{"marginBottom": "3%"}}><button type="button" onClick={handleOpenUserTemplate} className="btn btn-primary btn-newtemplate">NEW TEMPLATE</button> </div>
                                            <div className="row">                                                
                                                {templateData.map(item => (
                                                    <div className="col-md-3 py-2">
                                                        <TextArea name="mess" rows="5" className='scroll scroll-searchcenter' value={item.description} />
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
            </React.Fragment>
        )
    }
    
    return(<div className="loader"></div>)
}

const mapStatetoProps = state => {
    return {
        ...state.Layout
    };
};

export default connect(mapStatetoProps, {
    setActiveTab
})(SerchCenterWachlistModal);