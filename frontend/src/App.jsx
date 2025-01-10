import { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Button, Container } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import PrivacyPage from "./pages/PrivacyPage.jsx";
import NotFoundPage from "./pages/NotFoundPage.jsx";
import NotesPage from "./pages/NotesPage.jsx";
import SignupModal from "./components/SignupModal.jsx";
import LoginModal from "./components/LoginModal.jsx";
import { getLoggedInUser } from "./network/UserApi.js";
import Navbar from "./components/Navbar.jsx";
import AddEditNote from "./pages/AddEditNote.jsx";

const App = () => {
    const [loggedInUser, setLoggedInUser] = useState(null);
    const [notes, setNotes] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchLoggedInUser() {
            try {
                const user = await getLoggedInUser();
                setLoggedInUser(user);
            } catch (error) {
                console.log(error);
            } finally {
                setLoading(false);
            }
        }
        fetchLoggedInUser();
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <BrowserRouter>
            <Navbar
                loggedInUser={loggedInUser}
                setLogoutSuccessful={() => setLoggedInUser(null)}
            />
            <Container>
                <Routes>
                    <Route
                        path="/"
                        element={
                            <NotesPage
                                loggedInUser={loggedInUser}
                                notes={notes}
                                setNotes={setNotes}
                            />
                        }
                    />
                    <Route
                        path="/signup"
                        element={
                            <SignupModal
                                setSignupSuccessful={(user) => setLoggedInUser(user)}
                                loggedInUser={loggedInUser}
                            />
                        }
                    />
                    <Route
                        path="/login"
                        element={
                            <LoginModal
                                setLoginSuccessful={(user) => setLoggedInUser(user)}
                                loggedInUser={loggedInUser}
                            />
                        }
                    />
                    <Route
                        path="/create"
                        element={<AddEditNote notes={notes} setNotes={setNotes} />}
                    />
                    <Route
                        path="/:id"
                        element={<AddEditNote notes={notes} setNotes={setNotes} />}
                    />
                    <Route path="/privacy" element={<PrivacyPage />} />

                    <Route path="/*" element={<NotFoundPage />} />
                </Routes>
            </Container>
        </BrowserRouter>
    );
};


export default App;
