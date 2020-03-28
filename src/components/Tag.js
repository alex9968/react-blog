import React from 'react'
import { Link} from 'react-router-dom';

const Tag = ({data}) => {

  return(
    <div className="tag">
      <Link to={`/sort/${data}`}>
        <div >{data}</div>
        <style jsx>
          {`
        .tag:hover{
          background:#CEAE1B;
        }
        .tag{
          font-size: 12px;
          display: inline-block;
          text-align:center;
          background:#FEAE1B;
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
export default Tag
//           -webkit-box-shadow:3px 4px 6px #333333;
//           box-shadow:3px 4px 6px #333333;
//           -moz-border-radius:1em;
//           -webkit-border-radius:1em;
//           border-radius:1em;
//
