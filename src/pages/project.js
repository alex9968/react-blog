import React from "react";
// import { Input, Button, Row, Col } from 'antd'
// import { useDispatch, useSelector  } from 'react-redux'
// import { viewMergeIn,viewSetIn   } from '../redux/modules/view'
// import request from '../utils/request'
import Loading from '../css-components/Loading';
import SearchBox from '../css-components/SearchBox';

const Project = () => {
  // const dispatch = useDispatch()
  // const view = useSelector(state => state.view)
  // const message = view.get('message')
  // console.log(message)

  //const [chatHistory, setChatHistory] = useState([]);
  //const [message, setMessage] = useState('');

  return (
    <div>
      <Loading />
      <SearchBox />
    </div>
  );
}
export default Project


