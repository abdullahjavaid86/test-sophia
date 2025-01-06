import { ModalComponent } from '../components/shared/modal';
import styled from 'styled-components';
import { useToggle } from '../hooks/useToggle';

const StyledDiv = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  & p > span {
    font-weight: 700;
  }
`;

export const Home = () => {
  const { status, toggle, off } = useToggle();
  return (
    <div className="text-center">
      <StyledDiv>
        <p>Welcome home</p>
        <button className="p-2 bg-transparent border" onClick={toggle}>
          Open Modal
        </button>
      </StyledDiv>
      <ModalComponent isOpen={status} toggle={toggle}>
        <div className="flex flex-col w-100">
          <button className="text-right transition-colors hover:text-red-500" onClick={off}>
            x
          </button>
          <p>This is Modal</p>
        </div>
      </ModalComponent>
    </div>
  );
};
