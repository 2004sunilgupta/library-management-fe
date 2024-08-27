import { useEffect, useState } from "react";
import { getUsers } from "../services/userService";
import { NavLink } from "react-router-dom";
import { routerPath } from "../constants/routerConstant";
import Loader from "../components/Loader";

const Users = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchUsers = async () => {
            setLoading(true);
            setError(null); // Reset error state before fetching
            try {
                const result = await getUsers();
                if (result.success) {
                    console.log(result.data);
                    setUsers(result.data);
                } else {
                    setError(result.message);
                }
            } catch (error) {
                setError('Failed to fetch users');
            } finally {
                setLoading(false);
            }
        };

        fetchUsers();
    }, []);

    if (loading) {
        return <Loader/>;
    }

    if (error) {
        return <p>Error: {error}</p>;
    }

    return (
        <div className="page-user">
            <div className="container">
                <h1 className="fs-3">Users</h1>
                <div className="card card-table">
                    <table class="table">
                        <thead>
                            <tr>
                                <th scope="col">#</th>
                                <th scope="col">Name</th>
                                <th scope="col">Email</th>
                                <th scope="col">Details</th>
                            </tr>
                        </thead>
                        <tbody>
                            {users.length ?
                                <>
                                    {
                                        users.map((user, key) => {
                                            return (
                                                <tr key={key}>
                                                    <th scope="row">{key + 1}</th>
                                                    <td>{user.name}</td>
                                                    <td>{user.email}</td>
                                                    <td><NavLink className="btn btn-sm btn-success" to={`${routerPath.USERS}/${user._id}`}>View Details</NavLink></td>
                                                </tr>
                                            );
                                        })
                                    }
                                </>
                                :
                                <tr><td colSpan={4} className="text-center">No Users</td></tr>}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

export default Users;