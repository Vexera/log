declare module 'gelf-pro' {
  var config: Settings;

  interface Settings {
     broadcast: Array<(message: any) => void>;
  }
}
