import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
export default function Message(props) {
    let navigate = useNavigate();
    let [showContent, setShowContent] = useState(false);



    let frameStyles = {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    };
    let messageStyle = {
        fontSize: '35px',
        marginTop: '20px'
        // flexDirection:'column',
    };

    let messageBoxStyle = {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        width: '80%',
        height: '400px',
        border: '3px dotted gray',
        marginTop: '20px',
        borderRadius: '4px'
    };

    const backToLoginPage = () => {
        navigate('/');
    }

    useEffect(() => {
        if (!props.allow) {
            navigate('/')
        }else {
            setShowContent(true)
        }
    }, [])
    return (
        <div className="pass-frame" style={frameStyles}>
            {showContent ? <div className="message-box" style={messageBoxStyle}>
                <p style={messageStyle}> Password changed successfully</p>
                <button type="button" className="btn btn-secondary" onClick={backToLoginPage}>Back to login page </button>
            </div> : "Invalid request"}

        </div>
    );
}