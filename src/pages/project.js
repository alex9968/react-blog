import React from "react";
// import { useDispatch, useSelector  } from 'react-redux'
// import { viewMergeIn,viewSetIn   } from '../redux/modules/view'
// import request from '../utils/request'
import Loading from '../css-components/Loading';
import SearchBox from '../css-components/SearchBox';
import MenuBox from '../css-components/MenuBox';
import styled from 'styled-components';

const Project = () => {
  // const dispatch = useDispatch()
  // const view = useSelector(state => state.view)
  // const message = view.get('message')
  // console.log(message)

  //const [chatHistory, setChatHistory] = useState([]);
  //const [message, setMessage] = useState('');
  
  const Block = styled.div`
		display: flex;
		justify-content: center;
		align-items: center;
    height: 200px;
    width: 100%;
    pisition: relative;
  `

  return (
    <div>
      <Block><Loading /></Block>
      <Block><MenuBox /></Block>
      <Block><SearchBox /></Block>
    </div>
  );
}
export default Project


