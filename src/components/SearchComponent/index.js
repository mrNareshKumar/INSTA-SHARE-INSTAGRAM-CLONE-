import {withRouter} from 'react-router-dom'
import {FaSearch} from 'react-icons/fa'
import Loader from 'react-loader-spinner'
import LoadingView from '../ReUsableComponents/LoadingView'
import SomethingWentWrong from '../ReUsableComponents/SomethingWentWrong'
import UserPostsComponent from '../UserPostsComponent'
import SearchContext from '../../contexts/SearchContext'
import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'INPROGRESS',
}

const SearchComponent = () => (
  <SearchContext.Consumer>
    {value => {
      const {
        searchApiStatus,
        searchInputValue,
        usersPosts,
        updateSearchInput,
        handleSearch,
      } = value

      const handleInputChange = event => {
        updateSearchInput(event.target.value)
      }

      const onClickSearchSubmit = () => {
        handleSearch()
      }

      const onClickRetry = () => {
        handleSearch()
      }

      const renderSearchView = () => (
        <div className="small-device-search-input-component">
          <input
            className="search-input-field-search-component"
            type="search"
            placeholder="Search Caption"
            onChange={handleInputChange}
            value={searchInputValue}
          />
          <button
            className="search-button-search-component"
            type="button"
            /* testid="searchIcon" */
            onClick={onClickSearchSubmit}
          >
            <FaSearch />
          </button>
        </div>
      )

      const renderInitailView = () => (
        <div className="initial-search-component">
          {renderSearchView()}
          <div className="initial-search-components-small-container">
            <img
              className="initial-search-component-image"
              src="https://res.cloudinary.com/duzcy6kuh/image/upload/v1675493710/Instagram%20Clone%20Images/Frame_1473_j3eqcc.png"
              alt="search-small-component"
            />
            <p className="initial-search-text">
              Search Results will be appear here
            </p>
          </div>
        </div>
      )

      const renderSuccessView = () => (
        <div className="search-component-success-container">
          {renderSearchView()}
          <div className="search-component-with-success-results">
            {usersPosts.length === 0 ? (
              <>
                <img
                  className="no-posts-on-search-image"
                  src="https://res.cloudinary.com/duzcy6kuh/image/upload/v1675499860/Instagram%20Clone%20Images/Group_p2ey8k.png"
                  alt="search not found"
                />
                <h1 className="search-not-found">Search Not Found</h1>
                <p className="try-another-search-text ">
                  Try different keyword or search again
                </p>
              </>
            ) : (
              <>
                <h1 className="text-search-results">Search Results</h1>
                <ul className="user-posts-container">
                  {usersPosts.map(eachPost => (
                    <UserPostsComponent
                      key={eachPost.post_id}
                      userPost={eachPost}
                    />
                  ))}
                </ul>
              </>
            )}
          </div>
        </div>
      )

      const renderFailureView = () => (
        <div className="search-component-failure">
          <SomethingWentWrong onRetry={onClickRetry} />
        </div>
      )

      const renderLoadingView = () => (
        <div className="loading-search-component">
          {renderSearchView()}
          <div className="loader-component-container">
            <div className="loader-container" data-testid="loader">
              <Loader type="TailSpin" color="#4094EF" height={50} width={50} />
            </div>
          </div>
        </div>
      )

      switch (searchApiStatus) {
        case apiStatusConstants.initial:
          return renderInitailView()
        case apiStatusConstants.success:
          return renderSuccessView()
        case apiStatusConstants.failure:
          return renderFailureView()
        case apiStatusConstants.inProgress:
          return renderLoadingView()
        default:
          return null
      }
    }}
  </SearchContext.Consumer>
)

export default withRouter(SearchComponent)
