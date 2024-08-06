const { google } = require('googleapis');

const moment = require('moment')
const CLIENT_ID = process.env.GOOGLE_CLIENT_ID
const CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET;
const REDIRECT_URI = process.env.GOOGLE_REDIRECT_URI;
const oAuth2Client = new google.auth.OAuth2(CLIENT_ID, CLIENT_SECRET, REDIRECT_URI);




const SCOPES = ['https://www.googleapis.com/auth/calendar.events.readonly'];

oAuth2Client.setCredentials({ access_token: process.env.GOOGLE_ACCESS_TOKEN });



exports.auth= (req, res) => {
    const authUrl = oAuth2Client.generateAuthUrl({
      access_type: 'offline',
      scope: SCOPES,
    });
    res.redirect(authUrl);
  };

exports.oauth2callback= async (req, res) => {
    const code = req.query.code;
    try {
      const { tokens } = await oAuth2Client.getToken(code);
      oAuth2Client.setCredentials(tokens);
  
      // Store the refresh token securely
      const refreshToken = tokens.refresh_token;
      console.log('Refresh Token:', refreshToken);
      // Save refresh token to a secure place like database or secure file
      //  we will use environment variable
      process.env.GOOGLE_REFRESH_TOKEN = refreshToken;
  
      res.send('Authentication successful! You can now close this window.');
    } catch (error) {
      console.error('Error retrieving access token', error);
      res.status(500).send('Authentication failed');
    }
  };



exports.getEvnets =async (req, res) => {
    try {
        const expirty_date= new Date(process.env.GOOGLE_ACCESS_TOKEN_EXPIRY)
        if (expirty_date < new Date()){
    const data = await oAuth2Client.refreshToken(process.env.GOOGLE_REFRESH_TOKEN);
    process.env.GOOGLE_ACCESS_TOKEN=data.tokens.access_token
    process.env.GOOGLE_ACCESS_TOKEN_EXPIRY= moment(data.tokens.expiry_date) ;

    oAuth2Client.setCredentials({ access_token: process.env.GOOGLE_ACCESS_TOKEN });
        }
        const calendar = google.calendar({ version: 'v3', auth: oAuth2Client });
        const events = await calendar.events.list({
          calendarId: 'primary',
          timeMin: (new Date()).toISOString(),
          maxResults: 30,
          singleEvents: true,
          orderBy: 'startTime',
        });
        const formattedEvents = events.data.items.map(event => {
          const start = new Date(event.start.dateTime || event.start.date);
          const end = new Date(event.end.dateTime || event.end.date);

          // const startTimeZone = event.start.timeZone || 'UTC';  // Default to UTC if timeZone is not present
          // const endTimeZone = event.end.timeZone || 'UTC';      // Default to UTC if timeZone is not present
      
    
          const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
          const day = start.toLocaleDateString('en-US', { weekday: 'long' });
          const month = start.toLocaleDateString('en-US', { month: 'long' });
          const timeOptions = { hour: '2-digit', minute: '2-digit' };
          const startTime = start.toLocaleTimeString('en-US',timeOptions);
          const endTime = end.toLocaleTimeString('en-US',timeOptions);
    
          return {
            summary: event.summary,
            day,
            month,
            date: start.toLocaleDateString('en-US', options),
            startTime,
            endTime,
            
          };
        });
    
        res.json({status: "success",data:formattedEvents});
      } catch (error) {
        res.status(500).send(error);
      }
    };
