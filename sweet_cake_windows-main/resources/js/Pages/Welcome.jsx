import { Link, Head } from '@inertiajs/react';
import ApplicationLogo from '../Components/ApplicationLogo';

export default function Welcome({ auth, laravelVersion, phpVersion }) {
    return (
        <>
            <Head title="Welcome" />

            <div className="flex justify-center align-middle w-full  h-screen bg-violet-600 pt-20">
                <div className='flex flex-col pl-10 w-6/12 py-24'>
                    <ApplicationLogo />
                    <h1 className="text-4xl font-bold text-center  mt-5 text-white " >Sweet Cake</h1>
                </div>

                <div className="w-6/12 rounded-lg lg:rounded-l-none">

                    <div className="rounded-lg shadow-lg bg-white w-8/12 flex flex-row items-center  justify-center h-4/5">
                        <div className="px-4 py-4">
                            <h1 className="text-3xl font-bold text-center mb-10">Bienvenido</h1>
                            <p className="text-center text-gray-600 mt-5 mb-10">Inicia sesión para continuar</p>

                            <div className="flex flex-col mt-5 gap-5 justify-center items-center mb-10">
                                <Link href={route('login')} className="px-4 py-2 bg-violet-600 text-white rounded-md focus:outline-none w-60 text-center">Iniciar sesión</Link>
                                <Link href={route('register')} className="px-4 py-2 bg-violet-600 text-white rounded-md focus:outline-none text-center w-60">Registrarse</Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>


        </>
    );
}
