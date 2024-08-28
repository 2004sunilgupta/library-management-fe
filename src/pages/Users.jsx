import { useEffect, useState } from "react";
import { getUsers } from "../services/userService";
import Loader from "../components/Loader";
import UsersTable from "../components/UsersTable";

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
                <h1 className="fs-3 mb-4">Users</h1>
                <UsersTable users={users} />
            </div>
        </div>
    );
}

export default Users;