import {Link, withRouter} from 'react-router-dom'
import Cookies from 'js-cookie'
import {FaSearch} from 'react-icons/fa'
import SearchContext from '../../contexts/SearchContext'

import './index.css'

const HeaderComponent = props => (
  <SearchContext.Consumer>
    {value => {
      const {
        showHamburger,
        toggleHamburger,
        handleCloseHamburger,
        activeShowSearchComponent,
        inActiveShowSearchComponent,
        searchInputValue,
        updateSearchInput,
        handleSearch,
      } = value

      const hamburgerIconClicked = () => {
        toggleHamburger()
      }

      const closeIconClicked = () => {
        handleCloseHamburger()
      }

      const handleInputChange = event => {
        updateSearchInput(event.target.value)
      }

      const onClickLogout = () => {
        const {history} = props
        Cookies.remove('jwt_token')
        history.replace('/login')
      }

      const showSearchComponentInInitialView = () => {
        activeShowSearchComponent()
      }

      const navigateToHomeOrProfile = () => {
        inActiveShowSearchComponent()
      }

      const onClickSearch = () => {
        handleSearch()
      }

      return (
        <nav className="nav-header">
          <div className="nav-content">
            <div className="nav-bar-mobile-logo-container">
              <Link
                to="/"
                onClick={navigateToHomeOrProfile}
                className="website_logo_title"
              >
                <img
                  className="website-logo"
                  src="https://res.cloudinary.com/mrnaresh/image/upload/v1678373942/Insta_Share/Header/Standard_Collection_8_3x_pbcjjl.png"
                  alt="website logo"
                />
                <h1 className="website_title">Insta Share</h1>
              </Link>
              <button type="button" className="nav-mobile-btn">
                <img
                  src="https://res.cloudinary.com/mrnaresh/image/upload/v1678373941/Insta_Share/Header/menu_3x_g3jufa.png"
                  alt="hamburger icon"
                  className="nav-bar-img"
                  onClick={hamburgerIconClicked}
                />
              </button>
            </div>
            <div className="nav-bar-large-container">
              <Link
                to="/"
                onClick={navigateToHomeOrProfile}
                className="website_logo_title"
              >
                <img
                  className="website-logo"
                  src="https://res.cloudinary.com/mrnaresh/image/upload/v1678373942/Insta_Share/Header/Standard_Collection_8_3x_pbcjjl.png"
                  alt="website logo"
                />
                <h1 className="website_title">Insta Share</h1>
              </Link>
              <div className="nav_menu_container">
                <div className="search_container">
                  <input
                    type="search"
                    className="search_input"
                    placeholder="Search Caption"
                    onChange={handleInputChange}
                    value={searchInputValue}
                  />
                  <button
                    type="button"
                    className="search_btn"
                    onClick={onClickSearch}
                    data-testid="searchIcon"
                  >
                    <FaSearch />
                  </button>
                </div>
                <ul className="nav-menu">
                  <li className="nav-menu-item">
                    <Link
                      to="/"
                      onClick={navigateToHomeOrProfile}
                      className="nav-link"
                    >
                      Home
                    </Link>
                  </li>
                  <li className="nav-menu-item">
                    <Link
                      to="/my-profile"
                      onClick={navigateToHomeOrProfile}
                      className="nav-link"
                    >
                      Profile
                    </Link>
                  </li>
                </ul>
                <button
                  type="button"
                  className="logout-btn"
                  onClick={onClickLogout}
                >
                  Logout
                </button>
              </div>
            </div>
          </div>
          <div className={showHamburger ? 'nav-menu-mobile' : 'links'}>
            <ul className="nav-menu-list-mobile">
              <li className="nav-menu-item-mobile">
                <Link
                  to="/"
                  onClick={navigateToHomeOrProfile}
                  className="nav-link"
                >
                  <button
                    type="button"
                    className="nav-menu-item nav-mobile-btn"
                  >
                    Home
                  </button>
                </Link>
              </li>
              <li className="nav-menu-item-mobile">
                <button
                  type="button"
                  onClick={showSearchComponentInInitialView}
                  className="nav-menu-item nav-mobile-btn"
                >
                  Search
                </button>
              </li>
              <li className="nav-menu-item-mobile">
                <Link
                  to="/my-profile"
                  onClick={navigateToHomeOrProfile}
                  className="nav-link"
                >
                  <button
                    type="button"
                    className="nav-menu-item nav-mobile-btn"
                  >
                    Profile
                  </button>
                </Link>
              </li>
              <li className="nav-menu-item-mobile">
                <button
                  type="button"
                  className="logout-btn"
                  onClick={onClickLogout}
                >
                  Logout
                </button>
              </li>
              <li className="nav-menu-item-mobile">
                <button type="button" className="nav-mobile-btn">
                  <img
                    src="https://res.cloudinary.com/mrnaresh/image/upload/v1678504003/Insta_Share/Header/Shape_3x_nseurv.png"
                    alt="close icon"
                    className="nav-bar-img"
                    onClick={closeIconClicked}
                  />
                </button>
              </li>
            </ul>
          </div>
        </nav>
      )
    }}
  </SearchContext.Consumer>
)

export default withRouter(HeaderComponent)
