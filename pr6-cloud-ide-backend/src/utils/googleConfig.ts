import {google} from 'googleapis';
import { OAuth2Client } from 'google-auth-library';
import dotenv from 'dotenv';

dotenv.config();

const GOOGLE_AUTH_CLIENT_ID = process.env.GOOGLE_AUTH_CLIENT_ID;
const GOOGLE_AUTH_CLIENT_SECRET = process.env.GOOGLE_AUTH_CLIENT_SECRET;

console.log("Client id: ", GOOGLE_AUTH_CLIENT_ID);
console.log("Client secret: ", GOOGLE_AUTH_CLIENT_SECRET);

const oauth2Client: OAuth2Client = new google.auth.OAuth2(
    GOOGLE_AUTH_CLIENT_ID,
    GOOGLE_AUTH_CLIENT_SECRET,
    'postmessage'
)

export default oauth2Client;