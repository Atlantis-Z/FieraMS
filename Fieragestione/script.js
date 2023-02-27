//Global variables
var modalError = document.getElementById('modalError');
var alertSuccess = document.getElementById('alertSuccess');
var main = document.getElementById('main');
var openNewFile = document.getElementById('openNewFile');
var columnError = document.getElementById('columnError');
var errorList = document.getElementById('errorList');
var openErrorList = document.getElementById('openErrorList');
var closeErrorList = document.getElementById('closeErrorList');
var spinner = document.getElementById('spinner');
var saveButton = document.getElementById('saveButton');
var duplicates = document.getElementById('duplicates');
var searchbar = document.getElementById('searchbar');
var tableIMG = document.getElementById('tableIMG');
var validationButton = document.getElementById('validationButton');
var alertWarning = document.getElementById('alertWarning');
var openFullTable = document.getElementById('openFullTable');
var table_responsive = document.getElementById('table-responsive');
var closeFullTable = document.getElementById('closeFullTable');
var frontContent = document.getElementById('frontContent');
var navbar_top = document.getElementById('navbar_top');
var uploadButton = document.getElementById('uploadButton');
var convertButton = document.getElementById('convertButton');
var tablecontainer = document.getElementById("tablecontainer");
var searchButtons = document.getElementById("searchButtons");
var addFile = document.getElementById("addFile");

//Display settings
searchButtons.style.display = "none";
tablecontainer.style.display = "none";
uploadButton.style.display = "none";
convertButton.style.display = "none";
tableIMG.style.display = "block";
searchbar.style.display = "none";
saveButton.style.display = "none";
openFullTable.style.display = "none";
closeFullTable.style.display = "none";
alertWarning.style.display = "none";

//Spinner Display
uploadfile.addEventListener('click', function () {
    spinner.style.display = "block";
})


//Create an array to store the files that you open
var fileContainer= [];

