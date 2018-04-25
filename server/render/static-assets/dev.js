let manifest = { 'common.js': 'common.js', 'vendor.js': 'vendor.js', 'app.js': 'app.js' }

const createAppScript = () => {
  /*
  NOTE: Removed <script async ... > due to render issues (vendor bundles do not exist with HMR)
  https://github.com/reactGo/reactGo/pull/920
  DO NOT REINTRODUCE ASYNC TAGS FOR SCRIPTS. It will break your dev server randomly.
  */
  return `
    <script src="/assets/${manifest['common.js']}"></script>
    <script src="/assets/${manifest['vendor.js']}"></script>
    <script async src="/assets/${manifest['app.js']}"></script>
  `
}

const createTrackingScript = () => ''

const createStylesheets = () => `<link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Open+Sans" />`

export { createAppScript, createTrackingScript, createStylesheets }
