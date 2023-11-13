export const typeFilter = (type: string) => {
  switch (type) {
    case 'all':
      return '전체';
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
