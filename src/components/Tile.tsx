/**
 * File Name: Tile.tsx
 * Author: Zahara
 * Date: 06/2023
 * Description: Tile component for display of GitHub Repos
 */
import { useState } from 'react';
import StarIcon from '@mui/icons-material/Star';
import ForkRightIcon from '@mui/icons-material/ForkRight';
import VisibilityIcon from '@mui/icons-material/Visibility';
import BugReportIcon from '@mui/icons-material/BugReport';

type propType = {
  id: string;
  url: string;
  createdAt: string;
  updatedAt: string;
  description: string | null;
  forkCount: number | null;
  isDisabled: boolean;
  isEmpty: boolean;
  isFork: boolean;
  isLocked: boolean;
  issues: string[];
  latestRelease?: string;
  licenseInfo?: string;
  name: string;
  owner: { url: string; login: string };
  parent?: { name: string; owner: { url: string; login: string } };
  repositoryTopics: string[];
  stargazerCount: number;
  vulnCount: number;
  watchers: number;
  openGraphImageUrl: string;
};

function Tile(props: propType) {
  const {
    id,
    url,
    createdAt,
    updatedAt,
    description,
    forkCount,
    isDisabled,
    isEmpty,
    isFork,
    isLocked,
    issues,
    latestRelease,
    licenseInfo,
    name,
    owner,
    parent,
    repositoryTopics,
    stargazerCount,
    vulnCount,
    watchers,
    openGraphImageUrl,
  } = props;
  const [detailedView, setDetailedView] = useState(false);
  const topics = repositoryTopics.map((el: string, i: number) => (
    <span
      key={i}
      className='inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2'
    >
      #{el}
    </span>
  ));
  return (
    <div
      id={id}
      className='bg-white m-auto max-w-sm rounded overflow-hidden shadow-lg hover:shadow-xl'
    >
      <a
        href={url}
        target='_blank'
        className='flex flex-col items-center grayscale-0 hover:grayscale'
        title={`navigate to ${owner.login}/${name} repo`}
      >
        <div className='flex p-2 mt-1 mb-0 text-md mb-2'>
          {owner.login}/<b>{name}</b>
        </div>
        <img
          className='w-full '
          src={openGraphImageUrl}
          alt={`${owner.login}/${name}`}
        />
      </a>
      <div className='px-6 py-4'>
        <p className='text-gray-700 text-base'>
          {description ? (
            <td dangerouslySetInnerHTML={{ __html: description }} />
          ) : (
            <></>
          )}
        </p>
        <div className='px-6 pt-4 pb-2'>{topics}</div>
        <div className='flex flex-row items-start justify-around'>
          <div>
            <StarIcon sx={{ color: 'gold' }} />
            {stargazerCount}
          </div>
          <div>
            <ForkRightIcon /> {forkCount}
          </div>
          <div>
            <BugReportIcon /> {issues.length >= 100 ? '100+' : issues.length}
          </div>
          <div>
            <VisibilityIcon /> {watchers}
          </div>
        </div>
        <hr className='h-px m-0 bg-gray-200 border-0 dark:bg-gray-700' />
        <div
          onClick={() => setDetailedView((x) => !x)}
          className='flex flex-col cursor-pointer hover:bg-gray-200 hover:cursor-pointer'
        >
          <div className={detailedView ? 'self-start' : 'hidden'}>
            <p className='text-sm'>Vulnerablity Count: {vulnCount}</p>
            <p className='text-sm'>Created: {createdAt}</p>
            <p className='text-sm'>Updated: {updatedAt}</p>
            {isFork ? (
              <p className='text-sm'>
                Forked From: {parent?.owner.login}/{parent?.name}
              </p>
            ) : (
              <></>
            )}
            {latestRelease ? (
              <p className='text-sm'>Latest Release: {latestRelease}</p>
            ) : (
              <></>
            )}
            {licenseInfo ? (
              <p className='text-sm'>License: {licenseInfo}</p>
            ) : (
              <></>
            )}
          </div>

          <div className='text-xl self-center'>
            {detailedView ? <>&#8963;</> : <>&#8964;</>}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Tile;
