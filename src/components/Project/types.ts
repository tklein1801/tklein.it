export type TProject = {
  id: string;
  owner: {login: string};
  name: string;
  description: string;
  url: string;
  primaryLanguage: {name: string; color: string};
  stargazerCount: number;
  forkCount: number;
  usesCustomOpenGraphImage: boolean;
  openGraphImageUrl: string;
};
