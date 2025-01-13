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
import {Category} from "./Components/Category";
import {BookCopy} from "./Components/BookCopy";
import {BookCopyAvailable} from "./Components/BookCopyAvailable";
import {Users} from "./Components/Users";
import {Reservations} from "./Components/Reservations";
import {Loans} from "./Components/Loans";
import {AddUserByEmployee} from "./Components/AddUserByEmployee";
import {ReservationHistory} from "./Components/ReservationHistory";
import {LoanHistory} from "./Components/LoanHistory";
import {AddOrEditBook} from "./Components/AddOrEditBook";
import {ChangePassword} from "./Components/ChangePassword";
import {AddAuthor} from "./Components/AddAuthor";

function App() {
  return (
      <div className="app-container">
        <LangugeProvider>
          <AuthProvider>
            <BrowserRouter>
              <div className="main-content">

                <Navbar/>
                <Routes>
                  <Route path="/" element={<Home/>}/>
                  <Route path="/login" element={<Login/>}/>
                  <Route path="/profile" element={<Profile/>}/>
                  <Route path="/books" element={<Books/>}/>
                  <Route path="/categories" element={<Category/>}/>
                  <Route path="/book" element={<AddOrEditBook/>}/>
                  <Route path="/bookCopy" element={<BookCopy/>}/>
                  <Route path="/bookCopy/available/:id" element={<BookCopyAvailable/>}/>
                  <Route path="/users" element={<Users/>}/>
                  <Route path="/reservations" element={<Reservations/>}/>
                  <Route path="/loans" element={<Loans/>}/>
                  <Route path="/addUser" element={<AddUserByEmployee/>}/>
                  <Route path="/reservationHistory" element={<ReservationHistory/>}/>
                  <Route path="/loanHistory" element={<LoanHistory/>}/>
                  <Route path="/changePassword" element={<ChangePassword/>}/>
                  <Route path="/addAuthor" element={<AddAuthor/>}/>
                </Routes>
                <Footer/>
              </div>
            </BrowserRouter>
          </AuthProvider>
        </LangugeProvider>
      </div>
        );
        }

        export default App;
