/**
 * expected response format for GraphQL query
 */
export type Response = {
  id: string;
  url: string;
  name: string;
  descriptionHTML: string;
  openGraphImageUrl: string;
  owner: {
    url: string;
    login: string;
  };
  latestRelease?: {
    name: string;
  };
  licenseInfo?: {
    name: string;
  };
  repositoryTopics: {
    totalCount: number;
    nodes: {
      topic: {
        name: string;
      };
    }[];
  };
  stargazers: {
    totalCount: number;
  };
  watchers: {
    totalCount: number;
  };
  forks: {
    totalCount: number;
  };
  issues: {
    nodes: {
      body: string;
      closed: boolean;
    }[];
  };
  vulnerabilityAlerts: {
    totalCount: number;
  };
  updatedAt: string;
  createdAt: string;
  isDisabled: boolean;
  isEmpty: boolean;
  isLocked: boolean;
  isFork: boolean;
  parent?: {
    name: string;
    owner: {
      url: string;
      login: string;
    };
  };
};
