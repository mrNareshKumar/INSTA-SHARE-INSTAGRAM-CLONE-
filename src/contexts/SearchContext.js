import React from 'react'

const SearchContext = React.createContext({
  showHamburger: false,
  showSearchComponent: false,
  searchApiStatus: 'INITIAL',
  searchInputValue: '',
  usersPosts: [],
})

export default SearchContext
