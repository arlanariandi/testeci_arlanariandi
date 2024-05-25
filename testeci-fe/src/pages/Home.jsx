import {useState} from "react";
import axios from "axios";

const Home = () => {
    const [rows, setRows] = useState(0);
    const [type, setType] = useState('type1');
    const [triangle, setTriangle] = useState('');

    const handleChangeRows = (e) => {
        setRows(e.target.value);
    }

    const handleChangeType = (e) => {
        setType(e.target.value);
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post("/api/generate-triangle", {rows, type});
            setTriangle(response.data);
        } catch (e) {
            console.error('Error creating triangle', e);
        }
    }

    return (
        <div className="px-10 mt-16">
            <h1 className="text-2xl font-bold text-gray-800 mb-4">Triangle</h1>
            <div className="grid gap-16 md:grid-cols-2 ">
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <div className="mb-6">
                            <label htmlFor="rows"
                                   className="block mb-2 text-sm font-medium text-gray-900">Type of triangle</label>
                            <select value={type} onChange={handleChangeType}
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 ">
                                <option value="type1">Type 1</option>
                                <option value="type2">Type 2</option>
                                <option value="type3">Type 3</option>
                            </select>
                        </div>
                    </div>

                    <div className="mb-4">
                        <div className="mb-6">
                            <label htmlFor="rows"
                                   className="block mb-2 text-sm font-medium text-gray-900">Rows</label>
                            <input type="text" id="rows" name="rows"
                                   className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
                                   value={rows}
                                   onChange={handleChangeRows}
                            />
                        </div>
                    </div>

                    <div className="flex items-center justify-between">
                        <button
                            className="bg-teal-500 hover:bg-teal-700 text-white font-bold py-2 px-6 rounded-lg focus:outline-none focus:shadow-outline"
                            type="submit">
                            Generate Triangle
                        </button>
                    </div>
                </form>

                <div>
                    <h2 className="text-xl font-semibold text-gray-800 mb-4">Output</h2>
                    <div dangerouslySetInnerHTML={{__html: triangle}} className="text-gray-800"/>
                </div>
            </div>
        </div>
    )
}

export default Home;
