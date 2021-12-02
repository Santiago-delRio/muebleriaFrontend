import axios from 'axios';
import Link from "next/link"
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react';
import ordenStyles from "./orden.module.scss"
import Head from 'next/head'

const Orden = ({ orden, clientes, muebles, ordenMuebles }) => {

    const [mueblesComprados, setMueblesComprados] = useState([])

    const router = useRouter()

    //Cargar el nombre de los muebles comprados
    useEffect(()=>{
        ordenMuebles.map((mueble)=>{
            const nombre = muebles.find(muebleReferencia => muebleReferencia.id_mueble == mueble.id_mueble);
            setMueblesComprados(prevArray => [...prevArray, {nombre:nombre.nombre, cantidad:mueble.cantidad }]);
        })
    },[ordenMuebles,muebles])

    const borrarOrden = () =>{

        axios.delete('https://muebleria-api.herokuapp.com/ordenes', {
            data: {
                numero: orden.numero
            }
        }).catch(function (error) {
            console.log(error);
        });

        alert("Orden eliminada con éxito")
        router.push("/ordenes")
    }

    return (
        <div className={ordenStyles.mostrarOrdenContainer}>
            <Head>
                <title>Mueblería - Orden {orden.numero}</title>
            </Head>
            <nav>
                <Link href="/ordenes">
                    <a>
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M13.293 6.293 7.586 12l5.707 5.707 1.414-1.414L10.414 12l4.293-4.293z"></path></svg>
                    </a>
                </Link>
            </nav>
            {/* Titulo pagina */}
            <h1 className={ordenStyles.titulo}>Número de orden: {orden.numero}</h1>
            {/* Contenedor de todas las secciones con informacion */}
            <div className={ordenStyles.infoContainer}>
                {/* Info entrega */}
                <div className={ordenStyles.infoEntrega}>
                    {/* Header */}
                    <div className={ordenStyles.header}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 24 24"><path d="M12 14c2.206 0 4-1.794 4-4s-1.794-4-4-4-4 1.794-4 4 1.794 4 4 4zm0-6c1.103 0 2 .897 2 2s-.897 2-2 2-2-.897-2-2 .897-2 2-2z"></path><path d="M11.42 21.814a.998.998 0 0 0 1.16 0C12.884 21.599 20.029 16.44 20 10c0-4.411-3.589-8-8-8S4 5.589 4 9.995c-.029 6.445 7.116 11.604 7.42 11.819zM12 4c3.309 0 6 2.691 6 6.005.021 4.438-4.388 8.423-6 9.73-1.611-1.308-6.021-5.294-6-9.735 0-3.309 2.691-6 6-6z"></path></svg>
                        <h1 className={ordenStyles.tituloHeader}>Entrega</h1>
                    </div>
                    <p>Fecha de compra: {orden.fechaCompra}</p>
                    <p>Fecha de entrega estimada: {orden.fechaEntrega}</p>
                    <p>Provincia: {orden.provinciaEntrega}</p>
                    <p>Localidad: {orden.localidadEntrega}</p>
                    <p>Calle: {orden.calleEntrega}</p>
                </div>
                {/* Info muebles */}
                <div className={ordenStyles.infoMuebles}>
                    {/* Header */}
                    <div className={ordenStyles.header}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 24 24"><path d="M21.822 7.431A1 1 0 0 0 21 7H7.333L6.179 4.23A1.994 1.994 0 0 0 4.333 3H2v2h2.333l4.744 11.385A1 1 0 0 0 10 17h8c.417 0 .79-.259.937-.648l3-8a1 1 0 0 0-.115-.921zM17.307 15h-6.64l-2.5-6h11.39l-2.25 6z"></path><circle cx="10.5" cy="19.5" r="1.5"></circle><circle cx="17.5" cy="19.5" r="1.5"></circle></svg>
                        <h1 className={ordenStyles.tituloHeader}>Muebles</h1>
                    </div>
                    {/* Muebles comprados */}
                    <div className={ordenStyles.mueblesComprados}>
                        {mueblesComprados.map((mueble)=>(
                            <p key={mueble.id}>x{mueble.cantidad} {mueble.nombre}</p>
                        ))}
                    </div>
                    {/* Precio final */}
                    <p>Precio final: <span>${orden.importe}</span></p>
                </div>
                {/* Info cliente */}
                <div className={ordenStyles.infoCliente}>
                    {/* Header */}
                    <div className={ordenStyles.header}>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="36" height="36"><path d="M12 2a5 5 0 1 0 5 5 5 5 0 0 0-5-5zm0 8a3 3 0 1 1 3-3 3 3 0 0 1-3 3zm9 11v-1a7 7 0 0 0-7-7h-4a7 7 0 0 0-7 7v1h2v-1a5 5 0 0 1 5-5h4a5 5 0 0 1 5 5v1z"></path></svg>
                        <h1 className={ordenStyles.tituloHeader}>Cliente</h1>
                    </div>
                    <p>Nombre: {clientes.filter(e => e.id_cliente == orden.cliente)[0].nombre}</p>
                    <p>Teléfono: {clientes.filter(e => e.id_cliente == orden.cliente)[0].telefono}</p>
                </div>
            </div>
            <button className={ordenStyles.btnBorrarOrden} onClick={borrarOrden}>
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M6 7H5v13a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V7H6zm10.618-3L15 2H9L7.382 4H3v2h18V4z"></path></svg>
                Borrar orden
            </button>
        </div>
    );
}
 
export default Orden;


export async function getStaticPaths(){

    const ordenesResponse  = await axios.get(`https://${process.env.SERVER_IP}/ordenes`);

    const ordenes = ordenesResponse.data

    const paths = ordenes.map((orden)=>({
        params: {slug: orden.slug}
    }))

    return{
        paths,
        fallback: 'blocking'
    }
}

export async function getStaticProps({params}){

    const {slug} = params;

    try{
        const ordenResponse  = await axios.get(`https://${process.env.SERVER_IP}/ordenes/${slug}`);
        
        const mueblesResponse  = await axios.get(`https://${process.env.SERVER_IP}/muebles`);
        const clientesResponse  = await axios.get(`https://${process.env.SERVER_IP}/clientes`);

        const data = ordenResponse.data
        const orden = data[0][0];
        const ordenMuebles = data[1];
        const muebles = mueblesResponse.data
        const clientes = clientesResponse.data

        //Cambiar formato de las fechas
        const regexFormato = /(202\d)-(\d\d)-(\d\d)/
        const regexFechaHora = /T\d\d:\d\d:\d\d.\d\d\d\w/

        orden.fechaCompra = orden.fechaCompra.replace(regexFechaHora, '')
        orden.fechaCompra = orden.fechaCompra.replace(regexFormato, '$3/$2/$1')

        orden.fechaEntrega = orden.fechaEntrega.replace(regexFechaHora, '')
        orden.fechaEntrega = orden.fechaEntrega.replace(regexFormato, '$3/$2/$1')
       
        return{
            props: { orden, clientes, muebles, ordenMuebles },
            revalidate: 10,
        }

    }catch(error){
        return{
            notFound: true
        }
    }

}