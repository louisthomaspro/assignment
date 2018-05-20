# How to use project ?
>
1. Add the google sheet template project to your drive : https://docs.google.com/spreadsheets/d/1rWP0vYSkZZXvwsgBZ9kpxMpFV3KRidZziTDCTRJ5XdM/edit?usp=sharing
2. Create your own copy, rename the file and open it.
3. Go to ***Tools  Script editor***, copy code below in the script and save your google script.

```javascript
function click() {
  // Set SpreadSheet for AssignCode script and initialize variables
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Perf");
  var showLogs = false;
  if (sheet.getRange("F1").getValue() === "oui") showLogs = true;
  AssignCode.run(SpreadsheetApp.getActiveSpreadsheet().getId(), showLogs); // google sheets id | do we use the api to solve ? | do we show logs ?
}

// Only with "no api"
function finish(response) {
  AssignCode.displayResponse(response);
}
 
// Clear background and datas of the array
function clearArray() {
  var arraypos = { 'i' : 14, 'j' : 2}; // Set shifts of the wish table position
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Datas");
  //sheet.getRange(arraypos['i'], arraypos['j'], 100,100).setValue(""); // Set value
  sheet.getRange(arraypos['i'], arraypos['j'], 100,100).setBackground(null); // Clear background color
}
```

4. Go to ***Resources > Libraries***, add the library with ID : ***MaZzw3Rd7wPS_A1gxtCV7rDIA2gQQzN3M*** and set the last version of it.
5. Save, go back to the google sheet and click on the button ***Affecter*** to test if it's working.

Now you can change the google sheets datas to fit your needs ;)
