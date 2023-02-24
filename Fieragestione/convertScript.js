var convertButton = document.getElementById("convertButton");
var uploadfile = document.getElementById("uploadfile");
var alertSuccess = document.getElementById("alertSuccess");
var spinner = document.getElementById("spinner");
const fileList = document.getElementById('file-list');
var startConvertButton = document.getElementById("startConvertButton");
var dynamicContent = document.getElementById("dynamicContent");
var instructionsConvert = document.getElementById("instructionsConvert");
var selectedFilesTitle = document.getElementById("selectedFilesTitle");
var proceed = document.getElementById("proceed");



selectedFilesTitle.style.display = "none";
proceed.style.display = "none";

//Hide and show section
startConvertButton.addEventListener('click', function () {
    dynamicContent.style.display = "block";
    instructionsConvert.style.display = "none";
})

//Spinner Display
uploadfile.addEventListener('click', function () {
    spinner.style.display = "block";
})

uploadfile.addEventListener('change', function () {
    fileList.innerHTML = '';
    for (let i = 0; i < uploadfile.files.length; i++) {
        const file = uploadfile.files[i];
        const fileLink = document.createElement('a');
        fileLink.setAttribute('href', URL.createObjectURL(file));
        fileLink.setAttribute('download', file.name);
        fileLink.innerHTML = file.name;
        const listItem = document.createElement('li');
        listItem.appendChild(fileLink);
        fileList.appendChild(listItem);
        spinner.style.display="block";


        const anagrafica = fileList.innerHTML.includes("ANAG");
        const iscrizione = fileList.innerHTML.includes("ISC");
        const notifica = fileList.innerHTML.includes("NOT");

        if (notifica == true && uploadfile.files.length == 1 || anagrafica == true && iscrizione == true && uploadfile.files.length == 2) {
            convertButton.style.display = "block";
            selectedFilesTitle.style.display = "block";
            proceed.style.display = "block";
            spinner.style.display="none";

        } else {
            convertButton.style.display = "none";
            selectedFilesTitle.style.display = "block";
            proceed.style.display = "block";
            spinner.style.display="none";


        }

    }
});



//Trigger Send data
convertButton.addEventListener('click', function () {
    sendConvertData();
})

//SEND DATA TO JSP (convert)
function sendConvertData() {
    spinner.style.display = "block";
    const csvFiles = $('#uploadfile').prop('files');
    const formData = new FormData();
    formData.append('VECCHIO_1', csvFiles[0]);
    formData.append('VECCHIO_2', csvFiles[1]);
    formData.append("VECCHIO", "typeOfLoad");

    $.ajax({
        url: 'https://services-test.fieramilano.it/uploadterze/Ajax_JSP/upload.jsp',
        type: 'POST',
        data: formData,
        processData: false,
        contentType: false,
        success: function (response) {
            console.log('File uploaded successfully.');
            alertSuccess.style.display = "block";
            spinner.style.display = "none";
            alertSuccess.innerHTML = "Hai caricato con successo questo tracciato!"
        },
        error: function (error) {
            console.log('Error uploading file.');
            spinner.style.display = "none";
            modalError.style.display = "block";
            modalError.innerHTML = "Qualcosa è andato storto, riporva!"
        }
    });
};