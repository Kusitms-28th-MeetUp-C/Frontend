export interface RoadmapItemProps {
  className?: string;
  name: string;
  onChange?: (e: any) => void;
}

export interface TemplateItemProps {
  className?: string;
  name: string;
  onChange?: (e: any) => void;
}

export interface AddButtonProps {
  type?: 'button' | 'submit';
  target?: 'step' | 'template';
  onClick?: () => void;
}

export interface InputProps {
  placeholder?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  className?: string; // className prop 추가
}

export interface TemplateValues {
  title: string;
  content: string;
  introduction: string;
}

export interface RoundedBoxProps {
  children: React.ReactNode;
  className?: string;
  color?: 'blue' | 'white';
}
