import { useState, useEffect } from 'react'

export default function TableItem({ product, addItem, removeItem, editQty, success }) {
    const [selected, setSelected] = useState(false)
    const [quantity, setQuantity] = useState(0)

    const toggleSelected = () => {
        setSelected(selected => !selected)
    }

    const onChangeQty = (e) => {
        if (String(e.target.value).length > 2) return

        if (e.target.value === "") {
            setQuantity(0)
        } else {
            e.target.value >= 0 && setQuantity(e.target.value)
        }

    }

    useEffect(() => {
        setQuantity(0)
        if (selected) {
            const qtyProd = { ...product, qty: quantity }
            addItem(qtyProd)
        } else {
            removeItem(product)
        }
    }, [selected])

    useEffect(() => {
        editQty(product.id, quantity)
    }, [quantity])

    useEffect(() => {
        success && setSelected(false)
    }, [success])

    return (
        <div className={`form__grid__row ${selected && "selected"}`} onClick={() => toggleSelected()}>
            <div className="form__grid__col">{product.ref}</div>
            <div className="form__grid__col">{product.part}</div>
            <div className="form__grid__col">{product.desc}</div>
            <div className="form__grid__col">{product.recQty}</div>
            <div className="form__grid__col">
                {selected ? <input className={`${Number(quantity) === 0 && "notValid"}`} value={Number(quantity).toString()} onChange={onChangeQty} onClick={e => e.stopPropagation()} type='number' required form='submitForm' min={0} max={99} /> : <span className='form__grid__col__qtyNumber'>0</span>}

            </div>
        </div>
    )
}