//Upload files trigger
uploadfile.addEventListener('change', function () {
    tablecontainer.style.display = "block";
    searchButtons.style.display = "block";
    openFullTable.style.display = "block";
    tableIMG.style.display = "none"
    uploadfile.style.display = "none";
    openNewFile.style.display = "block";
    var opendFiles = document.getElementById('opendFiles');
    var filename = uploadfile.files[0].name;
    opendFiles.innerHTML = filename;
    saveButton.style.display = "block";
    searchbar.style.display = "block";

    //Save the files in the file container
    var files = uploadfile.files;
    for (let i = 0; i < files.length; i++) {
        fileContainer.push(files[i]);
      }

    //Parse the documents
    Papa.parse(uploadfile.files[0], {
        download: true,
        header: true,
        skipEmptyLines: true,
        complete: function (result) {
            var fileData = result.data;

            // Check filetype by filename
            var fileType = document.getElementById('fileType');
            if (filename.includes('ANAG')) {
                ('Nome: Anagrafica')
                constructTable('#table');
            } else if (filename.includes('ISC')) {
                ('Nome: Iscrizione')
                constructTable('#table');
            } else if (filename.includes('NOT')) {
                ('Nome: Notifica')
                constructTable('#table');
            } else {
                ('Nome: Sbagliato!')
                modalError.style.display = "block";
                modalError.innerHTML = "Il nome del file è sbagliato, controlla!";
                spinner.style.display = "none"
            }

            //Contruct the table
            function constructTable(selector) {
                // Getting the all column names
                var cols = Headers(fileData, selector);

                // Traversing the JSON data
                for (var i = 0; i < fileData.length; i++) {
                    var row = $('<tr class="body"/>');
                    for (var colIndex = 0; colIndex < cols.length; colIndex++) {
                        var val = fileData[i][cols[colIndex]];

                        if (val == null) val = "";
                        if (val.match('CAMPO OBBLIGATORIO')) {
                            modalError.style.display = "block";
                            openErrorList.style.display = "block";
                            row.append($('<td title="CAMPO OBBLIGATORIO" value="" contenteditable class="td text-danger fw-bolder "/>').addClass("border border-danger border-2").html(val));
                        } else if (val.match("VALORE TROPPO LUNGO")) {
                            modalError.style.display = "block";
                            openErrorList.style.display = "block";
                            row.append($('<td title="VALORE TROPPO LUNGO" contenteditable class="td text-danger fw-bolder"/>').addClass("border border-danger border-2").html(val));
                        } else if (val.match("VALORE NON AMMESSO")) {
                            modalError.style.display = "block";
                            openErrorList.style.display = "block";
                            row.append($('<td title="VALORE NON AMMESSO" contenteditable class="td text-danger fw-bolder"/>').addClass("border border-danger border-2").html(val));
                        } else if (val.match("LUNGHEZZA NON AMMESSA")) {
                            modalError.style.display = "block";
                            openErrorList.style.display = "block";
                            row.append($('<td title="LUNGHEZZA NON AMMESSA" contenteditable class="td text-danger fw-bolder"/>').addClass("border border-danger border-2").html(val));
                        } else if (val.match("IL VALORE DEVE COMINCIARE CON LA MAIUSCOLA")) {
                            modalError.style.display = "block";
                            openErrorList.style.display = "block";
                            row.append($('<td title="IL VALORE DEVE COMINCIARE CON LA MAIUSCOLA" contenteditable class="td text-danger fw-bolder"/>').addClass("border border-danger border-2").html(val));
                        } else if (val.match("IL VALORE DEVE ESSERE IN MAIUSCOLO")) {
                            modalError.style.display = "block";
                            openErrorList.style.display = "block";
                            row.append($('<td title="IL VALORE DEVE ESSERE IN MAIUSCOLO" contenteditable class="td text-danger fw-bolder"/>').addClass("border border-danger border-2").html(val));
                        } else if (val.match("VALORI AMMESSI: 'T' o 'F'")) {
                            modalError.style.display = "block";
                            openErrorList.style.display = "block";
                            row.append($('<td title="VALORI AMMESSI: T o F" contenteditable class="td text-danger fw-bolder"/>').addClass("border border-danger border-2").html(val));
                        } else if (val.match("La partita iva deve essere lunga 11/16 caratteri")) {
                            modalError.style.display = "block";
                            openErrorList.style.display = "block";
                            row.append($('<td title="La partita IVA deve essere lunga 11/16 caratteri" contenteditable class="td text-danger fw-bolder"/>').addClass("border border-danger border-2").html(val));
                        } else if (val.match("Il codice ficale deve essere lungo 16 caratteri")) {
                            modalError.style.display = "block";
                            openErrorList.style.display = "block";
                            row.append($('<td title="Il codice ficale deve essere lungo 16 caratteri" contenteditable class="td text-danger fw-bolder"/>').addClass("border border-danger border-2").html(val));
                        } else if (val.match("VALORI AMMESSI: '001S' o '001'")) {
                            modalError.style.display = "block";
                            openErrorList.style.display = "block";
                            row.append($('<td title="VALORI AMMESSI: 001S O 001" contenteditable class="td text-danger fw-bolder"/>').addClass("border border-danger border-2").html(val));
                        } else if (val.match("IL VALORE DEVE ESSERE: '##.##'")) {
                            modalError.style.display = "block";
                            openErrorList.style.display = "block";
                            row.append($('<td title="IL VALORE DEVE ESSERE: ##.##" contenteditable class="td text-danger fw-bolder"/>').addClass("border border-danger border-2").html(val));
                        } else if (val.match("VALORE AMMESSI: '1' o '2'")) {
                            modalError.style.display = "block";
                            openErrorList.style.display = "block";
                            row.append($('<td title="I Valori ammessi possono essere: 1 o 2" contenteditable class="td text-danger fw-bolder"/>').addClass("border border-danger border-2").html(val));
                        } else if (val.match("VALORI AMMESSI: 'NEWLINE' o 'CANLINE'")) {
                            modalError.style.display = "block";
                            openErrorList.style.display = "block";
                            row.append($('<td title="VALORI AMMESSI: NEWLINE o CANLINE" contenteditable class="td text-danger fw-bolder"/>').addClass("border border-danger border-2").html(val));
                        } else {
                            row.append($('<td contenteditable class="td"/>').html(val));
                        }

                        //Success modal
                        if (modalError.style.display === "block") {
                            alertSuccess.style.display = "none";
                            convertButton.style.display = "none";
                            uploadButton.style.display = "none";
                        } else {
                            alertSuccess.style.display = "block";
                        }
                    }
                    // Adding each row to the table
                    $(selector).append(row);

                    //LISTEN TO CHANGES
                    // console.log("___________________________")
                    // validationButton.addEventListener('click', function () {
                    //     var td = document.getElementsByClassName('td');
                    //     for (let i = 0; i < td.length; i++) {
                    //         var VItem = [(td.item(i)).innerHTML].toString();
                    //         console.log("Variable Items"+" "+VItem)      
                    //     }
                    // })
                }

                //HEADER
                //Creating the header of the table
                function Headers(fileData, selector) {
                    var columns = [];
                    var header = $('<tr class="header"/>');
                    for (var i = 0; i < fileData.length; i++) {
                        var row = fileData[i];
                        keysOfRow = Object.keys(row);
                        valuesOfRow = Object.values(row);

                        //LISTEN TO CHANGES
                        // validationButton.addEventListener('click', function () {
                        //     var td = document.getElementsByClassName('td');
                        //     for (let i = 0; i < td.length; i++) {
                        //         var VItem = [(td.item(i)).innerHTML].toString();
                        //         console.log("Variable Items"+" "+VItem)     
                        //     }
                        //     console.log("___________________________")
                        //     valuesOfRow.forEach(element => console.log("Non variable elements:"+" "+element))
                        // })

                        //ANAG STRUCTURE
                        if (keysOfRow.length === 27 || keysOfRow.length === 31 && filename.includes('ANAG')) {
                            ('Anagrafica')
                            fileType.innerHTML = "Anagrafica:"
                            for (var k in row) {
                                var headerAnagrafica = k.includes("Current Code") || k.includes('Name') || k.includes('Description') || k.includes('Type') || k.includes('LanguageSpoken') || k.includes('Notes') || k.includes('WebSite') || k.includes('BillingData_NationalIdentificationNumber') || k.includes('BillingData_National_IdentificationCountryIso2') || k.includes('BillingData_VatIdentificationNumber') || k.includes('Administrative Email') || k.includes('Invoicing_Email') || k.includes('Street') || k.includes('AddressData_City') || k.includes('AddressData_PostalCode') || k.includes('AddressData_Province') || k.includes('AddressData_Region') || k.includes('AddressData_State') || k.includes('AddressData_ExternalSystemCode') || k.includes('Preferred') || k.includes('Shipping Street') || k.includes('Shipping AddressData_City') || k.includes('Shipping AddressData_PostalCode') || k.includes('Shipping AddressData_Province') || k.includes('Shipping AddressData_Region') || k.includes('Shipping AddressData_State') || k.includes('Shipping State') || k.includes('First Name') || k.includes('Last Name') || k.includes("Email") || k.includes('Telephone');
                                if (headerAnagrafica == false) {
                                    modalError.style.display = "block";
                                    modalError.innerHTML = "Attenzione, in questa Anagrafica la testata contiene un valore non ammesso:" + " " + `"${k}"`;
                                    spinner.style.display = "none"
                                }
                                if ($.inArray(k, columns) == -1) {
                                    columns.push(k);
                                    header.append($('<th contenteditable class="th"/>').html(k));
                                    spinner.style.display = "none";
                                }
                            }
                            //Check if data structure is correct:
                            if (keysOfRow.length === 31) {
                                alertWarning.style.display = "block";
                                alertWarning.innerHTML = "Questa Anagrafica è in formato vecchio: aggiungi l'iscrizione e convertile!";
                                convertButton.style.display = "block";
                                uploadButton.style.display = "none";
                                uploadfile.style.display = "block";
                                saveButton.style.display = "none";
                            } else {
                                convertButton.style.display = "none";
                                uploadButton.style.display = "block";
                                saveButton.style.display = "block";
                            }
                            checkAnagrafica();

                            //ISC STRUCTURE
                        } else if (keysOfRow.length === 29 || keysOfRow.length === 23 && filename.includes('ISC')) {
                            ('Iscrizione')
                            fileType.innerHTML = "Iscrizione:"
                            for (var k in row) {
                                var headerIscrizione = k.includes("OACliente") || k.includes('SoldTo_CurrCode') || k.includes('BillTo_CurrCode') || k.includes('ShipTo_CurrCode') || k.includes('Coexhibitor_ID') || k.includes('OrderDate') || k.includes('Services Paid by Consortium') || k.includes('FairSector') || k.includes('SquareMtBooked') || k.includes('RegistrationItemCode') || k.includes('Unit Selling Price') || k.includes('MER First Name') || k.includes('MER Last Name') || k.includes('MER Email') || k.includes('MER Telephone') || k.includes('SER First Name') || k.includes('SER Last Name') || k.includes('SER Email') || k.includes('SER Telephone') || k.includes('Logistics Event Rep Email') || k.includes('Administrative Event Rep Email') || k.includes('Brand') || k.includes('VAT Free') || k.includes('CIG') || k.includes('CUP') || k.includes('CUD') || k.includes('CUU') || k.includes('PEC Email') || k.includes('Payment Code') || k.includes('Main Event Rep') || k.includes('Security Event Rep') || k.includes('Logistics Event Rep') || k.includes('Administrative Event Rep');
                                if (headerIscrizione == false) {
                                    // console.log('Ce ne sono sbagliati');
                                    modalError.style.display = "block";
                                    modalError.innerHTML = "Attenzione, in questa Iscrizione la testata contiene un valore non ammesso:" + " " + `"${k}"`;
                                    spinner.style.display = "none"
                                }
                                if ($.inArray(k, columns) == -1) {
                                    columns.push(k);
                                    header.append($('<th contenteditable class="th"/>').html(k));
                                    spinner.style.display = "none";
                                    uploadButton.style.display = "none";

                                }
                            }
                            //Check if data structure is correct:
                            if (keysOfRow.length === 23) {
                                alertWarning.style.display = "block";
                                alertWarning.innerHTML = "Questa iscrizione è in formato vecchio: aggiungi l'Anagrafica e converti!";
                                convertButton.style.display = "block";
                                uploadButton.style.display = "none";
                                uploadfile.style.display = "block";
                                saveButton.style.display = "none";
                            } else {
                                convertButton.style.display = "none";
                                uploadButton.style.display = "block";
                                saveButton.style.display = "block";

                            }
                            checkIscrizione();
                            //NOT STRUCTURE
                        } else if (keysOfRow.length === 19 || keysOfRow.length === 23 && filename.includes('NOT')) {
                            // ('Notifica')
                            fileType.innerHTML = "Notifica:"
                            for (var k in row) {
                                var headerNotifica = k.includes("OACustomer") || k.includes('NoteDesc') || k.includes('NumStandOpenSides') || k.includes('Stand') || k.includes('FairSector') || k.includes('HallCode') || k.includes('Aisle') || k.includes('Saloon') || k.includes('SquareMtAssigned') || k.includes('Main Event Rep') || k.includes('Security Event Rep') || k.includes('Logistics Event Rep') || k.includes('Administrative Event Rep') || k.includes('Services Paid by Consortium') || k.includes('Order Date') || k.includes('Brand') || k.includes('VAT Free') || k.includes('Total Price') || k.includes('Quantity') || k.includes('Operation') || k.includes('Order Line ID') || k.includes('Product Code') || k.includes('Unit Price');
                                if (headerNotifica == false) {
                                    // console.log('Ce ne sono sbagliati');
                                    modalError.style.display = "block";
                                    modalError.innerHTML = "Attenzione, in questa Notifica la testata contiene un valore non ammesso:" + " " + `"${k}"`;
                                    spinner.style.display = "none"
                                }
                                if ($.inArray(k, columns) == -1) {
                                    columns.push(k);
                                    header.append($('<th contenteditable class="th"/>').html(k));
                                    spinner.style.display = "none";
                                }
                            }
                            //Check if data structure is correct:
                            if (keysOfRow.length === 23) {
                                alertWarning.style.display = "block";
                                alertWarning.innerHTML = "Questo tracciato è in formato vecchio: convertilo!";
                                convertButton.style.display = "block";
                                uploadfile.style.display = "block";
                                saveButton.style.display = "none";

                            } else {
                                convertButton.style.display = "none";
                                uploadButton.style.display = "block";
                                saveButton.style.display = "block";

                            }
                            checkNotifica();
                        } else {
                            modalError.style.display = "block";
                            fileType.innerHTML = "Controlla che le colonne siano corrette e che l'header contenga tutti i valori scritti correttamente!"
                        }


                        //CONDITIONALS ANAGRAFICA
                        function checkAnagrafica() {
                            //______________________________________________VARIABLES OF THE VALUES
                            //Current Code
                            var currentCodeValue = row['Current Code'];
                            const changeCurrentCode = ['Current Code'];
                            //Name
                            var nameValue = row['Name'];
                            const changeName = ['Name'];
                            //Description
                            var descriptionValue = row['Description'];
                            const changeDescription = ['Description'];
                            //Type
                            var typeValue = row['Type'];
                            const changeType = ['Type'];
                            //LanguageSpoken
                            var lenaguageSpokenvalue = row['LanguageSpoken'];
                            const changeLenguageSpoken = ['LanguageSpoken'];
                            //Notes
                            var notesValue = row['Notes'];
                            const changeNotes = ['Notes'];
                            //WebSite
                            var webSiteValue = row['WebSite'];
                            const changeWebSite = ['WebSite'];
                            //BillingData_NationalIdentificationNumber
                            var billingData_NationalIdentificationNumberValue = row['BillingData_NationalIdentificationNumber'];
                            const changeBillingData_NationalIdentificationNumber = ['BillingData_NationalIdentificationNumber'];
                            //BillingData_National_IdentificationCountryIso2
                            var billingData_National_IdentificationCountryIso2Value = row['BillingData_National_IdentificationCountryIso2'];
                            const changeBillingData_National_IdentificationCountryIso2 = ['BillingData_National_IdentificationCountryIso2'];
                            //BillingData_VatIdentificationNumber
                            var billingData_VatIdentificationNumbervalue = row['BillingData_VatIdentificationNumber'];
                            const changeBillingData_VatIdentificationNumber = ['BillingData_VatIdentificationNumber'];
                            //Administrative Email
                            var administrativeEmailValue = row['Administrative Email'];
                            const changeAdministrativeEmail = ['Administrative Email'];
                            //Invoicing_Email
                            var invoicing_EmailValue = row['Invoicing_Email'];
                            const changeInvoicing_Email = ['Invoicing_Email'];
                            //Street
                            var streetValue = row['Street'];
                            const changeStreet = ['Street'];
                            //AddressData_City
                            var addressData_CityValue = row['AddressData_City'];
                            const changeAddressData_City = ['AddressData_City'];
                            //AddressData_PostalCode
                            var addressData_PostalCodeValue = row['AddressData_PostalCode'];
                            const changeAddressData_PostalCode = ['AddressData_PostalCode'];
                            //AddressData_Province
                            var addressData_ProvinceValue = row['AddressData_Province'];
                            const changeAddressData_Province = ['AddressData_Province'];
                            //AddressData_Region
                            var addressData_RegionValue = row['AddressData_Region'];
                            const changeAddressData_Region = ['AddressData_Region'];
                            //AddressData_State
                            var addressData_StateValue = row['AddressData_State'];
                            const changeAddressData_State = ['AddressData_State'];
                            //AddressData_ExternalSystemCode
                            var addressData_ExternalSystemCodeValue = row['AddressData_ExternalSystemCode'];
                            const changeAddressData_ExternalSystemCode = ['AddressData_ExternalSystemCode'];
                            //Preferred
                            var preferredValue = row['Preferred'];
                            const changePreferred = ['Preferred'];
                            //Shipping Street
                            var shippingStreetValue = row['Shipping Street'];
                            const changeShippingStreet = ['Shipping Street'];
                            //Shipping AddressData_City
                            var shippingAddressData_CityValue = row['Shipping AddressData_City'];
                            const changeShippingAddressData_City = ['Shipping AddressData_City'];
                            //Shipping AddressData_PostalCode
                            var shippingAddressData_PostalCodeValue = row['Shipping AddressData_PostalCode'];
                            const changeShippingAddressData_PostalCode = ['Shipping AddressData_PostalCode'];
                            //Shipping AddressData_Province
                            var shippingAddressData_ProvinceValue = row['Shipping AddressData_Province'];
                            const changeShippingAddressData_Province = ['Shipping AddressData_Province'];
                            //Shipping AddressData_Region
                            var shippingAddressData_RegionValue = row['Shipping AddressData_Region'];
                            const changeShippingAddressData_Region = ['Shipping AddressData_Region'];
                            //Shipping AddressData_State
                            var shippingAddressData_StateValue = row['Shipping AddressData_State'];
                            const changeShippingAddressData_State = ['Shipping AddressData_State'];
                            //Shipping State
                            var shippingStateValue = row['Shipping State'];
                            const changeShippingState = ['Shipping State'];
                            //Current Code Contact
                            var currentCodeContactValue = row['Current Code Contact'];
                            const changeCurrentCodeContact = ['Current Code Contact'];
                            //First Name
                            var firstNameValue = row['First Name'];
                            const changeFirstName = ['First Name'];
                            //Last Name
                            var lastNameValue = row['Last Name'];
                            const changeLastName = ['Last Name']
                            //Email
                            var emailValue = row['Email'];
                            const changeEmail = ['Email'];
                            //Telephone
                            var telephoneValue = row['Telephone'];
                            const changeTelephone = ['Telephone'];



                            //__________________________________________________________________CONDITIONALS___________________________________________________________-
                            var columnErrorArray = []
                            errorGraphArray.push(columnErrorArray);
                            var space = " ";

                            function createErrorList() {
                                for (let i = 0; i < 1; i++) {
                                    let li = document.createElement('li');
                                    li.innerHTML = columnErrorArray;
                                    li.setAttribute('style', 'color: red')
                                    columnError.append(li)
                                    if (li.innerHTML == "") {
                                        li.innerHTML = "NON CI SONO ERRORI &#x2713;"
                                        li.setAttribute('style', 'color: green')
                                    }
                                }
                            }


                            // $(function () {
                            //     for(let i =0; i<1; i++){
                            //         var adressdatas = addressData_ExternalSystemCodeValue.length;
                            //     }
                            //     var tableRows = $("#table tr"); //find all the rows
                            //     var rowValues = []; //to keep track of which values appear more than once
                            //     tableRows.each(function () {
                            //         var rowValue = $(this).find(".td").html();
                            //         if (!rowValues[rowValue]) {
                            //             var rowComposite = new Object();
                            //             rowComposite.count = 0;
                            //             rowComposite.row = this;
                            //             rowValues[rowValue] = rowComposite;
                            //         } else {
                            //             var rowComposite = rowValues[rowValue];
                            //             if (rowComposite.count == 0) {
                            //                 $(rowComposite.row).css('backgroundColor', 'lightyellow');
                            //             }
                            //             $(this).css('backgroundColor', 'lightyellow');
                            //             rowComposite.count++;
                            //         }
                            //     });
                            // });

                            //Current Code
                            if (currentCodeValue === "") {
                                for (let key of changeCurrentCode) {
                                    if (row[key] === "") {
                                        row[key] = row[key] + " " + "CAMPO OBBLIGATORIO";
                                        columnErrorArray.push(changeCurrentCode + space)
                                    } else {
                                        row[key] = row[key];
                                    }
                                }
                            } else if (currentCodeValue.length >= 51) {
                                for (let key of changeCurrentCode) {
                                    if (row[key].length >= 51) {
                                        row[key] = row[key] + ":" + "VALORE TROPPO LUNGO";
                                        columnErrorArray.push(changeCurrentCode + space)
                                    } else {
                                        row[key] = row[key];
                                    }
                                }
                            } else {
                                currentCodeValue = currentCodeValue
                            }

                            //Name
                            if (nameValue === "") {
                                for (let key of changeName) {
                                    if (row[key] === "") {
                                        row[key] = row[key] + " " + "CAMPO OBBLIGATORIO";
                                        columnErrorArray.push(changeName + space)
                                    } else {}
                                }
                            } else {}

                            //Description
                            if (descriptionValue.length >= 3201) {
                                for (let key of changeDescription) {
                                    if (row[key].length >= 3201) {
                                        row[key] = "VALORE TROPPO LUNGO";
                                        columnErrorArray.push(changeDescription + space)
                                    } else {}
                                }
                            } else {}

                            //Type
                            if (typeValue === "") {
                                for (let key of changeType) {
                                    if (row[key] === "") {
                                        row[key] = row[key] + " " + "CAMPO OBBLIGATORIO";
                                        columnErrorArray.push(changeType + space)
                                    } else {}
                                }
                            } else if (typeValue != "Business Company" && typeValue != "Public Entity" && typeValue != "Individual") {
                                for (let key of changeType) {
                                    if (row[key] != "Business Company" && row[key] != "Public Entity" && row[key] != "Individual") {
                                        row[key] = row[key] + ":" + "VALORE NON AMMESSO";
                                        columnErrorArray.push(changeType + space)
                                    } else {}
                                }
                            } else {}
                            //LanguageSpoken has no conditionals

                            //Notes
                            if (notesValue.length >= 32001) {
                                for (let key of changeNotes) {
                                    if (row[key].length >= 32001) {
                                        row[key] = row[key] + ":" + "VALORE TROPPO LUNGO";
                                        columnErrorArray.push(changeNotes + space)
                                    } else {}
                                }
                            } else {}

                            //WebSite
                            if (webSiteValue.length >= 256) {
                                for (let key of changeWebSite) {
                                    if (row[key].length >= 256) {
                                        row[key] = row[key] + ":" + "VALORE TROPPO LUNGO";
                                        columnErrorArray.push(changeWebSite + space)
                                    } else {}
                                }
                            } else {}


                            //YES IF
                            //BillingData_NationalIdentificationNumber
                            if (billingData_National_IdentificationCountryIso2Value === "IT" && typeValue === "Public Entity" && billingData_VatIdentificationNumbervalue === "" && billingData_NationalIdentificationNumberValue === "") {
                                for (let key of changeBillingData_NationalIdentificationNumber) {
                                    if (row[key] === "") {
                                        row[key] = row[key] + " " + "CAMPO OBBLIGATORIO";
                                        columnErrorArray.push(changeBillingData_NationalIdentificationNumber + space)
                                    } else {}
                                }
                            } else if (billingData_National_IdentificationCountryIso2Value === "IT" && typeValue === "Individual" && billingData_NationalIdentificationNumberValue === "") {
                                for (let key of changeBillingData_NationalIdentificationNumber) {
                                    if (row[key] === "") {
                                        row[key] = row[key] + " " + "CAMPO OBBLIGATORIO";
                                        columnErrorArray.push(changeBillingData_NationalIdentificationNumber + space)
                                    } else {}
                                }
                            } else if (billingData_National_IdentificationCountryIso2Value === "UE" && typeValue === "Public Entity" && billingData_NationalIdentificationNumberValue === "") {
                                for (let key of changeBillingData_NationalIdentificationNumber) {
                                    if (row[key] === "") {
                                        row[key] = row[key] + " " + "CAMPO OBBLIGATORIO";
                                        columnErrorArray.push(changeBillingData_NationalIdentificationNumber + space)
                                    } else {}
                                }
                            } else if (billingData_National_IdentificationCountryIso2Value != "UE" && billingData_National_IdentificationCountryIso2Value != "IT" && typeValue === "Public Entity" && billingData_NationalIdentificationNumberValue === "") {
                                for (let key of changeBillingData_NationalIdentificationNumber) {
                                    if (row[key] === "") {
                                        row[key] = row[key] + " " + "CAMPO OBBLIGATORIO";
                                        columnErrorArray.push(changeBillingData_NationalIdentificationNumber + space)
                                    } else {}
                                }
                            } else if (billingData_National_IdentificationCountryIso2Value === "IT" && typeValue === "Business Company" && billingData_NationalIdentificationNumberValue.length != 11 && billingData_NationalIdentificationNumberValue.length != 16) {
                                for (let key of changeBillingData_NationalIdentificationNumber) {
                                    if (row[key].length != 11 && row[key].length != 16) {
                                        row[key] = row[key] + ":" + "La partita iva deve essere lunga 11/16 caratteri";
                                        columnErrorArray.push(changeBillingData_NationalIdentificationNumber + space)
                                    } else {}
                                }
                            } else if (billingData_National_IdentificationCountryIso2Value === "IT" && typeValue === "Individual" && billingData_NationalIdentificationNumberValue.length != 16) {
                                for (let key of changeBillingData_NationalIdentificationNumber) {
                                    if (row[key].length != 16) {
                                        row[key] = row[key] + ":" + "Il codice ficale deve essere lungo 16 caratteri";
                                        columnErrorArray.push(changeBillingData_NationalIdentificationNumber + space)
                                    } else {}
                                }
                            } else {}

                            //BillingData_National_IdentificationCountryIso2
                            if (billingData_National_IdentificationCountryIso2Value != billingData_National_IdentificationCountryIso2Value.toUpperCase()) {
                                for (let key of changeBillingData_National_IdentificationCountryIso2) {
                                    if (row[key] != row[key].toUpperCase()) {
                                        row[key] = row[key] + " " + "IL VALORE DEVE ESSERE IN MAIUSCOLO";
                                        columnErrorArray.push(changeBillingData_National_IdentificationCountryIso2 + space)
                                    } else {}
                                }
                            } else if (billingData_National_IdentificationCountryIso2Value === "") {
                                for (let key of changeBillingData_National_IdentificationCountryIso2) {
                                    if (row[key] === "") {
                                        row[key] = row[key] + " " + "CAMPO OBBLIGATORIO";
                                        columnErrorArray.push(changeBillingData_National_IdentificationCountryIso2 + space)
                                    } else {}
                                }
                            } else if (billingData_National_IdentificationCountryIso2Value.length != 2) {
                                for (let key of changeBillingData_National_IdentificationCountryIso2) {
                                    if (row[key].length != 2) {
                                        row[key] = row[key] + ":" + "LUNGHEZZA NON AMMESSA";
                                        columnErrorArray.push(changeBillingData_National_IdentificationCountryIso2 + space)
                                    } else {}
                                }
                            } else {}

                            //YES IF
                            //BillingData_VatIdentificationNumber
                            if (billingData_National_IdentificationCountryIso2Value === "IT" && typeValue === "Business Company" && billingData_VatIdentificationNumbervalue === "") {
                                for (let key of changeBillingData_VatIdentificationNumber) {
                                    if (row[key] === "") {
                                        row[key] = row[key] + " " + "CAMPO OBBLIGATORIO";
                                        columnErrorArray.push(changeBillingData_VatIdentificationNumber + space)
                                    } else {}
                                }
                            } else if (billingData_National_IdentificationCountryIso2Value === "IT" && typeValue === "Public Entity" && billingData_NationalIdentificationNumberValue === "" && billingData_VatIdentificationNumbervalue === "") {
                                for (let key of changeBillingData_VatIdentificationNumber) {
                                    if (row[key] === "") {
                                        row[key] = row[key] + " " + "CAMPO OBBLIGATORIO";
                                        columnErrorArray.push(changeBillingData_VatIdentificationNumber + space)
                                    } else {}
                                }
                            } else if (billingData_National_IdentificationCountryIso2Value === "UE" && typeValue === "Business Company" && billingData_VatIdentificationNumbervalue === "") {
                                for (let key of changeBillingData_VatIdentificationNumber) {
                                    if (row[key] === "") {
                                        row[key] = row[key] + " " + "CAMPO OBBLIGATORIO";
                                        columnErrorArray.push(changeBillingData_VatIdentificationNumber + space)
                                    } else {}
                                }
                            } else if (billingData_National_IdentificationCountryIso2Value === "Extra-UE" && typeValue === "Business Company" && billingData_VatIdentificationNumbervalue === "") {
                                for (let key of changeBillingData_VatIdentificationNumber) {
                                    if (row[key] === "") {
                                        row[key] = row[key] + " " + "CAMPO OBBLIGATORIO";
                                        columnErrorArray.push(changeBillingData_VatIdentificationNumber + space)
                                    } else {}
                                }
                            } else if (billingData_VatIdentificationNumbervalue.length >= 21) {
                                for (let key of changeBillingData_VatIdentificationNumber) {
                                    if (row[key].length >= 21) {
                                        row[key] = row[key] + ":" + "VALORE TROPPO LUNGO";
                                        columnErrorArray.push(changeBillingData_VatIdentificationNumber + space)
                                    } else {}
                                }
                            } else {}

                            //Administrative Email
                            if (administrativeEmailValue === "") {
                                for (let key of changeAdministrativeEmail) {
                                    if (row[key] === "") {
                                        row[key] = row[key] + " " + "CAMPO OBBLIGATORIO";
                                        columnErrorArray.push(changeAdministrativeEmail + space)
                                    } else {}
                                }
                            } else {}

                            //Invoicing_Email has no conditionals

                            //Street
                            if (streetValue === "") {
                                for (let key of changeStreet) {
                                    if (row[key] === "") {
                                        row[key] = row[key] + " " + "CAMPO OBBLIGATORIO";
                                        columnErrorArray.push(changeStreet + space)
                                    } else {}
                                }
                            } else if (streetValue.length >= 256) {
                                const changeStreet = ['Street'];
                                for (let key of changeStreet) {
                                    if (row[key].length >= 256) {
                                        row[key] = row[key] + ":" + "VALORE TROPPO LUNGO";
                                        columnErrorArray.push(changeStreet + space)
                                    } else {}
                                }
                            } else {}
                            //AddressData_City
                            if (addressData_CityValue === "") {
                                for (let key of changeAddressData_City) {
                                    if (row[key] === "") {
                                        row[key] = row[key] + " " + "CAMPO OBBLIGATORIO";
                                        columnErrorArray.push(changeAddressData_City + space)
                                    } else {}
                                }
                                // } else if (addressData_CityValue.toString().charAt(0) != addressData_CityValue.toString().charAt(0).toUpperCase()) {
                                //     for (let key of changeAddressData_City) {
                                //         if (row[key].toString().charAt(0) != row[key].toString().charAt(0).toUpperCase()) {
                                //             row[key] = row[key] + " " + "IL VALORE DEVE COMINCIARE CON LA MAIUSCOLA";
                                //             columnErrorArray.push(changeAddressData_City + space)
                                //         } else {}
                                //     }
                            } else if (addressData_CityValue.length >= 41) {
                                const changeAddressData_City = ['AddressData_City'];
                                for (let key of changeAddressData_City) {
                                    if (row[key].length >= 41) {
                                        row[key] = row[key] + ":" + "VALORE TROPPO LUNGO";
                                        columnErrorArray.push(changeAddressData_City + space)
                                    } else {}
                                }
                            } else {}

                            //AddressData_PostalCode
                            if (billingData_National_IdentificationCountryIso2Value === "IT" && addressData_PostalCodeValue === "") {
                                for (let key of changeAddressData_PostalCode) {
                                    if (row[key] === "") {
                                        row[key] = row[key] + " " + "CAMPO OBBLIGATORIO";
                                        columnErrorArray.push(changeAddressData_PostalCode + space)
                                    } else {}
                                }
                            } else if (addressData_PostalCodeValue.length >= 21) {
                                for (let key of changeAddressData_PostalCode) {
                                    if (row[key].length >= 21) {
                                        row[key] = row[key] + ":" + "VALORE TROPPO LUNGO";
                                        columnErrorArray.push(changeAddressData_PostalCode + space)
                                    } else {}
                                }
                            } else {}

                            //AddressData_Province
                            // if (addressData_ProvinceValue != addressData_ProvinceValue.toUpperCase()) {
                            //     for (let key of changeAddressData_Province) {
                            //         if (row[key] != row[key].toUpperCase()) {
                            //             row[key] = row[key] + " " + "IL VALORE DEVE ESSERE IN MAIUSCOLO";
                            //             columnErrorArray.push(changeAddressData_Province + space)
                            //         } else {}
                            //     }
                            // } else
                            if (billingData_National_IdentificationCountryIso2Value === "IT" && addressData_ProvinceValue === "") {
                                for (let key of changeAddressData_Province) {
                                    if (row[key] === "") {
                                        row[key] = row[key] + " " + "CAMPO OBBLIGATORIO";
                                        columnErrorArray.push(changeAddressData_Province + space)
                                    } else {}
                                }
                                // } else if (addressData_ProvinceValue.toString().charAt(0) != addressData_ProvinceValue.toString().charAt(0).toUpperCase()) {
                                //     for (let key of changeAddressData_Province) {
                                //         if (row[key].toString().charAt(0) != row[key].toString().charAt(0).toUpperCase()) {
                                //             row[key] = row[key] + " " + "IL VALORE DEVE COMINCIARE CON LA MAIUSCOLA";
                                //             columnErrorArray.push(changeAddressData_Province + space)
                                //         } else {}
                                //     }
                            } else if (billingData_National_IdentificationCountryIso2Value === "IT" && addressData_ProvinceValue.length != 2) {
                                for (let key of changeAddressData_Province) {
                                    if (row[key].length != 2) {
                                        row[key] = row[key] + ":" + "LUNGHEZZA NON AMMESSA";
                                        columnErrorArray.push(changeAddressData_Province + space)
                                    } else {}
                                }
                            } else if (billingData_National_IdentificationCountryIso2Value != "IT" && addressData_ProvinceValue.length >= 81) {
                                for (let key of changeAddressData_Province) {
                                    if (row[key].length >= 81) {
                                        row[key] = row[key] + ":" + "LUNGHEZZA NON AMMESSA";
                                        columnErrorArray.push(changeAddressData_Province + space)
                                    } else {}
                                }
                            } else {}
                            //AddressData_Region
                            if (billingData_National_IdentificationCountryIso2Value === "IT" && addressData_RegionValue === "") {
                                for (let key of changeAddressData_Region) {
                                    if (row[key] === "") {
                                        row[key] = row[key] + " " + "CAMPO OBBLIGATORIO";
                                        columnErrorArray.push(changeAddressData_Region + space)
                                    } else {}
                                }
                                // } else if (addressData_RegionValue.toString().charAt(0) != addressData_RegionValue.toString().charAt(0).toUpperCase()) {
                                //     for (let key of changeAddressData_Region) {
                                //         if (row[key].toString().charAt(0) != row[key].toString().charAt(0).toUpperCase()) {
                                //             row[key] = row[key] + " " + "IL VALORE DEVE COMINCIARE CON LA MAIUSCOLA";
                                //             columnErrorArray.push(changeAddressData_Region + space)
                                //         } else {}
                                //     }
                            } else if (addressData_RegionValue.length >= 256) {
                                for (let key of changeAddressData_Region) {
                                    if (row[key].length >= 256) {
                                        row[key] = row[key] + ":" + "VALORE TROPPO LUNGO";
                                        columnErrorArray.push(changeAddressData_Region + space)
                                    } else {}
                                }
                            } else {}
                            //AddressData_State
                            if (addressData_StateValue === "") {
                                for (let key of changeAddressData_State) {
                                    if (row[key] === "") {
                                        row[key] = row[key] + " " + "CAMPO OBBLIGATORIO";
                                        columnErrorArray.push(changeAddressData_State + space)
                                    } else {}
                                }
                            } else if (addressData_StateValue.length >= 81) {
                                for (let key of changeAddressData_State) {
                                    if (row[key].length >= 81) {
                                        row[key] = row[key] + ":" + "VALORE TROPPO LUNGO";
                                        columnErrorArray.push(changeAddressData_State + space)
                                    } else {}
                                }
                            } else {}

                            //AddressData_ExternalSystemCode
                            if (shippingStreetValue != "" || shippingAddressData_CityValue != "" || shippingAddressData_PostalCodeValue != "" || shippingAddressData_ProvinceValue != "" || shippingAddressData_RegionValue != "" || shippingAddressData_StateValue != "" || shippingStateValue != "" && addressData_ExternalSystemCodeValue === "") {
                                for (let key of changeAddressData_ExternalSystemCode) {
                                    if (row[key] === "") {
                                        row[key] = row[key] + " " + "CAMPO OBBLIGATORIO";
                                        columnErrorArray.push(changeAddressData_ExternalSystemCode + space)
                                    } else {}
                                }
                            } else if (addressData_ExternalSystemCodeValue.length >= 241) {
                                for (let key of changeAddressData_ExternalSystemCode) {
                                    if (row[key].length >= 241) {
                                        row[key] = row[key] + ":" + "VALORE TROPPO LUNGO";
                                        columnErrorArray.push(changeAddressData_ExternalSystemCode + space)
                                    } else {}
                                }
                            } else {}
                            //Preferred
                            if (shippingStreetValue != "" && shippingAddressData_CityValue != "" && shippingAddressData_PostalCodeValue != "" && shippingAddressData_ProvinceValue != "" && shippingAddressData_RegionValue != "" && shippingAddressData_StateValue != "" && shippingStateValue != "" && preferredValue === "") {
                                for (let key of changePreferred) {
                                    if (row[key] === "") {
                                        row[key] = row[key] + " " + "CAMPO OBBLIGATORIO";
                                        columnErrorArray.push(changePreferred + space)
                                    } else {}
                                }
                            } else if (preferredValue != "T" && preferredValue != "F") {
                                for (let key of changePreferred) {
                                    if (row[key] != "T" || row[key] != "F") {
                                        row[key] = row[key] + ":" + "VALORI AMMESSI: 'T' o 'F'";
                                        columnErrorArray.push(changePreferred + space)
                                    } else {}
                                }
                            } else if (preferredValue.length >= 2) {
                                for (let key of changePreferred) {
                                    if (row[key].length >= 2) {
                                        row[key] = row[key] + ":" + "VALORE TROPPO LUNGO";
                                        columnErrorArray.push(changePreferred + space)
                                    } else {}
                                }
                            } else {}
                            //Shipping Street
                            if (shippingAddressData_CityValue != "" || shippingAddressData_PostalCodeValue != "" || shippingAddressData_ProvinceValue != "" || shippingAddressData_RegionValue != "" || shippingAddressData_StateValue != "" || shippingStateValue != "" || addressData_ExternalSystemCodeValue != "" && shippingStreetValue === "") {
                                for (let key of changeShippingStreet) {
                                    if (row[key] === "") {
                                        row[key] = row[key] + " " + "CAMPO OBBLIGATORIO";
                                        columnErrorArray.push(changeShippingStreet + space)
                                    } else {}
                                }
                            } else if (shippingStreetValue.length >= 256) {
                                for (let key of changeShippingStreet) {
                                    if (row[key].length >= 256) {
                                        row[key] = row[key] + ":" + "VALORE TROPPO LUNGO";
                                        columnErrorArray.push(changeShippingStreet + space)
                                    } else {}
                                }
                            } else {}

                            //Shipping AddressData_City
                            // if (shippingAddressData_CityValue.toString().charAt(0) != shippingAddressData_CityValue.toString().charAt(0).toUpperCase()) {
                            //     for (let key of changeShippingAddressData_City) {
                            //         if (row[key].toString().charAt(0) != row[key].toString().charAt(0).toUpperCase()) {
                            //             row[key] = row[key] + " " + "IL VALORE DEVE COMINCIARE CON LA MAIUSCOLA";
                            //             columnErrorArray.push(changeShippingAddressData_City + space)
                            //         } else {}
                            //     }
                            // } else 
                            if (shippingStreetValue != "" || shippingAddressData_PostalCodeValue != "" || shippingAddressData_ProvinceValue != "" || shippingAddressData_RegionValue != "" || shippingAddressData_StateValue != "" || shippingStateValue != "" || addressData_ExternalSystemCodeValue != "" && shippingAddressData_CityValue === "") {
                                for (let key of changeShippingAddressData_City) {
                                    if (row[key] === "") {
                                        row[key] = row[key] + " " + "CAMPO OBBLIGATORIO";
                                        columnErrorArray.push(changeShippingAddressData_City + space)
                                    } else {}
                                }
                            } else if (shippingAddressData_CityValue.length >= 41) {
                                for (let key of changeShippingAddressData_City) {
                                    if (row[key].length >= 41) {
                                        row[key] = row[key] + ":" + "VALORE TROPPO LUNGO";
                                        columnErrorArray.push(changeShippingAddressData_City + space)
                                    } else {}
                                }
                            } else {}

                            //Shipping AddressData_PostalCode
                            if (shippingStateValue === "IT" && shippingAddressData_PostalCodeValue === "") {
                                for (let key of changeShippingAddressData_PostalCode) {
                                    if (row[key] === "") {
                                        row[key] = row[key] + " " + "CAMPO OBBLIGATORIO";
                                        columnErrorArray.push(changeShippingAddressData_PostalCode + space)
                                    } else {}
                                }
                                // } else if (shippingStreetValue != "" || shippingAddressData_CityValue != "" || shippingAddressData_ProvinceValue != "" || shippingAddressData_RegionValue != "" || shippingAddressData_StateValue != "" || shippingStateValue === "IT" || addressData_ExternalSystemCodeValue != "" && shippingAddressData_PostalCodeValue === "") {
                                //     for (let key of changeShippingAddressData_PostalCode) {
                                //         if (row[key] === "") {
                                //             row[key] = row[key] + " " + "CAMPO OBBLIGATORIO";
                                //             columnErrorArray.push(changeShippingAddressData_PostalCode + space)
                                //         } else {}
                                //     }
                            } else if (shippingAddressData_PostalCodeValue.length >= 21) {
                                for (let key of changeShippingAddressData_PostalCode) {
                                    if (row[key].length >= 21) {
                                        row[key] = row[key] + ":" + "VALORE TROPPO LUNGO";
                                        columnErrorArray.push(changeShippingAddressData_PostalCode + space)
                                    } else {}
                                }
                            } else {}
                            //Shipping AddressData_Province
                            // if (shippingAddressData_ProvinceValue != shippingAddressData_ProvinceValue.toUpperCase()) {
                            //     for (let key of changeShippingAddressData_Province) {
                            //         if (row[key] != row[key].toUpperCase()) {
                            //             row[key] = row[key] + " " + "IL VALORE DEVE ESSERE IN MAIUSCOLO";
                            //             columnErrorArray.push(changeShippingAddressData_Province + space)
                            //         } else {}
                            //     }
                            // } else
                            if (shippingStateValue === "IT" && shippingAddressData_ProvinceValue === "") {
                                for (let key of changeShippingAddressData_Province) {
                                    if (row[key] === "") {
                                        row[key] = row[key] + " " + "CAMPO OBBLIGATORIO";
                                        columnErrorArray.push(changeShippingAddressData_Province + space)
                                    } else {}
                                }
                            } else if (shippingStreetValue != "" && shippingAddressData_CityValue != "" && shippingAddressData_PostalCodeValue != "" &&
                                shippingAddressData_RegionValue != "" && shippingAddressData_StateValue != "" && shippingStateValue === "IT" && shippingAddressData_ProvinceValue === "") {
                                for (let key of changeShippingAddressData_Province) {
                                    if (row[key] === "") {
                                        row[key] = row[key] + " " + "CAMPO OBBLIGATORIO";
                                        columnErrorArray.push(changeShippingAddressData_Province + space)
                                    } else {}
                                }
                            } else if (shippingStateValue === "IT" && shippingAddressData_ProvinceValue.length != 2) {
                                for (let key of changeShippingAddressData_Province) {
                                    if (row[key].length != 2) {
                                        row[key] = row[key] + ":" + "LLUNGHEZZA NON AMMESSA";
                                        columnErrorArray.push(changeShippingAddressData_Province + space)
                                    } else {}
                                }
                            } else {}
                            //Shipping AddressData_Region
                            if (shippingStateValue === "IT" && shippingAddressData_RegionValue === "") {
                                for (let key of changeShippingAddressData_Region) {
                                    if (row[key] === "") {
                                        row[key] = row[key] + " " + "CAMPO OBBLIGATORIO";
                                        columnErrorArray.push(changeShippingAddressData_Region + space)
                                    } else {}
                                }
                            } else if (shippingStreetValue != "" && shippingAddressData_CityValue != "" && shippingAddressData_PostalCodeValue != "" && shippingAddressData_ProvinceValue != "" && shippingAddressData_StateValue != "" && shippingStateValue === "IT" && shippingAddressData_RegionValue === "") {
                                for (let key of changeShippingAddressData_Region) {
                                    if (row[key] === "") {
                                        row[key] = row[key] + " " + "CAMPO OBBLIGATORIO";
                                        columnErrorArray.push(changechangeShippingAddressData_RegionName + space)
                                    } else {}
                                }

                            } else if (shippingAddressData_RegionValue.length >= 256) {
                                for (let key of changeShippingAddressData_Region) {
                                    if (row[key].length >= 256) {
                                        row[key] = row[key] + ":" + "VALORE TROPPO LUNGO";
                                        columnErrorArray.push(changeShippingAddressData_Region + space)
                                    } else {}
                                }
                            } else {}
                            //Shipping AddressData_State
                            if (shippingStreetValue != "" || shippingAddressData_CityValue != "" || shippingAddressData_PostalCodeValue != "" || shippingAddressData_ProvinceValue != "" || shippingAddressData_RegionValue != "" || shippingStateValue != "" || addressData_ExternalSystemCodeValue != "" && shippingAddressData_StateValue === "") {
                                for (let key of changeShippingAddressData_State) {
                                    if (row[key] === "") {
                                        row[key] = row[key] + " " + "CAMPO OBBLIGATORIO";
                                        columnErrorArray.push(changeShippingAddressData_State + space)
                                    } else {}
                                }
                            } else if (shippingAddressData_StateValue.length >= 81) {
                                for (let key of changeShippingAddressData_State) {
                                    if (row[key].length >= 81) {
                                        row[key] = row[key] + ":" + "VALORE TROPPO LUNGO";
                                        columnErrorArray.push(changeShippingAddressData_State + space)
                                    } else {}
                                }
                            } else {}

                            //Shipping State
                            if (shippingStreetValue != "" || shippingAddressData_CityValue != "" || shippingAddressData_PostalCodeValue != "" || shippingAddressData_ProvinceValue != "" || shippingAddressData_RegionValue != "" || shippingAddressData_StateValue != "" || addressData_ExternalSystemCodeValue != "" && shippingStateValue === "") {
                                for (let key of changeShippingState) {
                                    if (row[key] === "") {
                                        row[key] = row[key] + " " + "CAMPO OBBLIGATORIO";
                                        columnErrorArray.push(changeShippingState + space)
                                    } else {}
                                }
                            } else if (shippingStateValue.length >= 3) {
                                for (let key of changeShippingState) {
                                    if (row[key].length != 2) {
                                        row[key] = row[key] + ":" + "VALORE NON AMMESSO";
                                        columnErrorArray.push(changeShippingState + space)
                                    } else {}
                                }
                            } else {}

                            //Current Code Contact
                            if (currentCodeContactValue === "") {
                                for (let key of changeCurrentCodeContact) {
                                    if (row[key] === "") {
                                        row[key] = row[key] + " " + "CAMPO OBBLIGATORIO";
                                        columnErrorArray.push(changeCurrentCodeContact + space)
                                    } else {
                                        row[key] = row[key];
                                    }
                                }
                            } else {}


                            //First Name
                            if (firstNameValue === "") {
                                for (let key of changeFirstName) {
                                    if (row[key] === "") {
                                        row[key] = row[key] + " " + "CAMPO OBBLIGATORIO";
                                        columnErrorArray.push(changeFirstName + space)
                                    } else {
                                        row[key] = row[key];
                                    }
                                }
                            } else {}

                            //Last Name
                            if (lastNameValue === "") {
                                for (let key of changeLastName) {
                                    if (row[key] === "") {
                                        row[key] = row[key] + " " + "CAMPO OBBLIGATORIO";
                                        columnErrorArray.push(changeLastName + space)
                                    } else {
                                        row[key] = row[key];
                                    }
                                }
                            } else {}
                            //Email
                            if (emailValue === "") {
                                for (let key of changeEmail) {
                                    if (row[key] === "") {
                                        row[key] = row[key] + " " + "CAMPO OBBLIGATORIO";
                                        columnErrorArray.push(changeEmail + space)
                                    } else {
                                        row[key] = row[key];
                                    }
                                }
                            } else {}
                            //Telephone
                            // if (telephoneValue === "") {
                            //     for (let key of changeTelephone) {
                            //         if (row[key] === "") {
                            //             row[key] = row[key] + " " + "CAMPO OBBLIGATORIO";
                            //             columnErrorArray.push(changeTelephone +space)
                            //         } else {
                            //             row[key] = row[key];
                            //         }
                            //     }
                            // } else {
                            // }

                            createErrorList()

                        }

                        //CONDITIONALS ISCRIZIONE
                        function checkIscrizione() {
                            //DECLARE VARIABLES
                            //OACliente
                            var OAClienteValue = row['OACliente'];
                            const changeOACliente = ['OACliente'];
                            //SoldTo_CurrCode
                            var SoldTo_CurrCodevalue = row['SoldTo_CurrCode'];
                            const changeSoldTo_CurrCode = ['SoldTo_CurrCode'];
                            //BillTo_CurrCode
                            var BillTo_CurrCodeValue = row['BillTo_CurrCode'];
                            const changeBillTo_CurrCode = ['BillTo_CurrCode'];
                            //ShipTo_CurrCode
                            var ShipTo_CurrCodeValue = row['ShipTo_CurrCode'];
                            const changeShipTo_CurrCode = ['ShipTo_CurrCode'];
                            //Coexhibitor_ID
                            var Coexhibitor_IDValue = row['Coexhibitor_ID'];
                            const changeCoexhibitor_ID = ['Coexhibitor_ID'];
                            //OrderDate
                            var OrderDateValue = row['OrderDate'];
                            const changeOrderDate = ['OrderDate'];
                            //Services Paid by Consortium
                            var ServicesPaidbyConsortiumValue = row['Services Paid by Consortium'];
                            const changeServicesPaidbyConsortium = ['Services Paid by Consortium'];
                            //FairSector
                            var FairSectorvalue = row['FairSector'];
                            const changeFairSector = ['FairSector'];
                            //SquareMtBooked
                            var SquareMtBookedValue = row['SquareMtBooked'];
                            const changeSquareMtBooked = ['SquareMtBooked'];
                            //RegistrationItemCode
                            var RegistrationItemCodeValue = row['RegistrationItemCode'];
                            const changeRegistrationItemCode = ['RegistrationItemCode'];
                            //Unit Selling Price
                            var UnitSellingPriceValue = row['Unit Selling Price'];
                            const changeUnitSellingPrice = ['Unit Selling Price'];
                            //Main Event Rep
                            var MainEventRepValue = row['Main Event Rep'];
                            const changeMainEventRep = ['Main Event Rep'];
                            //Security Event Rep
                            var SecurityEventRepValue = row['Security Event Rep'];
                            const changeSecurityEventRep = ['Security Event Rep'];
                            //Logistics Event Rep
                            var LogisticsEventRepValue = row['Logistics Event Rep'];
                            const changeLogisticsEventRep = ['Logistics Event Rep'];
                            //Administrative Event Rep
                            var AdministrativeEventRepValue = row['Administrative Event Rep'];
                            const changeAdministrativeEventRep = ['Administrative Event Rep'];
                            //MER First Name
                            var MERFirstNameValue = row['MER First Name'];
                            const changeMERFirstName = ['MER First Name'];
                            //MER Last Name
                            var MERLastNameValue = row['MER Last Name'];
                            const changeMERLastName = ['MER Last Name'];
                            //MER Email
                            var MEREmailvalue = row['MER Email'];
                            const changeMEREmail = ['MER Email'];
                            //MER Telephone
                            var MERTelephoneValue = row['MER Telephone'];
                            const changeMERTelephone = ['MER Telephone'];
                            //SER First Name
                            var SERFirstNameValue = row['SER First Name'];
                            const changeSERFirstName = ['SER First Name'];
                            //SER Last Name
                            var SERLastNameValue = row['SER Last Name'];
                            const changeSERLastName = ['SER Last Name'];
                            //SER Email
                            var SEREmaiValue = row['SER Email'];
                            const changeSEREmai = ['SER Email'];
                            //SER Telephone
                            var SERTelephoneValue = row['SER Telephone'];
                            const changeSERTelephone = ['SER Telephone'];
                            //Logistics Event Rep Email
                            var LogisticsEventRepEmailValue = row['Logistics Event Rep Email'];
                            const changeLogisticsEventRepEmail = ['Logistics Event Rep Email'];
                            //Administrative Event Rep Email
                            var AdministrativeEventRepEmailValue = row['Administrative Event Rep Email'];
                            const changeAdministrativeEventRepEmail = ['Administrative Event Rep Email'];
                            //Brand
                            var BrandValue = row['Brand'];
                            const changeBrand = ['Brand'];
                            //VAT Free
                            var VATFreeValue = row['VAT Free'];
                            const changeVATFree = ['VAT Free'];
                            //CIG
                            var CIGValue = row['CIG'];
                            const changeCIG = ['CIG'];
                            //CUP
                            var CUPValue = row['CUP'];
                            const changeCUP = ['CUP'];
                            //CUD
                            var CUDValue = row['CUD'];
                            const changeCUD = ['CUD'];
                            //CUU
                            var CUUValue = row['CUU'];
                            const changeCUU = ['CUU'];
                            //PEC Email
                            var PECEmailValue = row['PEC Email'];
                            const changePECEmail = ['PEC Email'];
                            //Payment Code
                            var PaymentCodeValue = row['Payment Code'];
                            const changePaymentCode = ['Payment Code'];

                            //_____________________________________CREATE ERROR LIST IN HTML___________________________
                            var columnErrorArray = [];
                            errorGraphArray.push(columnErrorArray);
                            var space = " ";

                            function createErrorList() {
                                for (let i = 0; i < 1; i++) {
                                    let li = document.createElement('li');
                                    li.innerHTML = columnErrorArray
                                    columnError.append(li)

                                    if (li.innerHTML == "") {
                                        li.innerHTML = "NON CI SONO ERRORI &#x2713;"
                                        li.setAttribute('style', 'color: green');
                                        li.classList.remove('error');
                                        li.classList.add('correct');

                                    } else if (li.innerHTML != "") {
                                        li.setAttribute('style', 'color: red');
                                        li.classList.add('error');


                                    }
                                    // var errors = document.getElementsByClassName('error').length;
                                    // var correct = document.getElementsByClassName('correct').length;
                                    // const ctx = document.getElementById('barChart');
                                    // new Chart(ctx, {
                                    //     type: 'bar',
                                    //     data: {
                                    //         labels: ["Totale", 'Righe corrette', 'Righe in errore'],
                                    //         datasets: [{
                                    //             label: "Situazione del tracciato",
                                    //             data: [dataKeys, correct, errors],
                                    //             borderWidth: 1,
                                    //             backgroundColor: [
                                    //                 'lightgreen',
                                    //                 '#9bc5e4',
                                    //                 '#b91d47',

                                    //             ],
                                    //         }]
                                    //     },
                                    //     options: {
                                    //         scales: {
                                    //             yAxes: [{
                                    //                 ticks: {
                                    //                     beginAtZero: true
                                    //                 }
                                    //             }]
                                    //         }
                                    //     }
                                    // });

                                    // var xValues =  ['Righe corrette', 'Righe in errore'];
                                    // var yValues = [correct, errors];
                                    // var barColors = [
                                    //     "#9bc5e4",
                                    //     "#b91d47"
                                    // ];

                                    // new Chart("pieChart", {
                                    //     type: "pie",
                                    //     data: {
                                    //         labels: xValues,
                                    //         datasets: [{
                                    //             backgroundColor: barColors,
                                    //             data: yValues
                                    //         }]
                                    //     },
                                    //     options: {
                                    //         title: {
                                    //             display: true,
                                    //             text: "Rapporto errori:corretti"
                                    //         }
                                    //     }
                                    // });
                                }
                            }



                            // for (let a = 0; a < errori.length; a++) {
                            //         var x = [(errori.item(a)).innerHTML].toString();
                            //         var nErrori = x.length;
                            //         console.log(nErrori)
                            //     }
                            // var correct = document.getElementsByClassName('correct');

                            // for(let c = 0; c<correct.length; c++){
                            //     var y = [(correct.item(c)).innerHTML].toString();
                            //         var nCorrect = y.length;
                            //         console.log(nCorrect)

                            //     }

                            // var y = [];
                            // var errori = document.getElementsByClassName('list');
                            // for (let i = 0; i < errori.length; i++) {
                            //     var x = [(errori.item(i)).innerHTML].toString();
                            //     y.push(x)
                            // }
                            // var t = "NON CI SONO ERRORI ✓"
                            // if(t != x){
                            //     console.log(x);

                            // }else if(t==x){
                            //     console.log(x)
                            // }




                            //FIND DUPLICATES
                            // $(function () {
                            //     var tableRows = $("#table tr"); //find all the rows
                            //     var rowValues = []; //to keep track of which values appear more than once
                            //     tableRows.each(function () {
                            //         var rowValue = $(this).find(".td").html();
                            //         if (!rowValues[rowValue]) {
                            //             var rowComposite = new Object();
                            //             rowComposite.count = 0;
                            //             rowComposite.row = this;
                            //             rowValues[rowValue] = rowComposite;
                            //         } else {
                            //             var rowComposite = rowValues[rowValue];
                            //             if (rowComposite.count == 0) {
                            //                 $(rowComposite.row).addClass("border border-warning border-2");
                            //                 duplicates.innerHTML = "&#9888; Attenzione: Lo stesso OACliente è presente su più righe!"
                            //             }

                            //             $(this).addClass("border border-warning border-2");
                            //             rowComposite.count++;
                            //         }
                            //     });
                            // });


                            //______________________________________CONDITIONALS_____________________________________

                            //OACliente
                            if (OAClienteValue === "") {
                                for (let key of changeOACliente) {
                                    if (row[key] === "") {
                                        row[key] = row[key] + " " + "CAMPO OBBLIGATORIO";
                                        columnErrorArray.push(changeOACliente + space)

                                    } else {
                                        row[key] = row[key];
                                    }
                                }
                            } else if (OAClienteValue.length >= 26) {
                                for (let key of changeOACliente) {
                                    if (row[key].length >= 26) {
                                        row[key] = row[key] + ":" + "VALORE TROPPO LUNGO";
                                        columnErrorArray.push(changeOACliente + space)
                                    } else {
                                        row[key] = row[key];
                                    }
                                }
                            } else {}

                            //SoldTo_CurrCode
                            if (SoldTo_CurrCodevalue === "") {
                                for (let key of changeSoldTo_CurrCode) {
                                    if (row[key] === "") {
                                        row[key] = row[key] + " " + "CAMPO OBBLIGATORIO";
                                        columnErrorArray.push(changeSoldTo_CurrCode + space)

                                    } else {
                                        row[key] = row[key];
                                    }
                                }
                            } else if (SoldTo_CurrCodevalue.length >= 51) {
                                for (let key of changeSoldTo_CurrCode) {
                                    if (row[key].length >= 51) {
                                        row[key] = row[key] + ":" + "VALORE TROPPO LUNGO";
                                        (row[key]);
                                        columnErrorArray.push(changeSoldTo_CurrCode + space)
                                    } else {
                                        row[key] = row[key];
                                    }
                                }
                            } else {}

                            //BillTo_CurrCode
                            if (BillTo_CurrCodeValue === "") {
                                for (let key of changeBillTo_CurrCode) {
                                    if (row[key] === "") {
                                        row[key] = row[key] + " " + "CAMPO OBBLIGATORIO";
                                        columnErrorArray.push(changeBillTo_CurrCode + space)

                                    } else {
                                        row[key] = row[key];
                                    }
                                }
                            } else if (BillTo_CurrCodeValue.length >= 51) {
                                for (let key of changeBillTo_CurrCode) {
                                    if (row[key].length >= 51) {
                                        row[key] = row[key] + ":" + "VALORE TROPPO LUNGO";
                                        columnErrorArray.push(changeBillTo_CurrCode + space)
                                    } else {
                                        row[key] = row[key];
                                    }
                                }
                            } else {}

                            //ShipTo_CurrCode
                            if (ShipTo_CurrCodeValue === "") {
                                for (let key of changeShipTo_CurrCode) {
                                    if (row[key] === "") {
                                        row[key] = row[key] + " " + "CAMPO OBBLIGATORIO";
                                        columnErrorArray.push(changeShipTo_CurrCode + space)

                                    } else {
                                        row[key] = row[key];
                                    }
                                }
                            } else if (ShipTo_CurrCodeValue.length >= 51) {
                                for (let key of changeShipTo_CurrCode) {
                                    if (row[key].length >= 51) {
                                        row[key] = row[key] + ":" + "VALORE TROPPO LUNGO";
                                        columnErrorArray.push(changeShipTo_CurrCode + space)
                                    } else {
                                        row[key] = row[key];
                                    }
                                }
                            } else {}

                            //Coexhibitor_ID
                            if (Coexhibitor_IDValue.length >= 51) {
                                for (let key of changeCoexhibitor_ID) {
                                    if (row[key].length >= 51) {
                                        row[key] = row[key] + ":" + "VALORE TROPPO LUNGO";
                                        columnErrorArray.push(changeCoexhibitor_ID + space)
                                    } else {
                                        row[key] = row[key];
                                    }
                                }
                            } else {}

                            //OrderDate
                            var dateToString = OrderDateValue.toString();
                            var parts = dateToString.split("-");
                            var day = parseInt(parts[2], 10);
                            var month = parseInt(parts[1], 10);
                            var year = parseInt(parts[0], 10);
                            var yearS = year.toString();
                            var monthS = month.toString();
                            var dayS = day.toString();
                            var NaNCheck = yearS + monthS + dayS

                            if (OrderDateValue === "") {
                                for (let key of changeOrderDate) {
                                    if (row[key] === "") {
                                        row[key] = row[key] + " " + "CAMPO OBBLIGATORIO";
                                        columnErrorArray.push(changeOrderDate + space)

                                    } else {
                                        row[key] = row[key];
                                    }
                                }
                            } else if (yearS.length != 4 && monthS.length != 2 && dayS.length != 2) {
                                for (let key of changeOrderDate) {
                                    if (yearS.length != 4 && monthS.length != 2 && dayS.length != 2) {
                                        row[key] = row[key] + ":" + "VALORE NON AMMESSO";
                                        columnErrorArray.push(changeOrderDate + space)
                                    } else {
                                        row[key] = row[key];
                                    }
                                }
                            } else if (NaNCheck.match('NaN')) {
                                for (let key of changeOrderDate) {
                                    if (NaNCheck.match('NaN')) {
                                        row[key] = row[key] + ":" + "VALORE NON AMMESSO";
                                        columnErrorArray.push(changeOrderDate + space)
                                    } else {
                                        row[key] = row[key];
                                    }
                                }
                            } else {}

                            //Services Paid by Consortium
                            if (ServicesPaidbyConsortiumValue === "") {
                                for (let key of changeServicesPaidbyConsortium) {
                                    if (row[key] === "") {
                                        row[key] = row[key] + " " + "CAMPO OBBLIGATORIO";
                                        columnErrorArray.push(changeServicesPaidbyConsortium + space)

                                    } else {
                                        row[key] = row[key];
                                    }
                                }
                            } else if (ServicesPaidbyConsortiumValue.length >= 2) {
                                for (let key of changeServicesPaidbyConsortium) {
                                    if (row[key].length >= 2) {
                                        row[key] = row[key] + ":" + "VALORE TROPPO LUNGO";
                                        columnErrorArray.push(changeServicesPaidbyConsortium + space)
                                    } else {
                                        row[key] = row[key];
                                    }
                                }
                            } else if (ServicesPaidbyConsortiumValue != "T" && ServicesPaidbyConsortiumValue != "F") {
                                for (let key of changeServicesPaidbyConsortium) {
                                    if (row[key] != "T" || row[key] != "F") {
                                        row[key] = row[key] + ":" + "VALORI AMMESSI: 'T' o 'F'";
                                        columnErrorArray.push(changeServicesPaidbyConsortium + space)
                                    } else {}
                                }
                            } else {}

                            //FairSector
                            if (FairSectorvalue === "") {
                                for (let key of changeFairSector) {
                                    if (row[key] === "") {
                                        row[key] = row[key] + " " + "CAMPO OBBLIGATORIO";
                                        columnErrorArray.push(changeFairSector + space)

                                    } else {
                                        row[key] = row[key];
                                    }
                                }
                            } else if (FairSectorvalue.length >= 256) {
                                for (let key of changeFairSector) {
                                    if (row[key].length >= 256) {
                                        row[key] = row[key] + ":" + "VALORE TROPPO LUNGO";
                                        columnErrorArray.push(changeFairSector + space)
                                    } else {
                                        row[key] = row[key];
                                    }
                                }
                            } else {}

                            //SquareMtBooked
                            var numMT = SquareMtBookedValue.toString().split(".");
                            decimals = (numMT[numMT.length - 1]).toString();

                            if (SquareMtBookedValue === "") {
                                for (let key of changeSquareMtBooked) {
                                    if (row[key] === "") {
                                        row[key] = row[key] + " " + "CAMPO OBBLIGATORIO";
                                        columnErrorArray.push(changeSquareMtBooked + space)

                                    } else {
                                        row[key] = row[key];
                                    }
                                }
                            } else if (decimals.length != 2 || numMT.length != 2) {
                                for (let key of changeSquareMtBooked) {
                                    if (decimals.length != 2 || numMT.length != 2) {
                                        row[key] = row[key] + ":" + "IL VALORE DEVE ESSERE: '##.##'";
                                        columnErrorArray.push(changeSquareMtBooked + space)
                                    } else {
                                        row[key] = row[key];
                                    }
                                }
                            } else {}

                            //RegistrationItemCode
                            if (RegistrationItemCodeValue === "") {
                                for (let key of changeRegistrationItemCode) {
                                    if (row[key] === "") {
                                        row[key] = row[key] + " " + "CAMPO OBBLIGATORIO";
                                        columnErrorArray.push(changeRegistrationItemCode + space)

                                    } else {
                                        row[key] = row[key];
                                        ('OK')
                                    }
                                }
                            } else if (UnitSellingPriceValue === "00.00" && RegistrationItemCodeValue === "001") {
                                for (let key of changeRegistrationItemCode) {
                                    if (row[key] === "001") {
                                        row[key] = row[key] + " " + "VALORE NON AMMESSO";
                                        columnErrorArray.push(changeRegistrationItemCode + space)

                                    } else {
                                        row[key] = row[key];
                                        ('OK')
                                    }
                                }
                            } else if (UnitSellingPriceValue != "00.00" && RegistrationItemCodeValue === "001s") {
                                for (let key of changeRegistrationItemCode) {
                                    if (row[key] === "001s") {
                                        row[key] = row[key] + " " + "VALORE NON AMMESSO";
                                        columnErrorArray.push(changeRegistrationItemCode + space)

                                    } else {
                                        row[key] = row[key];
                                        ('OK')
                                    }
                                }
                            } else if (RegistrationItemCodeValue.length >= 5) {
                                for (let key of changeRegistrationItemCode) {
                                    if (row[key].length >= 5) {
                                        row[key] = row[key] + ":" + "VALORE TROPPO LUNGO";
                                        (row[key]);
                                        columnErrorArray.push(changeRegistrationItemCode + space)
                                    } else {
                                        row[key] = row[key];
                                        ('OK')
                                    }
                                }
                            } else if (RegistrationItemCodeValue != "001S" && RegistrationItemCodeValue != "001") {
                                for (let key of changeRegistrationItemCode) {
                                    if (row[key] != "T" || row[key] != "F") {
                                        row[key] = row[key] + ":" + "VALORI AMMESSI: '001S' o '001'";
                                        columnErrorArray.push(changeRegistrationItemCode + space)
                                    } else {
                                        ('OK')
                                    }
                                }
                            } else {
                                ('OK')
                            }

                            //Unit Selling Price
                            var numMUSP = UnitSellingPriceValue.toString().split(".");
                            decimals = (numMUSP[numMUSP.length - 1]).toString();
                            (numMUSP)

                            if (UnitSellingPriceValue === "") {
                                for (let key of changeUnitSellingPrice) {
                                    if (row[key] === "") {
                                        row[key] = row[key] + " " + "CAMPO OBBLIGATORIO";
                                        columnErrorArray.push(changeUnitSellingPrice + space)

                                    } else {
                                        row[key] = row[key];
                                        ('OK')
                                    }
                                }
                            } else if (decimals.length != 2 || numMUSP.length != 2) {
                                for (let key of changeUnitSellingPrice) {
                                    if (decimals.length != 2 || numMUSP.length != 2) {
                                        row[key] = row[key] + ":" + "IL VALORE DEVE ESSERE: '##.##'";
                                        (row[key]);
                                        columnErrorArray.push(changeUnitSellingPrice + space)
                                    } else {
                                        row[key] = row[key];
                                        ('OK')
                                    }
                                }
                            } else {
                                ('OK')
                            }

                            //__________________________________________________________________________________________________--
                            //Main Event Rep
                            // if (MainEventRepValue === "") {
                            //     for (let key of changeMainEventRep) {
                            //         if (row[key] === "") {
                            //             row[key] = row[key] + " " + "CAMPO OBBLIGATORIO";
                            //             columnErrorArray.push(changeMainEventRep + space)

                            //         } else {
                            //             row[key] = row[key];
                            //             ('OK')
                            //         }
                            //     }
                            // } else {
                            //     ('OK')
                            // }

                            // //Security Event Rep
                            // if (SecurityEventRepValue === "") {
                            //     for (let key of changeSecurityEventRep) {
                            //         if (row[key] === "") {
                            //             row[key] = row[key] + " " + "CAMPO OBBLIGATORIO";
                            //             columnErrorArray.push(changeSecurityEventRep + space)

                            //         } else {
                            //             row[key] = row[key];
                            //             ('OK')
                            //         }
                            //     }
                            // } else {
                            //     ('OK')
                            // }

                            // //Logistics Event Rep
                            // if (LogisticsEventRepValue === "") {
                            //     for (let key of changeLogisticsEventRep) {
                            //         if (row[key] === "") {
                            //             row[key] = row[key] + " " + "CAMPO OBBLIGATORIO";
                            //             columnErrorArray.push(changeLogisticsEventRep + space)

                            //         } else {
                            //             row[key] = row[key];
                            //             ('OK')
                            //         }
                            //     }
                            // } else {
                            //     ('OK')
                            // }

                            // //Administrative Event Rep
                            // if (AdministrativeEventRepValue === "") {
                            //     for (let key of changeAdministrativeEventRep) {
                            //         if (row[key] === "") {
                            //             row[key] = row[key] + " " + "CAMPO OBBLIGATORIO";
                            //             columnErrorArray.push(changeAdministrativeEventRep + space)

                            //         } else {
                            //             row[key] = row[key];
                            //             ('OK')
                            //         }
                            //     }
                            // } else {
                            //     ('OK')
                            // }

                            //______________________________________________________________________________________________________-
                            //MER First Name
                            if (MERFirstNameValue === "") {
                                for (let key of changeMERFirstName) {
                                    if (row[key] === "") {
                                        row[key] = row[key] + " " + "CAMPO OBBLIGATORIO";
                                        columnErrorArray.push(changeMERFirstName + space)

                                    } else {
                                        row[key] = row[key];
                                        ('OK')
                                    }
                                }
                                // } else if (MERFirstNameValue.length >= 26) {
                                //     for (let key of changeMERFirstName) {
                                //         if (row[key].length >= 26) {
                                //             row[key] = row[key] + ":" + "VALORE TROPPO LUNGO";
                                //             (row[key]);
                                //             columnErrorArray.push(changeMERFirstName + space)
                                //         } else {
                                //             row[key] = row[key];
                                //             ('OK')
                                //         }
                                //     }
                            } else {
                                ('OK')
                            }

                            ////MER Last Name
                            if (MERLastNameValue === "") {
                                for (let key of changeMERLastName) {
                                    if (row[key] === "") {
                                        row[key] = row[key] + " " + "CAMPO OBBLIGATORIO";
                                        columnErrorArray.push(changeMERLastName + space)

                                    } else {
                                        row[key] = row[key];
                                        ('OK')
                                    }
                                }
                                // } else if (MERLastNameValue.length >= 81) {
                                //     for (let key of changeMERLastName) {
                                //         if (row[key].length >= 81) {
                                //             row[key] = row[key] + ":" + "VALORE TROPPO LUNGO";
                                //             (row[key]);
                                //             columnErrorArray.push(changeMERLastName + space)
                                //         } else {
                                //             row[key] = row[key];
                                //             ('OK')
                                //         }
                                //     }
                            } else {
                                ('OK')
                            }

                            //MER Email
                            if (MEREmailvalue === "") {
                                for (let key of changeMEREmail) {
                                    if (row[key] === "") {
                                        row[key] = row[key] + " " + "CAMPO OBBLIGATORIO";
                                        columnErrorArray.push(changeMEREmail + space)

                                    } else {
                                        row[key] = row[key];
                                        ('OK')
                                    }
                                }
                                // } else if (MEREmailvalue.length >= 81) {
                                //     for (let key of changeMEREmail) {
                                //         if (row[key].length >= 81) {
                                //             row[key] = row[key] + ":" + "VALORE TROPPO LUNGO";
                                //             (row[key]);
                                //             columnErrorArray.push(changeMEREmail + space)
                                //         } else {
                                //             row[key] = row[key];
                                //             ('OK')
                                //         }
                                //     }
                            } else {
                                ('OK')
                            }

                            //MER Telephone
                            // if (MERTelephoneValue.length >= 41) {
                            //     for (let key of changeMERTelephone) {
                            //         if (row[key].length >= 41) {
                            //             row[key] = row[key] + ":" + "VALORE TROPPO LUNGO";
                            //             (row[key]);
                            //             columnErrorArray.push(changeMERTelephone + space)
                            //         } else {
                            //             row[key] = row[key];
                            //             ('OK')
                            //         }
                            //     }
                            // } else {
                            //     ('OK')
                            // }

                            //SER First Name
                            if (SERFirstNameValue === "") {
                                for (let key of changeSERFirstName) {
                                    if (row[key] === "") {
                                        row[key] = row[key] + " " + "CAMPO OBBLIGATORIO";
                                        columnErrorArray.push(changeSERFirstName + space)

                                    } else {
                                        row[key] = row[key];
                                        ('OK')
                                    }
                                }
                                // } else if (SERFirstNameValue.length >= 41) {
                                //     for (let key of changeSERFirstName) {
                                //         if (row[key].length >= 41) {
                                //             row[key] = row[key] + ":" + "VALORE TROPPO LUNGO";
                                //             (row[key]);
                                //             columnErrorArray.push(changeSERFirstName + space)
                                //         } else {
                                //             row[key] = row[key];
                                //             ('OK')
                                //         }
                                //     }
                            } else {
                                ('OK')
                            }

                            //SER Last Name
                            if (SERLastNameValue === "") {
                                for (let key of changeSERLastName) {
                                    if (row[key] === "") {
                                        row[key] = row[key] + " " + "CAMPO OBBLIGATORIO";
                                        columnErrorArray.push(changeSERLastName + space)

                                    } else {
                                        row[key] = row[key];
                                        ('OK')
                                    }
                                }
                                // } else if (SERLastNameValue.length >= 81) {
                                //     for (let key of changeSERLastName) {
                                //         if (row[key].length >= 81) {
                                //             row[key] = row[key] + ":" + "VALORE TROPPO LUNGO";
                                //             (row[key]);
                                //             columnErrorArray.push(changeSERLastName + space)
                                //         } else {
                                //             row[key] = row[key];
                                //             ('OK')
                                //         }
                                //     }
                            } else {
                                ('OK')
                            }

                            //SER Email
                            if (SEREmaiValue === "") {
                                for (let key of changeSEREmai) {
                                    if (row[key] === "") {
                                        row[key] = row[key] + " " + "CAMPO OBBLIGATORIO";
                                        columnErrorArray.push(changeSEREmai + space)

                                    } else {
                                        row[key] = row[key];
                                        ('OK')
                                    }
                                }
                                // } else if (SEREmaiValue.length >= 81) {
                                //     for (let key of changeSEREmai) {
                                //         if (row[key].length >= 81) {
                                //             row[key] = row[key] + ":" + "VALORE TROPPO LUNGO";
                                //             (row[key]);
                                //             columnErrorArray.push(changeSEREmai + space)
                                //         } else {
                                //             row[key] = row[key];
                                //             ('OK')
                                //         }
                                //     }
                            } else {
                                ('OK')
                            }

                            //SER Telephone
                            // if (SERTelephoneValue.length >= 41) {
                            //     for (let key of changeSERTelephone) {
                            //         if (row[key].length >= 41) {
                            //             row[key] = row[key] + ":" + "VALORE TROPPO LUNGO";
                            //             (row[key]);
                            //             columnErrorArray.push(changeSERTelephone + space)
                            //         } else {
                            //             row[key] = row[key];
                            //             ('OK')
                            //         }
                            //     }
                            // } else {
                            //     ('OK')
                            // }


                            //Logistics Event Rep Email
                            if (LogisticsEventRepEmailValue === "") {
                                for (let key of changeLogisticsEventRepEmail) {
                                    if (row[key] === "") {
                                        row[key] = row[key] + " " + "CAMPO OBBLIGATORIO";
                                        columnErrorArray.push(changeLogisticsEventRepEmail + space)

                                    } else {
                                        row[key] = row[key];
                                        ('OK')
                                    }
                                }
                                // } else if (LogisticsEventRepEmailValue.length >= 81) {
                                //     for (let key of changeLogisticsEventRepEmail) {
                                //         if (row[key].length >= 81) {
                                //             row[key] = row[key] + ":" + "VALORE TROPPO LUNGO";
                                //             (row[key]);
                                //             columnErrorArray.push(changeLogisticsEventRepEmail + space)
                                //         } else {
                                //             row[key] = row[key];
                                //             ('OK')
                                //         }
                                //     }
                            } else {
                                ('OK')
                            }
                            //Administrative Event Rep Email
                            if (AdministrativeEventRepEmailValue === "") {
                                for (let key of changeAdministrativeEventRepEmail) {
                                    if (row[key] === "") {
                                        row[key] = row[key] + " " + "CAMPO OBBLIGATORIO";
                                        columnErrorArray.push(changeAdministrativeEventRepEmail + space)

                                    } else {
                                        row[key] = row[key];
                                        ('OK')
                                    }
                                }
                                // } else if (AdministrativeEventRepEmailValue.length >= 81) {
                                //     for (let key of changeAdministrativeEventRepEmail) {
                                //         if (row[key].length >= 81) {
                                //             row[key] = row[key] + ":" + "VALORE TROPPO LUNGO";
                                //             (row[key]);
                                //             columnErrorArray.push(changeAdministrativeEventRepEmail + space)
                                //         } else {
                                //             row[key] = row[key];
                                //             ('OK')
                                //         }
                                //     }
                            } else {
                                ('OK')
                            }

                            //_____________________________________________________________________________________________-
                            //Brand
                            if (BrandValue.length >= 256) {
                                for (let key of changeBrand) {
                                    if (row[key].length >= 256) {
                                        row[key] = row[key] + ":" + "VALORE TROPPO LUNGO";
                                        (row[key]);
                                        columnErrorArray.push(changeBrand + space)
                                    } else {
                                        row[key] = row[key];
                                        ('OK')
                                    }
                                }
                            } else {
                                ('OK')
                            }

                            //VAT Free
                            if (VATFreeValue === "") {
                                for (let key of changeVATFree) {
                                    if (row[key] === "") {
                                        row[key] = row[key] + " " + "CAMPO OBBLIGATORIO";
                                        columnErrorArray.push(changeVATFree + space)

                                    } else {
                                        row[key] = row[key];
                                        ('OK')
                                    }
                                }
                            } else if (VATFreeValue.length >= 2) {
                                for (let key of changeVATFree) {
                                    if (row[key].length >= 2) {
                                        row[key] = row[key] + ":" + "VALORE TROPPO LUNGO";
                                        (row[key]);
                                        columnErrorArray.push(changeVATFree + space)
                                    } else {
                                        row[key] = row[key];
                                        ('OK')
                                    }
                                }
                            } else if (VATFreeValue != "T" && VATFreeValue != "F") {
                                for (let key of changeVATFree) {
                                    if (row[key] != "T" || row[key] != "F") {
                                        row[key] = row[key] + ":" + "VALORI AMMESSI: 'T' o 'F'";
                                        columnErrorArray.push(changeVATFree + space)
                                    } else {
                                        ('OK')
                                    }
                                }
                            } else {
                                ('OK')
                            }


                            //CIG
                            if (CIGValue.length >= 11) {
                                for (let key of changeCIG) {
                                    if (row[key].length >= 11) {
                                        row[key] = row[key] + ":" + "VALORE TROPPO LUNGO";
                                        (row[key]);
                                        columnErrorArray.push(changeCIG + space)
                                    } else {
                                        row[key] = row[key];
                                        ('OK')
                                    }
                                }
                            } else {
                                ('OK')
                            }
                            //CUP
                            if (CUPValue.length >= 16) {
                                for (let key of changeCUP) {
                                    if (row[key].length >= 16) {
                                        row[key] = row[key] + ":" + "VALORE TROPPO LUNGO";
                                        (row[key]);
                                        columnErrorArray.push(changeCUP + space)
                                    } else {
                                        row[key] = row[key];
                                        ('OK')
                                    }
                                }
                            } else {
                                ('OK')
                            }

                            //CUD
                            // if (BillingData_National_IdentificationCountryIso2==="IT" && CUDValue === "") {
                            //     for (let key of changeCUD) {
                            //         if (row[key] === "") {
                            //             row[key] = row[key] + " " + "CAMPO OBBLIGATORIO";
                            //             columnErrorArray.push(changeCUD + space)

                            //         } else {
                            //             row[key] = row[key];
                            //             ('OK')
                            //         }
                            //     }
                            // } else if (BillingData_National_IdentificationCountryIso2==="IT" && CUDValue.length != 7) {
                            //     for (let key of changeCUD) {
                            //         if (row[key].length !=7) {
                            //             row[key] = row[key] + ":" + "VALORE TROPPO LUNGO";
                            //             (row[key]);
                            //             columnErrorArray.push(changeCUD + space)
                            //         } else {
                            //             row[key] = row[key];
                            //             ('OK')
                            //         }
                            //     }
                            // } else {
                            //     ('OK')
                            // }

                            //CUU
                            if (CUUValue.length >= 7) {
                                for (let key of changeCUU) {
                                    if (row[key].length >= 7) {
                                        row[key] = row[key] + ":" + "VALORE TROPPO LUNGO";
                                        (row[key]);
                                        columnErrorArray.push(changeCUU + space)
                                    } else {
                                        row[key] = row[key];
                                        ('OK')
                                    }
                                }
                            } else {
                                ('OK')
                            }

                            //PEC Email has NO CONDITIONS

                            //Payment Code
                            if (PaymentCodeValue.length >= 101) {
                                for (let key of changePaymentCode) {
                                    if (row[key].length >= 101) {
                                        row[key] = row[key] + ":" + "VALORE TROPPO LUNGO";
                                        (row[key]);
                                        columnErrorArray.push(changePaymentCode + space)
                                    } else {
                                        row[key] = row[key];
                                        ('OK')
                                    }
                                }
                            } else {
                                ('OK')
                            }
                            createErrorList()
                        }

                        function checkNotifica() {
                            //____________________________VARIABLES
                            //OACustomer
                            var OACustomerValue = row["OACustomer"];
                            const changeOACustomer = ["OACustomer"];
                            //NoteDesc
                            var NoteDescValue = row["NoteDesc"];
                            const changeNoteDesc = ["NoteDesc"];
                            //NumStandOpenSides
                            var NumStandOpenSidesValue = row["NumStandOpenSides"];
                            const changeNumStandOpenSides = ["NumStandOpenSides"];
                            //Stand
                            var StandValue = row["Stand"];
                            const changeStand = ["Stand"];
                            //FairSector
                            var FairSectorValue = row["FairSector"];
                            const changeFairSector = ["FairSector"];
                            //HallCode
                            var HallCodeValue = row["HallCode"];
                            const changeHallCode = ["HallCode"];
                            //Aisle
                            var AisleValue = row["Aisle"];
                            const changeAisle = ["Aisle"];
                            //Saloon
                            var SaloonValue = row["Saloon"];
                            const changeSaloon = ["Saloon"];
                            //SquareMtAssigned
                            var SquareMtAssignedValue = row["SquareMtAssigned"];
                            const changeSquareMtAssigned = ["SquareMtAssigned"];
                            //Main Event Rep
                            var MainEventRepValue = row["Main Event Rep"];
                            const changeMainEventRep = ["Main Event Rep"];
                            //Security Event Rep
                            var SecurityEventRepValue = row["Security Event Rep"];
                            const changeSecurityEventRep = ["Security Event Rep"];
                            //Logistics Event Rep
                            var LogisticsEventRepValue = row["Logistics Event Rep"];
                            const changeLogisticsEventRep = ["Logistics Event Rep"];
                            //Administrative Event Rep
                            var AdministrativeEventRepValue = row["Administrative Event Rep"];
                            const changeAdministrativeEventRep = ["Administrative Event Rep"];
                            //Services Paid by Consortium
                            var ServicesPaidbyConsortiumValue = row["Services Paid by Consortium"];
                            const changeServicesPaidbyConsortium = ["Services Paid by Consortium"];
                            //Order Date
                            var OrderDateValue = row["Order Date"];
                            const changeOrderDate = ["Order Date"];
                            //Brand
                            var BrandValue = row["Brand"];
                            const changeBrand = ["Brand"];
                            //VAT Free
                            var VATFreeValue = row["VAT Free"];
                            const changeVATFree = ["VAT Free"];
                            //Total Price
                            var TotalPriceValue = row["Total Price"];
                            const changeTotalPrice = ["Total Price"];
                            //Quantity
                            var QuantityValue = row["Quantity"];
                            const changeQuantity = ["Quantity"];
                            //Operation
                            var OperationValue = row["Operation"];
                            const changeOperation = ["Operation"];
                            //Order Line ID
                            var OrderLineIDValue = row["Order Line ID"];
                            const changeOrderLineID = ["Order Line ID"];
                            //Product Code
                            var ProductCodeValue = row["Product Code"];
                            const changeProductCode = ["Product Code"];
                            //Unit Price
                            var UnitPriceValue = row["Unit Price"];
                            const changeUnitPrice = ["Unit Price"];

                            //____________________________ERROR LIST

                            var columnErrorArray = []
                            errorGraphArray.push(columnErrorArray);
                            var space = " ";

                            function createErrorList() {
                                for (let i = 0; i < 1; i++) {
                                    let li = document.createElement('li');
                                    li.innerHTML = columnErrorArray
                                    li.setAttribute('style', 'color: red')
                                    columnError.append(li)
                                    if (li.innerHTML == "") {
                                        li.innerHTML = "NON CI SONO ERRORI &#x2713;"
                                        li.setAttribute('style', 'color: green')
                                    }
                                }
                            }


                            //____________________CONDITIONALS
                            //OACustomer
                            if (OACustomerValue === "") {
                                for (let key of changeOACustomer) {
                                    if (row[key] === "") {
                                        row[key] = row[key] + " " + "CAMPO OBBLIGATORIO";
                                        columnErrorArray.push(changeOACustomer + space)

                                    } else {
                                        row[key] = row[key];
                                        ('OK')
                                    }
                                }
                            } else if (OACustomerValue.length >= 26) {
                                for (let key of changeOACustomer) {
                                    if (row[key].length >= 26) {
                                        row[key] = row[key] + ":" + "VALORE TROPPO LUNGO";
                                        (row[key]);
                                        columnErrorArray.push(changeOACustomer + space)
                                    } else {
                                        row[key] = row[key];
                                        ('OK')
                                    }
                                }
                            } else {
                                ('OK')
                            }

                            //NoteDesc
                            if (NoteDescValue.length >= 256) {
                                for (let key of changeNoteDesc) {
                                    if (row[key].length >= 256) {
                                        row[key] = row[key] + ":" + "VALORE TROPPO LUNGO";
                                        (row[key]);
                                        columnErrorArray.push(changeNoteDesc + space)
                                    } else {
                                        row[key] = row[key];
                                        ('OK')
                                    }
                                }
                            } else {
                                ('OK')
                            }

                            //NumStandOpenSides
                            if (NumStandOpenSidesValue === "") {
                                for (let key of changeNumStandOpenSides) {
                                    if (row[key] === "") {
                                        row[key] = row[key] + " " + "CAMPO OBBLIGATORIO";
                                        columnErrorArray.push(changeNumStandOpenSides + space)

                                    } else {
                                        row[key] = row[key];
                                        ('OK')
                                    }
                                }
                            } else if (NumStandOpenSidesValue.length != 1) {
                                for (let key of changeNumStandOpenSides) {
                                    if (row[key].length != 1) {
                                        row[key] = row[key] + ":" + "VALORE TROPPO LUNGO";
                                        (row[key]);
                                        columnErrorArray.push(changeNumStandOpenSides + space)
                                    } else {
                                        row[key] = row[key];
                                        ('OK')
                                    }
                                }
                            } else if (NumStandOpenSidesValue != 1 && NumStandOpenSidesValue != 2 && NumStandOpenSidesValue != 3 && NumStandOpenSidesValue != 4) {
                                for (let key of changeNumStandOpenSides) {
                                    if (row[key] != 1 && row[key] != 2 && row[key] != 3 && row[key] != 4) {
                                        row[key] = row[key] + ":" + "VALORE NON AMMESSO";
                                        (row[key]);
                                        columnErrorArray.push(changeNumStandOpenSides + space)
                                    } else {
                                        row[key] = row[key];
                                        ('OK')
                                    }
                                }
                            } else {
                                ('OK')
                            }

                            //Stand
                            if (StandValue === "") {
                                for (let key of changeStand) {
                                    if (row[key] === "") {
                                        row[key] = row[key] + " " + "CAMPO OBBLIGATORIO";
                                        columnErrorArray.push(changeStand + space)

                                    } else {
                                        row[key] = row[key];
                                        ('OK')
                                    }
                                }
                            } else if (StandValue.length >= 51) {
                                for (let key of changeStand) {
                                    if (row[key].length >= 51) {
                                        row[key] = row[key] + ":" + "VALORE TROPPO LUNGO";
                                        (row[key]);
                                        columnErrorArray.push(changeStand + space)
                                    } else {
                                        row[key] = row[key];
                                        ('OK')
                                    }
                                }
                            } else {
                                ('OK')
                            }

                            //FairSector
                            if (FairSectorValue === "") {
                                for (let key of changeFairSector) {
                                    if (row[key] === "") {
                                        row[key] = row[key] + " " + "CAMPO OBBLIGATORIO";
                                        (row[key]);
                                        columnErrorArray.push(changeFairSector + space)
                                    } else {
                                        row[key] = row[key];
                                        ('OK')
                                    }
                                }

                            } else if (FairSectorValue.length >= 256) {
                                for (let key of changeFairSector) {
                                    if (row[key].length >= 256) {
                                        row[key] = row[key] + ":" + "VALORE TROPPO LUNGO";
                                        (row[key]);
                                        columnErrorArray.push(changeFairSector + space)
                                    } else {
                                        row[key] = row[key];
                                        ('OK')
                                    }
                                }
                            } else {
                                ('OK')
                            }

                            //HallCode
                            if (HallCodeValue === "") {
                                for (let key of changeHallCode) {
                                    if (row[key] === "") {
                                        row[key] = row[key] + " " + "CAMPO OBBLIGATORIO";
                                        columnErrorArray.push(changeHallCode + space)

                                    } else {
                                        row[key] = row[key];
                                        ('OK')
                                    }
                                }
                            } else if (HallCodeValue.length >= 101) {
                                for (let key of changeHallCode) {
                                    if (row[key].length >= 101) {
                                        row[key] = row[key] + ":" + "VALORE TROPPO LUNGO";
                                        (row[key]);
                                        columnErrorArray.push(changeHallCode + space)
                                    } else {
                                        row[key] = row[key];
                                        ('OK')
                                    }
                                }
                            } else {
                                ('OK')
                            }

                            //Aisle
                            var numA = AisleValue.toString().split(".");
                            decimals = (numA[numA.length - 1]).toString();
                            (numA)
                            if (AisleValue.length >= 17 || numA.length != 1) {
                                for (let key of changeAisle) {
                                    if (row[key].length >= 17 || numA.length != 1) {
                                        row[key] = row[key] + ":" + "VALORE NON AMMESSO";
                                        (row[key]);
                                        columnErrorArray.push(changeAisle + space)
                                    } else {
                                        row[key] = row[key];
                                        ('OK')
                                    }
                                }
                            } else {
                                ('OK')
                            }

                            //Saloon
                            if (SaloonValue === "") {
                                for (let key of changeSaloon) {
                                    if (row[key] === "") {
                                        row[key] = row[key] + " " + "CAMPO OBBLIGATORIO";
                                        columnErrorArray.push(changeSaloon + space)

                                    } else {
                                        row[key] = row[key];
                                        ('OK')
                                    }
                                }
                            } else if (SaloonValue.length != 1) {
                                for (let key of changeSaloon) {
                                    if (row[key].length != 1) {
                                        row[key] = row[key] + ":" + "VALORE TROPPO LUNGO";
                                        (row[key]);
                                        columnErrorArray.push(changeSaloon + space)
                                    } else {
                                        row[key] = row[key];
                                        ('OK')
                                    }
                                }
                            } else if (SaloonValue != 1 && SaloonValue != 2) {
                                for (let key of changeSaloon) {
                                    if (row[key] != 1 && row[key] != 2) {
                                        row[key] = row[key] + ":" + "VALORE AMMESSI: '1' o '2'";
                                        (row[key]);
                                        columnErrorArray.push(changeSaloon + space)
                                    } else {
                                        row[key] = row[key];
                                        ('OK')
                                    }
                                }
                            } else {
                                ('OK')
                            }

                            //SquareMtAssigned
                            var numSQMT = SquareMtAssignedValue.toString().split(".");
                            var decimals = (numSQMT[numSQMT.length - 1]).toString();
                            var decas = (numSQMT[numSQMT.length - 2]).toString();

                            if (SquareMtAssignedValue === "") {
                                for (let key of changeSquareMtAssigned) {
                                    if (row[key] === "") {
                                        row[key] = row[key] + " " + "CAMPO OBBLIGATORIO";
                                        columnErrorArray.push(changeSquareMtAssigned + space)

                                    } else {
                                        row[key] = row[key];
                                        ('OK')
                                    }
                                }
                            } else if (SquareMtAssignedValue.length >= 17) {
                                for (let key of changeSquareMtAssigned) {
                                    if (row[key].length >= 17) {
                                        row[key] = row[key] + ":" + "VALORE TROPPO LUNGO";
                                        (row[key]);
                                        columnErrorArray.push(changeSquareMtAssigned + space)
                                    } else {
                                        row[key] = row[key];
                                        ('OK')
                                    }
                                }
                            } else if (decas.length < 1 || decimals.length != 2 || numSQMT.length != 2) {
                                for (let key of changeSquareMtAssigned) {
                                    if (decas.length < 1 || decimals.length != 2 || numSQMT.length != 2) {
                                        row[key] = row[key] + ":" + "IL VALORE DEVE ESSERE: '##.##'";
                                        (row[key]);
                                        columnErrorArray.push(changeSquareMtAssigned + space)
                                    } else {
                                        row[key] = row[key];
                                        ('OK')
                                    }
                                }
                            } else {
                                ('OK')
                            }

                            //Main Event Rep
                            // if (MainEventRepValue === "") {
                            //     for (let key of changeMainEventRep) {
                            //         if (row[key] === "") {
                            //             row[key] = row[key] + " " + "CAMPO OBBLIGATORIO";
                            //             columnErrorArray.push(changeMainEventRep + space)

                            //         } else {
                            //             row[key] = row[key];
                            //             ('OK')
                            //         }
                            //     }
                            // } else {
                            //     ('OK')
                            // }
                            //Security Event Rep
                            // if (SecurityEventRepValue === "") {
                            //     for (let key of changeSecurityEventRep) {
                            //         if (row[key] === "") {
                            //             row[key] = row[key] + " " + "CAMPO OBBLIGATORIO";
                            //             columnErrorArray.push(changeSecurityEventRep + space)

                            //         } else {
                            //             row[key] = row[key];
                            //             ('OK')
                            //         }
                            //     }
                            // } else {
                            //     ('OK')
                            // }
                            //Logistics Event Rep
                            // if (LogisticsEventRepValue === "") {
                            //     for (let key of changeLogisticsEventRep) {
                            //         if (row[key] === "") {
                            //             row[key] = row[key] + " " + "CAMPO OBBLIGATORIO";
                            //             columnErrorArray.push(changeLogisticsEventRep + space)

                            //         } else {
                            //             row[key] = row[key];
                            //             ('OK')
                            //         }
                            //     }
                            // } else {
                            //     ('OK')
                            // }
                            //Administrative Event Rep
                            // if (AdministrativeEventRepValue === "") {
                            //     for (let key of changeAdministrativeEventRep) {
                            //         if (row[key] === "") {
                            //             row[key] = row[key] + " " + "CAMPO OBBLIGATORIO";
                            //             columnErrorArray.push(changeAdministrativeEventRep + space)

                            //         } else {
                            //             row[key] = row[key];
                            //             ('OK')
                            //         }
                            //     }
                            // } else {
                            //     ('OK')
                            // }


                            //Services Paid by Consortium
                            if (ServicesPaidbyConsortiumValue === "") {
                                for (let key of changeServicesPaidbyConsortium) {
                                    if (row[key] === "") {
                                        row[key] = row[key] + " " + "CAMPO OBBLIGATORIO";
                                        columnErrorArray.push(changeServicesPaidbyConsortium + space)

                                    } else {
                                        row[key] = row[key];
                                        ('OK')
                                    }
                                }
                            } else if (ServicesPaidbyConsortiumValue.length >= 2) {
                                for (let key of changeServicesPaidbyConsortium) {
                                    if (row[key].length >= 2) {
                                        row[key] = row[key] + ":" + "VALORE TROPPO LUNGO";
                                        (row[key]);
                                        columnErrorArray.push(changeServicesPaidbyConsortium + space)
                                    } else {
                                        row[key] = row[key];
                                        ('OK')
                                    }
                                }
                            } else if (ServicesPaidbyConsortiumValue != "T" && ServicesPaidbyConsortiumValue != "F") {
                                for (let key of changeServicesPaidbyConsortium) {
                                    if (row[key] != "T" || row[key] != "F") {
                                        row[key] = row[key] + ":" + "VALORI AMMESSI: 'T' o 'F'";
                                        columnErrorArray.push(changeServicesPaidbyConsortium + space)
                                    } else {
                                        ('OK')
                                    }
                                }
                            } else {
                                ('OK')
                            }

                            //Order Date
                            var dateToString = OrderDateValue.toString();
                            var parts = dateToString.split("-");
                            var day = parseInt(parts[2], 10);
                            var month = parseInt(parts[1], 10);
                            var year = parseInt(parts[0], 10);
                            var yearS = year.toString();
                            var monthS = month.toString();
                            var dayS = day.toString();
                            var NaNCheck = yearS + monthS + dayS;
                            (yearS.length, monthS.length, dayS.length)


                            if (OrderDateValue === "") {
                                for (let key of changeOrderDate) {
                                    if (row[key] === "") {
                                        row[key] = row[key] + " " + "CAMPO OBBLIGATORIO";
                                        columnErrorArray.push(changeOrderDate + space)

                                    } else {
                                        row[key] = row[key];
                                        ('OK')
                                    }
                                }
                            } else if (yearS.length != 4 && monthS.length != 2 && dayS.length != 2) {
                                for (let key of changeOrderDate) {
                                    if (yearS.length != 4 && monthS.length != 2 && dayS.length != 2) {
                                        row[key] = row[key] + ":" + "VALORE NON AMMESSO";
                                        (row[key]);
                                        columnErrorArray.push(changeOrderDate + space)
                                    } else {
                                        row[key] = row[key];
                                        ('OK')
                                    }
                                }
                            } else if (NaNCheck.match('NaN')) {
                                for (let key of changeOrderDate) {
                                    if (NaNCheck.match('NaN')) {
                                        row[key] = row[key] + ":" + "VALORE NON AMMESSO";
                                        (row[key]);
                                        columnErrorArray.push(changeOrderDate + space)
                                    } else {
                                        row[key] = row[key];
                                        ('OK')
                                    }
                                }
                            } else {
                                ('OK')
                            }

                            //Brand
                            if (BrandValue.length >= 256) {
                                for (let key of changeBrand) {
                                    if (row[key].length >= 256) {
                                        row[key] = row[key] + ":" + "VALORE TROPPO LUNGO";
                                        (row[key]);
                                        columnErrorArray.push(changeBrand + space)
                                    } else {
                                        row[key] = row[key];
                                        ('OK')
                                    }
                                }
                            } else {
                                ('OK')
                            }

                            //VAT Free
                            if (VATFreeValue === "") {
                                for (let key of changeVATFree) {
                                    if (row[key] === "") {
                                        row[key] = row[key] + " " + "CAMPO OBBLIGATORIO";
                                        columnErrorArray.push(changeVATFree + space)

                                    } else {
                                        row[key] = row[key];
                                        ('OK')
                                    }
                                }
                            } else if (VATFreeValue.length >= 2) {
                                for (let key of changeVATFree) {
                                    if (row[key].length >= 2) {
                                        row[key] = row[key] + ":" + "VALORE TROPPO LUNGO";
                                        (row[key]);
                                        columnErrorArray.push(changeVATFree + space)
                                    } else {
                                        row[key] = row[key];
                                        ('OK')
                                    }
                                }
                            } else if (VATFreeValue != "T" && VATFreeValue != "F") {
                                for (let key of changeVATFree) {
                                    if (row[key] != "T" || row[key] != "F") {
                                        row[key] = row[key] + ":" + "VALORI AMMESSI: 'T' o 'F'";
                                        columnErrorArray.push(changeVATFree + space)
                                    } else {
                                        ('OK')
                                    }
                                }
                            } else {
                                ('OK')
                            }

                            //Total Price
                            var numTP = TotalPriceValue.toString().split(".");
                            decimals = (numTP[numTP.length - 1]).toString();
                            var decas = (numTP[numTP.length - 2]).toString();

                            if (TotalPriceValue === "") {
                                for (let key of changeTotalPrice) {
                                    if (row[key] === "") {
                                        row[key] = row[key] + " " + "CAMPO OBBLIGATORIO";
                                        columnErrorArray.push(changeTotalPrice + space)

                                    } else {
                                        row[key] = row[key];
                                        ('OK')
                                    }
                                }
                            } else if (TotalPriceValue.length >= 17) {
                                for (let key of changeTotalPrice) {
                                    if (row[key].length >= 17) {
                                        row[key] = row[key] + ":" + "VALORE TROPPO LUNGO";
                                        (row[key]);
                                        columnErrorArray.push(changeTotalPrice + space)
                                    } else {
                                        row[key] = row[key];
                                        ('OK')
                                    }
                                }
                            } else if (decas.length < 1 || decimals.length != 2 || numTP.length != 2) {
                                for (let key of changeTotalPrice) {
                                    if (decas.length < 1 || decimals.length != 2 || numTP.length != 2) {
                                        row[key] = row[key] + ":" + "IL VALORE DEVE ESSERE: '##.##'";
                                        (row[key]);
                                        columnErrorArray.push(changeTotalPrice + space)
                                    } else {
                                        row[key] = row[key];
                                        ('OK')
                                    }
                                }
                            } else {
                                ('OK')
                            }

                            //Quantity
                            var numQ = QuantityValue.toString().split(".");
                            decimals = (numQ[numQ.length - 1]).toString();
                            (numQ)

                            if (QuantityValue === "") {
                                for (let key of changeQuantity) {
                                    if (row[key] === "") {
                                        row[key] = row[key] + " " + "CAMPO OBBLIGATORIO";
                                        columnErrorArray.push(changeQuantity + space)

                                    } else {
                                        row[key] = row[key];
                                        ('OK')
                                    }
                                }
                            } else if (QuantityValue.length >= 17) {
                                for (let key of changeQuantity) {
                                    if (row[key].length >= 17) {
                                        row[key] = row[key] + ":" + "VALORE TROPPO LUNGO";
                                        (row[key]);
                                        columnErrorArray.push(changeQuantity + space)
                                    } else {
                                        row[key] = row[key];
                                        ('OK')
                                    }
                                }
                            } else if (decimals.length != 2 || numQ.length != 2) {
                                for (let key of changeQuantity) {
                                    if (decimals.length != 2 || numQ.length != 2) {
                                        row[key] = row[key] + ":" + "IL VALORE DEVE ESSERE: '##.##'";
                                        (row[key]);
                                        columnErrorArray.push(changeQuantity + space)
                                    } else {
                                        row[key] = row[key];
                                        ('OK')
                                    }
                                }
                            } else {
                                ('OK')
                            }


                            //Operation
                            if (OperationValue === "") {
                                for (let key of changeOperation) {
                                    if (row[key] === "") {
                                        row[key] = row[key] + " " + "CAMPO OBBLIGATORIO";
                                        columnErrorArray.push(changeOperation + space)

                                    } else {
                                        row[key] = row[key];
                                        ('OK')
                                    }
                                }
                            } else if (OperationValue != "NEWLINE" && OperationValue != "CANLINE") {
                                for (let key of changeOperation) {
                                    if (row[key] != "T" || row[key] != "F") {
                                        row[key] = row[key] + ":" + "VALORI AMMESSI: 'NEWLINE' o 'CANLINE'";
                                        columnErrorArray.push(changeOperation + space)
                                    } else {
                                        ('OK')
                                    }
                                }
                            } else {
                                ('OK')
                            }

                            //Order Line ID
                            if (OrderLineIDValue === "") {
                                for (let key of changeOrderLineID) {
                                    if (row[key] === "") {
                                        row[key] = row[key] + " " + "CAMPO OBBLIGATORIO";
                                        columnErrorArray.push(changeOrderLineID + space)

                                    } else {
                                        row[key] = row[key];
                                        ('OK')
                                    }
                                }
                            } else if (OrderLineIDValue.length >= 101) {
                                for (let key of changeOrderLineID) {
                                    if (row[key].length >= 101) {
                                        row[key] = row[key] + ":" + "VALORE TROPPO LUNGO";
                                        (row[key]);
                                        columnErrorArray.push(changeOrderLineID + space)
                                    } else {
                                        row[key] = row[key];
                                        ('OK')
                                    }
                                }
                            } else {
                                ('OK')
                            }

                            //Product Code
                            if (ProductCodeValue === "") {
                                for (let key of changeProductCode) {
                                    if (row[key] === "") {
                                        row[key] = row[key] + " " + "CAMPO OBBLIGATORIO";
                                        columnErrorArray.push(changeProductCode + space)

                                    } else {
                                        row[key] = row[key];
                                        ('OK')
                                    }
                                }
                            } else if (ProductCodeValue.length >= 256) {
                                for (let key of changeProductCode) {
                                    if (row[key].length >= 256) {
                                        row[key] = row[key] + ":" + "VALORE TROPPO LUNGO";
                                        (row[key]);
                                        columnErrorArray.push(changeProductCode + space)
                                    } else {
                                        row[key] = row[key];
                                        ('OK')
                                    }
                                }
                            } else {
                                ('OK')
                            }

                            //Unit Price
                            var numUP = UnitPriceValue.toString().split(".");
                            var decimals = (numUP[numUP.length - 1]).toString();
                            var decas = (numUP[numUP.length - 2]).toString();

                            if (UnitPriceValue === "") {
                                for (let key of changeUnitPrice) {
                                    if (row[key] === "") {
                                        row[key] = row[key] + " " + "CAMPO OBBLIGATORIO";
                                        columnErrorArray.push(changeUnitPrice + space)

                                    } else {
                                        row[key] = row[key];
                                        ('OK')
                                    }
                                }
                            } else if (UnitPriceValue.length >= 17) {
                                for (let key of changeUnitPrice) {
                                    if (row[key].length >= 17) {
                                        row[key] = row[key] + ":" + "VALORE TROPPO LUNGO";
                                        (row[key]);
                                        columnErrorArray.push(changeUnitPrice + space)
                                    } else {
                                        row[key] = row[key];
                                        ('OK')
                                    }
                                }
                            } else if (decas.length < 1 || decimals.length != 2 || numUP.length != 2) {
                                for (let key of changeUnitPrice) {
                                    if (decas.length < 1 || decimals.length != 2 || numUP.length != 2) {
                                        row[key] = row[key] + ":" + "IL VALORE DEVE ESSERE: '##.##'";
                                        (row[key]);
                                        columnErrorArray.push(changeUnitPrice + space)
                                    } else {
                                        row[key] = row[key];
                                        ('OK')
                                    }
                                }
                            } else {
                                ('OK')
                            }

                            createErrorList();

                        }
                    }

                    // Appending the header to the table
                    $(selector).append(header);
                    return columns;
                }


            };



        }
    })

})

