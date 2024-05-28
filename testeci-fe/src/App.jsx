import './App.css'
import {Outlet} from "react-router-dom";
import Navbar from "./component/Navbar.jsx";

function App() {

    return (
        <div>
            <Navbar/>
            <main>
                <Outlet/>
            </main>
        </div>
    )
}

export default App
