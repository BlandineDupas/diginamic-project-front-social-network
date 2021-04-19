import { useSelector } from "react-redux";

import { selectUser } from "../login/loginSlice";

const Home = () => {
    const user = useSelector(selectUser);

    return (
        <div>
            <h1>Home</h1>
            <p>Connecté en tant que {user.firstname} {user.lastname}</p>
        </div>
    );
};

export default Home;