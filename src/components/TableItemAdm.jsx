

export default function TableItemAdm({ product }) {

    return (
        <div className={`form__grid__row selected`}>
            <div className="form__grid__col">{product.ref}</div>
            <div className="form__grid__col">{product.part}</div>
            <div className="form__grid__col">{product.desc}</div>
            <div className="form__grid__col">{product.recQty}</div>
            <div className="form__grid__col">{product.qty}</div>
        </div>
    )
}
