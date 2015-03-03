---
layout: default
title: Upload
permalink: /upload/
---
<div class="container"> 

  <div class="standard-page-wrapper">
    <h1>Add your data</h1>

    <p>Upload a CSV file here and we’ll convert it to JSON:</p>

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

    <hr /><br />

    <p>If you can generate a CSV file with information about the members
    of your legislature, then we can convert it to JSON for you.
    This doesn‘t include everything that <a
    href="http://www.popoloproject.com/">Popolo</a> offers, but it
    should be enough to get you started.</p>

    <h2>What To Upload</h2>

    <p>A CSV file with information about the members of your
    legislature, formatted as follows:
    <ul>
      <li>A single header row of column names.</li>
      <li>Comma separated values.</li>
      <li>Encoded as utf-8.</li>
      <li>No blank rows within the data.</li>
    </ul>

    <p>Any CSV file exported from a major spreadsheet tool (e.g. Excel,
    OpenOffice, Google Sheets) should work.</p>

    <h2>Fields</h2>

    <h3>Required Fields</h3>

    <p>Your CSV must have columns named:</p>
    <ul>
      <ol><code>name</code>: Each politician’s name</ol>
      <ol><code>party</code>: Their political party or faction</ol>
      <ol><code>area</code>: The area or constituency they represent  (where
        appropriate) </ol>
    </ul>

    <h3>Recommended fields</h3>
    <ul>
      <ol><code>id</code>: A unique id field for each person, and
        <code>party_id</code> for each party (if you don‘t supply these, we‘ll
        create them for you, but they will be different each time you run this,
        which may cause problems later).</ol>
      <ol><code>email</code>: An email address for each person and/or</ol>
      <ol><code>twitter</code>: their Twitter handle.</ol>
      <ol><code>image</code>: A URL for an image of the person.</ol>
    </ul>

    <h3>Optional, but nice-to-have fields</h3>

    <ul>
      <ol><code>start_date</code> and <code>end_date</code>, for when
        they entered or left the legislature</ol>
      <ol><code>executive</code>: If legislators can also hold executive
        positions (President, Prime Minister, Minister of the Environment, etc),
        you can also include that information.</ol>
    </ul>

    <h3>Totally-your-choice fields</h3>

    <p>Other columns we know what do with include: </p>
    <ul>
      <ol><code>given_name</code></ol>
      <ol><code>family_name</code></ol>
      <ol><code>additional_name</code></ol>
      <ol><code>other_name</code></ol>
      <ol><code>honorific_prefix</code></ol>
      <ol><code>honorific_suffix</code></ol>
      <ol><code>patronymic_name</code></ol>
      <ol><code>sort_name</code></ol>
      <ol><code>gender</code></ol>
      <ol><code>birth_date</code></ol>
      <ol><code>death_date</code></ol>
      <ol><code>summary</code></ol>
      <ol><code>biography</code></ol>
      <ol><code>national_identity</code></ol>
      <ol><code>phone</code></ol>
      <ol><code>cell</code></ol>
      <ol><code>fax</code></ol>
    </ul>

    <p>Anything not in this list will probably just be ignored—but you
    can play around with this tool as much as you want to see what the
    results look like. Once you get something you‘re happy
    with, then you can add it to <a href="http://popit.poplus.org/">PopIt</a>.</p>

    <p><a href="mailto:team@openpoliticians.org">Let us know</a> how you get on—or if we can help.</p>

  </div>
</div>

