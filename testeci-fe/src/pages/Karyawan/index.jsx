import {useEffect, useState} from "react";
import axios from "axios";

const Karyawan = () => {
    const [karyawans, setKaryawans] = useState([]);
    const [jabatans, setJabatans] = useState([]);
    const [formData, setFormData] = useState({id_karyawan: '', nik: '', nama: '', ttl: '', alamat: '', id_jabatan: ''});
    const [isEditing, setIsEditing] = useState(false);

    useEffect(() => {
        fetchKaryawans();
        fetchJabatans();
    }, []);

    const fetchKaryawans = () => {
        axios.get("/api/karyawans")
            .then((response) => {
                setKaryawans(response.data.data)
            })
            .catch(e => console.error('There was an error fetching the karyawans!', e));
    }

    const fetchJabatans = () => {
        axios.get("/api/jabatans")
            .then((response) => {
                setJabatans(response.data.data)
            })
            .catch(e => console.error('There was an error fetching the jabatans!', e));
    }

    const handleInputChange = (e) => {
        const {name, value} = e.target;
        setFormData({...formData, [name]: value});
    };

    const handleFormSubmit = (e) => {
        e.preventDefault();
        if (isEditing) {
            axios.put(`/api/karyawans/${formData.id_karyawan}`, formData)
                .then(() => {
                    fetchKaryawans();
                    setFormData({id_karyawan: '', nik: '', nama: '', ttl: '', alamat: '', id_jabatan: ''});
                    setIsEditing(false);
                })
                .catch(error => {
                    console.error('There was an error updating the karyawan!', error);
                });
        } else {
            axios.post('/api/karyawans', formData)
                .then(() => {
                    fetchKaryawans();
                    setFormData({id_karyawan: '', nik: '', nama: '', ttl: '', alamat: '', id_jabatan: ''});
                })
                .catch(error => {
                    console.error('There was an error creating the karyawan!', error);
                });
        }
    };

    const handleEdit = (karyawan) => {
        setFormData(karyawan);
        setIsEditing(true);
    }

    const handleDelete = (id) => {
        const confirmDelete = window.confirm('Are you sure you want to delete this level?');
        if (confirmDelete) {
            axios.delete(`/api/levels/${id}`)
                .then(() => {
                    fetchKaryawans();
                })
                .catch(e => {
                    console.error('There was an error deleting the level!', e);
                });
        }
    }

    let no = 1;

    return (
        <div className="px-10 mt-16">
            <h1 className="text-2xl font-bold text-gray-800">Karyawan</h1>
            <hr className="my-8"/>
            <h2 className="text-lg font-semibold text-gray-800 mb-4">{isEditing ? 'Update Karyawan' : 'Add Karyawan'}</h2>
            <form onSubmit={handleFormSubmit}>
                <div className="grid gap-6 mb-6 md:grid-cols-2">
                    <div>
                        <label htmlFor="nik"
                               className="block mb-2 text-sm font-medium text-gray-900">NIK</label>
                        <input type="number" id="nik" name="nik"
                               className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                               placeholder="33839494xxxxx" required
                               value={formData.nik}
                               onChange={handleInputChange}/>
                    </div>
                    <div>
                        <label htmlFor="nama"
                               className="block mb-2 text-sm font-medium text-gray-900">Nama</label>
                        <input type="text" id="nama" name="nama"
                               className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                               placeholder="nama" required
                               value={formData.nama}
                               onChange={handleInputChange}/>
                    </div>
                    <div>
                        <label htmlFor="ttl"
                               className="block mb-2 text-sm font-medium text-gray-900">Tanggal Lahir</label>
                        <input type="date" id="ttl" name="ttl"
                               className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                               placeholder="123-45-678" pattern="[0-9]{3}-[0-9]{2}-[0-9]{3}" required
                               value={formData.ttl}
                               onChange={handleInputChange}/>
                    </div>
                    <div>
                        <label htmlFor="alamat"
                               className="block mb-2 text-sm font-medium text-gray-900">Alamat</label>
                        <input type="text" id="alamat" name="alamat"
                               className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                               placeholder="Jakarta" required
                               value={formData.alamat}
                               onChange={handleInputChange}/>
                    </div>
                    <div>
                        <label htmlFor="id_jabatan"
                               className="block mb-2 text-sm font-medium text-gray-900">Jabatan</label>
                        <select id="id_jabatan" value={formData.id_jabatan} name="id_jabatan"
                                onChange={handleInputChange}
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5">
                            <option value="">Pilih jabatan</option>
                            {jabatans.map((jabatan, index) => (
                                <option key={index} value={jabatan.id_jabatan}>{jabatan.nama_jabatan}</option>
                            ))}
                        </select>
                    </div>
                </div>

                <button type="submit"
                        className={`${isEditing ? 'bg-blue-700 hover:bg-blue-800 mr-4' : 'bg-teal-500 hover:bg-teal-700'} text-white font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center`}>
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

            <h2 className="text-lg font-semibold text-gray-800 mb-4">Data Karyawan</h2>
            <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                <table className="w-full text-sm text-left rtl:text-right text-gray-500">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                    <tr>
                        <th scope="col" className="px-6 py-3">No</th>
                        <th scope="col" className="px-6 py-3">NIK</th>
                        <th scope="col" className="px-6 py-3">Nama</th>
                        <th scope="col" className="px-6 py-3">TTL</th>
                        <th scope="col" className="px-6 py-3">Alamat</th>
                        <th scope="col" className="px-6 py-3">Jabatan</th>
                        <th scope="col" className="px-6 py-3">Action</th>
                    </tr>
                    </thead>
                    <tbody>
                    {karyawans.map((karyawan, index) => (
                        <tr key={index} className="odd:bg-white even:bg-gray-50 border-b">
                            <th className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">{no++}</th>
                            <th scope="row"
                                className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                                {karyawan.nik}
                            </th>
                            <th scope="row"
                                className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                                {karyawan.nama}
                            </th>
                            <th scope="row"
                                className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                                {karyawan.ttl}
                            </th>
                            <th scope="row"
                                className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                                {karyawan.alamat}
                            </th>
                            <th scope="row"
                                className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                                {karyawan.jabatan.nama_jabatan}
                            </th>
                            <td className="px-6 py-4">
                                <button onClick={() => handleEdit(karyawan)}
                                        className="font-medium text-blue-600 hover:underline mr-4">Edit
                                </button>
                                <button onClick={() => handleDelete(karyawan.id_jabatan)}
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

export default Karyawan;
