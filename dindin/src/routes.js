import { Routes, Route, Outlet, Navigate } from 'react-router-dom';
import { getLocalItem } from './utils/localStorage/index'
import Main from './pages/Main/';
import SignUp from './pages/SignUp/';
import SignIn from './pages/SignIn/';

function MainRoutes() {

    function ProtectedRoutes({ redirectTo }) {
        const token = getLocalItem('token');
        const isAuthenticated = token;

        return isAuthenticated ? <Outlet /> : <Navigate to={redirectTo} />
    }


    return (
        <Routes>
            <Route path='/'>
                <Route path='/' element={<SignIn />} />
                <Route path='/sign-in' element={<SignIn />} />
            </Route>

            <Route path='/sign-up' element={<SignUp />} />

            <Route element={<ProtectedRoutes redirectTo='/' />}>
                <Route path='/main' element={<Main />} />
            </Route>
        </Routes >
    )
}

export default MainRoutes;