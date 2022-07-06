import { Router, Request, Response } from 'express';
import fetch from 'node-fetch';

export const repos = Router();

repos.get('/', async (_: Request, res: Response) => {
  res.header('Cache-Control', 'no-store');
  // const data: Array<object> = [];

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
    res.json(allRepos);
    })

  // TODO: See README.md Task (A). Return repo data here. You’ve got this!
});
