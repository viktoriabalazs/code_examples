function hideBox(id) {
  document.getElementById(id).style.display = "none";
}
function saveMath() {
  var mathValue = calculator.display.value;
  var mathNameInput = document.getElementById("savedmath-name");

  //requesting math name
  if (mathValue != "" && mathValue != null) {
    savedMathNameDiv = document.getElementById("savedmath-nameinput");
    savedMathNameDiv.style.display = "block";
    mathNameInput.focus();
    mathNameInput.value = "";
    document.getElementById("save-button").disabled = true;
  } else {
    errorMessage = document.getElementById("error-message");
    errorMessage.style.display = "block";
  }
}
function verifyName() {
  var mathName = document.getElementById("savedmath-name").value;
  var saveButton = document.getElementById("save-button");
  if(mathName != null && mathName != "") {
    saveButton.disabled = false;
  } else {
    saveButton.disabled = true;
  }
}
function saveMathName() {
  var mathName = document.getElementById("savedmath-name").value;
  var currentDate = new Date();
  var savedMathContainer = document.getElementById("saved-math-container");
  var mathValue = calculator.display.value;

  //creating new elements
  var td1Element = document.createElement("td");
  var td2Element = document.createElement("td");
  var trElement = document.createElement("tr");
  var savedMathString = document.createElement("input");
  var savedMathDelete = document.createElement("input");

  //setting and styling the new elements
  td1Element.width = "70%";
  td2Element.width = "30%";
  savedMathString.type = "button";
  savedMathString.setAttribute("class", "saved_math");
  savedMathString.classList.add("btn");
  savedMathString.addEventListener("click", function() {calculator.display.value += mathValue;});
  savedMathDelete.value = "DELETE";
  savedMathDelete.setAttribute("class", "delete_math");
  savedMathDelete.classList.add("btn");
  savedMathDelete.type = "button";
  savedMathDelete.addEventListener("click", function() {
    var t = this;
    var removableMath = document.getElementById(savedMathId);
    t.parentNode.parentNode.parentNode.removeChild(removableMath);
  });

  //creating DOM structure
  td1Element.appendChild(savedMathString);
  td2Element.appendChild(savedMathDelete);
  trElement.appendChild(td1Element);
  trElement.appendChild(td2Element);

  //saving math
  if (mathName != null && mathName != "") {
    var savedMathId = mathName + Math.random();
    var months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    savedMathNameDiv.style.display = "none";
    savedMathContainer.appendChild(trElement);
    var minutes = function() {
      if(currentDate.getMinutes() < 10) {
        return "0" + currentDate.getMinutes();
      } else {
        return currentDate.getMinutes();
      }
    };
    var hours = function() {
      if(currentDate.getHours() < 10) {
        return "0" + currentDate.getHours();
      } else {
        return currentDate.getHours();
      }
    };
    savedMathString.value = hours() + ":" + minutes() + "/" + currentDate.getDate() + months[currentDate.getMonth()] + " - " + mathName;
    trElement.setAttribute("id", savedMathId);
  }
}
