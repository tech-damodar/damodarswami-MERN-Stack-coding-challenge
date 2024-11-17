import React from 'react'
import { Link } from 'react-router-dom'
const Navbar = () => {
  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-light bg-light container">
        <div className="container">

          <div className="collapse navbar-collapse navbarlist" id="navbarSupportedContent">
            <ul className="navbar-nav   ">
              <li className="nav-item">
                <Link to="/"><a className="nav-link active" aria-current="page" href="#">Home</a></Link>
              </li>
              <li className="nav-item">
              <Link to="/tractionBar"><a className="nav-link active" aria-current="page" href="#">Barchat</a></Link>
              </li>
              <li className="nav-item">
                <Link to="/statistic"><a className="nav-link active" aria-current="page" href="#">Statistics</a></Link>
              </li>
              <li className="nav-item">
              <Link to="/pie"><a className="nav-link active" aria-current="page" href="#">Piechart</a></Link>
              </li>
              


            </ul>

          </div>
        </div>
      </nav>
    </div>
  )
}

export default Navbar