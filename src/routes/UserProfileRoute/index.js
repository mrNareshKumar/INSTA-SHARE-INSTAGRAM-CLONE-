import {Component} from 'react'
import Cookies from 'js-cookie'
import HeaderComponent from '../../components/HeaderComponent'
import SearchComponent from '../../components/SearchComponent'
import SearchContext from '../../contexts/SearchContext'
import ProfileComponent from '../../components/ProfileComponent'
import FailureView from '../../components/ReUsableComponents/FailureView'
import LoadingView from '../../components/ReUsableComponents/LoadingView'

const apiStatusConstants = {
  initail: 'INITAIL',
  loading: 'LOADING',
  success: 'SUCCESS',
  inProgress: 'IN_PROGRESS',
}

class UserProfileRoute extends Component {
  constructor(props) {
    super(props)
    this.state = {
      apiStatus: apiStatusConstants.initial,
      userProfileData: {},
    }
  }

  componentDidMount() {
    this.getUserProfileData()
    const {history} = this.props
    history.listen(() => {
      if (history.action === 'POP') {
        history.push('/')
      }
    })
  }

  getUserProfileData = async () => {
    this.setState({apiStatus: apiStatusConstants.inProgress})
    const jwtToken = Cookies.get('jwt_token')
    const {match} = this.props
    const {params} = match
    const apiUrl = `https://apis.ccbp.in/insta-share/users/${params.id}`
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(apiUrl, options)
    console.log(response)
    if (response.ok) {
      const fetchedData = await response.json()
      const formattedData = fetchedData.user_details
      this.setState({
        userProfileData: formattedData,
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  renderFailureView = () => <FailureView onRetry={this.getUserProfileData} />

  renderLoadingView = () => <LoadingView />

  renderSuccessView = () => {
    const {userProfileData} = this.state
    return (
      <>
        <ProfileComponent userProfileData={userProfileData} />
      </>
    )
  }

  renderProfileDetails = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderSuccessView()
      case apiStatusConstants.failure:
        return this.renderFailureView()
      case apiStatusConstants.inProgress:
        return this.renderLoadingView()
      default:
        return null
    }
  }

  render() {
    return (
      <>
        <HeaderComponent />
        <SearchContext.Consumer>
          {value => {
            const {showSearchComponent} = value

            return (
              <>
                {showSearchComponent ? (
                  <>
                    <SearchComponent />
                  </>
                ) : (
                  <>
                    <>{this.renderProfileDetails()}</>
                  </>
                )}
              </>
            )
          }}
        </SearchContext.Consumer>
      </>
    )
  }
}

export default UserProfileRoute
