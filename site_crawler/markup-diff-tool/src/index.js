
document.addEventListener('DOMContentLoaded', () => {

  function readFile(event) {
    const fileList = event.target.files;
    return loadAsText(fileList[0]);
  }

  function loadAsText(theFile) {
    const reader = new FileReader();

    reader.onload = function(loadedEvent) {
      // result contains loaded file.
      console.log("File loaded")
      showDiff(loadedEvent.target.result)
    }
    return reader.readAsText(theFile);
  }

  function showDiff(diffString) {
    const Diff2html = window.Diff2Html;
    const diffHtml = Diff2html.html(diffString, {
      drawFileList: true,
      matching: 'lines',
      outputFormat: 'side-by-side',
    });
    document.getElementById('diff').innerHTML = diffHtml;
  }

  // Bind the file field
  const fileField = document.getElementById('file-upload-field');
  fileField.onchange = (event) => {
    readFile(event)
  }
});
