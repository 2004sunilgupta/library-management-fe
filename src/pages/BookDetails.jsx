import { useParams } from "react-router-dom";
import { getBookById } from "../services/bookService";
import { useEffect, useState } from "react";
import Loader from "../components/Loader";
import { bookImg } from "../constants/imgConst";

const BookDetails = () => {
    const { id } = useParams(); // Get the id from the route parameters
    const [book, setBook] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchBookDetail = async () => {
            setLoading(true);
            setError(null);
            try {
                const result = await getBookById(id);
                if (result.success) {
                    setBook(result.data);
                } else {
                    setError(result.message);
                }
            } catch (error) {
                setError('Failed to fetch book details');
            } finally {
                setLoading(false);
            }
        };

        fetchBookDetail();
    }, [id]);

    if (loading) {
        return <Loader />;
    }

    if (error) {
        return <p>Error: {error}</p>;
    }

    return (
        <div className="page-book-details">
            <div className="container">
                {book ? (
                    <>
                        <h1 className="fs-3 mb-3 mb-md-5">Book Details</h1>
                        <div className="row">
                            <div className="col-md-6">
                                <figure className="img-holder">
                                    {Object.keys(bookImg).includes(book.imgURL) && <img className="img-fluid" src={bookImg[book.imgURL]} />}
                                </figure>
                            </div>
                            <div className="col-md-6">
                                <div className="row mb-3 align-items-center">
                                    <div className="col-md-6">
                                        <h2 className="fs-6 mb-md-0">Book Name</h2>
                                    </div>
                                    <div className="col-md-6">
                                        {book.title}
                                    </div>
                                </div>
                                <div className="row mb-3 align-items-center">
                                    <div className="col-md-6">
                                        <h2 className="fs-6 mb-md-0">Book Id</h2>
                                    </div>
                                    <div className="col-md-6">
                                        {book.bookId}
                                    </div>
                                </div>
                                <h2 className="fs-6">Book Issued to</h2>
                                {
                                    book.issuedTo ?
                                        <>
                                        </>
                                        :
                                        <p>Not Assingned</p>
                                }
                                <h2 className="fs-6">Book Reserved</h2>
                                {
                                    book.length ?
                                        <>
                                        </>
                                        :
                                        <p>Not Reserved</p>
                                }
                            </div>
                        </div>
                    </>
                ) : (
                    <p>Book not found</p>
                )}
            </div>
        </div>
    );
}

export default BookDetails;