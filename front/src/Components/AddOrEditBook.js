import {useLocation, useNavigate, useParams} from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { LanguageContext } from "../LanguageAppContext";
import { AuthContext } from "./AuthContext";
import {fetchAddBook, fetchEditBook} from "../Service/BookService";
import { fetchAuthors } from "../Service/AuthorService";
import { fetchCategories } from "../Service/CategoriesService";
import "./styles/bookAddStyle.css";

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
                const fetchedAuthors = await fetchAuthors(token).then(res=>{
                    if(res==="problem"){
                        logout();
                    }else{
                        return res
                    }
                });
                const fetchedCategories = await fetchCategories();

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
        }

        const currentYear = new Date().getFullYear();
        if (!formData.publishedYear || formData.publishedYear < 1000 || formData.publishedYear > currentYear) {
            newErrors.publishedYear = "publishedYearError";
        }

        if (!validateISBN(formData.isbn)) {
            newErrors.isbn = "isbnError";
        }

        if (!formData.categoryId) {
            newErrors.category = "categoryError";
        }
        if (formData.authorsIds.length < 1){
            newErrors.authorsIds = "authorsIdsError";
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
    function capitalizeFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
    }
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
                    {errors.title && <span className="error">{capitalizeFirstLetter(translate(errors.title))}</span>}
                </label>

                <label>
                    {translate("publishedYear")}:
                    <input
                        type="number"
                        name="publishedYear"
                        value={formData.publishedYear}
                        onChange={handleInputChange}
                    />
                    {errors.publishedYear && <span className="error">{capitalizeFirstLetter(translate(errors.publishedYear))}</span>}
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
                    {errors.category && <span className="error">{capitalizeFirstLetter(translate(errors.category))}</span>}
                </label>

                <label>
                    ISBN:
                    <input
                        type="text"
                        name="isbn"
                        value={formData.isbn}
                        onChange={handleInputChange}
                    />
                    {errors.isbn && <span className="error">{capitalizeFirstLetter(translate(errors.isbn))}</span>}
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
                {errors.authorsIds && <span className="error">{capitalizeFirstLetter(translate(errors.authorsIds))}</span>}

                <button type="submit">{capitalizeFirstLetter(translate("saveChanges"))}</button>
            </form>
        <button onClick={() => navigate("/addAuthor")} className="add-author-button">
            {capitalizeFirstLetter(translate("addAuthor"))}
        </button>
    </div>
}
</div>

    );
};
