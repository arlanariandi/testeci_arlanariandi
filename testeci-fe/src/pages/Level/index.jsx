import {useEffect, useState} from "react";
import axios from "axios";

const Level = () => {
    const [levels, setLevels] = useState([]);
    const [formData, setFormData] = useState({id_level: '', nama_level: ''})
    const [isEditing, setIsEditing] = useState(false);

    useEffect(() => {
        fetchLevels();
    }, []);

    const fetchLevels = () => {
        axios.get("/api/levels")
            .then((response) => {
                setLevels(response.data.data)
            })
            .catch(e => console.error('There was an error fetching the levels!', e));
    }

    const handleInputChange = (e) => {
        const {name, value} = e.target;
        setFormData({...formData, [name]: value});
    };

    const handleFormSubmit = (e) => {
        e.preventDefault();
        if (isEditing) {
            axios.put(`/api/levels/${formData.id_level}`, formData)
                .then(() => {
                    fetchLevels();
                    setFormData({id_level: '', nama_level: ''});
                    setIsEditing(false);
                })
                .catch(error => {
                    console.error('There was an error updating the department!', error);
                });
        } else {
            axios.post('/api/levels', formData)
                .then(() => {
                    fetchLevels();
                    setFormData({id_level: '', nama_level: ''});
                })
                .catch(error => {
                    console.error('There was an error creating the level!', error);
                });
        }
    };

    const handleEdit = (level) => {
        setFormData(level);
        setIsEditing(true);
    }

    const handleDelete = (id) => {
        const confirmDelete = window.confirm('Are you sure you want to delete this level?');
        if (confirmDelete) {
            axios.delete(`/api/levels/${id}`)
                .then(() => {
                    fetchLevels();
                })
                .catch(e => {
                    console.error('There was an error deleting the level!', e);
                });
        }
    }

    let no = 1;

    return (
        <div className="px-10 mt-16">
            <h1 className="text-2xl font-bold text-gray-800 mb-4">Level</h1>

            <form onSubmit={handleFormSubmit}>
                <input
                    type="text"
                    name="nama_level"
                    value={formData.nama_level}
                    onChange={handleInputChange}
                    placeholder="Nama Level"
                    required
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 w-1/2 p-2.5"
                />

                <button type="submit"
                        className={`${isEditing ? 'text-blue-600' : 'text-teal-600'} font-medium hover:underline px-4`}>{isEditing ? 'Update' : 'Add'}</button>
                {isEditing && <button type="button" onClick={() => {
                    setIsEditing(false);
                    setFormData({id_level: '', nama_level: ''});
                }} className="font-medium text-red-600 hover:underline">Cancel</button>}
            </form>

            <div className="relative overflow-x-auto shadow-md sm:rounded-lg mt-8">
                <table className="w-full text-sm text-left rtl:text-right text-gray-500">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                    <tr>
                        <th scope="col" className="px-6 py-3">No</th>
                        <th scope="col" className="px-6 py-3">Nama Level</th>
                        <th scope="col" className="px-6 py-3">Action</th>
                    </tr>
                    </thead>
                    <tbody>
                    {levels.map((level, index) => (
                        <tr key={index} className="odd:bg-white even:bg-gray-50 border-b">
                            <th className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">{no++}</th>
                            <th scope="row"
                                className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                                {level.nama_level}
                            </th>
                            <td className="px-6 py-4">
                                <button onClick={() => handleEdit(level)}
                                        className="font-medium text-blue-600 hover:underline mr-4">Edit
                                </button>
                                <button onClick={() => handleDelete(level.id_level)}
                                        className="font-medium text-red-600 hover:underline">Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>

        </div>
    )
}

export default Level;
