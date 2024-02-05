import { useNavigate } from "react-router"}

const Dashboard = ({user}) => {
    const navigate = useNavigate()

    if (!user) {
        navigate('/login');
    }
    return(
        <div>
            <h1>Dashboard</h1>
        </div>
    )

}