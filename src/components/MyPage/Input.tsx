import styled from 'styled-components';

interface InputProps {
  label: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const InputBlock = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 0.5rem;
  width: 100%;
  padding: 0.75rem 1rem;
  border-radius: 0.5rem;
  background-color: #ebeef9;
  font-size: 1rem;

  label {
    display: block;
    color: #5257d6;
    width: 4rem;
    font-size: 0.875rem;
  }

  input {
    width: 100%;
    background: none;
    font-size: 0.875rem;

    &:focus {
      outline: none;
    }
  }
`;

const EditIcon = styled.i`
  width: 1rem;
  height: 1rem;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const Input = ({ label, value, onChange }: InputProps) => {
  return (
    <InputBlock>
      <label>{label}</label>
      <input type="text" value={value} onChange={onChange} />
      <EditIcon>
        <img src="/icons/edit-icon-purple.svg" alt="edit" />
      </EditIcon>
    </InputBlock>
  );
};

export default Input;
