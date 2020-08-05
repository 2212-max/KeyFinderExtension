function DOMtoString(document_root) {
    var html = '',
        node = document_root.firstChild;
    while (node) {
        switch (node.nodeType) {
        case Node.ELEMENT_NODE:
            html += node.outerText;
            break;
        case Node.TEXT_NODE:
            html += node.nodeValue;
            break;
        }
        node = node.nextSibling;
    }
    return html;
}

function findKeysInLine(lineId, lines)
{
	if(lineId >= lines.length -1)
	{
		alert('Finish.');
		return;
	}
	
	lineData = lines[lineId];
	
	if(lineData.includes('-') && lineData.length < 500)
	{
		var data = new FormData();
		data.set("data", lines[lineId] );

		var xhr = new XMLHttpRequest();
		xhr.withCredentials = false;

		xhr.addEventListener("readystatechange", function () {
		  if (this.readyState === 4) {
			 var textResult = this.responseText.replace(/\"/g,"");
			textResult = textResult.replace(/\\n/g,"\n");
			if(textResult != ""){
				alert(textResult);
			}
			
			/* You can find and redirect a page element on page. */
			//window.location.href = document.querySelector('.buttonSet>.blue').href;
			findKeysInLine(lineId+1, lines);
		  }
		});

		xhr.open("POST", "https://winoffice.org/public-api/find-key");
		xhr.send(data);
		console.log("Finding keys in line " + lineId + "...");
	}
	else{
		findKeysInLine(lineId+1, lines);
	}
}

alert('Starting finding... New keys will be shown at here!');

var pageData = DOMtoString(document);

var lines = pageData.split(/\r?\n/);

findKeysInLine(0,lines);
