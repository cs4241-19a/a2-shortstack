const generate = function(e) {
  // prevent default form action from being carried out
  e.preventDefault()
  
  const body = JSON.stringify(grabInput("numPoly", "vertices", "name"))
  
  fetch( '/generate', {
    method:'POST',
    body 
  })
  .then( function( response) {
    getData()
  })
  
  return false
}

function grabInput(poly, ver, name){
  
  const input = {
    vertices: document.getElementById(ver).value,
    numPoly: document.getElementById(poly).value,
    name: document.getElementById(name).value
  };
  return input
}

function getData(idx = -1){
    fetch( '/getDrawings', {
      method: 'GET'
    })
    .then( function( response) {
      return response.json()
    })
    .then( function(data){
      genTable(data, idx)
    })
}

function genTable(dataList, idx) {
  let str = "<tr>"+
              "<th>Number of Vertices</th>" + 
              "<th>Number of Triangles</th>" + 
              "<th>Name</th>" +
              "<th></th>"
            "</tr>"
  
  let i = 0
  for(let d of dataList){
    if(idx === i){
      str += "<tr>"+
                "<td>" + 
                  "<input type='number' id='verticesE' value="+ d.vertices +"></td>" + 
                "<td>"+
                  "<input type='number' id='numPolyE' value=" + d.numPoly + "></td>" + 
                "<td>" + 
                  "<input type='text' id='nameE' value='" + d.name + "'>" +
                "</td>" +
                "<td>" + 
                  "<button id='v" + i + "' onclick='drawData(" + i + ")'>View</button>" +
                  "<button id='u" + i + "' onclick='updateData(" + i + ")'>Update</button>" +
                  "<button id='d" + i + "'onclick='deleteData(" + i +")'>Delete</button>" +
                "</td>"
              "</tr>"
    }
    else{
      str += "<tr>"+
                "<td>"+ d.vertices +"</td>" + 
                "<td>"+ d.numPoly +"</td>" + 
                "<td>"+ d.name +"</td>" +
                "<td>" + 
                  "<button id='v" + i + "' onclick='drawData(" + i + ")'>View</button>" +
                  "<button id='e" + i + "' onclick='editData(" + i + ")'>Edit</button>" +
                  "<button id='d" + i + "'onclick='deleteData(" + i +")'>Delete</button>" +
                "</td>"
              "</tr>"
    }
    i++
  }
  document.getElementById("dataTable").innerHTML = str
}

function drawData(index){
  fetch( '/getDrawings', {
    method: 'GET'
  })
  .then( function( response) {
    return response.json()
  })
  .then( function(data){
    let shape = data[index]
    console.log(shape)
    initialize(shape.vertices, shape.points, shape.numPoly, shape.triangles)
  })
}

function editData(index){
  getData(index)
}

function deleteData(index){
  const body = JSON.stringify( index )
  fetch( '/delete', {
    method: 'POST',
    body
  })
  .then( function( response) {
    getData()
  })
}

function updateData(index){
  const input = grabInput("numPolyE", "verticesE", "nameE")
  input.idx = index
  const body = JSON.stringify(input)
  
  fetch( '/update', {
    method:'POST',
    body 
  })
  .then( function( response) {
    getData()
  })
  return false
}


window.onload = function() {
  getData()
  const genBtn = document.getElementById("generate")
  genBtn.onclick = generate
}

//********************************* WebGL Code *****************************************************


var extents; //extents values [left, right, top, bottom, front, back]
var numVertices; //number of vertices
var numPolygons; //number of polygons
var vertices; //array of vertices which are stored as vec4
var vertexIndx; //array of indexes of vertices which show what vertices makes up each polygon
var normalsArray; //store the calculated normals of each polygon

var gl;
var program;

var moveX = 0.0, moveY = 0.0, moveZ = 0.0; // x, y, z, translation values
var direction;  //determine which axis to translate

var alpha = 0.0;
var pulseX = 0.0, pulseY = 0.0, pulseZ = 0.0; //x, y, z, values for pulsing
var pulseOut = true;  //help determine whether to move polygons inward or outward

var theta = 0.0;

//transformation states - initially object is not pulsing, moving, nor rotating thus all set to false
var isPulse = false;
var isMove = false;
var isRotate = false;

var width;

var x, y, z;  //x, y, z, values of the center of object

//set vertices and polygons
function initialize(numVer, ver, numPoly, verIdx){

    reset();  //ensure no value from previous read file remains in variables
    
    numVertices = numVer;
    numPolygons = numPoly;
    vertices = ver;
    vertexIndx = verIdx;
  
    for(var p = 0; p < numPolygons; p++)
        calcNormal(p);

    draw();
}

