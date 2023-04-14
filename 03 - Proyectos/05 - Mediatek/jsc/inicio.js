function iniciar_vars() {
	let contenidos  = "";
	let estilo      = "toolbar=0,scrollbars=no,location=0,statusbar=0,menubar=0,resizable=no,border=0,width=500,height=600,left=650,top=10";
    let destino     = "";
    let ruta_acceso = "";

	imagen                = document.getElementById('imagen');
	let source            = imagen;
    let txtbuscar         = "";

    let ipUsuario         = geoplugin_request();
	let statusUsuario     = geoplugin_status();
	let codPaisUsuario    = geoplugin_countryCode();
	let paisUsuario       = geoplugin_countryName();
	let continenteUsuario = geoplugin_continentCode();
	let zonahoraUsuario   = geoplugin_timezone();

	let tempDate          = new Date();
	let tempYear          = tempDate.getFullYear();
	let tempMonth         = tempDate.getMonth() + 1;
	let tempDay           = tempDate.getDate();

	let tempFechaComp     = tempDay + "/" + tempMonth + "/" + tempYear;

	let registroLog       = armarRegistroLog(ipUsuario, tempFechaComp, statusUsuario, codPaisUsuario, paisUsuario, continenteUsuario, zonahoraUsuario);
	let grabarLog         = GuardaDeTodo(registroLog);

}


function limpiar_vars() {
	let ruta_acceso       = "";
	let contenidos        = "";
	let estilo            = "";
	let destino           = "";
    
	let imagen            = "";
	let source            = "";

	let accionPopI        = "";
	let accionPopC        = "";

	let ipUsuario         = "";
	let statusUsuario     = "";
	let codPaisUsuario    = "";
	let paisUsuario       = "";
	let continenteUsuario = "";
	let zonahoraUsuario   = "";

	let tempDate      = "";
	let tempYear      = "";
	let tempMonth     = "";
	let tempDay       = "";

	let tempFechaComp = "";

	let registroLog   = "";

}


function cambiaRutaImagen(r) {
    if (r || ('pag/quienessomos.html')) {
        const ruta_acceso = 'pag/quienessomos.html';
        const contenidos = 'img/Mediatek_Otro_Logo.jpg';

    }   

    if (r || ('pag/servicios.html')) {
        const ruta_acceso = 'pag/servicios.html';
        const contenidos = 'img/Mediatek_Otro_Logo.jpg';

    }

    if (r || ('pag/masinfo.html')) {
        const ruta_acceso = 'pag/masinfo.html';
        const contenidos = 'img/Mediatek_Otro_Logo.jpg';

    }

}


function obtener_usuario(p1) {
	let variable_may = p1.toUpperCase();
	let variable_pos = p1.indexOf(variable_may);

	if (variable_pos != -1) {
		var pos_separador = url.indexOf("&", variable_pos);

		if (pos_separador != -1) {
			return url.substring(variable_pos + variable_may.length + 1, pos_separador);

		} else {
			return url.substring(variable_pos + variable_may.length + 1, url.length);

		}

	} else {
		return "No se encuentra";

	}

}


function maneja_Cache() {
	let js = document.querySelectorAll('script');

	for (var i = 0; i < js.length; i++) {
		js[i].src = js[i].src + '?v=' + Date.now();

	}

	let css = document.querySelectorAll('link');

	for (var i = 0; i < css.length; i++) {
		css[i].href = css[i].href + '?v=' + Date.now();

	}

}


function miBuscador(s) {
	let regExp1 = /field/;
	let regExp2 = /[(,),<,>,[,]]/;
	let str     = s.value;

	if (str == "") {
		alert("El campo de búsqueda debe contener un valor.");
		s.focus();
	}
	else {
		if (typeof regExp1.source != 'undefined')
			if (regExp1.test(str) || regExp2.test(str)) {
				let alrt = "Algunos de los caracteres introducidos no están admitidos.";
				s.focus();
				return alert(alrt);
			}
        //let popBuscar      = mi_Popup(openDbRelativeURL("Google?SearchView&Query=" + escape(str) + "&start=1&count=10"));
        //this.window.onload(document.write.popbuscar);
        let popBuscarNuevo = nvBuscador(s);
        return popBuscarNuevo
        
   	}

}


