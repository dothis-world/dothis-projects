export const serverApiBaseUrl = 'https://api.dothis.world/v1' as const;
export const mockApiBaseUrl = 'http://localhost:3667/api/mock' as const;

export const apiBaseUrl =
  process.env.NEXT_PUBLIC_API_MOCKING === 'enabled'
    ? mockApiBaseUrl
    : serverApiBaseUrl;
