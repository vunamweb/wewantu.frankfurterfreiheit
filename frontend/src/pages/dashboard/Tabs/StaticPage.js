import { useEffect, useState } from "react";
import { APIClient } from "../../../helpers/apiClient";
import { connect } from "react-redux";


function StaticPage(props) {
    const pageName = props.pageName;
    const [content, setContent] = useState(null);
    //https://platform.wewantu.com/CMS/de/impressum/
    useEffect(() => {
        new APIClient().get("static-page/"+pageName).then((res) => {
            console.log(res);
            setContent(res.data);
        })
    }, [props.activeTab]);

    return (
        <>
            <div>
                <div dangerouslySetInnerHTML={{ __html: content }} />
            </div>
        </>
    )
}
const mapStateToProps = (state) => {
    const { activeTab} = state.Layout;
    return { activeTab };
};
export default connect(mapStateToProps,{})(StaticPage);