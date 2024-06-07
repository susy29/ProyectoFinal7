import React, { useEffect, useState } from 'react'
import {
    Typography,
    Button,
    Dialog,
    DialogHeader,
    DialogBody,
    DialogFooter,
    List,
    ListItem,
    Stepper, Step, IconButton, Card, CardBody, Radio
} from "@material-tailwind/react";
import { XMarkIcon, ArchiveBoxIcon, ListBulletIcon, Bars2Icon, BanknotesIcon } from "@heroicons/react/24/outline";
import { cleanUpProducts, formatCurrency } from '../../Utils';
import { useMemo } from 'react';
import { useForm } from '@inertiajs/inertia-react';
import moment from 'moment';


const TiposDeEnvio = {
    DOMICILIO: 1,
    SUCURSAL: 2
}

const TiposDePago = {
    EFECTIVO: 1,
    TARJETA: 2
}

const deliveryTimes = [
    '6:00',
    '6:30',
    '7:00',
    '7:30',
    '8:00',
    '8:30',
    '9:00',
    '9:30',
    '10:00',
    '10:30',
    '11:00',
    '11:30',
    '12:00',
    '12:30',
    '13:00',
    '13:30',
    '14:00',
    '14:30',
    '15:00',
    '15:30',
    '16:00',
    '16:30',
    '17:00',
    '17:30',
    '18:00',
    '18:30',
    '19:00',
    '19:30',
    '20:00',
]

export const getSize = (multiplier) => {
    switch (multiplier) {
        case 1:
            return '20 personas'
        case 1.5:
            return '30 personas'
        case 2:
            return '40 personas'
        case 2.5:
            return '50 personas'
        default:
            return '20 personas'
    }
}


const Summary = ({ shoppingCart, setShoppingCart }) => {

    const handleRemoveItem = (index) => {
        const newShoppingCart = [...shoppingCart]
        newShoppingCart.splice(index, 1)
        setShoppingCart(newShoppingCart)
    }

    return <>

        <Typography color="gray" className="font-bold px-5 text-lg mb-5">Resumen de pedido</Typography>
        <div className="overflow-scroll" style={{ maxHeight: 350 }}>
            <List>
                {
                    shoppingCart.map((item, index) => (
                        <ListItem key={index} className='mb-5'>
                            <Card className='w-full'>
                                <CardBody>
                                    <div className='flex flex-col w-full'>
                                        <div className='flex justify-between w-full mb-5' >
                                            <Typography color="gray" className="font-bold text-lg">{item.name}</Typography>
                                            <Typography color="gray" className="font-bold text-lg">{formatCurrency(item.price * item.multiplier)}</Typography>

                                            <div>
                                                <IconButton color='red' onClick={() => handleRemoveItem(index)}>
                                                    <XMarkIcon className="h-5 w-5" />
                                                </IconButton>
                                            </div>
                                        </div>
                                        <div>
                                            <span className='font-bold'>Tamaño:</span> {getSize(item.multiplier)}
                                        </div>
                                        <div className='mt-5'>
                                            <span className='font-bold'>Forma:</span> {item.type}
                                        </div>
                                        {
                                            item.extraIngredients.length > 0 && <div className='mt-5'>
                                                <h3 className='font-bold mb-3'>Ingredientes extra</h3>
                                                <ul>
                                                    {
                                                        item.extraIngredients.map((ingredient, index) => (
                                                            <li key={index}>
                                                                {ingredient.name} + {formatCurrency(ingredient.price * item.multiplier)}
                                                            </li>
                                                        ))}
                                                </ul>
                                            </div>
                                        }
                                    </div>
                                </CardBody>
                            </Card>
                        </ListItem>
                    ))
                }
            </List>
        </div>
    </>;

}


const TipoDeEnvio = ({ tipoEnvio, setTipoEnvio }) => {
    return <>
        <Typography color="gray" className="font-bold px-5 text-lg mb-5">Tipo de envío</Typography>
        <div className='flex flex-col px-5'>
            <div className='flex flex-col mb-5 gap-4'>
                <Radio name='tipoEnvio' checked={tipoEnvio === TiposDeEnvio.SUCURSAL} onClick={() => setTipoEnvio(TiposDeEnvio.SUCURSAL)} value={TiposDeEnvio.SUCURSAL} label="Recoger en sucursal" />
                <Radio name='tipoEnvio' checked={tipoEnvio === TiposDeEnvio.DOMICILIO} onClick={() => setTipoEnvio(TiposDeEnvio.DOMICILIO)} value={TiposDeEnvio.DOMICILIO} label="Envio a domicilio" />
            </div>
        </div>
    </>
}

