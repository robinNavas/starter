import { favicons } from "favicons"
import path from "path"
import fs from "fs"

const faviconsPath = "resources/images/favicons";
const faviconsHtmlPath = "resources/views/favicons.blade.php";

const source = "./resources/images/favicon-input.png";

const configuration = {
  path: "/images/favicons", // Path for overriding default icons path. `string`
  appName: null, // Your application's name. `string`
  appShortName: null, // Your application's short_name. `string`. Optional. If not set, appName will be used
  appDescription: null, // Your application's description. `string`
  developerName: 'Robin Navas',
  developerURL: 'robinnavas.com',
  dir: "auto",
  lang: "en-US",
  background: "#fff",
  theme_color: "#fff",
  appleStatusBarStyle: "black-translucent",
  display: "standalone",
  orientation: "any",
  scope: "/",
  start_url: "/",
  preferRelatedApplications: false,
  relatedApplications: undefined,
  version: "1.0",
  pixel_art: false,
  loadManifestWithCredentials: false,
  manifestMaskable: false,
  icons: {
    // Platform Options:
    // - offset - offset in percentage
    // - background:
    //   * false - use default
    //   * true - force use default, e.g. set background for Android icons
    //   * color - set background for the specified icons
    //
    android: true, // Create Android homescreen icon. `boolean` or `{ offset, background }` or an array of sources
    appleIcon: true, // Create Apple touch icons. `boolean` or `{ offset, background }` or an array of sources
    appleStartup: true, // Create Apple startup images. `boolean` or `{ offset, background }` or an array of sources
    favicons: true, // Create regular favicons. `boolean` or `{ offset, background }` or an array of sources
    windows: true, // Create Windows 8 tile icons. `boolean` or `{ offset, background }` or an array of sources
    yandex: true, // Create Yandex browser icon. `boolean` or `{ offset, background }` or an array of sources
  },
  shortcuts: [
    // Your applications's Shortcuts (see: https://developer.mozilla.org/docs/Web/Manifest/shortcuts)
    // Array of shortcut objects:
    // {
    //   name: "View your Inbox", // The name of the shortcut. `string`
    //   short_name: "inbox", // optionally, falls back to name. `string`
    //   description: "View your inbox messages", // optionally, not used in any implemention yet. `string`
    //   url: "/inbox", // The URL this shortcut should lead to. `string`
    //   icon: "test/inbox_shortcut.png", // source image(s) for that shortcut. `string`, `buffer` or array of `string`
    // },
    // more shortcuts objects
  ],
};

try {
  const response = await favicons(source, configuration);

  if (!fs.existsSync(faviconsPath)) {
    fs.mkdir(faviconsPath, {recursive: true}, err => {});
  }

  response.images.forEach((element) => {
    fs.writeFileSync(`${faviconsPath}/${element.name}`, element.contents);
  });

  response.files.forEach((element) => {
    fs.writeFileSync(`${faviconsPath}/${element.name}`, element.contents);
  });

  fs.writeFileSync(faviconsHtmlPath, response.html.join("\n"));
} catch (error) {
  console.log(error.message);
}
