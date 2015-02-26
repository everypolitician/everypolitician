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

  function display_polling_message(msg) { 
    return $('#polling_status').html(msg)
  }

  function display_polling_error(msg) { 
    display_polling_message(msg).css({
        'color': 'red',
        'font-weight': 'bold',
      });
  }

  function poll_for_completion(url) { 
    console.log("Looking up " + url);
    $.ajax({
      type: 'GET',
      url: url,
      // xhrFields: { withCredentials: true }
    })
    .done(function(response) {
      console.log("POLLED: ", response);
      var import_status = response.result['status'];
      if (import_status == 'complete') { 
        var counts = response.result['counts'];
        var site_url = url.replace(/\/api\/v.*/,'/');
        var message = "Wahey! Uploaded " + counts['persons'] + " people" +  "<br>" + 
           "Now visit your instance at: <a href='" + site_url + "'>" + site_url + "</a>"
        display_polling_message(message)
        //
      } else if (import_status == 'pending') { 
        display_polling_message("Still pending...");
        // TODO: exponential backoff?
        setTimeout(function() { poll_for_completion(url) }, 2000);
      } else {
        // what to do here?
        display_polling_error("Ouch! Unknown status: " + import_status);
      }
    })
    .fail(function(jsxhr, textStatus, error) { 
      console.log("ERROR POLLING", jsxhr)
      display_polling_error("Ouch! Polling failed!");
    });
  }

  function sendToPopit(json, instance) { 
    console.log("Submitting to " + instance);
    popitImport(instance, json)
    .done(function(response) {
      console.log("Success: ", response.result['url']);
      display_polling_message("Status check at: " + response.result['url']);
      poll_for_completion(response.result['url']);
    })
    .fail(function(xhr, textStatus, errorThrown) {
      // TODO trap different types of error
      // 404 = no such instance
      // 401 = not yours (or not logged in)
      display_polling_error("Error!")
      console.error("Couldn't start import:", xhr.status);
    });
  };

  function polling_box(instance) {
    return $('<p />', { 
      text: "Uploading to " + instance + "...",
    })
    .append( $('<p />', { 
      id: 'polling_status', 
      // This will be replaced by sendToPopit
      text: 'in progress', 
    }).css('font-style', 'italic' ));
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
      var instance = $("#input_instance").val();
      if (instance == '') {
          // TODO do something better here to alert to the problem
        $("#input_instance").css('border-color', 'red');
      } else { 
        sendToPopit(json, instance);
        $(".preview-area").html(polling_box(instance));
      }
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