const TipoDePago = ({ tipoPago, setTipoPago }) => {
    return <>
        <Typography color="gray" className="font-bold px-5 text-lg mb-5">Tipo de pago</Typography>
        <div className='flex px-5'>
            <div className='flex mb-5 gap-4'>
                <Radio name='tipoPago' checked={tipoPago === TiposDePago.EFECTIVO} onClick={() => setTipoPago(TiposDePago.EFECTIVO)} value={TiposDePago.EFECTIVO} label="Pago en efectivo" />
                <Radio name='tipoPago' checked={tipoPago === TiposDePago.TARJETA} onClick={() => setTipoPago(TiposDePago.TARJETA)} value={TiposDePago.TARJETA} label="Pago con tarjeta" />
            </div>
        </div>
    </>
}

const FormTipoDeEnvio = ({ tipoEnvio, localForm, setLocalForm }) => {

    if (tipoEnvio === TiposDeEnvio.SUCURSAL) {
        return <div>
            <Typography color="gray" className="font-bold px-5 text-lg mb-5">Datos de entrega</Typography>

            <div className='flex flex-col px-5'>
                <div className='flex flex-col mb-5 gap-4'>
                    <label >Nombre del cliente</label>
                    <input type='text' value={localForm.clientName} onChange={(e) => setLocalForm({ ...localForm, clientName: e.target.value })} />
                </div>
                <div className='flex flex-col mb-5 gap-4'>
                    <label >Fecha de entrega</label>
                    <input type='date' value={localForm.date} onChange={(e) => setLocalForm({ ...localForm, date: e.target.value })} />
                </div>
                <div className='flex flex-col mb-5 gap-4'>
                    <label >Hora de entrega</label>
                    <select value={localForm.time} onChange={(e) => setLocalForm({ ...localForm, time: e.target.value })}>
                        {
                            deliveryTimes.map((time, index) => (
                                <option key={index} value={time}>{time}</option>
                            ))
                        }
                    </select>
                </div>
            </div>
        </div>
    }

    return <div>
        <Typography color="gray" className="font-bold px-5 text-lg mb-5">Datos de entrega</Typography>

        <div className='flex flex-col px-5'>
            <div className='flex flex-col mb-5 gap-4'>
                <label >Nombre del cliente</label>
                <input type='text' value={localForm.clientName} onChange={(e) => setLocalForm({ ...localForm, clientName: e.target.value })} />
            </div>
            <div className='flex flex-col mb-5 gap-4'>
                <label >Dirección</label>
                <input type='text' value={localForm.address} onChange={(e) => setLocalForm({ ...localForm, address: e.target.value })} />
            </div>
            {/* <div className='flex flex-col mb-5 gap-4'>
                <label >Telefono</label>
                <input type='text' value={localForm.phone} onChange={(e) => setLocalForm({ ...localForm, phone: e.target.value })} />
            </div> */}
            <div className='flex flex-col mb-5 gap-4'>
                <label >Fecha de entrega</label>
                <input type='date' value={localForm.date} onChange={(e) => setLocalForm({ ...localForm, date: e.target.value })} />
            </div>
            <div className='flex flex-col mb-5 gap-4'>
                <label >Hora de entrega</label>
                <select value={localForm.time} onChange={(e) => setLocalForm({ ...localForm, time: e.target.value })}>
                    {
                        deliveryTimes.map((time, index) => (
                            <option key={index} value={time}>{time}</option>
                        ))
                    }
                </select>
            </div>
        </div>
    </div>

}

