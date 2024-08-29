<!DOCTYPE html>
<html>
<head>
    <link rel="stylesheet" href="css/custom-project.css">
    <script type="text/javascript" src="jquery-3.5.1.min.js"> </script>
</head>
<body>
<div id="regForm">
  <h1>Custom Project Guide</h1>
  <hr/>
  <!-- One "tab" for each step in the form: -->
  <div class="tab">
    <p>Is the site in current redevlopment or with production?</p>
    <div class="customOptions question">
        <div class="option-colum">
            <input type="radio" id="yesredev" name="is_prod" value="Yes">
             <label for="yesredev">Yes</label>
            <input type="radio" id="noredev" name="is_prod" value="No">
             <label for="noredev">No</label>
        </div>
    </div>
  </div>

  <div class="tab">
    <p>What kind of custom work are you looking for?</p>
    <div class="customOptions">
        <div class="option-colum">
            <input type="radio" id="homeredev" name="is_prod" value="Yes">
             <label for="homeredev">Homepage redevelopment</label>

            <input type="radio" id="homeTmpUpdate" name="is_prod" value="Yes">
             <label for="homeTmpUpdate">Homepage Template Update</label>

            <input type="radio" id="tmpBuild" name="is_prod" value="No">
             <label for="tmpBuild">Internal Page Template</label>

            <input type="radio" id="dlrLocPage" name="is_prod" value="No">
             <label for="dlrLocPage">Dealer Location Page</label>
        </div>
        <div class="option-colum">
            <input type="radio" id="headerRedev" name="is_prod" value="No">
             <label for="headerRedev">Header Redesign</label>

            <input type="radio" id="sqzPage" name="is_prod" value="No">
             <label for="sqzPage">Custom Squeeze Page</label>

            <input type="radio" id="customNav" name="is_prod" value="No">
             <label for="customNav">Custom Navigation</label>

            <input type="radio" id="customNav" name="is_prod" value="No">
             <label for="customNav">Internal Page Creation</label>
        </div>
    </div>
  </div>



  <div class="formPagination">
    <div style="float:right;">
      <button type="button" id="prevBtn" onclick="nextPrev(-1)">Previous</button>
      <button type="button" id="nextBtn" onclick="nextPrev(1)">Next</button>
    </div>
  </div>

</div>
<script type="text/javascript" src="js/custom-project.js"> </script>

</body>
</html>