import {BsGrid3X3} from 'react-icons/bs'
import {withRouter} from 'react-router-dom'
import {BiCamera} from 'react-icons/bi'

import './index.css'

const ProfileComponent = props => {
  const {userProfileData} = props

  const {match} = props
  const altValueProfilePic =
    match.path === '/my-profile' ? 'my profile' : 'user profile'
  const altValueStory = match.path === '/my-profile' ? 'my story' : 'user story'
  const altValuePost = match.path === '/my-profile' ? 'my post' : 'user post'

  const renderPostDetails = () => {
    const {posts} = userProfileData
    if (userProfileData.posts_count !== 0) {
      return (
        <ul className="posts_list" key={userProfileData.user_id}>
          {posts.map(eachPost => (
            <li className="posts_list_item" key={eachPost.id}>
              <img
                src={eachPost.image}
                alt={altValuePost}
                className="post_img"
              />
            </li>
          ))}
        </ul>
      )
    }
    return (
      <div className="no_posts">
        <div className="icon_container">
          <BiCamera className="camera_icon" />
        </div>
        <h1 className="no_post_heading">No Posts</h1>
      </div>
    )
  }

  return (
    <div className="userprofile_container">
      <div className="respon_container">
        <div className="profile_details">
          <div className="mobile_view">
            <h1 className="profile_username">{userProfileData.user_name}</h1>
            <div className="profile_container">
              <img
                src={userProfileData.profile_pic}
                alt={altValueProfilePic}
                className="profile_pic"
              />
              <ul className="profile_stat_list">
                <li className="profile_stat_item">
                  <h1 className="profile_stat_count">
                    {userProfileData.posts_count}
                  </h1>
                  <p className="profile_stat_text">posts</p>
                </li>
                <li className="profile_stat_item">
                  <h1 className="profile_stat_count">
                    {userProfileData.followers_count}
                  </h1>
                  <p className="profile_stat_text">followers</p>
                </li>
                <li className="profile_stat_item">
                  <h1 className="profile_stat_count">
                    {userProfileData.following_count}
                  </h1>
                  <p className="profile_stat_text">following</p>
                </li>
              </ul>
            </div>
            <div className="profile_bio_container">
              <p className="profile_bio_username">
                {userProfileData.user_id}
              </p>
              <p className="profile_bio">{userProfileData.user_bio}</p>
            </div>
          </div>
          <div className="desktop_view">
            <img
              src={userProfileData.profile_pic}
              alt="user profile"
              className="profile_pic"
            />
            <div className="profile_container">
              <h1 className="profile_username">{userProfileData.user_name}</h1>
              <ul className="profile_stat_list">
                <li className="profile_stat_item">
                  <p className="profile_stat_count">
                    {userProfileData.posts_count}
                  </p>
                  <p className="profile_stat_text">posts</p>
                </li>
                <li className="profile_stat_item">
                  <p className="profile_stat_count">
                    {userProfileData.followers_count}
                  </p>
                  <p className="profile_stat_text">followers</p>
                </li>
                <li className="profile_stat_item">
                  <p className="profile_stat_count">
                    {userProfileData.following_count}
                  </p>
                  <p className="profile_stat_text">following</p>
                </li>
              </ul>
              <div className="profile_bio_container">
                <h1 className="profile_bio_username">
                  {userProfileData.user_name}
                </h1>
                <p className="profile_bio">{userProfileData.user_bio}</p>
              </div>
            </div>
          </div>
        </div>
        <ul className="stories_list">
          {userProfileData.stories.map(eachStory => (
            <li className="stories_list_item" key={eachStory.id}>
              <img
                src={eachStory.image}
                alt={altValueStory}
                className="story_img"
              />
            </li>
          ))}
        </ul>
        <div className="posts_details">
          <div className="post_details_header">
            <BsGrid3X3 className="post_details_icon" />
            <h1 className="post_details_title">Posts</h1>
          </div>
          <div className="posts_container">{renderPostDetails()}</div>
        </div>
      </div>
    </div>
  )
}

export default withRouter(ProfileComponent)
