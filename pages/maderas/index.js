import axios from 'axios';
import { useRef, useState } from 'react';
import { useRouter } from 'next/router'
import maderasStyles from "./maderas.module.scss"
import Head from 'next/head'

const Maderas = ({ maderas, empresas }) => {

    const router = useRouter()

    //===== Refs
    const inputNombre = useRef()
    const inputDureza = useRef()
    const inputEmpresa = useRef()

    //===== States

    //Agregando una madera
    const [agregandoMadera, setAgregandoMadera] = useState(false)
    //Editando una madera
    const [editandoMadera, setEditandoMadera] = useState(false)
    //Datos de la madera que se está editando
    const [editandoMaderaId, setEditandoMaderaId] = useState(false)
    const [editandoMaderaNombre, setEditandoMaderaNombre] = useState(false)
    const [editandoMaderaDureza, setEditandoMaderaDureza] = useState(false)
    const [editandoMaderaEmpresa, setEditandoMaderaEmpresa] = useState(false)
    //Verificar si los inputs estan vacios
    const [inputNombreVacio, setInputNombreVacio] = useState()
    const [inputDurezaVacio, setInputDurezaVacio] = useState()

    const guardarCambios = () =>{
        let datosMadera = {}
        let camposVacios = false

        // Verificar que no se hayan dejado campos sin completar
        if( inputNombre.current.value == ""){
            setInputNombreVacio(true)
            camposVacios = true
        }
        if( inputDureza.current.value == ""){
            setInputDurezaVacio(true)
            camposVacios = true
        }

        //Avisar de los campos vacios
        if(camposVacios == true){
            alert("Error - No puede dejar los campos resaltados sin completar")
            return 
        }

        //Si se esta agregando una madera nueva
        if(agregandoMadera) {
            datosMadera = {
                nombre: inputNombre.current.value,
                dureza: inputDureza.current.value,
                empresa: inputEmpresa.current.value
            }

            axios.post('http://159.223.185.153:1337/maderas', datosMadera, {
                headers: {
                    'Content-Type': 'application/json',
                }
            }).catch(function (error) {
                console.log(error);
            });

            alert("Madera guardada con éxito")
            //Refrescar la pagina
            router.reload(window.location.pathname)
        
        //Si se esta editando una madera
        }else if(editandoMadera){
            datosMadera = {
                nombre: inputNombre.current.value,
                dureza: inputDureza.current.value,
                empresa: inputEmpresa.current.value,
                id: editandoMaderaId
            }
            
            axios.put('http://159.223.185.153:1337/maderas', datosMadera, {
                headers: {
                    'Content-Type': 'application/json',
                }
            }).catch(function (error) {
                console.log(error);
            });

            alert("Madera actualizada con éxito")
            //Refrescar la pagina
            router.reload(window.location.pathname)
        }
    }
    const borrarMadera = () =>{
        axios.delete('http://159.223.185.153:1337/maderas', {
            data: {
                id: editandoMaderaId
            }
        }).catch(function (error) {
            console.log(error);
        });

        alert("Madera eliminada con éxito")
        router.reload(window.location.pathname)
    }

    return (
        <div className={maderasStyles.maderasContainer}>
            <Head>
                <title>Mueblería - Maderas</title>
            </Head>
            {/* Titulo pagina */}
            <h1 className={maderasStyles.titulo}>Maderas</h1>
            {/* Boton para agregar maderas */}
            <button className={maderasStyles.btnAgregarMadera} onClick={()=>{
                if(!editandoMadera){
                    setAgregandoMadera(true)
                }
            }}>Agregar madera</button>

            {/* Container agregar madera */}
            {(agregandoMadera || editandoMadera) ?   
            <div className={maderasStyles.agregarMaderaContainer}>
                {/* Header */}
                <div className={maderasStyles.header}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 24 24"><path d="M22 7.999a1 1 0 0 0-.516-.874l-9.022-5a1.003 1.003 0 0 0-.968 0l-8.978 4.96a1 1 0 0 0-.003 1.748l9.022 5.04a.995.995 0 0 0 .973.001l8.978-5A1 1 0 0 0 22 7.999zm-9.977 3.855L5.06 7.965l6.917-3.822 6.964 3.859-6.918 3.852z"></path><path d="M20.515 11.126 12 15.856l-8.515-4.73-.971 1.748 9 5a1 1 0 0 0 .971 0l9-5-.97-1.748z"></path><path d="M20.515 15.126 12 19.856l-8.515-4.73-.971 1.748 9 5a1 1 0 0 0 .971 0l9-5-.97-1.748z"></path></svg>
                    <h1 className={maderasStyles.tituloHeader}>{(agregandoMadera) ? "Nueva madera" : "Editar madera"}</h1>
                </div>
                <div className={maderasStyles.cargarInfo}>
                    <div className={maderasStyles.inputInfo}>
                        {/* Nombre */}
                        <div className={inputNombreVacio ? [maderasStyles.nombre, maderasStyles.inputVacio].join(" ") : maderasStyles.nombre}>
                            <h2>Nombre</h2>
                            <input type="text" ref={inputNombre} defaultValue={(editandoMadera) ? editandoMaderaNombre : ""} onChange={()=>{
                                (inputNombreVacio ? setInputNombreVacio(false) : "")
                            }}/>
                        </div>
                        {/* Dureza */}
                        <div className={inputDurezaVacio ? [maderasStyles.dureza, maderasStyles.inputVacio].join(" ") : maderasStyles.dureza}>
                            <h2>Dureza</h2>
                            <input type="text" ref={inputDureza} defaultValue={(editandoMadera) ? editandoMaderaDureza : ""} onChange={()=>{
                                (inputDurezaVacio ? setInputDurezaVacio(false) : "")
                            }}/>
                        </div>
                        {/* Empresa */}
                        <div className={maderasStyles.empresa}>
                            <select name="selectEmpresas" ref={inputEmpresa} defaultValue={(editandoMadera) ? editandoMaderaEmpresa : ""}>
                                {empresas.map((empresa)=>(
                                    <option key={empresa.id_empresa} value={empresa.id_empresa}>{empresa.nombre}</option>
                                ))}
                            </select>
                        </div>
                    </div>
                    {/* Botones */}
                    <div className={maderasStyles.botones}>
                        <button className={maderasStyles.btnGuardarCambios} onClick={guardarCambios}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="m10 15.586-3.293-3.293-1.414 1.414L10 18.414l9.707-9.707-1.414-1.414z"></path></svg>
                            Guardar cambios
                        </button>
                        {(editandoMadera) ?  
                        <button className={maderasStyles.btnBorrarMadera} onClick={borrarMadera}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M6 7H5v13a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V7H6zm10.618-3L15 2H9L7.382 4H3v2h18V4z"></path></svg>
                            Borrar madera
                        </button>
                        : ""}
                        <button className={maderasStyles.btnCancelar} onClick={()=>{
                            setAgregandoMadera(false)
                            setEditandoMadera(false)
                        }}>Cancelar</button>
                    </div>
                </div>
            </div>
            : ""}
            {/* Tabla de todas las maderas */}
            <table className={maderasStyles.tablaMaderas}>
                {/* Head tabla */}
                <thead className={maderasStyles.headTablaMaderas}>
                    <tr>
                        <th>
                        <span>Id</span>
                        </th>
                        <th>
                        <span>Nombre</span>
                        </th>
                        <th>
                        <span>Dureza</span>
                        </th>
                        <th>
                        <span>Empresa</span>
                        </th>
                    </tr>
                </thead>
                {/* Body tabla */}
                <tbody className={maderasStyles.bodyTablaMaderas}>
                {maderas.map((madera)=>(
                    <tr key={madera.id_madera}>
                        <td>{madera.id_madera}</td>
                        <td>{madera.nombre}</td>
                        <td>{madera.dureza}</td>
                        <td>{empresas.filter(e => e.id_empresa == madera.empresa)[0].nombre}</td>
                        <td className={maderasStyles.btnEditarMadera}>
                            <button data-id={madera.id_madera} data-nombre={madera.nombre} data-dureza={madera.dureza} data-empresa={madera.empresa} onClick={()=>{
                                    if(!agregandoMadera && !editandoMadera){
                                        setEditandoMadera(true)
                                        setEditandoMaderaNombre(event.target.dataset.nombre)
                                        setEditandoMaderaDureza(event.target.dataset.dureza)
                                        setEditandoMaderaEmpresa(event.target.dataset.empresa)
                                        setEditandoMaderaId(event.target.dataset.id)
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
 
export default Maderas;

// Fetch maderas
export async function getStaticProps(){

    const maderasResponse  = await axios.get(`http://${process.env.SERVER_IP}/maderas`);
    const empresasResponse  = await axios.get(`http://${process.env.SERVER_IP}/empresas`);
   
    const maderas = maderasResponse.data
    const empresas = empresasResponse.data

    return{
      props: { maderas, empresas },
      revalidate: 10,
    }
}
  