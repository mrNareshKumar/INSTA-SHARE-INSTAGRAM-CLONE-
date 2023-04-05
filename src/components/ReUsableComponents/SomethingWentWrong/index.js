import './index.css'

const SomethingWentWrong = props => {
  const {onRetry} = props

  const retry = () => {
    onRetry()
  }

  return (
    <div className="somethingwentwrong_container">
      <div className="res_container">
        <img
          src="https://res.cloudinary.com/mrnaresh/image/upload/v1678530164/Insta_Share/alert-triangle_3x_d7iv1k.png"
          alt="failure view"
          className="somethingwentwrong_image"
        />
        <p className="heading">Something went wrong. Please try again</p>
        <button className="button" type="button" onClick={retry}>
          Try again
        </button>
      </div>
    </div>
  )
}

export default SomethingWentWrong
