import axios from 'axios';
import { useRef, useState } from 'react';
import { useRouter } from 'next/router'
import clientesStyles from "./clientes.module.scss"

const Clientes = ({ clientes }) => {

    const router = useRouter()

    //===== Refs
    const inputNombre = useRef()
    const inputTelefono = useRef()

    //===== States

    //Agregando un cliente
    const [agregarCliente, setAgregarCliente] = useState(false)
    //Editando un cleinte
    const [editarCliente, setEditarCliente] = useState(false)
    //Valores del cliente editado
    const [editarClienteNombre, setEditarClienteNombre] = useState()
    const [editarClienteTelefono, setEditarClienteTelefono] = useState()
    const [editarClienteId, setEditarClienteId] = useState()
    //Verificar si los inputs estan vacios
    const [inputNombreVacio, setInputNombreVacio] = useState()
    const [inputTelefonoVacio, setInputTelefonoVacio] = useState()


    const guardarCambios = () =>{

        let datosCliente = {}
        let camposVacios = false

        // Verificar que no se hayan dejado campos sin completar
        if( inputNombre.current.value == ""){
            setInputNombreVacio(true)
            camposVacios = true
        }
        if( inputTelefono.current.value == ""){
            setInputTelefonoVacio(true)
            camposVacios = true
        }

        //Avisar de los campos vacios
        if(camposVacios == true){
            alert("Error - No puede dejar los campos resaltados sin completar")
            return 
        }


        //Si esta agregando un cliente nuevo
        if(agregarCliente){
            datosCliente = {
                nombre: inputNombre.current.value,
                telefono: inputTelefono.current.value
            }

            axios.post('http://localhost:1337/clientes', datosCliente, {
                headers: {
                    'Content-Type': 'application/json',
                }
            }).catch(function (error) {
                console.log(error);
            });

            alert("Cliente guardado con éxito")
            //Refrescar la pagina
            router.reload(window.location.pathname)

        //Si está editando un cliente
        }else if(editarCliente){
            datosCliente = {
                nombre: inputNombre.current.value,
                telefono: inputTelefono.current.value,
                id: editarClienteId
            }

            axios.put('http://localhost:1337/clientes', datosCliente, {
                headers: {
                    'Content-Type': 'application/json',
                }
            }).catch(function (error) {
                console.log(error);
            });

            alert("Cliente actualizado con éxito")
            //Refrescar la pagina
            router.reload(window.location.pathname)
        }
    }
    
    const borrarCliente = () =>{
        axios.delete('http://localhost:1337/clientes', {
            data: {
                id: editarClienteId
            }
        }).catch(function (error) {
            console.log(error);
        });

        alert("Cliente eliminado con éxito")
        router.reload(window.location.pathname)
    }

    return (
        <div className={clientesStyles.clientesContainer}>
            {/* Titulo pagina */}
            <h1 className={clientesStyles.titulo}>Clientes</h1>
            {/* Boton para agregar clientes */}
            <button className={clientesStyles.btnAgregarCliente} onClick={()=>{
                if(!editarCliente){
                    setAgregarCliente(true)
                }
            }}>Agregar cliente</button>
            {/* Container para agregar un cliente */}
            {(agregarCliente || editarCliente) ? 
            <div className={clientesStyles.agregarClienteContainer}>
                {/* Header */}
                <div className={clientesStyles.header}>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="36" height="36"><path d="M12 2a5 5 0 1 0 5 5 5 5 0 0 0-5-5zm0 8a3 3 0 1 1 3-3 3 3 0 0 1-3 3zm9 11v-1a7 7 0 0 0-7-7h-4a7 7 0 0 0-7 7v1h2v-1a5 5 0 0 1 5-5h4a5 5 0 0 1 5 5v1z"></path></svg>
                    <h1 className={clientesStyles.tituloHeader}>{(agregarCliente) ? "Nuevo cliente" : "Editar cliente"}</h1>
                </div>
                {/* Cargar info */}
                <div className={clientesStyles.cargarInfo}>
                    <div className={clientesStyles.inputNombreTelefono}>
                        {/* Nombre */}
                        <div className={inputNombreVacio ? [clientesStyles.nombre, clientesStyles.inputVacio].join(" ") : clientesStyles.nombre}>
                            <h2>Nombre</h2>
                            <input type="text" defaultValue={(editarCliente) ? editarClienteNombre : ""} ref={inputNombre} onChange={()=>{
                                (inputNombreVacio ? setInputNombreVacio(false) : "")
                            }}/>
                        </div>
                        {/* Telefono */}
                        <div className={inputTelefonoVacio ? [clientesStyles.telefono, clientesStyles.inputVacio].join(" ") : clientesStyles.telefono}>
                            <h2>Teléfono</h2>
                            <input type="number" defaultValue={(editarCliente) ? editarClienteTelefono : ""} ref={inputTelefono} onChange={()=>{
                                (inputTelefonoVacio ? setInputTelefonoVacio(false) : "")
                            }}/>
                        </div>
                    </div>
                    {/* Botones */}
                    <div className={clientesStyles.botones}>
                        <button className={clientesStyles.btnGuardarCambios} onClick={guardarCambios}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="m10 15.586-3.293-3.293-1.414 1.414L10 18.414l9.707-9.707-1.414-1.414z"></path></svg>
                            Guardar cambios
                        </button>
                        {(editarCliente) ?  
                        <button className={clientesStyles.btnBorrarCliente} onClick={borrarCliente}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M6 7H5v13a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V7H6zm10.618-3L15 2H9L7.382 4H3v2h18V4z"></path></svg>
                            Borrar cliente
                        </button>
                        : ""}
                        <button className={clientesStyles.btnCancelar} onClick={()=>{
                            setAgregarCliente(false)
                            setEditarCliente(false)
                        }}>Cancelar</button>
                    </div>
                </div>
            </div>
            : ""}
            {/* Tabla de todos los clientes */}
            <table className={clientesStyles.tablaClientes}>
                {/* Head tabla */}
                <thead className={clientesStyles.headTablaClientes}>
                    <tr>
                        <th>
                        <span>Id</span>
                        </th>
                        <th>
                        <span>Nombre</span>
                        </th>
                        <th>
                        <span>Teléfono</span>
                        </th>
                    </tr>
                </thead>
                {/* Body tabla */}
                <tbody className={clientesStyles.bodyTablaClientes}>
                    {clientes.map((cliente)=>(
                        <tr key={cliente.id_cliente}>
                            <td>{cliente.id_cliente}</td>
                            <td>{cliente.nombre}</td>
                            <td>{cliente.telefono}</td>
                            <td className={clientesStyles.btnEditarCliente}>
                                <button data-nombre={cliente.nombre} data-telefono={cliente.telefono} data-id={cliente.id_cliente} onClick={()=>{
                                    if(!agregarCliente && !editarCliente){
                                        setEditarCliente(true)
                                        setEditarClienteNombre(event.target.dataset.nombre)
                                        setEditarClienteTelefono(event.target.dataset.telefono)
                                        setEditarClienteId(event.target.dataset.id)
                                    }
                                    }}>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M8.707 19.707 18 10.414 13.586 6l-9.293 9.293a1.003 1.003 0 0 0-.263.464L3 21l5.242-1.03c.176-.044.337-.135.465-.263zM21 7.414a2 2 0 0 0 0-2.828L19.414 3a2 2 0 0 0-2.828 0L15 4.586 19.414 9 21 7.414z"></path></svg>
                                    Editar
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
 
export default Clientes;

// Fetch clientes
export async function getStaticProps(){

    const clientesResponse  = await axios.get(`http://${process.env.SERVER_IP}/clientes`);
   
    const clientes = clientesResponse.data

    return{
      props: { clientes },
      revalidate: 10,
    }
  }
  