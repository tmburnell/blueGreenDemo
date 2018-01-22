# Blue Green Demo

Is an Angular5/nodeJS demo of how blue/green deployments can work feature released on Openshift.  It is a very simple app where blue is release 1, and green is release 2.  Also the left half of the screen will always be the current release, where the right half will only display the latest approved feature release. 

## Application layout:

### Angular app. 

A standard Angular application and all the logic is just coded in the app. 
The colors are applied via a dynamic class being added to the div's.  

The below line states what release is currently deployed, for demo purposes we will flip this between v1 and v2.  
Line 20: `public current_version:string = "v2";`

**After coding changes are made the below line needs to be run**
ng build

Build will compile the code and put it in the dist folder that NodeJS will use to host the static code. Therefore we will need to redeploy for Openshift to take the changes. 

### API calls

Below are the supported API by this application

<details>
  <summary>api/v1/color</summary>
  This call returns an object where color is blue
</details>

<details>
  <summary>api/v2/color</summary>
  This call returns an object where color is green
</details>

<details>
  <summary>api/v1/features</summary>
  This will return back an object that will list v1 and v2 as approved releases.  `{ "v1": true, "v2": false }`
  The current code v1 is always true, v2 is dynamic based on an environment variable that is injected to the NodeJS server.
</details>

### NodeJS

This is a simple express server that will handle API's and host the static code. 
The `server.js` file contains all the code for the node server.   
