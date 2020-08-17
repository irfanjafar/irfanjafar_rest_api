const db = require("../models/index");
const Post = db.posts;
const Op = db.Sequelize.Op;

//post
exports.create = (req, res) => {
  //Validate request
  if (!req.body.nama || !req.body.tanggal || !req.body.harga) {
    res.status(400).send({
      message: "Content can't be empty",
    });
    return;
  }

  try {
    if (!req.files) {
      res.send({
        status: false,
        message: "No file uploaded",
      });
    } else {
      let struk = req.files.struk;

      struk.mv("./uploads/struk/" + struk.name);
    }
  } catch (err) {
    res.status(500).send(err);
  }
  //Create post
  const post = {
    nama: req.body.nama,
    tanggal: req.body.tanggal,
    harga: req.body.harga,
    struk: req.files.struk.name,
  };
  Post.create(post)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "some error occured while creating the Post",
      });
    });
};

//Edit post
exports.edit = (req, res) => {
  const id = req.params.id;

  try {
    if (!req.files) {
      res.send({
        status: false,
        message: "No file uploaded",
      });
    } else {
      let struk = req.files.struk;

      Post.update(
        {
          nama: req.body.nama,
          tanggal: req.body.tanggal,
          harga: req.body.harga,
          struk: req.files.struk.name,
        },
        {
          where: { id: id },
        }
      )
        .then((result) => {
          if (result == 1) {
            struk.mv("./uploads/struk/" + struk.name);
            //send response
            res.send({
              status: true,
              message: "Data Berhasil Diubah",
              data: {
                nama: req.body.nama,
                tanggal: req.body.tanggal,
                harga: req.body.harga,
                struk: req.files.struk.name,
              },
            });
          } else {
            res.send({
              message: `update error with id = ${id}`,
            });
          }
        })
        .catch((err) => {
          res.status(500).send({
            message: `Error updating post id = ${id}`,
          });
        });
    }
  } catch (err) {
    res.status(500).send(err);
  }
};

// //put upload image
// exports.uploadImagePost = async (req, res) => {
//   const id = req.params.id;
//   const nama = req.params.nama;

//   try {
//     if (!req.files) {
//       res.send({
//         status: false,
//         message: "No file uploaded",
//       });
//     } else {
//       //Use the name of the input field
//       let struk = req.files.struk;
//       var renameStruk =
//         +id + "-" + nama + nama.name.substring(nama.name.indexOf("."));

//       Post.update(
//         {
//           nama: renameStruk,
//         },
//         {
//           where: { id: id },
//         }
//       )
//         .then((result) => {
//           if (result == 1) {
//             struk.mv("./uploads/" + renameStruk);
//             //send response
//             res.send({
//               status: true,
//               message: "Struk post File is uploaded",
//               data: {
//                 name: struk.name,
//                 rename: renameStruk,
//                 mimetype: struk.mimetype,
//                 size: struk.size,
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

//retrieve all
exports.findAll = (req, res) => {
  const tanggal = req.query.tanggal;
  let condition = tanggal ? { tanggal: { [Op.like]: `%${tanggal}%` } } : null;
  Post.findAll({ where: condition })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "some error occured while find post",
      });
    });
};