//reset variables used to store values parsed from file to zero or empty array
function reset(){
    numVertices = 0; numPolygons = 0;
    vertices = []; vertexIndx = [];
    normalsArray = []; extents = [];
    pulseOut = true;
    moveX = 0.0; moveY = 0.0; moveZ = 0.0;
    pulseX = 0.0; pulseY = 0.0; pulseZ = 0.0;
    isPulse = false; isMove = false; isRotate = false;
    theta = 0.0;
}

//draw image from given file data
function draw(){
    // Retrieve <canvas> element
    var canvas = document.getElementById('webGL');

    // Get the rendering context for WebGL
    gl = WebGLUtils.setupWebGL(canvas, undefined);
    if (!gl) {
        console.log('Failed to get the rendering context for WebGL');
        return;
    }

    // Initialize shaders
    program = initShaders(gl, "vshader", "fshader");
    gl.useProgram(program);

    gl.viewport(0, 0, canvas.width, canvas.height);

    //clear canvas
    gl.clearColor(1.0, 1.0, 1.0, 1.0);
    gl.clear(gl.COLOR_BUFFER_BIT);

    calcExtent();

    width = extents[1] - extents[0];
    var depth = extents[5] - extents[4];
    var height = extents[2] - extents[3];

    //calculate center of box formed from extents
    x = extents[0] + width/2.0;
    y = extents[3] + height/2.0;
    z = extents[4] + depth/2.0;

    var dis = width+height;  //camera to center distance

    //Camera view, viewMatrix
    var eye = vec3(x, y, z + dis);
    var at = vec3(x, y, z);
    var up = vec3(0.0, 1.0, 0.0);

    var viewMatrix = lookAt(eye, at, up);
    var viewMatrixLoc = gl.getUniformLocation(program, "viewMatrix");
    gl.uniformMatrix4fv(viewMatrixLoc, false, flatten(viewMatrix));

    //handle extents, projection matrix
    //calculate nar, far, and fovy value
    var near = dis - depth;
    var far = near + 10.0*depth;
    if(height > width)
        var rad = Math.atan((0.7 * height)/dis);
    else
        var rad = Math.atan((0.7 * width)/dis);
    var fovy = rad * 2.0 * (180/Math.PI);

    var thisProj = perspective(fovy, 1.0, near, far);
    var projMatrix = gl.getUniformLocation(program, 'projMatrix');
    gl.uniformMatrix4fv(projMatrix, false, flatten(thisProj));

    gl.enable(gl.DEPTH_TEST);

    //clear canvas
    gl.clearColor(0.0, 0.0, 0.0, 1.0);
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

    //render each triangle
    for(var p = 0; p < numPolygons; p++){
        renderPolygon(p);
    }

    //handles any keypress events
    window.onkeypress = keyEvent;
}

//renders a single polygon/face (triangles in this project)
function renderPolygon(p){
    //get the first index of vertexIndx array corresponding to the number of the
    // polygon and set polyPoints to the three vertices that make up the triangle
    var a = p * 3;
    var polyPoints = [];
    polyPoints.push(vertices[vertexIndx[a]]);
    polyPoints.push(vertices[vertexIndx[a+1]]);
    polyPoints.push(vertices[vertexIndx[a+2]]);

    //create buffer for points
    var vBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, vBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, flatten(polyPoints), gl.STATIC_DRAW);

    var vPosition = gl.getAttribLocation(program, "vPosition");
    gl.vertexAttribPointer(vPosition, 4, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(vPosition);

    //set color of each vertices to white
    var colors = [];
    colors.push(1.0, 1.0, 1.0, 1.0);
    colors.push(1.0, 1.0, 1.0, 1.0);
    colors.push(1.0, 1.0, 1.0, 1.0);

    //create buffer for colors
    var cBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, cBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, flatten(colors), gl.STATIC_DRAW);

    var vColor = gl.getAttribLocation(program, "vColor");
    gl.vertexAttribPointer(vColor, 4, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(vColor);

    //translations x, y, z directions along with pulsing
    var translateMatrix = translate(moveX, moveY, moveZ);
    var pulseMatrix = translate(pulseX, pulseY, pulseZ);

    var axis = vec3(extents[0] - extents[1], y, z);
    var rotMatrix = rotate(theta, axis);

    var ctMatrix = mult(translateMatrix, mult(rotMatrix, pulseMatrix));

    var ctMatrixLoc = gl.getUniformLocation(program, "modelMatrix");
    gl.uniformMatrix4fv(ctMatrixLoc, false, flatten(ctMatrix));

    gl.drawArrays(gl.LINE_LOOP, 0, polyPoints.length);
}

