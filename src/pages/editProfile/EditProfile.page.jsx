import React, { useEffect, useState } from 'react'
import { toast } from 'react-hot-toast';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import useRedirectLoggedOut from '../../components/customHook/useRedirectLoggedOut.component';
import Loader from '../../components/loader/Loader.component';
import {  SET_USER, SET_USERNAME } from '../../redux/slices/auth/authSlice';
import { GetUserData, UpdateProfile } from '../../services/auth.services';

const EditProfile = () => {
    useRedirectLoggedOut('/login');
    const navigate=useNavigate()
    const dispatch = useDispatch();
    const initialState = {
        username: "",
        bio: "",
        phone: "",
        imageUrl:"",
        email:""
    }
    
    const [userImage,setUserImage] = useState("")
    const [imagePreview,setImagePreview] =useState("")
    const [user, setUser] = useState(initialState);
    const [isLoading, setIsLoading] = useState(false);
    useEffect(() => {
        setIsLoading(true);
        async function getUserData() {
          const { data } = await GetUserData();
            const { name, emailAddress, phone, bio, imageUrl } = data
            setUser({
                username:name,
                email: emailAddress,
                phone: phone,
                bio: bio,
            })
            setUserImage(imageUrl)
    
          await dispatch(SET_USER(data));
          await dispatch(SET_USERNAME(data.name));
    
          setIsLoading(false);
        }
    
        getUserData();
      }, [dispatch]);


    const handleInputChange = (e) => {
        const {name,value} = e.target
        setUser({...user,[name]:value})
    }
    
    const handleImageChange = (e) => {
        setUserImage(e.target.files[0])
        setImagePreview(URL.createObjectURL(e.target.files[0]));
     }

    

    const saveProfile = async(e) => {
       e.preventDefault();
        setIsLoading(true)
        try {
            //handle image upload
            let imageUrl;
            if (userImage && (userImage.type === "image/jpeg" ||
                userImage.type === "image/jpg" ||
                userImage.type === "image/png")) {
                const image = new FormData();
                image.append("file", userImage);
                image.append("cloud_name", "duqwy8bs3");
                image.append("upload_preset", "ldhukrsx");
                //save imageto cloudinary
                const res = await fetch("https://api.cloudinary.com/v1_1/duqwy8bs3/image/upload", { method: "post", body: image });
                const imgData = await res.json();
                imageUrl = imgData.url.toString();
            }
                
                const formData = {
                    username: user.username,
                    bio: user.bio,
                    phone: user.phone,
                    imageUrl: userImage ? imageUrl : user.imageUrl,
                
                }
                const response = await UpdateProfile(formData)
                setIsLoading(false)
                toast.success(response.message)
                navigate('/profile')
                 
        } catch (error) {
            setIsLoading(false)
            console.log(error.res)
        }
     }
    
  return (
    <>
    {isLoading && <Loader/>}
          <div className='w-full lg:w-fit lg:mx-auto flex flex-col p-5'>
              <h1 className='text-2xl'>Edit profile</h1>
              <hr/>
              <form onSubmit={(e) => saveProfile(e)} className="flex flex-col lg:flex-row py-5 justify-around" >
                  <div className='flex w-fit lg:w-1/4 flex-col justify-center items-center gap-5 mb-5'>
                  <img src={imagePreview?imagePreview:userImage } alt="profile" className="w-40 h-40  rounded-full"/>
                    
                      <input type="file" name="image" onChange={handleImageChange} className="bg-gray-100 p-5 rounded-full w-1/2 lg:w-3/4 mx-auto cursor-pointer" />
                  </div>
                  <div className='flex flex-col'>
                    
                  <input  className='bg-gray-100 mb-3 rounded-md p-2' type="text" name="username" value={user.username} onChange={(e) => handleInputChange(e) } placeholder='Username...'/> 
                  <code>Email Address cannot be changed</code>
                      <span className='bg-gray-100 mb-3 rounded-md p-2 text-gray-300'   >{user.email}</span> 
                  <input className='bg-gray-100 mb-3 rounded-md p-2' type="text" name="bio" value={user.bio} onChange={(e) => handleInputChange(e) } placeholder="Bio.."/> 
                  <input className='bg-gray-100 mb-3 rounded-md p-2' type="text" name="phone" value={user.phone} onChange={(e) => handleInputChange(e) } placeholder="Phone Number.."/> 
                  <button type="submit">Save</button>
                  </div>
            </form>
          </div>
    </>
  )
}

export default EditProfile