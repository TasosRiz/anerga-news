import React from 'react'
import './Profile.css'
import userImage from './img2.jpg'
import { BiBook } from 'react-icons/bi'

const courses = [
  {
    title: 'HTML CSS',
    duration: '2 Hours',
    icon: <BiBook />,
  },
  {
    title: 'JavaScript',
    duration: '2 Hours',
    icon: <BiBook />,
  },
  {
    title: 'React.js',
    duration: '2 Hours',
    icon: <BiBook />,
  },
];

const Profile = () => {
  return (
    <div className='profile'>
      <div className='user-profile'>
        <div className='user-detail'>
          <img src={userImage} alt="" />
          <h3 className='username'>Nami</h3>
          <span className='profession'>Thief</span>
        </div>
        <div className='user-courses'>
          {courses.map((courses) => (
            <div className='course'>
              <div className='course-detail'>
                <div className='course-cover'>{courses.icon}</div>
                <div className='course-name'>
                  <h5 className='title'>{courses.title}</h5>
                  <span className='duration'>{courses.duration}</span>
                </div>
              </div>
              <div className='action'>:</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Profile
