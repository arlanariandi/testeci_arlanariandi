import {useState} from "react";
import axios from "axios";
import * as Yup from "yup";
import {ErrorMessage, Field, Form, Formik} from "formik";

const convertToWords = () => {
    const [terbilang, setTerbilang] = useState('');
    const [inputNumber, setInputNumber] = useState(0);

    const initialValues = {
        number: 0,
    };

    const validationSchema = Yup.object({
        number: Yup.number().required('Number is required').positive('Number must be a positive number').integer('Number must be an integer'),
    });

    const handleSubmit = async (values, {setSubmitting}) => {
        try {
            const response = await axios.post("/api/convert", values);
            setTerbilang(response.data.terbilang);
        } catch (e) {
            console.error('Error creating number', e);
        } finally {
            setSubmitting(false);
        }
    }

    return (
        <div className="px-10 mt-16">
            <h1 className="text-2xl font-bold text-gray-800">Number to Words Converter</h1>
            <hr className="my-8"/>
            <div className="grid gap-16 md:grid-cols-2 ">
                <Formik
                    initialValues={initialValues}
                    validationSchema={validationSchema}
                    onSubmit={handleSubmit}>
                    {({isSubmitting, setFieldValue}) => (
                        <Form>
                            <div>
                                <label htmlFor="number"
                                       className="block mb-2 text-sm font-medium text-gray-900">Input Number</label>
                                <Field type="text" id="number" name="number"
                                       className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                                       onChange={(e) => {
                                           const value = e.target.value;
                                           setFieldValue('number', value);
                                           setInputNumber(value); // update state inputNumber
                                       }}
                                />
                                <ErrorMessage name="number" component="div" className="mt-4 text-sm text-red-800"/>
                            </div>

                            <button type="submit"
                                    className="mt-4 text-white font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center bg-teal-500 hover:bg-teal-700"
                                    disabled={isSubmitting}
                            >
                                Convert
                            </button>
                        </Form>
                    )}
                </Formik>

                <div>
                    <h2 className="text-lg font-semibold text-gray-800 mb-4">Output</h2>
                    {terbilang && (
                        <div>
                            <p className="text-base text-gray-700 mb-2">Rp. {inputNumber}</p>
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
