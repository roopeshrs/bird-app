import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import LandingPage from './pages/LandingPage';
import Protected from './components/Protected';

function App() {
	return (
		<BrowserRouter>
            <Routes>
                <Route path="/" element={<LandingPage />} />
                <Route path="/login" element={<Login />}/>
                <Route path="/register" element={<Register />}/>
                <Route path="/dashboard" element={<Protected Component={Dashboard} />}>
                    <Route path="home" element={<Home />} />
                </Route>
                <Route path="*" element={<div>This page doesnt exist...</div>}/>
            </Routes>
		</BrowserRouter>
	)
}

export default App
