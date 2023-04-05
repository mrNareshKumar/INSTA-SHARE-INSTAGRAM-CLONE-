import './index.css'

const NotFoundRoute = props => {
  const routeToHomePage = () => {
    const {history} = props
    history.push('/')
  }

  return (
    <div className="notfound_container">
      <div className="responsive_container">
        <img
          src="https://res.cloudinary.com/mrnaresh/image/upload/v1678531644/Insta_Share/erroring_1_3x_nefy5o.png"
          alt="page not found"
          className="error_img"
        />
        <h1 className="heading">Page Not Found</h1>
        <p className="description">
          we are sorry, the page you requested could not be found. Please go
          back to the homepage.
        </p>
        <button type="button" className="button" onClick={routeToHomePage}>
          Home Page
        </button>
      </div>
    </div>
  )
}

export default NotFoundRoute
