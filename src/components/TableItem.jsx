import { useState, useEffect } from 'react'

export default function TableItem({ product, addItem, removeItem }) {

    const [selected, setSelected] = useState(false)

    const toggleSelected = () => {
        setSelected(selected => !selected)
    }

    useEffect(() => {
        if (selected) {
            addItem(product)
        } else {
            removeItem(product)
        }
    }, [selected])

    return (
        <div className={`form__grid__row ${selected && "selected"}`} onClick={() => toggleSelected()}>
            <div className="form__grid__col">{product.ref}</div>
            <div className="form__grid__col">{product.part}</div>
            <div className="form__grid__col">{product.desc}</div>
            <div className="form__grid__col">{product.qty}</div>
        </div>
    )
}
