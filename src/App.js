import React, { Suspense } from 'react';
import {Routes, Route, BrowserRouter} from "react-router-dom";
import Login from "./component/Login";
import Dashboard from "./component/Dashboard";

export default function App() {
  return (
   <>
    <BrowserRouter>
      <Suspense fallback={<h2>Loading...</h2>}>
        <Routes>
          <Route path="/" exact element={<Login />}></Route>
          <Route path="/dashboard" exact element={<Dashboard />}></Route>
        </Routes>
      </Suspense>
    </BrowserRouter>
   </>
  )
}
