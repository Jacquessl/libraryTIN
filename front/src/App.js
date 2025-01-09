import './App.css';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import {LangugeProvider} from "./LanguageAppContext";
import {Navbar} from "./Components/Navbar";
import {Footer} from "./Components/Footer";
import {Home} from "./Components/Home";
import {Login} from "./Components/Login";
import {Profile} from "./Components/Profile";
import {AuthProvider} from "./Components/AuthContext";
import {Books} from "./Components/Books";
import {Book} from "./Components/Book";
import {Category} from "./Components/Category";
import {BookCopy} from "./Components/BookCopy";

function App() {
  return (
      <LangugeProvider>
          <AuthProvider>
            <BrowserRouter>
              <Navbar/>
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/login" element={<Login />}/>
                    <Route path="/profile" element={<Profile/>}/>
                    <Route path="/books" element={<Books />}/>
                    <Route path="/categories" element={<Category />}/>
                    <Route path="/book/:id" element={<Book />}/>
                    <Route path="/bookCopy" element={<BookCopy/>}/>
                </Routes>
              <Footer/>
            </BrowserRouter>
          </AuthProvider>
      </LangugeProvider>
  );
}

export default App;
