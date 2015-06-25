var MCAPTURE_ProcessProvisioned_count = 0;
var MCAPTURE_ProcessProvisioning_count = 0;
var MCAPTURE_ProvisioningAborted = false;

(function ($, mc) {
    var timer;
    var delay = 5 * 1000;
    var aborted;

    function checkIfCleardownRequired() {
        var lastManifestGuid = localStorage.getItem('lastManifestGuid');
        var currentManifestGuid = MCAPTURE_CFG.lastManifestGuid;
        var clearType = MCAPTURE_CFG.clearType;

        function navigateToCleardown() {
            window.locationUtils.setHref('../../clear.html?newGuid=no&amp;clearType=' + clearType);
        }

        if (
				clearType != "no-navigate" &&
				typeof lastManifestGuid == 'string' &&
				lastManifestGuid.length > 0 &&
				currentManifestGuid != lastManifestGuid
		) {
            var msg1 = 'Later version(s) of the pr ocess(es) being tested have been downloaded. ';
            var msg2 = clearType == 'full' ? 'All data for this application will now be cleared.' : 'The application will now be reloaded.';
            mCapture.fl.msgboxasync(navigateToCleardown, msg1 + msg2);
            window.localStorage.setItem('lastManifestGuid', currentManifestGuid);
            window.MCAPTURE_ProvisioningAborted = true;
            return true;
        } else {
            window.localStorage.setItem('lastManifestGuid', currentManifestGuid);
            return false;
        }
    }

    function failedToProvision(fromWhere) {
        aborted = true;
        function done(URL) {
            log.debug('On our way home to ' + URL);
        }
        log.debug('Process provisioning error - server did not send all processes');
        if (typeof (mc) !== 'undefined') {
            mc.msgBox(function (text) {
                log.debug('Calling mc.fl.gotoprovisioningurl');
                mc.fl.gotoprovisioningurl(done);
            }, 'Provisioning Error', 'You must retry the operation. Reason: ' + fromWhere, 'OK');
        } else {
            window.location.setHref('../../index.html');
        }
    }

    function processProvisioned(o) {

        function onProvProgress(pc) {
            var el, bar, width;
            if (pc < 0) pc = 0;
            if (pc > 100) pc = 100;
            el = document.getElementById('provProgressBar');
            if (el != null) {
                if (el.tagName === 'PROGRESS') {
                    el.value = pc;
                } else {
                    width = '' + pc + '%';
                    bar = document.getElementById('provProgressComplete');
                    if (bar != null) {
                        bar.style.width = width;
                    }
                }
            }
        }
        if (timer) {
            clearTimeout(timer);
            timer = undefined;
        }
        if (o && o.hasOwnProperty('message')) {
            log.debug('Provisioned process error' + o.message);
        }
        if (aborted) {
            //we are exiting but other errors are forcing a callback
            return;
        }
        if (o && o.hasOwnProperty('delay')) {
            //a process has requested more time
            var newDelay = parseFloat(o.delay);
            log.debug('Provisioning process requested delay: ' + o.delay);
            if (newDelay.constructor !== Number) {
                newDelay = delay;
            } else if (newDelay <= delay) {
                newDelay = delay;
            }

            log.debug('Provisioning process waiting: ' + newDelay);
            timer = setTimeout(processProvisioned, newDelay);
            return;
        }

        if (o && o.hasOwnProperty('name') && o.hasOwnProperty('value')) {
            //a process has been provisioned
            log.debug('Provisioned process ' + o.name);
            timer = setTimeout(processProvisioned, delay);
            MCAPTURE_ProcessProvisioned_count += 1;
            var pc = (MCAPTURE_ProcessProvisioned_count * 100) / MCAPTURE_ProcessProvisioning_count;
            onProvProgress(pc);
        } else {
            if (o && o.hasOwnProperty('message')) {
                failedToProvision('Provisioning error: ' + o.message);
            } else if (o && o.hasOwnProperty('alreadyProvisioned')) {
                // do nothing - we were already provisioned
            } else {
                if (MCAPTURE_ProcessProvisioning_count > 0) {
                    failedToProvision('timeout waiting for process');
                    return;
                }
            }
        }
        if (MCAPTURE_ProcessProvisioned_count < MCAPTURE_ProcessProvisioning_count) {
            return;
        }
        if (timer) {
            clearTimeout(timer);
            timer = undefined;
        }
        log.debug('All proceses have been provisioned');
        provState = localStorage.setItem('provisionedState', 'provisioned');
        if (mc.phonegapPresent()) {
            function onDeviceReady() {
                if (window.plugins && window.plugins.provisioner) {
                    window.plugins.provisioner.setComplete();
                }
                continueToSuccess();
            }
            //------- ZD #8673
            function subscribe_to_ready() {
                if (window.cordova) {
                    document.addEventListener("deviceready", onDeviceReady, false);
                } else {
                    // delayed event lister subscription
                    // to cater for 7.3 upgraded shell to 7.9 mDesign resources.

                    // The delay was added because the built in addEventListener was being
                    // overwritten by cordova, and the listener being lost.
                    setTimeout(subscribe_to_ready, 100);
                }
            }
            subscribe_to_ready();
            //------				
        } else {
            continueToSuccess();
        }

        function continueToSuccess() {
            //alert('All processes provisioned');
            if (mc.db.getExpansionError() !== undefined) {
                mc.msgBox(function (text) {
                    window.MCAPTURE_ProvisioningAborted || success();
                }, 'Error expanding the database', 'You may not be able to use the application fully. Reason: ' + mc.db.getExpansionError(), 'OK');
            } else {
                MCAPTURE_ProvisioningAborted || success();
            }
        }

        function success() {
            var initPage;

            function onInitPageSlidOut(opts) {
                if (opts.direction === 'in') {
                } else {
                    if (initPage) {
                        initPage.unbind('jmuiPageAnimationEnd', onInitPageSlidOut);
                    }
                    success2();
                }
            }

            initPage = $('#InitAppPage');
            if (MCAPTURE_CFG.haveHomeProcess) {
                success2();
            } else {
                if (o && o.hasOwnProperty('alreadyProvisioned')) {
                    success2();
                } else {
                    if (initPage) {
                        initPage.bind('jmuiPageAnimationEnd', onInitPageSlidOut);
                        $.ui.gotoPage($('#processesPage'), 'jmuiSlide', true);
                    }
                }
            }
        }

        function ppaDataLoad(animateOut, completeCallback) {
            var ppaLoadingPage;

            function loadData() {
                mc.ppa.loadData(MCAPTURE_CFG.deviceType, MCAPTURE_CFG.ppaRelativePath, onLoadDataProgress, onLoadDataComplete);
            }

            function onLoadDataComplete() {
                if (animateOut) {
                    $.ui.gotoPage($('#processesPage'), 'jmuiSlide', false);
                } else {
                    completeCallback();
                }
            }

            function onLoadDataProgress(pc) {
                var el, bar, width;
                if (pc < 0) pc = 0;
                if (pc > 100) pc = 100;
                el = document.getElementById('ppaProgressBar');
                if (el && el.tagName === 'PROGRESS') {
                    el.value = pc;
                } else {
                    width = '' + pc + '%';
                    bar = document.getElementById('ppaProgressComplete');
                    if (bar) {
                        bar.style.width = width;
                    }
                }
            }

            function onLoadingPageAnimEnd(opts) {
                if (opts.direction === 'in') {
                    loadData();
                } else {
                    ppaLoadingPage.unbind('jmuiPageAnimationEnd', onLoadingPageAnimEnd);
                    completeCallback();
                }
            }

            if (MCAPTURE_CFG.appType == 'ppa' && MCAPTURE_CFG.havePpaData) {
                if (mc.ppa.dataLoadRequired()) {
                    log.debug('in ppaLoadData');
                    ppaLoadingPage = $('#ppaLoadingPage');
                    ppaLoadingPage.bind('jmuiPageAnimationEnd', onLoadingPageAnimEnd);
                    $.ui.gotoPage(ppaLoadingPage, 'jmuiSlide', true);
                } else {
                    completeCallback();
                }
            } else {
                completeCallback();
            }
        }
        
        function success2() {

            delete window.MCAPTURE_Provisioning_Processes;

            if (MCAPTURE_CFG.haveHomeProcess) {
                if (MCAPTURE_CFG.homeProcessURL != '') {
                    if (MCAPTURE_ProcessProvisioning_count > 0) {
                        (function ($, mc) {
                            // In this version of initPPA, we are not calling the 
                            // completeCallback passed to us because we are redirecting to
                            // another page.
                            function initPPA(completeCallback) {
                                ppaDataLoad(false, function () {
                                    window.locationUtils.setHref(MCAPTURE_CFG.homeProcessURL);
                                });
                            }

                            function isReady() {
                                if (MCAPTURE_CFG.deviceFormat == 'tablet') {
                                    mc.ready(false, 1024, 768, undefined, initPPA);
                                } else {
                                    mc.ready(false, 320, 480, undefined, initPPA);
                                }
                            } 

                            try {
                                $.ready(isReady);
                            } catch (e) {
                                isReady();
                            }

                            //end of anon (function($, mc) {
                        }(window.jmfw, window.mCapture));
                    }
                } else {
                    alert('The home process url is missing from the processes.xml');
                }
            }

            if (!MCAPTURE_CFG.haveHomeProcess || MCAPTURE_CFG.isMisconfiguration) {

                (function ($, mc) {
                    var process, visualize;
                    process = {
                        hidden: true,
                        home: true,
                        id: 'ProcessZero',
                        title: 'Process Zero',
                        url: '../../launch/0/launch.html',
                        version: '1',
                        pages: {
                        }
                    };

                    process.devPlatform = MCAPTURE_CFG.deviceType.trim().toLowerCase();
                    process.deviceClient = MCAPTURE_CFG.deviceClient;
                    process.devClient = (MCAPTURE_CFG.deviceClient == 'unrestricted') ? 'u' : 'r';
                    process.deviceType = MCAPTURE_CFG.deviceType.trim();
                    process.deviceFormat = MCAPTURE_CFG.deviceFormat;
                    process.devFormat = (process.deviceFormat == 'tablet') ? 't' : 'n';
                    process.deviceScreen = MCAPTURE_CFG.deviceScreen;

                    if (MCAPTURE_CFG.isMisconfiguration) {

                        process.pages = {
                            errorPage: {
                                qIdMap: {
                                    launchError: 'launchError'
                                }
                            }
                        };
                        process.dataIdMap = {
                            'launchError': {
                                qIds: ['launchError']
                            }
                        };
                        process.questions = {
                            launchError: {
                                defval: function (callback) {
                                    make_formula(
										function ($$result) {
										    return this.done(MCAPTURE_CFG.launchPageMsg);
										}).execute(
											function (result) {
											    callback(result);
											},
											function () {
											    alert("Asynchronous Function Failure");
											});
                                }
                            }
                        };
                    } else if (MCAPTURE_CFG.processCount == 0) {

                        process.pages = {
                            errorPage: {
                                qIdMap: {
                                    launchError: 'launchError'
                                }
                            }
                        };
                        process.dataIdMap = {
                            'launchError': {
                                qIds: ['launchError']
                            }
                        };
                        process.questions = {
                            launchError: {
                                defval: function (callback) {
                                    make_formula(
										function ($$result) {
										    return this.done("There are no processes deployed to you.<br></br><br></br>Please use the 'Reload' button.");
										}).execute(
											function (result) {
											    callback(result);
											},
											function () {
											    alert("Asynchronous Function Failure");
											});
                                }
                            }
                        };
                    } else if (MCAPTURE_CFG.hasHomeProcess) {
                        // nothing to do here
                    } else {
                        process.pages = {
                            processesPage: {
                                qIdMap: {
                                    inlineProcessSelector: 'inlineProcessSelector'
                                }
                            },
                            subjectsPage: {
                                qIdMap: {
                                    inlineSubjectSelector: 'inlineSubjectSelector'
                                }
                            }
                        };
                        process.dataIdMap = {
                            inlineProcessSelector: {
                                qIds: ['inlineProcessSelector']
                            },
                            inlineSubjectSelector: {
                                qIds: ['inlineSubjectSelector']
                            },
                        };
                        process.questions = {
                            inlineProcessSelector: {
                                template: '<li class="processRow" style="background-image: url(<%=data.icon%>);"> <%=data.title%> </li>'
                            },
                            inlineSubjectSelector: {
                                summaryNames: [
									'name',
									'ishidden'
                                ],
                                tableTemplate: '<table><thead><tr><th>Name</th></tr></thead><tbody></tbody></table>',
                                rowTemplate: '<tr><td class=&quot;jmuiArrow&quot;><span class=&quot;subjectDelete&quot;></span><%=data.name%></td></tr>',
                                selection: 'action_inlineSubjectSelector_select'
                            }
                        };

                    }

                    function isReady() {

                        function initPPA(completeCallback) {
                            ppaDataLoad(true, completeCallback)
                        }

                        function done(URL) {
                            log.debug('On our way home to ' + URL);
                        }

                        function clear(e) {
                            function dbClearSuccess() {
                                log.debug('mc.db.clear success. Calling localStorage.clear ');
                                localStorage.clear();
                                log.debug('Calling mc.db.deleteAllCookies');
                                mc.db.deleteAllCookies();
                                log.debug('Calling mc.fl.gotoprovisioningurl');
                                mc.fl.gotoprovisioningurl(done);
                            }
                            function dbClearError(e) {
                                logerror(e.message);
                                alert(e.message);
                            }
                            if (e.returnValue === true) {
                                e.preventDefault();
                            }
                            mc.msgBox(function (text) {
                                if (text === 'Yes') {
                                    window.locationUtils.setHref('../../clear.html?newGuid=yes&amp;clearType=full');
                                }
                            }, 'Confirm', 'Clear all data?', 'Yes', 'No');
                        }

                        function reload(e) {
                            if (e.returnValue === true) {
                                e.preventDefault();
                                log.debug('Calling mc.fl.gotoprovisioningurl');
                                mc.fl.gotoprovisioningurl(done);
                            }
                        }

                        if (!MCAPTURE_CFG.isMisconfiguration && !MCAPTURE_CFG.haveHomeProcess && MCAPTURE_CFG.processCount != 0) {

                            mc.fl.action_processesPage_pageForward = function ($$result) {
                                return this.done("subjectsPage");
                            };

                            mc.fl.action_inlineSubjectSelector_select = function ($$result) {
                                var summaryInfo = this.getvar("_arg1");
                                if (summaryInfo.ishidden) {
                                    var ishidden = summaryInfo.ishidden.toLowerCase();
                                    if (ishidden === 'true') {
                                        return this.done(false);
                                    }
                                }
                                var selectedProcessId = this.getvar("_arg2").toLowerCase();
                                var subjectProcessId = summaryInfo.processId.toLowerCase();
                                return this.done(subjectProcessId === selectedProcessId);
                            };
                        }

                        mc.fl.preNotification = function ($$result) {
                            return this.done(false);
                        };

                        mc.fl.postNotification = function ($$result) {
                            return this.done(false);
                        };

                        if (!MCAPTURE_CFG.haveHomeProcess || MCAPTURE_CFG.isMisconfiguration) {

                            mc.fl.repl_defaultRepProfile = function () {
                                alert("who called this?");
                            };

                            mc.fl.replContext_defaultRepProfile = {
                                'type': 'normal',
                                'context': {
                                    'username': '$username',
                                    'password': '$password',
                                    'token': '$token',
                                    'subject': '$subject',
                                    'query': ''
                                }
                            };
                        }

                        if (MCAPTURE_CFG.deviceFormat == 'tablet') {
                            mc.ready(false, 1024, 768, process, initPPA);
                        } else {
                            mc.ready(false, 320, 480, process, initPPA);
                        }

                        if (MCAPTURE_CFG.isMisconfiguration) {
                            button = $('.jmuiCancelButton');
                            button.bind($.ui.tapEvent, clear);
                        } else if (MCAPTURE_CFG.processCount == 0) {
                            button = $('.jmuiCancelButton');
                            button.bind($.ui.tapEvent, reload);
                        }

                    } //end of isReady()

                    try {
                        $.ready(isReady);
                    } catch (e) {
                        isReady();
                    }

                    //end of anon (function($, mc) {
                }(window.jmfw, window.mCapture)); //call (function($, mc) {})
            }
        } // success2
    } // processProvisioned

    MCAPTURE_Provisioning_Processes = true;
    MCAPTURE_ProcessProvisioned = processProvisioned;

    if (MCAPTURE_CFG.isMisconfiguration) {
        MCAPTURE_ProcessProvisioning_count = 0;
        sessionStorage.deployedProcesses = JSON.stringify([]);
    } else {
        MCAPTURE_ProcessProvisioning_count = MCAPTURE_CFG.processCount;
        sessionStorage.deployedProcesses = JSON.stringify(MCAPTURE_CFG.processes);
    }

    // Check if new test version of application is available
    if (checkIfCleardownRequired()) {
        return;
    }

    function invokeProvision() {

        function loadScript(jsfile) {
            if (jsfile) {
                var scriptTag = document.createElement('script');
                scriptTag.src = jsfile;
                scriptTag.onload = function () {
                };
                document.head.appendChild(scriptTag);
            }
        }

        if (timer === undefined) {
            timer = setTimeout(processProvisioned, delay);
        }
        MCAPTURE_CFG.processJsFiles.forEach(loadScript);
    }

    function onInitPageAnimEnd(opts) {
        if (opts.direction === 'in') {
            var initPage = $('#InitAppPage');
            if (initPage) {
                initPage.unbind('jmuiPageAnimationEnd', onInitPageAnimEnd);
            }
            invokeProvision();
        } else {
        }
    }

    var provState = localStorage.getItem('provisionedState');

    if (provState == 'provisioned') {
        MCAPTURE_ProcessProvisioned_count = MCAPTURE_ProcessProvisioning_count;
        processProvisioned({ alreadyProvisioned: true });
    } else {
        if (MCAPTURE_ProcessProvisioning_count > 0) {
            var initPage = $('#InitAppPage');
            if (initPage) {
                initPage.bind('jmuiPageAnimationEnd', onInitPageAnimEnd);
                $.ui.gotoPage(initPage, 'jmuiSlide', true);
            } else {
                invokeProvision();
            }
        } else {
            processProvisioned();
        }
    }


}(window.jmfw, window.mCapture));
