import { useSelector } from 'react-redux';
import { selectIsLoggedIn } from '../../redux/slices/auth/authSlice';


const ProtectedRoutes = ({ children }) => {
    const isLoggedIn = useSelector(selectIsLoggedIn);
    if (isLoggedIn) {
        return <> { children } </>;
    }
    return null;
};
export default ProtectedRoutes

export const ShowOnLogOut = ({ children }) => { 
    const isLoggedIn = useSelector(selectIsLoggedIn);
    if (!isLoggedIn) { 
        return <> { children } </>
    }
    return null
};