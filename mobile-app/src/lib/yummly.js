import Config from 'react-native-config';

import DeviceInfo from 'react-native-device-info';

let hostUrl = Config.RAPIDAPI_HOST_URL;
let serverUrl = Config.RAPIDAPI_HTTP_SCHEME + hostUrl;
let apiKey = Config.RAPIDAPI_APIKEY;
let projectId = Config.RAPIDAPI_PROJECTID;

if (serverUrl.endsWith('/')) {
  serverUrl = serverUrl.slice(0, -1)
}

const uniqueid = DeviceInfo.getUniqueId();

export const userID = () => {
  return uniqueid;
}

export const search = (query) => {
  const kcal = query.kcal ? `FAT_KCALMax=${query.kcal}` : '7000'
  const q = query.q ? `q=${query.q}` : ''
  return fetch(`${serverUrl}/feeds/search?${kcal}&maxTotalTimeInSeconds=7200&allowedAttribute=diet-lacto-vegetarian%252Cdiet-low-fodmap&${q}&start=0&maxResult=18`, {
    "method": "GET",
    "headers": {
      "x-rapidapi-host": `${hostUrl}`,
      "x-rapidapi-key": `${apiKey}`,
      "RapidAPI-Project": `${projectId}`,
    }
  }).then((response) => {
    console.log(response);
    if (!response.ok) {
      throw new Error(response.statusText || response.message || response.status);
    } else {
      return response.json();
    }
  });
};

export const categories = (query) => {
  
  return fetch(`${serverUrl}/categories/list`, {
    "method": "GET",
    "headers": {
      "x-rapidapi-host": `${hostUrl}`,
      "x-rapidapi-key": `${apiKey}`,
      "RapidAPI-Project": `${projectId}`,
    }
  }).then((response) => {
    console.log(response);
    if (!response.ok) {
      throw new Error(response.statusText || response.message || response.status);
    } else {
      return response.json();
    }
  });
};
