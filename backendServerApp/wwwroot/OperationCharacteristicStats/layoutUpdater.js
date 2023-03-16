//populate the dashboard type apps
populateOpperationData(document.getElementById("MasterElem")); //entrypoint

async function populateOpperationData(MasterElem){
    let result= await postDataStream("GetData");
    console.log(result);
    const rows = result;
    /*
    const rows= [
        [
        "OP 60",
        "SRC Dia",
        "17.8",
        "0.0043",
        "1.13",
        "1.09",
        "1"
        ],
        [
            "OP 60",
            "SRC Dia",
            "17.8",
            "0.0043",
            "1.13",
            "1.09",
            "2"
        ]
    ];
    */
    MasterElem.appendChild(await optionTemplate());
    MasterElem.appendChild(await titleDescriptionTemplate());
    MasterElem.appendChild(getTablePopulated(rows));
    return true;
}

async function postDataStream(relativeUrl){ 
    const serverMainPath = '';//;"http://localhost:7000" ;
    const url = `${serverMainPath}/${relativeUrl}`; 
    const response = await postJsonData(url, "getData");
    return responseToJson(response);
  };

async function optionTemplate(){
  const htmlString=`
  <div class="optionsContainer">
    <div class="optionsMenu">
        <div class="menuContainer">
            <label class="menuLabel" for="filterStart">Start date:</label>
            &nbsp;
            <input type="date" id="filterStart" name="date-start" value="2018-07-22">
        </div>
        &nbsp; &nbsp;&nbsp;
        <div class="menuContainer">
            <label class="menuLabel" for="filterEnd">End Date:</label>
            &nbsp;
            <input type="date" id="filterEnd" name="date-end" value="2018-07-22">
        </div>
    </div>
  <div class="optionsMenu">
      <div class="menuContainer">
          <label class="menuLabel" for="modelSelector">Model : </label>
          &nbsp;
          <select name="modelSelector" id="modelSelector">
              <option value="SK66"> SK66</option>
              <option value="SK76"> SK76</option>
              <option value="SK78" selected>SK78 - Dur:Sleek Centinel</option>
          </select>
      </div>
  </div>
                <div class="optionsMenu">
                    <div class="menuContainer">
                        <label class="menuLabel" for="modelSelector"> Operation: </label>
                        &nbsp;
                        <select name="modelSelector" id="modelSelector">
                            <option value="SK66"> SK66</option>
                            <option value="SK76"> SK76</option>
                            <option value="SK78" selected>OP-60: Al Blasting</option>
                        </select>
                    </div>
                </div>
            </div>
  `;
  return htmlToElement(htmlString);
}
 
async function titleDescriptionTemplate(){
    const htmlString=
        `
        <div class="headingContainer">
            <span class="appTitle">
                Operation :&nbsp; <span class="darkFont"id="partID">OP-60</span> &nbsp; Statistics 
            </span> 
            <div class="detailSet">
                <div class="row">
                    <div class="boxDetail">
                        <span class="boxDetail-particular">
                            Part Description : 
                        </span>
                        <span class="boxDetail-value">
                            Connecting rod (70mm) SK78
                        </span>
                    </div>
                    <div class="boxDetail">
                        <span class="boxDetail-particular">
                            Part Number : 
                        </span>
                        <span class="boxDetail-value">
                            435621
                        </span>
                    </div>    
                </div>
                <div class="row">
                    <div class="boxDetail">
                        <span class="boxDetail-particular">
                            Product Model : 
                        </span>
                        <span class="boxDetail-value">
                            SK78- Dur:Sleek Centinel 
                        </span>
                    </div>
                    <div class="boxDetail">
                        <span class="boxDetail-particular">
                            Product Type : 
                        </span>
                        <span class="boxDetail-value">
                            Connecting Rod
                        </span>
                    </div>
                </div>
            </div>
        </div>
        `;
    return htmlToElement(htmlString);
}

function tableHeader(){
    const htmlString= `
    <div class="flex-table header" role="rowgroup">
        <div class="flex-row first" role="columnheader">OP No</div>
        <div class="flex-row " role="columnheader">Char Desc</div>
        <div class="flex-row " role="columnheader">Class</div>
        <div class="flex-row " role="columnheader">Avg</div>
        <div class="flex-row " role="columnheader">Std Dev</div>
        <div class="flex-row " role="columnheader">Pp</div>
        <div class="flex-row " role="columnheader">PpK</div>
        <div class="flex-row " role="columnheader">Chart</div>
    </div>`;
    return htmlToElement(htmlString);
}

function tableRow(rowData){
    let htmlString=`
    <div class="flex-table row" role="rowgroup">
        <div class="flex-row first" role="cell">$val0$</div>
        <div class="flex-row " role="cell">$val1$</div>
        <div class="flex-row " role="cell">
            $val6$
        </div>
        <div class="flex-row " role="cell">$val2$</div>
        <div class="flex-row " role="cell">$val3$</div>
        <div class="flex-row " role="cell">$val4$</div>
        <div class="flex-row " role="cell">$val5$</div>
        <div class="flex-row " role="cell">
            <img class="labelImage" src="./img/Ppk.PNG"/>
        </div>
    </div>
    `;
    rowData.forEach((item,index)=>{
        if(index!=6) {
            htmlString = htmlString.replace(`$val${index}$`,item);
        }
        htmlString=htmlString.replace(`$val${index}$`,getClassification(item));
    });
    return htmlToElement(htmlString);
}

function getClassification(index){
    if(index==0){
        return `<img src="./img/emptyCircle.svg" />`;
    }
    if (index==1){
        return '<img src="./img/halfCircle.svg" />';
    }
    if(index==2){
        return `<img src="./img/fullCircle.svg" />`;
    }
    return `<img src="./img/emptyCircle.svg" />`;
}

function getTablePopulated(rows){
    const tableContainer = document.createElement('div');
    tableContainer.setAttribute("class","AppContainer");
    const tableElement=createTablElement();
    tableContainer.appendChild(tableElement);
    tableElement.appendChild(tableHeader());
    rows.forEach(row=>tableElement.appendChild(tableRow(row)));
    return tableContainer;
}

function createTablElement(){
    const htmlString=
    `
    <div class="table-container" role="table" aria-label="Parametric Details">
    </div>  `
    return htmlToElement(htmlString);
}