
import { t } from "i18next"
import { getLoggedInUser } from "../../../helpers/authUtils";
import { useEffect, useState } from "react";
import { Form } from "antd";

function CompanyVCard(props) {
    const admin = getLoggedInUser()[0];

    const [avatar, setAvatar] = useState("");

    useEffect(() => {
        if (admin.profilePicture) {
            setAvatar(admin.profilePicture);
        }
        else {
            setAvatar(process.env.PUBLIC_URL + "/img/avatar.png");
        }
    }, []);

    return (
        <>
            <Form
                id="add_job"
                onSubmit={(e) => {
                    e.preventDefault();
                }}
            >
                <span>{t("t_company_vcard").toUpperCase()}</span>
                <div className="row">
                    <div className="col-md-4 content">
                        <div className="col-md-1"></div>
                        <div className="col-md-11">

                            <div className="row">
                                <div className="col-md"><input type="text" id="company" name="company" className="form-control" required placeholder="" onInvalid="this.setCustomValidity('Please enter COMPANY NAME')" oninput="setCustomValidity('')" /></div>
                            </div>
                            <div className="row">
                                <div className="col-md"><input type="text" id="company" name="company" className="form-control" required placeholder="" onInvalid="this.setCustomValidity('Please enter COMPANY NAME')" oninput="setCustomValidity('')" /></div>
                            </div>
                            <div className="row">
                                <div className="col-md"><input type="text" id="company" name="company" className="form-control" required placeholder="" onInvalid="this.setCustomValidity('Please enter COMPANY NAME')" oninput="setCustomValidity('')" /></div>
                            </div>
                            <div className="row">
                                <div className="col-md"><input type="text" id="company" name="company" className="form-control" required placeholder="" onInvalid="this.setCustomValidity('Please enter COMPANY NAME')" oninput="setCustomValidity('')" /></div>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-4 content">
                        <div className="col-md-12">

                            <div className="row">
                                <div className="col-md"><input type="text" id="company" name="company" className="form-control" required placeholder="" onInvalid="this.setCustomValidity('Please enter COMPANY NAME')" oninput="setCustomValidity('')" /></div>
                            </div>
                            <div className="row">
                                <div className="col-md"><input type="text" id="company" name="company" className="form-control" required placeholder="" onInvalid="this.setCustomValidity('Please enter COMPANY NAME')" oninput="setCustomValidity('')" /></div>
                            </div>
                            <div className="row">
                                <div className="col-md"><input type="text" id="company" name="company" className="form-control" required placeholder="" onInvalid="this.setCustomValidity('Please enter COMPANY NAME')" oninput="setCustomValidity('')" /></div>
                            </div>
                            <div className="row">
                                <div className="col-md"><input type="text" id="company" name="company" className="form-control" required placeholder="" onInvalid="this.setCustomValidity('Please enter COMPANY NAME')" oninput="setCustomValidity('')" /></div>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-1"></div>
                    <div className="col-md-3 content">
                        <div className='logo'>
                            <img src={avatar} className="avatar" alt="avatar" /> <br />
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-8">
                        <textarea className="form-control" id="company" rows="10" ></textarea>
                    </div>
                    <div className="col-md-4"></div>
                </div>
            </Form>
        </>
    )
}

export default CompanyVCard;