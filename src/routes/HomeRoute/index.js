import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import HeaderComponent from '../../components/HeaderComponent'
import LoadingView from '../../components/ReUsableComponents/LoadingView'
import FailureView from '../../components/ReUsableComponents/FailureView'
import UserPostsComponent from '../../components/UserPostsComponent'
import UserStoriesComponent from '../../components/UserStoriesComponent'
import SearchContext from '../../contexts/SearchContext'
import SearchComponent from '../../components/SearchComponent'
import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'INPROGRESS',
}

class HomeRoute extends Component {
  state = {
    userStoriesApiStatus: apiStatusConstants.initial,
    userStories: [],
    userPostsApiStatus: apiStatusConstants.initial,
    userPosts: [],
  }

  componentDidMount() {
    this.getUserStories()
    this.getUserPosts()
  }

  getUserStories = async () => {
    this.setState({
      userStoriesApiStatus: apiStatusConstants.inProgress,
    })
    const jwtToken = Cookies.get('jwt_token')
    const apiUrl = 'https://apis.ccbp.in/insta-share/stories'
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(apiUrl, options)
    if (response.ok) {
      const fetchedData = await response.json()
      const updatedData = fetchedData.users_stories.map(eachStory => ({
        userId: eachStory.user_id,
        userName: eachStory.user_name,
        storyUrl: eachStory.story_url,
      }))
      this.setState({
        userStories: updatedData,
        userStoriesApiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({
        userStoriesApiStatus: apiStatusConstants.failure,
      })
    }
  }

  getUserPosts = async () => {
    this.setState({userPostsApiStatus: apiStatusConstants.inProgress})
    const jwtToken = Cookies.get('jwt_token')
    const apiUrl = 'https://apis.ccbp.in/insta-share/posts'
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(apiUrl, options)
    if (response.ok) {
      const data = await response.json()
      const userPosts = data.posts
      this.setState({
        userPosts,
        userPostsApiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({
        userPostsApiStatus: apiStatusConstants.failure,
      })
    }
  }

  renderLoadingView = () => <LoadingView />

  renderUserStories = () => {
    const {userStoriesApiStatus, userStories} = this.state

    switch (userStoriesApiStatus) {
      case apiStatusConstants.success:
        return (
          <div className="userStories-container">
            <UserStoriesComponent userStories={userStories} />
          </div>
        )
      case apiStatusConstants.failure:
        return (
          <>
            <FailureView onRetry={this.getUserStories} />
          </>
        )
      case apiStatusConstants.inProgress:
        return (
          <div className="loader-container" data-testid="loader">
            <Loader type="TailSpin" color="#4094EF" height={50} width={50} />
          </div>
        )
      default:
        return null
    }
  }

  renderUserPosts = () => {
    const {userPostsApiStatus, userPosts} = this.state

    switch (userPostsApiStatus) {
      case apiStatusConstants.success:
        return (
          <div className="main_container">
            <div className="post_container">
              <ul className="posts_list">
                {userPosts.map(eachPost => (
                  <UserPostsComponent
                    key={eachPost.post_id}
                    userPost={eachPost}
                  />
                ))}
              </ul>
            </div>
          </div>
        )
      case apiStatusConstants.failure:
        return (
          <>
            <FailureView onRetry={this.getUserPosts} />
          </>
        )
      case apiStatusConstants.inProgress:
        return (
          <div className="loader-container" data-testid="loader">
            <Loader type="TailSpin" color="#4094EF" height={50} width={50} />
          </div>
        )
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
                    {this.renderUserStories()}
                    {this.renderUserPosts()}
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

export default HomeRoute
