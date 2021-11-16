import Sidebar from "./Sidebar"

const Layout = ({children}) => {
    return (
        <div className="content">
            <Sidebar />
            {children}
        </div>
    );
}
 
export default Layout;