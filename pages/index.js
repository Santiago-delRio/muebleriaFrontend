import Link from "next/link"
import mueblesStyles from "./muebles.module.scss"
import axios from 'axios';
import Head from 'next/head'

const Muebles = ({muebles}) => {
  
  return (
    <div className={mueblesStyles.mueblesContainer}>
      <Head>
          <title>Mueblería - Muebles</title>
      </Head>
      {/* Titulo pagina */}
      <h1 className={mueblesStyles.titulo}>Muebles</h1>
      <Link href="/cargar-mueble">
        <a>
          {/* Boton para ir a la pagina de carga de muebles */}
          <button className={mueblesStyles.btnAgregarMueble}>Agregar mueble</button>
        </a>
      </Link>
      
      {/* Tabla de todos los muebles */}
      <table className={mueblesStyles.containerListaMuebles}>
        {/* Head tabla */}
        <thead className={mueblesStyles.headListaMuebles}>
          <tr>
            <th>
              <span>Id</span>
            </th>
            <th>
              <span>Nombre</span>
            </th>
            <th>
              <span>Precio</span>
            </th>
            <th>
              <span>Descuento</span>
            </th>
          </tr>
        </thead>
        {/* Body tabla */}
        <tbody>
          {muebles.map((mueble)=>(
            <tr key={mueble.id_mueble}>
              <td>{mueble.id_mueble}</td>
              <td>{mueble.nombre}</td>
              <td>${mueble.precio}</td>
              {(mueble.descuento != null) ? <td>{mueble.descuento}%</td> : <td></td>}
              <td className={mueblesStyles.btnEditarMueble}>
                <Link href={`/${mueble.slug}`}>
                  <a>
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M8.707 19.707 18 10.414 13.586 6l-9.293 9.293a1.003 1.003 0 0 0-.263.464L3 21l5.242-1.03c.176-.044.337-.135.465-.263zM21 7.414a2 2 0 0 0 0-2.828L19.414 3a2 2 0 0 0-2.828 0L15 4.586 19.414 9 21 7.414z"></path></svg>
                    Editar
                  </a>
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
 
export default Muebles;


// Fetch muebles
export async function getStaticProps(){

  const mueblesResponse  = await axios.get(`http://${process.env.SERVER_IP}/muebles`);
 
  const muebles = mueblesResponse.data
  
  return{
    props: { muebles },
    revalidate: 10,
  }
}

