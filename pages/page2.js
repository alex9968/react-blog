import React, { useState, useContext } from 'react'
import {withRouter} from 'next/router'
import MyContext from '~/components/MyContext'

const Page2 =(props) => {
  const [value, setValue] = React.useState(0);
  const { isMobile } = useContext(MyContext)
  console.info( 'isMobile', isMobile)

  return (
    <div style={{ background:'green' }} className="man">

      <style jsx>{`
        .man {
          positon: relation;
          width: 80%;
          margin-left:10%;
        }
      `}
      </style>
    </div>


  )
}
export default withRouter(Page2)

