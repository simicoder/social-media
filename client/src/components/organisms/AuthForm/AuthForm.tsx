import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { GoogleLogin } from 'react-google-login';
import styled from 'styled-components';
import Croppie from 'croppie';
import { signin, signup } from '../../../actions/auth';
import { AUTH } from '../../../constants/actionTypes';
import TextInput from '../../atoms/TextInput/TextInput';
import Button from '../../atoms/Button/Button';
import profileIcon from '../../../assets/Icons/profileIcon.svg';
import CropperInput from '../../molecules/CropperInput/CropperInput';
import Error from '../../atoms/Error/Error';

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  background-color: #3b3b3b;
  width: 700px;
  min-height: 500px;
  align-items: center;
  justify-content: center;
  padding: 2vw;
  border-radius: 10px;
  box-sizing: border-box;
  margin-top: 20px;

  @media only screen and (max-width: 750px) {
    width: 90%;
  }
`;

const initialState = {
  username: '',
  email: '',
  password: '',
  confirmPassword: '',
  selectedFile: '',
  urlSelectedFile: profileIcon,
};

const AuthForm = () => {
  const [form, setForm] = useState(initialState);
  const [isSignup, setIsSignup] = useState(false);
  const [error, setError] = useState('');
  const dispatch = useDispatch();

  const history = useHistory();

  const [showPassword, setShowPassword] = useState(false);
  const handleShowPassword = () => setShowPassword(!showPassword);

  const [croppie, setCroppie] = useState<Croppie | null>(null);

  const switchMode = () => {
    setForm(initialState);
    setIsSignup((prevIsSignup) => !prevIsSignup);
    setShowPassword(false);
    setError('');
  };

  const validate = () => {
    if (isSignup) {
      if (!form.email && !form.password && !form.confirmPassword && !form.username) {
        setError('Please complete all fields');
        return false;
      }

      if (form.password != form.confirmPassword) {
        setError('The provided passwords do not match');
        return false;
      }

      if (croppie == null) {
        setError('Add profile image');
        return false;
      }
    } else if (!form.email && !form.password) {
      setError('Please complete all fields');
      return false;
    }

    if (!form.email.includes('@') && !form.email.includes('.')) {
      setError('Please check your email');
      return false;
    }

    if (!(form.password.length >= 8) && !/\d/.test(form.password)) {
      setError('Password must be at least 8 characters long and contain numbers');
      return false;
    }

    return true;
  };

  const handleSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('email', form.email);
    formData.append('password', form.password);

    if (validate()) {
      if (isSignup) {
        if (croppie !== null) {
          croppie
            .result({
              type: 'blob',
              size: {
                width: 480,
                height: 480,
              },
            })
            .then((blob: Blob) => {
              formData.append('username', form.username);
              formData.append('confirmPassword', form.confirmPassword);
              formData.append('selectedFile', blob);
              try {
                dispatch(signup(formData, history));
              } catch (err) {
                console.log(err);
                setError(err.message);
              }
              history.push('/');
            });
        }
      } else {
        dispatch(signin(formData, history));
      }
    }
  };

  // const googleSuccess = async (res) => {
  //   const result = res?.profileObj;
  //   const token = res?.tokenId;

  //   try {
  //     dispatch({ type: AUTH, data: { result, token } });

  //     history.push('/');
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  const googleError = () => console.log('Google Sign In was unsuccessful. Try again later');

  const handleChange = (e: { target: { name: string; value: string } }) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  return (
    <>
      <StyledForm
        autoComplete="off"
        noValidate
        onSubmit={handleSubmit}
        encType="multipart/form-data"
      >
        <h1>{isSignup ? 'Sign up' : 'Sign in'}</h1>
        {error && <Error>{error}</Error>}
        {isSignup && (
          <TextInput placeholder="username" name="username" onChange={handleChange} required />
        )}
        <TextInput placeholder="email" name="email" onChange={handleChange} type="email" required />
        <TextInput
          placeholder="password"
          name="password"
          onChange={handleChange}
          type="password"
          required
        />
        {isSignup && (
          <>
            <TextInput
              placeholder="password"
              name="confirmPassword"
              onChange={handleChange}
              type="password"
              required
            />
          </>
        )}
        {isSignup && (
          <CropperInput defaultImg={profileIcon} setCroppie={setCroppie} croppie={croppie} />
        )}
        <Button type="submit">{isSignup ? 'Sign Up' : 'Sign In'}</Button>
        {/* <GoogleLogin
          clientId="564033717568-e5p23rhvcs4i6kffgsbci1d64r8hp6fn.apps.googleusercontent.com"
          render={(renderProps) => (
            <Button onClick={renderProps.onClick} disabled={renderProps.disabled}>
              Google Sign In
            </Button>
          )}
          onSuccess={googleSuccess}
          onFailure={googleError}
          cookiePolicy="single_host_origin"
        /> */}
      </StyledForm>
      <div onClick={switchMode}>
        {isSignup ? (
          <>
            Already have an account?
            <Button>Sign in</Button>
          </>
        ) : (
          <>
            Don&#39;t have an account?
            <Button>Sign Up</Button>
          </>
        )}
      </div>
    </>
  );
};

export default AuthForm;
