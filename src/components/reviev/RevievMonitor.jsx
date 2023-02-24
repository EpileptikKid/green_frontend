import { useContext, useState } from 'react'
import ProductInfoContext from '../../context/ProductInfoContext'
import RevievClient from './RevievClient'

const RevievMonitor = () => {
  const { getInfo } = useContext(ProductInfoContext)
  const [infoList, setInfoList] = useState([])

  const setInfoComplete = () => {
    setInfoList(getInfo('c'))
  }

  const setInfoUndefined = () => {
    setInfoList(getInfo('u'))
  }

  const setAllInfo = () => {
    setInfoList(getInfo('all'))
  }

  const setNoReadyInfo = () => {
    setInfoList(getInfo('n'))
  }

  const [indexOpenStatus, setIndexOpenStatus] = useState(-1)
  const setOpenStatus = (id) => {
    id === indexOpenStatus ? setIndexOpenStatus(-1) : setIndexOpenStatus(id)
  }
  return (
    <div>
      <div className="buttonMenu">
        <button className="specificButtonMenu" onClick={setAllInfo}>
          всі
        </button>
        <button className="specificButtonMenu" onClick={setNoReadyInfo}>
          не готові
        </button>
        <button className="specificButtonMenu" onClick={setInfoComplete}>
          готові
        </button>
        <button className="specificButtonMenu" onClick={setInfoUndefined}>
          з недостачами
        </button>
      </div>
      {infoList.map((client) => {
        return (
          <div
            className="productList"
            onClick={setOpenStatus.bind(this, client.id)}
            key={client.id}
          >
            <RevievClient
              client={client}
              openStatus={indexOpenStatus === client.id}
            />
          </div>
        )
      })}
    </div>
  )
}

export default RevievMonitor
