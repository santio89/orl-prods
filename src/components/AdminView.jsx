import { useState, useEffect } from 'react'
import { firebaseDb as db } from '../config/firebase';
import { ref, set, push, child, get, remove } from "firebase/database";
import AdminData from './AdminData'

export default function AdminView() {
    const [pass, setPass] = useState("")
    const [validAccess, setValidAccess] = useState(false)
    const [accessError, setAccessError] = useState(false)

    const getData = () => {
        get(child(ref(db), `presets/${userId}`)).then((snapshot) => {
            if (snapshot.exists()) {
                const presetsObj = snapshot.val()
                presets = Object.entries(presetsObj).map((obj) => { return { docId: obj[0], ...obj[1] } })

                dispatch({
                    type: "SET_PRESETS",
                    presets
                })
            }
        }).catch((e) => {
            console.log("error retrieving from db: ", e);
        }).finally(() => {
            dispatch({
                type: "SET_PRESET_LOADER",
                presetLoader: false
            });
        });
    }

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
