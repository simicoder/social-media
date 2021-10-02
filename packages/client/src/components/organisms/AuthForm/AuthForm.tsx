import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { GoogleLogin } from 'react-google-login';
import styled from 'styled-components';
import Croppie from 'croppie';
import { signin, signup } from '../../../redux/actions/auth';
import { AUTH } from '../../../redux/actionTypes';
import { TextInput } from '../../atoms/TextInput/TextInput';
import { Button } from '../../atoms/Button/Button';
import profileIcon from '../../../assets/Icons/profileIcon.svg';
import { CropperInput } from '../../molecules/CropperInput/CropperInput';
import { Error } from '../../atoms/Error/Error';

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
  name: '',
  email: '',
  password: '',
  confirmPassword: '',
  selectedFile: '',
  urlSelectedFile: profileIcon,
};

export const AuthForm = () => {
  const [form, setForm] = useState(initialState);
  const [isSignup, setIsSignup] = useState(false);
  const [error, setError] = useState('');
  const dispatch = useDispatch();

  const history = useHistory();

  const [showPassword, setShowPassword] = useState(false);

  const [croppie, setCroppie] = useState<Croppie | null>(null);

  useEffect(
    () =>
      function cleanup() {
        setError('');
      },
    [],
  );

  const switchMode = () => {
    setForm(initialState);
    setIsSignup((prevIsSignup) => !prevIsSignup);
    setShowPassword(false);
    setError('');
  };

  const validate = () => {
    if (isSignup) {
      if (!form.email && !form.password && !form.confirmPassword && !form.name) {
        setError('Please complete all fields');
        return false;
      }

      if (form.password != form.confirmPassword) {
        setError('The provided passwords do not match');
        return false;
      }

      if (croppie === null) {
        setError('Add profile image');
        return false;
      }
    } else if (!form.email && !form.password) {
      setError('Please complete all fields');
      return false;
    }

    if (!(form.email.includes('@') && form.email.includes('.'))) {
      setError('Please check your email');
      return false;
    }

    if (!(form.password.length >= 8) && !/\d/.test(form.password)) {
      setError('Password must be at least 8 characters long and contain numbers');
      return false;
    }

    return true;
  };

  const handleSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('email', form.email);
    formData.append('password', form.password);

    try {
      if (validate()) {
        if (isSignup) {
          if (croppie !== null) {
            const croppieResult = await croppie.result({
              type: 'blob',
              size: {
                width: 480,
                height: 480,
              },
            });

            formData.append('name', form.name);
            formData.append('confirmPassword', form.confirmPassword);
            formData.append('selectedFile', croppieResult);

            await dispatch(signup(formData, history));
          } else {
            setError('image is not loaded, try again');
          }
        } else {
          await dispatch(signin(formData, history));
        }
      }
    } catch (err) {
      setError(err as string);
    }
  };

  const googleSuccess = async (res) => {
    const result = res?.profileObj;
    const token = res?.tokenId;

    localStorage.setItem('token', token);

    dispatch({ type: AUTH, data: { result } });

    history.push('/');
  };

  const googleError = () => setError('Google Sign In was unsuccessful. Try again later');

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

        {isSignup && <TextInput label="name" name="name" onChange={handleChange} />}
        <TextInput label="email" name="email" onChange={handleChange} type="email" />
        <TextInput
          label="password"
          name="password"
          onChange={handleChange}
          type={showPassword ? 'text' : 'password'}
        />
        {isSignup && (
          <>
            <TextInput
              label="confirm password"
              name="confirmPassword"
              onChange={handleChange}
              type={showPassword ? 'text' : 'password'}
            />
          </>
        )}

        {isSignup && (
          <CropperInput defaultImg={profileIcon} setCroppie={setCroppie} croppie={croppie} />
        )}

        <Button type="button" onClick={() => setShowPassword(!showPassword)}>
          {showPassword ? 'Hide password' : 'Show Passoword'}
        </Button>

        <Button type="submit">{isSignup ? 'Sign Up' : 'Sign In'}</Button>

        <GoogleLogin
          clientId="460129690206-sv9i6vkok7kvbgha43s56nrke7sqe3km.apps.googleusercontent.com"
          render={(renderProps) => (
            <Button onClick={renderProps.onClick} disabled={renderProps.disabled}>
              Google Sign In
            </Button>
          )}
          onSuccess={googleSuccess}
          onFailure={googleError}
          cookiePolicy="single_host_origin"
        />
      </StyledForm>

      <div onClick={switchMode}>
        {isSignup ? (
          <>
            Already have an account?
            <Button>Go to Sign in</Button>
          </>
        ) : (
          <>
            Don&#39;t have an account?
            <Button>Go to Sign Up</Button>
          </>
        )}
      </div>
    </>
  );
};
