const BASE_URL = process.env.REACT_APP_BASE_URL;
// AUTH ENDPOINTS
export const authEndpoints = {
    SENDOTP_API : BASE_URL + "/auth/sendotp",
    SIGNUP_API : BASE_URL + "/auth/signup",
    LOGIN_API : BASE_URL + "/auth/login",
    RESETPASSWORDTOKEN_API: BASE_URL + "/auth/reset-password-token",
    RESETPASSWORD_API: BASE_URL + "/auth/reset-password",
}

// SETTING ENDPOINTS
export const settingEndpoints = {
    CHANGEDISPLAYPICTURE_API : BASE_URL + "/profile/display-picture/change",
    DELETEDISPLAYPICTURE_API: BASE_URL + "/profile/display-picture/delete",
    UPDATEPROFILE_API: BASE_URL + "/profile/update-profile",
    CHANGEPASSWORD_API : BASE_URL + "/auth/change-password",
    DELETEACCOUNT_API : BASE_URL + "/auth/delete-account",
}

// HERB ENDPONTS
export const herbEndpoints = {
    CREATEHERB_API : BASE_URL + "/herb/create-herb",
    CREATEHERBMEDIA_API : BASE_URL + "/herb/create-herb-media",
    EDITHERB_API : BASE_URL + "/herb/edit-herb",
    DELETEHERB_API : BASE_URL + "/herb/delete-herb",
    GETALLHERBS_API : BASE_URL + "/herb/get-all-herbs",
    GETPUBLISHEDHERBS_API : BASE_URL + "/herb/get-published-herbs",
    GETHERBDETAILS_API :BASE_URL +  "/herb/get-herb-details",
    BOOKMARK_API: BASE_URL + "/herb/bookmark/add",
    REMOVEBOOKMARK_API: BASE_URL + "/herb/bookmark/remove",
    GETBOOKMARKHERBS_API: BASE_URL + "/herb/bookmark/get",
    LIKEHERB_API: BASE_URL + "/herb/like",
    UNLIKEHERB_API: BASE_URL + "/herb/unlike",
}

// NOTE ENDPOINTS
export const noteEndpoints = {
    CREATENOTE_API : BASE_URL + "/note/create-note",
    UPDATENOTE_API : BASE_URL + "/note/update-note",
    DELETENOTE_API : BASE_URL + "/note/delete-note",
    GETUSERNOTES_API : BASE_URL + "/note/get-user-notes",
}

// CONTACT ENDPOINTS
export const contactEndpoints = {
    CONTACT_API: BASE_URL + "/contact",
}

// CHATBOT ENDPOINTS
export const chatbotEndponts = {
    CHATBOT_API: BASE_URL + "/ai/chat",
}