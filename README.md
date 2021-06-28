# Contact Book

> A simple contact manager app using MongoDB, Express, React and Node (MERN).

This was my second project learning React, as part of Brad Traversy's React Front To Back Course.

## Project Objectives

- Become more comfortable with the concept of components, properties and state
- Introduce the concept of Hooks and when to use them.
- Integrate a REST API using Node/Express/MongoDB with front-end.

## Back-End / API

## Front-End / React

1. Create react app in folder called client

```
npx create-react-app client
```

2. Create 3 new scripts in package.json file (root)

```
"client": "npm start --prefix client"

"clientinstall": "npm install --prefix client"

"dev": "concurrently \"npm run server\" \"npm run client\""
```

3. Create a proxy in client/package.json

```
"proxy": "http://localhost:5000"
```

Check if dev script in the root folder is working

```
npm run dev
```

4. Get rid of git repository in client folder

```
cd client
rm -rf .git
cd ..
```

5. Install dependencies in client folder

```
cd client
npm i axios react-router-dom uuid react-transition-group
cd ..
```

6. Components

## Lessons Learnt
