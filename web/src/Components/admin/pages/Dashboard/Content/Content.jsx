import React from 'react'
import ContentHeader from '../../pages-layout/pages-layout'
import Card from './Card'

const Content = ({ token }) => {

  return (
    <div className='profile-content'>
      <ContentHeader title="Dashboard" />
      <Card token={token} />
    </div>


  )
};

export default Content
