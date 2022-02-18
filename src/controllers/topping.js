const { topping,  user } = require("../../models");

// GET TOPPING
exports.getToppings = async (req, res) => {
  try {
    let data = await topping.findAll({
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

// ADD TOPPING
exports.addTopping = async (req, res) => {
    try {
      const { data } = req.body;
      
      // code here
      let newTopping = await topping.create({
        ...data,
        image: req.file.filename,
        idUser: req.user.id,
        title: req.body.title,
        price: req.body.price
      })
  
      newTopping = JSON.parse(JSON.stringify(newTopping))
  
      newTopping = {
        ...newTopping,
        image: process.env.FILE_PATH + newTopping.image
      }
  
      res.status(201).send({
        status: 'success',
        data: {
          newTopping
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

// GET TOPPING BY ID
exports.getTopping = async (req, res) => {
    try {
      const { id } = req.params;
  
      let data = await topping.findOne({
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

// UPDATE TOPPING BY ID
exports.updateTopping = async (req, res) => {
    try {
  
      const { id } = req.params;
    
        await topping.update(req.body, {
          where: { id },
        });
   
        res.send({
          status: "success",
          message: `Update topping id: ${id} finished`,
          data: req.body
        });
      
    } catch (error) {
      console.log(error);
      res.send({
        status: 'failed',
        message: 'Server error'
      })
    }
};

// DELETE TOPPING BY ID
exports.deleteTopping = async (req, res) => {
    try {
      
      const { id } = req.params;
    
        await topping.destroy({
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