import React, { useState } from 'react';
import { Form, Select, Input, Checkbox, Radio } from "antd";
import { getLoggedInUser, getProfessions, getdriver_licenses, getlanguages, getforeign_language, getjob } from '../../../helpers/authUtils';

import { useTranslation } from 'react-i18next';
import { APIClient } from '../../../helpers/apiClient';
import { toast } from 'react-toastify';

const AddJob = (props) => {

    const { t } = useTranslation();
    const admin = getLoggedInUser()[0];
    const [form] = Form.useForm();
    const professions = getProfessions();
    const driver_licenses = getdriver_licenses();
    const lang = getlanguages();
    const foreign_language = getforeign_language();
    const jobs = getjob();
    const toggleTab = tab => {
        //this.props.setActiveTab(tab)
    }
    // const [workAtWeekend, setWorkAtWeekend] = useState(false);
    // const [workAtHome, setWorkAtHome] = useState(false);
    // const [workAtNight, setWorkAtNight] = useState(false);

    const onFinish = (values) => {
        let datapost = {};

        if (props.action === 'edit') {
            //console.log(values);
            datapost = {
                'job_search_profile_id': props.job_search_profile_id,
                'user_id': admin.user_id,
                'job_id': values.job ? values.job : 0,
                'job_decription': values.job_decription ? values.job_decription : '',
                'profession_id': values.category,
                // 'driver_license_id': values.driver_license_id ? values.driver_license_id : '',
                'foreign_job_id': values.foreign_job_id,
                'language_id': values.language_id,
                'foreign_language_id': values.foreign_language_id ? values.foreign_language_id : '',
                'plz_at_job_location': values.plz_at_job_location ? values.plz_at_job_location : '',
                'nationwide': values.nationwide === true ? 1 : 0,
                'desired_work_at_weekend_id': values.desired_work_at_weekend_id,
                'desired_work_at_night_id': values.desired_work_at_night_id,
                'desired_work_at_home_id': values.desired_work_at_home_id
            }
            if (values.driver_license_id){
                datapost.driver_license_id = values.driver_license_id;
            }
            //console.log(professions);
            new APIClient().put('job_search_profile', datapost)
                .then(val => {
                    let selectedOptionEdit = professions !== null && professions.find((option) => option.profession_id === datapost.profession_id);
                    props.updateRowEdit({
                        'job_search_profile_id': props.job_search_profile_id,
                        'job_id': values.job ? values.job : 0,
                        'job_decription': values.job_decription ? values.job_decription : '',
                        'profession': selectedOptionEdit.profession
                    });
                    let newRow = values;
                    props.AddRow(newRow)
                    props.setIsModalOpen(false)
                    toast.success("Update successfully")
                    
                    
                    form.resetFields();

                })
        }
        else {

            datapost = {
                'user_id': admin.user_id,
                'job_id': values.job ? values.job : 0,
                'job_decription': values.job_decription ? values.job_decription : '',
                'profession_id': values.category,
                'desired_salary': 0,
                'desired_weekly_hours': values.desired_weekly_hours ? values.desired_weekly_hours : 0,
                'desired_working_days_per_week': 0,
                'desired_holiday_days_per_year': 0,
                'desired_work_at_weekend_id': (values.desired_work_at_weekend_id != undefined) ? values.desired_work_at_weekend_id : '8027208b-18b2-11ef-b340-0050561eb45d',
                'desired_work_at_night_id': (values.desired_work_at_night_id != undefined) ? values.desired_work_at_night_id : '17a4e416-18b6-11ef-b340-0050561eb45d',
                'desired_work_at_home_id': (values.desired_work_at_home_id != undefined) ? values.desired_work_at_home_id : '210a717d-18b6-11ef-b340-0050561eb45d',
                'nationwide': values.nationwide === true ? 1 : 0,
                'postalcode': "",
                'max_distance': 0,
                'ambitions_id': "9f8a38f4-5ba2-4e55-b6c3-8d9cb8ec3206",
                'plz_at_job_location': values.plz_at_job_location ? values.plz_at_job_location : '',
                'language_id': values.language_id,
                'foreign_language_id': values.foreign_language_id,
                'driver_license_id': values.driver_license_id,
                'foreign_job_id': values.foreign_job_id
            }
            new APIClient().create('job_search_profile', datapost).then(val => {
                if (val.job_search_profile_id) {
                    let selectedOptionEdit = professions !== null && professions.find((option) => option.profession_id === datapost.profession_id);
                    let newRow = values
                    props.AddRow(newRow)
                    toast.success("Created successfully")
                    form.resetFields();
                }

            });

        }


    };

    const filterOption = (input, option) =>
        (option?.label ?? '').toLowerCase().includes(input.toLowerCase());

    if (props.action === 'edit') {
        //console.log(props.job_search_profile_id);
        new APIClient().get('job_search_profile/' + props.job_search_profile_id).then(res => {

            form.setFieldsValue({
                job_decription: res.job_decription,
                job: res.job_id,
                category: res.profession.profession_id,
                plz_at_job_location: res.plz_at_job_location,
                desired_work_at_weekend_id: res.desired_work_at_weekend.desired_work_at_weekend_id,
                desired_work_at_night_id: res.desired_work_at_night.desired_work_at_night_id,
                desired_work_at_home_id: res.desired_work_at_home.desired_work_at_home_id,
                nationwide: res.nationwide,
                desired_weekly_hours: res.desired_weekly_hours,
                language_id: res.language.language_id,
                foreign_language_id: res.foreign_language_id,
                driver_license_id: res.driver_license.driver_license_id,
                foreign_job_id: res.foreign_job_id
            })


        })

    }
    else {
        form.setFieldValue({
            desired_work_at_weekend_id: "f7199f2f-bb8e-47e7-9e19-72c75ff8f88f",
            desired_work_at_night_id: "8c8ff66d-5bc4-4a9d-b31e-32c8f4e77b56",
            desired_work_at_home_id: "1b12ed22-d93a-4a8f-8f8d-143535e8f93d",
        })
    }

    // const hanleChecked = (type) => (e) => {
    //     if (type == "weekend")
    //         setWorkAtWeekend(e.target.checked);
    //     else if (type == "night")
    //         setWorkAtNight(e.target.checked);
    //     else
    //         setWorkAtHome(e.target.checked);
    // }

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
                                required: true,
                                message: 'Enter proper job_decription.',
                            }]}>
                                <Input className="form-control" placeholder={t('t_job_decription').toUpperCase()} />
                            </Form.Item>
                        </div>
                        <div className="col-md-1"></div>
                        <div className="col-md-3">
                            <Form.Item name="foreign_job_id" rules={[{
                                required: true,
                                message: 'Enter proper foreign_job_id.',
                            }]}>
                                <Input className="form-control" placeholder={t('t_foreign_job_id').toUpperCase()} />
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
                                    placeholder={t('t_category').toUpperCase()}
                                    options={professions !== null && professions.map((item) => ({
                                        label: item.profession,
                                        value: item.profession_id
                                    }))}
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
                                    placeholder={t('t_jobs').toUpperCase()}
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
                                    placeholder={t('t_language_id').toUpperCase()}
                                    value={form.language_id}
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
                                    placeholder={t('t_driver_license_id').toUpperCase()}
                                    onChange={(value) => {
                                    }}
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
                                <Input className="form-control" placeholder={t('plz_at_job_location').toUpperCase()} />
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
                                    placeholder={t('t_desired_weekly_hours').toUpperCase()}
                                >
                                    <option selected disabled value="">{t('t_hours_per_week')}</option>
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
                                    placeholder={t('t_driver_license_id').toUpperCase()}
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
                        <div className='row'>
                            <div className='col-md-4'>
                                <div className="form-check">
                                    {t('t_desired_work_at_weekend_id').toUpperCase()}
                                </div>
                            </div>
                            <div className='col-md-5'>
                                <Form.Item name='desired_work_at_weekend_id'>
                                    <Radio.Group defaultValue={"8027208b-18b2-11ef-b340-0050561eb45d"}>
                                        <Radio value={"8027208b-18b2-11ef-b340-0050561eb45d"}>{t("no_mater")}</Radio>
                                        <Radio value={"d8e813ff-02c2-43a7-a26f-4fc0125ec16f"}>{t("yes")}</Radio>
                                        <Radio value={"f7199f2f-bb8e-47e7-9e19-72c75ff8f88f"}>{t("no")}</Radio>
                                        <Radio value={"82374a65-d496-41f0-9a0d-cd47f152c9a7"}>{t("maybe")}</Radio>
                                    </Radio.Group>
                                </Form.Item>
                            </div>
                        </div>
                        <div className='row'>
                            <div className='col-md-4'>
                                <div className="form-check">
                                    {t('t_desired_work_at_night_id').toUpperCase()}
                                </div>
                            </div>
                            <div className='col-md-5'>
                                <Form.Item name='desired_work_at_night_id'>
                                    <Radio.Group name="desired_work_at_night_id" defaultValue={"17a4e416-18b6-11ef-b340-0050561eb45d"}>
                                        <Radio value={"17a4e416-18b6-11ef-b340-0050561eb45d"}>{t("no_mater")}</Radio>
                                        <Radio value={"a1aa0c1d-6f7a-47f0-9221-82ed85f1c75e"}>{t("yes")}</Radio>
                                        <Radio value={"8c8ff66d-5bc4-4a9d-b31e-32c8f4e77b56"}>{t("no")}</Radio>
                                        <Radio value={"57c30192-3d8a-47cd-9b3b-b7df812d898b"}>{t("maybe")}</Radio>
                                    </Radio.Group>
                                </Form.Item>
                            </div>
                        </div>
                        <div className='row'>
                            <div className='col-md-4'>
                                <div className="form-check">
                                    {t('t_desired_work_at_home_id').toUpperCase()}
                                </div>
                            </div>
                            <div className='col-md-5'>
                                <Form.Item name='desired_work_at_home_id'>
                                    <Radio.Group defaultValue={"210a717d-18b6-11ef-b340-0050561eb45d"}>
                                        <Radio value={"210a717d-18b6-11ef-b340-0050561eb45d"}>{t("no_mater")}</Radio>
                                        <Radio value={"5b70848b-9f60-4a33-b146-9f95a34e07cf"}>{t("yes")}</Radio>
                                        <Radio value={"1b12ed22-d93a-4a8f-8f8d-143535e8f93d"}>{t("no")}</Radio>
                                        <Radio value={"fb6be5ac-679b-4cf9-889f-7be7486e2f61"}>{t("maybe")}</Radio>
                                    </Radio.Group>
                                </Form.Item>

                            </div>
                        </div>
                        <div className='row'>
                            <div className='col-md-5'>
                                <div className="form-check">
                                    <Form.Item name="nationwide" valuePropName="checked" noStyle>
                                        <Checkbox>{t('t_nationwide').toUpperCase()}</Checkbox>
                                    </Form.Item>
                                </div>
                            </div>
                        </div>

                    </div>

                    <div className="row g-3">
                        <div className="col-md-6"></div>
                        <div className="col-md-6">
                            <div className="d-grid gap-2 login">
                                <button className="btn btn-primary form-control" id="addsearch" type="submit">{props.action === 'edit' ? t('edit_&_search').toUpperCase() : t('add_&_search').toUpperCase()}</button>
                            </div>
                            <span className=''>{t('t_based_on_this_search_a_job_will_cost_lead_x_credits')}</span>
                        </div>
                    </div>
                </Form>
            </div>
        </React.Fragment>
    );
}



export default AddJob;