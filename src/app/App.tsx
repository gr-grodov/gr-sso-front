import './App.css'
import {BrowserRouter, Route, Routes} from "react-router";
import {LoginPage} from "@/pages/LoginPage/LoginPage.tsx";
import {RegisterPage} from "@/pages/RegisterPage";

function App() {
  return (
    <>
      <BrowserRouter>
          <Routes>
            <Route path="/" element={<LoginPage/>}/>
            <Route path="/register" element={<RegisterPage/>}/>
          </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
