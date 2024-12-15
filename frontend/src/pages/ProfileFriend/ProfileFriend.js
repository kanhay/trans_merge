import React 
from 'react';
import Banner from '../../components/Banner';
import './ProfileFriend.css';
import Profileimg from './profile.jpg';
import { Link, useParams } from 'react-router-dom';
// import Imgp from './imgp.jpg';

import { IoPersonOutline } from "react-icons/io5";
// import { BsChatDots } from "react-icons/bs";
import { IoEllipse } from "react-icons/io5";

import { FaMedal, FaTrophy, FaStar } from 'react-icons/fa';
import { IoMdAdd } from "react-icons/io";

const ProfileFriend = () => {
    const friends = [
      { id: 1, name: 'Alice Smith', message: 'Hey! How are you?', add: <IoMdAdd/>, profile:<IoPersonOutline /> ,image: Profileimg  },
      { id: 2, name: 'Bob Johnson', message: 'Let’s catch up soon!', add: <IoMdAdd/>, profile:<IoPersonOutline /> , image: Profileimg  },
      { id: 3, name: 'Charlie Brown', message: 'I’ll be there at 5.', add: <IoMdAdd/>, profile:<IoPersonOutline /> , image: Profileimg  },
      { id: 4, name: 'Daisy Miller', message: 'Can you call me?', add: <IoMdAdd/>, profile:<IoPersonOutline /> , image: Profileimg  },
      { id: 5, name: 'Eve Thompson', message: 'Good morning!', add: <IoMdAdd/>, profile:<IoPersonOutline /> , image: Profileimg  }
    ];

    const gameHistory = [
      { id: 1, img: Profileimg, result: 'Win', level: '5.00'},
      { id: 2, img: Profileimg, result: 'Lose', level: '4.50'},
      { id: 3, img: Profileimg, result: 'Win', level: '5.00'},
      { id: 4, img: Profileimg, result: 'Lose', level: '3.80'},
      { id: 5, img: Profileimg, result: 'Win', level: '4.20'},
      { id: 5, img: Profileimg, result: 'Win', level: '4.20'}
    ];

    const achievements = [
      { id: 1, icon: <FaMedal />, title: 'First Win', description: 'Won your first game!' },
      { id: 2, icon: <FaTrophy />, title: 'Level 10', description: 'Reached level 10.' },
      { id: 3, icon: <FaStar />, title: 'MVP', description: 'Awarded Most Valuable Player in 3 games.' },
      { id: 4, icon: <FaMedal />, title: '10 Games Played', description: 'Participated in 10 games.' },
      { id: 5, icon: <FaMedal />, title: '10 Games Played', description: 'Participated in 10 games.' }
    ];

  // const navigate = useNavigate();

  const handleAddFriendClick = () => {
    // navigate('/settings');
  }
  const handleBlockClick = () => {
    // navigate('/settings');
  }

  const handleAddClick = () => {
    // navigate('/Add');
  };


  // const handleFriendsClick = () => {
  //   navigate('/friends');
  // };
  // const handleAllAchievementsClick = () => {
  //    window.location.href = '/achievements';
  // };


  const { userId } = useParams(); 
  return (
    <div>
      <Banner />
      <div className="friend-content-profile">
          <p className='friend-title-profile'>Profile</p>
            <div className="friend-info-profile">
              <div className="friend-user-name"> 
                <img src={Profileimg} alt='Profileimg' className="friend-profile-photo"/>
                <div className="friend-name-status">
                  {userId}
                  <div className="friend-status">
                  <IoEllipse className="friend-status-icon"/><span>online</span>
                  </div>
                </div>              
                <div className="friend-add-friend" onClick={handleAddFriendClick}>
                  <div className="friend-text-add-friend">add friend</div>
                </div>
                <div className="friend-block" onClick={handleBlockClick}>
                  <div className="friend-text-block">block</div>
                </div>
              </div>
              <div className="friend-level">
                <div className="friend-level-bar">
                <div className="friend-level-fill" style={{ width: '70%' }}> <div className="friend-my-level">lvl: 3.70 </div></div>
              </div>
            </div>
            </div>
        <div className="friend-infos">
          <div className="friend-info-group">
            <p className='friend-titles-profile'>Friends</p>
            <div className="friend-info-friends">
              <ul className="friend-friends-list">
              {friends.map(friend => (
                  <li key={friend.id} className="friend-friend-item">
                    <img src={friend.image} alt={friend.name} className="friend-friend-photo" />
                    <div className="friend-friend-details">
                      <span className="friend-friend-name">{friend.name}</span>
                      <span className="friend-friend-message">{friend.message}</span>
                    </div>
                    <div className="friend-friend-icons">
                        <Link className="friend-icon-profile" to={`/profile/${friend.id}`}>{friend.profile}</Link>
                        <span className="friend-icon-add" onClick={handleAddClick}>{friend.add}</span>
                    </div>
                  </li>
                ))}
              </ul>
              {/* <div className="friend-all-friends-button" onClick={handleFriendsClick}><div className="friend-text-all-friends">All Friends</div></div> */}
            </div>
          </div>
          <div className="friend-info-group">
            <p className='friend-titles-profile'>History</p>
            <div className="friend-info-history">
              <ul className="friend-history-list">
                {gameHistory.map(game => (
                  <li key={game.id} className="friend-history-item">
                    <img src={game.img} alt="Game History" className="friend-history-profile" />
                    <span
                      className="friend-history-result"
                      style={{ color: game.result === 'Win' ? '#D8FD62' : '#E84172' }}>
                      {game.result}
                    </span>
                    <span className="friend-history-level">Level: {game.level}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div className="friend-info-group">
            <p className='friend-titles-profile'>Achievement</p>
            <div className="friend-info-achievement">
              <ul className="friend-achievement-list">
                  {achievements.map(achievement => (
                    <li key={achievement.id} className="friend-achievement-item">
                      <span className="friend-achievement-icon">{achievement.icon}</span>
                      <div className="friend-achievement-details">
                        <span className="friend-achievement-title">{achievement.title}</span>
                        <span className="friend-achievement-description">{achievement.description}</span>
                      </div>
                    </li>
                  ))}
                </ul>
                {/* <div className="friend-all-achievement-button" onClick={handleAllAchievementsClick}><div className="friend-text-all-achievement">All Achievement</div></div> */}
            </div>
          </div>
        </div>
      </div>

    </div>
  );
};

export default ProfileFriend;
