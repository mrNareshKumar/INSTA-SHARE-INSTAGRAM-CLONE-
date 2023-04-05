import Slider from 'react-slick'

import './index.css'

const settings = {
  dots: false,
  infinite: false,
  speed: 500,
  slidesToShow: 8,
  slidesToScroll: 1,
  responsive: [
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 6,
        slidesToScroll: 1,
      },
    },
    {
      breakpoint: 600,
      settings: {
        slidesToShow: 5,
        slidesToScroll: 1,
      },
    },
    {
      breakpoint: 480,
      settings: {
        slidesToShow: 4,
        slidesToScroll: 1,
      },
    },
    {
      breakpoint: 360,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 1,
      },
    },
  ],
}

const UserStoriesComponent = props => {
  const {userStories} = props

  return (
    <div className="slick-container">
      <Slider {...settings}>
        {userStories.map(eachLogo => {
          const {userId, userName, storyUrl} = eachLogo
          return (
            <li className="slick-item" key={userId}>
              <img className="story_img" src={storyUrl} alt="user story" />
              <h1 className="story_username">{userName}</h1>
            </li>
          )
        })}
      </Slider>
    </div>
  )
}

export default UserStoriesComponent
