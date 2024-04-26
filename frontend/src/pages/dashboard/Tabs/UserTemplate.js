import React,{useEffect,useState}  from 'react';
import UserTemplateTable from '../Tables/UserTemplateTable';

import { useTranslation } from 'react-i18next';
import { APIClient } from '../../../helpers/apiClient';
const UserTemplate = (props) => {

    const { t } = useTranslation();
    const [loadlang, setloadlang] = useState(true);
    const [UserTemplateData, setUserTemplateData] = useState([]);
    useEffect(() => {
        new APIClient().get('professions').then(res=>{
            if(res){
                //const professionsData = res.map((item) => ({
                //    label: item.profession,
                //    value: item.profession_id
                //  }));
                //setprofessions(professionsData);
                //localStorage.setItem('professions',JSON.stringify(res));
                //console.log(JSON.parse(localStorage.professions))
                setUserTemplateData(res);
                setloadlang(false)
            } 
        });
    },[loadlang])

    return (
        <>
        <React.Fragment>
            <div className="main_job">
                <div className='row g-3'>
                    <span className="title">{t('t_user_template').toUpperCase()} </span>
                </div>
                <div className="table-responsive" data-mdb-perfect-scrollbar="false" style={{position:'relative',height:'600px'}}>
                
                    <UserTemplateTable UserTemplateData={UserTemplateData} />
                </div>
            </div>
        </React.Fragment>
        
        
        
        </>
        
    );
    }
export default UserTemplate;