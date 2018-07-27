const html = require('choo/html');
const assets = require('../../../common/assets');

// eslint-disable-next-line no-unused-vars
module.exports = function(state) {
  return html`
    <div class="account">
      <img
      src="${assets.get('user.svg')}"
      alt="account"/>
    </div>`;
};
