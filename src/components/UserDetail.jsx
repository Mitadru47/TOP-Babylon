import { useParams } from "react-router-dom";

function UserDetail(){

    const { userid } = useParams();
    return <div>This is the UserDetail Page for User ID: {userid}</div>
}

export default UserDetail;