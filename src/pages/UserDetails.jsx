import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getUserById } from "../services/userService";
import Loader from "../components/Loader";

const UserDetails = () => {
    const { id } = useParams(); // Get the id from the route parameters
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchUserDetail = async () => {
            setLoading(true);
            setError(null);
            try {
                const result = await getUserById(id);
                if (result.success) {
                    setUser(result.data);
                } else {
                    setError(result.message);
                }
            } catch (error) {
                setError('Failed to fetch user details');
            } finally {
                setLoading(false);
            }
        };

        fetchUserDetail();
    }, [id]);

    if (loading) {
        return <Loader />;
    }

    if (error) {
        return <p>Error: {error}</p>;
    }

    return (
        <div className="page-user-details">
            <div className="container">
                {user ? (
                    <>
                        <h1 className="fs-3 mb-3 mb-md-5">{`${user.name.split(' ')[0]}'s`} Details</h1>
                        <div className="row">
                            <div className="col-md-6">
                                <div className="row mb-3 align-items-center">
                                    <div className="col-md-6">
                                        <h2 className="fs-6 mb-md-0">Full Name</h2>
                                    </div>
                                    <div className="col-md-6">
                                        {user.name}
                                    </div>
                                </div>
                                <div className="row mb-3 align-items-center">
                                    <div className="col-md-6">
                                        <h2 className="fs-6 mb-md-0">Email</h2>
                                    </div>
                                    <div className="col-md-6">
                                        {user.email}
                                    </div>
                                </div>
                                <h2 className="fs-6">Books Issued</h2>
                                {
                                    user.issuedBooks.length ?
                                        <>
                                        </>
                                        :
                                        <p>No Books Issued</p>
                                }
                                <h2 className="fs-6">Books Reserved</h2>
                                {
                                    user.reservedBooks.length ?
                                        <>
                                        </>
                                        :
                                        <p>No Books Reserved</p>
                                }
                            </div>
                        </div>
                    </>
                ) : (
                    <p>User not found</p>
                )}
            </div>
        </div>
    );
}

export default UserDetails;