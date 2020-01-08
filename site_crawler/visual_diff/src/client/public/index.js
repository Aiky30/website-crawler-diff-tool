$(function() {

  $.get("/diff", function(data) {

    $('#sourcePath').html(data.sourcePath);
    $('#targetPath').html(data.targetPath);

    $('#sameFilesWithContentDiffCount').html(data.sameFilesWithContentDiff.length);
    $('#missingFilesCount').html(data.missingFiles.length);
    $('#newFilesCount').html(data.newFiles.length);
    $('#sameFilesCount').html(data.sameFiles.length);

    listFiles('sameFilesWithContentDiff', data.sameFilesWithContentDiff);
    listFiles('missingFiles', data.missingFiles);
    listFiles('newFiles', data.newFiles);
    listFiles('sameFiles', data.sameFiles);

    $('.toggle-link').click(function() { 
      var $this = $(this);

      var divId = $this.attr('data-divId');
      $('#' + divId).toggle('hide');

      var text = $this.text();
      $this.text(text == "Expand" ? "Collapse" : "Expand");
    });

    $('.toggle-link-all').click(function() {
      if ($(this).text() == 'Collapse All') {
        $('#sameFilesWithContentDiff').hide();
        $('#missingFiles').hide();
        $('#newFiles').hide();
        $('#sameFiles').hide();

        $('.toggle-link').text('Expand');
      } else {
        $('#sameFilesWithContentDiff').show();
        $('#missingFiles').show();
        $('#newFiles').show();
        $('#sameFiles').show();

        $('.toggle-link').text('Collapse');
      }
    });

  });
});

function listFiles(divId, files) {
  $.each(files, function(index, file) {
    $('#' + divId).append('<div class="row"><div class="col-6 border-bottom">' + file + '</div></div>');
  });
}