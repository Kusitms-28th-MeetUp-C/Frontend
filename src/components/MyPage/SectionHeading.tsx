import styled from 'styled-components';

interface SectionHeadingProps {
  textAlign?: 'left' | 'center';
}

const SectionHeading = styled.h1<SectionHeadingProps>`
  font-size: 1.25rem;
  font-weight: bold;

  ${(props) =>
    props.textAlign === 'center' ? 'text-align: center;' : 'text-align: left;'}
`;

export default SectionHeading;
