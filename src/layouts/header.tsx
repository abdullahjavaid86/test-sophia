import styled from 'styled-components';
import { useCurrentTime } from '../hooks/useCurrentTime';
import { useThemeChooser } from '../contexts/theme-chooser';
import { ThemeChooser } from '../components/shared/theme-chooser';

const StyledHeaderDiv = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-weight: 700;
  @media (max-width: 480px) {
    flex-direction: column;
  }
  .settings {
    list-style: none;
    display: flex;
    gap: 1rem;
    align-items: center;
  }
`;

const SimpleButton = styled.button`
  background: transparent;
  border: none;
  color: ${({ theme }) => theme.text};
  font-weight: 700;
  font-size: 16px;
  cursor: pointer;
`;

export const Header = () => {
  const { toggle } = useThemeChooser();
  const time = useCurrentTime();

  return (
    <header>
      <StyledHeaderDiv>
        <div>{time}</div>
        <div>
          <ul className="settings">
            <li>
              <SimpleButton type="button">option 1</SimpleButton>
            </li>
            <li onClick={toggle}>
              <ThemeChooser />
            </li>
          </ul>
        </div>
      </StyledHeaderDiv>
    </header>
  );
};
