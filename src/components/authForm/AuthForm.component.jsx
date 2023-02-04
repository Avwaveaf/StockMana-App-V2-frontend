import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import bgSVG from '../../assets/topography.svg';

const AuthForm = ({
  usernameInput,
  emailInput,
  passwordInput,
  confirmPasswordInput,
  formName,
  onSubmitHandler,
  initialState,
  additionalRouteName,
  additionalRouteName_2 = '',
  description = 'Join our community and unlock endless opportunities! Create your account now and start exploring all that we have to offer.',
  additionalRouteDescription_2 = '',

  additionalRouteDescription,
  submitButtonName,
}) => {
    const [formData, setFormData] = useState(initialState);


    const inputChangeHandler = (e) => {
      
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });

  };

  return (
    <>
      <div className='absolute inset-0  h-screen w-full '>
        <img src={bgSVG} alt='' className='h-full w-full object-cover' />
      </div>

      <section className='text-gray-600 body-font relative lg:w-5/6 lg:mx-auto h-screen  '>
        <div className='container px-5 py-24 mx-auto flex'>
          <div className='lg:w-1/2 md:w-1/2 bg-white rounded-lg p-8 flex flex-col md:ml-auto w-full  md:mt-0 relative z-10 shadow-md'>
            <h1 className='text-gray-900 font-bold text-lg mb-1  title-font'>
              {formName}
            </h1>
            <p className='leading-relaxed mb-5 text-gray-600'>{description}</p>
            <form onSubmit={(e) => onSubmitHandler(e,formData)}>
              {usernameInput && (
                <div className='relative mb-5 border-2'>
                  <input
                    type='text'
                    id='username'
                    name='username'
                    value={formData.username}
                    onChange={(e) => inputChangeHandler(e)}
                    className='block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300   focus:outline-none focus:ring-0 focus:border-blue-600 peer'
                    placeholder=' '
                  />
                  <label
                    htmlFor='username'
                    className='absolute text-sm text-gray-500 cursor-text duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white  px-2 peer-focus:px-2 peer-focus:text-gray-600  peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1'
                  >
                    Username
                  </label>
                </div>
              )}

              {emailInput && (
                <div className='relative mb-5 border-2'>
                  <input
                    type='email'
                    id='email'
                    name='email'
                    value={formData.email}
                    onChange={(e) => inputChangeHandler(e)}
                    className='block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300   focus:outline-none focus:ring-0 focus:border-blue-600 peer'
                    placeholder=' '
                  />
                  <label
                    htmlFor='email'
                    className='absolute text-sm text-gray-500 cursor-text duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white  px-2 peer-focus:px-2 peer-focus:text-gray-600  peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1'
                  >
                    Email Address
                  </label>
                </div>
              )}
              {passwordInput && (
                <div className='relative mb-5 border-2'>
                  <input
                    type='password'
                    id='password'
                    name='password'
                    value={formData.password}
                    onChange={(e) => inputChangeHandler(e)}
                    className='block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300   focus:outline-none focus:ring-0 focus:border-blue-600 peer'
                    placeholder=' '
                  />
                  <label
                    htmlFor='password'
                    className='absolute text-sm text-gray-500 cursor-text duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white  px-2 peer-focus:px-2 peer-focus:text-gray-600  peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1'
                  >
                    Password
                  </label>
                </div>
              )}
              {confirmPasswordInput && (
                <div className='relative mb-5 border-2'>
                  <input
                    type='password'
                    id='confirm_password'
                    name='confirmPassword'
                    value={formData.confirmPassword}
                    onChange={(e) => inputChangeHandler(e)}
                    className='block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300   focus:outline-none focus:ring-0 focus:border-blue-600 peer'
                    placeholder=' '
                  />
                  <label
                    htmlFor='confirm_password'
                    className='absolute text-sm text-gray-500 cursor-text duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white  px-2 peer-focus:px-2 peer-focus:text-gray-600  peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1'
                  >
                    Confirm Password
                  </label>
                </div>
              )}

              <button
                              type='submit'
                              
                className='text-white bg-red-500 border-0 py-2 px-6 focus:outline-none hover:bg-red-600 rounded text-lg'
              >
                {submitButtonName}
              </button>
            </form>
            <p className='text-md text-gray-500 mt-3  '>
              {additionalRouteDescription}
              <Link
                to={`/${additionalRouteName}`}
                className='text-red-500 hover:font-bold uppercase'
              >
                &nbsp;{additionalRouteName}
              </Link>
            </p>
            {additionalRouteDescription_2 && additionalRouteName_2 && (
              <p className='text-md text-gray-500 mt-3  '>
                {additionalRouteDescription_2}
                <Link
                  to={`/${additionalRouteName_2}`}
                  className='text-red-500 hover:font-bold uppercase'
                >
                  &nbsp;{additionalRouteName_2}
                </Link>
              </p>
            )}
          </div>
        </div>
      </section>
    </>
  );
};

export default AuthForm;
