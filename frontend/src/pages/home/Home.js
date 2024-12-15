import React from 'react';
import Banner from '../../components/Banner';
import './Home.css';
import Profileimg from './profile.jpg';
import { IoSearch } from "react-icons/io5";
import { IoPersonOutline } from "react-icons/io5";
import { BsChatDots } from "react-icons/bs";
import { Link, useNavigate } from 'react-router-dom';

const Profile = () => {
    const friends = [
      { id: 1, name: 'Alice Smith', message: 'Hey! How are you?', chat: <BsChatDots/>, profile:<IoPersonOutline />, image: Profileimg },
      { id: 2, name: 'Bob Johnson', message: 'Let’s catch up soon!', chat: <BsChatDots/>, profile:<IoPersonOutline />, image: Profileimg },
      { id: 3, name: 'Charlie Brown', message: 'I’ll be there at 5.', chat: <BsChatDots/>, profile:<IoPersonOutline />, image: Profileimg },
      { id: 4, name: 'Charlie Brown', message: 'I’ll be there at 5.', chat: <BsChatDots/>, profile:<IoPersonOutline />, image: Profileimg },
    ];

    const lastGame = [
      { id: 1,imgW: Profileimg, nameW: 'Bob', result: 'Won', imgL: Profileimg, nameL: 'Alice'},
      { id: 2,imgW: Profileimg, nameW: 'Bob', result: 'Won', imgL: Profileimg, nameL: 'Alice'},
      { id: 3,imgW: Profileimg, nameW: 'Bob', result: 'Won', imgL: Profileimg, nameL: 'Alice'},
    ] 

    const gameRank = [
      { id: 1, rank: '1', name: 'Alice Smith', image: Profileimg,  level: 10.09},
      { id: 2, rank: '2', name: 'Bob Johnson', image: Profileimg,  level: 6.59},
      { id: 3, rank: '3', name: 'Charlie Brown', image: Profileimg,  level: 5.29},
      { id: 4, rank: '4', name: 'Alice Smith', image: Profileimg,  level: 1.09}
    ]

    const navigate=useNavigate();

    // const handleFriendsDashClick =() =>{
    //   navigate('/Friends')
    // }
    // const handleProfileFrDash =() =>{
    //   navigate('/home/profileFriend')
    // }
    const handleChatFrDash =() =>{
      navigate('/chat')
    }

  return (
    <div className="dashboard-container">
      <Banner />
      <div className='search-profile'>
        {/* Search Bar */}
        <div className="search-bar">
          <IoSearch className="search-icon" />
          <input type="text" placeholder="Search..." className="dash-text-search"/>
        </div>
        {/* Profile Info */}
        <div className="dashboard-profile">
          <img src={Profileimg} alt="Profile" className="profile-photo-dash" />
          <div className="profile-details">
            <div className='profile-details-name'>Alice Smith</div>
            <div className='profile-details-lvl'>Level: 3.70</div>
          </div>
        </div>
      </div>
          {/* Game Modes */}
          <div className='titles-dashboard'><div className='title-game-mode' >Game Modes</div></div>
          <div className="game-modes">
            <div className="game-mode-bot">
              <div className='play-modes'>Play Bot Mode</div>
              <button className="game-mode-button">Start</button>
            </div>
            <div className="game-mode-random">
              <div className='play-modes'>Play Random Mode</div>
              <button className="game-mode-button">Start</button>
            </div>
            <div className="game-mode-friends">
              <div className='play-modes'>Play with Friend</div>
              <button className="game-mode-button">Start</button>
            </div>
          </div>
          
          <div className="game-rank-last">
          <div>
            {/* Last Game */}
            <div className='titles-dashboard'><div className='title-dash'>Last Game</div></div>
            <div className="last-game">
              <ul className='list-last-game'>
                {lastGame.map(last =>(
                  <li key={last.id} className="last-game-item">
                    <div className='last-game-profile-name'>
                      <img src={last.imgW} alt="Last Game" className="game-photo-won"/>
                      <span className='last-game-name'>{last.nameW}</span>
                    </div>
                    <span className='last-game-result'>{last.result}</span>
                    <div className='last-game-profile-name'>
                      <img src={last.imgL} alt="Last Game" className="game-photo-lost"/>
                      <span className='last-game-name'>{last.nameL}</span>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* {Game Rank} */}
          <div>
            <div className='titles-dashboard'><div className='title-dash'>Game Rank</div></div>
            <div className="game-rank">
              <ul className="game-rank-list">
                {gameRank.map(rank => (
                  <li key={rank.id} className="rank-item">
                      <span className="rank-nb">{rank.rank}</span>
                      <img src={rank.image} alt={rank.name} className="rank-photo" />
                      <span className="rank-name">{rank.name}</span>
                      <span className="rank-level">{rank.level}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div>
            {/* Friends List */}
            <div className='titles-dashboard'><div className='title-dash'>Friends</div></div>
            <div className="dashboard-friends">
              <ul className='dashboard-friends-list'>
                {friends.map(friend => (
                  <li key={friend.id} className="friend-item-dash">
                    <img src={friend.image} alt={friend.name} className="friend-photo-dash" />
                    <div className="friend-info-dash">
                      <span className='friend-name-dash'>{friend.name}</span>
                      <span className='friend-msg-dash'>{friend.message}</span>
                    </div>
                    <div className="friend-icons-dash">
                      <Link className="icon-dash" to={`/home/${friend.id}`}>{friend.profile}</Link>
                      <Link className="icon-dash" onClick={handleChatFrDash}>{friend.chat}</Link>
                    </div>
                  </li>
                ))}
              </ul>
              {/* <div className="all-friends-dash" onClick={handleFriendsDashClick}><div className="text-all-friends-dash">All Friends</div></div> */}
            </div>

          </div>

      </div>

    </div>
  );
};

export default Profile;