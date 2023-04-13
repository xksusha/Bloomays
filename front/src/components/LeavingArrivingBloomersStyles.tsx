import styled from 'styled-components';

// Define the styled components
export const Modal = styled.div`
  /* Set modal styles */
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const ModalContent = styled.div`
  /* Set modal content styles */
  background-color: #fff;
  width: 250px;
  height: 40vh;
  padding: 20px;
  overflow: scroll;
  border-radius: 5px;
  position: relative;
  display: flex;
  flex-direction: column;
`;

export const Close = styled.a`
  /* Set close button styles */
  position: fixed;
  font-size: 20px;
  cursor: pointer;
  margin-top: -15px;
  margin-right: -10px;
  align-self: flex-end;
`;

export const Timeline = styled.div`
  /* Set timeline styles */
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const TimelineTitle = styled.h2`
  /* Set timeline title styles */
  font-size: 16px;
  margin-bottom: 20px;
  font-weight: 300;
`;

export const TimelineList = styled.ul`
  /* Set timeline list styles */
  list-style-type: none;
  padding: 0;
  margin: 0;
`;

export const DateGroup = styled.div`
  /* Set date group styles */
  padding-top: 9px;
`;

interface LeavingProps {
  leaving: boolean;
}

export const TitleCount = styled.span<LeavingProps>`
  /* Set count styles */
  color: ${(props: LeavingProps) => (props.leaving ? 'red' : 'green')};
  text-decoration: underline;
  padding: 5px;
`;

export const TimelineListItem = styled.li<LeavingProps>`
  /* Set timeline list item styles */
  font-size: 12px;
  height: 4rem;
  border-left: 1px solid #cacaca;
  position: relative;
  padding-left: 20px;
  margin-left: 30%;
  display: flex;
  flex-direction: column;
  &:last-child{
    border: 0px;
    padding-bottom: 0;
  }
  &:before{
    content: '';
    width: 10px;
    height: 10px;
    background: #cacaca;
    border-radius: 50%;
    border: 10px solid white;
    position: absolute;
    left: -15px;
    top: 0px;
  }
  color: ${(props: LeavingProps) => (props.leaving ? 'red' : 'green')};
`;

interface NameProps {
  isLast: boolean;
}

export const Name = styled.div<NameProps>`
  color: #cacaca;
  font-weight: 300;
  height: 24px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  flex-grow: 1;
`