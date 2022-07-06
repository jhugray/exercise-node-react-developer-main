import { Router, Request, Response } from 'express';
import fetch from 'node-fetch';
import { json } from 'stream/consumers';

export const repos = Router();

repos.get('/', async (_: Request, res: Response) => {
  res.header('Cache-Control', 'no-store');
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
      res.json(jsonResult)
    })
    
    

  // TODO: See README.md Task (A). Return repo data here. You’ve got this!
});
