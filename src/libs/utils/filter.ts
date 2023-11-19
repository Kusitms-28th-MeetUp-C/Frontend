export const typeFilter = (type: string) => {
  switch (type) {
    case 'all':
      return '전체';
    case 'it':
      return 'IT 프로젝트';
    case 'team':
      return '팀플';
    case 'club':
      return '동아리/학회';
    case 'pt':
      return '자유주제PT';
    case 'marketing':
      return '마케팅';
    case 'survey_data_analysis':
      return '설문 및 데이터 분석';
    case 'corporate_analysis':
      return '기업 분석';
    case 'design':
      return '디자인 프로젝트';
    case 'video':
      return '영상 프로젝트';
  }
};

export const tagColorFilter = (option: string, type: string) => {
  if (option === 'icon' || option === 'text') {
    switch (type) {
      case 'it':
        return 'text-tagPurple1';
      case 'team':
        return 'text-tagGreen1';
      case 'club':
        return 'text-tagSkyblue1';
      case 'pt':
        return 'text-tagOrange1';
      case 'marketing':
        return 'text-tagYellow1';
      case 'survey_data_analysis':
        return 'text-tagPink1';
      case 'corporate_analysis':
        return 'text-tagBlue1';
      case 'design':
        return 'text-tagKhaki1';
      case 'video':
        return 'text-tagRed1';
    }
  }

  if (option === 'background') {
    switch (type) {
      case 'it':
        return 'bg-tagPurple2';
      case 'team':
        return 'bg-tagGreen2';
      case 'club':
        return 'bg-tagSkyblue2';
      case 'pt':
        return 'bg-tagOrange2';
      case 'marketing':
        return 'bg-tagYellow2';
      case 'survey_data_analysis':
        return 'bg-tagPink2';
      case 'corporate_analysis':
        return 'bg-tagBlue2';
      case 'design':
        return 'bg-tagKhaki2';
      case 'video':
        return 'bg-tagRed2';
    }
  }
};