const FormTipoDePago = ({ tipoPago, pagoForm, setPagoForm, errorsCard }) => {
    if (tipoPago === TiposDePago.EFECTIVO) {
        return null;
    }

    return <>
        <Typography color="gray" className="font-bold px-5 text-lg mb-5">Datos de pago</Typography>

        <div className='flex flex-col px-5 overflow-scroll' style={{ maxHeight: 200 }}>
            <div className='flex flex-col mb-5 gap-4'>
                <label >Número de tarjeta</label>
                <input type='text' value={pagoForm.cardNumber} onChange={(e) => setPagoForm({ ...pagoForm, cardNumber: e.target.value })} />
                <span className='text-red-600'>{errorsCard.messages.cardNumber}</span>
            </div>
            <div className='flex flex-col mb-5 gap-4'>
                <label >Nombre del titular</label>
                <input type='text' value={pagoForm.cardName} onChange={(e) => setPagoForm({ ...pagoForm, cardName: e.target.value })} />
                <span className='text-red-600'>{errorsCard.messages.cardName}</span>
            </div>
            <div className='flex flex-col mb-5 gap-4'>
                <label >Fecha de expiración</label>
                <input type='date' value={pagoForm.cardDate} onChange={(e) => setPagoForm({ ...pagoForm, cardDate: e.target.value })} />
                <span className='text-red-600'>{errorsCard.messages.cardDate}</span>
            </div>
            <div className='flex flex-col mb-5 gap-4'>
                <label >CVV</label>
                <input type='text' value={pagoForm.cardCvv} onChange={(e) => setPagoForm({ ...pagoForm, cardCvv: e.target.value })} />
                <span className='text-red-600'>{errorsCard.messages.cardCvv}</span>
            </div>
        </div>
    </>
}


