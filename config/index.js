export const API_URL = "https://apiv2.misiki.in";
export const tokenExpiry = 60 * 60 * 60 * 365; // Login validity (1 year)
export const locationExpiry = 60 * 60 * 60 * 365 * 5; // Location validity (5 years)
export const typingTimeout = 0; // After this delay the search api will be fired
export const loadingTimeout = 500; // Loading indicator will be shown after this delay
export const userRoles = ["user", "vendor", "manager", "admin"]; // This should be in ascending order of authority. e.g. In this case user will not have access to any other role, where as admin will have the role of user+vendor+manager+admin
export const currency = { symbol: "₹", code: "INR" };
export const TITLE = "Online Shopping for Fashion in India";
export const DESCRIPTION =
  "litekart.in offer Online Women Shopping in India. Huge Collection of Jewellery, Handbags, Clutches, Sunglasses, Clothing, Nightwear & More!";
export const KEYWORDS =
  "litekart.in,litekart Accessories,Affordable Luxury,India's Best Women's Online Shopping,Online Jewellery,litekart, online shopping, online jewelry, jewellery, handbags, clutches, sunglasses, ethnic jewellery, nightwear, lingrie, clothing, bracelets, rings, sets, necklace, pendants, earrings, online jewellery in lahore, online shopping in India, litekart online shopping, litekart jewelry";
export const HOST = "https://www.misiki.in";
export const sharingLogo = "https://www.frontendfun.com/logo.svg";
export const cities = [
  {
    name: "Sunabeda",
    coords: { latitude: "18.729889", longitude: "82.831749" }
  },
  {
    name: "Berhampur",
    coords: { latitude: "19.311403", longitude: "84.788816" }
  }
];
export const PAY_KEY = "rzp_test_o1gRrVKAzCT2Ke";
export const head = {
  titleTemplate: "%s - Litekart",
  htmlAttrs: { lang: "en" },
  meta: [
    { charset: "utf-8" },
    {
      name: "viewport",
      content: "width=device-width, initial-scale=1, user-scalable=no"
    },
    { "http-equiv": "x-ua-compatible", content: "ie=edge" }
  ],
  link: [
    { rel: "icon", type: "image/x-icon", href: "favicon.ico" },
    {
      rel: "stylesheet",
      href: "https://fonts.googleapis.com/css?family=Karla&display=swap"
    }
  ]
  // script: [
  //   {
  //     src: "//js.api.here.com/v3/3.1/mapsjs-core.js",
  //     type: "text/javascript",
  //     charset: "utf-8"
  //   },
  //   {
  //     src: "//js.api.here.com/v3/3.1/mapsjs-service.js",
  //     type: "text/javascript",
  //     charset: "utf-8"
  //   }
  // ]
};
export const sorts = [
  { name: "Relevance", val: null },
  { name: "Whats New", val: "-createdAt" },
  { name: "Price low to high", val: "price" },
  { name: "Price high to low", val: "-price" }
];
export const timesList = [
  "1 AM",
  "2 AM",
  "3 AM",
  "4 AM",
  "5 AM",
  "6 AM",
  "7 AM",
  "8 AM",
  "9 AM",
  "10 AM",
  "11 AM",
  "12 PM",
  "1 PM",
  "2 PM",
  "3 PM",
  "4 PM",
  "5 PM",
  "6 PM",
  "7 PM",
  "8 PM",
  "9 PM",
  "10 PM",
  "11 PM",
  "12 AM"
];