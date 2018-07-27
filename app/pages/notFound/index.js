const html = require('choo/html');
const assets = require('../../../common/assets');
const title = require('../../templates/title');

module.exports = function(state) {
  return html`
    <div class="page">
      
      ${title(state)}

      <div class="error">${state.translate('expiredPageHeader')}</div>
      <img src="${assets.get(
        'illustration_expired.svg'
      )}" class="flexible" id="expired-img">
      <div class="description">
        ${state.translate('uploadPageExplainer')}
      </div>
      <a class="link link--action" href="/">
        ${state.translate('sendYourFilesLink')}
      </a>
    </div>`;
};
