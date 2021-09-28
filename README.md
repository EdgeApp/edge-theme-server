# edge-theme-server

## A microserver for distributing theme files to app-gui allowing to quickly change themes during development

### Getting Started

- Add `themeServer.js` file to desired GUI repo locally, considering where the file is added relative to the images folder

- Add

    ```json
    "start:themeServer": "node ./themeServer.js"
    ```

    to `package.json` file with respect to where you placed the file in the repo

### Environment

- Three environment variables to consider: THEME_PATH, IMAGE_PATH, and INCLUDED_FORMATS

- THEME_PATH: path to the folder containing theme files relative to location of themeServer.js file

- IMAGE_PATH: path to the top level folder containing image files relative to themeServer.js file

- INCLUDED_FORMATS: allowed image extensions to get paths for, defaults are '.gif', '.png', '.jpeg', and '.svg'.

- When server is first run, an env.json file is created with the hard coded values from the themeServer.js file or the values are added to an existing env.json file

- If you so choose you can edit the hard-coded environment variables when adding the server to your repo, by editing the themeServer.js code itself

- Alternatively, once the server is running you can edit the ENV variables for THEME_PATH and IMAGE_PATH

### Endpoints

/getThemeNames

- no params or query
- returns list of theme json files in designated theme directory

/getTheme/?fileName=

- use fileName as the query to get specified theme json file

/getImagePaths

- no params or query
- returns json containing paths to all images in designated image directory
