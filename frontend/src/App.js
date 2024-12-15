import React from 'react';
import { createBrowserRouter, RouterProvider, Outlet, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/home/Home';
import Profile from './pages/profile/Profile';
import ProfileFriend from './pages/ProfileFriend/ProfileFriend';
import Chat from './pages/chat/Chat';
import Game from './pages/game/Game';
import Friends from './pages/friends/Friends';
import Settings from './pages/settings/Settings';
import Logout from './pages/logout/Logout';
import SignIn from './pages/signin/SignIn';
import SignUp from './pages/signin/SignUp';
import { useAuth } from './context/AuthContext';
import LoginCallback from './pages/signin/LoginCallback';
import Local from './pages/game/Local';
import Online from './pages/game/RemoteGame';
import SingleLocal from './pages/game/SingleLocal';
import TournamentLocal from './pages/game/TournamentLocal';
import Tournament from './pages/game/Tournament';
import OnePlayerGame from './pages/game/OnePlayerGame';
import TwoPlayersGame from './pages/game/TwoPlayersGame';
import OnePlayerScore from './pages/game/Score1player';
import TwoPlayersScore from './pages/game/Score2players';
import TourFinalScore from './pages/game/TourFinalScore';
import "./App.css"



const App = () => {
  const { islog } = useAuth();

  const router = createBrowserRouter([
    {
      path: "/",
      element: islog ? <Navigate to="/home" /> : <Outlet />,
      children: [
        { path: "/", element: <SignIn /> },
        { path: "/signIn", element: <SignIn /> },
        { path: "/signUp", element: <SignUp /> },
        { path: "/logincallback", element: <LoginCallback /> }
      ],
      errorElement: <Navigate to="/" />
    },
    {
      path: "/",
      element: islog ? (
        <>
          <Navbar />
          <div className="page-content">
            <Outlet />
          </div>
        </>
      ) : <Navigate to="/signIn" />,
      children: [
        { path: "/home",
          children:[
            { path: "/home", element: <Home /> },
            { path: "/home/:userId", element: <ProfileFriend /> },

          ]
        },
        { path: "/profile",
          children:[
            { path: "/profile", element: <Profile /> },
            { path: "/profile/:userId", element: <ProfileFriend /> },
          ]
        },
        { path: "/friends",
          children:[
              { path: "/friends", element: <Friends /> },
              { path: "/friends/:userId", element: <ProfileFriend /> },
            ]
        },
        { path: "/chat", element: <Chat /> },
        { path: "/game", 
          children : [
            { path: "", element: <Game /> },
            { path: "Local", 
              children : [
                { path: "", element: <Local /> },
                { path: "SingleGame", 
                  children :[
                    { path: "", element: <SingleLocal /> },
                    { path: "SoloPractice", 
                      children:[
                        { path: "", element: <OnePlayerGame /> },
                        { path: "Score", element: <OnePlayerScore /> },
                      ]
                     },
                    { path: "ChallengeAFriend", 
                    children:[
                      { path: "", element: <TwoPlayersGame /> },
                      { path: "Score", element: <TwoPlayersScore /> },
                    ] },
                  ]
                 },
                { path: "TournamentLocal",
                  children :[
                    { path: "", element: <TournamentLocal /> },
                    { path: "Tournament",
                      children:[
                        { path: "", element: <Tournament /> },
                        { path: "Results", element: <TourFinalScore /> },
                    ]},
                  ]},

            ] },
          { path: "/game/Online", 
              children : [
                { path: "", element: <Online /> },
          ] },
          ]
        },
        { path: "/settings", element: <Settings /> },
        { path: "/logout", element: <Logout /> },
        { path: "/logincallback", element: <LoginCallback /> }
      ],
      errorElement: <Navigate to="/" />
    }
  ]);

  return (
    <div className="app-container">
      <RouterProvider router={router} />
    </div>
  );
};

export default App;




// const App = () => {
// const { islog } = useAuth(); // Get user from AuthContext



//   const loginRouter = createBrowserRouter([
//     {
//       path: "/",
//       element: islog ? <Navigate to="/home" /> : <Outlet />,
//        children: [
//         { path: "/", element: <SignIn /> },
//         { path: "/signUp", element: <SignUp /> },
//         { path: "/signIn", element: <SignIn /> },
//         { path: "/logincallback", element: <LoginCallback /> },
        
//       ],
//       errorElement: <Navigate to={"/"} />
//     }
//   ]);

//   const router = createBrowserRouter([
//     {
//       path: "/",
//       element: (
//         <>
//           <Navbar />
//           <div className="page-content">
//             <Outlet />
//           </div>
//         </>
//       ),
//       children: [
//         { path: "/", element: <Home /> },
//         // { path: "/signUp", element: <Navigate to="/home" /> },
//         // { path: "/signIn", element: <Navigate to="/home" /> },
//         { path: "/home",
//           children:[
//             { path: "/home", element: <Home /> },
//             { path: "/home/:userId", element: <ProfileFriend /> },

//           ]
//         },
//         { path: "/profile",
//           children:[
//             { path: "/profile", element: <Profile /> },
//             { path: "/profile/:userId", element: <ProfileFriend /> },
//           ]
//         },
//         { path: "/friends",
//           children:[
//               { path: "/friends", element: <Friends /> },
//               { path: "/friends/:userId", element: <ProfileFriend /> },
//             ]
//         },
//         { path: "/chat", element: <Chat /> },
//         { path: "/game", element: <Game /> },
//         { path: "/settings", element: <Settings /> },
//         {path: "/logout", element: <Logout /> },
//         { path: "/logincallback", element: <LoginCallback /> },
//       ],
//       errorElement: <Navigate to={"/home"} />
//     },
//   ]);

  
//   return (
//     <div className="app-container">
//       <RouterProvider router={islog ? router : loginRouter} /> 
//     </div>
//   );
// };

// export default App;

