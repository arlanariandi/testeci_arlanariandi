import {createBrowserRouter} from "react-router-dom";
import App from "../App.jsx";
import Triangle from "../pages/Triangle/index.jsx";
import ConvertToWords from "../pages/ConvertToWords/index.jsx";
import Level from "../pages/Level/index.jsx";
import Jabatan from "../pages/Jabatan/index.jsx";
import Karyawan from "../pages/Karyawan/index.jsx";
import Department from "../pages/Department/index.jsx";

const setupRouter = () => createBrowserRouter([{
    path: '/',
    element: <App/>,
    errorElement: <>Error Cuy</>,
    children: [
        {
            path: 'karyawan',
            element: <Karyawan/>
        },
        {
            path: 'jabatan',
            element: <Jabatan/>
        },
        {
            path: 'level',
            element: <Level/>
        },
        {
            path: 'department',
            element: <Department/>
        },
        {
            path: 'convert-to-words',
            element: <ConvertToWords/>
        },
        {
            index: true,
            element: <Triangle/>
        }
    ]
}])

export default setupRouter;
