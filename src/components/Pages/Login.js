/*
  Application Login Page
*/

import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';

// Antd
import { Form, Button } from 'antd';

// Redux
import {
  useDispatch,
  useSelector
} from 'react-redux';

// Form Elements
import { Email, Password } from '../Common/FormElements';

// Actions
import { login } from '../../store/actions/AuthAction';

// Constants
import APP_URL from '../../constants/ApplicationUrls';
import { STATUS_CODES } from '../../constants/General';
import Loading from '../Loading';

import TuringHeader from '../Common/TuringHeader';

function Login(
  props
) {

  const [error, setError] = useState(false);

  const dispatch = useDispatch();
  const history = useHistory();

  const [form] = Form.useForm();
  let formRef = React.createRef();

  // Redux States
  const loading = useSelector((state) => state?.Auth?.loading);

  // On Submit
  const onSubmit = (data) => {

    dispatch(
      login(data)
    ).then((response) => {

      if(response?.status === STATUS_CODES.SUCCESS || response?.status === STATUS_CODES.SUCCESS_2){
        history.push(APP_URL.TURING_TECH_FE_TEST.ALL);
      }
      else if(response?.status === STATUS_CODES.UNAUTHORIZED ){
        setError('Unauthorized User')
      }
      else{
        setError('INVALID_EMAIL_OR_PASSWORD');
      }

    }, (e) => {
      setError('NETWORK_ERROR');
    })
  }

  return (
    <div >
      <TuringHeader/>
      {
        loading  && <Loading/>
      }
           
      <div className='loginPage'>

        <Form
          form = {form}
          ref={formRef}
          onFinish={onSubmit}
          layout="vertical"
        >
          <div className="form-group">
            <Email
              className="form-control"
              name="username"
              label={ 'Username' }
              required={true}
              placeholder={'Username'}
              onChange={() => setError('')}
            />
          </div>

          <div className="form-group">
            <Password
              className="form-control"
              name="password"
              placeholder={'Password'}
              label={'Password'}
              required={true}
              minLength={1}
              onChange={() => { setError('') }}
            />
          </div>

          {
            error && <p>{error}</p>
          }

          <Form.Item>
            <Button 
              style={{width:'100px', float:'left'}}
              block
              size="large"
              type="primary"
              htmlType="submit"
            >
              {'Log In'}
            </Button>
          </Form.Item>

        </Form>
      </div>

    </div>
  );
}

export default Login;