const Pago = ({ isVisible, onClose, shoppingCart, total, setShoppingCart }) => {

    const [activeStep, setActiveStep] = useState(0)
    const [tipoEnvio, setTipoEnvio] = useState(TiposDeEnvio.SUCURSAL);
    const [tipoPago, setTipoPago] = useState(TiposDePago.EFECTIVO);
    const [localForm, setLocalForm] = useState({
        clientName: '',
        date: '',
        time: '6:00',
        address: '',
        /*  phone: '', */
    });


    const { data, setData, errors, post } = useForm({
        products: [],
        payment_method_type: '',
        payment_method_data: '',
        total: 0,
        delivery_data: '',
        delivery_type: '',
    });

    const [pagoForm, setPagoForm] = useState({
        cardNumber: '',
        cardName: '',
        cardDate: '',
        cardCvv: ''
    });

    const [errorsCard, setErrorsCard] = useState({
        messages: {
            cardNumber: '',
            cardName: '',
            cardDate: '',
            cardCvv: ''
        },
        hasErrors: false
    })


    useEffect(() => {
        if (isVisible) {
            setActiveStep(0);
            setTipoEnvio(TiposDeEnvio.SUCURSAL)
            setTipoPago(TiposDePago.EFECTIVO)
            setLocalForm({
                clientName: '',
                date: moment(new Date()).format('YYYY-MM-DD'),
                time: '6:00'
            })
            setData({
                products: JSON.stringify(shoppingCart),
                total: total,
            })
        }
    }, [isVisible])

    useEffect(() => {
        let hasErrors = false;
        let messages = {
            cardNumber: '',
            cardName: '',
            cardDate: '',
            cardCvv: ''
        }

        if (pagoForm.cardNumber.length !== 16) {
            messages.cardNumber = 'El número de tarjeta debe tener 16 dígitos';
            hasErrors = true;
        }

        if (isNaN(pagoForm.cardNumber)) {
            messages.cardNumber = 'El número de tarjeta debe ser un número';
            hasErrors = true;
        }


        if (pagoForm.cardName.length < 5) {
            messages.cardName = 'El nombre del titular debe tener al menos 5 caracteres';
            hasErrors = true;
        }

        if (pagoForm.cardDate === '') {
            messages.cardDate = 'La fecha de expiración es requerida';
            hasErrors = true;
        }

        if (isNaN(pagoForm.cardCvv)) {
            messages.cardCvv = 'El CVV debe ser un número';
            hasErrors = true;
        }

        if (pagoForm.cardCvv.length !== 3) {
            messages.cardCvv = 'El CVV debe tener 3 dígitos';
            hasErrors = true;
        }

        setErrorsCard({
            messages,
            hasErrors
        })





    }, [pagoForm])



    useEffect(() => {

        setData({
            products: JSON.stringify(cleanUpProducts(shoppingCart)),
            total: total,
            payment_method_type: tipoPago === TiposDePago.EFECTIVO ? 'Efectivo' : 'Tarjeta',
            payment_method_data: tipoPago === TiposDePago.EFECTIVO ? '' : JSON.stringify(pagoForm),
            delivery_type: tipoEnvio === TiposDeEnvio.SUCURSAL ? 'Sucursal' : 'Domicilio',
            delivery_data: JSON.stringify(localForm),
        })

    }, [shoppingCart, total, tipoPago, tipoEnvio, localForm, pagoForm])


    const handleSubmit = (e) => {
        e.preventDefault();
        post(route("orders.store"));
    }

    const handleNext = (e) => {
        e.preventDefault();

        if (activeStep === 0) {
            setActiveStep(1)
        }
        if (activeStep === 1) {
            setActiveStep(2)
        }

        if (activeStep === 2) {
            setActiveStep(3)
        }

        if (activeStep === 3) {
            setActiveStep(4)
        }
    }

    const handleBack = () => {
        setActiveStep(activeStep - 1)
    }

    const isLastStep = activeStep === 3;

    const renderCurrentStep = () => {
        switch (activeStep) {
            case 0:
                return <Summary shoppingCart={shoppingCart} setShoppingCart={setShoppingCart} />
            case 1:
                return <TipoDeEnvio tipoEnvio={tipoEnvio} setTipoEnvio={setTipoEnvio} />
            case 2:
                return <FormTipoDeEnvio tipoEnvio={tipoEnvio} localForm={localForm} setLocalForm={setLocalForm} />
            case 3:
                return <>
                    <TipoDePago tipoPago={tipoPago} setTipoPago={setTipoPago} />
                    <FormTipoDePago pagoForm={pagoForm} errorsCard={errorsCard} setPagoForm={setPagoForm} tipoPago={tipoPago} />
                </>;
        }
        return null;
    }

    const canGoNext = useMemo(() => {
        if (activeStep === 0) {
            return shoppingCart.length > 0
        }
        if (activeStep === 1) {
            return tipoEnvio !== null
        }
        if (activeStep === 2) {
            if (tipoEnvio === TiposDeEnvio.SUCURSAL) {
                return localForm.clientName !== '' && localForm.date !== '' && localForm.time !== ''
            }
            else {
                return localForm.clientName !== '' && localForm.date !== '' && localForm.time !== '' && localForm.address !== ''
            }
        }
        if (activeStep === 3) {

            if (tipoPago === TiposDePago.EFECTIVO) {
                return true;
            }

            return !errorsCard.hasErrors && pagoForm.cardNumber !== '' && pagoForm.cardName !== '' && pagoForm.cardDate !== '' && pagoForm.cardCvv !== '';
        }
        return false;
    }, [activeStep, tipoEnvio, localForm, shoppingCart, pagoForm, errorsCard, tipoPago]);



    return (
        <Dialog open={isVisible}  >
            <DialogHeader>
                <div className='flex justify-between w-full'>
                    <span>
                        Generar pedido
                    </span>
                    <span>
                        Total: {formatCurrency(total)}
                    </span>
                </div>
            </DialogHeader>
            <DialogBody divider>

                <div className='px-5 mb-5'>
                    <Stepper
                        activeStep={activeStep}

                    >
                        <Step onClick={() => setActiveStep(0)}>
                            <ListBulletIcon className="h-5 w-5" />
                        </Step>
                        <Step onClick={() => setActiveStep(1)}>
                            <ArchiveBoxIcon className="h-5 w-5" />
                        </Step>
                        <Step onClick={() => setActiveStep(2)}>
                            <Bars2Icon className="h-5 w-5" />
                        </Step>
                        <Step onClick={() => setActiveStep(3)}>
                            <BanknotesIcon className="h-5 w-5" />
                        </Step>
                    </Stepper>
                </div>

                {renderCurrentStep()}

            </DialogBody>
            <DialogFooter>
                <div className='w-full  flex justify-between'>
                    <Button
                        variant="text"
                        onClick={onClose}
                        className="mr-1"
                    >
                        <span>Cancelar</span>
                    </Button>
                    <div>
                        {
                            activeStep !== 0 && <Button variant="text" color="indigo" onClick={handleBack}>
                                Regresar
                            </Button>
                        }
                        <Button disabled={!canGoNext} variant={isLastStep ? 'filled' : 'text'} color="indigo" onClick={isLastStep ? handleSubmit : handleNext}>
                            <span>
                                {isLastStep ? 'Finalizar' : 'Siguiente'}
                            </span>
                        </Button>
                    </div>
                </div>
            </DialogFooter>
        </Dialog>
    )
}

export default Pago