import './App.css'
import {Outlet} from "react-router-dom";
import Navbar from "./component/Navbar.jsx";

function App() {

    return (
        <div>
            <Navbar/>
            <main className="max-w-screen-xl mx-auto mt-28">
                <Outlet/>
            </main>
        </div>
    )
}

export default App
