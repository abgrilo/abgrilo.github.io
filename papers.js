

var getJSON = function(url) {
  return new Promise(function(resolve, reject) {
    var xhr = new XMLHttpRequest();
    xhr.open('get', url, true);
    xhr.responseType = 'json';
    xhr.onload = function() {
      var status = xhr.status;
      if (status == 200) {
        resolve(xhr.response);
      } else {
        reject(status);
      }
    };
    xhr.send();
  });
};

function author(name){
  if(name == "Alex Grilo" || name == "Alex Bredariol Grilo" || name == "Alex B. Grilo"){
	return "ABG";
  }
  return name;
}

function getAuthors(authors){
  var result = author(authors[0]);
  for(let j = 1; j < authors.length; j++){ 
          result = result + ", " + author(authors[j]);
  }
  return result;
}

function getPapers(url, divName,doiName = null, addDoi = true,  addArxiv = true) {
 data = getJSON(url).then(function(data) {
    var answer = "<ul>";
    for(let i = 0; i < data.response.numFound; i++){ 
       var element = data.response.docs[i];
       var authors = getAuthors(element.authFullName_s);
       var item = "<li> <b>" + element.title_s + `</b>`;
       if (addArxiv)
         item = item + `</br> <a href="https://arxiv.org/abs/` + element.arxivId_s + `">[arxiv]</a>`;
       if(addDoi){
	  if(doiName == null || element["doiName"] == null)
	    item = item + ` <a href="https://doi.org/` + element.doiId_s + `">[publication]</a> `;
	  else
	    item = item + ` <a href="https://doi.org/` + element.doiId_s + `">[` + element["doiName"] + `]</a> `;
       }
       item = item + `</br>` +  authors + ` </li>`;
       answer = answer + item;
    }
    answer = answer + "</ul>";
    document.getElementById(divName).innerHTML= answer; //display the result in an HTML element
}, function(status) { //error detection....
  alert('Something went wrong.');
});
}

function conferencePapers() {
	getPapers(`https://api.archives-ouvertes.fr/search/?q=authIdHal_s:abgrilo&fq=docType_s:COMM&fl=title_s,authFullName_s,doiId_s,arxivId_s&sort=producedDate_tdate%20desc&facet.field=comment_s`, "conferences", "comment_s");
}

function journalPapers() {
	getPapers(`https://api.archives-ouvertes.fr/search/?q=authIdHal_s:abgrilo&fq=docType_s:ART&fl=title_s,journalTitleAbbr_s,authFullName_s,keyword_s,doiId_s,arxivId_s&sort=producedDate_tdate%20desc&facet.field=comment_s`, "journals", "comment_s");
}

function preprintPapers() {
	getPapers(`https://api.archives-ouvertes.fr/search/?q=authIdHal_s:abgrilo&fq=docType_s:UNDEFINED&fl=title_s,authFullName_s,doiId_s,arxivId_s&sort=producedDate_tdate%20desc`, "preprints", null, false);
}


function allPapers(){
	conferencePapers();
	journalPapers();
	preprintPapers();
	thesisPapers();
}


//https://api.archives-ouvertes.fr/search/?q=authIdHal_s:abgrilo&fq=docType_s:COMM&fl=title_s,authFullName_s,doiId_s,arxivId_s&sort=producedDate_tdate%20desc



//https://api.archives-ouvertes.fr/search/?q=authIdHal_s:abgrilo&fq=docType_s:ART&fl=title_s,authFullName_s,doiId_s,arxivId_s&sort=producedDate_tdate%20desc



//https://api.archives-ouvertes.fr/search/?q=authIdHal_s:abgrilo&fq=docType_s:UNDEFINED&fl=title_s,authFullName_s,doiId_s,arxivId_s&sort=producedDate_tdate%20desc

//https://api.archives-ouvertes.fr/search/?q=authIdHal_s:abgrilo&fq=docType_s:THESE&fl=title_s,authFullName_s,doiId_s,arxivId_s&sort=producedDate_tdate%20desc
