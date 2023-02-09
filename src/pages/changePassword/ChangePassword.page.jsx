import React, { useState } from 'react'
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import useRedirectLoggedOut from '../../components/customHook/useRedirectLoggedOut.component';
import Loader from '../../components/loader/Loader.component';
import { ChangePasswordHandler  } from '../../services/auth.services';

const ChangePassword = () => {
    useRedirectLoggedOut('/login');
    const navigate=useNavigate()

    const initialState = {
        oldPassword: "",
        newPassword: "",
        confirmNewPassword:"",
    }
    

    const [user, setUser] = useState(initialState);
    const [isLoading, setIsLoading] = useState(false);


    const handleInputChange = (e) => {
        const {name,value} = e.target
        setUser({...user,[name]:value})
    }

    const savePassword = async(e) => {
        e.preventDefault()
        console.log(user)
        const {oldPassword,newPassword,confirmNewPassword } = user;
        if (newPassword !== confirmNewPassword) { 
            return toast.error("Your new Password not Match!")
        }

        const formData = {
            oldPassword: oldPassword,
            newPassword:newPassword
        }
        setIsLoading(true)
        try { 
            const res = await ChangePasswordHandler(formData);
            setIsLoading(false)
            navigate("/profile")
            toast.success(res.message)
        } catch (error) {
            setIsLoading(false);
            toast.error(error.res.data.message)
        }
        
     }
    
  return (
    <>
    {isLoading && <Loader/>}
          <div className='w-full lg:w-fit lg:mx-auto flex flex-col p-5'>
              <h1 className='text-2xl'>Change Password</h1>
              <hr/>
              <form onSubmit={(e) => savePassword(e)} className="flex flex-col  py-5 justify-around" >

                    
                  <input required="true"   className='bg-gray-100 mb-3 rounded-md p-2' type="text" name="oldPassword" value={user.oldPassword} onChange={(e) => handleInputChange(e) } placeholder='Your old password...'/> 
                  <input required="true"  className='bg-gray-100 mb-3 rounded-md p-2' type="text" name="newPassword" value={user.newPassword} onChange={(e) => handleInputChange(e) } placeholder="Your new Password..."/> 
                  <input required="true" className='bg-gray-100 mb-3 rounded-md p-2' type="text" name="confirmNewPassword" value={user.confirmNewPassword} onChange={(e) => handleInputChange(e) } placeholder="Confirm new Password"/> 
                  <button type="submit">Save</button>
          
            </form>
          </div>
    </>
  )
}

export default ChangePassword