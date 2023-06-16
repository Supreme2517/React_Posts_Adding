import React from 'react'
import MyButton from '../UI/button/MyButton'
import { useNavigate } from 'react-router-dom';

function PostItem(props) {

  let navigate = useNavigate();
  function handleClick() {
    navigate(`/posts/${props.post.id}`);
  }

  return (
    <div>
      <div className='post'>
        <div className='post__content'>
          <strong>{props.number}. {props.post.title}</strong>
          <div>{props.post.body}</div>
        </div>
        <div className='post__btns'>
        <MyButton onClick={handleClick} >Открыть</MyButton>
          <MyButton onClick={() => props.remove(props.post)} >Удалить</MyButton>
        </div>
      </div>
    </div>
  )
}

export default PostItem;