const html = require('choo/html');
const raw = require('choo/html/raw');
const selectbox = require('../selectbox');

module.exports = function(state) {
  const el = html`<div> ${raw(
    state.translate('expireInfo', {
      downloadCount: '<select id=dlCount></select>',
      timespan: '<select id=timespan></select>'
    })
  )}
  </div>`;

  const dlCountSelect = el.querySelector('#dlCount');
  el.replaceChild(
    selectbox(
      state.downloadCount || 1,
      [1, 2, 3, 4, 5, 20],
      num => state.translate('downloadCount', { num }),
      value => {
        state.downloadCount = value;
      }
    ),
    dlCountSelect
  );

  const timeSelect = el.querySelector('#timespan');
  el.replaceChild(
    selectbox(1, [1, 2, 3, 4, 5], num => num, () => {}),
    timeSelect
  );

  return el;
};
