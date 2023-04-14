#!/usr/bin/env node
require('colors');//agrega colores al prompt
const prompt = require('prompt');
const RSVP = require('rsvp');
const command = require( 'child_process' ).spawnSync;

const fs = require('fs'),
  readline = require('readline');
const Firebase = require('./firebase.js');

const util = require('util');



var user = {
  name:'emma',
  password:'123456'
};
//valida str /^[a-zA-Z\s\-\@\.]+$/
var schema = {
  properties: {
    name: {
      description:'Enter your name plz...'.green,
      message: 'Enter validad data',
      required: true
    },
    password: {
      hidden: true,
      replace:'*'
    }
  }
};
var menuSchema = {
  properties:{
    cloneRepoReactjs:{
      description:'Enter Option:',
      message:'it isnt valid option',
      required:true,
      pattern:/^[1239]+$/

    }
  }
}
function menuShow(){
  //console.log('\033[2J'); //limpia pero no vuelve a cero el curzor


  //this do clean interface or window
  console.log("\u001b[2J\u001b[0;0H");

  titleProgram();
  prompt.message = '>';
  prompt.delimiter='';
  console.log('Select Option');
  console.log(' 1 - Clonar repo baseline for ReactJS'.blue);
  console.log(' 2 - Get JS files'.blue);
  console.log(' 3 - Add firebase lib'.blue);
  console.log(' 9 - Exit'.red);
  prompt.get(menuSchema,(err,result)=>{
    console.log(result.cloneRepoReactjs);
    if(result.cloneRepoReactjs!='9')menuShow();
    else{
    console.log('Goodbye!');
    }
  });
}


// console.log('Green color'.green); // outputs green text
// console.log('its underline, red and inverse'.underline.red.inverse) // outputs red underlined text
// console.log('its white, bgGreen and Bold'.white.bgGreen.bold); // inverses the color
// console.log('its Rainbows!Colorful'.rainbow); // rainbow
// console.log('Que raro es eso'.trap); // Drops the bass

// Firebase.auth().onAuthStateChanged((user)=>{
//   if(user){
//     console.log('entro en loggedOn');
//   }else{
//     console.log('entro en loggedoff');
//   }
// });
function titleProgram(){
  console.log('                     [-------- ToRoSoFt --------]                     '.bgBlue.white.bold);
}
titleProgram();
var email='juaninsis@gmail.com';
var password='12345678'
function writeFile(nameFile,textFile){
  console.log(textFile);
  console.log('write file');
  fs.writeFile(nameFile,textFile,
    (err)=>{
      if(err)console.log(err);
      else {
        console.log('File was saved!');
        process.exit();
      };
    }
   )
}
function readFile(nameFile){
  var text = fs.readFileSync(nameFile,'utf8')
  console.log('read file');
  text = text.replace('//edit code',`//edit code
console.log('nuevo agregado');`)
writeFile(nameFile,text);
}

function login(){
  prompt.start();
  prompt.get(schema,(err,result)=>{
    email = result.name,password=result.password;
    Firebase.auth().signInWithEmailAndPassword(email,password)
       .then((userRecord)=>{
         console.log("Successfully exists");
         //readFile();
         fs.writeFile("./prueba.js",`console.log('Hola mundo');
         console.log('esto es otro valor');`,
           (err)=>{
             if(err)console.log(err);
             else {
               console.log('File was saved!');
               process.exit();
             };
           }
          )
       })
       .catch(function(error) {
         console.log(error);
           console.log('el usuario no existe');
           login();
           // Firebase.auth().createUserWithEmailAndPassword(email,password)
           // .then((userSave)=>{
           //   console.log('User create successfully');
           // })
           // .catch(errorCreate=>{
           //   console.log(errorCreate);
           // });
       });

    //console.log(result.password);
  });

}
function searchFilesInFolderJSON(pathstr,ext){

  ls = command('ls',pathstr);
  var result = ls.stdout.toString().split('\n');
  result = result.filter(n=>n!='');
  var json = {};
  result.map(element=>{
    if(fs.lstatSync(pathstr+element).isFile()){
      var extes = element.split('.');
      extes = extes[extes.length-1];
      if(extes===ext){
        if(!json[pathstr])json[pathstr]=[];
        json[pathstr].push(pathstr+element);
      }
    }
  });
  console.log(json);
}
function searchFilesInFolderArray(pathstr,ext){
  const command = require( 'child_process' ).spawnSync;
  ls = command('ls',pathstr);
  var result = ls.stdout.toString().split('\n');
  result = result.filter(n=>n!='');
  var arr = [];
  result.map(element=>{
    if(fs.lstatSync(pathstr+element).isFile()){
      var extes = element.split('.');
      extes = extes[extes.length-1];
      if(extes===ext){
        arr.push(pathstr+element);
      }
    }
  });
  return arr;
}
function commander(command,params = './'){
  const spawn = require( 'child_process' ).spawnSync;
  var ls='';
  if (params) ls = spawn( command ,params);
  else ls = spawn( command );
  var result = ls.stdout.toString().split('\n');
  result = result.filter(n=>n!='');
  json={};
  var arrLocal = searchFilesInFolderArray([params[0]],'js');
  if(arrLocal)json[params]=arrLocal;
  result.map((element)=>{
    if(fs.lstatSync(params[0]+element).isDirectory()){
      var arr = searchFilesInFolderArray([params[0]+element+'/'],'js');
      if(arr){
        json[params[0]+element+'/']=arr;
      }
    }
    if(params) console.log(element+':',fs.lstatSync(params[0]+'/'+element).isDirectory()?'is Directory'.red:fs.lstatSync(params[0]+'/'+element).isFile()?'is File'.blue:'is undefined'.yellow);
    else console.log(element+':',fs.lstatSync(params+element).isDirectory()?'is Directory'.red:fs.lstatSync(params+element).isFile()?'is File'.blue:'is undefined'.yellow);
  });

  console.log(json);
}
//login();
//readFile('./prueba.js');
function getArgs(){
  return process.argv.splice(process.execArgv.length+2);
}

module.exports.readFile=readFile;
module.exports.writeFile=writeFile;
module.exports.commander=commander;
module.exports.searchFilesInFolderArray=searchFilesInFolderArray;
module.exports.searchFilesInFolderJSON=searchFilesInFolderJSON;
module.exports.login= login;
module.exports.getArgs=getArgs;
module.exports.menuShow = menuShow;
//commander('ls',['./']);
//var argv = getArgs();
//if (argv)console.log('Hello Sr.',argv[0]+(argv[1]?' '+argv[1]:''));
