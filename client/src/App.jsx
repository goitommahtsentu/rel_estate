import React from 'react';
import {BrowserRouter,Routes,Route} from "react-router-dom";
import Home from "./pages/Home.jsx";
import About from "./pages/About.jsx";
import Profile from "./pages/Profile.jsx";
import SignIn from "./pages/SignIn.jsx";
import SignUp from "./pages/SignUp.jsx";
import Header from "./components/Header.jsx";
import PrivateRoute from "./components/PrivateRoute.jsx";

const App = () => {
    return (
        <BrowserRouter>
            <Header/>
            <Routes>

                <Route path='/' element={<Home/>}/>
                <Route path='/about' element={<About/>}/>
                <Route path='/sign-in' element={<SignIn/>}/>
                <Route path='/sign-up' element={<SignUp/>}/>
                <Route element={<PrivateRoute/>}>
                    <Route path='/profile' element={<Profile/>}/>
                </Route>
            </Routes>
        </BrowserRouter>
    );
};

export default App;