//calculate the normal of a polygon
function calcNormal(p){
    var a = p * 3;
    var ver = []; //vertices of the polygon

    ver.push(vertices[vertexIndx[a]]);
    ver.push(vertices[vertexIndx[a+1]]);
    ver.push(vertices[vertexIndx[a+2]]);
    ver.push(vertices[vertexIndx[a]]);

    // x, y, z, component of normal
    var mx = 0, my = 0, mz = 0;
    var x1, y1, z1, x2, y2, z2;

    //using Newell's Method to find x, y, z component of normal
    for(var i = 0; i < ver.length - 1; i++){
        x1 = ver[i][0]; x2 = ver[i+1][0];
        y1 = ver[i][1]; y2 = ver[i+1][1];
        z1 = ver[i][2]; z2 = ver[i+1][2];

        //x, (yi - ynext)*(zi + znext)
        mx += (y1 - y2) * (z1 + z2);
        //y, (zi - znext)*(xi + xnext)
        my += (z1 - z2) * (x1 + x2);
        //z, (xi - xnext)*(yi + ynext)
        mz += (x1 - x2) * (y1 + y2);
    }
    //magnitude of normal vector
    var magnitude = Math.sqrt(mx*mx + my*my + mz*mz);
    //normalize normal vector
    var normal = vec3(mx/magnitude, my/magnitude, mz/magnitude);
    normalsArray.push(normal);
}

//calculate the extent values
function calcExtent(){
    var v = vertices[0];   //temporary variable to store a vertex

    //minimum and maximum x, y, z, values and set to be  the first vertex coordinates
    var minx = v[0], maxx = v[0];
    var miny = v[1], maxy = v[1];
    var minz = v[2], maxz = v[2];

    for(var i = 1; i < vertices.length; i++){
        v = vertices[i];
        if(minx > v[0])
            minx = v[0];
        if(miny > v[1])
            miny = v[1];
        if(minz > v[2])
            minz = v[2];
        if(maxx < v[0])
            maxx = v[0];
        if(maxy < v[1])
            maxy = v[1];
        if(maxz < v[2])
            maxz = v[2];
    }
    extents = [minx, maxx, maxy, miny, minz, maxz];
}

//transformation for pulsing
function pulse(){
    if(isPulse) {
        gl.clear(gl.COLOR_BUFFER_BIT);

        for (var p = 0; p < numPolygons; p++) {
            pulseX = normalsArray[p][0] * alpha;
            pulseY = normalsArray[p][1] * alpha;
            pulseZ = normalsArray[p][2] * alpha;

            renderPolygon(p);
        }

        if (alpha >= 0.07)
            pulseOut = false;
        else if (alpha <= 0.0)
            pulseOut = true;

        if (pulseOut)
            alpha += 0.002 * width; //move pieces outward
        else
            alpha -= 0.002 * width; //move pieces inward

        requestAnimationFrame(pulse);
    }
}

//translate in specified direction
function move(){
    if(isMove) {
        gl.clear(gl.COLOR_BUFFER_BIT);

        for (var p = 0; p < numPolygons; p++)
            renderPolygon(p);

        if (direction === "L")
            moveX -= 0.01 * width;
        else if (direction === "R")
            moveX += 0.01 * width;
        else if (direction === "T")
            moveY += 0.01 * width;
        else if (direction === "B")
            moveY -= 0.01 * width;
        else if (direction === "F")
            moveZ += 0.01 * width;
        else
            moveZ -= 0.01 * width;

        requestAnimationFrame(move);
    }
}

//rotates object in an x-roll
function x_roll(){
    if(isRotate){
        gl.clear(gl.COLOR_BUFFER_BIT);

        for(var p = 0; p < numPolygons; p++)
            renderPolygon(p);

        theta += 2.0;

        requestAnimationFrame(x_roll);
    }
}

function toggleMove(){
    if(!isMove){
        isMove = true;
        move();
    }
    else
        isMove = false;
}

//handles all key events
function keyEvent(event){
    var key = event.key;
    switch(key){
        case '!': //translate positive x direction
            direction = "R";
            toggleMove();
            break;
        case '@': //translate negative x direction
            direction = "L";
            toggleMove();
            break;
        case '#': //translate positive y direction
            direction = "T";
            toggleMove();
            break;
        case '$': //translate negative y direction
            direction = "B";
            toggleMove();
            break;
        case '%': //translate positive z direction
            direction = "F";
            toggleMove();
            break;
        case '^': //translate negative z direction
            direction = "K";
            toggleMove();
            break;
        case '&': //rotates
            if(!isRotate){
                isRotate = true;
                x_roll();
            }
            else
                isRotate = false;
            break;
    }
}