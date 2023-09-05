import { useState, useEffect } from 'react'
import AdminData from './AdminData'

export default function AdminView() {
    const [pass, setPass] = useState("")
    const [validAccess, setValidAccess] = useState(false)
    const [accessError, setAccessError] = useState(false)

    const checkValidation = (e) => {
        e.preventDefault()

        if (pass === "8600") {
            setValidAccess(true)
        } else {
            setAccessError(true)
        }
    }

    useEffect(() => {
        let timeout = null

        if (accessError) {
            timeout = setTimeout(() => {
                setAccessError(false)
            }, 2000)
        }

        return () => clearTimeout(timeout)
    }, [accessError])

    useEffect(()=>{
        document.title = 'ORL - ADMIN';
    }, [])


    return (
        <div className='admin-home'>
            {validAccess ?
                <>
                    <AdminData />
                </>
                :
                <form className="admin-home__validation" onSubmit={checkValidation}>
                    <input maxLength={4} type={"text"} value={pass} onChange={(e) => setPass(e.target.value)}></input>
                    <div className="admin-home__validation__btnContainer">
                        <span>{accessError && "WRONG PASS"}</span>
                        <button>SEND</button>
                    </div>
                </form>
            }

        </div>
    )
}
