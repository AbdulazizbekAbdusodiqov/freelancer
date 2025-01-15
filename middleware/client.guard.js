const { to } = require("../helpers/to_promise");
const { Jwt } = require("../service/jwt.service");

module.exports = async function (req, res, next) {
    try {

        const authorization = req.headers.authorization;

        if (!authorization) {
            return res
                .status(403)
                .send({ message: "Client royhatdan otmagan(token topilmadi" });
        }
        const bearer = authorization.split(" ")[0];
        const token = authorization.split(" ")[1];
        if (bearer !== "Bearer" || !token) {
            return res
                .status(403)
                .send({ message: "Client royhatdan otmagan(token berilmagan" });
        }
        const [error, decodedToken] = await to(Jwt.verifyAccessToken(token));

        if (error) {
            return res.status(403).send({ message: error.message });
        }
        if (decodedToken.role !== "client" || decodedToken.role !== "admin") {
            return res.status(403).send({ message: "huquq mavjud emas" });
        }
        req.client = decodedToken
        next();

    } catch (error) {
        console.log(error);
        return res.status(403).send({ message: error.message });
    }
};