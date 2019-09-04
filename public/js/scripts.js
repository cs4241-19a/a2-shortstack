let PouchDb = require('pouchdb');

let db = new PouchDb('my_db');

submit = function (e) {
    // prevent default form action from being carried out
    e.preventDefault();

    const name = document.querySelector('#character-name');
    const bio = document.querySelector('#bio');
    const newClass = document.querySelector('#classes');
    const dbClass = newClass.value;
    const dbName = name.value;
    const dbBio = bio.value;

    if (dbClass === "") {
        window.alert('Please pick a class');
        return false;
    }

    const new_character = {
        "_id": dbName,
        "bio": dbBio,
        "class": dbClass,
    };

    db.put(new_character).catch(function (err) {
        window.alert("There is already a character with that name");
    });

    return false
};

selectClass = function(e) {
    e.preventDefault();

    const newClass = document.querySelector('select');
    switch(newClass.value) {
        case 'Mage':
            document.querySelector('#strength').innerHTML = 'Strength: 2';
            document.querySelector('#agility').innerHTML = 'Agility: 2';
            document.querySelector('#magic').innerHTML = 'Magic: 8';
            document.querySelector('#intelligence').innerHTML = 'Intelligence: 6';
            break;
        case 'Warrior':
            document.querySelector('#strength').innerHTML = 'Strength: 7';
            document.querySelector('#agility').innerHTML = 'Agility: 4';
            document.querySelector('#magic').innerHTML = 'Magic: 2';
            document.querySelector('#intelligence').innerHTML = 'Intelligence: 3';
            break;
        case 'Wizard':
            document.querySelector('#strength').innerHTML = 'Strength: 4';
            document.querySelector('#agility').innerHTML = 'Agility: 3';
            document.querySelector('#magic').innerHTML = 'Magic: 6';
            document.querySelector('#intelligence').innerHTML = 'Intelligence: 9';
            break;
        case 'Assassin':
            document.querySelector('#strength').innerHTML = 'Strength: 5';
            document.querySelector('#agility').innerHTML = 'Agility: 8';
            document.querySelector('#magic').innerHTML = 'Magic: 4';
            document.querySelector('#intelligence').innerHTML = 'Intelligence: 3';
            break;
        default:
            document.querySelector('#strength').innerHTML = 'Strength: ';
            document.querySelector('#agility').innerHTML = 'Agility: ';
            document.querySelector('#magic').innerHTML = 'Magic: ';
            document.querySelector('#intelligence').innerHTML = 'Intelligence: ';
            break;
    }

};

selectCharacter = function(e) {
  e.preventDefault();

  const character = document.querySelector('#character-select');
  db.get(character.value).then(function (result) {
      document.querySelector('#character-name').value = result._id;
      document.querySelector('#bio').value = result.bio;
      document.querySelector('#classes').value = result.class;
  });

};

deleteDB = function(e) {
    e.preventDefault();

    db.destroy();
    db.allDocs().then(function (result){
        let entries = result.rows;
        for(let entry of entries) {
            var select = document.getElementById("character-select");
            select.options[select.options.length] = new Option(entry.id, entry.id);
        }
    });
};

window.onload = function () {
    const characters = document.querySelector('#character-select');
    db.allDocs().then(function (result){
        let entries = result.rows;
        for(let entry of entries) {
            var select = document.getElementById("character-select");
            select.options[select.options.length] = new Option(entry.id, entry.id);
        }
    });
    const submitButton = document.querySelector('#submit');
    const classes = document.querySelector('#classes');
    const character = document.querySelector('#character-select');
    const deleteAll = document.querySelector('#deleteAll');
    submitButton.onclick = submit;
    classes.onchange = selectClass;
    character.onchange = selectCharacter;
    deleteAll.onclick = deleteDB;

};
