import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, router } from '@inertiajs/react';
import {
    Card,
    CardHeader,
    CardBody,
    CardFooter,
    Typography,
    Button,
    Dialog,
    DialogHeader,
    DialogBody,
    DialogFooter,
    List,
    ListItem,
    Option,
    Select
} from "@material-tailwind/react";
import { useEffect, useRef, useState } from 'react';
import { formatCurrency } from '../../Utils';
import useOnScreen from '../../Utils/hooks';
import Pago from './Pago';

const customProductDetaultValue = {
    price: 0,
    ingredients: [],
    multiplier: 1,
    extraIngredients: [],
    product: {},
    type: 'Redondo'
}

const sizeOptions = [
    {
        label: '20 personas',
        value: 1
    },
    {
        label: '30 personas',
        value: 1.5
    },
    {
        label: '40 personas',
        value: 2
    },
    {
        label: '50 personas',
        value: 2.5
    }
]

const typeOptions = [
    'Redondo',
    'Cuadrado',
    'Rectangular',
    'Media luna',
    'Estrella',
    'Numero'
];

export default function Home({ auth, products }) {

    const [shoppingCart, setshoppingCart] = useState([]);
    const [shoppingCartBackup, setshoppingCartBackup] = useState([])

    const [customProduct, setCustomProduct] = useState(customProductDetaultValue)
    const [openDialog, setOpenDialog] = useState(false);
    const [showPaymentModal, setShowPaymentModal] = useState(false);

    const ref = useRef(null)
    const isVisible = useOnScreen(ref)


    const [total, setTotal] = useState(0);


    const handleAddToCart = (product) => {
        setshoppingCart([...shoppingCart, { ...customProductDetaultValue, ...product }]);
    }

    const handleCustomProduct = (product) => {
        setCustomProduct({ ...product, extraIngredients: [], multiplier: 1 });
        setshoppingCartBackup(shoppingCart);
        setOpenDialog(true);
    }

    const handleCancelCustomProduct = () => {
        setOpenDialog(false);
        setshoppingCart(shoppingCartBackup)
        setCustomProduct(customProductDetaultValue);
    }

    const handleAddIngredient = (ingredient) => {
        setCustomProduct((prev) => ({ ...prev, extraIngredients: [...prev.extraIngredients, ingredient], price: prev.price + ingredient.price }))
    }

    const handleRemoveIngredient = (ingredient) => {
        setCustomProduct((prev) => ({ ...prev, extraIngredients: prev.extraIngredients.filter(({ id }) => id !== ingredient.id), price: prev.price - ingredient.price }))
    }

    const handleAddCustomProduct = () => {
        setOpenDialog(false);
        setshoppingCart([...shoppingCart, customProduct]);
        setCustomProduct(customProductDetaultValue);
    }

    const calculateTotal = () => {
        console.log("shoppingCart", shoppingCart);
        let total = 0;
        shoppingCart.forEach(product => {
            total += product.price * product.multiplier;
        });
        setTotal(total ?? 0);
    }

    useEffect(calculateTotal, [shoppingCart])




    return (
        <AuthenticatedLayout
            user={auth.user}
        >
            <Head title="Inicio" />

            {
                (shoppingCart.length > 0 && !isVisible) && (<button title="Contact Sale" onClick={() => setShowPaymentModal(true)} style={{ zIndex: 9999 }}
                    className="fixed z-999 bottom-10 right-8 bg-violet-400 w-40 h-20 rounded-lg  drop-shadow-lg flex flex-col justify-center items-center text-white ">
                    <div className='text-1xl' > {shoppingCart.length} &nbsp; <span>&#128722;</span> </div>
                    <div className='text-2xl'> {formatCurrency(total)} </div>
                </button>)
            }
            <div >
                <div className="mb-6">
                    <div className='flex justify-between items-center mb-4' ref={ref}>
                        <h1 className="font-semibold text-xl text-gray-800 leading-tight mb-10">Productos</h1>
                        <div className='flex gap-4 items-center'>
                            <div className='text-1xl' > {shoppingCart.length} &nbsp; <span>&#128722;</span> </div>
                            <div className='text-2xl'> {formatCurrency(total)} </div>
                        </div>
                        <Button color='indigo' disabled={shoppingCart.length === 0} onClick={() => setShowPaymentModal(true)}>Generar pedido</Button>
                    </div>
                    <div className="grid grid-cols-3 md:grid-cols-3 sm:grid-cols-1 gap-x-10 gap-y-5">
                        {products.map(({ id, name, description, price, img }, index) => (
                            <Card className="mt-6 w-96" key={id}>
                                <CardHeader color="blue-gray" className="relative h-56">
                                    <img src={`/images/${img}`} alt="img-blur-shadow" layout="fill" />
                                </CardHeader>
                                <CardBody style={{ maxHeight: 300, minHeight: 250, height: 250 }}>
                                    <div className='flex justify-between'>
                                        <Typography variant="h5" color="blue-gray" className="mb-2">
                                            {name}
                                        </Typography>
                                        <Typography variant="h5" color="blue-gray" className="mb-2">
                                            {formatCurrency(price)}
                                        </Typography>
                                    </div>
                                    <Typography >
                                        {description}
                                    </Typography>
                                </CardBody>
                                <CardFooter className="pt-0 flex flex-col gap-2 justify-between items-center">
                                    <Button className='w-8/12' color='indigo' onClick={() => handleAddToCart(products[index])}>Agregar al carrito</Button>
                                    <Button className='w-8/12' color='indigo' onClick={() => handleCustomProduct(products[index])} >Personalizar</Button>
                                </CardFooter>
                            </Card>
                        ))}
                    </div>

                </div>
            </div>

            <Dialog open={openDialog} /* handler={handleOpen} */>
                <DialogHeader>{customProduct.name}</DialogHeader>
                <DialogBody divider>


                    <div className="flex flex-col mb-5">
                        <Select label="Selecciona el tamaño" value={customProduct.multiplier} onChange={(value) => setCustomProduct((prev) => ({ ...prev, multiplier: Number(value) }))}>
                            {
                                sizeOptions.map(({ label, value }) => (
                                    <Option key={value} value={value}>{label}</Option>
                                ))
                            }
                        </Select>
                    </div>

                    <div className="flex flex-col mb-5">
                        <Select label="Selecciona forma del pastel" value={customProduct.type} onChange={(value) => setCustomProduct((prev) => ({ ...prev, type: value }))}>
                            {
                                typeOptions.map((type) => (
                                    <Option key={type} value={type}>{type}</Option>
                                ))
                            }
                        </Select>
                    </div>

                    {
                        customProduct?.ingredients.length > 0 && <>
                            <Typography>
                                Elige los ingredientes que deseas agregar a tu producto
                            </Typography>

                            <List>
                                {
                                    customProduct?.ingredients.map(({ id, name, price }, index) => (

                                        <ListItem key={id}>
                                            <div className='flex justify-between w-full'>
                                                <Typography>{name}</Typography>
                                                <div className='flex gap-4 items-center'>
                                                    <Typography className="text-violet-600 font-bold">
                                                        ${price}
                                                        {
                                                            customProduct.multiplier > 1 && (
                                                                <>
                                                                    <span className=''> x {customProduct.multiplier}</span>
                                                                    <span className=''> = ${price * customProduct.multiplier}</span>
                                                                </>
                                                            )

                                                        }
                                                    </Typography>
                                                    {
                                                        customProduct.extraIngredients.map(({ id }) => id).includes(id) ? (
                                                            <Button color='red' onClick={() => handleRemoveIngredient(customProduct?.ingredients[index])}>Quitar</Button>
                                                        ) : (
                                                            <Button color='indigo' onClick={() => handleAddIngredient(customProduct?.ingredients[index])}>Agregar</Button>
                                                        )
                                                    }
                                                </div>
                                            </div>
                                        </ListItem>
                                    ))
                                }
                            </List>
                        </>
                    }
                    <div className='flex justify-end gap-5 px-4 mt-10'>
                        <Typography className="font-bold text-black">
                            TOTAL:
                        </Typography>
                        <Typography className="font-bold text-black">
                            {formatCurrency(customProduct.price * customProduct.multiplier)}
                        </Typography>
                    </div>
                </DialogBody>
                <DialogFooter>
                    <Button
                        variant="text"
                        onClick={handleCancelCustomProduct}
                        className="mr-1"
                    >
                        <span>Cancelar</span>
                    </Button>
                    <Button color="indigo" onClick={handleAddCustomProduct}>
                        <span>Confirmar</span>
                    </Button>
                </DialogFooter>
            </Dialog>
            <Pago isVisible={showPaymentModal} onClose={() => setShowPaymentModal(false)} shoppingCart={shoppingCart} setShoppingCart={setshoppingCart} total={total} />
        </AuthenticatedLayout >
    );
}