//Close error modal
var closeModale = document.getElementById('closeModale');
closeModale.addEventListener('click', function () {
    modalError.style.display = "none";
})

//Close success modal
var closeSuccess = document.getElementById('closeSuccess');
closeSuccess.addEventListener('click', function () {
    alertSuccess.style.display = 'none';
})

//Close error list
closeErrorList.addEventListener('click', function () {
    errorList.style.display = 'none'
    openErrorList.style.display = 'block'
});

//Open error list
openErrorList.addEventListener('click', function () {
    errorList.style.display = 'block'
    openErrorList.style.display = 'none'
})

//Open Full Table
openFullTable.addEventListener('click', function () {
    table_responsive.style.position = "absolute";
    table_responsive.style.top = "0px";
    table_responsive.style.left = "0px";
    table_responsive.style.right = "0px";
    table_responsive.style.bottom = "0px";
    table_responsive.style.height = "auto";
    openFullTable.style.display = "none";
    closeFullTable.style.display = "block";
    frontContent.style.display = "none";
    navbar_top.style.display = "none";
})

//Close Full Table
closeFullTable.addEventListener('click', function () {
    table_responsive.style.position = "relative";
    table_responsive.style.height = "auto"
    closeFullTable.style.display = "none";
    openFullTable.style.display = "block";
    frontContent.style.display = "block";
    navbar_top.style.display = "block";
})

