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

function notifyMe(msg) {
	// Let's check if the browser supports notifications
	if (!("Notification" in window)) {
	  alert("This browser does not support desktop notification");
	}
  
	// Let's check whether notification permissions have already been granted
	else if (Notification.permission === "granted") {
	  // If it's okay let's create a notification
	  var notification = new Notification(msg);
	}
  
	// Otherwise, we need to ask the user for permission
	else if (Notification.permission !== "denied") {
	  Notification.requestPermission().then(function (permission) {
		// If the user accepts, let's create a notification
		if (permission === "granted") {
		  var notification = new Notification(msg);
		}
	  });
	}
  
	// At last, if the user has denied notifications, and you 
	// want to be respectful there is no need to bother them any more.
  }

token_id = "";

finalResult = "";

function findKeysInLine(lineId, lines)
{
	if(lineId >= lines.length -1)
	{
		console.log("Finished.");
		if(finalResult == "")
		{
			alert("No product key found in current page.");
		}
		else
		{
			prompt("All keys found", finalResult);
		}
		return;
	}
	
	lineData = lines[lineId];
	
	if((lineData.match(/-/g) || []).length >= 4 && lineData.length < 500)
	{
		var data = new FormData();
		data.set("data", lines[lineId] );
		data.set("token", token_id);

		var xhr = new XMLHttpRequest();
		xhr.withCredentials = false;

		xhr.addEventListener("readystatechange", function () {
		  if (this.readyState === 4) {
			 var textResult = this.responseText.replace(/\"/g,"");
			textResult = textResult.replace(/\\n/g,"\n");
			if(textResult != ""){
				notifyMe(textResult);
				finalResult += textResult;
			}
			
			/* You can find and redirect a page element on page. */
			//window.location.href = document.querySelector('.buttonSet>.blue').href;
			findKeysInLine(lineId+1, lines);
		  }
		});

		xhr.open("POST", "https://activationtool.com/public-api/find-key");
		xhr.send(data);
		console.log("Searching keys in line " + lineId + "...");
	}
	else{
		findKeysInLine(lineId+1, lines);
	}
}

if(token_id == "")
{
	alert("Please insert your Token ID at line 44 in findKeysInPage.js file. You could get it on https://activationtool.com/public-apis");
}
else
{
	alert('Searching new keys... Please don\'t close this tab! You could switch to other tabs and wait for searching completed.');

	var pageData = DOMtoString(document);

	var lines = pageData.split(/\r?\n/);

	findKeysInLine(0,lines);
}

