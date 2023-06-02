import { useState, useEffect, useCallback } from 'react';
import { graphql } from '@octokit/graphql';
import type { Response } from '@/types/response';
const TOKEN = process.env.NEXT_PUBLIC_AUTH_TOKEN;

type GraphQLResponse = {
  search: {
    edges: {
      node: Response;
    }[];
  };
};

const gqlQuery = graphql.defaults({
  headers: {
    authorization: `token ${TOKEN}`,
  },
});

// more than 50 times out the query
const NUMBER_OF_RESULTS = 50;

function RepoQuery(props: { queryString: string }) {
  const { queryString } = props;
  const [loading, setLoading] = useState(-1);
  const [error, setError] = useState<any>();
  const [response, setResponse] = useState<Response[]>([]);

  // search:
  // Repository response :
  // https://studio.apollographql.com/public/github/variant/current/schema/reference/objects/Repository
  const sendQuery = useCallback(async () => {
    if (queryString === '') return;
    try {
      console.log('sending query....', queryString);
      setLoading(1);
      setError(null);
      const res: GraphQLResponse = await gqlQuery(
        `query search($first: Int!, $queryString: String!, $type: SearchType!){
  search(first: $first, query: $queryString, type: $type) {
    repositoryCount
    edges {
      node {
        ... on Repository {
          id
          url
          name
          descriptionHTML
          openGraphImageUrl
          owner {
            url
            login
          }
          latestRelease {
            name
          }
          licenseInfo {
            name
          }
          repositoryTopics(first:5) {
            totalCount
            nodes {
              topic {
                name
              }
            }
          }
          stargazers {
            totalCount
          }
          watchers {
            totalCount
          }
          forks {
            totalCount
          }
          issues(last:10) {
            nodes {
              body
              closed
            }
          }
          vulnerabilityAlerts {
            totalCount
          }
          updatedAt
          createdAt
          isDisabled
          isEmpty
          isLocked
          isFork
          parent {
            name
            owner {
              url
              login
            }
          }
        }
      }
    }
  }  
}
      `,
        {
          type: 'REPOSITORY',
          first: NUMBER_OF_RESULTS,
          queryString: queryString,
        }
      );
      console.log('done...', res);
      setResponse(res.search.edges.map((el: { node: Response }) => el.node));
      setLoading(0);
    } catch (err) {
      setError(err);
    }
  }, [queryString]);

  useEffect(() => {
    sendQuery();
  }, [queryString, sendQuery]);

  return { loading, error, response };
}

export default RepoQuery;
