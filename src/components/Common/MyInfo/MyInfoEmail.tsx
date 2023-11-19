interface MyInfoEmailProps {
  email: string;
}

const MyInfoEmail = ({ email }: MyInfoEmailProps) => {
  return <span className="text-gray3">{email}</span>;
};

export default MyInfoEmail;
