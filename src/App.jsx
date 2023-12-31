import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";
import Home from './components/Home';
import Nav from './components/Nav';
import AdminView from "./components/AdminView";
import './App.css'

function App() {
  const Layout = () => (
    <>
      <Nav />
      <div className="mainContainer">
        <Outlet />
      </div>
    </>
  );

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<Home />} />
            <Route path="/admin" element={<AdminView />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
