import ProductList from './ProductList'

const Client = ({ client, productList }) => {
  return (
    <div className="client-products-monitor">
      <h1>{client.name}</h1>
      {client.comment ? <h2>{client.comment}</h2> : ''}
      <ProductList productList={productList} />
    </div>
  )
}

export default Client
