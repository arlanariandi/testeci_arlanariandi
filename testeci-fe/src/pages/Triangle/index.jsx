import {useState} from "react";
import axios from "axios";
import * as Yup from "yup";
import {ErrorMessage, Field, Form, Formik} from "formik";

const Triangle = () => {
    const [triangle, setTriangle] = useState('');

    const initialValues = {
        rows: 0,
        type: 'type1'
    };

    const validationSchema = Yup.object({
        rows: Yup.number().required('Rows is required').positive('Rows must be a positive number').integer('Rows must be an integer'),
    });

    const handleSubmit = async (values, {setSubmitting}) => {
        try {
            const response = await axios.post("/api/generate-triangle", values);
            setTriangle(response.data);
        } catch (e) {
            console.error('Error creating triangle', e);
        } finally {
            setSubmitting(false);
        }
    }

    return (
        <div className="px-10 mt-16">
            <h1 className="text-2xl font-bold text-gray-800">Triangle</h1>
            <hr className="my-8"/>
            <div className="grid gap-16 md:grid-cols-2">
                <Formik
                    initialValues={initialValues}
                    validationSchema={validationSchema}
                    onSubmit={handleSubmit}>
                    {({isSubmitting}) => (
                        <Form>
                            <div className="mb-4">
                                <div className="mb-6">
                                    <label htmlFor="rows"
                                           className="block mb-2 text-sm font-medium text-gray-900">Type of
                                        triangle</label>
                                    <Field as="select" name="type"
                                           className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5">
                                        <option value="type1">Type 1</option>
                                        <option value="type2">Type 2</option>
                                        <option value="type3">Type 3</option>
                                    </Field>
                                </div>
                            </div>

                            <div className="mb-4">
                                <div className="mb-6">
                                    <label htmlFor="rows"
                                           className="block mb-2 text-sm font-medium text-gray-900">Rows</label>
                                    <Field type="text" name="rows"
                                           className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"/>
                                    <ErrorMessage name="rows" component="div" className="mt-4 text-sm text-red-800"/>
                                </div>
                            </div>

                            <div className="flex items-center justify-between">
                                <button
                                    className="bg-teal-500 hover:bg-teal-700 text-white font-bold py-2 px-6 rounded-lg focus:outline-none focus:shadow-outline"
                                    type="submit"
                                    disabled={isSubmitting}
                                >
                                    Generate Triangle
                                </button>
                            </div>
                        </Form>
                    )}
                </Formik>

                {/*<form onSubmit={handleSubmit}>*/}

                {/*</form>*/}

                <div>
                    <h2 className="text-xl font-semibold text-gray-800 mb-4">Output</h2>
                    <div dangerouslySetInnerHTML={{__html: triangle}} className="text-gray-800"/>
                </div>
            </div>
        </div>
    )
}

export default Triangle;
