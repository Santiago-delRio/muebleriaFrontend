import axios from 'axios';
import { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/router'
import empresasStyles from "./empresas.module.scss"

const Empresas = ({ empresas }) => {

    const router = useRouter()

    //===== Refs
    const inputNombre = useRef()
    const inputTelefono = useRef()

    //===== States

    //Agregando una empresa
    const [agregandoEmpresa, setAgregandoEmpresa] = useState(false)
    //Editando una empresa
    const [editandoEmpresa, setEditandoEmpresa] = useState(false)
    //Valores del cliente editado
    const [editarEmpresaId, setEditarEmpresaId] = useState()
    const [editarEmpresaNombre, setEditarEmpresaNombre] = useState()
    const [editarEmpresaTelefono, setEditarEmpresaTelefono] = useState()
    //Verificar si los inputs estan vacios
    const [inputNombreVacio, setInputNombreVacio] = useState()
    const [inputTelefonoVacio, setInputTelefonoVacio] = useState()
    

    const guardarCambios = () =>{
        let datosEmpresa = {}
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

        //Si esta agregando una empresa
        if(agregandoEmpresa){
            datosEmpresa = {
                nombre: inputNombre.current.value,
                numero: inputTelefono.current.value
            }

            axios.post('http://159.223.185.153:1337/empresas', datosEmpresa, {
                headers: {
                    'Content-Type': 'application/json',
                }
            }).catch(function (error) {
                console.log(error);
            });

            alert("Empresa guardada con éxito")
            //Refrescar la pagina
            router.reload(window.location.pathname)

        //Si esta editando una empresa
        }else if(editandoEmpresa){
            datosEmpresa = {
                nombre: inputNombre.current.value,
                numero: inputTelefono.current.value,
                id: editarEmpresaId
            }
            
            axios.put('http://159.223.185.153:1337/empresas', datosEmpresa, {
                headers: {
                    'Content-Type': 'application/json',
                }
            }).catch(function (error) {
                console.log(error);
            });

            alert("Empresa actualizada con éxito")
            //Refrescar la pagina
            router.reload(window.location.pathname)
        }
    }
    const borrarEmpresa = () =>{
        axios.delete('http://159.223.185.153:1337/empresas', {
            data: {
                id: editarEmpresaId
            }
        }).catch(function (error) {
            console.log(error);
        });

        alert("Empresa eliminada con éxito")
        router.reload(window.location.pathname)
    }
    return (
        <div className={empresasStyles.empresasContainer}>
            {/* Titulo pagina */}
            <h1 className={empresasStyles.titulo}>Empresas</h1>
            {/* Boton para agregar empresas */}
            <button className={empresasStyles.btnAgregarEmpresa} onClick={()=>{
                if(!editandoEmpresa){
                    setAgregandoEmpresa(true)
                }
            }}>Agregar empresa</button>
            {(agregandoEmpresa || editandoEmpresa) ?  
                <div className={empresasStyles.agregarEmpresaContainer}>
                {/* Header */}
                <div className={empresasStyles.header}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 24 24"><path d="M19 2H9c-1.103 0-2 .897-2 2v6H5c-1.103 0-2 .897-2 2v9a1 1 0 0 0 1 1h16a1 1 0 0 0 1-1V4c0-1.103-.897-2-2-2zM5 12h6v8H5v-8zm14 8h-6v-8c0-1.103-.897-2-2-2H9V4h10v16z"></path><path d="M11 6h2v2h-2zm4 0h2v2h-2zm0 4.031h2V12h-2zM15 14h2v2h-2zm-8 .001h2v2H7z"></path></svg>
                    <h1 className={empresasStyles.tituloHeader}>{(agregandoEmpresa) ? "Nueva empresa" : "Editar empresa"}</h1>
                </div>
                <div className={empresasStyles.cargarInfo}>
                    <div className={empresasStyles.inputNombreTelefono}>
                        {/* Nombre */}
                        <div className={inputNombreVacio ? [empresasStyles.nombre, empresasStyles.inputVacio].join(" ") : empresasStyles.nombre}>
                            <h2>Nombre</h2>
                            <input type="text" defaultValue={(editandoEmpresa) ? editarEmpresaNombre : ""} ref={inputNombre} onChange={()=>{
                                (inputNombreVacio ? setInputNombreVacio(false) : "")
                            }}/>
                        </div>
                        {/* Telefono */}
                        <div className={inputTelefonoVacio ? [empresasStyles.telefono, empresasStyles.inputVacio].join(" ") : empresasStyles.telefono}>
                            <h2>Teléfono</h2>
                            <input type="number" defaultValue={(editandoEmpresa) ? editarEmpresaTelefono : ""} ref={inputTelefono} onChange={()=>{
                                (inputTelefonoVacio ? setInputTelefonoVacio(false) : "")
                            }}/>
                        </div>
                    </div>
                    {/* Botones */}
                    <div className={empresasStyles.botones}>
                        <button className={empresasStyles.btnGuardarCambios} onClick={guardarCambios}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="m10 15.586-3.293-3.293-1.414 1.414L10 18.414l9.707-9.707-1.414-1.414z"></path></svg>
                            Guardar cambios
                        </button>
                        {(editandoEmpresa) ?  
                        <button className={empresasStyles.btnBorrarEmpresa} onClick={borrarEmpresa}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M6 7H5v13a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V7H6zm10.618-3L15 2H9L7.382 4H3v2h18V4z"></path></svg>
                            Borrar empresa
                        </button>
                        : ""}
                        <button className={empresasStyles.btnCancelar} onClick={()=>{
                            setAgregandoEmpresa(false)
                            setEditandoEmpresa(false)
                        }}>Cancelar</button>
                    </div>
                </div>
            </div>
            : ""}
            {/* Tabla de todas las empresas */}
            <table className={empresasStyles.tablaEmpresas}>
                {/* Head tabla */}
                <thead className={empresasStyles.headTablaEmpresas}>
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
                <tbody className={empresasStyles.bodyTablaEmpresas}>
                {empresas.map((empresa)=>(
                        <tr key={empresa.id_empresa}>
                            <td>{empresa.id_empresa}</td>
                            <td>{empresa.nombre}</td>
                            <td>{empresa.numero}</td>
                            <td className={empresasStyles.btnEditarEmpresa}>
                                <button data-nombre={empresa.nombre} data-telefono={empresa.numero} data-id={empresa.id_empresa} onClick={()=>{
                                    if(!agregandoEmpresa && !editandoEmpresa){
                                        setEditandoEmpresa(true)
                                        setEditarEmpresaNombre(event.target.dataset.nombre)
                                        setEditarEmpresaTelefono(event.target.dataset.telefono)
                                        setEditarEmpresaId(event.target.dataset.id)
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
 
export default Empresas;

// Fetch empresas
export async function getStaticProps(){

    const empresasResponse  = await axios.get(`http://${process.env.SERVER_IP}/empresas`);
   
    const empresas = empresasResponse.data

    return{
      props: { empresas },
      revalidate: 10,
    }
  }
  