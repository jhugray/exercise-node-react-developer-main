import { Router, Request, Response } from 'express';
import fetch from 'node-fetch';

export const repos = Router();

interface RepoObject {
  fork: boolean;
}

repos.get('/', async (_: Request, res: Response) => {
  res.header('Cache-Control', 'no-store');

  // TODO: See README.md Task (A). Return repo data here. You’ve got this!

  // obtain data as json from URL
  fetch('https://api.github.com/users/silverorange/repos')
    .then((apiResponse) => {
      const status = apiResponse.status;
      if (status !== 200) {
        res.status(status);
        console.log(`Error: ${status}`);
        return;
      }
      return apiResponse.json();
    }).then(jsonResult => {
   
    // obtain data as json from local file
    const repos = require('../../data/repos.json');

    // combine the data
    const allRepos = repos.concat(jsonResult);

    //return only where fork is true
    const noForkRepos = allRepos.filter((repo: RepoObject) => repo.fork === false);
    res.json(noForkRepos);
    })
    
    .catch(error => {
      console.log(error);
    });
});
