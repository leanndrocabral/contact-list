"use strict";
(() => {
var exports = {};
exports.id = 829;
exports.ids = [829];
exports.modules = {

/***/ 245:
/***/ ((module) => {

module.exports = require("@prisma/client");

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

/***/ 507:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "default": () => (/* binding */ users)
});

;// CONCATENATED MODULE: external "bcryptjs"
const external_bcryptjs_namespaceObject = require("bcryptjs");
// EXTERNAL MODULE: ./src/db/db.ts
var db = __webpack_require__(88);
// EXTERNAL MODULE: ./src/utils/exclude.ts
var exclude = __webpack_require__(578);
;// CONCATENATED MODULE: ./src/pages/api/users.ts



async function handler(request, response) {
    try {
        const { method , body  } = request;
        switch(method){
            case "POST":
                const password = await (0,external_bcryptjs_namespaceObject.hash)(body.password, 10);
                const user = await db/* prisma.client.create */._.client.create({
                    data: {
                        ...request.body,
                        password
                    }
                });
                const userWithoutPassword = (0,exclude/* default */.Z)(user, [
                    "password"
                ]);
                return response.status(201).json(userWithoutPassword);
            case "GET":
                const users = await db/* prisma.client.findMany */._.client.findMany({
                    select: {
                        id: true,
                        fullName: true,
                        email: true,
                        password: false,
                        telephone: true,
                        registrationDate: true
                    }
                });
                return response.status(200).json(users);
        }
    } catch (error) {
        if (error.meta.target[0] === "email") {
            return response.status(400).json({
                message: "This email is already in use"
            });
        }
        return response.status(400).json({
            message: "This phone number is already in use"
        });
    }
}
/* harmony default export */ const users = (handler);


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
var __webpack_exports__ = (__webpack_exec__(507));
module.exports = __webpack_exports__;

})();