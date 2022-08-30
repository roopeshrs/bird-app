import React, {useEffect, useState, useRef} from "react";
import moment from 'moment';
import {useForm} from 'react-hook-form';
function Post({postID, content, image, totalLikes, author, createdOn, updatedOn, setUpdateFeed}) {
  const [loggedInUser, setLoggedInUser] = useState();
  const editContainerRef = useRef();
  const editImageRef = useRef();
  const mainContainerRef = useRef();
  const likesInitialRender = useRef(true);
  const [editedImageDataUrl, setEditedImageDataUrl] = useState("");
  const [isLiked, setIsLiked] = useState(false);
  const [isLikedInitialValue, setIsLikedInitialValue] = useState(false);
  const {
    register,
    handleSubmit,
    formState: {errors},
    reset,
  } = useForm();

  const onSubmit = (data) => {
    let feed;
    if(localStorage.getItem('feed') === null){
        feed = [];
    }else{
        feed = JSON.parse(localStorage.getItem('feed'));
    }
    const indexToUpdate = feed.findIndex(item => item.postID === postID);
    feed[indexToUpdate].content = data.editedTweet;
    feed[indexToUpdate].image = `${editedImageDataUrl ? editedImageDataUrl : ""}`,
    feed[indexToUpdate].updatedOn = new Date();
    localStorage.setItem('feed', JSON.stringify(feed));
    editImageRef.current.setAttribute('src', "");
    editImageRef.current.style.display = "none";
    reset({ editedTweet: ''});
    setEditedImageDataUrl("");
    mainContainerRef.current.style.display = "none";
    setUpdateFeed(updateFeed => updateFeed+1);
  };

  useEffect(()=>{
      editContainerRef.current.children[0].addEventListener("keyup", (e)=>{
          editContainerRef.current.children[0].style.height = "70px";
          let scHeight = e.target.scrollHeight;
          editContainerRef.current.children[0].style.height = `${scHeight}px`;
      })
  }, [])

  const showImage = (e) => {
    const reader = new FileReader();
    reader.addEventListener('load', ()=>{
        setEditedImageDataUrl(reader.result);
        // editImageRef.current.setAttribute('src', reader.result);
        editImageRef.current.src = reader.result;
        editImageRef.current.style.display = "block";
        e.target.value = null;
    })
    reader.readAsDataURL(e.target.files[0]);
  }

  useEffect(()=>{
    let loggedIn;
    if(localStorage.getItem('loggedIn') === null){
        loggedIn = [];
    }else{
        loggedIn = JSON.parse(localStorage.getItem('loggedIn'));
    }
    if(loggedIn.length > 0){
        setLoggedInUser(loggedIn[0]);
    }
  },[])

  function removePostFromLocal(){
    let feed;
    if(localStorage.getItem('feed') === null){
        feed = [];
    }else{
        feed = JSON.parse(localStorage.getItem('feed'));
    }
    const indexToRemove = feed.findIndex(item => item.postID === postID);
    feed.splice(indexToRemove, 1);
    localStorage.setItem('feed', JSON.stringify(feed));
    setUpdateFeed(updateFeed => updateFeed+1);
  }

  function toggleMainContainer(){
    let feed;
    if(localStorage.getItem('feed') === null){
        feed = [];
    }else{
        feed = JSON.parse(localStorage.getItem('feed'));
    }
    const indexToUpdate = feed.findIndex(item => item.postID === postID);
    const oldContent = feed[indexToUpdate].content;
    const oldImage = feed[indexToUpdate].image;
    mainContainerRef.current.style.display = "flex";
    editContainerRef.current.children[0].value = oldContent;
    if(oldImage !== ""){
        editImageRef.current.style.display = "block";
        editImageRef.current.setAttribute('src', oldImage);
        setEditedImageDataUrl(oldImage);
    }
    editContainerRef.current.children[0].focus();
  }

  useEffect(()=>{
    let loggedIn;
    if(localStorage.getItem('loggedIn') === null){
        loggedIn = [];
    }else{
        loggedIn = JSON.parse(localStorage.getItem('loggedIn'));
    }

    let allUsers;
    if(localStorage.getItem('allUsers') === null){
        allUsers = [];
    }else{ 
       allUsers = JSON.parse(localStorage.getItem('allUsers'));
    } 
    const getIndex = allUsers.findIndex(user => user.username === loggedIn[0].username);
    allUsers[getIndex].likedPosts.includes(postID) && setIsLikedInitialValue(true);
  },[])

  useEffect(()=>{
    if (likesInitialRender.current) {
      likesInitialRender.current = false;
    } else {
      setIsLikedInitialValue(false);
      updateLikeCount();
    }
  },[isLiked])

  function updateLikeCount(){
    let feed;
    if(localStorage.getItem('feed') === null){
        feed = [];
    }else{
        feed = JSON.parse(localStorage.getItem('feed'));
    }
    const indexToUpdate = feed.findIndex(item => item.postID === postID);
    let loggedInUsername = loggedInUser && loggedInUser.username;
    if(isLiked){
        if(!feed[indexToUpdate].totalLikes.includes(loggedInUser.username)){
            feed[indexToUpdate].totalLikes.push(loggedInUser.username);
            addLikedPostInfo();
        }
    }else{
        feed[indexToUpdate].totalLikes = feed[indexToUpdate].totalLikes.filter(username => username !== loggedInUsername);
        removeLikedPostInfo();
    }
    localStorage.setItem('feed', JSON.stringify(feed));
    setUpdateFeed(updateFeed => updateFeed+1);
  }

  function addLikedPostInfo(){
    let allUsers;
    if(localStorage.getItem('allUsers') === null){
        allUsers = [];
    }else{
        allUsers = JSON.parse(localStorage.getItem('allUsers'));
    }
    let loggedInUsername = loggedInUser && loggedInUser.username;
    const indexToUpdate = allUsers.findIndex(user => user.username === loggedInUsername);
    allUsers[indexToUpdate].likedPosts.push(postID);
    localStorage.setItem('allUsers', JSON.stringify(allUsers));
  }

  function removeLikedPostInfo(){
    let allUsers;
    if(localStorage.getItem('allUsers') === null){
        allUsers = [];
    }else{
        allUsers = JSON.parse(localStorage.getItem('allUsers'));
    }
    let loggedInUsername = loggedInUser && loggedInUser.username;
    const indexToUpdate = allUsers.findIndex(user => user.username === loggedInUsername);
    if(allUsers[indexToUpdate].likedPosts.length > 0){
        allUsers[indexToUpdate].likedPosts = allUsers[indexToUpdate].likedPosts.filter(postid => postid !== postID);
        localStorage.setItem('allUsers', JSON.stringify(allUsers));
    }
  }

  return (
    <>
    <div className="m-[12px] p-[5px] flex">
            <div className="mr-[12px]">
                <div className="shrink-0 w-[40px] h-[40px] rounded-[50%] overflow-hidden cursor-pointer border-[1px] border-[rgb(229, 229, 229)]">
            {
                author.image !== null ? <img src={author.image} /> : <div className="w-full h-full text-black font-bold grid place-content-center" style={{backgroundColor: author.backgroundColor}}>{author.nameShorten}</div> 
            }
                </div>
            </div>
            <div className="flex-1">
                <div className="flex justify-between">
                    <div>
                        <span className="font-bold mr-[8px]">{author.fullName}</span>
                        <span className="text-[#6b7280] font-semibold mr-[8px]">{`@${author.username}`}</span>
                        <span className="text-[#6b7280] mr-[8px]">
                        - {updatedOn !== null ? `updated ${moment(updatedOn).fromNow()}` : moment(createdOn).fromNow()}
                        </span>
                    </div>
                    <div>
                        <i className="fa-solid fa-angle-down text-[#6b7280] cursor-pointer"></i>
                    </div>
                </div>
                <div className="mb-[12px]">
                    {content}
                </div>
                <div className="rounded-2xl overflow-hidden mb-[12px]">
                    <img src={image} />
                </div>
                <div className="flex justify-between mb-[12px] text-[#6b7280]">
                    <div><i className="fa-regular fa-comment cursor-pointer"></i><span className="cursor-default ml-[5px]">3</span></div>
                    <div onClick={()=>{
                        setIsLiked(!isLiked);
                    }}>
                    {
                        isLikedInitialValue || isLiked ? <i className="fa-solid fa-heart cursor-pointer text-[#dc2626]"></i> : <i className="fa-regular fa-heart cursor-pointer text-[#dc2626]"></i>
                    }
                    <span className="cursor-default ml-[5px]">{totalLikes.length}</span></div>
                    <div><i className="fa-solid fa-retweet cursor-pointer"></i><span className="cursor-default ml-[5px]">1</span></div>
                    <div><i className="fa-solid fa-arrow-up-from-bracket cursor-pointer"></i><span className="cursor-default ml-[5px]">1</span></div>

                    {
                        loggedInUser && loggedInUser.username === author.username && (
                            <div><i className="fa-solid fa-pen-to-square cursor-pointer text-[#1f2937]" onClick={toggleMainContainer}></i></div>
                        )
                    }

                    {
                        loggedInUser && loggedInUser.username === author.username && (
                            <div><i className="fa-solid fa-trash-can cursor-pointer text-[#b91c1c]" onClick={removePostFromLocal}></i></div>
                        )
                    }
                </div>
            </div>
        </div>
        <hr />


        <div ref={mainContainerRef} className="p-[5px] border-[5px] border-[rgb(229, 229, 229)] flex absolute top-[50%] left-[50%] translate-y-[-50%] translate-x-[-50%] bg-white w-[50%] hidden">
            <div className="shrink-0 w-[40px] h-[40px] rounded-[50%] overflow-hidden cursor-pointer border-[1px] border-[rgb(229, 229, 229)]">
            {
                author.image !== null ? <img src={author.image} /> : <div className="w-full h-full text-black font-bold grid place-content-center" style={{backgroundColor: author.backgroundColor}}>{author.nameShorten}</div>
            }
            </div>
            <form className="ml-[10px] w-full" onSubmit={handleSubmit(onSubmit)}>
                <div ref={editContainerRef}>
                    <textarea className="tweetMsg w-full h-[60px] max-h-[400px] resize-none p-[5px] outline-0" placeholder="What's happening" maxLength="280" {...register("editedTweet", {
                        required: "message required",
                    })}/>
                    <img ref={editImageRef} src="" className="w-[100px] h-[100px] object-cover my-[10px] hidden" />
                </div>
                <div className="flex items-center justify-between">
                    <div className="text-[#0284c7] text-2xl">
                        <input type="file" id="editFile" className="hidden" onChange={(e)=> showImage(e)} />
                        <label htmlFor="editFile">
                            <i className="fa-solid fa-image mr-[12px] cursor-pointer"></i>
                        </label>

                        <i className="fa-solid fa-square-poll-horizontal mr-[12px] cursor-pointer"></i>
                        <i className="fa-solid fa-face-smile mr-[12px] cursor-pointer"></i>
                    </div>
                    <div>
                        {errors.editedTweet && (
                            <small className="text-[#dc2626] mr-[8px]">
                                {errors.editedTweet.message}
                            </small>
                        )}
                        <button type="submit" className="bg-[#0284c7] py-[8px] px-[12px] rounded-3xl cursor-pointer text-white font-semibold hover:bg-[#0369a1] text-center">Update</button>
                    </div>
                </div>
            </form>
        </div>


    </>
  );
};

export default Post;