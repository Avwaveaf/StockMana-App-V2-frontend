import React, { useState } from 'react'
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import useRedirectLoggedOut from '../../components/customHook/useRedirectLoggedOut.component';
import Loader from '../../components/loader/Loader.component';
import { ContactUsHandler } from '../../services/contactUs.service';

const ContactUs = () => {
    useRedirectLoggedOut('/login');
    const navigate=useNavigate()

    const initialState = {
   
        subject: "",
        message:"",
    }
    

    const [user, setUser] = useState(initialState);
    const [isLoading, setIsLoading] = useState(false);


    const handleInputChange = (e) => {
        const {name,value} = e.target
        setUser({...user,[name]:value})
    }

    const savePassword = async(e) => {
        e.preventDefault()
      

        setIsLoading(true)
        try { 
            const res = await ContactUsHandler(user);
            setIsLoading(false)
            navigate("/dashboard")
            toast.success(res.message)
        } catch (error) {
            setIsLoading(false);
         
        }
        
     }
    
  return (
    <>
    {isLoading && <Loader/>}
          <div className='w-full lg:w-fit lg:mx-auto flex flex-col p-5'>
              <h1 className='text-2xl'>Contact us</h1>
              <hr/>
              <form onSubmit={(e) => savePassword(e)} className="flex flex-col  py-5 justify-around" >

                    
                  <input required="true"   className='bg-gray-100 mb-3 rounded-md p-2' type="text" name="subject" value={user.subject} onChange={(e) => handleInputChange(e) } placeholder='Add a title here'/> 
                  <input required="true"  className='bg-gray-100 mb-3 rounded-md p-2' type="text" name="message" value={user.message} onChange={(e) => handleInputChange(e) } placeholder="Your Message"/> 
                  <button type="submit">Send</button>
          
            </form>
          </div>
    </>
  )
}

export default ContactUs