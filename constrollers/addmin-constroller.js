const db = require("../models/db");
// const {Status} = require ("@prisma/client")
const cloudupload = require("../utils/cloudupload");

exports.addproduct = async (req, res, next) => {
  
  try {
    const { name, image, category, price } = req.body;
    const imagePromise = req.files.map((file) => {
      return cloudupload(file.path);
    });
    const imageUrlArray = await Promise.all(imagePromise);
    const imageUrl = imageUrlArray[0];
    const data = {
      name,
      image: imageUrl,
      category,
      price: Number(price),
    };
    const rs = await db.product.create({ data });
    console.log(rs);
    res.json({ msg: "AddProduct successful" });
  } catch (err) {
    next(err);
  }
};



exports.getproduct = async (req, res, next) =>{
  
  try {
    const getproduct = await db.product.findMany({
      
    })
    res.json({getproduct})
  } catch (err) {
    next(err);
  }
}



exports.deleteproduct = async (req, res , next) => {
  const {id} = req.params;
  console.log(id);
  try{
    const rs = await db.product.delete({
        where:{ id: id}
    })
    res.json({message : "Deleted product", result : rs})
     
  }catch(err){
      next(err)
  }
}

exports.updateproduct = async (req, res , next) => {
  const {id} = req.params;
  try{
      const rs = await db.product.update({
          where:{ id : id },
          data : req.body
      })
      res.json({message : "Updated product", result : rs})
  }catch(err){
      next(err)
  }
}


