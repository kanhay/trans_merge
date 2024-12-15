import React, { useState } from 'react';
import Banner from '../../components/Banner';
import './Settings.css';
import profileImg from './profile.jpg';
import img from './img.jpg';

const Settings = () => {
  const [profileImage, setProfileImage] = useState(profileImg);
  const [profileData, setProfileData] = useState({ firstName: '', lastName: '', email: '' });
  const [passwordData, setPasswordData] = useState({ currentPassword: '', newPassword: '', confirmPassword: '' });

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfileImage(URL.createObjectURL(file));
    }
  };

  const triggerFileInput = () => {
    document.getElementById('file-input').click();
  };

  const removeImage = () => {
    setProfileImage(img);
  };

  const handleProfileChange = (e) => {
    const { name, value } = e.target;
    setProfileData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    setPasswordData((prevData) => ({ ...prevData, [name]: value }));
  };

  const saveChanges = () => {
    // Save password changes logic
    console.log('Password data saved:', passwordData);
  };
  const deleteAccount = () => {
  };

  return (
    <div className='content-settings'>
      <Banner />
      <div className='account-settings'>
        <p className='titles-settings'>Account Settings</p>
        <div className="settings">
          <div className='profile-section'>
            <img src={profileImage} alt="Profile" className="profile-image" />
            <input 
              type="file" 
              id="file-input" 
              onChange={handleImageChange} 
              className="file-input" 
              style={{ display: 'none' }} 
            />
            <div className="change-photo" onClick={triggerFileInput}><div className="text-photo">Change</div></div>
            <div className="remove-photo" onClick={removeImage}><div className="text-photo">Remove</div></div>
          </div>
          <div className="settings-sections">
            <div className='edit-profile-section'>
              <div className='title-change-edit'>Edit Profile</div>
              <div className="field-group">
                <div className='spaces'></div>
                <input
                  type="text"
                  placeholder="First Name"
                  name="firstName"
                  value={profileData.firstName}
                  onChange={handleProfileChange}
                  className="input-field"
                />
                <div className='spaces'></div>
                <input
                  type="text"
                  placeholder="Last Name"
                  name="lastName"
                  value={profileData.lastName}
                  onChange={handleProfileChange}
                  className="input-field"
                />
                <div className='spaces'></div>
                <input
                  type="email"
                  placeholder="Email"
                  name="email"
                  value={profileData.email}
                  onChange={handleProfileChange}
                  className="input-field"
                />
              </div>
            </div>
            
            <div className='change-password-section'>
                <div className='title-change-edit'>Change Password</div>
                <div className='spaces'></div>
                <input
                  type="password"
                  placeholder="Current Password"
                  name="currentPassword"
                  value={passwordData.currentPassword}
                  onChange={handlePasswordChange}
                  className="input-field"
                />
                <div className='spaces'></div>
                <input
                  type="password"
                  placeholder="New Password"
                  name="newPassword"
                  value={passwordData.newPassword}
                  onChange={handlePasswordChange}
                  className="input-field"
                />
                <div className='spaces'></div>
                <input
                  type="password"
                  placeholder="Confirm New Password"
                  name="confirmPassword"
                  value={passwordData.confirmPassword}
                  onChange={handlePasswordChange}
                  className="input-field"
                />
                <div className='spaces'></div>
              <button className="save-button" onClick={saveChanges}>Save Changes</button>
              <div className="delete-account-container">
                <div className="delete-account" onClick={deleteAccount}>Delete Account</div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;

