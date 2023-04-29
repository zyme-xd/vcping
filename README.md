# Vc Ping
A discord bot written in typescript designed to notify server members when a voice call is active.

## Setup
Make sure you have node.js installed, and create an `` .env`` file that includes your bots ``TOKEN``.
 ```bash
git clone <url>  # clone the repository :)
npm install      # install the packages
npx tsc          # compile the typescript
npm run start    # run the bot!
```
## TO DO:
- [x]  Create structure for "database" entry to reference when needed.
- [ ]  Implement ``setrole`` command 
- [ ]  Implement ``setdelay`` command 
- [x] When added to a server, create a vc role and set a default delay (would remove need for check during`` voiceChannelJoin ``event)
