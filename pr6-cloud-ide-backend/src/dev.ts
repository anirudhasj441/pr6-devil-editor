/**
 * @file dev.ts
 * 
 * Starts the Express application in development mode for local testing.
 * 
 * @summary Development server entry point.
 * @author Anirudha Jadhav <anirudhasj441@gmail.com>
 */

import app from ".";

// Launch the server on port 5000 and log a success message
app.listen(5000, () => {
    console.log("Server is running locally on port 5000...");
});