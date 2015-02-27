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
    display_polling_message(msg);
  }

  function poll_for_completion(url, delay) {
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
        display_polling_message("Still pending... wait " + delay);
        setTimeout(function() { poll_for_completion(url, delay + 1000) }, delay);
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
      poll_for_completion(response.result['url'], 1000);
    })
    .fail(function(xhr, textStatus, errorThrown) {
      // TODO trap different types of error
      // 404 = no such instance
      // 401 = not yours (or not logged in)
      display_polling_error("Error! Couldn't start import:", xhr.status)
      console.error("Couldn't start import:", xhr.status);
    });
  };

  function polling_box(instance) {
    return $('<p />', {
      text: "Uploading to " + instance + ".popit.mysociety.org ...",
    })
    .append( $('<p />', {
      id: 'polling_status',
      // This will be replaced by sendToPopit
      text: 'in progress',
    }));
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
      $("<h1>Here's your data</h1>\
        <p>In the box below you’ll find the Popolo format JSON we generated from your CSV.</p>\
        <p>If something went wrong, just <a href='/upload'>reload this page</a> and try again.\
        <h2 class='tertiary-heading'>Add to PopIt</h2>\
        <p>We can also insert this data into a PopIt for you, if you’d like.</p>\
        <p>If you already have an empty PopIt instance, <b>make sure you’re <a href='http://popit.staging.mysociety.org/instances'>logged in to it</a>\
        then enter its name below. If you don’t have one yet, you can <a href='http://popit.mysociety.org/instances/new'>create one</a>.\
      ")
    ).append(
      $('<input />', {
        id: 'input_instance',
        type: 'text',
        placeholder: 'PopIt name',
        name: 'instance',
        class: 'popit-name-form-field',
        required: true
      })
    ).append(
      $('<button />', {
        'type': 'submit',
        'text': "Upload to PopIt",
        'class': 'button button--secondary popit-upload-button'
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
    dictDefaultMessage: "Drag and drop your .CSV file here, or click to browse",
    uploadMultiple: false,
    createImageThumbnails: false,
    acceptedFiles: 'text/csv',
    previewsContainer: '.preview-area',
    paramName: 'csv',
    addRemoveLinks: false,
    init: function() {
      this.on('success', function(file, json) {
        displayJSON(json);
        $( "#js-welcome-message" ).remove();
      });
    }
  };
})(window.jQuery);
