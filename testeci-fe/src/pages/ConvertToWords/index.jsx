import {useState} from "react";
import axios from "axios";

const convertToWords = () => {
    const [number, setNumber] = useState('');
    const [terbilang, setTerbilang] = useState('');

    const handleChange = (e) => {
        setNumber(e.target.value);
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post("/api/convert", {number});
            setTerbilang(response.data.terbilang);
        } catch (e) {
            console.log(e)
        }
    }

    return (
        <div className="px-10 mt-16">
            <h1 className="text-2xl font-bold text-gray-800">Number to Words Converter</h1>
            <hr className="my-8"/>
            <div className="grid gap-16 md:grid-cols-2 ">
                <form onSubmit={handleSubmit}>
                    <div>
                        <label htmlFor="input"
                               className="block mb-2 text-sm font-medium text-gray-900">Input Number</label>
                        <input type="text" id="input" name="input"
                               className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                               placeholder="33839494xxxxx" required
                               value={number}
                               onChange={handleChange}/>
                    </div>

                    <button type="submit"
                            className="mt-4 text-white font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center bg-teal-500 hover:bg-teal-700">
                        Convert
                    </button>
                </form>

                <div>
                    <h2 className="text-lg font-semibold text-gray-800 mb-4">Output</h2>
                    {terbilang && (
                        <div>
                            <p className="text-base text-gray-700 mb-2">Rp. {number}</p>
                            <p className="text-base text-gray-700 mb-4">Terbilang:</p>
                            <div className="font-semibold text-gray-800 capitalize">{terbilang}</div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}

export default convertToWords;
