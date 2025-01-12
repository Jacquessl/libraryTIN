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
import {RegisterForm} from "./Components/RegisterForm";
import {BookCopyAvailable} from "./Components/BookCopyAvailable";
import {Users} from "./Components/Users";
import {Reservations} from "./Components/Reservations";
import {Loans} from "./Components/Loans";
import {AddUserByEmployee} from "./Components/AddUserByEmployee";
import {ReservationHistory} from "./Components/ReservationHistory";
import {LoanHistory} from "./Components/LoanHistory";

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
                  <Route path="/register" element={<RegisterForm/>}/>
                  <Route path="/bookCopy/available/:id" element={<BookCopyAvailable/>}/>
                  <Route path="/users" element={<Users/>}/>
                  <Route path="/reservations" element={<Reservations/>}/>
                  <Route path="/loans" element={<Loans/>}/>
                  <Route path="/addUser" element={<AddUserByEmployee/>}/>
                  <Route path="/reservationHistory" element={<ReservationHistory/>}/>
                  <Route path="/loanHistory" element={<LoanHistory/>}/>
                </Routes>
              <Footer/>
            </BrowserRouter>
          </AuthProvider>
      </LangugeProvider>
  );
}

export default App;
