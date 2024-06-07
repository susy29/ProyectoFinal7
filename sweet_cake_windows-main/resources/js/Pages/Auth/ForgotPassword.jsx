import GuestLayout from '@/Layouts/GuestLayout';
import InputError from '@/Components/InputError';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import { Head, useForm, Link } from '@inertiajs/react';
import InputLabel from '@/Components/InputLabel';


export default function ForgotPassword({ status, passwordHint, message }) {
    const { data, setData, post, processing, errors } = useForm({
        email: '',
        username: ''
    });

    const submit = (e) => {
        e.preventDefault();

        post(route('password.email'));
    };

    if (message) {
        return (
            <GuestLayout>
                <Head title="Forgot Password" />
                <div className='flex flex-col items-center'>
                    <div className="mb-4 text-sm text-gray-600">
                        {message}
                    </div>
                    {/* Add a link to login page */}
                    <div className='mt-8'>
                        <Link
                            href={route('login')}
                            className="underline text-sm text-gray-600 hover:text-gray-900 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                        >
                            Iniciar Sesión
                        </Link>
                    </div>
                </div>
            </GuestLayout >

        );
    }

    return (
        <GuestLayout>
            <Head title="Forgot Password" />
            {
                passwordHint && <div className='flex flex-col items-center'>
                    <div className="mb-4 text-sm text-gray-600">
                        Su contraseña es
                    </div>
                    <div className="mb-4 font-medium text-sm text-green-600">{passwordHint}</div>
                    {/* Add a link to login page */}
                    <div className='mt-8'>
                        <Link
                            href={route('login')}
                            className="underline text-sm text-gray-600 hover:text-gray-900 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                        >
                            Iniciar Sesión
                        </Link>
                    </div>
                </div>
            }

            {

                !passwordHint && <>
                    <div className="mb-4 text-sm text-gray-600">
                        Ingresa tu nombre de usuario y correo electrónico para recuperar tu contraseña
                    </div>


                    <form onSubmit={submit}>
                        <InputLabel htmlFor="email" value="Nombre de usuario" />
                        <TextInput
                            id="username"
                            type="text"
                            name="username"
                            value={data.username}
                            className="mt-1 block w-full"
                            isFocused={true}
                            onChange={(e) => setData('username', e.target.value)}
                        />

                        <InputError message={errors.email} className="mt-2" />

                        <div className='mt-4'>
                            <InputLabel htmlFor="email" value="Correo electronico" />
                            <TextInput
                                id="email"
                                type="email"
                                name="email"
                                value={data.email}
                                className="mt-1 block w-full"
                                onChange={(e) => setData('email', e.target.value)}
                            />
                        </div>

                        <div className="flex items-center justify-end mt-5">
                            <PrimaryButton className="ml-4" disabled={processing}>
                                Recuperar contraseña
                            </PrimaryButton>
                        </div>
                    </form></>
            }
        </GuestLayout >
    );
}
