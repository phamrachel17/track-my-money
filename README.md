# Dough Tracker!

## Install these libraries
### backend: 
#### > npm install express mongoose cors nodemon
#### > npm start

### frontend: 
#### > npm install axios chart.js moment react-chartjs-2 react-datepicker styled-components
#### > npm start

## Configuration
1. Create a `.env` file in the root directory of your project in server folder.
2. Add the following environment variables to the `.env` file:

- PORT=8000
- MONGO_URI=<your-mongo-uri>
- CLIENT_URL=http://localhost:3000
- JWT_SECRET=<your-jwt-secret>

Make sure to replace `<your-mongo-uri>` with your actual MongoDB URI and `<your-jwt-secret>` with your preferred JWT secret.
