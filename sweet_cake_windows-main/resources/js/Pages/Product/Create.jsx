import React from "react";
import { Inertia } from "@inertiajs/inertia";
import { InertiaLink, useForm } from "@inertiajs/inertia-react";
import AdminAuthenticatedLayout from "../../Layouts/AdminAuthenticatedLayout";
import { Head } from "@inertiajs/react";

const Create = ({ auth, error }) => {
    const { data, setData, errors, post, progress } = useForm({
        name: "",
        price: "",
        image: null,
        description: "",
    });

    function handleSubmit(e) {
        e.preventDefault();
        post(route("products.store"));
    }

    return (
        <AdminAuthenticatedLayout user={auth.user}>
            <Head title="Crear producto" />

            <div className="container flex flex-col justify-center mx-auto">
                <div>
                    <h1 className="mb-8 text-3xl font-bold">
                        <InertiaLink
                            href={route("products.index")}
                            className="text-violet-600 hover:text-violet-700"
                        >
                            Productos
                        </InertiaLink>
                        <span className="font-medium text-violet-600"> / </span>
                        Crear
                    </h1>
                </div>
                <div className="max-w-6xl p-8 bg-white rounded shadow">

                    <form name="createForm" encType="multipart/form-data" onSubmit={handleSubmit}>
                        <div className="flex flex-col">
                            <div className="mb-4">
                                <label className="">Nombre</label>
                                <input
                                    type="text"
                                    className="w-full px-4 py-2"
                                    label="Nombre"
                                    name="name"
                                    value={data.name}
                                    onChange={(e) =>
                                        setData("name", e.target.value)
                                    }
                                />
                                <span className="text-red-600">
                                    {errors.name}
                                </span>
                            </div>
                            <div className="mb-4">
                                <label className="">Precio</label>
                                <input
                                    type="number"
                                    className="w-full rounded"
                                    label="Precio"
                                    name="price"
                                    errors={errors.price}
                                    value={data.price}
                                    onChange={(e) =>
                                        setData("price", e.target.value)
                                    }
                                />
                                <span className="text-red-600">
                                    {errors.price}
                                </span>
                            </div>
                            <div className="mb-4">
                                <label className="">Descripción</label>
                                <textarea
                                    className="w-full px-4 py-2"
                                    label="Descripción"
                                    name="description"
                                    value={data.description}
                                    onChange={(e) =>
                                        setData("description", e.target.value)
                                    }
                                ></textarea>
                                <span className="text-red-600">
                                    {errors.description}
                                </span>
                            </div>
                            <div className="mb-4">
                                <label className="">Imagen</label>
                                <input
                                    type="file"
                                    className="w-full px-4 py-2"
                                    label="Imagen"
                                    name="image"
                                    onChange={(e) =>
                                        setData("image", e.target.files[0])
                                    }
                                />
                                <span className="text-red-600">
                                    {errors.image}
                                </span>
                            </div>

                        </div>
                        <div className="mt-4">
                            <button
                                type="submit"
                                className="px-6 py-2 font-bold text-white bg-violet-600 rounded"
                            >
                                Guardar
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </AdminAuthenticatedLayout>
    );
};

export default Create;