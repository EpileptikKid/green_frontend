import { useContext } from 'react'
import { RiCloseCircleFill, RiCheckboxCircleFill } from 'react-icons/ri'
import ProductFinderContext from '../../context/ProductFinderContext'

const SpecificProduct = ({ product, openStatus }) => {
  const { setProductStatusReady, setProductStatusUndefined } =
    useContext(ProductFinderContext)

  return (
    <div className="specificProductList">
      <div className="infoSpecificProduct">
        <h1>{product.nameClient}</h1>
        <h2>{product.comment}</h2>
        <h2>{`${product.name} ${product.amount} ${product.packing}`}</h2>
      </div>
      {openStatus && (
        <div className="buttonsSpecificProduct">
          <RiCloseCircleFill
            className="buttonStyle noButton"
            onClick={setProductStatusUndefined.bind(this, product.idProduct)}
          />
          <RiCheckboxCircleFill
            className="buttonStyle okButton"
            onClick={setProductStatusReady.bind(this, product.idProduct)}
          />
        </div>
      )}
    </div>
  )
}

export default SpecificProduct
