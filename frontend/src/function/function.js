import { t } from 'i18next';

class Functions {
    getListJobProfileCurrent = (category_id, list, callBack) => {
        let result = [];

        try {
            list.map((item, index) => {
                if (item.profession.profession_id == category_id || category_id == "all")
                    result.push(item);
            })
        } catch (error) {
            console.log(error);
        }

        let body = result.map((item, index) => {
            return (
                <tr class="mouse" onClick={() => callBack(item)}><th>{item.job_id}</th><th>{item.job_decription}</th> <th>{item.profession.profession}</th></tr>
            )
        })

        return body;
    }

    HeaderJobPfofile = () => {
        let header = (<tr><th>{t('t_job_id').toUpperCase()}</th><th>{t('t_job_description').toUpperCase()}</th><th>{t('t_category').toUpperCase()}</th></tr>);

        return header;
    }

    exist(parent, child) {
        let exist = false;

        if ((parent == undefined || (Array.isArray(parent) && parent.length == 0)) || (Array.isArray(child) && child.length == 0))
            exist = true;

        try {
            child.map((item, index) => {
                if (parent == undefined || parent.indexOf(item) !== -1)
                    exist = true;
            })
        } catch (error) {
            console.log(error);
        }

        return exist;
    }

    existJOBID(jobListParent, jobListChild) {
        let exist = false;

        try {
            jobListChild.map((item, index) => {
                if(item.is_activate == 1)
                  if (jobListParent == item.job_id || (Array.isArray(jobListParent) && jobListParent.indexOf(item.job_id) !== -1))
                    exist = true;
            })
        } catch (error) {
            console.log(error);
        }

        return exist;
    }

    checkMapJob(search, job) {
        let check = false;

        try {
            let searchDrive = (search.driver_license == undefined) ? search.driver_license_id : search.driver_license.driver_license_id;
            let jobDrive = job.user.drive;

            let searchLanguageMother = (search.language == undefined) ? search.language_id : search.language.language_id;
            let jobLanguageMother = job.user.language.mother;

            let searchLanguageForeign = search.foreign_language_id;
            let jobLanguageForeign = job.user.language.foreign;

            let seachJobID = (search.job_id == undefined) ? search.job : search.job_id;
            let jobList = job.profiles;

            if (this.exist(searchDrive, jobDrive) && this.exist(searchLanguageMother, jobLanguageMother)
                && this.exist(searchLanguageForeign, jobLanguageForeign) && this.existJOBID(seachJobID, jobList))

                check = true;
        } catch (error) {
            console.log(error);
        }

        return check;
    }

    getListUser = (listAllUser, conditionSearch) => {
        let filterSearch = [];

       try {
            listAllUser.map((item, index) => {
                if (this.checkMapJob(conditionSearch, item))
                    filterSearch.push(item);
            })
        } catch (error) {
            console.log(error);
        }

        return filterSearch;
    }
}

const functions = new Functions();
export default functions;