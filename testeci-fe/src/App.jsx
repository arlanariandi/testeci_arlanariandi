import './App.css'
import {Outlet} from "react-router-dom";
import Triangle from "./pages/Triangle/index.jsx";
import ConvertToWords from "./pages/ConvertToWords/index.jsx";
import Department from "./pages/Department/index.jsx";

function App() {

    return (
        <>
            {/*<Outlet/>*/}
            {/*<Triangle/>*/}
            {/*<ConvertToWords/>*/}
            {<Department/>}
        </>
    )
}

export default App
