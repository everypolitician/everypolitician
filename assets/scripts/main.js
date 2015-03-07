---
---
(function($) {

  function instance_url(instance_name) { 
    return '{{ site.popit_server_protocol }}://' + instance_name + '.{{ site.popit_server }}';
  }

  function import_endpoint(instance_name) { 
    return instance_url(instance_name) + '/api/v0.1/imports';
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
        $("#polling-area").hide();
        $("#success_person_count").text(count_txt);
        $("#success_popit_address").html("<a href='" + site_url + "'>" + site_url + "</a>");
        $("#success-area").show();
      } else if (import_status == 'pending') {
        $('#polling_status').text("Still pending. Waiting another " + (delay/1000) + " seconds before checking again.");
        setTimeout(function() { poll_for_completion(url, delay + 1000) }, delay);
      } else {
        var message = "<h1>Sorry</h1><p>The import failed in a way that we thought was impossible. Please let us know how you got here!"
        $("#polling-area").html(message);
      }
    })
    .fail(function(jsxhr, textStatus, error) {
      // Uncomment the withCredential in poll_for_completion to get here
      console.log("ERROR POLLING", jsxhr)
      var message = "<h1>Sorry</h1><p>The import failed in a way that we don't understand. Please let us know how you got here!"
      $(".preview-area").html(message);
    });
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
      // TODO move this out into the HTML too.
      var message = "<p class='warning'><b>Sorry!</b> " +
       "We can't upload to <a href='" + instance_url(instance) + "'>" + instance_url(instance) + "</a>. Please make sure that it definitely exists, and that you're currently logged in to it as an administrator. Then try again.</p>";
      displayJSON(json)
      $("#popit-submit-errors").html($(message).css({ 'background-color': 'yellow' }));
    });
  };

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

  function buildUserInstanceList() {
    var instancesUrl = '{{ site.popit_server_protocol }}://{{ site.popit_server }}/instances.json';
    
    $.getJSON(instancesUrl + '?callback=?', function(data) {
      var instances = $.map(data.result, function(instance, i) { 
        return instance['name'] || instance['slug']
      });
      if (instances.length) { 
        console.log("Instances: " + instances);
      } else { 
        console.log("No instances");
      }
    })
    .fail(function(jqxhr, textstatus, error) { 
      if (jqxhr['status'] == 404) { 
        console.log("Not logged in");
      } else { 
        console.log("Error: " + textstatus);
        console.log(jqxhr);
      }
    });
  }

  function displayJSON(json) {
    $("#popit-submit-form").submit(function(e) {
      var instance = popit_name_from( $("#input_instance").val() );
      sendToPopit(json, instance);
      $(".polling_area_instance_name").text(instance);
      $("#popit-submit-area").hide();
      $("#polling-area").show();
      e.preventDefault();
    });
    $("#polling-area").hide();
    $("#json-preview-area pre").html(JSON.stringify(json, null, 2));
    $("#popit-submit-area").show();
    $("#add-your-data-area").hide();
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

  buildUserInstanceList();
  
})(window.jQuery);
