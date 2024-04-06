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
                <strong>{t("success").toUpperCase()} !</strong> {t("email_successful").toUpperCase()}.
            </div>
            <Footer />
        </React.Fragment>
    );
}

export default Activatedmail;