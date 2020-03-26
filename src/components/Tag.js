import React from 'react'
import { Row, Col, Menu, Dropdown } from 'antd'
//import { Link } from 'react-router-dom';

const Tag = ({tag}) => {

  return(
    <div>
      <div>{tag}</div>
      <style jsx>
        {`
        .main{
        color: red;


        }

        `}
      </style>
    </div>
  )

}

export default Tag




// -moz-box-shadow:3px 4px 6px #333333;
//           -webkit-box-shadow:3px 4px 6px #333333;
//           box-shadow:3px 4px 6px #333333;
//           -moz-border-radius:1em;
//           -webkit-border-radius:1em;
//           border-radius:1em;
//
