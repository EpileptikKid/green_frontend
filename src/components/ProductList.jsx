import { RiArrowRightCircleFill } from 'react-icons/ri'
import { useContext } from 'react'
import ProductListContext from '../context/ProductListContext'
import Product from './Product'

const ProductList = ({ productList }) => {
  const { setClientStatus } = useContext(ProductListContext)

  let indexOpenPosition
  const nextOpenPosition = () => {
    indexOpenPosition = productList.findIndex(
      (product) => product.status === 'n' || product.status === 'r'
    )
  }
  nextOpenPosition()

  const setStatusClient = () => {
    const indexNotStartedProduct = productList.findIndex(
      (product) => product.status === 'r'
    )
    indexNotStartedProduct !== -1 &&
      setClientStatus(productList[0].idClient, 'r')
    const indexReadyProduct = productList.findIndex(
      (product) => product.status === 'n' || product.status === 'r'
    )
    indexReadyProduct === -1 && setClientStatus(productList[0].idClient, 'c')
    const indexCompleteProduct = productList.findIndex(
      (product) => product.status === 'c' || product.status === 'r'
    )
    indexCompleteProduct === -1 && setClientStatus(productList[0].idClient, 'n')
  }

  return (
    <div className="productMonitor">
      {indexOpenPosition === -1 && (
        <button className="buttonNext" onClick={setStatusClient}>
          <h2>Наступний</h2>
          <RiArrowRightCircleFill className="ico" />
        </button>
      )}
      {indexOpenPosition !== -1 && (
        <Product
          key={productList[indexOpenPosition].idProduct}
          info={productList[indexOpenPosition]}
          openCheker={true}
        />
      )}
      {productList.map((product, index) => {
        return (
          index !== indexOpenPosition && (
            <Product
              key={product.idProduct}
              info={product}
              openCheker={false}
            />
          )
        )
      })}
    </div>
  )
}

export default ProductList
