fetch("https://www.instagram.com/api/v1/web/accounts/login/ajax/", {
  "headers": {
    "accept": "*/*",
    "accept-language": "ru",
    "content-type": "application/x-www-form-urlencoded",
    "dpr": "1.25",
    "sec-ch-prefers-color-scheme": "light",
    "sec-ch-ua": "\"Microsoft Edge\";v=\"123\", \"Not:A-Brand\";v=\"8\", \"Chromium\";v=\"123\"",
    "sec-ch-ua-full-version-list": "\"Microsoft Edge\";v=\"123.0.2420.65\", \"Not:A-Brand\";v=\"8.0.0.0\", \"Chromium\";v=\"123.0.6312.87\"",
    "sec-ch-ua-mobile": "?0",
    "sec-ch-ua-model": "\"\"",
    "sec-ch-ua-platform": "\"Windows\"",
    "sec-ch-ua-platform-version": "\"15.0.0\"",
    "sec-fetch-dest": "empty",
    "sec-fetch-mode": "cors",
    "sec-fetch-site": "same-origin",
    "viewport-width": "938",
    "x-asbd-id": "129477",
    "x-csrftoken": "ecJ9OvTWtMCUs8X_Tz3GZf",
    "x-ig-app-id": "936619743392459",
    "x-ig-www-claim": "0",
    "x-instagram-ajax": "1012608719",
    "x-mid": "ZhPPjgALAAG-11KYImWRPRxW04d0",
    "x-requested-with": "XMLHttpRequest",
    "x-web-device-id": "7B059F26-5292-4BEC-B905-3D93ADDE4C05",
    "cookie": "csrftoken=ecJ9OvTWtMCUs8X_Tz3GZf; mid=ZhPPjgALAAG-11KYImWRPRxW04d0; ig_did=7B059F26-5292-4BEC-B905-3D93ADDE4C05",
    "Referer": "https://www.instagram.com/",
    "Referrer-Policy": "strict-origin-when-cross-origin"
  },
  "body": "enc_password=%23PWD_INSTAGRAM_BROWSER%3A10%3A1712574509%3AAVhQAGcrICPOP2J0nTs4KvVFddI8BoMWW7pwnsDsioaNXdFzez0cH3wV2gAzCvbTF1ARc182HaIx%2BeVM5BIGlKTWO67gxuV11MILEY1ygfz9rzXSmDH%2BSjXiMf3hUPnD8rTFYZflPDheeYkgXFqnWnLTk576MA%3D%3D&optIntoOneTap=false&queryParams=%7B%7D&trustedDeviceRecords=%7B%7D&username=mikhail2665375",
  "method": "POST"
}).then(response => response.json()).then(data => console.log(data)).catch(error => console.error(error));