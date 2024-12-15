import React, {useState} from 'react';
import './Friends.css';
import Banner from '../../components/Banner';
import Profileimg from './profile.jpg';
import { IoPersonOutline } from "react-icons/io5";
import { BsChatDots } from "react-icons/bs";
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

const Friends = () => {
    // const friendsList = [
    //   { id: 1, name: 'Alice Smith', message: 'Hey! How are you?', profile: <IoPersonOutline />, chat: <BsChatDots />, image: Profileimg },
    //   { id: 2, name: 'Bob Johnson', message: 'Let’s catch up soon!', profile: <IoPersonOutline />, chat: <BsChatDots />, image: Profileimg },
    //   { id: 3, name: 'Bob Johnson', message: 'Let’s catch up soon!', profile: <IoPersonOutline />, chat: <BsChatDots />, image: Profileimg },
    //   { id: 4, name: 'Bob Johnson', message: 'Let’s catch up soon!', profile: <IoPersonOutline />, chat: <BsChatDots />, image: Profileimg },
    //   { id: 5, name: 'Bob Johnson', message: 'Let’s catch up soon!', profile: <IoPersonOutline />, chat: <BsChatDots />, image: Profileimg },
    //   { id: 6, name: 'Alice Smith', message: 'Hey! How are you?', profile: <IoPersonOutline />, chat: <BsChatDots />, image: Profileimg },
    //   { id: 7, name: 'Alice Smith', message: 'Hey! How are you?', profile: <IoPersonOutline />, chat: <BsChatDots />, image: Profileimg }
    // ];

    // const blockedUsers = [
    //   { id: 1, name: 'Eve Thompson', image: Profileimg },
    //   { id: 2, name: 'Charlie Brown', image: Profileimg },
    //   { id: 2, name: 'Charlie Brown', image: Profileimg },
    //   { id: 2, name: 'Charlie Brown', image: Profileimg },
    //   { id: 2, name: 'Charlie Brown', image: Profileimg },
    //   { id: 2, name: 'Charlie Brown', image: Profileimg }
    // ];

    // const invitations = [
    //   { id: 1, name: 'Daisy Miller', message: 'Wants to be friends', profile: <IoPersonOutline />, image: Profileimg },
    //   { id: 2, name: 'George Lane', message: 'Sent you a friend request', profile: <IoPersonOutline />, image: Profileimg },
    //   { id: 3, name: 'George Lane', message: 'Sent you a friend request', profile: <IoPersonOutline />, image: Profileimg },
    //   { id: 4, name: 'George Lane', message: 'Sent you a friend request', profile: <IoPersonOutline />, image: Profileimg },
    //   { id: 5, name: 'George Lane', message: 'Sent you a friend request', profile: <IoPersonOutline />, image: Profileimg }
    // ];

    const [friendsList, setFriendsList] = useState([
      { id: 1, name: 'Alice Smith', profile: <IoPersonOutline />, chat: <BsChatDots />, image: Profileimg },
      { id: 2, name: 'Bob Johnson', profile: <IoPersonOutline />, chat: <BsChatDots />, image: Profileimg },
      { id: 3, name: 'Bob Johnson', profile: <IoPersonOutline />, chat: <BsChatDots />, image: Profileimg },
      { id: 4, name: 'Bob Johnson', profile: <IoPersonOutline />, chat: <BsChatDots />, image: Profileimg },
      { id: 5, name: 'Bob Johnson', profile: <IoPersonOutline />, chat: <BsChatDots />, image: Profileimg },
      { id: 6, name: 'Bob Johnson', profile: <IoPersonOutline />, chat: <BsChatDots />, image: Profileimg },
      { id: 7, name: 'Bob Johnson', profile: <IoPersonOutline />, chat: <BsChatDots />, image: Profileimg },
    ]);

    const [blockedUsers, setBlockedUsers] = useState([
      { id: 1, name: 'Eve Thompson', image: Profileimg },
      { id: 2, name: 'Charlie Brown', image: Profileimg },
      { id: 3, name: 'Charlie Brown', image: Profileimg },
      { id: 4, name: 'Charlie Brown', image: Profileimg },
      { id: 5, name: 'Charlie Brown', image: Profileimg },
      { id: 6, name: 'Charlie Brown', image: Profileimg },
    ]);

    const [invitations, setInvitations] = useState([
      { id: 1, name: 'Daiy Miller', message: 'Wants to be friends', profile: <IoPersonOutline />, chat: <BsChatDots />, image: Profileimg },
      { id: 2, name: 'George Lane', message: 'Wants to be friends', profile: <IoPersonOutline />, chat: <BsChatDots />, image: Profileimg },
      { id: 3, name: 'George Lane', message: 'Wants to be friends', profile: <IoPersonOutline />, chat: <BsChatDots />, image: Profileimg },
      { id: 4, name: 'George Lane', message: 'Wants to be friends', profile: <IoPersonOutline />, chat: <BsChatDots />, image: Profileimg }
    ]);
    const navigate = useNavigate();

    const handleChatClick = (friend) => {
        navigate('/chat');
    };


     const handleAcceptInvitation = (id) => {
      const acceptedFriend = invitations.find(invitation => invitation.id === id);
      
      setFriendsList(prevFriendsList => [...prevFriendsList, acceptedFriend]);
      setInvitations(prevInvitations => prevInvitations.filter(invitation => invitation.id !== id));
    };

    const handleCancelInvitation = (id) => {
        setInvitations(prevInvitations => prevInvitations.filter(invitation => invitation.id !== id));
    };

    const handleUnblockInvitation = (id) =>{
      setBlockedUsers(prevInvitations => prevInvitations.filter(invitation => invitation.id !== id));
    }
    return (
      <div>
        <Banner/>
        <div className="f-friends-page">
          <div>
            <div className="f-friends-titles">All Friends</div>
            <div className="f-friends-section">
              <ul className="f-friends-list">
                {friendsList.map(friend => (
                  <li key={friend.id} className="f-friend-item">
                    <img src={friend.image} alt={friend.name} className="f-friend-photo" />
                    <div className="f-friend-details">
                      <span className="f-friend-name">{friend.name}</span>
                      {/* <span className="f-friend-message">{friend.message}</span> */}
                    </div>
                    <div className="f-friend-icons">
                      <Link className="f-icon" to={`/friends/${friend.id}`}>{friend.profile}</Link>
                      <Link className="f-icon" onClick={() => handleChatClick(friend)}>{friend.chat}</Link>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div>
            <div className="f-friends-titles">Invitations</div>
            <div className="f-invitations-section">
              <ul className="f-invitations-list">
                {invitations.map(invitation => (
                  <li key={invitation.id} className="f-invitation-item">
                    <img src={invitation.image} alt={invitation.name} className="f-invitation-photo" />
                    <div className="f-invitation-details">
                        <div><span className="f-invitation-name">{invitation.name}</span></div>
                        <div><span className="f-invitation-message">{invitation.message}</span></div>
                      <span className="f-invitation-icon">{invitation.profile}</span>
                      <div className="f-invitation-buttons">
                      <div onClick={() => handleAcceptInvitation(invitation.id)} className="f-accept-button">Accept</div>
                      <div onClick={() => handleCancelInvitation(invitation.id)} className="f-cancel-button">Cancel</div>
                    </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div>
            <div className="f-friends-titles">Blocked Users</div>
            <div className="f-blocked-section">
              <ul className="f-blocked-list">
                {blockedUsers.map(user => (
                  <li key={user.id} className="f-blocked-item">
                    <img src={user.image} alt={user.name} className="f-blocked-photo" />
                    <div className="f-blocked-details">
                      <span className="f-blocked-name">{user.name}</span>
                      <div onClick={() => handleUnblockInvitation(user.id)} className="f-unblock-button">Unblock</div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

      </div>
    );
};

export default Friends;

