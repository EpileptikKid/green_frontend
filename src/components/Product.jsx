import { useContext } from 'react'
import ProductListContext from '../context/ProductListContext'
import {
  RiCheckboxCircleFill,
  RiCloseCircleFill,
  RiArrowUpCircleFill,
} from 'react-icons/ri'
import { Link } from 'react-router-dom'

const Product = ({ info, openCheker }) => {
  const {
    setProductStatusComplete,
    setProductStatusUndefined,
    checkConsistNotReadyProduct,
  } = useContext(ProductListContext)

  return (
    <div className={`productReadMode productStatus_${info.status}`}>
      <div className="infoProduct">
        <h2>{`${info.name} ${info.amount} ${info.packing}`}</h2>
      </div>
      {openCheker && (
        <div className="buttonBox">
          {checkConsistNotReadyProduct(info.idProduct) && (
            <Link to={`/product-work/${info.idProduct}`}>
              <RiArrowUpCircleFill className="buttonStyle" />
            </Link>
          )}
          {info.status !== 'r' && (
            <RiCloseCircleFill
              className="buttonStyle noButton"
              onClick={setProductStatusUndefined.bind(this, info.idProduct)}
            />
          )}
          <RiCheckboxCircleFill
            className="buttonStyle okButton"
            onClick={setProductStatusComplete.bind(this, info.idProduct)}
          />
        </div>
      )}
    </div>
  )
}

export default Product
