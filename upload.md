---
layout: default
title: Upload
permalink: /upload/
---
<div class="container"> 

  <div class="standard-page-wrapper">
    <h1>Add your data</h1>

    <p>If you can generate a CSV file with information about the members
    of your legislature, then we can try to convert it to JSON for you.
    This won‘t include everything that <a
    href="http://www.popoloproject.com/">Popolo</a> offers, but it might be
    enough to get you started.</p>

    <h2>Requirements</h2>

    <p>Your CSV file must meet the following requirements:
    <ul>
      <li>It must be well-formatted, with a single header row of column names.</li>
      <li>No blank rows.</li>
      <li>Encoded as utf-8.</li>
      <li>Using “,” as the separator.</li>
    </ul>

    <h2>Fields</h2>

    <p>At a minimum your CSV should have columns for the politician‘s
    <code>name</code>, their political <code>party</code> or faction, and
    (where appropriate) the <code>area</code> or constituency they
    represent. You can also supply an optional <code>start_date</code>
    and <code>end_date</code> if some people have different dates to others
    (or you just want to be complete).

    <p>It is recommended that you also supply a unique <code>id</code>
    field for each person, and <code>party_id</code> for each party. (If you
    don‘t, we‘ll create them for you, but they will be different each time
    you run this, which may cause problems later).</p>

    <p>If legislators can also hold executive positions (President,
    Prime Minister, Minister of the Environment, etc), you can include
    that information in an <code>executive</code> column.

    <p>We also recommend adding an <code>email</code> and a URL for an
    <code>image</code> of the person. You could also include their
    <code>twitter</code> handle if they have one.</p>

    <p>Other columns we know what do with include:
    <code>given_name</code>, <code>family_name</code>,
    <code>additional_name</code>, <code>other_name</code>,
    <code>honorific_prefix</code>, <code>honorific_suffix</code>,
    <code>patronymic_name</code>, <code>sort_name</code>,
    <code>gender</code>, <code>birth_date</code>, <code>death_date</code>,
    <code>summary</code>, <code>biography</code>, and
    <code>national_identity</code>. </p>

    <p>Anything not in this list will probably just be ignored.</p>

    <p>You can play around with this tool as much as you like to see
    what the results look like. When you get something you‘re happy with,
    we can then also help you put that into a PopIt.</p>

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

