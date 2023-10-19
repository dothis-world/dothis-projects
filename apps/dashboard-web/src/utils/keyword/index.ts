/**
 *  선택한 키워드가 존재하는지 확인하는 함수
 * @param arr array 형태의 키워드 리스트를 보내줘야함
 * @returns 선택된 키워드가 하나라도 있으면 true를 반환
 */

export function isHashKeyword(arr: Array<string> | null | undefined) {
  if (arr === null || arr === undefined) {
    return false;
  }
  for (let i = 0; i < arr.length; i++) {
    if (arr[i].endsWith('#')) {
      return true; // '#'이 발견되면 true 반환
    }
  }
  return false; // 모든 문자열에서 '#'을 찾지 못하면 false 반환
}

/**
 * api -> getUserKeyword에 response형식에 맞춰서 params를 받고 두개의 리스트를 합친 array를 반환하는 함수
 * @param arr1 채널 키워드 or 태그 response가 들어옴 (ex: '먹방, 와인, 쥬스' string형식)
 * @param arr2 채널 키워드 or 태그 response가 들어옴
 * @returns 두개의 리스트를 합친 array를 반환
 */

export const combinedKeywordsAndTags = (
  arr1: string | undefined | null,
  arr2: string | undefined | null,
) => {
  if (!arr1) arr1 = '';
  if (!arr2) arr2 = '';

  // if (!Array.isArray(arr1) || !Array.isArray(arr2)) {
  //   throw new Error('타입 에러발생 ');
  // }

  return arr1.split(',').concat(arr2.split(','));
};
