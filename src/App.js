import './App.css'
import ProductListContext from './context/ProductListContext'
import DATA from './data/data'
import { useState } from 'react'
import ClientMonitor from './components/ClientMonitor'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Menu from './components/Menu'
import ProductMonitor from './components/productFinder/ProductMonitor'
import ConcreteProductMonitor from './components/productFinder/ConcreteProductMonitor'
import ProductFinderContext from './context/ProductFinderContext'
import RevievMonitor from './components/reviev/RevievMonitor'
import ProductInfoContext from './context/ProductInfoContext'

function App() {
  const { clientListDATA, productListDATA } = DATA
  const [clientList, setClientList] = useState(clientListDATA)
  const [productList, setProductList] = useState(productListDATA)

  const findProductById = (id) => {
    const nameProductList = productList.find(
      (product) => product.idProduct === id
    ).name
    const productItems = productList.filter(
      (product) => product.name === nameProductList && product.status === 'n'
    )
    productItems.map((product) => {
      product.nameClient = clientList.find(
        (client) => client.id === product.idClient
      ).name
      product.comment = clientList.find(
        (client) => client.id === product.idClient
      ).comment
      return undefined
    })
    return productItems
  }

  const setClientStatus = (idClient, status) => {
    const newClientList = [...clientList]
    const client = newClientList.find((client) => client.id === idClient)
    client.status = status
    setClientList(newClientList)
  }

  const setClientConsistUndefined = (idClient, status) => {
    const newClientList = [...clientList]
    const client = newClientList.find((client) => client.id === idClient)
    client.consistUndefined = status
    setClientList(newClientList)
  }

  const setProductStatus = (id, status) => {
    const newProductList = [...productList]
    const product = newProductList.find(
      (component) => component.idProduct === id
    )

    product.status = status
    setProductList(newProductList)
  }

  const setProductStatusReady = (id) => {
    setProductStatus(id, 'r')
    const idClient = productList.find(
      (component) => component.idProduct === id
    ).idClient
    setClientStatus(idClient, 'r')
  }

  const setProductStatusComplete = (id) => {
    setProductStatus(id, 'c')
  }

  const setProductStatusUndefined = (id) => {
    setProductStatus(id, 'u')
    const idClient = productList.find(
      (product) => product.idProduct === id
    ).idClient
    setClientConsistUndefined(idClient, true)
  }

  const getInfo = (status) => {
    const infoList = []
    const newProductList = [...productList]
    clientList.map((client) => {
      const newClient = {
        id: client.id,
        name: client.name,
        status: client.status,
        consistUndefined: client.consistUndefined,
        productList: newProductList
          .filter((product) => {
            return product.idClient === client.id
          })
          .map((product) => {
            const { idClient, idProduct, ...newProduct } = product
            newProduct.key = product.idProduct
            return newProduct
          }),
      }
      infoList.push(newClient)
      return undefined
    })
    if (status === 'all') {
      return infoList
    }
    const resultInfo =
      status === 'u'
        ? infoList.filter((client) => client.consistUndefined)
        : infoList.filter((client) => client.status === status)
    return resultInfo
  }

  const checkConsistNotReadyProduct = (id) => {
    const nameProduct = productList.find(
      (product) => product.idProduct === id
    ).name
    const checker =
      productList.find((product) => {
        return (
          product.status === 'n' &&
          product.idProduct !== id &&
          product.name === nameProduct
        )
      }) !== undefined
    return checker
  }

  return (
    <BrowserRouter>
      <ProductListContext.Provider
        value={{
          clientList,
          productList,
          setClientStatus,
          setProductStatusComplete,
          setProductStatusUndefined,
          getInfo,
          checkConsistNotReadyProduct,
        }}
      >
        <div className="App">
          <Routes>
            <Route path="/" element={<Menu />}>
              <Route
                path="/product-work"
                element={
                  <ProductFinderContext.Provider value={{ findProductById }}>
                    <ProductMonitor />
                  </ProductFinderContext.Provider>
                }
              />
              <Route
                path="/product-work/:id"
                element={
                  <ProductFinderContext.Provider
                    value={{
                      findProductById,
                      setProductStatusReady,
                      setProductStatusUndefined,
                    }}
                  >
                    <ConcreteProductMonitor />
                  </ProductFinderContext.Provider>
                }
              />

              <Route path="/work" element={<ClientMonitor />} />
              <Route
                path="/look"
                element={
                  <ProductInfoContext.Provider value={{ getInfo }}>
                    {' '}
                    <RevievMonitor />
                  </ProductInfoContext.Provider>
                }
              />
            </Route>
          </Routes>
        </div>
      </ProductListContext.Provider>
    </BrowserRouter>
  )
}

export default App
