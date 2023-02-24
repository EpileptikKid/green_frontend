import { useContext } from 'react'
import ProductListContext from '../context/ProductListContext'
import Client from './Client'

const ClientMonitor = () => {
  const { clientList, productList } = useContext(ProductListContext)

  const concreteClient = clientList.find(
    (client) => client.status === 'n' || client.status === 'r'
  )

  return (
    <>
      {concreteClient === undefined ? (
        <h1>Збірка завершена!</h1>
      ) : (
        <Client
          client={concreteClient}
          productList={productList.filter((product) => {
            return product.idClient === concreteClient.id
          })}
        />
      )}
    </>
  )
}

export default ClientMonitor
