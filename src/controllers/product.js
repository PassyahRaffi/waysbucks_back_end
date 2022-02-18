const { product, user } = require("../../models");

// GET ALL PRODUCTS
exports.getProducts = async (req, res) => {
  try {
    let data = await product.findAll({
      include: [
        {
          model: user,
          as: "user",
          attributes: {
            exclude: ["createdAt", "updatedAt", "password"],
          },
        },
      ],
      attributes: {
        exclude: ["createdAt", "updatedAt", "idUser"],
      },
    });

    data = JSON.parse(JSON.stringify(data))

    data = data.map((item) => {
      return {
        ...item,
        image: process.env.FILE_PATH + item.image
      }
    })

    res.send({
      status: "success...",
      data,
    });

  } catch (error) {
    console.log(error);
    res.send({
      status: "failed",
      message: "Server Error",
    });
  }
};

// ADD PRODUCT
exports.addProduct = async (req, res) => {
  try {
    const { data } = req.body;
    
    // code here
    let newProduct = await product.create({
      ...data,
      image: req.file.filename,
      idUser: req.user.id,
      price: req.body.price,
      title: req.body.title
    })


    newProduct = JSON.parse(JSON.stringify(newProduct))

    newProduct = {
      ...newProduct,
      image: process.env.FILE_PATH + newProduct.image
    }
    
    // code here
    res.send({
      status: 'success',
      data: {
        newProduct
      }
    })

  } catch (error) {
    console.log(error);
    res.status(500).send({
      status: "failed",
      message: "Server Error",
    });
  }
};

// GET PRODUCT BY ID
exports.getProduct = async (req, res) => {
    try {
      const { id } = req.params;
  
      let data = await product.findOne({
        where: { id },
        include: [ 
            {
            model: user,
            as: "user",
            attributes: {
                exclude: ["createdAt", "updatedAt", "idUser"],
                },
            },
        ],
        attributes: {
            exclude: ["createdAt", "updatedAt", "idUser"],
          },
      });
  
      res.send({
        status: "success",
        data: {
          user: data,
        },
      });
    } catch (error) {
      console.log(error);
      res.send({
        status: "failed",
        message: "Server Error",
      });
    }
};

// UPDATE PRODUCT
exports.updateProduct = async (req, res) => {
  try {

    const { id } = req.params;
  
      await product.update(req.body, {
        where: { id },
      });
 
      res.send({
        status: "success",
        message: `Update product id: ${id} finished`,
        data: req.body
      });
    
  } catch (error) {
    console.log(error);
    res.send({
      status: 'failed',
      message: 'Server error'
    })
  }
}

// DELETE PRODUCT BY ID
exports.deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;
  
      await product.destroy({
        where: {
          id,
        },
      });
  
      res.send({
        status: "success",
        data: { id }
      });


  } catch (error) {
    console.log(error);
    res.send({
      status: 'failed',
      message: 'Server error'
    })
  }
}