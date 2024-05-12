// import jwt from "jsonwebtoken";
// export const auth = (req, res, next) => {
//   const { token } = req.cookies;
//   if (!token) {
//     res.status(404).json({ status: false, message: "Please Login First" });
//   }
//   try {
//     const decode = jwt.verify(token, process.env.SECRET_KEY);
//     console.log(decode);
//     req.user = decode;
//   } catch (error) {
//     console.log(error);
//     res.send(404).json({ success: false, message: "Failed to verify user" });
//   }

//   next();
// };
