import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import { Navbar } from '../components/organisms/Navbar/Navbar';
import { Sidebar } from '../components/organisms/Sidebar/Sidebar';
import { SkipToContent } from '../components/atoms/SkipToContent/SkipToContent';

const StyledWrapper = styled.section`
  padding-top: 70px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

type Props = {
  children: React.ReactNode;
};

export const UserPageTemplate: React.FC<Props> = ({ children }) => {
  const [isOpen, setIsOpen] = useState(true);

  const mainSection = useRef<HTMLInputElement>(null);

  const handleSkipToContent = () => {
    mainSection.current && mainSection.current.focus();
  };

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
      <SkipToContent type="button" onClick={handleSkipToContent}>
        Skip Navigation
      </SkipToContent>
      <Navbar isOpen={isOpen} setIsOpen={setIsOpen} />
      {isOpen && <Sidebar />}

      <main>
        <StyledWrapper ref={mainSection} tabIndex={0}>
          {children}
        </StyledWrapper>
      </main>
    </>
  );
};
