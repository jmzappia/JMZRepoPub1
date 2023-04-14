#!/usr/bin/env node
const chalk = require('chalk');
const fse = require('fs-extra');
const path = require('path');


let defaultBGColor='yellow',
defaultCharColor='black';
let key='',indexAcu={},rowAcu='',rowAcuHead='',columns,diff=0;
let colorArr = ['red','green','yellow','blue','magenta','cyan','white','gray','black']
module.exports.jsonToPrettyTable = (objList,bgColor=defaultBGColor,charColor=defaultCharColor, rows=process.stdout.rows) => {
  colorArr.map( color => {
    if(bgColor.toLowerCase().indexOf(color.toLowerCase()) != -1)bgColor='bg'+color[0].toUpperCase()+color.slice(1);
    if(charColor.toLowerCase().indexOf(color.toLowerCase()) != -1)charColor=color;
  });
  if(bgColor.match(/^bg/)){
    columns=process.stdout.columns;
    indexAcu={};
    key='';
    for(key in objList[0]){
      indexAcu[key] = key.length;
    }
    objList.map( element => {
      key='';
      for(key in element){
        if(!indexAcu[key] || indexAcu[key] < element[key].toString().length) indexAcu[key]=element[key].toString().length;
      }
    });
    //header
    objList
    key='',
    rowAcuHead='';
    for(key in objList[0]){
      let dif = indexAcu[key]-key.toString().length;
      let midd = parseInt(dif/2);
      let rest = dif % 2;
      rowAcuHead+='| '
      for(let j=0;j<midd;j++) rowAcuHead+=' ';
      rowAcuHead+=key.toUpperCase();
      for(let j=0;j<midd;j++) rowAcuHead+=' ';
      if(rest>0) rowAcuHead+=' ';
    }
    rowAcuHead = rowAcuHead+'|';
    diff = columns-rowAcuHead.length;
    diff = diff /2;
    for(let j = 0;j<diff-1;j++){
      rowAcuHead=' '+rowAcuHead+' ';
    }
    console.log(chalk[bgColor][charColor](rowAcuHead));
    let count=0;
    objList.map( element => {
      count++;
      key='',
      rowAcu='';
      for(key in element){
        let dif = indexAcu[key]-element[key].toString().length;
        let midd = parseInt(dif/2);
        let rest = dif % 2;
        rowAcu+='| '
        for(let j=0;j<midd;j++) rowAcu+=' ';
        rowAcu+=element[key];
        for(let j=0;j<midd;j++) rowAcu+=' ';
        if(rest>0) rowAcu+=' ';
      }
      if(count>= (rows-1)){
        count=0;
        console.log(chalk[bgColor][charColor](rowAcuHead));
      }
      rowAcu = rowAcu+"|";
      diff = columns-rowAcu.length;
      diff = diff /2;
      for(let j = 0;j<diff-1;j++){
        rowAcu=' '+rowAcu+' ';
      }
      console.log(rowAcu);
    });
    return indexAcu;
  }else{
    return 'BG Color error';
  }
};


module.exports.jsonFileToPrettyTable = (filePath,bgColor=defaultBGColor,charColor=defaultCharColor, rows=process.stdout.rows) => {
  if(!filePath || filePath.legnth<1){
    filePath = process.title.split(/\s/);
    filePath = filePath[filePath.length-1];
  }
  if(filePath.indexOf(process.cwd())) filePath = process.cwd()+path.sep+filePath;

  if(filePath && !filePath.match(/\/|\\/g))filePath = './'+filePath;
  console.log(filePath);
  if(!fse.pathExistsSync(filePath)) console.log('filePath is not Exists!!');
  else{
    let objList = require(filePath);
    colorArr.map( color => {
      if(bgColor.toLowerCase().indexOf(color.toLowerCase()) != -1)bgColor='bg'+color[0].toUpperCase()+color.slice(1);
      if(charColor.toLowerCase().indexOf(color.toLowerCase()) != -1)charColor=color;
    });
    if(!bgColor.match(/^bg/)) bgColor='yellow'
      columns=process.stdout.columns;
      indexAcu={};
      key='';
      for(key in objList[0]){
        indexAcu[key] = key.length;
      }
      objList.map( element => {
        key='';
        for(key in element){
          if(!indexAcu[key] || indexAcu[key] < element[key].toString().length) indexAcu[key]=element[key].toString().length;
        }
      });
      //header
      objList
      key='',
      rowAcuHead='';
      for(key in objList[0]){
        let dif = indexAcu[key]-key.toString().length;
        let midd = parseInt(dif/2);
        let rest = dif % 2;
        rowAcuHead+='| '
        for(let j=0;j<midd;j++) rowAcuHead+=' ';
        rowAcuHead+=key.toUpperCase();
        for(let j=0;j<midd;j++) rowAcuHead+=' ';
        if(rest>0) rowAcuHead+=' ';
      }
      rowAcuHead = rowAcuHead+'|';
      diff = columns-rowAcuHead.length;
      diff = diff /2;
      for(let j = 0;j<diff-1;j++){
        rowAcuHead=' '+rowAcuHead+' ';
      }
      console.log(chalk[bgColor][charColor](rowAcuHead));
      let count=0;
      objList.map( element => {
        count++;
        key='',
        rowAcu='';
        for(key in element){
          let dif = indexAcu[key]-element[key].toString().length;
          let midd = parseInt(dif/2);
          let rest = dif % 2;
          rowAcu+='| '
          for(let j=0;j<midd;j++) rowAcu+=' ';
          rowAcu+=element[key];
          for(let j=0;j<midd;j++) rowAcu+=' ';
          if(rest>0) rowAcu+=' ';
        }
        if(count>= (rows-1)){
          count=0;
          console.log(chalk[bgColor][charColor](rowAcuHead));
        }
        rowAcu = rowAcu+"|";
        diff = columns-rowAcu.length;
        diff = diff /2;
        for(let j = 0;j<diff-1;j++){
          rowAcu=' '+rowAcu+' ';
        }
        console.log(rowAcu);
      });
    return indexAcu;
  }
};
if (require.main === module) {
  console.log('hola mundoooo');
  let argv = process.argv.slice(2).join();
  this.jsonFileToPrettyTable(argv);
}
