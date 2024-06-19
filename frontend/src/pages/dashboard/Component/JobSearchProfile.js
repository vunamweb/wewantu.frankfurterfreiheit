import functions from "../../../function/function";
import { getProfessions } from "../../../helpers/authUtils";

function JobSearchProfile({ categoryID, onClickJobProfile, onSelect, listJobProfileMobile, watchListFilter, type }) {
    let listJobProfileAll = localStorage.getItem('job_search_profiles_all');
    let listJobProfileUser = localStorage.getItem("job_search_profile");
    const professions = getProfessions();
    try {
        listJobProfileAll = JSON.parse(listJobProfileAll);
        listJobProfileUser = JSON.parse(listJobProfileUser);
        const listJobProfileUserIds = listJobProfileUser.map(item => item.job_search_profile_id);
        listJobProfileAll = listJobProfileAll.filter(item => listJobProfileUserIds.includes(item.job_search_profile_id));
    } catch (error) {
        listJobProfileAll = [];
    }

    if (listJobProfileMobile != undefined) {
        let listJobProfileAllFinal = [];
        let userList, checkExist;

        try {
            listJobProfileAll.map((item, index) => {
                userList = functions.getListUser(listJobProfileMobile, item);
                checkExist = false;

                // if in watchlist
                if (Array.isArray(userList) && userList.length > 0) {
                    // if is searchcenter
                    if (watchListFilter == null)
                        checkExist = true;
                    // if is block or watchlist
                    else {
                        userList = userList.map((item1, index) => item1.user.user_id);

                        watchListFilter.map((item2, index) => {
                            if (userList.includes(item2.user_add_id))
                                checkExist = true;
                        })
                    }
                }
                // end

                if (checkExist)
                    listJobProfileAllFinal.push(item);
            })
        } catch (error) {

        }
        listJobProfileAll = listJobProfileAllFinal;
    }

    let listJobProfile = functions.getListJobProfileCurrent(categoryID, listJobProfileAll, onClickJobProfile);
    let headerJobProfile = functions.HeaderJobPfofile(professions, onSelect);

    return (
        <>
            <div class="list_job">
                <table class="table">{headerJobProfile}{listJobProfile}</table>
            </div>
        </>
    );
}

export default JobSearchProfile; 