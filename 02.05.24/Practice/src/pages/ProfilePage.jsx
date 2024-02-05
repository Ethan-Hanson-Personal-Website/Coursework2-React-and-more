import { useNavigate } from "react-router"

const ProfilePage = ({user}) => {
   // const navigate = useNavigate()
    const {name, email} = user;

    // if (!user) {
    //     navigate('/login');
    // }
    return(
        <div>
            <h1>Welcome: {name}</h1>
            <p>Email: {email}</p>
        </div>
    );

}
export default ProfilePage;