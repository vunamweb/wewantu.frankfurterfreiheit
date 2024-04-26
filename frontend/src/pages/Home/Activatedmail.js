import React from 'react';
import Footer from "../../layouts/Footer";
import MainMenu from "../../layouts/MainMenu";
import { useTranslation } from "react-i18next";

function Activatedmail(props) {
    const { t } = useTranslation();
    document.title = "Activated Mail | WEWANTU"
    return (
        <React.Fragment>
            <MainMenu />
            <div class="alert alert-success text-center">
                <strong>{t("t_success").toUpperCase()} !</strong> {t("t_email_successful").toUpperCase()}.
            </div>
            <Footer />
        </React.Fragment>
    );
}

export default Activatedmail;