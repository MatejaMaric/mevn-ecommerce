# About this project:

Imaginary e-commerce site made with MongoDB, Express.js, Vue.js and Node.js.

Implementation informations:

- Uses PayPal as payment processors.
- Sets up and captures transactions on server.
- Keeps transaction informations in database together with shipping details, ordered items and buyer.
- Protected API endpoints for inspecting orders, both per user and globally for administrator.
- Protected API endpoints for adding, updating and deleting products.
- Full login and registration system.
- Full cart system.
- User can see their previous orders on front end.

## How to run this project:

- Copy `client/.env` to `client/.env.local`.
- Copy `server/.env.example` to `server/.env`.
- Client's environment variable `VUE_APP_ROOT_API` should match server's `SITE_URL`.
- On server environment variables `SITE_URL` and `PORT` should be compatible.
- Navigate to `client` and run `npm run serve`.
- Navigate to `server` and run `npm run start`.
