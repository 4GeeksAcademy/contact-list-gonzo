import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { BackendURL } from "./component/backendURL.js";

import { Home } from "./pages/Home.jsx";
import injectContext from "./store/appContext.js";

import { Navbar } from "./component/Navbar.jsx";
import { Footer } from "./component/Footer.jsx";
import { ContactListHome } from './pages/ContactListHome.jsx';
import { ContactList } from "./pages/ContactList.jsx";
import { ContactListForm } from "./pages/ContactListForm.jsx";

const Layout = () => {
    const basename = process.env.BASENAME || "";

    if(!process.env.BACKEND_URL || process.env.BACKEND_URL == "") return <BackendURL/ >;

    return (
        <div className="d-flex flex-column min-vh-100">
            <BrowserRouter basename={basename}>
                    <Navbar />
                    <Routes>
                        <Route element={<Home />} path="/" />
                        <Route element={<ContactListHome />} path="/contact-list" />
                        <Route element={<ContactList />} path="/contact-list/:agendaName" />
                        <Route element={<ContactListForm />} path="/contact-list/:agendaName/:type/:id" />
                        <Route element={<ContactListForm />} path="/contact-list/:agendaName/:type" />
                        <Route element={<h1>Not found!</h1>} />
                    </Routes>
                    <Footer />
            </BrowserRouter>
        </div>
    );
};

export default injectContext(Layout);
