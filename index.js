(()=>{var textFilename=document.getElementById("name");var textEditor=document.getElementById("editor");var buttonOpenClose=document.getElementById("openclose");var buttonSave=document.getElementById("save");var buttonDelete=document.getElementById("delete");var checkSaveClose=document.getElementById("saveclose");var paragraphError=document.getElementById("error");var supported=!0
if(localStorage==null)
supported=!1
else{try{localStorage.setItem("test","test")
localStorage.removeItem("test")}catch(exception){supported=!1}}
if(!supported){paragraphError.textContent="Local storage is required for functionality!"
return}
buttonOpenClose.disabled=!1
checkSaveClose.disabled=!1
var filename="";var opened=!1;var fileIdentLength=0;var fileIdents={};var fileToIdent={};var fileToText={};function ident(){var newIdent="f_"+String(Math.floor(Math.random()*4294967296));if(fileIdents[newIdent])
return ident();fileIdents[newIdent]=!0
fileIdentLength+=1
return newIdent}
function save(){fileToText[filename]=textEditor.innerText;for(var file in fileToText){var ident=fileToIdent[file];if(fileToText[file]==null)
return;localStorage.setItem(ident+"name",file);localStorage.setItem(ident,fileToText[file])}
var z=[];for(var w in fileIdents)
if(fileIdents[w]!=null)
z.push(w);if(z.length>0)
localStorage.setItem("f",z.join(" "))}
function load(){var f=localStorage.getItem("f");if(f==null){localStorage.clear();return}
var z=f.split(" ");for(var w in z)
fileIdents[z[w]]=!0;fileIdentLength=z.length;for(var ident in fileIdents){var file=localStorage.getItem(ident+"name");fileToIdent[file]=ident}}
function loadFile(){fileToText[filename]=localStorage.getItem(fileToIdent[filename])}
load();function open(){if(textFilename.value.length<1||textFilename.value.length>64)
return;buttonOpenClose.textContent="Close";textFilename.disabled=!0;buttonSave.disabled=!1;buttonDelete.disabled=!1;filename=textFilename.value;opened=!0;textEditor.contentEditable=!0;loadFile()
if(fileToIdent[filename]==null){fileToIdent[filename]=ident();fileToText[filename]=""}
textEditor.innerText=fileToText[filename];textEditor.focus()}
function close(){if(opened){if(checkSaveClose.checked)
save();location.hash=""}
buttonOpenClose.textContent="Open";textFilename.disabled=!1;buttonSave.disabled=!0;buttonDelete.disabled=!0;filename="";opened=!1;textEditor.contentEditable=!1;textEditor.innerHTML="Files ("+fileIdentLength+")";if(fileIdentLength>0){textEditor.innerHTML+=":\r\n"
for(var file in fileToIdent)
if(fileToIdent[file]!=null)
textEditor.innerHTML+=" <a href=\"#"+file+"\">"+file+"</a>\r\n"}
textFilename.focus()}
function hash(){var possibleFile=location.hash.substring(1);if(location.hash.startsWith("#")&&fileToIdent[possibleFile]!=null){textFilename.value=possibleFile;open()}}
close();hash();window.addEventListener("hashchange",hash);textFilename.addEventListener("keyup",(event)=>{if(event.key=="Enter")
open()});buttonOpenClose.addEventListener("click",()=>{if(opened)
close();else open()});buttonSave.addEventListener("click",()=>{if(!opened)
return;save()});buttonDelete.addEventListener("click",()=>{if(!opened)
return;fileIdents[fileToIdent[filename]]=null;fileIdentLength-=1;fileToIdent[filename]=null;fileToText[filename]=null;close()})})()
