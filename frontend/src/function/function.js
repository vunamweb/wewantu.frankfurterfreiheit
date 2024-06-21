import { Select } from 'antd';
import { t } from 'i18next';
import Watchlist from '../pages/dashboard/Tabs/Watchlist';
import { getLoggedInUser, getAllUser } from '../helpers/authUtils';

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

    HeaderJobPfofile = (professions, onChange) => {
        let header = (<tr>
            <th>{t('t_job_id').toUpperCase()}</th>
            <th>{t('t_job_description').toUpperCase()}</th>
            <th>{
                <Select
                    showSearch
                    id="category"
                    name="category"
                    className="form-control searchcenterselect title"
                    placeholder={t('t_category').toUpperCase()}
                    onChange={onChange}
                >
                    <Select.Option value="all">{t("t_all").toUpperCase()}</Select.Option>
                    {professions !== null && professions.map((item) => (
                        <Select.Option value={item.profession_id}>{item.profession}</Select.Option>
                    ))}

                </Select>
            }
            </th>
        </tr>);

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
                if (item.is_activate == 1)
                    if (jobListParent == item.job_id || (Array.isArray(jobListParent) && jobListParent.indexOf(item.job_id) !== -1))
                        exist = true;
            })
        } catch (error) {
            console.log(error);
        }

        return exist;
    }

    checkMapJob(search, job, callBack) {
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

            let job_search_profile_id = search.job_search_profile_id;
            let user_id = job.user.user_id;

            if ((!this.intoBlocklList(job_search_profile_id, user_id) || callBack) && this.exist(searchDrive, jobDrive) && this.exist(searchLanguageMother, jobLanguageMother)
                && this.exist(searchLanguageForeign, jobLanguageForeign) && this.existJOBID(seachJobID, jobList))

                check = true;
        } catch (error) {
            console.log(error);
        }

        return check;
    }

    getListUser = (listAllUser, conditionSearch, callBack = false) => {
        let filterSearch = [];

        try {
            listAllUser.map((item, index) => {
                if (this.checkMapJob(conditionSearch, item, callBack))
                    filterSearch.push(item);
            })
        } catch (error) {
            console.log(error);
        }

        return filterSearch;
    }

    addItemIntoWatchList = (item) => {
        let watchlistLocal = localStorage.getItem('watchlist');
        let watchlist;

        try {
            watchlist = JSON.parse(watchlistLocal);
            watchlist.push(item);

            localStorage.setItem('watchlist', JSON.stringify(watchlist));
        } catch (error) {
            console.log(error);
        }

    }

    filterFromBlockList = (filter) => {
        let result = [];

        let watchlistLocal = localStorage.getItem('watchlist');
        let watchlist;

        let checkAdd

        try {
            watchlist = JSON.parse(watchlistLocal);

            filter.map((item, index) => {
                checkAdd = true;

                watchlist.map((item1, index1) => {
                    if (item.user.user_id == item1.user_add_id && item1.job_search_profile_id == null && item1.type == 0)
                        checkAdd = false;
                })

                if (checkAdd)
                    result.push(item);
            })
        } catch (error) {
            console.log(error);
        }

        return result;
    }

    intoBlocklList = (job_search_profile_id, user_id) => {
        const admin = getLoggedInUser()[0];
        let into = false;

        let watchlistLocal = localStorage.getItem('watchlist');
        let watchlist;

        try {
            watchlist = JSON.parse(watchlistLocal);
            watchlist = watchlist.filter(item => item.type == 0);

            watchlist.map((item, index) => {
                if ((item.user_add_id == user_id && item.job_search_profile_id == job_search_profile_id) || (item.user.user_id == admin.user_id && item.job_search_profile_id == null))
                //if ((item.user_add_id == user_id && item.job_search_profile_id == job_search_profile_id))
                  into = true;
            })
        } catch (error) {
            console.log(error);
        }

        return into;
    }

    checkExistUser(jobList, user_id) {
        let position = -1;

        jobList.map((item, index) => {
            if (item.user.user_id == user_id)
                position = index;
        })

        return position;
    }

    mixJobProfile(jobProfileList) {
        let result = [];

        jobProfileList.map((item, index) => {
            // if result is empty
            if (result.length == 0) {
                try {
                    let obj = {};

                    obj.user = item.user;

                    obj.profiles = [];
                    obj.profiles.push(item);
                    delete obj.profiles[0].user;

                    result.push(obj);
                } catch (error) {
                    console.log(error);
                }
            } else { // if ready to have data
                let countResult = result.length;

                try {
                    let position = this.checkExistUser(result, item.user.user_id);
                    // if user is exist 
                    if (position >= 0) {
                        let obj = item;
                        delete obj.user;

                        // add profile for user
                        result[position].profiles.push(obj);
                    } else { // if user not exist
                        let obj = {};

                        obj.user = item.user;

                        obj.profiles = [];
                        obj.profiles.push(item);
                        delete obj.profiles[0].user;

                        result.push(obj);
                    }
                } catch (error) {
                    console.log(error);
                }
            }
        })

        return result;
    }
}

const functions = new Functions();
export default functions;