import Loader from 'react-loader-spinner'

const LoadingView = () => (
  <div className="loadingview_container">
    <div className="loader-container" data-testid="loader">
      <Loader type="TailSpin" color="#4094EF" height={50} width={50} />
    </div>
  </div>
)

export default LoadingView
