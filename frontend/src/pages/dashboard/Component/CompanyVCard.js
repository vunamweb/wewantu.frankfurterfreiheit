
import { t } from "i18next"
import { getLoggedInUser, setLoggedInUser } from "../../../helpers/authUtils";
import { useEffect, useState } from "react";
import { Form, Formik, useFormik } from "formik";
import { Input, Label } from "reactstrap";
import * as Yup from 'yup';
import { Upload } from "antd";
import { APIClient } from "../../../helpers/apiClient";
import config from "../../../config";
import { toast } from "react-toastify";


function CompanyVCard(props) {
    const admin = getLoggedInUser()[0];
    const [data, setData] = useState({});
    const [avatar, setAvatar] = useState("");
    const [checkedSameCompanyAddress, setCheckedSameCompanyAddress] = useState(false);
    const urlApiUpload = config.API_URL + "user/changeavatar";

    useEffect(() => {
        if (admin.company_v_card) {
            setData(JSON.parse(admin.company_v_card));
        }
        else {
            setData({
                name1: "",
                name2: "",
                email: "",
                tax_id: "",
                zip_code: "",
                city: "",
                street: "",
                street_no: "",
                invoice_zip_code: "",
                invoice_citty: "",
                invoice_street: "",
                invoice_street_no: "",
                phone_number1: "",
                phone_number2: "",
                number_of_employees: "",
                same_company_address: false,
                description: ""
            });
        }
        if (admin.profilePicture) {
            setAvatar(admin.profilePicture);
        }
        else {
            setAvatar(process.env.PUBLIC_URL + "/img/avatar.png");
        }
    }, []);

    const uploadButton = () => {
        return (
            <div>
                <div style={{ marginTop: 8 }}>Upload</div>
            </div>
        )
    };

    const customRequest = async ({ file }) => {
        const formData = new FormData();
        formData.append('avatar', file);

        try {
            new APIClient().create(urlApiUpload, formData).then(res => {
                setAvatar(config.API_BASE_URL + "/" + res);
                setData({ ...data, logo: avatar });
            });
        } catch (error) {
            toast.error(error);
        }
    };

    const formik = useFormik({

        enableReinitialize: true,

        initialValues: data,
        validationSchema: Yup.object({

        }),
        onSubmit: (values) => {
            handleSubmitForm(values);
        },
    });

    const handleSubmitForm = (values) => {
        // console.log(JSON.stringify(values));
        const dataput = { user_id: admin.user_id, company_v_card: JSON.stringify(values) };
        new APIClient().put(config.API_URL + "user", dataput).then(res => {
            let adminUpd = { ...admin };
            adminUpd.company_v_card = dataput.company_v_card;
            setLoggedInUser([adminUpd]);

            toast.success(t("t_success"));
        });
    }

    const handleChangeFile = (e) => {

    }

    const handleChecked = (e) => {
        setCheckedSameCompanyAddress(!checkedSameCompanyAddress);
        if (!checkedSameCompanyAddress) {
            formik.setFieldValue("invoice_zip_code", formik.values.zip_code);
            formik.setFieldValue("invoice_city", formik.values.city);
            formik.setFieldValue("invoice_street", formik.values.street);
            formik.setFieldValue("invoice_street_no", formik.values.street_no);
        }
    }

    return (
        <>
            <Formik enableReinitialize={true} initialValues={formik.initialValues}>
                <Form
                    id="add_job"
                    onSubmit={(e) => {
                        e.preventDefault();
                        formik.handleSubmit();
                    }}
                >
                    <span>{t("t_company_vcard").toUpperCase()}</span>
                    <div className="row">
                        <div className="col-md-4 content">
                            <div className="col-md-12">
                                <div className="row">
                                    <div className="col-md">
                                        <Input
                                            type="text"
                                            name="name1"
                                            required
                                            className="form-control"
                                            placeholder={t('t_name').toUpperCase()}
                                            onChange={formik.handleChange}
                                            onBlur={formik.handleBlur}
                                            value={formik.values.name1}
                                        />
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-md">
                                        <Input
                                            type="text"
                                            name="nam2"
                                            required
                                            className="form-control"
                                            placeholder={t('t_name').toUpperCase()+" (LINE 2)"} 
                                            onChange={formik.handleChange}
                                            onBlur={formik.handleBlur}
                                            value={formik.values.name2}
                                        />
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-md">
                                        <Input
                                            type="text"
                                            name="tax_id"
                                            required
                                            className="form-control"
                                            placeholder={t('t_tax_id').toUpperCase()}
                                            onChange={formik.handleChange}
                                            onBlur={formik.handleBlur}
                                            value={formik.values.tax_id}
                                        />
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-md">
                                        <Input
                                            type="text"
                                            name="number_of_employees"
                                            className="form-control"
                                            placeholder={t('t_number_of_employees').toUpperCase()}
                                            onChange={formik.handleChange}
                                            onBlur={formik.handleBlur}
                                            value={formik.values.number_of_employees}
                                        />
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-md">
                                        <div className="row">
                                            <span>&nbsp;</span>
                                        </div>
                                        <Input type="textarea"
                                            name="description"
                                            className="form-control"
                                            rows="10"
                                            placeholder={t("t_description").toUpperCase()}
                                            onChange={formik.handleChange}
                                            onBlur={formik.handleBlur}
                                            value={formik.values.description}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-4 content">
                            <div className="col-md-12">

                                <div className="row">
                                    <div className="col-md">
                                        <Input
                                            type="text"
                                            name="zip_code"
                                            required
                                            className="form-control"
                                            placeholder={t('t_zip').toUpperCase()}
                                            onChange={formik.handleChange}
                                            onBlur={formik.handleBlur}
                                            value={formik.values.zip_code}
                                        />

                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-md">
                                        <Input
                                            type="text"
                                            name="city"
                                            required
                                            className="form-control"
                                            placeholder={t('t_city').toUpperCase()}
                                            onChange={formik.handleChange}
                                            onBlur={formik.handleBlur}
                                            value={formik.values.city}
                                        />
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-md">
                                        <Input
                                            type="text"
                                            name="street"
                                            required
                                            className="form-control"
                                            placeholder={t('t_street').toUpperCase()}
                                            onChange={formik.handleChange}
                                            onBlur={formik.handleBlur}
                                            value={formik.values.street}
                                        />
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-md">
                                        <Input
                                            type="text"
                                            required
                                            name="street_no"
                                            className="form-control"
                                            placeholder={t('t_street_no').toUpperCase()}
                                            onChange={formik.handleChange}
                                            onBlur={formik.handleBlur}
                                            value={formik.values.street_no}
                                        />
                                    </div>
                                </div>

                                <div className="row">
                                    <span className="col-md-6">{t("t_invoice_address").toUpperCase()}</span>
                                    <div className="col-md d-flex">
                                        <Input type="checkbox"
                                            checked={checkedSameCompanyAddress}
                                            name="same_company_address"
                                            onChange={handleChecked}
                                            value={formik.values.same_company_address}
                                        />
                                        <span>{t("t_same_company_address")}</span>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-md">
                                        <Input
                                            type="text"
                                            required
                                            name="invoice_zip_code"
                                            className="form-control"
                                            placeholder={t('t_zip').toUpperCase()}
                                            onChange={formik.handleChange}
                                            onBlur={formik.handleBlur}
                                            value={formik.values.invoice_zip_code}
                                        />

                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-md">
                                        <Input
                                            type="text"
                                            required
                                            name="invoice_city"
                                            className="form-control"
                                            placeholder={t('t_city').toUpperCase()}
                                            onChange={formik.handleChange}
                                            onBlur={formik.handleBlur}
                                            value={formik.values.invoice_city}
                                        />
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-md">
                                        <Input
                                            type="text"
                                            required
                                            name="invoice_street"
                                            className="form-control"
                                            placeholder={t('t_street').toUpperCase()}
                                            onChange={formik.handleChange}
                                            onBlur={formik.handleBlur}
                                            value={formik.values.invoice_street}
                                        />
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-md">
                                        <Input
                                            type="text"
                                            required
                                            name="invoice_street_no"
                                            className="form-control"
                                            placeholder={t('t_street_no').toUpperCase()}
                                            onChange={formik.handleChange}
                                            onBlur={formik.handleBlur}
                                            value={formik.values.invoice_street_no}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-4 content">
                            <div className="row">
                                <span>{t("t_logo").toUpperCase()}</span>
                                <Upload
                                    name="avatar"
                                    listType="picture-card"
                                    className="avatar-uploader"
                                    showUploadList={false}
                                    onChange={handleChangeFile}
                                    customRequest={customRequest}
                                >
                                    {avatar ? <img src={avatar} alt="avatar" style={{ width: '100%' }} /> : uploadButton}
                                </Upload>
                                <br />

                            </div>

                            <div className="row">
                                <div className="col-md">
                                    <Input
                                        type="text"
                                        name="phone_number1"
                                        required
                                        className="form-control"
                                        placeholder={t('t_phone').toUpperCase()}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        value={formik.values.phone_number1}
                                    />
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-md">
                                    <Input
                                        type="text"
                                        name="phone_number2"
                                        className="form-control"
                                        placeholder={t('t_phone').toUpperCase()+' (LINE 2)'}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        value={formik.values.phone_number2}
                                    />
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-md">
                                    <Input
                                        type="text"
                                        name="email"
                                        className="form-control"
                                        placeholder={t('t_mail').toUpperCase()}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        value={formik.values.email}
                                    />
                                </div>
                            </div>
                            <div className="row">
                                
                                <div className="col-md">
                                    <button type="submit" className="btn btn-primary form-control btn-sm">{t('save').toUpperCase()}</button>
                                </div>
                            </div>
                        </div>
                    </div>

                </Form>
            </Formik>
        </>
    )
}

export default CompanyVCard;