const html = require('choo/html');
const file = require('../uploadedFile');

module.exports = function(files, state, emit) {
  const progressRatio = state.transfer ? state.transfer.progressRatio : 0;

  /*TODO: pass in each file's individual progress ratio*/
  return html`
	<ul class="uploadedFiles">
    ${files.map(f => file(f, state, emit, progressRatio))}
  </ul>
	`;
};
