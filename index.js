(() => {
    var textFilename = document.getElementById("name");
    var textEditor = document.getElementById("editor");

    var buttonOpenClose = document.getElementById("openclose");
    var buttonSave = document.getElementById("save");
    var buttonDelete = document.getElementById("delete");

    var checkSaveClose = document.getElementById("saveclose");

    var paragraphError = document.getElementById("error");

    var supported = true
    if (localStorage == null)
        supported = false
    else {
        try {
            localStorage.setItem("test", "test")
            localStorage.removeItem("test")
        } catch (exception) {
            supported = false
        }
    }

    if (!supported) {
        paragraphError.textContent = "Local storage is required for functionality!"
        return;
    }

    buttonOpenClose.disabled = false
    checkSaveClose.disabled = false

    var filename = "";
    var opened = false;

    var fileIdentLength = 0;
    var fileIdents = {};
    var fileToIdent = {};
    var fileToText = {};

    function ident() {
        var newIdent = "f_" + String(Math.floor(Math.random() * 4294967296));
        if (fileIdents[newIdent])
            return ident();

        fileIdents[newIdent] = true
        fileIdentLength += 1
        return newIdent;
    }

    function save() {
        fileToText[filename] = textEditor.textContent;

        for (var file in fileToText) {
            var ident = fileToIdent[file];

            localStorage.setItem(ident + "name", file);
            localStorage.setItem(ident, fileToText[file])
        }

        var z = [];
        for (var w in fileIdents)
            if (fileIdents[w] != null)
                z.push(w);

        if (z.length > 0)
            localStorage.setItem("f", z.join(" "));
    }

    function load() {
        var f = localStorage.getItem("f");
        if (f == null) {
            localStorage.clear();
            return;
        }

        var z = f.split(" ");
        for (var w in z)
            fileIdents[z[w]] = true;
        fileIdentLength = z.length;

        for (var ident in fileIdents) {
            var file = localStorage.getItem(ident + "name");
            fileToIdent[file] = ident;
        }
    }

    function loadFile() {
        fileToText[filename] = localStorage.getItem(fileToIdent[filename])
    }

    function unloadFile() {
        fileToText[filename] = null
    }

    load();

    function open() {
        if (textFilename.value.length < 1 || textFilename.value.length > 64)
            return;

        buttonOpenClose.textContent = "Close";

        textFilename.disabled = true;

        buttonSave.disabled = false;
        buttonDelete.disabled = false;

        filename = textFilename.value;
        opened = true;

        textEditor.contentEditable = true;
        loadFile()
        if (fileToIdent[filename] == null) {
            fileToIdent[filename] = ident();
            fileToText[filename] = "";
        }

        textEditor.textContent = fileToText[filename];

        textEditor.focus();
    }

    function close() {
        if (opened) {
            if (checkSaveClose.checked)
                save();

            unloadFile();
        }

        buttonOpenClose.textContent = "Open";

        textFilename.disabled = false;

        buttonSave.disabled = true;
        buttonDelete.disabled = true;

        filename = "";
        opened = false;

        textEditor.contentEditable = false;
        textEditor.innerHTML = "Files (" + fileIdentLength + ")";

        if (fileIdentLength > 0) {
            textEditor.innerHTML += ":\r\n"
            for (var file in fileToIdent)
                if (fileToIdent[file] != null)
                    textEditor.innerHTML += " <a href=\"#" + file + "\">" + file + "</a>\r\n";
        }

        textFilename.focus();
    }

    function hash() {
        var possibleFile = location.hash.substring(1);
        if (location.hash.startsWith("#") && fileToIdent[possibleFile] != null) {
            textFilename.value = possibleFile;
            open();
        }
    }

    close();

    hash();
    document.addEventListener("hashchange", hash);

    textFilename.addEventListener("keyup", (event) => {
        if (event.key == "Enter")
            open();
    });

    buttonOpenClose.addEventListener("click", () => {
        if (opened)
            close();
        else
            open();
    });

    buttonSave.addEventListener("click", () => {
        if (!opened)
            return;
    });

    buttonDelete.addEventListener("click", () => {
        if (!opened)
            return;

        fileIdents[fileToIdent[filename]] = null;
        fileIdentLength -= 1;
        fileToIdent[filename] = null;
        fileToText[filename] = null;

        close();
    });
})();
