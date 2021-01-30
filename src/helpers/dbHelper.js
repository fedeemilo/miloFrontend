export const handleSubmitRep = (e, comp, desc, repArr, setRepArr) => {
    let dbReplacements = require('../db/replacements.json');
    let repResults = document.querySelector('.rep-results');

    e.preventDefault();
    setRepArr([]);
    repResults.classList.remove('d-none');

    dbReplacements.REEMPLAZOS.forEach(remp => {
      if (remp.COMPONENTE.includes(comp)) {
        setRepArr(repArr => repArr.concat(remp));
      }
    });

  };

