const html = require('choo/html');
const assets = require('../../../common/assets');
const bytes = require('../../utils').bytes;
const fileIcon = require('../fileIcon');

module.exports = function(file, state, emit, progressRatio = 0) {
  const transfer = state.transfer;
  const transferState = transfer ? transfer.state : null;
  const transferring = state.uploading || state.downloading;

  const share = state.route.includes('share/');

  const percent = share ? 100 : Math.floor(progressRatio * 100);

  const cancelVisible =
    transferring || state.route === '/' ? 'uploadedFile__cancel--visible' : '';

  const stampClass =
    share || transferState === 'complete' ? 'uploadedFile__stamp--visible' : '';

  function cancel(event) {
    event.preventDefault();
    const btn = document.querySelector('.uploadedFile__cancel');
    btn.disabled = true;
    if (transferring) {
      emit('cancel');
    } else if (state.route === '/') {
      emit('removeUpload', { file });
    }
  }

  return html`
    <li class="uploadedFile" id="${file.id}" 
    style="
      background: linear-gradient(to right, 
      #e8f2fe 0%, 
      #e8f2fe ${percent}%,
      #fff ${percent}%,
      #fff 100%);"
    >

      ${fileIcon(file.name, file._hasPassword)}

      <div class="uploadedFile__cancel ${cancelVisible}"
      onclick=${cancel}>
        <img
        src="${assets.get('close-16.svg')}"
        alt="cancel"/>
      </div>

      <div class="uploadedFile__fileData">
        <p class="uploadedFile__fileName">${file.name}</p>
        <p class="uploadedFile__fileInfo">
          <span>${bytes(file.size)}</span>
        </p>
      </div>

      <img src="${assets.get('stamp.svg')}"
           class="uploadedFile__stamp ${stampClass}"/> 
    </li>
  `;
};
