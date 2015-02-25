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

  function sendToPopit(json) { 
    console.log("Sending...");
    popitImport('welshassembly', json)
    .done(function(response) {
      console.log("Success: ", response.result['url']);
    })
    .fail(function(xhr, textStatus, errorThrown) {
      console.error("Couldn't start import:", xhr.status);
    });
  };

  function displayJSON(json) { 
    var json_preview = $('<div/>', { 
      'html': "<pre>" + JSON.stringify(json, null, 2) + "</pre>"
    }).css({ 
      'color': 'black', 
      'font-size': 'small',
      'text-align': 'left'
    });
    var button = $('<button />', { 
      'text': "Upload to PopIt"
    }).click(function() { sendToPopit(json) });
    $("#my-awesome-dropzone").hide();
    $(".preview-area").text('').append(button).append(json_preview);
  };


  Dropzone.options.myAwesomeDropzone = {
    dictDefaultMessage: "Drag and drop your file here, or click to upload",
    uploadMultiple: false,
    createImageThumbnails: false,
    acceptedFiles: 'text/csv',
    previewsContainer: '.preview-area',
    paramName: 'csv',
    init: function() {
      this.on('success', function(file, json) {
        displayJSON(json);
      });
    }
  };
})(window.jQuery);
