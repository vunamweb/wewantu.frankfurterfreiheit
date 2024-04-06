import React, { useEffect,useState } from 'react';
import { Form,Select,Input,Checkbox } from "antd";
import { getLoggedInUser } from '../../../helpers/authUtils';

//i18n
import { useTranslation } from 'react-i18next';
import { APIClient } from '../../../helpers/apiClient';

const AddJob = (props) => {
    
    const { t } = useTranslation();
    const admin=getLoggedInUser()[0];
    const [loadlang, setloadlang] = useState(true);
    const [professions, setprofessions] = useState([]);
    const [jobs, setjobs] = useState([]);
    const [lang,setlang] = useState([]);
    const [foreign_language,setforeign_language] = useState([]);
    const [driver_licenses, setdriver_licenses] = useState([]);
    const [form] = Form.useForm();
    
    //const currentLang =  i18n.language;
   
    const onFinish = (values) => {
        let datapost={};

        if(props.action === 'edit'){
            //console.log(values);
            datapost={
                'job_search_profile_id':props.job_search_profile_id,
                'user_id':admin.user_id,
                'job_id':values.job ? values.job :0,
                'job_decription':values.job_decription ? values.job_decription  : '',
                'profession_id':values.category
            }
            
            
            //console.log(professions);
            new APIClient().put('job_search_profile',datapost)
            .then(val=>{
               // console.log(val);
               //alert('Edit successful')
               let selectedOptionEdit = professions.find((option) => option.value === values.category);
               props.updateRowEdit({
                    'job_id':values.job ? values.job :0,
                    'job_decription':values.job_decription ? values.job_decription  : '',
                    'category':selectedOptionEdit.label
                });
                props.setIsModalOpen(false)
                })
        }
        else{
            datapost={
                'user_id':admin.user_id,
                'job_id':values.job ? values.job :0,
                'job_decription':values.job_decription ? values.job_decription  : '',
                'profession_id':values.category,
                'desired_salary':0,
                'desired_weekly_hours':values.desired_weekly_hours ? values.desired_weekly_hours : 0,
                'desired_working_days_per_week':0,
                'desired_holiday_days_per_year':0,
                'desired_work_at_weekend_id':values.desired_work_at_weekend_id === true ? "d8e813ff-02c2-43a7-a26f-4fc0125ec16f" : 'f7199f2f-bb8e-47e7-9e19-72c75ff8f88f',
                'desired_work_at_night_id':values.desired_work_at_night_id === true ? "a1aa0c1d-6f7a-47f0-9221-82ed85f1c75e" : '8c8ff66d-5bc4-4a9d-b31e-32c8f4e77b56',
                'desired_work_at_home_id':values.desired_work_at_home_id === true ? "5b70848b-9f60-4a33-b146-9f95a34e07cf" : "1b12ed22-d93a-4a8f-8f8d-143535e8f93d",
                'nationwide':values.nationwide===true ? 1 : 0,
                'postalcode':"",
                'max_distance':0,
                'ambitions_id':"9f8a38f4-5ba2-4e55-b6c3-8d9cb8ec3206",
                'plz_at_job_location':values.plz_at_job_location ? values.plz_at_job_location : '',
                'language_id':values.language_id,
                'foreign_language_id':values.foreign_language_id,
                'driver_license_id':values.driver_license_id
            }
            new APIClient().create('job_search_profile',datapost).then(val=>{
                if(val.job_search_profile_id){
                    //alert(val.job_search_profile_id)
                    //form.resetFields();
                    window.location.assign('/dashboard');
                    const selectedOption = professions.find((option) => option.value === values.category);
                    //console.log(selectedOption);
                    console.log({
                        'job_search_profile_id':val.job_search_profile_id,
                        'job_id':values.job ? values.job :0,
                        'job_decription':values.job_decription ? values.job_decription  : '',
                        'category':selectedOption.label,
                        'requested':0,
                        'messages':0
                    });
                }
                    
            });
        }
         
       
    };
    
    const filterOption = (input, option) =>
  (option?.label ?? '').toLowerCase().includes(input.toLowerCase());

    useEffect(() => {

        if(loadlang){
            new APIClient().get('driver_licenses').then(res=>{
                if(res){
                    const driver_licensesData = res.map((item) => ({
                        label: item.driver_license,
                        value: item.driver_license_id
                      }));
                      setdriver_licenses(driver_licensesData);
                }                    
            });
            new APIClient().get('professions').then(res=>{
                if(res){
                    const professionsData = res.map((item) => ({
                        label: item.profession,
                        value: item.profession_id
                      }));
                    setprofessions(professionsData);
                    
                } 
            });
            new APIClient().get('languages').then(res=>{
                if(res){
                    const languagesData = res.map((item) => ({
                        label: item.language,
                        value: item.language_id
                      }));
                    setlang(languagesData);
                    
                    setforeign_language(languagesData);
                    
                } 
            });
            
            new APIClient().get('https://api.topazvn.vn/tmp/job.php?lng=en').then(res=>{
                if(res){
                    const jobsData = res.map((item) => ({
                        label: item.name,
                        value: item.id
                      }));
                    setjobs(jobsData);
                } 
            });
            setloadlang(false);
        }
        
        
        
            
    },[loadlang]);

        if(props.action === 'edit'){
            //console.log(props.job_search_profile_id);
            new APIClient().get('job_search_profile/'+props.job_search_profile_id).then(res=>{
                form.setFieldsValue({
                    job_decription: res.job_decription,
                    job: res.job_id,
                    category:res.profession.profession_id,
                    plz_at_job_location:res.plz_at_job_location,
                    desired_work_at_weekend_id:res.desired_work_at_weekend.value,
                    desired_work_at_night_id:res.desired_work_at_night.value,
                    desired_work_at_home_id:res.desired_work_at_home.value ,
                    nationwide:res.nationwide,
                    desired_weekly_hours:res.desired_weekly_hours,
                    language_id:res.language.language_id,
                    foreign_language_id:res.foreign_language_id,
                    driver_license_id:res.driver_license.driver_license
                })
               
                
            })
            
        }

        document.title = "ADD NEW JOBS | WEWANTU"
        return (
            <React.Fragment>
                
                
                <div className="main_job">
                    <div className='row g-3'>
                    <span className="title">{props.action === 'edit' ? 'EDIT JOB' : 'ADD NEW JOB'}</span>
                    </div>
                    <Form
                        id="add_job"
                        form={form}
                        onFinish={onFinish} 
                    >
                        <div className="row g-3">
                            <div className="col-md-5">
                                <Form.Item name="job_decription" rules={[{
                                    required: false,
                                    message: 'Enter proper job_decription.',
                                }]}>
                                    <Input className="form-control" placeholder={t('job_decription').toUpperCase()}/>
                                </Form.Item>
                            </div>
                            <div className="col-md-1"></div>
                            <div className="col-md-3">
                                <Form.Item name="job" rules={[{
                                    required: false,
                                    message: 'Enter proper job_decription.',
                                }]}>
                                    <Input className="form-control" placeholder={t('jobid').toUpperCase()}/>
                                </Form.Item>
                            </div>
                            <div className="col-md-3">
                                <Form.Item name="category" rules={[{
                                    required: true,
                                    message: 'Enter proper category.',
                                }]}>
                                    <Select
                                            showSearch
                                            id="category"
                                            name="category"
                                            className="form-control"
                                            placeholder={t('category').toUpperCase()}
                                            options={professions}
                                    />
                                </Form.Item>

                                
                            </div>
                        </div>
                        <div className="row g-3">
                            <div className="col-md-5">  
                                <Form.Item name="job" rules={[{
                                    required: true,
                                    message: 'Enter proper job.',
                                }]}>
                                    <Select
                                       showSearch
                                       id="job"
                                        name="job"
                                        className="form-control"
                                        //placeholder={t('job').toUpperCase()}
                                        placeholder="JOBS"
                                        filterOption={filterOption}
                                        
                                        options={jobs}
                                    />
                                </Form.Item>  
                            </div>
                            <div className="col-md-1"></div>
                            <div className="col-md-3">
                                <Form.Item name="language_id" rules={[{
                                    required: false,
                                    message: 'Enter proper language_id.',
                                }]}>
                                    <Select
                                      
                                       id="language_id"
                                        className="form-control"
                                        placeholder={t('language_id').toUpperCase()}
                                       
                                        options={lang}
                                    />
                                </Form.Item>  
                            </div>
                            <div className="col-md-3">
                                <Form.Item name="foreign_language_id" rules={[{
                                    required: false,
                                    message: 'Enter proper foreign_language_id.',
                                }]}>
                                    <Select
                                      
                                       id="foreign_language_id"
                                        className="form-control"
                                        placeholder={t('foreign_language_id').toUpperCase()}
                                        
                                        options={foreign_language}
                                    />
                                       
                                </Form.Item>  
                            </div>
                        </div>
                        
                        <div className="row g-3">
                            <div className="col-md-3">
                                <Form.Item name="plz_at_job_location" rules={[{
                                    required: false,
                                    message: 'Enter proper plz.',
                                }]}>
                                    <Input className="form-control" placeholder={t('plz_at_job_location').toUpperCase()}/>
                                </Form.Item>
                            </div>
                            <div className="col-md-2">
                                <Form.Item name="desired_weekly_hours" rules={[{
                                    required: false,
                                    message: 'Enter proper desired_weekly_hours.',
                                }]}>
                                    <Select
                                      
                                       id="desired_weekly_hours"
                                        name="desired_weekly_hours"
                                        className="form-control"
                                        placeholder={t('desired_weekly_hours').toUpperCase()}
                                    >
                                    <option selected disabled value="">HOURS PER WEEK</option>
                                    <option value='15'>0-15</option>
                                    <option value='21'>16-20</option>
                                    <option value='30'>21-30</option>
                                    <option value='999'>Vollzeit</option>
                                    </Select>
                                       
                                </Form.Item>  
                                
                            </div>
                            <div className="col-md-1"></div>
                            <div className="col-md-3">
                                <Form.Item name="driver_license_id" rules={[{
                                    required: false,
                                    message: 'Enter proper driver_license.',
                                }]}>
                                    <Select
                                      
                                       id="driver_license_id"
                                        className="form-control"
                                        placeholder={t('driver_license_id').toUpperCase()}
                                        //placeholder="JOBS"
                                       // filterOption={filterOption}
                                        onChange={(value) => {
                                          //  setforeign_language(value)
                                          }} 
                                        options={driver_licenses}
                                    />
                                       
                                </Form.Item>
                            </div>
                        </div>
                        <div className="row g-3">
                            <div className="col-md-3">
                                <div className="form-check">
                                <Form.Item name="desired_work_at_weekend_id" valuePropName="checked" noStyle>
                                    <Checkbox>{t('desired_work_at_weekend_id').toUpperCase()}</Checkbox>
                                </Form.Item>
                                    
                                </div>
                                <div className="form-check">
                                <Form.Item name="desired_work_at_night_id" valuePropName="checked" noStyle>
                                    <Checkbox>{t('desired_work_at_night_id').toUpperCase()}</Checkbox>
                                </Form.Item>
                                </div>
                            </div>
                            <div className="col-md-3">
                                <div className="form-check">
                                <Form.Item name="nationwide" valuePropName="checked" noStyle>
                                    <Checkbox>{t('nationwide').toUpperCase()}</Checkbox>
                                </Form.Item>
                                </div>
                                <div className="form-check">
                                <Form.Item name="desired_work_at_home_id" valuePropName="checked" noStyle>
                                    <Checkbox> {t('desired_work_at_home_id').toUpperCase()}</Checkbox>
                                </Form.Item>
                                </div>
                            </div>
                            
                        </div>

                        <div className="row g-3">
                            <div className="col-md-6"></div>
                            <div className="col-md-6">
                                <div className="d-grid gap-2 login">
                                    <button className="btn btn-primary form-control" id="addsearch" type="submit">{props.action === 'edit' ? 'EDIT & SEARCH' : 'ADD & SEARCH'}</button>
                                </div>
                                <span className=''>Based on this search, a job will cost lead X credits</span>
                            </div>
                        </div>
                    </Form>
                </div>
            </React.Fragment>
        );
    }



export default AddJob;