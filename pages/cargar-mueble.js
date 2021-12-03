import Link from "next/link"
import { useRouter } from 'next/router'
import { useRef, useState } from "react";
import axios from 'axios';
import cargarMuebleStyles from "./cargar-mueble.module.scss"
import Head from 'next/head'

const CargarMueble = ({ maderas, muebles }) => {

    const router = useRouter()

    //===== Refs
    const inputNombre = useRef()
    const inputPrecio = useRef()
    const inputDescuento = useRef()
    const inputAlto = useRef()
    const inputAncho = useRef()
    const inputProfundidad = useRef()
    const cargarMaderas = useRef()
    const cargarCombo = useRef()

    //===== States
    const [inputNombreVacio, setInputNombreVacio] = useState()
    const [inputPrecioVacio, setInputPrecioVacio] = useState()
    const [inputAltoVacio, setInputAltoVacio] = useState()
    const [inputAnchoVacio, setInputAnchoVacio] = useState()
    const [inputProfundidadVacio, setInputProfundidadVacio] = useState()
    
    

    const guardarCambios = () =>{

        let camposVacios = false

        // Verificar que no se hayan dejado campos sin completar
        if( inputNombre.current.value == ""){
            setInputNombreVacio(true)
            camposVacios = true
        }
        if( inputPrecio.current.value == "" ){
            setInputPrecioVacio(true)
            camposVacios = true
        }
        if( inputAlto.current.value == "" ){
            setInputAltoVacio(true)
            camposVacios = true
        }
        if( inputAncho.current.value == "" ){
            setInputAnchoVacio(true)
            camposVacios = true
        }
        if( inputProfundidad.current.value == ""){
            setInputProfundidadVacio(true)
            camposVacios = true
        }
        
        if(camposVacios == true){
            alert("Error - No puede dejar los campos resaltados sin completar")
            return 
        }

        //Agarrar todas las maderas elegidas -- Agarrar todos los combos elegidos
        const maderasData = Array.from(document.querySelectorAll(".inputMadera"))
        const combosData = Array.from(document.querySelectorAll(".comboMuebleCantidad"))
        
        const maderasUsadas = []
        const combosMuebles = []

        //Guardar solo la id de la madera usada
        maderasData.map((madera)=>{
            //Evitar que se ingresen maderas duplicadas
            if(maderasUsadas.includes(madera.value)) { return }
            maderasUsadas.push(madera.value)
        })
        //Guardar solo id del mueble y cantidad - combo
        combosData.map((combo, index)=>{
            if(index == 0){
                //saltear si no se selecciona un combo
                if(combo.firstChild.lastChild.value == 0 || combo.children[1].lastChild.value == 0) {return}

                combosMuebles.push({
                    mueble: combo.firstChild.lastChild.value,
                    cantidad: combo.children[1].lastChild.value
                })
            }else{
                if(combo.firstChild.value == 0 || combo.lastChild.value == 0){ return }
                combosMuebles.push({
                    mueble:combo.firstChild.value,
                    cantidad: combo.lastChild.value
                })
            }
        })

        //Objeto para mandar al servidor
        const datosMueble = {
            nombre: inputNombre.current.value,
            precio: inputPrecio.current.value,
            descuento: (inputDescuento.current.value == "") ? null : inputDescuento.current.value,
            alto : inputAlto.current.value,
            ancho: inputAncho.current.value,
            profundidad: inputProfundidad.current.value,
            maderas: maderasUsadas,
            combos: combosMuebles
        }
        
        axios.post('http://45.79.133.104:1337/muebles', datosMueble, {
            headers: {
                'Content-Type': 'application/json',
            }
        }).catch(function (error) {
            console.log(error);
        });
        
        alert("Mueble guardado con éxito")
        //Refrescar la pagina
        router.reload(window.location.pathname)
    }

    return (
        <div className={cargarMuebleStyles.cargarMuebleContainer}>
            <Head>
                <title>Mueblería - Cargar mueble</title>
            </Head>
            <nav>
                <Link href="/">
                    <a>
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M13.293 6.293 7.586 12l5.707 5.707 1.414-1.414L10.414 12l4.293-4.293z"></path></svg>
                    </a>
                </Link>
            </nav>
            {/* Titulo pagina */}
            <h1 className={cargarMuebleStyles.titulo}>Nuevo mueble</h1>
            {/* Container elementos de carga de datos */}
            <div className={cargarMuebleStyles.cargarInfoContainer}>
                {/* Nombre */}
                <div className={inputNombreVacio ? [cargarMuebleStyles.cargarNombre, cargarMuebleStyles.inputVacio].join(" ") : cargarMuebleStyles.cargarNombre}>
                    <h2>Nombre</h2>
                    <input type="text" ref={inputNombre} onChange={()=>{
                        (inputNombreVacio ? setInputNombreVacio(false) : "")
                    }}/>
                </div>
                {/* Precio y descuento */}
                <div className={cargarMuebleStyles.cargarPrecio}>
                    <div className={inputPrecioVacio ? [cargarMuebleStyles.precio, cargarMuebleStyles.inputVacio].join(" ") : cargarMuebleStyles.precio}>
                        <h2>Precio</h2>
                        <input type="number" min="0" ref={inputPrecio} onChange={()=>{
                            (inputPrecioVacio ? setInputPrecioVacio(false) : "")
                        }}/>
                    </div>
                    <div className={cargarMuebleStyles.descuento}>
                        <h2>Descuento (Sin %)</h2>
                        <input type="number" min="0" max="100" ref={inputDescuento}/>
                    </div>
                </div>
                {/* Muebles para vender en combo */}
                <div className={cargarMuebleStyles.cargarCombo} ref={cargarCombo}>
                    <h2>Vender junto con</h2>
                    <div className="comboMuebleCantidad">
                        <div className={cargarMuebleStyles.selectNombre}>
                            <h3>Nombre</h3>
                            <select name="mueblesCombo">
                                {muebles.map((mueble)=>(
                                    <option value={mueble.id_mueble} key={mueble.id_mueble}>{mueble.nombre}</option>    
                                ))}
                                <option value="0" selected >Seleccione una opción</option>
                            </select>
                        </div>
                        <div className={cargarMuebleStyles.inputCantidad}>
                            <h3>Cantidad</h3>
                            <input type="number" min="1" max= "10" defaultValue="1"/>
                        </div>
                        {/* Agregar un select e input para cargar más muebles */}
                        <button className={cargarMuebleStyles.btnAgregarCombo} onClick={()=>{

                            //Select para el mueble
                            const select = document.createElement("select")
                            muebles.map((mueble)=>{
                                select.options.add(new Option(mueble.nombre, mueble.id_mueble))
                            })
                            select.options.add(new Option("Seleccione una opción", 0, true, true))

                            //Input para la cantidad de muebles sugeridos
                            const inputCant = document.createElement("input")
                            inputCant.type = "number"
                            inputCant.min = "1"
                            inputCant.max = "10"
                            inputCant.defaultValue = "1"

                            const precioCantidadContainer = document.createElement("div")
                            precioCantidadContainer.className = "comboMuebleCantidad"

                            precioCantidadContainer.append(select,inputCant)
                            cargarCombo.current.append(precioCantidadContainer)

                        }}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M19 11h-6V5h-2v6H5v2h6v6h2v-6h6z"></path></svg>
                        </button>
                    </div>
                </div>
                {/* Medidas */}
                <div className={cargarMuebleStyles.cargarMedidas}>
                    <h2>Medidas (cm)</h2>
                    <div className={cargarMuebleStyles.medidasInputs}>
                        <div className={inputAltoVacio ? [cargarMuebleStyles.alto, cargarMuebleStyles.inputVacio].join(" ") : cargarMuebleStyles.alto}>
                            <h3>Alto</h3>
                            <input type="number" min="1" ref={inputAlto} onChange={()=>{
                                (inputAltoVacio ? setInputAltoVacio(false) : "")
                            }}/>
                        </div>
                        <div className={inputAnchoVacio ? [cargarMuebleStyles.ancho, cargarMuebleStyles.inputVacio].join(" ") : cargarMuebleStyles.ancho}>
                            <h3>Ancho</h3>
                            <input type="number" min="1" ref={inputAncho} onChange={()=>{
                                (inputAnchoVacio ? setInputAnchoVacio(false) : "")
                            }}/>
                        </div>
                        <div className={inputProfundidadVacio ? [cargarMuebleStyles.profundidad, cargarMuebleStyles.inputVacio].join(" ") : cargarMuebleStyles.profundidad}>
                            <h3>Profundidad</h3>
                            <input type="number" min="1" ref={inputProfundidad} onChange={()=>{
                                (inputProfundidadVacio ? setInputProfundidadVacio(false) : "")
                            }}/>
                        </div>
                    </div>
                </div>
                {/* Maderas */}
                <div className={cargarMuebleStyles.cargarMaderas} ref={cargarMaderas}>
                    <h2>Maderas</h2>
                    <div className={cargarMuebleStyles.selectMaderas}>
                        <select name="maderas" className={cargarMuebleStyles.inputMadera, "inputMadera"}>
                            {maderas.map((madera)=>(
                                <option value={madera.id_madera} key={madera.id_madera}>{madera.nombre}</option>    
                            ))}
                        </select>
                        {/* Agregar un select para cargar más maderas */}
                        <button className={cargarMuebleStyles.btnAgregarMadera} onClick={()=>{
                            const select = document.createElement("select")
                            select.className = "inputMadera", cargarMuebleStyles.inputMadera

                            maderas.map((madera)=>{
                                select.options.add(new Option(madera.nombre, madera.id_madera))
                            })
                            
                            cargarMaderas.current.append(select)

                        }}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M19 11h-6V5h-2v6H5v2h6v6h2v-6h6z"></path></svg>
                        </button>
                    </div>       
                </div>
            </div>
            {/* Boton para guardar mueble */}
            <button className={cargarMuebleStyles.btnGuardarCambios} onClick={guardarCambios}>
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="m10 15.586-3.293-3.293-1.414 1.414L10 18.414l9.707-9.707-1.414-1.414z"></path></svg>
                Guardar cambios
            </button>
        </div>
    );
}
 
export default CargarMueble;


// Fetch maderas
export async function getStaticProps(){

    const maderasResponse  = await axios.get(`http://${process.env.SERVER_IP}/maderas`);
    const mueblesResponse  = await axios.get(`http://${process.env.SERVER_IP}/muebles`);
   
    const maderas = maderasResponse.data
    const muebles = mueblesResponse.data
    
    return{
      props: { maderas, muebles },
      revalidate: 10,
    }
  }
  