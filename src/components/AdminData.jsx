import { useState, useEffect } from 'react'
import { firebaseDb as db } from '../config/firebase';
import { ref, set, push, child, get, remove } from "firebase/database";
import TableItemAdm from './TableItemAdm';

export default function AdminData() {
    const [orders, setOrders] = useState([])
    const [dataLoading, setDataLoading] = useState(false)

    const getData = () => {
        setDataLoading(true)

        get(child(ref(db), `orders/`)).then((snapshot) => {
            if (snapshot.exists()) {
                const dataObj = snapshot.val()
                const generatedList = Object.entries(dataObj).map((obj) => { return { docId: obj[0], ...obj[1] } })
                setOrders(generatedList)
            }
        }).catch((e) => {
            console.log("error retrieving from db: ", e);
        }).finally(() => {
            setDataLoading(false)
        });
    }

    useEffect(() => {
        getData()
        console.log(orders)
    }, [])

    useEffect(() => {
        console.log(orders)
    }, [orders])

    return (
        <>
            {dataLoading ?
                <div className="loader">Loading...</div>
                :
                <div className="admin-home__main">
                    {
                        orders.length > 0 ?
                            orders.map(order =>
                                <details key={order.docId}>
                                    <summary><span>{order.name}</span></summary>
                                    <div className="content">
                                        <div className="form__grid">
                                            <div className="form__grid__row">
                                                <div className="form__grid__col--header" title="Reference">REF</div>
                                                <div className="form__grid__col--header" title="Part number">PART #</div>
                                                <div className="form__grid__col--header" title="Description">DESC</div>
                                                <div className="form__grid__col--header" title="Recommended quantity">REC QTY</div>
                                                <div className="form__grid__col--header" title="Order quantity">QTY</div>
                                            </div>
                                            {order.items.map(item => {
                                                return <TableItemAdm product={item} key={item.id} />
                                            })}
                                        </div>
                                    </div>
                                </details>
                            )
                            :
                            <div className="admin-home__main__noOrders">No orders found</div>
                    }




                </div>
            }
        </>
    )
}

