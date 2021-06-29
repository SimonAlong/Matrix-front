// create history
const history = require('history/createHashHistory').default({
  basename: '/pivot/config/',
});
window.g_history = history;
export default history;
