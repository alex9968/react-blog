import React from 'react'
import { Link} from 'react-router-dom';
import { Tag  } from 'antd'

const Tags = ({data}) => {

  return(
    <div className="tag">
      <Link to={`/sort/${data}`}>
        <Tag className="tag" color="blue">{data}</Tag>
        <style jsx>
          {`
        .tag:hover{
          cursor: pointer;
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
