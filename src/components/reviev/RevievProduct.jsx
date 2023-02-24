const RevievProduct = ({ product }) => {
  return (
    <div className={`productViever productStatus_${product.status}`}>
      <h3>{`${product.name} ${product.amount} ${product.packing}`}</h3>
    </div>
  )
}

export default RevievProduct
