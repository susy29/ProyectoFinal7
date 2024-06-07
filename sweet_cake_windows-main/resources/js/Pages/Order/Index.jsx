import React from "react";
import { Head } from "@inertiajs/react";
import moment from "moment";
import { Card, CardBody, Typography } from "@material-tailwind/react";
import AdminAuthenticatedLayout from "../../Layouts/AdminAuthenticatedLayout";
import { InertiaLink } from "@inertiajs/inertia-react";


const TABLE_HEAD = ["# Pedido", "Cantidad productos", "Empleado", "Estatus"];



const Index = ({ auth, penging_orders, delivered_orders }) => {


    return (
        <AdminAuthenticatedLayout user={auth.user}>
            <Head title="Dashboard" />

            <Card className="overflow-scroll h-full w-full">
                <CardBody>

                    <div className="flex justify-between items-center mb-6">
                        <Typography color="blueGray" className="text-2xl font-bold text-violet-600" >
                            Ordenes pendientes
                        </Typography>
                    </div>
                    <table className="w-full min-w-max table-auto text-left">
                        <thead>
                            <tr>
                                {TABLE_HEAD.map((head) => (
                                    <th key={head} className="border-b border-blue-gray-100 bg-blue-gray-50 p-4">
                                        <Typography
                                            variant="small"
                                            color="blue-gray"
                                            className="font-normal leading-none opacity-70"
                                        >
                                            {head}
                                        </Typography>
                                    </th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {penging_orders.map(({ id, products, user }, index) => {
                                const isLast = index === penging_orders.length - 1;
                                const classes = isLast ? "p-4" : "p-4 border-b border-blue-gray-50";

                                return (
                                    <tr key={id}>
                                        <td className={classes}>
                                            <Typography variant="small" color="blue-gray" className="font-normal">
                                                {id}
                                            </Typography>
                                        </td>
                                        <td className={classes}>
                                            <Typography variant="small" color="blue-gray" className="font-normal">
                                                {products.length}
                                            </Typography>
                                        </td>
                                        <td className={classes}>
                                            <Typography variant="small" color="blue-gray" className="font-normal">
                                                {user.name}
                                            </Typography>
                                        </td>

                                        <td className={classes}>
                                            <InertiaLink
                                                tabIndex="1"
                                                className="px-4 py-2 text-sm text-white bg-indigo-600 rounded"
                                                href={route("orders.show", id)}
                                            >
                                                Ver
                                            </InertiaLink>
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </CardBody>
            </Card>

            <Card className="overflow-scroll h-full w-full mt-10">

                <CardBody>
                    <div className="flex justify-between items-center mb-6">
                        <Typography color="blueGray" className="text-2xl font-bold text-violet-600">
                            Ordenes entregadas
                        </Typography>
                    </div>
                    <table className="w-full min-w-max table-auto text-left">
                        <thead>
                            <tr>
                                {TABLE_HEAD.map((head) => (
                                    <th key={head} className="border-b border-blue-gray-100 bg-gray-50 p-4">
                                        <Typography
                                            variant="small"
                                            color="blue-gray"
                                            className="font-normal leading-none opacity-70"
                                        >
                                            {head}
                                        </Typography>
                                    </th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {delivered_orders.map(({ id, products, user }, index) => {
                                const isLast = index === delivered_orders.length - 1;
                                const classes = isLast ? "p-4" : "p-4 border-b border-blue-gray-50";

                                return (
                                    <tr key={id}>
                                        <td className={classes}>
                                            <Typography variant="small" color="blue-gray" className="font-normal">
                                                {id}
                                            </Typography>
                                        </td>
                                        <td className={classes}>
                                            <Typography variant="small" color="blue-gray" className="font-normal">
                                                {products.length}
                                            </Typography>
                                        </td>
                                        <td className={classes}>
                                            <Typography variant="small" color="blue-gray" className="font-normal">
                                                {user.name}
                                            </Typography>
                                        </td>

                                        <td className={classes}>

                                            <InertiaLink
                                                tabIndex="1"
                                                className="px-4 py-2 text-sm text-white bg-indigo-600 rounded"
                                                href={route("orders.show", id)}
                                            >
                                                Ver
                                            </InertiaLink>
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </CardBody>
            </Card>


        </AdminAuthenticatedLayout>
    );
};

export default Index;