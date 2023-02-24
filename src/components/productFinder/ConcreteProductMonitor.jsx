import { useContext, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import ProductFinderContext from '../../context/ProductFinderContext'
import SpecificProduct from './SpecificProduct'

const ConcreteProductMonitor = () => {
  const { findProductById } = useContext(ProductFinderContext)
  const id = useParams().id * 1
  const productListFilteredByName = findProductById(id)
  const navigate = useNavigate()

  useEffect(() => {
    if (productListFilteredByName.length === 0) {
      navigate('/../product-work', { relative: 'path' })
    }
  }, [productListFilteredByName.length, navigate])

  return (
    <div>
      {productListFilteredByName.map((product, index) => (
        <SpecificProduct
          key={product.idProduct}
          product={product}
          openStatus={index === 0}
        />
      ))}
    </div>
  )
}

export default ConcreteProductMonitor
