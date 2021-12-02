import sidebarStyles from "./sidebar.module.scss"
import Link from "next/link"
import { useEffect } from "react";

const Sidebar = () => {

    //Mantener el server de heroku prendido
    useEffect(()=>{
        setInterval(()=>{
            fetch('https://muebleria-api.herokuapp.com/clientes')
            .then(response => response.json())
        },1500000) 

    })
    return (
        <div className={sidebarStyles.sidebarContainer}>
            <h1 className={sidebarStyles.logo}>MUEBLES</h1>
            <ul className={sidebarStyles.listaLinks}>
                <li>
                    <Link href="/">
                        <a>Muebles</a>
                    </Link>
                </li>
                <li>
                    <Link href="/clientes">
                        <a>Clientes</a>
                    </Link>
                </li>
                <li>
                    <Link href="/ordenes">
                        <a>Órdenes de compra</a>
                    </Link>
                </li>
                <li>
                    <Link href="/maderas">
                        <a>Maderas</a>
                    </Link>
                </li>
                <li>
                    <Link href="/empresas">
                        <a>Proveedores de madera</a>
                    </Link>
                </li>
            </ul>
        </div>
    );
}
 
export default Sidebar;