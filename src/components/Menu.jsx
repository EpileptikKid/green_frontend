import { Link, Outlet } from 'react-router-dom'

const Menu = () => {
  return (
    <>
      <nav className="menuLink">
        <Link to="/product-work">Збірка/продукт</Link>
        <Link to="/work">Збірка</Link>
        <Link to="/look">Перегляд</Link>
      </nav>
      <Outlet />
    </>
  )
}

export default Menu
