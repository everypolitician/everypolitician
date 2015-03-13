---
layout: default
title: Upload
permalink: /upload/
---
<div class="container">


    <div id="add-your-data-area" class="add-your-data-area">
      <div class="standard-page-wrapper">
        <h1>Add your data</h1>
        <p>Upload a CSV file here and we’ll convert it to JSON:</p>
        <div class="upload-area">
          <form action="{{ site.csv_to_popolo_url }}" class="dropzone uploader" id="my-awesome-dropzone">
            <p class="drag-and-drop"> Drag &amp; Drop </p>
            <div class="fallback">
              <input name="csv" type="file" multiple />
            </div>
          </form>
          <div class="preview-area dropzone-previews"></div>
        </div>
      </div>

      <div id="popit-submit-errors"></div>
      </div>

    <div id="popit-submit-area" class="popit-submit-area">
      <h1>Here’s your data as JSON</h1>
      <div class="first-column">

      <p>In the box you’ll find the Popolo format JSON we generated from your CSV.</p>
      <p>If something looks wrong, just <a href="/upload">reload this page</a> and try again.</p>
      <h2 class="tertiary-heading">Add to PopIt</h2>
      <p>Adding this data to PopIt will put it into a good-looking, public-facing website like
      <a href="https://greekparliament.popit.mysociety.org/">this</a>.</p>

      <div id="popit-login-status">
        <p>Here‘s how:</p>
        <ol id="no-popits">
          <li><a href="{{ site.popit_server_protocol }}://{{ site.popit_server }}/login">Log in
            or Register with PopIt.</a></li>
          <li><a href="{{ site.popit_server_protocol }}://{{ site.popit_server }}/instances/new">Create
            a new PopIt instance</a>: give it a name that‘s relevant to your data.</li>
          <li>PopIt will invite you to populate your instance, but ignore
          that: we‘re going to populate it from here.</li>
          <li>So come back to this page, and select your new PopIt (you may need to reload to see it).</li>
          <li>When it‘s finished (watch for the “Uploaded!” message), you
          can go back to your new PopIt, and add a description. Click on ‘people’
          and ‘organizations’ in the top bar to see how your data has displayed,
          and make any manual edits you want.</li>
          <li>If you realise that something wasn‘t quite right with your data,
          simply come back here and repeat the whole process over with your fixed
          CSV file.</li>
        </ol>
        <ol id="has-popits">
          <li>Select your PopIt from the list below, and click the “Upload” button.</li>
          <li><b>WARNING!</b> Any content that‘s already in your PopIt will
            be completely destroyed first. If you‘re not sure you want this,
            try <a href="{{ site.popit_server_protocol }}://{{ site.popit_server }}/instances/new">creating
              a new PopIt instance</a> to play with first.</li>
          <li>When it‘s all done (watch for the “Uploaded!” message), you
          can go back to your new PopIt, and add a description. Click on ‘people’
          and ‘organizations’ in the top bar to see how your data has displayed,
          and make any manual edits you want.</li>
        </ol>
      </div>

      <br clear="all" />
      <form id="popit-submit-form" class="popit-submit-form">
        <label for="input_instance">Choose a PopIt</label>
        <select id="input_instance" name="instance" class="popit-name-form-field" required="required">
        </select>
        <button type="submit" class="button button--secondary">Upload to PopIt</button>
      </form>
      </div><!--

      --><div class="second-column">
        <div id="json-preview-area">
          <pre><code class="json"></code></pre>
        </div>
      </div>
    </div>

  <div class="standard-page-wrapper">
    <div id="polling-area">
      <h1>Uploading</h1>
      <p>We’re uploading your data to
        <span class="polling_area_instance_name">PopIt</span> ...
      </p>
      <p class="status-message"><strong>Status</strong> <span id="polling_status">Waiting</span></p>
    </div>

    <div id="success-area" class="success-area">
      <h1>Upload complete</h1>
      <div class="success-box">
      <p class="success-message"><strong>We successfully imported
        <span id="success_person_count">your records</span>
        </strong>
      </p>
      <p><span id="success_popit_address"></span></p>
      </div>
    </div>


    <p>If you can generate a CSV file with information about the members
    of your legislature, then we can convert it to JSON for you.
    This doesn’t include everything that <a
      href="http://www.popoloproject.com/">Popolo</a> offers, but it
    should be enough to get you started.</p>

    <h2>What To Upload</h2>

    <p>A CSV file with information about the members of your
    legislature, formatted as follows:</p>
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
      <li><code>name</code>: Each politician’s name</li>
      <li><code>party</code>: Their political party or faction</li>
      <li><code>area</code>: The area or constituency they represent  (where
      appropriate) </li>
    </ul>

    <h3>Recommended fields</h3>
    <ul>
      <li><code>id</code>: A unique id field for each person, and
      <code>party_id</code> for each party (if you don’t supply these, we’ll
      create them for you, but they will be different each time you run this,
      which may cause problems later).</li>
      <li><code>email</code>: An email address for each person and/or</li>
      <li><code>twitter</code>: their Twitter handle.</li>
      <li><code>image</code>: A URL for an image of the person.</li>
    </ul>

    <h3>Optional, but nice-to-have fields</h3>

    <ul>
      <li><code>start_date</code> and <code>end_date</code>, for when
      they entered or left the legislature</li>
      <li><code>executive</code>: If legislators can also hold executive
      positions (President, Prime Minister, Minister of the Environment, etc),
      you can also include that information.</li>
    </ul>

    <h3>Totally-your-choice fields</h3>

    <p>Other columns we know what do with include: </p>
    <ul>
      <li><code>given_name</code></li>
      <li><code>family_name</code></li>
      <li><code>additional_name</code></li>
      <li><code>other_name</code></li>
      <li><code>honorific_prefix</code></li>
      <li><code>honorific_suffix</code></li>
      <li><code>patronymic_name</code></li>
      <li><code>sort_name</code></li>
      <li><code>gender</code></li>
      <li><code>birth_date</code></li>
      <li><code>death_date</code></li>
      <li><code>summary</code></li>
      <li><code>biography</code></li>
      <li><code>national_identity</code></li>
      <li><code>phone</code></li>
      <li><code>cell</code></li>
      <li><code>fax</code></li>
    </ul>

    <p>(If you‘re unsure what any of these mean, the <a 
    href="http://www.popoloproject.com/specs/person.html">Popolo
    specification</a> has lots more details.)</p>

    <p>Anything not in this list will probably just be ignored—but you
    can play around with this tool as much as you want to see what the
    results look like. Once you get something you’re happy
    with, then you can add it to <a href="http://popit.poplus.org/">PopIt</a>.</p>

    <p><a href="mailto:team@openpoliticians.org">Let us know</a> how you get on—or if we can help.</p>

  </div>
</div>

