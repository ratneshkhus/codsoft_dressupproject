// import jwt from 'jsonwebtoken';

// const secretKey = "ratnesh1234567";

// const authMiddleware = (req, res, next) => {
//   const token = req.headers.authorization && req.headers.authorization.split(' ')[1];

//   if (!token) {
//     return res.status(401).json({ message: 'Authorization token missing' });
//   }

//   jwt.verify(token, secretKey, (err, decoded) => {
//     if (err) {
//       return res.status(401).json({ success: false, message: 'Token invalid' });
//     }
//     // console.log('hello there');
//     req.email = decoded.email;
//     req.userid = decoded.userid;
//     req.username = decoded.username;
//     req.mobile = decoded.mobile;
//     next();
//   });
// };

// export default authMiddleware;
import jwt from 'jsonwebtoken';

const secretKey = "ratnesh1234567";

const authMiddleware = (req, res, next) => {
  const token = req.headers.authorization && req.headers.authorization.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: 'Authorization token missing' });
  }

  jwt.verify(token, secretKey, (err, decoded) => {
    if (err) {
      return res.status(401).json({ success: false, message: 'Token invalid' });
    }
    req.email = decoded.email;
    req.userid = decoded.userid;
    req.username = decoded.username;
    req.mobile = decoded.mobile;
    next();
  });
};

export default authMiddleware;
