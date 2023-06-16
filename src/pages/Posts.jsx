import { React, useEffect, useRef, useState } from "react";
import {usePosts} from "../hooks/usePosts";
import { useFetching } from "../hooks/useFetching";
import PostService from "../API/PostService";
import {getPageCount} from "../utils/pages";
import MyButton from "../UI/button/MyButton";
import MyModal from "../UI/MyModal/MyModal";
import PostForm from "../components/PostForm";
import PostFilter from "../components/PostFilter";
import Loader from "../UI/Loader/Loader";
import PostList from "../components/PostList";
import { Pagination } from "../UI/pagination/Pagination";
import '../Styles/App.css'
import { useObserver } from "../hooks/useObserver";


function Posts() {

  const [posts, setPosts] = useState([])
  const [filter, setFilter] = useState({ sort: '', query: '' });
  const [modal, setModal] = useState(false);
  const [totalPages, setTotalPages] = useState(0);
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(1);
  const sortedAndSearchedPosts = usePosts(posts, filter.sort, filter.query);
  const lastElement = useRef()

  const [fetchPosts, isPostsLoading, postError] = useFetching(async (limit, page) => {
    const response = await PostService.getAll(limit, page);
    setPosts([...posts, ...response.data]);
    const totalCount = response.headers['x-total-count']
    setTotalPages(getPageCount(totalCount, limit))
  });

 useObserver(lastElement, page < totalPages, isPostsLoading, () => {
  setPage(page + 1);
 })


  useEffect(() => {
    fetchPosts(limit, page);
  }, [page])

  const createPost = (newPost) => {
    setPosts([...posts, newPost])
    setModal(false)
  }

const changePage = (page) => {
  setPage(page)
}


  const removePost = (post) => {
    setPosts(posts.filter(p => p.id !== post.id))
  }


  return (

    <div className="App">
      <MyButton style={{ marginTop: 30 }} onClick={() => setModal(true)}>
        Добавить пост
      </MyButton>
      <MyModal visible={modal} setVisible={setModal}>
        <PostForm create={createPost} />
      </MyModal>

      <hr style={{ margin: "15px 0" }} />
      <PostFilter filter={filter} setFilter={setFilter} />

      {postError &&
        <h1>Произошла ошибка : ${postError}</h1>}
        
      <PostList remove={removePost} posts={sortedAndSearchedPosts} title='Список постов' />
      <div ref={lastElement} style={{height: '20px'}}></div>
      {isPostsLoading &&
         <div style={{ display: 'flex', justifyContent: 'center', marginTop: '100px' }}>
          <Loader />
        </div>
      }
      <Pagination page ={page} totalPages={totalPages} changePage={changePage}/>

    </div>
  );
}

export default Posts;
