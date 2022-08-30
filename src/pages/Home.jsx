import React, {useRef, useEffect, useState} from "react";
import Post from '../components/Post';
import {useForm} from 'react-hook-form';
import { v4 as uuidv4 } from 'uuid';
import { useOutletContext } from "react-router-dom";
function Home() {
  const containerRef = useRef();
  const imageRef = useRef();
  const [imageDataUrl, setImageDataUrl] = useState();
  const [user, setUser] = useState();
  const [allPost, setAllPost] = useState();
  const [updateFeed, setUpdateFeed] = useState(0);
  const [followingCount, setFollowingCount] = useState(0);
  const [followersCount, setFollowersCount] = useState(0);
  const {
    register,
    handleSubmit,
    formState: {errors},
    reset,
  } = useForm();

  const [followCountUpdate] = useOutletContext();

  useEffect(()=>{
        let loggedIn;
        if(localStorage.getItem('loggedIn') === null){
            loggedIn = [];
        }else{
            loggedIn = JSON.parse(localStorage.getItem('loggedIn'));
        }
        if(loggedIn.length > 0){
            setUser(loggedIn[0]);
        }
    }, [])

    useEffect(() => {
        let allUsers;
        if(localStorage.getItem('allUsers') === null){
            allUsers = [];
        }else{
            allUsers = JSON.parse(localStorage.getItem('allUsers'));
        }
        let loggedIn;
        if(localStorage.getItem('loggedIn') === null){
            loggedIn = [];
        }else{
            loggedIn = JSON.parse(localStorage.getItem('loggedIn'));
        }
        setFollowingCount(allUsers.filter(value => value.username === loggedIn[0].username)[0].following.length);
        setFollowersCount(allUsers.filter(value => value.username === loggedIn[0].username)[0].followers.length);
    }, [followCountUpdate])

    useEffect(()=>{
        let feed;
        if(localStorage.getItem('feed') === null){
            feed = [];
        }else{
            feed = JSON.parse(localStorage.getItem('feed'));
        }
        setAllPost(feed);
    }, [updateFeed])

  useEffect(()=>{
      containerRef.current.children[0].addEventListener("keyup", (e)=>{
          containerRef.current.children[0].style.height = "70px";
          let scHeight = e.target.scrollHeight;
          containerRef.current.children[0].style.height = `${scHeight}px`;
      })
  }, [])

  const onSubmit = (data) => {
    saveFeedToLocal({
        postID: uuidv4(),
        content: data.myTweet,
        image: `${imageDataUrl ? imageDataUrl : ""}`,
        totalLikes: [],
        author: user,
        createdOn: new Date(),
        updatedOn: null,
    });
    imageRef.current.setAttribute('src', "");
    imageRef.current.style.display = "none";
    reset({ myTweet: ''});
    setImageDataUrl("");
  };

  const showImage = (e) => {
      const reader = new FileReader();
      reader.addEventListener('load', ()=>{
        setImageDataUrl(reader.result);
        imageRef.current.setAttribute('src', reader.result);
        imageRef.current.style.display = "block";
      })
      reader.readAsDataURL(e.target.files[0]);
  }

    function saveFeedToLocal(newFeed){
        let feed;
        if(localStorage.getItem('feed') === null){
            feed = [];
        }else{
            feed = JSON.parse(localStorage.getItem('feed'));
        }
        feed.push(newFeed);
        localStorage.setItem('feed', JSON.stringify(feed));
        setUpdateFeed(updateFeed => updateFeed + 1);
    }

  return (
    <div className="flex-[0.5] overflow-y-scroll home">
        <div className="flex items-center justify-between">
            <h1 className="m-[12px] p-[5px] text-xl font-bold">Home</h1>
            <div className="mr-[12px]">
                <div className="text-sm font-semibold">followers: {followersCount && followersCount}</div>
                <div className="text-sm font-semibold">following: {followingCount && followingCount}</div>
            </div>
        </div>
        <div className="m-[12px] p-[5px] border-[1px] border-[rgb(229, 229, 229)] flex">
            <div className="shrink-0 w-[40px] h-[40px] rounded-[50%] overflow-hidden cursor-pointer border-[1px] border-[rgb(229, 229, 229)]">
            {
                user && (user.image !== null ? <img src={user.image} /> : <div className="w-full h-full text-black font-bold grid place-content-center" style={{backgroundColor: user.backgroundColor}}>{user.nameShorten}</div>)
            }
            </div>
            <form className="ml-[10px] w-full" onSubmit={handleSubmit(onSubmit)}>
                <div ref={containerRef}>
                    <textarea className="tweetMsg w-full h-[60px] max-h-[400px] resize-none p-[5px] outline-0" placeholder="What's happening" maxLength="280" {...register("myTweet", {
                        required: "message required",
                    })}/>
                    <img ref={imageRef} src="" className="w-[100px] h-[100px] object-cover my-[10px] hidden" />
                </div>
                <div className="flex items-center justify-between">
                    <div className="text-[#0284c7] text-2xl">
                        <input type="file" id="file" className="hidden" onChange={(e)=> showImage(e)} />
                        <label htmlFor="file">
                            <i className="fa-solid fa-image mr-[12px] cursor-pointer"></i>
                        </label>

                        <i className="fa-solid fa-square-poll-horizontal mr-[12px] cursor-pointer"></i>
                        <i className="fa-solid fa-face-smile mr-[12px] cursor-pointer"></i>
                    </div>
                    <div>
                        {errors.myTweet && (
                            <small className="text-[#dc2626] mr-[8px]">
                                {errors.myTweet.message}
                            </small>
                        )}
                        <button type="submit" className="bg-[#0284c7] py-[8px] px-[12px] rounded-3xl cursor-pointer text-white font-semibold hover:bg-[#0369a1] text-center">Tweet</button>
                    </div>
                </div>
            </form>
        </div>
        <hr />

        {
            allPost && allPost.length>0 && allPost.sort((a, b) => 0.5 - Math.random()).map(post => 
                <Post 
                    key={post.postID}
                    postID={post.postID}
                    content={post.content}
                    image={post.image}
                    totalLikes={post.totalLikes}
                    author={post.author}
                    createdOn={post.createdOn}
                    updatedOn={post.updatedOn}
                    setUpdateFeed={setUpdateFeed}
                />
            )
        }
    </div>
  );
}

export default Home;