function nvBuscador(v) {
    let request = require('request');

    let options = {
        url: 'https://app.zenserp.com/api/v2/search?apikey=1d778f50-2493-11ed-ad91-95b6bc5a73bd&q=Pied Piper&tbm=isch&device=desktop&search_engine=google.com.sv'
    };

    function callback(error, response, body) {
        if (!error && response.statusCode == 200) {
            console.log(body);
        }
    }

    let saleBuscar = request(options, callback);
    return saleBuscar;

}

function vistaPrevia() {

	let previa  = document.querySelector('#preview');
	let archivo = document.querySelector('input[type=file]').files;

	function LeeryPrevisualizar(archivo) {

		if (/\.(jpe?g|png)$/i.test(archivo.name)) {
			var reader = new FileReader();

			reader.addEventListener("load", function () {
				var image     = new Image();
				image.height  = 100;
				image.title   = archivo.name;
				image.src     = this.result;
				image.onclick = selectPrincipal(archivo.name);
				preview.appendChild(image);
			}, false);
			reader.readAsDataURL(file);
		}
	}

	if (files) {
		[].forEach.call(files, readAndPreview);

	}
}


function selectPrincipal(nom) {
	var files = document.querySelector('input[type=file]').files;

	Array.from(files).forEach(file => {
		if (archivo.name == nom) {
			document.getElementById("primaryPhoto").value = file;

		}

	});

}


function openDbRelativeURL(url, target) {
	target = (target == null) ? window : target;
	path = location.pathname.split('.nsf')[0] + '.nsf/';
	target.location.href = path + url;

}


function miPopImagen(imagen, url) {
	imagen         = document.getElementById('imagen');
	let source     = imagen;
	let accionPopI = window.open(source, url, "toolbar=0,scrollbars=no,location=0,statusbar=0,menubar=0,resizable=no,border=0,width=600,height=600,left = 650,top = 100");

}


function miPopupCont(contenido, url) {
	contmp         = document.getElementById('contenido');
	contenido      = contmp;
	destino        = url;
	estilo         = "toolbar=0,scrollbars=no,location=0,statusbar=0,menubar=0,resizable=no,border=0,width=500,height=600,left=650,top=10";
	accionPopC     = window.open(contenido, destino, estilo);
	image.onclick  = function () { window.open(contenido, destino, estilo); };

}


function mi_Popup(URL) {
	confpopup = "toolbar=0,scrollbars=0,location=0,statusbar=0,menubar=0,resizable=0,width=610,height=400,left = 350,top = 50";
	nombrewin = URL;
    window.open(URL, nombrewin, confpopup);

}


function armarRegistroLog(ipU, fcC, stU, paC, paU, ctU, zhU) {
	const regLogUsuario = ipU + ", " + fcC + ", " + stU + ", " + paC + ", " + paU + ", " + ctU + ", " + zhU + "." + "chr(13)";
	return regLogUsuario;

}


function guardaLog(reg) {
	const dirLog     = "../log/"
	const nomLog     = "logAccesos.txt";
	const rutaLog    = "dirlog" + "nomLog";
	const regABlob   = new Blob([reg], { type: 'text/plain' });
	const fs         = require('fs')

	const guardarLog = function guardarRegistro() {

		if (fs.existsSync("rutalog")) {
			let fCrearObj  = CreateObject("Scripting.FileSystemObject");
			let fCrearFile = fCrearObj.open("rutaLog", true);
			fCrearFile.WriteLine(regABlob);
			fCrearFile.Close();

		} else {
			let fCrearObj  = CreateObject("Scripting.FileSystemObject");
			let fCrearFile = fCrearObj.CreateTextFile("rutaLog", true);
			fCrearFile.WriteLine(regABlob);
			fCrearFile.Close();

		}

	}

}


function escribeLog(reg) {
	const dirLog   = "log/"
	const nomLog   = "logAccesos.txt";
	const curdir   = window.URL;

	let almacenaDatos = (function () {
		var a   = document.createElement("a");
		document.body.appendChild(a);
		a.style = "display: none";

		return function () {
			var blob   = new File(["reg"], "LogAccesos.txt");
			url        = window.URL.createObjectURL(blob);
			a.href     = url;
			a.download = blob.name;

			a.click();

			window.URL.revokeObjectURL(url);

		};

	});

	let confirmaGuardar = almacenaDatos();

}


