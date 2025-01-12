//todo do wyjebania

// import { useParams } from "react-router-dom";
// import { useContext, useEffect, useState } from "react";
// import { LanguageContext } from "../LanguageAppContext";
// import { AuthContext } from "./AuthContext";
// import { fetchBookById } from "../Service/BookService";
// import { fetchAuthors } from "../Service/AuthorService";
// import { fetchCategories } from "../Service/CategoriesService";
// import "./bookAddStyle.css";
//
// export const Book = () => {
//     const { id } = useParams();
//     const { translate } = useContext(LanguageContext);
//     const { logout } = useContext(AuthContext);
//
//     const [book, setBook] = useState(null);
//     const [formData, setFormData] = useState({
//         title: "",
//         publishedYear: "",
//         isbn: "",
//         authors: [],
//         category: "",
//     });
//     const [authors, setAuthors] = useState([]);
//     const [categories, setCategories] = useState([]);
//     const [errors, setErrors] = useState({});
//
//     useEffect(() => {
//         async function fetchData() {
//             try {
//                 const fetchedBook = await fetchBookById(id);
//                 if (fetchedBook === "problem") {
//                     logout();
//                     return;
//                 }
//
//                 const token = localStorage.getItem("token");
//                 const fetchedAuthors = await fetchAuthors(token);
//                 const fetchedCategories = await fetchCategories(token);
//
//                 setBook(fetchedBook);
//                 setAuthors(fetchedAuthors);
//                 setCategories(fetchedCategories);
//
//                 // 🔹 Dopasowanie nazwisk autorów do ich ID
//                 const bookAuthorIds = fetchedAuthors
//                     .filter(author => fetchedBook.authors.includes(`${author.firstName} ${author.lastName}`))
//                     .map(author => author.id);
//
//                 setFormData({
//                     title: fetchedBook.title,
//                     publishedYear: fetchedBook.publishedYear,
//                     isbn: fetchedBook.isbn,
//                     authors: bookAuthorIds, // Teraz mamy ID zamiast nazwisk
//                     category: fetchedCategories.find(cat => cat.name === fetchedBook.category)?.id || "", // Pobranie ID kategorii
//                 });
//
//             } catch (error) {
//                 console.error("Błąd pobierania danych:", error);
//             }
//         }
//         fetchData();
//     }, [id]);
//
//     const validateISBN = (isbn) => {
//         return /^(?:\d{3}-\d{9}[\dX]|\d{9}[\dX]|\d{13})$/.test(isbn);
//     };
//
//     const validateForm = () => {
//         let newErrors = {};
//
//         if (!formData.title.trim()) {
//             newErrors.title = "Tytuł nie może być pusty.";
//         }
//
//         const currentYear = new Date().getFullYear();
//         if (!formData.publishedYear || formData.publishedYear < 1000 || formData.publishedYear > currentYear) {
//             newErrors.publishedYear = "Niepoprawny rok publikacji.";
//         }
//
//         if (!validateISBN(formData.isbn)) {
//             newErrors.isbn = "Niepoprawny format ISBN (np. 978-3-16-148410-0).";
//         }
//
//         if (!formData.category) {
//             newErrors.category = "Wybierz kategorię.";
//         }
//
//         setErrors(newErrors);
//         return Object.keys(newErrors).length === 0;
//     };
//
//     const handleInputChange = (e) => {
//         const { name, value } = e.target;
//         setFormData((prevState) => ({
//             ...prevState,
//             [name]: value,
//         }));
//     };
//
//     const handleAuthorSelection = (authorId) => {
//         setFormData((prevState) => {
//             const isSelected = prevState.authors.includes(authorId);
//             return {
//                 ...prevState,
//                 authors: isSelected
//                     ? prevState.authors.filter((id) => id !== authorId)
//                     : [...prevState.authors, authorId],
//             };
//         });
//     };
//
//     const handleSubmit = (e) => {
//         e.preventDefault();
//         if (validateForm()) {
//             const requestData = {
//                 title: formData.title,
//                 publishedYear: formData.publishedYear,
//                 isbn: formData.isbn,
//                 category: formData.category,
//                 authors: formData.authors,
//             };
//             console.log("Zapisane dane:", requestData);
//         }
//     };
//
//     return (
//         <div className="book">
//             {book && (
//                 <form onSubmit={handleSubmit} noValidate>
//                     <label>
//                         {translate("title")}:
//                         <input
//                             type="text"
//                             name="title"
//                             value={formData.title}
//                             onChange={handleInputChange}
//                         />
//                         {errors.title && <span className="error">{errors.title}</span>}
//                     </label>
//
//                     <label>
//                         {translate("publishedYear")}:
//                         <input
//                             type="number"
//                             name="publishedYear"
//                             value={formData.publishedYear}
//                             onChange={handleInputChange}
//                         />
//                         {errors.publishedYear && <span className="error">{errors.publishedYear}</span>}
//                     </label>
//
//                     <label>
//                         {translate("category")}:
//                         <select name="category" value={formData.category} onChange={handleInputChange}>
//                             <option value="">{translate("chooseCategory")}</option>
//                             {categories.map((category) => (
//                                 <option key={category.id} value={category.id}>
//                                     {category.name}
//                                 </option>
//                             ))}
//                         </select>
//                         {errors.category && <span className="error">{errors.category}</span>}
//                     </label>
//
//                     <label>
//                         ISBN:
//                         <input
//                             type="text"
//                             name="isbn"
//                             value={formData.isbn}
//                             onChange={handleInputChange}
//                         />
//                         {errors.isbn && <span className="error">{errors.isbn}</span>}
//                     </label>
//
//                     <fieldset>
//                         <legend>{translate("authors")}:</legend>
//                         {authors.map((author) => (
//                             <label key={author.id}>
//                                 <input
//                                     type="checkbox"
//                                     checked={formData.authors.includes(author.id)}
//                                     onChange={() => handleAuthorSelection(author.id)}
//                                 />
//                                 {author.firstName} {author.lastName}
//                             </label>
//                         ))}
//                     </fieldset>
//
//                     <button type="submit">Zapisz zmiany</button>
//                 </form>
//             )}
//         </div>
//     );
// };
