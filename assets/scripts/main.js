(function($) {

  var SERVER_NAME = $('meta[name="popit-server"]').attr('content');

  function import_endpoint(instance_name) { 
    var protocol = 'http';
    if (SERVER_NAME === 'popit.mysociety.org') {
      protocol = 'https';
    }
    return protocol + '://' + instance_name + '.' + SERVER_NAME + '/api/v0.1/imports'
  }

  function popitImport(instanceSlug, popoloJson) {
    return $.ajax({
      type: 'POST',
      url: import_endpoint(instanceSlug),
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
    $.ajax({
      type: 'GET',
      url: url,
      // xhrFields: { withCredentials: true }
    })
    .done(function(response) {
      var import_status = response.result['status'];
      if (import_status == 'complete') {
        var counts = response.result['counts'];
        var site_url = url.replace(/\/api\/v.*/,'/');
        var count_txt = (counts['persons'] == 1) ? "one person" : (counts['persons'] + " people");
        var message = "<h1>Uploaded!</h1><p>We successfully imported " + count_txt + ".</p>" + 
           "<p>Now visit your PopIt at: <a href='" + site_url + "'>" + site_url + "</a></p>";
        $(".preview-area").html(message);
      } else if (import_status == 'pending') {
        display_polling_message("Still pending. Waiting another " + (delay/1000) + " seconds before checking again.");
        setTimeout(function() { poll_for_completion(url, delay + 1000) }, delay);
      } else {
        var message = "<h1>Sorry</h1><p>The import failed in a way that we thought was impossible. Please let us know how you got here!"
        $(".preview-area").html(message);
      }
    })
    .fail(function(jsxhr, textStatus, error) {
      // Uncomment the withCredential in poll_for_completion to get here
      console.log("ERROR POLLING", jsxhr)
      var message = "<h1>Sorry</h1><p>The import failed in a way that we don't understand. Please let us know how you got here!"
      $(".preview-area").html(message);
    });
  }

  function instance_url(name) { 
    return 'http://' + name + '.' + SERVER_NAME
  }

  function sendToPopit(json, instance) {
    popitImport(instance, json)
    .done(function(response) {
      poll_for_completion(response.result['url'], 2000);
    })
    .fail(function(xhr, textStatus, errorThrown) {
      // TODO trap different types of error
      // 404 = no such instance
      // 401 = not yours (or not logged in)
      var message = "<p class='warning'><b>Sorry!</b> " +
       "We can't upload to <a href='" + instance_url(instance) + "'>" + instance + "." + SERVER_NAME + "</a>. Please make sure that it definitely exists, and that you're currently logged in to it as an administrator. Then try again.</p>";
      displayJSON(json)
      $("#popit-submit-form").append($(message).css({ 'background-color': 'yellow' }));
      // console.log(xhr.getAllResponseHeaders());
      // console.log("text: " + textStatus);
      // console.log("ET: " + errorThrown);
    });
  };

  function polling_box(instance) {
    return $("<h1>Uploading</h1>\
        <p>We’re uploading your data to " + instance_url(instance) + " ...</p>\
        <p>Status: <span id='polling_status'>Waiting</span></p>\
    ");
  }

  function whatsWrongWith(json) {
    if (!json.hasOwnProperty('error')) { return "We couldn‘t find any records in your CSV file. " }
    if (json.error['type'] == 'CSV::MalformedCSVError') { return "Your CSV file seems to be malformed." }
    if (json.error['type'] == 'EOFError') { return "Your CSV file seems to be empty." }
    return "We have an unexpected error: " + JSON.stringify(json.error);
  }

  function warnOfNoPersons(json) { 
    $(".preview-area").html('<h1>Sorry!</h1><p>' + whatsWrongWith(json) + '</p><p>Please try again with another file.</p>');
  }

  // Allow entry of https://welshassembly.popit.mysociety.org/ etc 
  function popit_name_from(text) { 
    return text.replace(/^https?:\/\//, '').split('.').shift();
  }

  function displayJSON(json) {
    var json_preview = $('<div/>', {
      'html': "<pre>" + JSON.stringify(json, null, 2) + "</pre>"
    }).css({
      'color': 'black',
      'font-size': 'small',
      'text-align': 'left'
    });

    var upload_form = $('<form id="popit-submit-form" />').append(
      $("<h1>Here's your data</h1>\
        <p>In the box below you’ll find the Popolo format JSON we generated from your CSV.</p>\
        <p>If something went wrong, just <a href='/upload'>reload this page</a> and try again.\
        <h2 class='tertiary-heading'>Add to PopIt</h2>\
        <p>We can also insert this data into a PopIt for you, if you’d like.</p>\
        <p>If you already have an empty PopIt instance, <b>make sure you’re <a href='http://" + SERVER_NAME + "/instances'>logged in to it</a></b>,\
        then enter its name below. If you don’t have one yet, you can <a href='http://" + SERVER_NAME + "/instances/new'>create one</a>.\
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
      var instance = popit_name_from( $("#input_instance").val() );
      if (instance == '') {
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
      this.on('sending', function(file, xhr, formData) { 
        $(".dz-progress").text("Converting to JSON — please wait…");
      });
      this.on('success', function(file, json) {
        $( "#js-welcome-message" ).remove();
        if (json.persons && json.persons.length) { 
          displayJSON(json);
        } else { 
          warnOfNoPersons(json);
        }
      });
    }
  };

  
})(window.jQuery);
