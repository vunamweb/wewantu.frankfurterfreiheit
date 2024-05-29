import functions from "../../../function/function";

function JobSearchProfile({categoryID,onClickJobProfile}) {
    let listJobProfileAll = localStorage.getItem('job_search_profiles_all');
    let listJobProfileUser = localStorage.getItem("job_search_profile");

    try {
        listJobProfileAll = JSON.parse(listJobProfileAll);
        listJobProfileUser = JSON.parse(listJobProfileUser);
        const listJobProfileUserIds = listJobProfileUser.map(item => item.job_search_profile_id);
        listJobProfileAll = listJobProfileAll.filter(item => listJobProfileUserIds.includes(item.job_search_profile_id));
    } catch (error) {
        listJobProfileAll = [];
    }

    let listJobProfile = functions.getListJobProfileCurrent(categoryID, listJobProfileAll, onClickJobProfile);
    let headerJobProfile = functions.HeaderJobPfofile();

    return (
        <>
            <div class="list_job">
                <table class="table">{headerJobProfile}{listJobProfile}</table>
            </div>
        </>
    );
}

export default JobSearchProfile; 