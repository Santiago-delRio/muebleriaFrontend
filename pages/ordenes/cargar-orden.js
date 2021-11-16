import axios from 'axios';
import Link from "next/link"
import { useRouter } from 'next/router'
import { useRef, useState } from 'react';
import cargarOrdenStyles from "./cargarOrden.module.scss"
import Head from 'next/head'

const CargarOrden = ({ muebles, clientes }) => {

    const router = useRouter()

    //===== Refs
    const inputFechaCompra = useRef()
    const inputFechaEntrega = useRef()
    const inputProvincia = useRef()
    const inputLocalidad = useRef()
    const inputCalle = useRef()
    const inputCliente = useRef()
    const cargarMuebles = useRef()
    
    //===== States
    const [inputFechaCompraVacio, setInputFechaCompraVacio] = useState()
    const [inputFechaEntregaVacio, setInputFechaEntregaVacio] = useState()
    const [inputProvinciaVacio, setInputProvinciaVacio] = useState()
    const [inputLocalidadVacio, setInputLocalidadVacio] = useState()
    const [inputCalleVacio, setInputCalleVacio] = useState()

    const guardarCambios = () =>{

        let camposVacios = false

        // Verificar que no se hayan dejado campos sin completar
        if( inputFechaCompra.current.value == ""){
            setInputFechaCompraVacio(true)
            camposVacios = true
        }
        if( inputFechaEntrega.current.value == "" ){
            setInputFechaEntregaVacio(true)
            camposVacios = true
        }
        if( inputProvincia.current.value == "" ){
            setInputProvinciaVacio(true)
            camposVacios = true
        }
        if( inputLocalidad.current.value == "" ){
            setInputLocalidadVacio(true)
            camposVacios = true
        }
        if( inputCalle.current.value == ""){
            setInputCalleVacio(true)
            camposVacios = true
        }
        
        //Avisar de los campos vacios
        if(camposVacios == true){
            alert("Error - No puede dejar los campos resaltados sin completar")
            return 
        }

        const mueblesCompradosData = Array.from(document.querySelectorAll(".selectMuebles"))
        const mueblesComprados = []
        let importeFinal = 0;

        mueblesCompradosData.map((mueble, index)=>{
            if(index == 0){
                //saltear si no se selecciona un combo
                if(mueble.children[1].lastChild.value == 0) {return}

                mueblesComprados.push({
                    mueble: mueble.firstChild.lastChild.value,
                    cantidad: mueble.children[1].lastChild.value
                })
            }else{
                if(mueble.lastChild.value == 0){ return }
                mueblesComprados.push({
                    mueble:mueble.firstChild.value,
                    cantidad: mueble.lastChild.value
                })
            }
        })

        //Calcular importe final
        mueblesComprados.map((mueble)=>{
            const muebleReferencia = muebles.filter( (muebleReferencia) => muebleReferencia.id_mueble == mueble.mueble)
            importeFinal += (mueble.cantidad * muebleReferencia[0].precio)
        })

        const datosOrden = {
            fechaCompra: inputFechaCompra.current.value,
            fechaEntrega: inputFechaEntrega.current.value,
            provincia: inputProvincia.current.value,
            localidad: inputLocalidad.current.value,
            calleEntrega: inputCalle.current.value,
            cliente: inputCliente.current.value,
            muebles: mueblesComprados,
            importe: importeFinal
        
        }

        axios.post('http://159.223.185.153:1337/ordenes', datosOrden, {
            headers: {
                'Content-Type': 'application/json',
            }
        }).catch(function (error) {
            console.log(error);
        });

        alert("Compra guardada con éxito")
        //Refrescar la pagina
        router.reload(window.location.pathname)
    }

    return (
        <div className={cargarOrdenStyles.cargarOrdenContainer}>
            <Head>
                <title>Mueblería - Cargar orden</title>
            </Head>
            <nav>
                <Link href="/ordenes">
                    <a>
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M13.293 6.293 7.586 12l5.707 5.707 1.414-1.414L10.414 12l4.293-4.293z"></path></svg>
                    </a>
                </Link>
            </nav>
            {/* Titulo página */}
            <h1 className={cargarOrdenStyles.titulo}>Nueva compra</h1>
            {/* Contenedor de todas las secciones para cargar info */}
            <div className={cargarOrdenStyles.cargarInfoContainer}>
                {/* Cargar datos de entrega */}
                <div className={cargarOrdenStyles.cargarEntrega}>
                    {/* Header */}
                    <div className={cargarOrdenStyles.header}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 24 24"><path d="M12 14c2.206 0 4-1.794 4-4s-1.794-4-4-4-4 1.794-4 4 1.794 4 4 4zm0-6c1.103 0 2 .897 2 2s-.897 2-2 2-2-.897-2-2 .897-2 2-2z"></path><path d="M11.42 21.814a.998.998 0 0 0 1.16 0C12.884 21.599 20.029 16.44 20 10c0-4.411-3.589-8-8-8S4 5.589 4 9.995c-.029 6.445 7.116 11.604 7.42 11.819zM12 4c3.309 0 6 2.691 6 6.005.021 4.438-4.388 8.423-6 9.73-1.611-1.308-6.021-5.294-6-9.735 0-3.309 2.691-6 6-6z"></path></svg>
                        <h1 className={cargarOrdenStyles.tituloHeader}>Entrega</h1>
                    </div>
                    {/* Fechas */}
                    <div className={cargarOrdenStyles.fechas}>
                        {/* Fecha de compra */}
                        <div className={inputFechaCompraVacio ? [cargarOrdenStyles.fechaCompra, cargarOrdenStyles.inputVacio].join(" ") : cargarOrdenStyles.fechaCompra}>
                            <h2>Fecha de compra:</h2>
                            <input
                                type="date" 
                                name="datePicker"
                                min="2021-01-01" 
                                max="2021-12-31"
                                ref={inputFechaCompra}
                                onChange={()=>{
                                    (inputFechaCompraVacio ? setInputFechaCompraVacio(false) : "")
                                }}>
                            </input>
                        </div>
                        {/* Fecha de entrega */}
                        <div className={inputFechaEntregaVacio ? [cargarOrdenStyles.fechaEntrega, cargarOrdenStyles.inputVacio].join(" ") : cargarOrdenStyles.fechaEntrega}>
                            <h2>Fecha de entrega estimada:</h2>
                            <input
                                type="date" 
                                name="datePicker"
                                min="2021-01-01" 
                                max="2021-12-31"
                                ref={inputFechaEntrega}
                                onChange={()=>{
                                    (inputFechaEntregaVacio ? setInputFechaEntregaVacio(false) : "")
                                }}>
                            </input>
                        </div>
                    </div>
                    {/* Provincia */}
                    <div className={inputProvinciaVacio ? [cargarOrdenStyles.provincia, cargarOrdenStyles.inputVacio].join(" ") : cargarOrdenStyles.provincia}>
                        <h2>Provincia:</h2>
                        <input type="text" ref={inputProvincia} onChange={()=>{
                            (inputProvinciaVacio ? setInputProvinciaVacio(false) : "")
                        }}/>
                    </div>
                    {/* Localidad */}
                    <div className={inputLocalidadVacio ? [cargarOrdenStyles.localidad, cargarOrdenStyles.inputVacio].join(" ") : cargarOrdenStyles.localidad}>
                        <h2>Localidad:</h2>
                        <input type="text" ref={inputLocalidad} onChange={()=>{
                            (inputLocalidadVacio ? setInputLocalidadVacio(false) : "")
                        }}/>
                    </div>
                    {/* Calle */}
                    <div className={inputCalleVacio ? [cargarOrdenStyles.calle, cargarOrdenStyles.inputVacio].join(" ") : cargarOrdenStyles.calle}>
                        <h2>Calle:</h2>
                        <input type="text" ref={inputCalle} onChange={()=>{
                            (inputCalleVacio ? setInputCalleVacio(false) : "")
                        }}/>
                    </div>
                </div>
                {/* Cargar muebles comprados */}
                <div className={cargarOrdenStyles.cargarMuebles} ref={cargarMuebles}>
                    {/* Header */}
                    <div className={cargarOrdenStyles.header}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 24 24"><path d="M21.822 7.431A1 1 0 0 0 21 7H7.333L6.179 4.23A1.994 1.994 0 0 0 4.333 3H2v2h2.333l4.744 11.385A1 1 0 0 0 10 17h8c.417 0 .79-.259.937-.648l3-8a1 1 0 0 0-.115-.921zM17.307 15h-6.64l-2.5-6h11.39l-2.25 6z"></path><circle cx="10.5" cy="19.5" r="1.5"></circle><circle cx="17.5" cy="19.5" r="1.5"></circle></svg>
                        <h1 className={cargarOrdenStyles.tituloHeader}>Muebles</h1>
                    </div>
                    <div className={[cargarOrdenStyles.selectMuebles, "selectMuebles"].join(" ")}>
                        {/* Nombre */}
                        <div className={cargarOrdenStyles.selectNombre}>
                            <h2>Nombre</h2>
                            <select name="inputMueble" className="inputMueble">
                                {muebles.map((mueble)=>(
                                    <option value={mueble.id_mueble} key={mueble.id_mueble}>{mueble.nombre}</option>    
                                ))}
                            </select>
                        </div>
                        {/* Cantidad */}
                        <div className={cargarOrdenStyles.inputCantidad}>
                            <h2>Cantidad</h2>
                            <input type="number" min="1" max= "10" defaultValue="1"/>
                        </div>
                        {/* boton para agregar mas muebles */}
                        <button className={cargarOrdenStyles.btnAgregarMueble} onClick={()=>{
                            const select = document.createElement("select")
                            select.className = "inputMueble"

                            muebles.map((mueble)=>{
                                select.options.add(new Option(mueble.nombre, mueble.id_mueble))
                            })
                            select.options.add(new Option("Seleccione una opción", 0, true, true))

                            const inputCant = document.createElement("input")
                            inputCant.type = "number"
                            inputCant.min = "1"
                            inputCant.max = "10"
                            inputCant.defaultValue = "1"

                            const selectMuebles = document.createElement("div")
                            selectMuebles.className = [cargarOrdenStyles.selectMuebles, "selectMuebles"].join(" ")

                            selectMuebles.append(select, inputCant)
                            cargarMuebles.current.append(selectMuebles)

                        }}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M19 11h-6V5h-2v6H5v2h6v6h2v-6h6z"></path></svg>
                        </button>
                    </div>
                </div>
                {/* Cargar el cliente */}
                <div className={cargarOrdenStyles.cargarCliente}>
                    {/* Header */}
                    <div className={cargarOrdenStyles.header}>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="36" height="36"><path d="M12 2a5 5 0 1 0 5 5 5 5 0 0 0-5-5zm0 8a3 3 0 1 1 3-3 3 3 0 0 1-3 3zm9 11v-1a7 7 0 0 0-7-7h-4a7 7 0 0 0-7 7v1h2v-1a5 5 0 0 1 5-5h4a5 5 0 0 1 5 5v1z"></path></svg>
                        <h1 className={cargarOrdenStyles.tituloHeader}>Cliente</h1>
                    </div>
                    {/* Nombre */}
                    <select name="selectCliente" ref={inputCliente}>
                        {clientes.map((cliente)=>(
                            <option value={cliente.id_cliente} key={cliente.id_cliente}>{cliente.nombre}</option>    
                        ))}
                    </select>
                </div>
            </div>
            {/* Boton para guardar la orden */}
            <button className={cargarOrdenStyles.btnGuardarCambios} onClick={guardarCambios}>
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="m10 15.586-3.293-3.293-1.414 1.414L10 18.414l9.707-9.707-1.414-1.414z"></path></svg>
                Guardar cambios
            </button>
        </div>
    );
}
 
export default CargarOrden;


// Fetch muebles
export async function getStaticProps(){

    const mueblesResponse  = await axios.get(`http://${process.env.SERVER_IP}/muebles`);
    const clientesResponse  = await axios.get(`http://${process.env.SERVER_IP}/clientes`);

    const muebles = mueblesResponse.data
    const clientes = clientesResponse.data

    return{
        props: { muebles, clientes },
        revalidate: 10,
    }
}
  