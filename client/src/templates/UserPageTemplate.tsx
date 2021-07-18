import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Navbar } from '../components/organisms/Navbar/Navbar';
import { Sidebar } from '../components/organisms/Sidebar/Sidebar';

const StyledWrapper = styled.section`
  padding-top: 70px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

type Props = {
  children: any;
};

export const UserPageTemplate: React.FC<Props> = ({ children }) => {
  const [isOpen, setIsOpen] = useState(true);

  const updateViewState = () => {
    if (document.documentElement.clientWidth < 1024) {
      setIsOpen(false);
    } else if (document.documentElement.clientWidth > 1024) {
      setIsOpen(true);
    }
  };

  useEffect(() => {
    updateViewState();
    window.addEventListener('resize', updateViewState);
  }, []);

  return (
    <>
      <Navbar isOpen={isOpen} setIsOpen={setIsOpen} />
      {isOpen && <Sidebar />}
      <main>
        <StyledWrapper>{children}</StyledWrapper>
      </main>
    </>
  );
};
