import React from "react";
import './ForumPost.scss';
import moment from 'moment';
import {AiFillLike, AiOutlineComment} from 'react-icons/ai'

const ForumPost = ({
  post: { post: id, body, createdAt, username, likeCount, commentCount },
}) => {

const likePost = () => {
    console.log('like post');
}

const commentOnPost = () => {
    console.log('comment on post');
}

  return (
    <div className="forum-post">
      <h3 className="forum-author">{username}</h3>
      <span className="forum-meta-text">{moment(createdAt).fromNow()}</span>
      <p className="forum-body">{body}</p>
    
      <div className="meta-data">
        <div className="forum-tracking">
            <span className="forum-meta-text" onClick={likePost}><AiFillLike className="forum-like"/>{likeCount}</span>
            <span className="forum-meta-text" onClick={commentOnPost}><AiOutlineComment className="forum-comment"/> {commentCount}</span>
        </div>
        </div>
    </div>
  );
};

export default ForumPost;
