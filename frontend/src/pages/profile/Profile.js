import React 
from 'react';
import Banner from '../../components/Banner';
import './Profile.css';
import Profileimg from './profile.jpg';
import { Link, useNavigate } from 'react-router-dom';
// import Imgp from './imgp.jpg';

import { IoPersonOutline } from "react-icons/io5";
import { BsChatDots } from "react-icons/bs";
import { IoEllipse } from "react-icons/io5";

import { FaMedal, FaTrophy, FaStar } from 'react-icons/fa';
// import { Outlet } from 'react-router-dom';

const Profile = () => {
    const friends = [
      { id: 1, name: 'Alice Smith', message: 'Hey! How are you?', chat: <BsChatDots/>, profile:<IoPersonOutline /> ,image: Profileimg  },
      { id: 2, name: 'Bob Johnson', message: 'Let’s catch up soon!', chat: <BsChatDots/>, profile:<IoPersonOutline /> , image: Profileimg  },
      { id: 3, name: 'Charlie Brown', message: 'I’ll be there at 5.', chat: <BsChatDots/>, profile:<IoPersonOutline /> , image: Profileimg  },
      { id: 4, name: 'Daisy Miller', message: 'Can you call me?', chat: <BsChatDots/>, profile:<IoPersonOutline /> , image: Profileimg  },
      { id: 5, name: 'Daisy Miller', message: 'Can you call me?', chat: <BsChatDots/>, profile:<IoPersonOutline /> , image: Profileimg  }
    ];

    const gameHistory = [
      { id: 1, img: Profileimg, result: 'Win', level: '5.00'},
      { id: 2, img: Profileimg, result: 'Lose', level: '4.50'},
      { id: 3, img: Profileimg, result: 'Win', level: '5.00'},
      { id: 4, img: Profileimg, result: 'Lose', level: '3.80'},
      { id: 5, img: Profileimg, result: 'Win', level: '4.20'}
    ];

    const achievements = [
      { id: 1, icon: <FaMedal />, title: 'First Win', description: 'Won your first game!' },
      { id: 2, icon: <FaTrophy />, title: 'Level 10', description: 'Reached level 10.' },
      { id: 3, icon: <FaStar />, title: 'MVP', description: 'Awarded Most Valuable Player in 3 games.' },
      { id: 4, icon: <FaMedal />, title: '10 Games Played', description: 'Participated in 10 games.' }
    ];

  const navigate = useNavigate();

  const handleEditClick = () => {
    navigate('/settings');
  }


  return (
    <div>
      <Banner />
      <div className="content-profile">
          <p className='title-profile'>Profile</p>
            <div className="info-profile">
              <div className="user-name"> 
                <img src={Profileimg} alt='Profileimg' className="profile-photo"/>
                <div className="name-status">
                  Alice Smith
                  <div className="status">
                  <IoEllipse className="status-icon"/><span>online</span>
                  </div>
                </div>              
              </div>
              <div className="level">
                <div className="level-bar">
                <div className="level-fill" style={{ width: '70%' }}> <div className="my-level">lvl: 3.70 </div></div>
              </div>
                <div className="edit" onClick={handleEditClick}>
                  <div className="text-edit">Edit</div>
                </div>
            </div>
            </div>
        <div className="infos">
          <div className="info-group">
            <p className='titles-profile'>Friends</p>
            <div className="info-friends">
              <ul className="friends-list">
              {friends.map(friend => (
                  <li key={friend.id} className="friend-item">
                    <img src={friend.image} alt={friend.name} className="friend-photo" />
                    <div className="friend-details">
                      <span className="friend-name">{friend.name}</span>
                      <span className="friend-message">{friend.message}</span>
                    </div>
                    <div className="friend-icons">
                        <Link className="icon" to={`/profile/${friend.id}`}>{friend.profile}</Link>
                        <Link className="icon" to={`/chat`}>{friend.chat}</Link>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div className="info-group">
            <p className='titles-profile'>History</p>
            <div className="info-history">
              <ul className="history-list">
                {gameHistory.map(game => (
                  <li key={game.id} className="history-item">
                    <img src={game.img} alt="Game History" className="history-profile" />
                    <span
                      className="history-result"
                      style={{ color: game.result === 'Win' ? '#D8FD62' : '#E84172' }}>
                      {game.result}
                    </span>
                    <span className="history-level">Level: {game.level}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div className="info-group">
            <p className='titles-profile'>Achievement</p>
            <div className="info-achievement">
              <ul className="achievement-list">
                  {achievements.map(achievement => (
                    <li key={achievement.id} className="achievement-item">
                      <span className="achievement-icon">{achievement.icon}</span>
                      <div className="achievement-details">
                        <span className="achievement-title">{achievement.title}</span>
                        <span className="achievement-description">{achievement.description}</span>
                      </div>
                    </li>
                  ))}
                </ul>
                {/* <div className="all-achievement-button" onClick={handleAllAchievementsClick}><div className="text-all-achievement">All Achievement</div></div> */}
            </div>
          </div>
        </div>
      </div>

    </div>
  );
};

export default Profile;
