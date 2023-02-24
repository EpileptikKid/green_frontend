import { useContext } from 'react'
import { Link } from 'react-router-dom'
import ProductListContext from '../../context/ProductListContext'

export const ProductMonitor = () => {
  const { productList } = useContext(ProductListContext)

  const productItems = []

  productList.map((product) => {
    return (
      !productItems.includes(product.name) &&
      product.status === 'n' &&
      productItems.push(product.name)
    )
  })

  return (
    <>
      {productItems.map((product) => (
        <div className="productList" key={product}>
          <Link
            style={{ textDecoration: 'none' }}
            to={productList
              .find((prod) => prod.name === product)
              .idProduct.toString()}
          >
            <h2>{product}</h2>
          </Link>
        </div>
      ))}
    </>
  )
}

export default ProductMonitor
