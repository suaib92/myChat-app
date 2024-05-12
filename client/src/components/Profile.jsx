import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit } from '@fortawesome/free-solid-svg-icons';

import { faCamera, faComment, faShare } from '@fortawesome/free-solid-svg-icons';

// Inside the component:
<div className='rounded-xl shadow-md mx-px my-2 bg-gray-950 text-white p-4 flex items-center'>
  <h4 className=''>Make Character Public</h4>
  <div className="ml-auto flex">
    <FontAwesomeIcon icon={faCamera} className="text-gray-400 ml-2" />
    <FontAwesomeIcon icon={faComment} className="text-gray-400 ml-2" />
    <FontAwesomeIcon icon={faShare} className="text-gray-400 ml-2" />
  </div>
</div>


const ProfileCard = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState("Jessica Anderson");
  const [username, setUsername] = useState("@jessica-anderson-2");
  const [description, setDescription] = useState("21-year-old anime fanatic and yoga instructor. I binge-watch anime! Looking for someone to join me in downward dog and anime marathons. Fun fact: I can recite the entire script of my favorite anime movie from memory. Let's chat!");
  const [work, setWork] = useState("Yoga Instructor");
  const [hobbies, setHobbies] = useState("Anime Fan");
  const [relationship, setRelationship] = useState("Friend");

  useEffect(() => {
    // Load data from localStorage if available
    const savedProfile = JSON.parse(localStorage.getItem('profile'));
    if (savedProfile) {
      setName(savedProfile.name);
      setUsername(savedProfile.username);
      setDescription(savedProfile.description);
      setWork(savedProfile.work);
      setHobbies(savedProfile.hobbies);
      setRelationship(savedProfile.relationship);
    }
  }, []);

  const handleEditToggle = () => {
    setIsEditing(!isEditing);
  };

  const handleSave = () => {
    // Save changes to local storage
    const profile = {
      name,
      username,
      description,
      work,
      hobbies,
      relationship
    };
    localStorage.setItem('profile', JSON.stringify(profile));
    setIsEditing(false);
  };

  return (
    <div className="profile-card   bg-pink-600  shadow-md overflow-hidden  max-w-96 ml-0">
      <header className="profile-header bg-pink-600 relative">
  <img
    src="https://cdn.psychologytoday.com/sites/default/files/styles/article-inline-half/public/field_blog_entry_images/pexels-photo-large-2.jpg?itok=cbzBJUiT"
    alt="Jessica Anderson"
    className="profile-picture rounded-xl  w-[375px]  h-[225px] mx-1 "
  />
  <div className="profile-info text-center  absolute top-0 left-0 right-0 mt-4">
    {isEditing ? (
      <>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="block w-full border rounded-md py-1 px-2 mb-2"
        />
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="block w-full border rounded-md py-1 px-2 mb-2"
        />
      </>
    ) : (
      <>
        <h3 className="profile-name  relative font-bold  top-[160px] text-lg bold right-28">{name}</h3>
        <span className="profile-username font-bold  relative top-[155px] right-24">{username}</span>
      </>
    )}
  </div>
</header>

      <div className='rounded-xl shadow-md  my-2 bg-gray-950 mx-2 text-white p-4 flex items-center'>
  <div className="flex items-center justify-between w-full">
    <div className="flex items-center">
      <FontAwesomeIcon icon={faCamera} className="text-gray-400 mr-2" />
      <span className="text-sm">0</span>
      <FontAwesomeIcon icon={faComment} className="text-gray-400 ml-4 mr-2" />
      <span className="text-sm">6</span>
    </div>
    <div className='flex items-center'>
      <h4 className='text-base mr-4'>Make Character Public</h4>
      <FontAwesomeIcon icon={faShare} className="text-gray-400" />
    </div>
  </div>
</div>

      
     <div className='grid  grid-cols-2 rounded-xl shadow-md  my-2 mx-2   pr-2 pb-2 mb-6 bg-gray-950 text-white'>
      <div className="profile-content p-4">
        <h4 className="profile-section-title text-lg font-semibold mb-2">Who I Am</h4>
        
        <h4 className="profile-section-title text-lg font-semibold mb-2">Work</h4>
        {isEditing ? (
          <input
            type="text"
            value={work}
            onChange={(e) => setWork(e.target.value)}
            className="block w-full border rounded-md py-1 px-2 mb-4"
          />
        ) : (
          <p className="profile-description">{work}</p>
        )}
        <h4 className="profile-section-title text-lg font-semibold mb-2">Hobbies</h4>
        {isEditing ? (
          <input
            type="text"
            value={hobbies}
            onChange={(e) => setHobbies(e.target.value)}
            className="block w-full border rounded-md py-1 px-2 mb-4"
          />
        ) : (
          <p className="profile-description">{hobbies}</p>
        )}
        <h4 className="profile-section-title text-lg font-semibold mb-2">Relationship</h4>
        {isEditing ? (
          <input
            type="text"
            value={relationship}
            onChange={(e) => setRelationship(e.target.value)}
            className="block w-full border rounded-md py-1 px-2 mb-4"
          />
        ) : (
          <p className="profile-description">{relationship}</p>
        )}
<div>

        </div>
      </div>
      <div className=''>
        <div className='grid grid-cols-2 '>
      <h4 className="profile-section-title text-lg font-semibold mb-2">About</h4>
      <div>
         {isEditing && (
          <button onClick={handleSave} className="save-button bg-green-500 text-white px-4 py-2 rounded-md mt-4 ml-4 relative">
            Save
          </button>
        )}
      <button onClick={handleEditToggle} className="make-public-button  text-white px-4 py-2 rounded-md mb-2  relative left-2 ">
          {isEditing ? 'Cancel' : <FontAwesomeIcon icon={faEdit} />}
        </button>
       
        </div>
           </div>
        {isEditing ? (
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="block w-full border rounded-md py-2 px-3 mb-4"
          />
        ) : (
          <p className="profile-description">{description}</p>
        )}
        </div>
        </div>
    </div>

  );
};

export default ProfileCard;
