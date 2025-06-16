# URL to MP3 Converter

A personal app that convert YouTube video URLs into MP3 audio files. The app downloads the MP3 on the server, serves the file for client download, and stores song metadata in database.

## Software Stack

- Frontend: React + Sass
- Backend: Node.js + Express
- Data: MongoDB

## Media Processing Tools

- youtube-dl-exec: Node.js wrapper to call yt-dlp
- yt-dlp: Fetch and download video/audio from youtube
- ffmpeg: Convert and process audio to MP3

## Features

- Convert Youtube URLs to MP3 format
- Store song metadata (title, videoID, duration, downloaded date)
- Deletes MP3 file after user download
- Deletes un-downloaded converted files every 30 minutes

## To run

### Server
- Clone repository

    ```https://github.com/iKeiNagai/UrlToMp3.git```

- Install Dependencies

    ```npm install```

- Install yt-dlp and ffmpeg
    - Make sure both tools are in your system’s PATH environment variable

    - ffmpeg

        ```https://github.com/BtbN/FFmpeg-Builds/releases```

    - yt-dlp

        ```https://github.com/yt-dlp/yt-dlp/releases```

- Set .env file

- Start Server

    ```npm start```

### Client

- Navigate into folder

    ```cd .\client\```

- Install Dependencies

    ```npm install```

- Set .env file

- Start Client

    ```npm start```


## Routes

- /convert
    - Fetches video metadata
    - Converts audio to MP3 and saves it temporarily

- /save-song
    - Saves song videoId, title, duration
    - Returns path where MP3 file can be downloaded
    - Delete MP3 file on duplicate submissions

- /download
    - Streams MP3 file to client for download
    - Deletes MP3 file after successful transfer

- /all-songs
    - Fetches matching songs from MongoDB with filtering, sorting, and pagination
    - Returns paginated results 