import { NavLink, Outlet, useNavigation } from "react-router-dom"

const HomePage = () => {
  const { state } = useNavigation();
  return (
    <div className="root-container">
      <div className="sidebar">
        <h4>Star Wars Api</h4>
        <div className="sidebar-content">
          <ol>
            <li>
              <NavLink
                to="/people"
                className={({ isActive }) => (isActive ? 'active' : '')}
              >
                People
              </NavLink>
            </li>
            <li>
              <NavLink
                  to="/planets"
                  className={({ isActive }) => (isActive ? 'active' : '')}
                >
                  Planets
              </NavLink>
            </li>
            <li>
              <NavLink
                  to="/films"
                  className={({ isActive }) => (isActive ? 'active' : '')}
                >
                  Films
              </NavLink>
            </li>
            <li>
              <NavLink
                  to="/species"
                  className={({ isActive }) => (isActive ? 'active' : '')}
                >
                  Species
              </NavLink>
            </li>
            <li>
              <NavLink
                    to="/vehicles"
                    className={({ isActive }) => (isActive ? 'active' : '')}
                  >
                    Vehicles
              </NavLink>
            </li>
            <li>
              <NavLink
                    to="/starships"
                    className={({ isActive }) => (isActive ? 'active' : '')}
                  >
                    Starships
              </NavLink>
            </li>
          </ol>
        </div>
      </div>
      <div className="main-content">
        {/* <h4>Main Content</h4> */}
        {state === "loading"? <div className="loader-container"><div className="loader"></div></div> : <Outlet />}
        {/* <Outlet /> */}
      </div>
    </div>
  )
}

export default HomePage
