import axios from 'axios';
import Link from "next/link"
import ordenesStyles from "./ordenes.module.scss"
import Head from 'next/head'

const Ordenes = ({ ordenes }) => {

    return (
        <div className={ordenesStyles.ordenesContainer}>
            <Head>
                <title>Mueblería - Ordenes</title>
            </Head>
            <h1 className={ordenesStyles.titulo}>Órdenes de compra</h1>
            {/* Boton para ir a la pagina de carga de ordenes */}
            <Link href="/ordenes/cargar-orden">
                <a>
                    <button className={ordenesStyles.btnCargarCompra}>Cargar compra</button>
                </a>
            </Link>
            {/* Tabla de todas las ordenes */}
            <table className={ordenesStyles.tablaOrdenes}>
                {/* Head tabla */}
                <thead className={ordenesStyles.headTablaOrdenes}>
                    <tr>
                        <th>
                        <span>Nro de orden</span>
                        </th>
                        <th>
                        <span>Fecha de compra</span>
                        </th>
                        <th>
                        <span>Fecha de entrega</span>
                        </th>
                        <th>
                        <span>Importe</span>
                        </th>
                    </tr>
                </thead>
                {/* Body tabla */}
                <tbody className={ordenesStyles.bodyTablaOrdenes}>
                    {ordenes.map((orden)=>(
                        <tr key={orden.numero}>
                            <td>{orden.numero}</td>
                            <td>{orden.fechaCompra}</td>
                            <td>{orden.fechaEntrega}</td>
                            <td>${orden.importe}</td>
                            <td className={ordenesStyles.btnEditarOrden}>
                                <Link href={`/ordenes/${orden.slug}`}>
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
 
export default Ordenes;

// Fetch ordenes
export async function getStaticProps(){

    const ordenesResponse  = await axios.get(`https://${process.env.SERVER_IP}/ordenes`);
   
    const ordenes = ordenesResponse.data

    
    //Ordenar array por fecha de compra
    ordenes.sort(function(a,b){
        return new Date(a.fechaCompra) - new Date(b.fechaCompra)
    })

    //Cambiar formato de las fechas
    const regexFormato = /(202\d)-(\d\d)-(\d\d)/
    const regexFechaHora = /T\d\d:\d\d:\d\d.\d\d\d\w/

    ordenes.map((orden)=>{
        orden.fechaCompra = orden.fechaCompra.replace(regexFechaHora, '')
        orden.fechaCompra = orden.fechaCompra.replace(regexFormato, '$3/$2/$1')

        orden.fechaEntrega = orden.fechaEntrega.replace(regexFechaHora, '')
        orden.fechaEntrega = orden.fechaEntrega.replace(regexFormato, '$3/$2/$1')
    })
    
    return{
      props: { ordenes },
      revalidate: 10,
    }
  }
  