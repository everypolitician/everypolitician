(function($) {
  function popitImport(instanceSlug, popoloJson) {
    var popitInstanceUrlTemplate = $('meta[name="popit-instance-url-template"]').attr('content');
    var url = popitInstanceUrlTemplate.replace('{instance}', instanceSlug);
    return $.ajax({
      type: 'POST',
      url: url,
      data: JSON.stringify(popoloJson),
      processData: false,
      dataType: 'json',
      contentType: 'application/json',
      // Make sure the Cookie header gets sent
      xhrFields: {
        withCredentials: true
      }
    });
  }

  Dropzone.options.myAwesomeDropzone = {
    dictDefaultMessage: "Drag and drop your file here, or click to upload",
    uploadMultiple: false,
    createImageThumbnails: false,
    acceptedFiles: 'text/csv',
    previewsContainer: '.preview-area',
    paramName: 'csv',
    init: function() {
      this.on('success', function(file, json) {
        // Post json over to popit importer
        console.log("Sending...");
        popitImport('welshassembly', json)
        .done(function(response) {
          console.log("Success: ", response.result['url']);
        })
        .fail(function(xhr, status, errorThrown) {
          console.error("Couldn't start import:", errorThrown);
        });
      });
    }
  };
})(window.jQuery);
