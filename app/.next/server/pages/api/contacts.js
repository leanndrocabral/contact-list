"use strict";
(() => {
var exports = {};
exports.id = 617;
exports.ids = [617];
exports.modules = {

/***/ 245:
/***/ ((module) => {

module.exports = require("@prisma/client");

/***/ }),

/***/ 344:
/***/ ((module) => {

module.exports = require("jsonwebtoken");

/***/ }),

/***/ 88:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "_": () => (/* binding */ prisma)
/* harmony export */ });
/* harmony import */ var _prisma_client__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(245);
/* harmony import */ var _prisma_client__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_prisma_client__WEBPACK_IMPORTED_MODULE_0__);

const prisma = new _prisma_client__WEBPACK_IMPORTED_MODULE_0__.PrismaClient();


/***/ }),

/***/ 834:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var jsonwebtoken__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(344);
/* harmony import */ var jsonwebtoken__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(jsonwebtoken__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _db_db__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(88);
/* harmony import */ var _utils_exclude__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(578);



async function handler(request, response) {
    try {
        const { method , body , headers  } = request;
        const token = headers.authorization.split(" ")[1];
        jsonwebtoken__WEBPACK_IMPORTED_MODULE_0___default().verify(token, process.env.SECRET_KEY, (error)=>{
            if (error) {
                return response.status(401).json({
                    message: error.message
                });
            }
        });
        const decoded = (0,jsonwebtoken__WEBPACK_IMPORTED_MODULE_0__.decode)(token);
        switch(method){
            case "POST":
                const contact = await _db_db__WEBPACK_IMPORTED_MODULE_1__/* .prisma.contact.create */ ._.contact.create({
                    data: {
                        ...body,
                        userId: decoded.sub
                    }
                });
                const contactWithoutUserId = (0,_utils_exclude__WEBPACK_IMPORTED_MODULE_2__/* ["default"] */ .Z)(contact, [
                    "userId"
                ]);
                return response.status(201).json(contactWithoutUserId);
            case "GET":
                const contacts = await _db_db__WEBPACK_IMPORTED_MODULE_1__/* .prisma.contact.findMany */ ._.contact.findMany({
                    where: {
                        userId: decoded.sub
                    },
                    select: {
                        id: true,
                        fullName: true,
                        email: true,
                        telephone: true,
                        registrationDate: true
                    }
                });
                return response.status(200).json(contacts);
        }
    } catch (error) {
        if (error.meta.target[0] === "email") {
            return response.status(400).json({
                message: "This email already exists in your contacts."
            });
        }
        return response.status(400).json({
            message: "This phone already exists in your contacts."
        });
    }
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (handler);


/***/ }),

/***/ 578:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Z": () => (/* binding */ exclude)
/* harmony export */ });
function exclude(user, keys) {
    for (let key of keys){
        delete user[key];
    }
    return user;
}


/***/ })

};
;

// load runtime
var __webpack_require__ = require("../../webpack-api-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = (__webpack_exec__(834));
module.exports = __webpack_exports__;

})();