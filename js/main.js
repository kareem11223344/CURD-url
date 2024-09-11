var siteNameInput = document.getElementById("siteName");
var siteUrlInput = document.getElementById("siteUrl");
var btn = document.querySelector("#submit");

var siteList = [];
if (localStorage.getItem("sites")) {
  siteList = JSON.parse(localStorage.getItem("sites"));
  displaySites();
  displayBtnRemoveAll()
}

// Start Search Input
var serchInput = document.querySelector("#searchSite");
serchInput.addEventListener("focus", function () {
  serchInput.classList.replace("w-25", "w-50")
});
serchInput.addEventListener("blur", function () {
  serchInput.classList.replace("w-50", "w-25")
});
// End Search Input

var validName;
var validURL;

function validNameInput() {
  if (siteNameInput.value.length > 2) {
    siteNameInput.classList.remove("is-invalid");
    siteNameInput.classList.add("is-valid");
    // siteNameInput.style.borderColor = "green";
    // document.getElementById("success1").style.display = "inline-block";
    // document.getElementById("error1").style.display = "none";
    validName = true;
    document.getElementById("submit").attributes[2].value = "";
  } else {
    siteNameInput.classList.remove("is-valid");
    siteNameInput.classList.add("is-invalid");
    // siteNameInput.style.borderColor = "red";
    // document.getElementById("error1").style.display = "inline-block";
    // document.getElementById("success1").style.display = "none";
    validName = false;
    document.getElementById("submit").attributes[2].value = "modal";
  }
}

function validUrlInput() {
  if (
    siteUrlInput.value.startsWith("https://") &&
    siteUrlInput.value.includes(".com")
  ) {
    siteUrlInput.classList.remove("is-invalid");
    siteUrlInput.classList.add("is-valid");
    // siteUrlInput.style.borderColor = "green";
    // document.getElementById("success2").style.display = "inline-block";
    // document.getElementById("error2").style.display = "none";
    validURL = true;
    document.getElementById("submit").attributes[2].value = "";
  } else {
    siteUrlInput.classList.remove("is-valid");
    siteUrlInput.classList.add("is-invalid");
    // siteUrlInput.style.borderColor = "red";
    // document.getElementById("error2").style.display = "inline-block";
    // document.getElementById("success2").style.display = "none";
    validURL = false;
    document.getElementById("submit").attributes[2].value = "modal";
  }
}

function addSite() {
  validNameInput();
  validUrlInput();
  if (validName == true && validURL == true) {
    var item = {
      name: siteNameInput.value,
      url: siteUrlInput.value,
    };
    siteList.push(item);
    localStorage.setItem("sites", JSON.stringify(siteList));
    displaySites();
    clearInput();
    displayBtnRemoveAll();
  }
}

function displaySites() {
  var char = document.getElementById("searchSite").value.toLowerCase()
  var tag = "";
  for (var i = 0; i < siteList.length; i++) {
    if(siteList[i].name.toLowerCase().includes(char)){
      tag +=
      `<tr>
    <td>` +
      i +
      `</td>
    <td>` +
      siteList[i].name.toLowerCase().replace(char, "<span class='bg-info'>" + char + "</span>") +
      `</td>
    <td> <button class="btn btn-info py-2 px-4 rounded-3"> <a href='` +
      siteList[i].url +
      `' target='_blank'> <i class="fa-solid fa-eye pe-2"></i> Visit</a> </button> </td>

      <td> <button onclick="updateBtn(` +
      i +
      `), displayBtnRemoveAll()" class="btn btn-primary py-2 px-4 rounded-3">Update</button> </td>

    <td> <button onclick="removeSite(` +
      i +
      `), displayBtnRemoveAll()" class="btn btn-danger py-2 px-4 rounded-3"> <i class="fa-solid fa-trash-can"></i> Delete</button> </td>
</tr>`;
    }
  }
  document.getElementById("data").innerHTML = tag;
}

function removeSite(i) {
  siteList.splice(i, 1);
  localStorage.setItem("sites", JSON.stringify(siteList));
  displaySites();
}

function updateBtn(i) {
  siteNameInput.value = siteList[i].name;
  siteUrlInput.value = siteList[i].url;
  btn.innerHTML = "Update";
  btn.classList.replace("bg-success", "bg-primary");
  btn.classList.replace("border-success", "border-primary");
  btn.setAttribute("onclick", "updateSite("+i+")");

  validNameInput();
  validUrlInput();
}

function updateSite(i) {
  siteList[i].name = siteNameInput.value;
  siteList[i].url = siteUrlInput.value;
  displaySites();
  localStorage.setItem("sites", JSON.stringify(siteList));
  clearInput();
  btn.innerHTML = "Submit";
  btn.classList.replace("bg-primary", "bg-success");
  btn.classList.replace("border-primary", "border-success");
  btn.setAttribute("onclick", "addSite()");
}

function clearInput() {
  siteNameInput.value = "";
  siteUrlInput.value = "";
  validNameInput();
  validUrlInput();
  siteNameInput.classList.remove("is-invalid");
  siteUrlInput.classList.remove("is-invalid");
}

function removeAll() {
  siteList.splice(0, siteList.length);
  localStorage.setItem("sites", JSON.stringify(siteList));
  displaySites();
  displayBtnRemoveAll();
}

function displayBtnRemoveAll() {
  if (siteList.length >= 5) {
    document.getElementById("btnRemove").innerHTML = 
    ` <tr>
        <td colspan="5">
            <div class="d-grid gap-2">
                <button id="removeall" onclick="removeAll()" class="btn btn-danger" type="button">Remove All</button>
            </div>
        </td>
      </tr>`;
  }
  else {
    document.getElementById("btnRemove").innerHTML = `<tr></tr>`
  }
}