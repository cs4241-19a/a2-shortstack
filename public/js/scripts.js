// Register HTML elements ==============================================================================================
const addBtn = document.getElementById('add');
const overview = document.getElementById('overview');
const rightHead = document.getElementById('rightHead');
// =====================================================================================================================

// GET (shows the dataset in server) ===================================================================================
let tabularFront;

const createNode = function (element) {
    return document.createElement(element);
};
const append = function (parent, el) {
    return parent.appendChild(el);
};

const makeHeadings = function () {
    let th1 = createNode('th');
    let th2 = createNode('th');
    let th3 = createNode('th');
    let th4 = createNode('th');
    let th5 = createNode('th');
    th1.innerHTML = 'Name';
    th2.innerHTML = 'Gender';
    th3.innerHTML = 'Age';
    th4.innerHTML = 'Hobby';
    th5.innerHTML = 'Match Score';
    let tr = createNode('tr');
    append(tr, th1);
    append(tr, th2);
    append(tr, th3);
    append(tr, th4);
    append(tr, th5);
    append(overview, tr);
};
const gearForm = function (gear, row) {
    modifyIndex = gear.id[4];
    rightHead.innerHTML = "Modify Information";
    addBtn.innerHTML = "Update";

    document.querySelector('#name').value = row.name;
    document.querySelector('#age').value = row.age;

    let genderS = document.getElementsByName('gender');
    if (row.gender === "Male") genderS[0].checked = true;
    else if (row.gender === "Female") genderS[1].checked = true;
    else genderS[2].checked = true;

    const hobbyS = document.getElementsByName('hobby');
    if (row.hobby === "Sport") hobbyS[0].checked = true;
    else if (row.hobby === "Music") hobbyS[1].checked = true;
    else if (row.hobby === "Gaming") hobbyS[2].checked = true;
    else hobbyS[3].checked = true;
};

/**
 * Loads the items of dataset onto page
 * Will be called when the dataset is modified
 */
const refresh = function () {
    fetch('/refresh', {
        method: 'GET'
    }).then(function (response) {
        return response.json();
    }).then(function (data) {
        tabularFront = data;
        overview.innerHTML = "";
        makeHeadings();

        let rowNum = 1;
        tabularFront.map(function (row) {
            let tr = createNode('tr');
            let td1 = createNode('th');
            let td2 = createNode('th');
            let td3 = createNode('th');
            let td4 = createNode('th');
            let td5 = createNode('th');
            let td6 = createNode('th');
            let td7 = createNode('th');

            let gear = createNode('i');
            gear.id = `gear${rowNum}`;
            gear.className = 'fa fa-gear';
            gear.onclick = function (e) {
                gearForm(gear, row);
                e.preventDefault();
                return false;
            };
            let bomb = createNode('i');
            bomb.id = `bomb${rowNum}`;
            bomb.className = 'fa fa-bomb';
            bomb.onclick = function (e) {
                let body = bomb.id;
                fetch('/delete', {
                    method: 'POST',
                    body
                }).then(function (response) {
                    console.log("Post sent to server: " + response);
                    refresh();
                });
                e.preventDefault();
                return false;
            };

            td1.innerHTML = row.name;
            td2.innerHTML = row.gender;
            td3.innerHTML = row.age;
            td4.innerHTML = row.hobby;
            td5.innerHTML = row.matchScore;
            append(td6, gear);
            append(td7, bomb);

            append(tr, td1);
            append(tr, td2);
            append(tr, td3);
            append(tr, td4);
            append(tr, td5);
            append(tr, td6);
            append(tr, td7);
            append(overview, tr);

            tr.className = rowNum;
            rowNum++;
        });
    });
};
refresh();
// =====================================================================================================================

// POST (for add and modify) ===========================================================================================
let input;
let modifyIndex = 0;

const makeBody = function () {
    const name = document.querySelector('#name');
    const age = document.querySelector('#age');

    const genderS = document.getElementsByName('gender');
    let gender;
    for (let i = 0; i < genderS.length; i++) {
        if (genderS[i].checked) {
            gender = genderS[i].value;
            break
        }
    }

    const hobbyS = document.getElementsByName('hobby');
    let hobby;
    for (let i = 0; i < hobbyS.length; i++) {
        if (hobbyS[i].checked) {
            hobby = hobbyS[i].value;
            break
        }
    }

    const json = {
        name: name.value,
        age: parseInt(age.value),
        gender: gender,
        hobby: hobby,
        matchScore: 0,
        modifyIndex
    };

    return JSON.stringify(json);
};
const handlePost = function () {
    let body = makeBody();
    let checkBody = JSON.parse(body);
    let hint = document.getElementById('hint');

    if (checkBody['name'] === ""
        || checkBody['age'] === ""
        || checkBody['gender'] === ""
        || checkBody['hobby'] === "") {
        hint.innerHTML = "There are missing fields!";
    } else {
        hint.innerHTML = "";
        fetch(`/${input}`, {
            method: 'POST',
            body
        }).then(function (response) {
            console.log("Post sent to server: " + response);
            refresh();
        });
    }
};

const setInput = function (e) {
    if (addBtn.innerHTML === "Submit") {
        input = 'add';
        handlePost();
    } else {
        input = 'modify';
        handlePost();
        rightHead.innerHTML = "Personal Information";
        addBtn.innerHTML = "Submit";

        document.querySelector('#name').value = "";
        document.querySelector('#age').value = "";

        let genderS = document.getElementsByName('gender');
        for (let i = 0; i < genderS.length; i++) {
            genderS[i].checked = false;
        }

        let hobbyS = document.getElementsByName('hobby');
        for (let i = 0; i < hobbyS.length; i++) {
            hobbyS[i].checked = false;
        }
    }
    e.preventDefault();
    return false;
};
addBtn.onclick = setInput;
// =====================================================================================================================