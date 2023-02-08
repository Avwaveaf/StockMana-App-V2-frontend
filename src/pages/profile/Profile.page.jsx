import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import useRedirectLoggedOut from '../../components/customHook/useRedirectLoggedOut.component';
import Loader from '../../components/loader/Loader.component';
import { SET_USER, SET_USERNAME } from '../../redux/slices/auth/authSlice';
import { GetUserData } from '../../services/auth.services';

const Profile = () => {
  useRedirectLoggedOut('/login');
  const dispatch = useDispatch();

  const [profile, setProfile] = useState();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    async function getUserData() {
      const { data } = await GetUserData();
      setProfile(data);
       
      await dispatch(SET_USER(data));
      await dispatch(SET_USERNAME(data.name));

      setIsLoading(false);
    }

    getUserData();
  }, [dispatch]);

    return (
        <>
        {isLoading && <Loader />}
            {profile&&<div>
                {profile.name}
            </div> }
        </>

  );
};

export default Profile;
