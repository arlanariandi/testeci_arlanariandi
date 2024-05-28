import {useEffect, useState} from "react";
import axios from "axios";

const Jabatan = () => {
    const [jabatans, setJabatans] = useState([]);
    const [levels, setLevels] = useState([]);
    const [formData, setFormData] = useState({id_jabatan: '', nama_jabatan: '', id_level: ''});
    const [isEditing, setIsEditing] = useState(false);

    useEffect(() => {
        fetchJabatans();
        fetchLevels();
    }, []);

    const fetchJabatans = () => {
        axios.get("/api/jabatans")
            .then((response) => {
                setJabatans(response.data.data)
            })
            .catch(e => console.error('There was an error fetching the jabatans!', e));
    }

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
            axios.put(`/api/jabatans/${formData.id_jabatan}`, formData)
                .then(() => {
                    fetchJabatans();
                    setFormData({id_jabatan: '', nama_jabatan: '', id_level: ''});
                    setIsEditing(false);
                })
                .catch(error => {
                    console.error('There was an error updating the jabatan!', error);
                });
        } else {
            axios.post('/api/jabatans', formData)
                .then(() => {
                    fetchJabatans();
                    setFormData({id_jabatan: '', nama_jabatan: '', id_level: ''});
                })
                .catch(error => {
                    console.error('There was an error creating the jabatan!', error);
                });
        }
    };

    const handleEdit = (jabatan) => {
        setFormData(jabatan);
        setIsEditing(true);
    }

    const handleDelete = (id) => {
        const confirmDelete = window.confirm('Are you sure you want to delete this jabatan?');
        if (confirmDelete) {
            axios.delete(`/api/jabatans/${id}`)
                .then(() => {
                    fetchJabatans();
                })
                .catch(e => {
                    console.error('There was an error deleting the jabatan!', e);
                });
        }
    }

    let no = 1;

    return (
        <div className="px-10 mt-16">
            <h1 className="text-2xl font-bold text-gray-800 mb-4">Jabatan</h1>
            <hr className="my-8"/>
            <h2 className="text-lg font-semibold text-gray-800 mb-4">{isEditing ? 'Update Jabatan' : 'Add Jabatan'}</h2>
            <form onSubmit={handleFormSubmit}>
                <div className="grid gap-6 mb-6 md:grid-cols-2">
                    <div>
                        <label htmlFor="nama_jabatan"
                               className="block mb-2 text-sm font-medium text-gray-900">Nama Jabatan</label>
                        <input type="text" id="nama_jabatan" name="nama_jabatan"
                               className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                               placeholder="Software Engineer" required
                               value={formData.nama_jabatan}
                               onChange={handleInputChange}/>
                    </div>
                    <div>
                        <label htmlFor="id_level"
                               className="block mb-2 text-sm font-medium text-gray-900">Level</label>
                        <select id="id_level" value={formData.id_level} name="id_level"
                                onChange={handleInputChange}
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5">
                            <option value="">Pilih level</option>
                            {levels.map((level, index) => (
                                <option key={index} value={level.id_level}>{level.nama_level}</option>
                            ))}
                        </select>
                    </div>
                </div>

                <button type="submit"
                        className={`${isEditing ? 'bg-blue-700 hover:bg-blue-800 mr-4' : 'bg-teal-700 hover:bg-teal-800'} text-white font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center`}>
                    {isEditing ? 'Update' : 'Add'}</button>
                {isEditing &&
                    <button
                        type="button"
                        onClick={() => {
                            setIsEditing(false);
                            setFormData({id_karyawan: '', nik: '', nama: '', ttl: '', alamat: '', id_jabatan: ''});
                        }}
                        className="text-white bg-red-700 hover:bg-red-800 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center">
                        Cancel
                    </button>
                }
            </form>

            <hr className="my-8"/>

            <h2 className="text-lg font-semibold text-gray-800 mb-4">Data Jabatan</h2>
            <div className="relative overflow-x-auto shadow-md sm:rounded-lg mt-8">
                <table className="w-full text-sm text-left rtl:text-right text-gray-500">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                    <tr>
                        <th scope="col" className="px-6 py-3">No</th>
                        <th scope="col" className="px-6 py-3">Nama Jabatan</th>
                        <th scope="col" className="px-6 py-3">Level</th>
                        <th scope="col" className="px-6 py-3">Action</th>
                    </tr>
                    </thead>
                    <tbody>
                    {jabatans.map((jabatan, index) => (
                        <tr key={index} className="odd:bg-white even:bg-gray-50 border-b">
                            <th className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">{no++}</th>
                            <th scope="row"
                                className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                                {jabatan.nama_jabatan}
                            </th>
                            <th scope="row"
                                className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                                {jabatan.level.nama_level}
                            </th>
                            <td className="px-6 py-4">
                                <button onClick={() => handleEdit(jabatan)}
                                        className="font-medium text-blue-600 hover:underline mr-4">Edit
                                </button>
                                <button onClick={() => handleDelete(jabatan.id_jabatan)}
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

export default Jabatan;
