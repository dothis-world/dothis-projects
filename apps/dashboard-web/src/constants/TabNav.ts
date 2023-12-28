export const MEDIA_TABNAV_DATA = [
  { title: '유튜브', category: 'youtube' },
  { title: '커뮤니티', category: 'community' },
  { title: 'SNS', category: 'SNS' },
  { title: '뉴스', category: 'news' },
] as const;

export type MedialTabNavDataCategoryType =
  (typeof MEDIA_TABNAV_DATA)[number]['category'];

export const MYPAGE_TABNAV_DATA = [
  { title: '내 정보', category: 'info' },
  { title: '내 이용권 관리', category: 'manage' },
  { title: 'FAQ', category: 'faq' },
] as const;

export const CATEGORY_TABNAV_DATA = [
  { title: '주요 카테고리', category: 'category' },
  { title: '채널 비교', category: 'channel' },
];

export type CategoryTabNavDataCategoryType =
  (typeof CATEGORY_TABNAV_DATA)[number]['category'];
