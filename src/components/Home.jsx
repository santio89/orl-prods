import { useState, useEffect } from 'react'
import { firebaseDb as db } from '../config/firebase'
import { ref, set, push, child, get, remove } from "firebase/database";
import TableItem from './TableItem';

const data = [
    { id: 1, ref: 'I', part: 'SL42126WGP', desc: 'Cam II Clip-on Quick angle 8"', recQty: 6 },
    { id: 2, ref: 'J', part: 'SL45006CGP', desc: 'Micro-adjustable II Clip-on Quick angle 10"', recQty: 2 },
    { id: 3, ref: 'K', part: 'SL45006CGRP', desc: 'Micro-adjustable II Clip-on Quick angle 15"', recQty: 2 },
    { id: 4, ref: 'L', part: '60020', desc: 'T-Handle', recQty: 2 }
]

export default function Home() {
    const [itemsAdded, setItemsAdded] = useState([])
    const [success, setSuccess] = useState(false)
    const [loading, setLoading] = useState(false)
    const [name, setName] = useState("")
    const [validForm, setValidForm] = useState(false)
    const [orderSent, setOrderSent]

    const addItem = (product) => {
        setItemsAdded(itemsAdded => [...itemsAdded, product])
    }

    const removeItem = (product) => {
        const items = itemsAdded.filter(item => item.id !== product.id)
        setItemsAdded(items)
    }

    const editQty = (id, qty) => {
        const newArray = itemsAdded.map(obj => {
            if (obj.id === id) {
                obj.qty = qty
            }
            return obj
        })
        setItemsAdded(newArray)
    }

    const onSubmit = async (e) => {
        e.preventDefault()

        if (loading) return
        if (name.trim() === "") return
        if (itemsAdded.length === 0) return

        setLoading(true)
        const doc = {
            name: name.trim(),
            items: itemsAdded,
        }

        try {
            await push(ref(db, 'orders/'), doc);
            setSuccess(true)
        } catch (e) {
            console.log("error submiting data: ", e)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        let timeout;
        if (success) {
            timeout = setTimeout(() => setSuccess(false), 2000)
        }

        return () => clearTimeout(timeout)
    }, [success])

    useEffect(() => {
        if (name.trim() !== "" && itemsAdded.length > 0) {
            setValidForm(true)
        } else {
            setValidForm(false)
        }

        const notValidQty = itemsAdded.some(obj => obj.qty === 0)
        if (notValidQty) {
            setValidForm(false)
        }

    }, [name, itemsAdded])

    useEffect(() => {
        orderSent && setOrderSent(false)
    }, [orderSent])

    return (
        <div className='home'>

            <div className="form__grid">
                <div className="form__grid__row">
                    <div className="form__grid__col--header" title="Reference">REF</div>
                    <div className="form__grid__col--header" title="Part number">PART #</div>
                    <div className="form__grid__col--header" title="Description">DESCRIPTION</div>
                    <div className="form__grid__col--header" title="Recommended quantity">REC QTY</div>
                    <div className="form__grid__col--header" title="Order quantity">QTY</div>
                </div>
                {
                    data.map(product =>
                        <TableItem product={product} key={product.id} addItem={addItem} removeItem={removeItem} editQty={editQty} orderSent={orderSent} />
                    )
                }
            </div>
            <form id='submitForm' className={`form__send ${!validForm && "notValid"}`} onSubmit={(e) => onSubmit(e)} disabled={loading || success}>
                <input type="text" value={name} onChange={(e) => {
                    setName(e.target.value)
                }} placeholder="Name..." required disabled={loading || success} />
                <button disabled={loading || success} className={`${success && "success"} ${loading && "loading"}`}>
                    {success ? "ORDER SENT!" : (loading ? "SENDING ORDER..." : "SEND ORDER")}
                </button>
            </form>
        </div>
    )
}
