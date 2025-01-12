import {useLocation, useNavigate, useParams} from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { LanguageContext } from "../LanguageAppContext";
import { AuthContext } from "./AuthContext";
import {fetchAddBook, fetchBookById, fetchEditBook} from "../Service/BookService";
import { fetchAuthors } from "../Service/AuthorService";
import { fetchCategories } from "../Service/CategoriesService";
import "./bookAddStyle.css";

export const AddOrEditBook = () => {
    const { id } = useParams();
    const { translate } = useContext(LanguageContext);
    const { logout, isEmployee } = useContext(AuthContext);

    const [formData, setFormData] = useState({
        title: "",
        publishedYear: "",
        isbn: "",
        authorsIds: [],
        categoryId: "",
    });
    const [authors, setAuthors] = useState([]);
    const [categories, setCategories] = useState([]);
    const [errors, setErrors] = useState({});
    const location = useLocation();
    const book = location.state?.book;
    const [isEdit, setIsEdit] = useState(false);
    const navigate = useNavigate();
    useEffect(() => {
        if(!isEmployee){
            navigate("/");
        }
        async function fetchData() {
            try {
                let fetchedBook = null;
                if(book) {

                    setIsEdit(true);
                    fetchedBook = book;
                }else{
                    fetchedBook = {};
                    fetchedBook.title = "";
                    fetchedBook.authors = [];
                    fetchedBook.publishedYear = new Date().getFullYear();
                    fetchedBook.isbn = "";
                }

                const token = localStorage.getItem("token");
                const fetchedAuthors = await fetchAuthors(token);
                const fetchedCategories = await fetchCategories(token);

                setAuthors(fetchedAuthors);
                setCategories(fetchedCategories);

                const bookAuthorIds = fetchedAuthors
                    .filter(author => fetchedBook.authors.includes(`${author.firstName} ${author.lastName}`))
                    .map(author => author.id);

                setFormData({
                    title: fetchedBook.title,
                    publishedYear: fetchedBook.publishedYear,
                    isbn: fetchedBook.isbn,
                    authorsIds: bookAuthorIds,
                    categoryId: fetchedCategories.find(cat => cat.name === fetchedBook.category)?.id || "",
                });

            } catch (error) {
                console.error(error);
            }
        }
        fetchData();
    }, [id]);

    const validateISBN = (isbn) => {
        return /^(?:\d{3}-\d{9}[\dX]|\d{9}[\dX]|\d{13})$/.test(isbn);
    };

    const validateForm = () => {
        let newErrors = {};

        if (!formData.title.trim()) {
            newErrors.title = "titleError";
            // newErrors.title = "Tytuł nie może być pusty.";
        }

        const currentYear = new Date().getFullYear();
        if (!formData.publishedYear || formData.publishedYear < 1000 || formData.publishedYear > currentYear) {
            newErrors.publishedYear = "publishedYearError";
            // newErrors.publishedYear = "Niepoprawny rok publikacji.";
        }

        if (!validateISBN(formData.isbn)) {
            newErrors.isbn = "isbnError";
            // newErrors.isbn = "Niepoprawny format ISBN (np. 978-3-16-148410-0).";
        }

        if (!formData.categoryId) {
            // newErrors.category = "Wybierz kategorię.";
            newErrors.category = "categoryError"; //todo translations
        }
        if (formData.authorsIds.length < 1){
            newErrors.authorsIds = "authorsIds";
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    const handleAuthorSelection = (authorId) => {
        setFormData((prevState) => {
            const isSelected = prevState.authorsIds.includes(authorId);
            return {
                ...prevState,
                authorsIds: isSelected
                    ? prevState.authorsIds.filter((id) => id !== authorId)
                    : [...prevState.authorsIds, authorId],
            };
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (validateForm()) {
            const requestData = {
                title: formData.title,
                publishedYear: formData.publishedYear,
                isbn: formData.isbn,
                categoryId: formData.categoryId,
                authorsIds: formData.authorsIds,
            };
            const token = localStorage.getItem("token");
            if (isEdit){
                fetchEditBook(token, requestData, book.id).then(res=>{
                    if(res==="problem"){
                        let newErrors = {};
                        newErrors.isbn = "isbnRepeatError"
                        setErrors(newErrors);
                    }else{
                        navigate("/books")
                    }
                })
            }else{
                fetchAddBook(token, requestData).then(res=>{
                    if(res==="problem"){
                        let newErrors = {};
                        newErrors.isbn = "isbnRepeatError"
                        setErrors(newErrors);
                    }else{
                        navigate("/books")
                    }
                })
            }
        }
    };

    return (
<div>            {isEmployee &&

    <div className="book">
            <form onSubmit={handleSubmit} noValidate>
                <label>
                    {translate("title")}:
                    <input
                        type="text"
                        name="title"
                        value={formData.title}
                        onChange={handleInputChange}
                    />
                    {errors.title && <span className="error">{errors.title}</span>}
                </label>

                <label>
                    {translate("publishedYear")}:
                    <input
                        type="number"
                        name="publishedYear"
                        value={formData.publishedYear}
                        onChange={handleInputChange}
                    />
                    {errors.publishedYear && <span className="error">{errors.publishedYear}</span>}
                </label>

                <label>
                    {translate("category")}:
                    <select name="categoryId" value={formData.categoryId} onChange={handleInputChange}>
                        <option value="">{translate("chooseCategory")}</option>
                        {categories.map((category) => (
                            <option key={category.id} value={category.id}>
                                {category.name}
                            </option>
                        ))}
                    </select>
                    {errors.category && <span className="error">{errors.category}</span>}
                </label>

                <label>
                    ISBN:
                    <input
                        type="text"
                        name="isbn"
                        value={formData.isbn}
                        onChange={handleInputChange}
                    />
                    {errors.isbn && <span className="error">{errors.isbn}</span>}
                </label>

                <fieldset>
                    <legend>{translate("authors")}:</legend>
                    {authors.map((author) => (
                        <label key={author.id}>
                            <input
                                type="checkbox"
                                checked={formData.authorsIds.includes(author.id)}
                                onChange={() => handleAuthorSelection(author.id)}
                            />
                            {author.firstName} {author.lastName}
                        </label>
                    ))}
                </fieldset>
                {errors.authorsIds && <span className="error">{errors.authorsIds}</span>}

                <button type="submit">Zapisz zmiany</button>
            </form>
    </div>
            }
        </div>

    );
};
