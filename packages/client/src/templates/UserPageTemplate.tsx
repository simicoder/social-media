import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import { Navbar } from '../components/organisms/Navbar/Navbar';
import { Sidebar } from '../components/organisms/Sidebar/Sidebar';
import { SkipToContent } from '../components/atoms/SkipToContent/SkipToContent';
import { useWindowWidth } from '../utils/useWindowWidth';

const StyledWrapper = styled.section`
  padding-top: 70px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

interface IProps {
  children: React.ReactNode;
}

export const UserPageTemplate = ({ children }: IProps) => {
  const [isOpen, setIsOpen] = useState(true);

  const mainSection = useRef<HTMLInputElement>(null);

  const windowWidth = useWindowWidth();

  useEffect(() => {
    setIsOpen(windowWidth >= 1024);
  }, [windowWidth]);

  const handleSkipToContent = () => {
    mainSection.current && mainSection.current.focus();
  };

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
