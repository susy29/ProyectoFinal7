import React from "react";
import { Inertia } from "@inertiajs/inertia";
import { InertiaLink, useForm } from "@inertiajs/inertia-react";
import AdminAuthenticatedLayout from "../../Layouts/AdminAuthenticatedLayout";
import { Head } from "@inertiajs/react";
import { Card, IconButton, List, ListItem, Typography } from "@material-tailwind/react";

const Edit = ({ auth, product }) => {
    const { data, setData, put, errors } = useForm({
        name: product.name || "",
        price: product.price || "",
        description: product.description || "",
    });

    const { data: ingredient, setData: setIngredient, post, errors: errorsIngredient } = useForm({
        name: "",
        price: "",
        product_id: product.id
    });

    function handleSubmit(e) {
        e.preventDefault();
        put(route("products.update", product.id));
    }

    function handleAddIngredient(e) {
        e.preventDefault();
        post(route("ingredients.store"));
    }

    function destroy() {
        if (confirm("¿Seguro que desea eliminar el producto?")) {
            Inertia.delete(route("products.destroy", product.id));
        }
    }

    return (
        <AdminAuthenticatedLayout user={auth.user}>
            <Head title="Detalles del producto" />
            <div >
                <div className="container flex flex-col justify-center mx-auto">
                    <div>
                        <h1 className="mb-8 text-3xl font-bold">
                            <InertiaLink
                                href={route("products.index")}
                                className="text-violet-600 hover:text-indigo-700"
                            >
                                Productos
                            </InertiaLink>
                            <span className="font-medium text-violet-600 "> / </span>
                            Detalles
                        </h1>
                    </div>
                    <div className="max-w-3xl p-8 bg-white rounded shadow">
                        <form name="createForm" onSubmit={handleSubmit}>
                            <div className="flex flex-col">

                                <div className="mb-4 flex items-center w-full justify-center">
                                    <img src={`/images/${product.img}`} alt="imagen" className="w-40 h-40 rounded-full" />
                                </div>

                                <div className="mb-4">
                                    <label className="font-bold">Nombre</label>
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
                                    <label className="font-bold">Precio</label>
                                    <input
                                        type="text"
                                        className="w-full px-4 py-2"
                                        label="Precio"
                                        name="price"
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
                                    <label className="font-bold">Descripción</label>
                                    <textarea
                                        type="text"
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
                            </div>
                            <div className="flex justify-between">
                                <button
                                    type="submit"
                                    className="px-4 py-2 text-white bg-violet-600 rounded"
                                >
                                    Actualizar
                                </button>
                                <button
                                    onClick={destroy}
                                    tabIndex="-1"
                                    type="button"
                                    className="px-4 py-2 text-white bg-red-500 rounded"
                                >
                                    Eliminar
                                </button>
                            </div>
                        </form>
                    </div>

                    <div className="mt-10">



                        <div className="max-w-3xl p-4 bg-white mt-10">
                            <h4 className="mb-8 text-2xl font-bold">
                                Precios por ingrediente adicional
                            </h4>
                            {
                                product.ingredients.length === 0 && <div className="mb-4 text-sm text-gray-600 ">
                                    No hay ingredientes
                                </div>
                            }

                            {
                                product.ingredients.length !== 0 && <Card className="w-96">
                                    <List>
                                        {product.ingredients.map((ingredient) => (<ListItem key={ingredient.id}>
                                            <div className="flex w-full justify-between">
                                                <div>
                                                    <Typography variant="h6" color="blue-gray">
                                                        {ingredient.name}
                                                    </Typography>
                                                    <Typography variant="small" color="gray" className="font-normal">
                                                        ${ingredient.price}
                                                    </Typography>
                                                </div>

                                                <IconButton color="red" onClick={() => {
                                                    if (confirm("¿Seguro que desea eliminar el ingrediente?")) {
                                                        Inertia.delete(route("ingredients.destroy", ingredient.id));
                                                    }
                                                }}>
                                                    X
                                                </IconButton>
                                            </div>
                                        </ListItem>
                                        ))}

                                    </List>
                                </Card>
                            }

                        </div>

                        <div className="max-w-3xl p-4 bg-white rounded shadow mt-10">
                            <h6 className="mb-8 text-1xl font-bold">
                                Agregar ingrediente
                            </h6>
                            <form className="flex items-center mt-10" onSubmit={handleAddIngredient}>
                                <div className="flex items-center gap-3">
                                    <label className="">Ingrediente</label>
                                    <input
                                        type="text"
                                        className="w-full px-4 py-2"
                                        label="Nombre"
                                        name="name"
                                        value={ingredient.name}
                                        onChange={(e) =>
                                            setIngredient("name", e.target.value)
                                        }
                                    />
                                    <span className="text-red-600">
                                        {errorsIngredient.name}
                                    </span>

                                    <label className="">Precio</label>
                                    <input
                                        type="number"
                                        className="w-full px-4 py-2"
                                        label="Precio"
                                        name="price"
                                        value={ingredient.price}
                                        onChange={(e) =>
                                            setIngredient("price", e.target.value)
                                        }
                                    />
                                    <span className="text-red-600">
                                        {errorsIngredient.price}
                                    </span>
                                </div>
                                <button

                                    type="submit"
                                    className="px-4 py-2 text-white bg-violet-600 rounded"
                                >
                                    Agregar
                                </button>
                            </form>

                        </div>




                    </div>

                </div>
            </div>

        </AdminAuthenticatedLayout>
    );
};

export default Edit;