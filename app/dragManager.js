/* global MAXFILESIZE */
const { bytes } = require('./utils');

export default function(state, emitter) {
  emitter.on('DOMContentLoaded', () => {
    document.body.addEventListener('dragover', event => {
      if (state.route === '/') {
        event.preventDefault();
        const files = document.querySelector('.uploadedFilesWrapper');
        files.classList.add('uploadArea--noEvents');
      }
    });
    document.body.addEventListener('drop', event => {
      if (state.route === '/' && !state.uploading) {
        event.preventDefault();
        document
          .querySelector('.uploadArea')
          .classList.remove('uploadArea--dragging');
        const target = event.dataTransfer;
        if (target.files.length === 0) {
          return;
        }
        if (target.files.length > 1) {
          // eslint-disable-next-line no-alert
          return alert(state.translate('uploadPageMultipleFilesAlert'));
        }
        const file = target.files[0];
        if (file.size === 0) {
          return;
        }
        if (file.size > MAXFILESIZE) {
          // eslint-disable-next-line no-alert
          alert(state.translate('fileTooBig', { size: bytes(MAXFILESIZE) }));
          return;
        }
        emitter.emit('addFile', { file });
      }
    });
  });
}
