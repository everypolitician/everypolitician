---
layout: default
title: Upload
permalink: /upload/
---
<div class="container"> <div class="page-header">
        <h1>Add your data</h1>
    </div>
    <div class="upload-area">

            <form action="{{ site.csv_to_popolo_url }}" class="dropzone uploader" id="my-awesome-dropzone">

              <p class="drag-and-drop">
                  Drag &amp; Drop
              </p>

              <div class="fallback">
                  <input name="csv" type="file" multiple />
              </div>
            </form>
            <div class="preview-area dropzone-previews"></div>
          </div>

</div>