let submit = document.getElementById("submit");


function leeArchivo() {
	const dirLog = "./log/"
	const nomLog = "logAccesos.txt";
	const rutaLog = "dirlog" + "nomLog";

	let fso    = new ActiveXObject("Scripting.FileSystemObject");
	let fh     = fso.OpenTextFile("rutalog", 1, false, 0);
	let lineas = "";

	while (!fh.AtEndOfStream) {
		lineas += fh.ReadLine() + "\r";
	}
	fh.Close();
	return lineas;

}


var search = document.getElementById("search");


function GuardaDeTodo(vartexto) {

    let fileSchema = vartexto;

	let ChromeStore = (function (fileSchema) {
        fileSchema = typeof fileSchema !== 'undefined' ? fileSchema : [];
        var fs = null;

        function errorHandler(DOMError) {
            var msg = '';

            switch (DOMError.name) {
                case 'QuotaExceededError':
                    msg = 'QuotaExceededError';
                    break;
                case 'NotFoundError':
                    msg = 'NotFoundError';
                    break;
                case 'SecurityError':
                    msg = 'SecurityError';
                    break;
                case 'InvalidModificationError':
                    msg = 'InvalidModificationError';
                    break;
                case 'InvalidStateError':
                    msg = 'InvalidStateError';
                    break;
                default:
                    msg = 'Unknown Error';
                    break;
            };
            console.log('Error: ' + msg);
        }

        return {

             init: function (requestedBytes, callback) {

                var that = this;

                function createFileSchema(schema) {
                    for (var key in schema) {
                        if (schema.hasOwnProperty(key)) {
                            var obj = schema[key];
                            if (obj['path']) {
                                that.getDir(obj['path'], { create: true }, obj['callback']);
                            }
                        }
                    }
                }

                function requestFS(grantedBytes) {
                    window.webkitRequestFileSystem(window.PERSISTENT, grantedBytes, function (filesystem) {
                        fs = filesystem;
                        console.log('fs: ', arguments); 
                        console.log("Granted Bytes: " + grantedBytes);
                        console.log("**********************************");

                        createFileSchema(fileSchema);

                        if (callback) { callback(that); } 

                    }, errorHandler);
                }

                function getGranted(requestedBytes) {
                    navigator.webkitPersistentStorage.requestQuota(requestedBytes, function (grantedBytes) {
                        console.log("==================================");
                        console.log("PERSISTENT STORAGE");
                        console.log("==================================");
                        console.log("**********************************");
                        console.log('requestQuota: ', arguments);

                        requestFS(grantedBytes, callback);

                    }, errorHandler);
                }


                getGranted(requestedBytes);

            },

            getDir: function (path, flags, callback) {

                function recursiveCreate(path, callback, root) {
                    path = (typeof path === 'object' ? path : path.split('/'));
                    var rootDir = root ? root : fs.root;

                    
                    if (path[0] == '.' || path[0] == '') {
                        path = path.slice(1);
                    }

                    rootDir.getDirectory(path[0], flags, function (dirEntry) {
                        // Recursively add the new subfolder (if we still have another to create).
                        if (path.length - 1) {
                            recursiveCreate(path.slice(1), callback, dirEntry);
                        }
                        else {
                            if (callback) callback(dirEntry);
                        }
                    }, errorHandler);
                }

                recursiveCreate(path, callback);
            },

            /*
                Delete directory
                path        [string]: path to directory in which to delete
                callback    [function]: function to be executed when directory has been deleted
            */
            deleteDir: function (path, flags, callback) {

                var flags = flags || {};
                if (flags.recursive === undefined) flags.recursive = false;

                var rootDir = fs.root;

                rootDir.getDirectory(path, {}, function (dirEntry) {
                    if (flags.recursive) {
                        dirEntry.removeRecursively(function () {

                            //call callback function if specified
                            if (callback) callback();
                        }, errorHandler);
                    }
                    else {
                        dirEntry.remove(function () {

                            //call callback function if specified
                            if (callback) callback();
                        }, errorHandler);
                    }
                }, errorHandler);
            },

            /*
                Rename directory
                path        [string]: path to directory in which to rename
                newName     [string]: new name of directory
                callback    [function]: function to be executed when directory is renamed
            */
            renameDir: function (path, newName, callback) {
                var rootDir = fs.root;
                var pathArray = path.split('/');
                var pLength = pathArray.length;
                var pathToParent = "";

                for (var i = 0; i <= pLength - 2; i++) {
                    pathToParent = pathToParent + pathArray[i] + "/";
                }

                rootDir.getDirectory(pathToParent, {}, function (parentDir) {
                    pathToParent = parentDir;
                }, errorHandler);

                rootDir.getDirectory(path, {}, function (dirEntry) {
                    dirEntry.moveTo(pathToParent, newName, function (newDir) {
                        console.log(path + ' Directory renamed.');

                        //call callback function if specified
                        if (callback) callback(newDir);
                    }, errorHandler);
                }, errorHandler);
            },

            /*  
                Create/get file 
                Directory in which file is created must exist before
                creating file
                path        [string]: path to new file
                create      [boolean]: true creates the file if it doesn't exist,
                exclusive   [boolean]: true will throw an error if file already exists, false will overwrite contents
                callback    [function]: function to be executed when file is created. passed the FileEntry object
            */
            getFile: function (path, flags, callback) {
                fs.root.getFile(path, flags, function (fileEntry) {
                    if (callback) { callback(fileEntry); }
                }, errorHandler);
            },

            /*
                Delete file
                path [string]: path to file in wich to delete
            */
            deleteFile: function (path) {
                fs.root.getFile(path, { create: false }, function (fileEntry) {

                    fileEntry.remove(function () {

                    }, errorHandler);

                }, errorHandler);
            },

            /*
                Rename file
                path        [string]: path to file in which to rename
                newName     [string]: new name of file
                callback    [function]: function in which to execute when file is renamed. 
                                        passed the FileEntry object
            */
            renameFile: function (path, newName, callback) {
                var rootDir = fs.root;
                var pathArray = path.split('/');
                var pLength = pathArray.length;
                var pathToParent = "";

                for (var i = 0; i <= pLength - 2; i++) {
                    pathToParent = pathToParent + pathArray[i] + "/";
                }

                rootDir.getDirectory(pathToParent, {}, function (parentDir) {
                    pathToParent = parentDir;
                }, errorHandler);

                fs.root.getFile(path, {}, function (fileEntry) {
                    fileEntry.moveTo(pathToParent, newName, function () {
                        console.log('File renamed');

                        //call callback function if specified
                        if (callback) callback(fileEntry);
                    }, errorHandler);
                }, errorHandler);
            },

            /*
                Return the number of used and remaining bytes in filesystem
                callback [function]: function to be executed when used and remaining bytes have been received
                                        from filesystem.  passed the number of used and remaining bytes
            */
            usedAndRemaining: function (callback) {
                navigator.webkitPersistentStorage.queryUsageAndQuota(function (used, remaining) {
                    if (callback) { callback(used, remaining); }
                });
            },

            /*
                Create new FileWriter object and returns it to the caller
            */
            createWriter: function () {
                var fw = new FileWriter(fs);
                return fw;
            },

            /*
                Write to a file
                If file does not exist, createFlag must be set to True
                path        [string]: path of file in which to write / create
                fileType    [string]: type of file (eg. video/mp4, application/text)
                data        [string]: blob to be written to the file
                createFlag  [boolean]: create new file
                callback    [function]: function to be executed when data has been written
            */
            write: function (path, fileType, data, flags, callback) {
                var fw = this.createWriter();
                fw.writeData(path, fileType, data, flags, callback);
            },

            /*
                Create new DataReceiver object and returns it to the caller
            */
            createReceiver: function () {
                var receiver = new DataReceiver();
                return receiver;
            },

            /*
                Get data from a specified url
                Returns a function with 'data' parameter
                url         [string]: URL path of the file to be downloaded
                callback    [function]: function to be executed when file has finished downloading
            */
            getData: function (url, callback) {
                var receiver = this.createReceiver();
                receiver.getData(url, callback);
            },

            /*
                Get data from a URL and store it in local persistent storage
                Calls getData and write in sequence
                url         [string]: URL path of the file to be downloaded
                path        [string]: path of file in which to write / create
                fileType    [string]: type of file (eg. video/mp4, application/text)
                createFlag  [boolean]: create new file
                callback    [function]: function to be executed when file has been written
            */
            getAndWrite: function (url, path, fileType, flags, callback) {
                var that = this;
                this.getData(url, function (data) {
                    that.write(path, fileType, data, flags, callback)
                });
            },

            /*
                Delete all files and directories that already exists in local persistent storage
            */
            purge: function () {
                var dirReader = fs.root.createReader();
                dirReader.readEntries(function (entries) {
                    for (var i = 0, entry; entry = entries[i]; ++i) {
                        if (entry.isDirectory) {
                            entry.removeRecursively(function () { }, errorHandler);
                        } else {
                            entry.remove(function () { }, errorHandler);
                        }
                    }
                    console.log('Local storage emptied.');
                }, errorHandler);
            },

            /*
                List all files that exists in the specified path.
                Outputs an array of objects
                path        [string]: path to be listed, defaults to root when not specified
                callback    [function]: function to be executed when file has been written
            */
            ls: function (path, callback) {
                var dirReader;
                var arr = [];
                var rootDir = fs.root;
                var pathArray = path.split('/');
                var pLength = pathArray.length;
                var pathToParent = "";

                for (var i = 0; i <= pLength - 1; i++) {
                    pathToParent = pathToParent + pathArray[i] + "/";
                }

                rootDir.getDirectory(pathToParent, {}, function (parentDir) {
                    pathToParent = parentDir;
                    dirReader = (pathToParent) ? pathToParent.createReader() : fs.root.createReader();
                    dirReader.readEntries(function (entries) {
                        if (!entries.length) {
                            console.log('Filesystem is empty.');
                        }

                        for (var i = 0, entry; entry = entries[i]; ++i) {
                            arr.push({
                                name: entry.name,
                                fileEntry: entry.filesystem
                            });
                        }

                        if (callback) callback(arr);
                    }, errorHandler);
                }, errorHandler);
            }

        };

    });

    /*
        FileWriter Object
        method: writeData
    */
    var FileWriter = (function (filesystem) {
        var fs = filesystem;
        function errorHandler(DOMError) {
            var msg = '';

            switch (DOMError.name) {
                case 'QuotaExceededError':
                    msg = 'QuotaExceededError';
                    break;
                case 'NotFoundError':
                    msg = 'NotFoundError';
                    break;
                case 'SecurityError':
                    msg = 'SecurityError';
                    break;
                case 'InvalidModificationError':
                    msg = 'InvalidModificationError';
                    break;
                case 'InvalidStateError':
                    msg = 'InvalidStateError';
                    break;
                default:
                    msg = 'Unknown Error';
                    break;
            };
            console.log('Error: ' + msg);
        }

        return {
            /*
                Write data to a file
                If file does not exist, createFlag must be set to True
                If file already exists and createFlag is set to True, its content will be overwritten
                path        [string]: path of file in which to write / create
                fileType    [string]: type of file (eg. video/mp4, application/text)
                data        [string]: blob to be written to the file
                createFlag  [boolean]: create new file
                callback    [function]: function to be executed when data has been written
            */
            writeData: function (path, fileType, data, flags, callback) {
                fs.root.getFile(path, flags, function (fileEntry) {

                    // Create a FileWriter object for our FileEntry (log.txt).
                    fileEntry.createWriter(function (fileWriter) {

                        fileWriter.onwriteend = function (e) {
                            console.log('Write completed.');
                            if (callback) { callback(fileEntry); }
                        };

                        fileWriter.onerror = function (e) {
                            console.log('Write failed: ' + e.toString());
                        };

                        // Create a new Blob and write it to log.txt.
                        var blob = new Blob([data], { type: fileType });

                        fileWriter.write(blob);

                    }, errorHandler);

                }, errorHandler);
            }
        }
    });

    /*
        DataReceiver object
        Method: getData
    */
    var DataReceiver = (function () {

        return {

            /*
                Get data from a specified url
                Returns a function with 'data' parameter
                url         [string]: URL path of the file to be downloaded
                callback    [function]: function to be executed when file has finished downloading
            */
            getData: function (url, callback) {
                var xhr = new XMLHttpRequest();
                xhr.open('GET', url, true);
                xhr.responseType = "arraybuffer";

                xhr.onload = function (e) {
                    if (this.status == 200) {
                        callback(this.response);
                    }
                }

                xhr.send();
            }
        }

    });


}

