import React from 'react'
import { Link} from 'react-router-dom';
import { Tag  } from 'antd'

const Tags = ({data}) => {

  return(
    <div className="">
      <Link to={`/sort/${data}`}>
        <Tag color="blue">{data}</Tag>
        <style jsx>
          {`
        .tag:hover{
          background:#0f90d3;
        }
        .tag{
          font-size: 12px;
          display: inline-block;
          text-align:center;
          background: #3bb4f3;
          color: #fff;
          padding: 2px 10px;
          width:auto;
          border-radius:25px;
          margin: 0 5px;
        }
        `}
        </style>
      </Link>
    </div>
  )
}
export default Tags
//           -webkit-box-shadow:3px 4px 6px #333333;
//           box-shadow:3px 4px 6px #333333;
//           -moz-border-radius:1em;
//           -webkit-border-radius:1em;
//           border-radius:1em;
//
