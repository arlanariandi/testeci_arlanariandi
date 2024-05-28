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
            <h1 className="text-2xl font-bold text-gray-800 mb-4">Number to Words Converter</h1>
            <form onSubmit={handleSubmit}>
                <label>input number</label>
                <input type="text" value={number} onChange={handleChange}/>

                <button type="submit">convert</button>
            </form>
            <div>
                <h2>Output</h2>
                {terbilang && (
                    <div>
                        <p>Rp. {number}</p>
                        <p>Terbilang</p>
                        <div>{terbilang}</div>
                    </div>
                )}
            </div>
        </div>
    )
}

export default convertToWords;
