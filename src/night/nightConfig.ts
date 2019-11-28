import appData from "../util/global";

const nightConfig = (
  profile: string,
  visible: boolean = false,
  showImages: boolean = false,
  wait_timeout: number = 3500
) => {
  return {
    show: visible,
    images: showImages,
    webgl: false,
    waitTimeout: wait_timeout,
    width: 1400,
    webPreferences: {
      partition: `persist:${profile}`
    },
    paths: { userData: `${appData.sess}/` }
  };
};

export default nightConfig;
