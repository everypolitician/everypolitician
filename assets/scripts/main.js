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

  function sendToPopit(json, instance) { 
    console.log("Submitting to " + instance);
    popitImport(instance, json)
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

    var upload_form = $('<form />').append(
      $('<input />', {
        id: 'input_instance',
        type: 'text',
        placeholder: 'name',
        name: 'instance',
      })
    ).append(
      $('<button />', { 
        'type': 'submit',
        'text': "Upload to PopIt"
      })
    ).submit(function(e) { 
      // TODO: validate 
      sendToPopit(json, $("#input_instance").val());
      e.preventDefault();
    });
    $("#my-awesome-dropzone").hide();
    $(".preview-area").text('').append(upload_form).append(json_preview);
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
