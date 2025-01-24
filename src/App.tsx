import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom'
import './App.css'
import RootLayout from './rootLayout/RootLayout'
import Home from './pages/home/Home'
import RecipePage from './pages/recipePage/RecipePage'
import AboutUs from './pages/aboutUs/AboutUs';
import DetailPage from './pages/detailPage/DetailPage';
import LoginPage from './pages/loginPage/LoginPage';
import { UserProvider } from './UserContext'
import UserDashboard from './pages/userDashboard/UserDashboard';
import SignUp from './pages/signUp/SignUp'

function App() {

  const router = createBrowserRouter(
    createRoutesFromElements(
      <>
      <Route path="/" element={<RootLayout />}>
        <Route index element={<Home />} />
        <Route path='recipes' element={<RecipePage/>}/>
        <Route path="detailPage/:recipe_id" element={<DetailPage  />} />
        <Route path="aboutUs" element={<AboutUs />} />
        <Route path="login" element={<LoginPage />} />
        <Route path="signup" element={<SignUp />} />
        <Route path="userdashboard" element={<UserDashboard />} />
      </Route>
      </>
    )
  );
  return (
    <>
      <UserProvider>
        <RouterProvider router={router} />
      </UserProvider>
    </>
  );
}

export default App;