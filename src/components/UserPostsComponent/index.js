import {Component} from 'react'
import Cookies from 'js-cookie'
import {BsHeart} from 'react-icons/bs'
import {FaRegComment} from 'react-icons/fa'
import {BiShareAlt} from 'react-icons/bi'
import {FcLike} from 'react-icons/fc'
import {Link} from 'react-router-dom'
import './index.css'

class UserPostsComponent extends Component {
  constructor(props) {
    super(props)
    const {userPost} = props
    this.state = {postLikedStatus: false, postLikedCounts: userPost.likes_count}
  }

  likeClicked = async () => {
    const {userPost} = this.props
    const jwtToken = Cookies.get('jwt_token')
    const apiUrl = `https://apis.ccbp.in/insta-share/posts/${userPost.post_id}/like`
    const options = {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      body: JSON.stringify({like_status: true}),
    }
    const response = await fetch(apiUrl, options)
    console.log(response)
    const data = await response.json()
    console.log(data)
    this.setState(prevState => ({
      postLikedStatus: true,
      postLikedCounts: prevState.postLikedCounts + 1,
    }))
  }

  unlikeClicked = async () => {
    const {userPost} = this.props
    const jwtToken = Cookies.get('jwt_token')
    const apiUrl = `https://apis.ccbp.in/insta-share/posts/${userPost.post_id}/like`
    const options = {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      body: JSON.stringify({like_status: false}),
    }
    const response = await fetch(apiUrl, options)
    console.log(response)
    const data = await response.json()
    console.log(data)
    this.setState(prevState => ({
      postLikedStatus: false,
      postLikedCounts: prevState.postLikedCounts - 1,
    }))
  }

  render() {
    const {userPost} = this.props
    const postDetails = userPost.post_details
    const {postLikedStatus, postLikedCounts} = this.state
    return (
      <li className="post_card" key={userPost.post_id}>
        <div className="post_card_header" key={userPost.user_id}>
          <Link to={`/users/${userPost.user_id}`}>
            <div className="post_card_profile_container">
              <img
                src={userPost.profile_pic}
                alt="post author profile"
                className="post_card_user_profile"
              />
            </div>
          </Link>
          <Link to={`/users/${userPost.user_id}`}>
            <h1 className="post_card_username">{userPost.user_name}</h1>
          </Link>
        </div>
        <img
          src={postDetails.image_url}
          alt="post"
          className="post_card_post_image"
        />
        <div className="post_card_footer">
          <ul className="post_card_icon_list">
            {!postLikedStatus ? (
              <button
                className="post_card_icon"
                type="button"
                onClick={this.likeClicked}
                data-testid="likeIcon"
              >
                <BsHeart data-testid="likeIcon" size={24} />
              </button>
            ) : (
              <button
                className="post_card_icon"
                onClick={this.unlikeClicked}
                type="button"
                data-testid="unLikeIcon"
              >
                <FcLike data-testid="unLikeIcon" size={24} />
              </button>
            )}
            <li className="post_card_icon">
              <FaRegComment size={24} />
            </li>
            <li className="post_card_icon">
              <BiShareAlt size={24} />
            </li>
          </ul>
          <p className="post_card_likesCount">{postLikedCounts} likes</p>
          <p className="post_card_caption">{postDetails.caption}</p>
          <ul className="post_card_comments_list">
            {userPost.comments.map(eachCommment => (
              <li className="post_card_comment" key={eachCommment.user_id}>
                <p className="post_card_comment_comment">
                  <span className="post_card_comment_username">
                    {eachCommment.user_name}
                  </span>
                  {eachCommment.comment}
                </p>
              </li>
            ))}
          </ul>
          <p className="post_card_created_At">{userPost.created_at}</p>
        </div>
      </li>
    )
  }
}

export default UserPostsComponent
