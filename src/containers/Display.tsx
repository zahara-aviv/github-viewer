/**
 * File Name: Display.tsx
 * Author: Zahara
 * Date: 06/2023
 * Description: Main Display container
 */
import React, {
  useRef,
  useEffect,
  useCallback,
  useState,
  ChangeEvent,
  FormEvent,
} from 'react';
import RepoQuery from '@/hooks/RepoQuery';
import NavBar from '@/components/NavBar';
import Tile from '@/components/Tile';
import SearchBar from '@/components/SearchBar';
import type { Response } from '@/types/response';
const TOKEN = process.env.NEXT_PUBLIC_AUTH_TOKEN;

const PER_PAGE = 10;

function Display() {
  const [sbText, setSBText] = useState('');
  const [queryString, setQueryString] = useState('');
  const [page, setPage] = useState(1);
  const { loading, error, response } = RepoQuery({ queryString });
  const loader = useRef(null);
  const [tiles, setTiles] = useState<JSX.Element[]>([]);
  // const octokit = new Octokit({ auth:  process.env.REACT_APP_AUTH_TOKEN});
  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSBText(e.target.value);
  };
  const handleObserver = useCallback((entries: any) => {
    const target = entries[0];
    if (target.isIntersecting) {
      setPage((prev) => prev + 1);
    }
  }, []);

  useEffect(() => {
    const option = {
      root: null,
      rootMargin: '20px',
      threshold: 0,
    };
    const observer = new IntersectionObserver(handleObserver, option);
    if (loader.current) observer.observe(loader.current);
  }, [handleObserver]);

  useEffect(() => {
    const newTiles: JSX.Element[] = [];
    for (
      let i = (page - 1) * PER_PAGE;
      i < Math.min(response.length, PER_PAGE * page);
      i++
    ) {
      const record = response[i];
      newTiles.push(
        <Tile
          key={record.id}
          id={record.id}
          url={record.url}
          createdAt={record.createdAt}
          updatedAt={record.updatedAt}
          description={record.descriptionHTML}
          forkCount={record.forks?.totalCount}
          isDisabled={record.isDisabled}
          isEmpty={record.isEmpty}
          isFork={record.isFork}
          isLocked={record.isLocked}
          issues={record.issues.nodes
            .filter((el: { closed: boolean }) => !el.closed)
            .map((el: { body: string }) => {
              return el.body;
            })}
          latestRelease={record.latestRelease?.name}
          licenseInfo={record.licenseInfo?.name}
          name={record.name}
          owner={record.owner}
          parent={record.parent}
          repositoryTopics={record.repositoryTopics.nodes.map(
            (el: { topic: { name: string } }) => {
              return el.topic.name;
            }
          )}
          stargazerCount={record.stargazers.totalCount}
          vulnCount={record.vulnerabilityAlerts.totalCount}
          watchers={record.watchers.totalCount}
          openGraphImageUrl={record.openGraphImageUrl}
        />
      );
    }
    setTiles((prev) => (page !== 1 ? [...prev, ...newTiles] : newTiles));
  }, [page, response]);

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setPage(1);
    setQueryString(sbText);
    setTiles([]);
  };
  return (
    <div>
      <NavBar
        title='GitView'
        iconType='github'
        link='https://github.com/zahara-aviv/github-viewer/tree/main'
      />
      <div className='flex w-full justify-center '>
        <SearchBar text={sbText} onChange={onChange} onSubmit={onSubmit} />
      </div>
      <div className='p-6 flex flex-wrap items-start gap-4'>{tiles}</div>
      {loading === 1 && (
        <div role='status' className='flex w-full justify-center'>
          <svg
            aria-hidden='true'
            className='w-8 h-8 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600'
            viewBox='0 0 100 101'
            fill='none'
            xmlns='http://www.w3.org/2000/svg'
          >
            <path
              d='M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z'
              fill='currentColor'
            />
            <path
              d='M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z'
              fill='currentFill'
            />
          </svg>
          <span className='sr-only'>Loading...</span>
        </div>
      )}
      {error && <p>Error!</p>}
      <div ref={loader} />
    </div>
  );
}

export default Display;
