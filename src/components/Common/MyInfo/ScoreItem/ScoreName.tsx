interface ScoreNameProps {
  children: React.ReactNode;
}

const ScoreName = ({ children }: ScoreNameProps) => {
  return <span className="text-sm font-medium text-gray2">{children}</span>;
};

export default ScoreName;
