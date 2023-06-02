# github-viewer

React Github Viewer
This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Querying GitHub

GitHub Viewer supports [GitHub repository searches](https://docs.github.com/en/search-github/searching-on-github/searching-for-repositories)

Open [http://localhost:3000](http://localhost:3000) with your browser.

Enter in a query into the search bar.

## Learn More

Project makes use of React, TypeScript, GraphQL, Cypress Test Suite

## Search Qualifier Examples:

Qualifier Examples

### Search by repository name, description, or contents of the README file

      in:name	        | jquery in:name matches repositories with "jquery" in the repository name.
      in:description	| jquery in:name,description matches repositories with "jquery" in the repository name or description.
      in:topics	        | jquery in:topics matches repositories labeled with "jquery" as a topic.
      in:readme         | jquery in:readme matches repositories mentioning "jquery" in the repository's README file.
      repo:owner/name	| repo:octocat/hello-world matches a specific repository name.

### Search within a user's or organization's repositories

      user:USERNAME	    | user:defunkt forks:>100 matches repositories from @defunkt that have more than 100 forks.
      org:ORGNAME	    | org:github matches repositories from GitHub.

### Search by repository size

      size:n	        | size:1000 matches repositories that are 1 MB exactly.
      size:>n	        | size:>=30000 matches repositories that are at least 30 MB.
      size:<n	        | size:<50 matches repositories that are smaller than 50 KB.
      size:n..n	        | size:50..120 matches repositories that are between 50 KB and 120 KB.

### Search by number of stars

      stars:n	        | stars:500 matches repositories with exactly 500 stars.
      stars:n..n        | 	stars:10..20 size:<1000 matches repositories 10 to 20 stars, that are smaller than 1000 KB.
      stars:>=n         | 	stars:>=500 fork:true language:php matches repositories with the at least 500 stars, including forked ones, that are written in PHP.


### Search by number of followers

      followers:>=n	    | node followers:>=10000 matches repositories with 10,000 or more followers mentioning the word "node".
      followers:n..n	| styleguide linter followers:1..10 matches repositories with between 1 and 10 followers, mentioning the word "styleguide linter."

### Search by number of forks

      forks:n	        | forks:5 matches repositories with only five forks.
      forks:>n	        | forks:>=205 matches repositories with at least 205 forks.
      forks:<n	        | forks:<90 matches repositories with fewer than 90 forks.
      forks:n..n	    | forks:10..20 matches repositories with 10 to 20 forks.

### Search by when a repository was created or last updated

      created:<YYYY-MM-DD	| webos created:<2011-01-01 matches repositories with the word "webos" that were created before 2011.
      pushed:>YYYY-MM-DD	| css pushed:>2013-02-01 matches repositories with the word "css" that were pushed to after January 2013.
      pushed:>=YYYY-MM-DD   | case pushed:>=2013-03-06 fork:only matches repositories with the word "case" that were pushed to on or after March 6th, 2013, and that are forks.

### Search by language

      language:LANGUAGE	    | rails language:javascript matches repositories with the word "rails" that are written in JavaScript.

### Search by topic

      topic:TOPIC	        | topic:jekyll matches repositories that have been classified with the topic "Jekyll."

### Search by number of topics

      topics:n	            | topics:5 matches repositories that have five topics.
      topics:>n	            | topics:>3 matches repositories that have more than three topics.

### Search by license

      license:LICENSE_KEYWORD	| license:apache-2.0 matches repositories that are licensed under Apache License 2.0.

### Search by repository visibility

      is:public	          | is:public org:github matches public repositories owned by GitHub.
      is:private	      | is:private pages matches private repositories that you can access and contain the word "pages."

### Search based on whether a repository is a mirror

      mirror:true	      | mirror:true GNOME matches repositories that are mirrors and contain the word "GNOME."
      mirror:false	      | mirror:false GNOME matches repositories that are not mirrors and contain the word "GNOME."

### Search based on whether a repository is a template

      template:true	      | template:true GNOME matches repositories that are templates and contain the word "GNOME".
      template:false      | template:false GNOME matches repositories that are not templates and contain the word "GNOME".

### Search based on whether a repository is archived

      archived:true	      | archived:true GNOME matches repositories that are archived and contain the word "GNOME."
      archived:false	  | archived:false GNOME matches repositories that are not archived and contain the word "GNOME."

### Search based on number of issues with good first issue or help wanted labels

      good-first-issues:>n  |	good-first-issues:>2 javascript matches repositories with more than two issues labeled good-first-issue and that contain the word "javascript."
      help-wanted-issues:>n |	help-wanted-issues:>4 react matches repositories with more than four issues labeled help-wanted and that contain the word "React."

### Search based on ability to sponsor

      is:sponsorable	      | is:sponsorable matches repositories whose owners have a GitHub Sponsors profile.
      has:funding-file	      | has:funding-file matches repositories that have a FUNDING.yml file.
