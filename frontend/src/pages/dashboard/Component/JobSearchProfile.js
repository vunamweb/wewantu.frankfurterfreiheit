import functions from "../../../function/function";
import { getProfessions } from "../../../helpers/authUtils";

function JobSearchProfile({categoryID,onClickJobProfile,onSelect}) {
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

    let listJobProfile = functions.getListJobProfileCurrent(categoryID, listJobProfileAll, onClickJobProfile);
    let headerJobProfile = functions.HeaderJobPfofile(professions,onSelect);

    return (
        <>
            <div class="list_job">
                <table class="table">{headerJobProfile}{listJobProfile}</table>
            </div>
        </>
    );
}

export default JobSearchProfile; 