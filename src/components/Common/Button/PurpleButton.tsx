import styled from 'styled-components';

interface PurpleButtonProps {
  textSize?: string;
}

const PurpleButton = styled.button<PurpleButtonProps>`
  border-radius: 12px;
  background-color: #dfe1fa;
  padding: 0.625rem 1.5rem;
  font-weight: 600;
  color: #505bce;
  ${(props) =>
    props.textSize ? `font-size: ${props.textSize};` : 'font-size: 1rem;'}
`;

export default PurpleButton;
