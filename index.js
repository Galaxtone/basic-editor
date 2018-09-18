(()=>{
  var textFilename = document.getElementByID("text");
  var textEditor = document.getElementById("editor");
  
  var buttonList = document.getElementByID("list");
  var buttonOpenClose = document.getElementByID("openclose");
  var buttonSave = document.getElementByID("save");
  var buttonDelete = document.getElementByID("delete");
  
  var filename = "";
  var opened = false;
  
  var files = ["samplefile.txt"];
  var fileToText = {"samplefile.txt": "Hello!"};
  
  buttonList.addEventListener("click", ()=>{
    textFilename.value = "";
    buttonOpenClose.value = "Open";
    
    buttonSave.disabled = true;
    buttonDelete.disabled = true;
    
    filename = "";
    opened = false;
    
    textEditor.contentEditable = false;
    textEditor.textContent = "Files:";
    
    for (var i = 0; i < files.length; i++)
      textEditor.textContent += "\n " + files[i];
  });
  
  buttonOpenClose.addEventListener("click", ()=>{
    if (opened) {
      textFilename.value = "";
      buttonOpenClose.value = "Open";
    
      buttonSave.disabled = false;
      buttonDelete.disabled = false;
      
      filename = "";
      opened = false;
      
      textEditor.contentEditable = false;
      textEditor.textContent = "";
    } else {
      buttonOpenClose.value = "Close";
      
      filename = textFilename.value;
      opened = true;
      
      textEditor.contentEditable = true;
      if (!files.includes(filename)) {
        files.push(filename);
        fileToText[filename] = "New File!";
      }
      
      textEditor.textContent = fileToText[filename];
    }
  });
  
  buttonSave.addEventListener("click", ()=>{
    if (!opened)
      return;
    
    fileToText[filename] = textEditor.textContent;
  });
  
  buttonDelete.addEventListener("click", ()=>{
    if (!opened)
      return;
    
    files.remove(filename);
    fileToText[filename] = null;
    
    textFilename.value = "";
    buttonOpenClose.value = "Open";

    buttonSave.disabled = false;
    buttonDelete.disabled = false;

    filename = "";
    opened = false;

    textEditor.contentEditable = false;
    textEditor.textContent = "";
  });
})();