var errorGraphArray = [];

//Filter searchbar
searchbar.addEventListener('keyup', function () {
    const trs = document.querySelectorAll('#table tr:not(.header)');
    const filter = document.querySelector('#searchbar').value
    const regex = new RegExp(filter, 'i')
    const isFoundInTds = td => regex.test(td.innerHTML)
    const isFound = childrenArr => childrenArr.some(isFoundInTds)
    const setTrStyleDisplay = ({
        style,
        children
    }) => {
        style.display = isFound([
            ...children // <-- All columns
        ]) ? '' : 'none'
    }

    trs.forEach(setTrStyleDisplay)
});


//SEND DATA TO JSP (convert)
convertButton.addEventListener("click", function(){
    spinner.style.display = "block";
    const formData = new FormData();
    //Append the files of the array that we created and send the ones with index 0 e 1
    formData.append('VECCHIO_1', fileContainer[0]);
    formData.append('VECCHIO_2', fileContainer[1]);
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
            alertSuccess.innerHTML = "Hai caricato con successo questo tracciato!";
            fileContainer =[];
            console.log(fileContainer);
        },
        error: function (error) {
            console.log('Error uploading file.');
            spinner.style.display = "none";
            modalError.style.display = "block";
            modalError.innerHTML = "Qualcosa è andato storto, riporva!"
        }
    });
});

