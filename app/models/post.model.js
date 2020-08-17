module.exports = (sequelize, Sequelize) => {
  const Post = sequelize.define("order", {
    nama: {
      type: Sequelize.STRING,
    },
    tanggal: {
      type: Sequelize.DATEONLY,
    },
    harga: {
      type: Sequelize.STRING,
    },
    struk: {
      type: Sequelize.FLOAT,
    },
    published: {
      type: Sequelize.BOOLEAN,
    },
  });
  return Post;
};
