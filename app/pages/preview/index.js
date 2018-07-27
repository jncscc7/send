const html = require('choo/html');
const titleSection = require('../../templates/title');
const downloadButton = require('../../templates/downloadButton');
const downloadedFiles = require('../../templates/uploadedFileList');

module.exports = function(state, emit) {
  const fileInfo = state.fileInfo;

  return html`
    <div class="page">
      ${titleSection(state)}

      ${downloadedFiles([fileInfo], state, emit)}
      <div class="description">${state.translate('downloadMessage2')}</div>
      ${downloadButton(state, emit)}

      <a class="link link--action" href="/">
        ${state.translate('sendYourFilesLink')}
      </a>

    </div>
  `;
};
