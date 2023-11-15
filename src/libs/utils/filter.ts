export const typeFilter = (type: string) => {
  switch (type) {
    case 'all':
      return '전체 카테고리';
    case 'it':
      return 'IT프로젝트';
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
  if (option === 'icon') {
    switch (type) {
      case 'it':
        return 'tagPurple1';
      case 'team':
        return 'tagGreen1';
      case 'club':
        return 'tagSkyblue1';
      case 'pt':
        return 'tagOrange1';
      case 'marketing':
        return 'tagYellow1';
      case 'survey_data_analysis':
        return 'tagPink1';
      case 'corporate_analysis':
        return 'tagBlue1';
      case 'design':
        return 'tagKhaki1';
      case 'video':
        return 'tagRed1';
    }
  }

  if (option === 'background') {
    switch (type) {
      case 'it':
        return 'tagPurple2';
      case 'team':
        return 'tagGreen2';
      case 'club':
        return 'tagSkyblue2';
      case 'pt':
        return 'tagOrange2';
      case 'marketing':
        return 'tagYellow2';
      case 'survey_data_analysis':
        return 'tagPink2';
      case 'corporate_analysis':
        return 'tagBlue2';
      case 'design':
        return 'tagKhaki2';
      case 'video':
        return 'tagRed2';
    }
  }
};
