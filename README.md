# Eventify
Create, read, update and delete API for events management.

Built with Node.JS, Express, GraphQL and Mongoose wrapper for MongoDB to persist data, can be scaled to PostgreSQL.


## Quick Start
- Clone the repository navigate to the root directory
  - Run `npm install --ignore-scripts` 
  - Then run `npm run dev`
- To automatically fetch location coordinates:
  - Add in your `googleAPIKey` to `/graphql/mutation.js`
  - Or use the one included in the email.
- Visit `http://localhost:4000/graphql`.
  - Copy the generated queries from `queries.graphql` located in the root directory to the GraphiQL UI query section.
  - Another file is called `queryVariables.graphql` contains Query Variables for the bottom left section of the GraphiQL UI.
  - `queries.graphql` and `queryVariables.graphql` were generated to save time constructing queries.
  - The queries are named and can be selected individually by clicking the run button.
    - Run the first query to obtain `organizationID`, then add it to the Query Variables section at the bottom left.
    - An `organizationID` is required to create a location.
    - A `locationID` is required to create an event.
    - After executing the first 3 queries, and obtaining `organzationID`, `locationID` and `eventID`, no further input is needed.
