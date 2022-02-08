import './App.css';
import { Route, BrowserRouter, Routes } from "react-router-dom";
import { AllUsers }  from './components/AllUsers';
import { AddUser } from './components/AddUser';
import { EditUser } from './components/EditUser';
import { Layout } from './components/Layout';
import React from "react";

export default function App () {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout/>}>
          <Route index element={<AllUsers />}/>
          <Route path="/all-users" element={<AllUsers />} />
          <Route path="/add-user" element={<AddUser />} />
          <Route path="/edit-user/:id" element={<EditUser />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
