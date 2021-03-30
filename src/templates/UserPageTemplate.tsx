import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import Navbar from '../components/organisms/Navbar/Navbar';
import Sidebar from '../components/organisms/Sidebar/Sidebar';

const StyledWrapper = styled.div`
  padding-left: 200px;
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
