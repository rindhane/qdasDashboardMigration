function applyAttributes(elem,classArray){
    let classString = "";
    for (let i=0; i <classArray.length; i++){
        classString=classString+" "+ classArray[i]+" ";
    }
    elem.setAttribute('class',classString);
    return elem;
}

function generateDomElement(typ, classDetail, innerText){
    const elem = document.createElement(typ);
    applyAttributes(elem,classDetail);
    elem.innerText=innerText;
    return elem;
}

function htmlToElement(htmlString) {
	//ref:
		//https://stackoverflow.com/questions/494143/creating-a-new-dom-element-from-an-html-string-using-built-in-dom-methods-or-pro/35385518#35385518
		let template = document.createElement('template');
		html = htmlString.trim(); // Never return a text node of whitespace as the result
		template.innerHTML = html;
		return template.content.firstChild;
}


//sending post request to server
async function postJsonData(url , Jsondata, authKey="qdasAuthToken"){ 
    let options={
      method: 'POST',
      headers: {
        Accept: 'application/json',
        "Content-Type": 'application/json',
        //authToken:getKeyValueFromStorage(authKey)
      },
      body: JSON.stringify(Jsondata),
      cache: 'default',
      redirect:'manual',
    }
    let response = await fetch(url, options);
    const status = response.status  
    const data = await response.text();
    return { status:status, data:data }
  };

function responseToJson(responseOutput){
    return JSON.parse(responseOutput.data);
}





