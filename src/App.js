import {Component} from 'react'
import Cookies from 'js-cookie'
import {Switch, Route, Redirect} from 'react-router-dom'
import LoginRoute from './routes/LoginRoute'
import HomeRoute from './routes/HomeRoute'
import MyProfileRoute from './routes/MyProfileRoute'
import UserProfileRoute from './routes/UserProfileRoute'
import NotFoundRoute from './routes/NotFoundRoute'
import ProtectedRoute from './routes/ProtectedRoute'
import SearchContext from './contexts/SearchContext'
import './App.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'INPROGRESS',
}

class App extends Component {
  state = {
    showHamburger: false,
    showSearchComponent: false,
    searchApiStatus: apiStatusConstants.initial,
    searchInputValue: '',
    usersPosts: [],
  }

  getSearchResults = async () => {
    const jwtToken = Cookies.get('jwt_token')
    const {searchInputValue} = this.state
    this.setState({searchApiStatus: apiStatusConstants.inProgress})
    const apiUrl = `https://apis.ccbp.in/insta-share/posts?search=${searchInputValue}`
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch(apiUrl, options)
    console.log(response)
    if (response.ok) {
      const fetchedData = await response.json()
      const usersPosts = fetchedData.posts
      this.setState({
        usersPosts,
        searchApiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({searchApiStatus: apiStatusConstants.failure})
    }
  }

  toggleHamburger = () => {
    this.setState({showHamburger: true})
  }

  handleCloseHamburger = () => {
    this.setState({showHamburger: false})
  }

  activeShowSearchComponent = () => {
    this.setState({
      showSearchComponent: true,
    })
  }

  inActiveShowSearchComponent = () => {
    this.setState({
      showSearchComponent: false,
      searchApiStatus: apiStatusConstants.initial,
      searchInputValue: '',
      usersPosts: [],
    })
  }

  updateSearchInput = event => {
    this.setState({searchInputValue: event})
  }

  handleSearch = () => {
    this.setState({showSearchComponent: true}, this.getSearchResults)
  }

  render() {
    const {
      showHamburger,
      showSearchComponent,
      searchApiStatus,
      usersPosts,
    } = this.state
    return (
      <SearchContext.Provider
        value={{
          showHamburger,
          toggleHamburger: this.toggleHamburger,
          handleCloseHamburger: this.handleCloseHamburger,
          showSearchComponent,
          activeShowSearchComponent: this.activeShowSearchComponent,
          inActiveShowSearchComponent: this.inActiveShowSearchComponent,
          updateSearchInput: this.updateSearchInput,
          handleSearch: this.handleSearch,
          searchApiStatus,
          usersPosts,
          onRetry: this.onRetry,
        }}
      >
        <Switch>
          <Route exact path="/login" component={LoginRoute} />
          <ProtectedRoute exact path="/" component={HomeRoute} />
          <ProtectedRoute exact path="/my-profile" component={MyProfileRoute} />
          <ProtectedRoute
            exact
            path="/users/:id"
            component={UserProfileRoute}
          />
          <Route exact path="/not-found" component={NotFoundRoute} />
          <Redirect to="/not-found" />
        </Switch>
      </SearchContext.Provider>
    )
  }
}

export default App
