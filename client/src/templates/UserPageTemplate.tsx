import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import Navbar from '../components/organisms/Navbar/Navbar';
import Sidebar from '../components/organisms/Sidebar/Sidebar';

const StyledWrapper = styled.div`
  padding-top: 70px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

type Props = {
  children: any;
};

const UserPageTemplate: React.FC<Props> = ({ children }) => (
  <>
    <Navbar />
    <Sidebar />
    <StyledWrapper>{children}</StyledWrapper>
  </>
);

UserPageTemplate.propTypes = {
  children: PropTypes.oneOfType([PropTypes.element, PropTypes.node]).isRequired,
};

export default UserPageTemplate;