//SEND DATA TO JSP (upload)
uploadButton.addEventListener('click', function () {
    spinner.style.display = "block";
    const formData = new FormData();
    //Append the files of the array that we created and send the ones with index 0
    formData.append('NUOVO_0', fileContainer[0]);
    formData.append("NUOVO", "typeOfLoad");

    $.ajax({
        url: 'https://services-test.fieramilano.it/uploadterze/Ajax_JSP/upload.jsp',
        type: 'POST',
        data: formData,
        processData: false,
        contentType: false,
        success: function (response) {
            console.log('File uploaded successfully.');
            spinner.style.display = "none";
            alertSuccess.style.display = "block";
            alertSuccess.innerHTML = "Hai caricato con successo questo tracciato!"
            fileContainer =[];
            console.log(fileContainer)
        },
        error: function (error) {
            console.log('Error uploading file.');
            spinner.style.display = "none";
            modalError.style.display = "block";
            modalError.innerHTML = "Qualcosa è andato storto, riporva!"
        }
    });
})


//DOWNLOAD DATA INTO A NEW CSV FILE
saveButton.addEventListener('click', function () {
    let data = "";
    const tableData = [];
    const rows = document.querySelectorAll("table tr");
    for (const row of rows) {
        const rowData = [];
        for (const [index, column] of row.querySelectorAll("th, td").entries()) {
            // To retain the commas in the "Description" column, we can enclose those fields in quotation marks.
            if ((index + 1) % 3 === 0) {
                rowData.push(column.innerText);
            } else {
                rowData.push(column.innerText);
            }
        }
        tableData.push(rowData.join("|"));
    }
    data += tableData.join("\n");
    const a = document.createElement("a");

    //String CSV
    // console.log(tableData); //Object data CSV

    //Download Action
    a.href = URL.createObjectURL(new Blob([data], {
        type: "text/csv"
    }));
    var filename = uploadfile.files[0].name;
    var onlyname = filename.split(".");
    var newName = onlyname[0] + "_new";
    a.setAttribute("download", `${newName}`);
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);

})

// // Are you sure you want to leave?
// window.onbeforeunload = function () {
//     return "Data will be lost if you leave the page, are you sure?";
// };