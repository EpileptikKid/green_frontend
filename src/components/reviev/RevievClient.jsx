import RevievProduct from './RevievProduct'

const RevievClient = ({ client, openStatus }) => {
  return (
    <div>
      <h1>{client.name}</h1>
      {openStatus &&
        client.productList.map((product) => (
          <RevievProduct product={product} key={product.key} />
        ))}
    </div>
  )
}

export default RevievClient
