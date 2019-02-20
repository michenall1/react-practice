// import Raven from "raven-js";

function init() {
  // Raven.config("https://a691659fcae64e26a58004b98c16ef7a@sentry.io/1396213", {
  //   release: "1.0.0",
  //   environment: "development-test"
  // }).install();
}

function log(error) {
  // Raven.captureException(error);
  console.error(error);
}

export default {
  init,
  log
};
