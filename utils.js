const { extension } = require("./extension");
const Session = require("./session/session");
const SessionStorage = require("./session/session_storage");
const { ApplicationConfig, ApplicationClient } = require("@gofynd/fdk-client-javascript");

async function getPlatformClient(companyId, sessionId) {
    let client = null;
    let sid = sessionId;
    if (!extension.isOnlineAccessMode()) {
        sid = Session.generateSessionId(false, {
            cluster: extension.cluster,
            companyId: companyId
        });
    }
    let session = await SessionStorage.getSession(sid);
    client = await extension.getPlatformClient(companyId, session);
    return client;
}

async function getApplicationClient(applicationId, applicationToken) {
    let applicationConfig = new ApplicationConfig({
        applicationID: applicationId,
        applicationToken: applicationToken,
        domain: extension.cluster,
        logLevel: extension._isDebug
    });
    let applicationClient = new ApplicationClient(applicationConfig);
    return applicationClient;
}

function formRequestObject(req){
    return {
        body: req.body,
        query: req.query,
        headers: req.headers,
        extension: req?.extension,
        fdkSession: req?.fdkSession,
        signedCookies: req.signedCookies,
        params: req.params
    }
}

async function getSessionData(session_id) {
    let fdkSession = await SessionStorage.getSession(session_id);
    if(!fdkSession) {
        return false;
    }
    return fdkSession;
}

async function getApplicationConfig (applicationData, extension){
    let application, applicationConfig, applicationClient;
    if(applicationData) {
        application = JSON.parse(applicationData);
        applicationConfig = new ApplicationConfig({
            applicationID: application._id,
            applicationToken: application.token,
            domain: extension.cluster,
            logLevel: extension._isDebug
        });
        applicationClient = new ApplicationClient(applicationConfig);
    }
    return{
        application,
        applicationConfig,
        applicationClient
    }
};

async function getUserData (userData){
    let user;
    if(userData) {
        user = JSON.parse(userData);
        user.user_id = user._id;
    }
    
    return user;
}

module.exports = {
    formRequestObject,
    getPlatformClient,
    getApplicationClient,
    getSessionData,
    getApplicationConfig,
    getUserData
}