Google Sheets : https://docs.google.com/spreadsheets/d/1rWP0vYSkZZXvwsgBZ9kpxMpFV3KRidZziTDCTRJ5XdM/edit?usp=sharing<br>
ID de l'API : MaZzw3Rd7wPS_A1gxtCV7rDIA2gQQzN3M

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
