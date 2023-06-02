/**
 * File Name: Display.tsx
 * Author: Zahara
 * Date: 06/2023
 * Description: Main Display container
 */
import React, { useEffect, useState, ChangeEvent, FormEvent } from 'react';
import { graphql } from '@octokit/graphql';
import NavBar from '@/components/NavBar';
import Tile from '@/components/Tile';
import SearchBar from '@/components/SearchBar';
const TOKEN = process.env.NEXT_PUBLIC_AUTH_TOKEN;

function Display() {
  const [searchTerm, setSearchTerm] = useState('');
  const [tiles, setTiles] = useState<JSX.Element[]>([]);
  // const octokit = new Octokit({ auth:  process.env.REACT_APP_AUTH_TOKEN});
  const gqlQuery = graphql.defaults({
    headers: {
      authorization: `token ${TOKEN}`,
    },
  });
  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };
  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    console.log('submitting...', searchTerm);
    // search:
    // Repository response : https://studio.apollographql.com/public/github/variant/current/schema/reference/objects/Repository
    gqlQuery(
      `
      query search($first: Int!, $queryString: String!, $type: SearchType!){
        search(first: $first, query: $queryString, type: $type) {
          repositoryCount
          edges {
            node {
              ... on Repository {
                name
                descriptionHTML
                stargazers {
                  totalCount
                }
                forks {
                  totalCount
                }
                updatedAt
              }
            }
          }
        }  
      }
      `,
      {
        type: 'REPOSITORY',
        first: 10,
        queryString: searchTerm,
      }
      // list all repos by authenticated user:
      // gqlQuery(
      //   `
      //   query getRepositories($last: Int, $isFork: Boolean) {
      //     viewer {
      //       repositories(last: $last, isFork: $isFork) {
      //         nodes {
      //           name
      //         }
      //       }
      //     }
      //   }
      //   `,
      //   {
      //     last: 10,
      //     isFork: true,
      //   }
      // `
      // query lastIssues($owner: String!, $repo: String!, $num: Int = 3) {
      //     repository(owner: $owner, name: $repo) {
      //       issues(last: $num) {
      //         edges {
      //           node {
      //             title
      //           }
      //         }
      //       }
      //     }
      //   }
      // `,
      // {
      //   owner: 'octokit',
      //   repo: searchTerm,
      // }
    )
      .then((res: any) => {
        console.log(res);
        const newTiles = [];
        for (let i = 0; i < res.search.edges.length; i++) {
          newTiles.push(<Tile key={'tile' + i} />);
        }
        setTiles(newTiles);
      })
      .catch((err) => console.error(err));
    e.preventDefault();
    // call API for query of results
  };
  return (
    <div>
      <NavBar
        title='GitView'
        iconType='github'
        link='https://github.com/zahara-aviv/github-viewer/tree/main'
      />
      <div className='flex w-full justify-center '>
        <SearchBar text={searchTerm} onChange={onChange} onSubmit={onSubmit} />
      </div>
      <div className='p-6 flex justify-between flex-row flex-wrap'>{tiles}</div>
    </div>
  );
}

export default Display;
