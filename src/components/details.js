import { useEffect } from "react"
import { useNavigate } from "react-router-dom"
export default function SecretData(){
    let navigate = useNavigate();

    let logout = () => {
        localStorage.clear();
        navigate('/')
    }
    useEffect(() => {
        if(!localStorage.getItem('sid')){
            navigate('/')
        }else {

        }
    },[])
    return (<div className="secret-data-frame" style={{display:'flex',flexDirection:'column',alignItems:'center',justifyItems:'center'}}>
        <p1> Welcome to this website</p1>

        <button onClick={logout} className="btn btn-primary">logout</button>
    </div>)
}