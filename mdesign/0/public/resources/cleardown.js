var Cleanser = (function() {
	var opts = {
		trace : false,
		stepDelay : 200,
		applicationID: null,
		cookies : {
			clear : true,
			exclude : ['user']
		},
		ls : {
			clear : true,
			exclude : ['lastManifestGuid', 'applicationID', 'phonegapPresent', 'shellType']
		},
		sql : {
			clearRows : true,
			dropTables : false,
			dbname : 'mDesign',
			dbver : '1.0',
			dbdesc : 'Dummy Description',
			tables : ["subject", "attachment", "expandDB"]
		},
		idb : {
			clearStores : true,
			deleteDB : true,
			dbname : 'mDesign',
			dbvermin : 15,
			dbvermax : 35
		},
        fs : {
            clear : true
        }
	};

	var clearSteps = [];

	function doNextStep() {
		function doNextStep2() {
			if (clearSteps.length > 0) {
				clearSteps.pop()();
			} else {
				ext.oncompleted();
			}
		}


		window.setTimeout(doNextStep2, opts.stepDelay);
	}

	function setStatus(msg) {
		ext.setStatus(msg);
	}

	function setErrorStatus(msg) {
		setStatus('*** ' + msg);
	}

	function trace(msg) {
		if (opts.trace) {
			setStatus(msg);
		}
	}

	function clearSql() {
		function clearSqlTables() {
			function clearNextSqlTable() {
				function clearSqlTable(table) {
					function validateTableExistence(tx) {
						function validateOK(tx, r) {
							function deleteOK(tx, r) {
								function dropOK(tx, r) {
									trace('table \'' + table + '\' dropped');
									clearNextSqlTable();
								}

								function dropBad(tx, err) {

								}

								trace('rows cleared in \'' + table + '\'');
								if (opts.sql.dropTables) {
									var sql = 'DROP TABLE IF EXISTS ' + table;
									tx.executeSql(sql, undefined, dropOK, dropBad);
								} else {
									clearNextSqlTable();
								}
							}

							function deleteBad(tx, r) {
								setErrorStatus('could not delete rows for ' + table);
								clearNextSqlTable();
							}

							if (r.rows.length > 0) {
								var sql = 'DELETE FROM \'' + table + '\'';
								tx.executeSql(sql, undefined, deleteOK, deleteBad);
							} else {
								trace('table \'' + table + '\' does not exist - skipping');
								clearNextSqlTable();
							}
						}

						function validateBad(tx, err) {
							setErrorStatus('could not validate table existence for ' + table);
							clearNextSqlTable();
						}

						var sql = 'SELECT name FROM sqlite_master WHERE type=\'table\' AND name=\'' + table + '\'';
						tx.executeSql(sql, undefined, validateOK, validateBad);
					}

					trace('Clearing table \'' + table + '\' ...');
					if (opts.sql.clearRows) {
						db.transaction(validateTableExistence);
					} else {
						//db.transaction
					}
				}

				if (tables.length > 0) {
					clearSqlTable(tables.pop());
				} else {
					setStatus('Sql storage cleared.');
					doNextStep();
				}
			}

			var tables = opts.sql.tables.slice();
			var db = openDatabase('mDesign', '', 'Dummy Description', 1024 * 1024);
			trace('opened sql db');
			clearNextSqlTable();
		}

		if ( typeof (window.openDatabase) === 'function') {
			setStatus('Clearing sql storage ...');
			clearSqlTables();
		} else {
			setStatus('Sql api does not exist - skipping');
			doNextStep();
		}
	}

	function clearIndexedDB() {
		if (window.indexedDB) {
			function clearIDBStores() {
				function openUpgrade(event) {
					function createTestDbSchema(db) {
					}

					trace('onupgradeneeded - creating test data');
					createTestDbSchema(event.target.result);
				}

				function openOK(event) {
					function onDbError(event) {
						setErrorStatus("iDB DB error: " + event.target.errorCode);
						doNextStage();
					}

					function finishDbPurge() {
						db.close();
						deleteIDBDatabase();
					}

					function onTxComplete(event) {
						setStatus('IndexedDB storage cleared.');
						finishDbPurge();
					}

					function onTxError(event) {
						setErrorStatus("iDB Tx error" + event.target.errorCode);
						finishDbPurge();
					}

					function traceStores(stores) {
						if (opts.trace) {
							trace('--- object stores: ---');
							for (var i = 0; i < stores.length; i++) {
								trace(stores.item(i));
							}
							trace('---------------------');
						}
					}

					function purgeStore(index, stores) {
						function onClearOK() {
							trace(sname + ' cleared');
							purgeStore(++index, stores);
						}

						if (index >= stores.length) {
							trace('no more stores to purge!');
						} else {
							var sname = stores.item(index);
							var ostore;
							try {
								ostore = tx.objectStore(sname);
							} catch (e) {
								SetErrorStatus('iDB error: ' + e.name + ' caught');
								finishDbPurge();
							}
							var req = ostore.clear();
							req.onsuccess = onClearOK;
						}
					}

					trace('Version ' + dbver + ' of database opened ok')
					var db = req.result;
					var stores = db.objectStoreNames;
					if (stores.length == 0) {
						finishDbPurge();
					} else {
						traceStores(stores);
						db.onerror = onDbError;
						var tx = db.transaction(stores, "readwrite");
						tx.oncomplete = onTxComplete;
						tx.onerror = onTxError;
						purgeStore(0, stores);
					}
				}

				function openBad(event) {
					if (req.error.name == 'VersionError' && ++dbver <= opts.idb.dbvermax) {
						openDB();
					} else {
						setErrorStatus("IndexedDB open failed: " + req.error.name);
						doNextStep();
					}

				}

				function openDB() {
					req = window.indexedDB.open(opts.idb.dbname, dbver);
					req.onerror = openBad;
					req.onsuccess = openOK;
					req.onupgradeneeded = openUpgrade;
				}

				setStatus('Clearing indexedDB storage ...');
				var dbver = opts.idb.dbvermin;
				var req;
				openDB();
			}

			function deleteIDBDatabase() {
				function dbDeleteOK() {
					setStatus('IndexedDB database deleted');
					doNextStep();
				}

				function dbDeleteBad() {
					setErrorStatus('IndexedDB deleteDatabase failure');
					doNextStep();
				}

				if (opts.idb.deleteDB) {
					if ( typeof (window.indexedDB.deleteDatabase) === 'function') {
						setStatus('Deleting indexedDB database');
						var req = window.indexedDB.deleteDatabase(opts.idb.dbname);
						req.onerror = dbDeleteBad;
						req.onsuccess = dbDeleteOK;
					} else {
						setErrorStatus('IndexedDB api has no deleteDataba');
						doNextStep();
					}
				} else {
					doNextStep();
				}
			}

			if (opts.idb.clearStores) {
				clearIDBStores();
			} else {
				deleteIDBDatabase();
			}
		} else {
			setStatus('IndexedDB api not found - skipping');
			doNextStep();
		}

	}
    
    function clearFileSystem() {
        function clearFileSystemComplete() {
            setStatus('File system cleared');
            doNextStep();
        }
        function clearFileSystemFailed(error) {
            setErrorStatus('Failed to clear file system - error ' + error.code);
            doNextStep();
        }
        function gotApplicationDir(applicationDir) {
            setStatus('Clearing file system...');
            applicationDir.removeRecursively(clearFileSystemComplete, clearFileSystemFailed);
        }
        function gotFileSystem(fs) {			
            if (opts.applicationID) {
                fs.root.getDirectory('mDesign/' + opts.applicationID, {create: false}, gotApplicationDir, clearFileSystemComplete);
            } else {
                setStatus('File system not used - skipping');
                doNextStep();
            }
        }
        function noFileSystem() {				
            setErrorStatus('File system not available - skipping');
            doNextStep();
        }
        window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, gotFileSystem, noFileSystem);
    }

	function clearLocalStorage() {
		function clearLocalStorageItems() {
			var keys = [];
			for (var n = 0; n < localStorage.length; ++n) {
				if (opts.ls.exclude.indexOf(localStorage.key(n)) == -1) {
					keys.push(localStorage.key(n));
				}
			}

			for (var n = 0; n < keys.length; ++n) {
				localStorage.removeItem(keys[n]);
			}
		}

		setStatus('Clearing local storage ...');
		clearLocalStorageItems();
		setStatus('Local storage cleared.');
		doNextStep();
	}

	function clearCookies() {
		function clearAllCookies() {
			var cookie, cookies, i, eqPos, name;
			cookies = document.cookie.split(";");
			for ( i = 0; i < cookies.length; i++) {
				cookie = cookies[i];
				eqPos = cookie.indexOf("=");
				name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
				while (name.substring(0, 1) === ' ') {
					name = name.substring(1, name.length);
				}
				if (opts.cookies.exclude.indexOf(name) == -1) {
					document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/";
				}
			}
		}

		setStatus('Clearing cookies ...');
		clearAllCookies();
		setStatus('Cookies cleared');
		doNextStep();
	}

	function clear() {
		trace('in clear()');

		if (opts.idb.clearStores || opts.idb.deleteDB) {
			clearSteps.push(clearIndexedDB);
		}

		if (opts.sql.clearRows || opts.sql.dropTables) {
			clearSteps.push(clearSql);
		}

		if (opts.fs.clear) {
			clearSteps.push(clearFileSystem);
		}

		if (opts.ls.clear) {
			clearSteps.push(clearLocalStorage);
		}

		if (opts.cookies.clear) {
			clearSteps.push(clearCookies);
		}

		doNextStep();
	}

	function onCompletedDefault() {
	}

	function setStatusDefault(msg) {
	}

	var ext = {
		clear : clear,
        setApplicationID: function(applicationID) { 
            opts.applicationID = applicationID; 
        },
		disableClearCookies : function() {
			opts.cookies.clear = false;
		},
		disableClearLocalStorage : function() {
			opts.ls.clear = false;
		},
		disableClearWebSql : function() {
			opts.sql.clearRows = false;
			dropTables = false;
		},
		disableClearIndexedDB : function() {
			opts.idb.clearStores = false;
			opts.idb.deleteDB = false;
		},
        disableClearFileSystem: function () { 
            opts.fs.clear = false; 
        },
		includeLocalStorageKey: function(key) {
			var index = opts.ls.exclude.indexOf(key);
			if (index > -1) {
				opts.ls.exclude.splice(index, 1);
			}			
		},
		oncompleted : onCompletedDefault,
		setStatus : setStatusDefault
	};

	return ext;
})();
