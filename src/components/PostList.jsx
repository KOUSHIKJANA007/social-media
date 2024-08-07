import React, { useContext, useEffect, useState } from 'react'
import Post from './Post'
import { PostList as PostListData } from '../store/post-list-store';
import WelcomeMessage from './WelcomeMessage';
import LoadingSpinner from './LoadingSpinner';

const PostList = () => {
  const DEFAULT_POST_LIST = [
    {
        id: '1',
        title: 'going to mumbai',
        body: 'Hi friends i am going to mumbai',
        reactions: '1',
        userId: 'user-9',
        tags: ["mumbai", "vacation", "enjoy"]
    },
    {
        id: '2',
        title: 'pass ho bhai',
        body: 'Hi friends i am passed',
        reactions: '12',
        userId: 'user-12',
        tags: ["passed", "exam", "enjoy"]
    }
]
  // const { postList, addInitialPosts } = useContext(PostListData);
  const [fetching,setFetching]=useState(false);
  useEffect(() => {
    setFetching(true);

    const controller=new AbortController();
    const signal=controller.signal;
    fetch('https://dummyjson.com/posts',{signal})
      .then((res) => res.json())
      .then((data) => {
        // addInitialPosts(data.posts);
        setFetching(false);
      });
      return ()=>{
        controller.abort();
      };
  },[]);
console.log("post list is",postList);

  return (
    <>
    {fetching && <LoadingSpinner></LoadingSpinner>}
      { !fetching && postList.length === 0 && <WelcomeMessage></WelcomeMessage>}
      {
        !fetching && DEFAULT_POST_LIST.map((post) => (
          <Post key={post.id} post={post}></Post>
        ))}
    </>
  )
}

export default PostList
