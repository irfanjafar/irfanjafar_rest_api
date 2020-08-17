var jwt = require("jsonwebtoken");
var bcrypt = require("bcrypt");

const db = require("../models/index");
const User = db.user;

//post
exports.signup = function (req, res) {
  //Validate request
  if (!req.body.email || !req.body.password) {
    res.status(400).send({
      message: "Content can't be empty",
    });
    return;
  }

  try {
    if (!req.files) {
      res.send({
        status: false,
        message: "NO file uploaded",
      });
    } else {
      let photo = req.files.photo;

      photo.mv("./uploads/ktp&sim/" + photo.name);
    }
  } catch (err) {
    res.status(500).send(err);
  }
  //Create user
  var salt = bcrypt.genSaltSync(10);
  var hash = bcrypt.hashSync(req.body.password, salt);
  const user = {
    email: req.body.email,
    password: hash,
    photo: req.files.photo.name,
  };
  User.create(user)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "some error occured while creating the Post",
      });
    });
};
// //put upload image
// exports.uploadImagePost = async (req, res) => {
//   const id = req.params.id;
//   const title = req.params.title;

//   try {
//     if (!req.files) {
//       res.send({
//         status: false,
//         message: "No file uploaded",
//       });
//     } else {
//       //Use the name of the input field
//       let photo = req.files.photo;
//       var renamePhoto =
//         +id + "-" + title + photo.name.substring(photo.name.indexOf("."));

//       Post.update(
//         {
//           photo: renamePhoto,
//         },
//         {
//           where: { id: id },
//         }
//       )
//         .then((result) => {
//           if (result == 1) {
//             photo.mv("./uploads/" + renamePhoto);
//             //send response
//             res.send({
//               status: true,
//               message: "Photo post File is uploaded",
//               data: {
//                 name: photo.name,
//                 rename: renamePhoto,
//                 mimetype: photo.mimetype,
//                 size: photo.size,
//               },
//             });
//           } else {
//             res.send({
//               message: `Cannot update Post with id = ${id}`,
//             });
//           }
//         })
//         .catch((err) => {
//           res.status(500).send({
//             message: `Error updating post id = ${id}`,
//           });
//         });
//     }
//   } catch (err) {
//     res.status(500).send(err);
//   }
// };
//login
exports.signin = function (req, res) {
  var email = req.body.email;
  var pass = req.body.password;

  User.findOne({ where: { email: email } })
    .then((data) => {
      var hasil = bcrypt.compareSync(pass, data.password);
      console.log(hasil);

      if (hasil == true) {
        var secret = "TEXT SECRET LETAK KAN DI ENV";
        var now = Math.floor(Date.now() / 1000);
        var iat = now - 10;
        var expiresIn = "30 Days";
        //expr = (now + expiresIn),
        //notBefore = (now - 10),
        // var jwtId = Math
        //     .random()
        //     .toString(36)
        //     .substring(7);
        // var payload = {
        //     iat: iat,
        //     jwtid: jwtId,
        //     audience: 'TEST',
        //     data: data
        // };

        jwt.sign(
          { id: data.id },
          secret,
          { algorithm: "HS256", expiresIn: expiresIn },
          // jwt.sign(payload,secret,{
          //     algorithm:'HS256',
          //     expiresIn: expiresIn
          // },
          function (err, token) {
            if (err) {
              res.json({
                results: {
                  status: false,
                  msg: "Error occured while",
                },
              });
            } else {
              if (token != false) {
                res.header();
                res.json({
                  results: {
                    status: true,
                    token: token,
                    user: {
                      id: data.id,
                    },
                  },
                });
                res.end();
              } else {
                res.json({
                  results: {
                    status: false,
                    msg: "could not create",
                  },
                });
                res.end();
              }
            }
          }
        );
      } else {
        res.send({
          message: "email atau pass salah",
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        err: err.message,
        message: "Error retrieving post with id = ",
      });
    });
};
