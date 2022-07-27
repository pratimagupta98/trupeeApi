const Admin = require("../models/admin");
const resp = require("../helpers/apiResponse");
//const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const key = "verysecretkey";
const bcrypt = require("bcrypt");


exports.addAdmin = async (req, res) => {
  const { name, adminimg, email, mobile, password, cnfmPassword } =
    req.body;

  const salt = await bcrypt.genSalt(10);
  const hashPassword = await bcrypt.hash(password, salt);
  const newAdmin = new Admin({
    name: name,
    password: hashPassword,
    cnfmPassword: hashPassword,
    email: email,
    mobile: mobile,
    adminimg: adminimg,
  });

  const findexist = await Admin.findOne({
    $or: [{ email: email }, { mobile: mobile }],
  });
  if (findexist) {
    resp.alreadyr(res);
  } else {
    if (req.files) {
      if (req.files.adminimg[0].path) {
        alluploads = [];
        for (let i = 0; i < req.files.adminimg.length; i++) {
          const resp = await cloudinary.uploader.upload(
            req.files.adminimg[i].path,
            { use_filename: true, unique_filename: false }
          );
          fs.unlinkSync(req.files.adminimg[i].path);
          alluploads.push(resp.secure_url);
        }
        newAdmin.adminimg = alluploads;
      }
    }
    newAdmin.save()


      .then((data) => resp.successr(res, data))
      .catch((error) => resp.errorr(res, error));
  };
}


exports.adminlogin = async (req, res) => {
  const { mobile, email, password } = req.body;
  const admin = await Admin.findOne({
    $or: [{ mobile: mobile }, { email: email }],
  });
  if (admin) {
    const validPass = await bcrypt.compare(password, admin.password);
    if (validPass) {
      const token = jwt.sign(
        {
          adminId: admin._id,
        },
        key,
        {
          expiresIn: 86400000,
        }
      );
      res.header("ad-token", token).status(200).send({
        status: true,
        token: token,
        msg: "success",
        data: admin,
      });
    } else {
      res.status(400).json({
        status: false,
        msg: "Incorrect Password",
        error: "error",
      });
    }
  } else {
    res.status(400).json({
      status: false,
      msg: "admin Doesnot Exist",
      error: "error",
    });
  }
};

exports.editAdmin = async (req, res) => {
  const { name, email, mobile, password, cnfmPassword } = req.body;
  // const salt = await bcrypt.genSalt(10);
  // const hashPassword = await bcrypt.hash(password, salt);
  data = {};
  if (name) {
    data.adminname = adminname;
  }
  if (email) {
    data.email = email;
  }
  if (mobile) {
    data.mobile = mobile;
  }

  if (password) {
    const salt = await bcrypt.genSalt(10);
    let hashPassword = await bcrypt.hash(password, salt);
    data.password = hashPassword;
  }
  if (cnfmPassword) {
    const salt = await bcrypt.genSalt(10);
    let hashPassword = await bcrypt.hash(password, salt);
    data.cnfmPassword = hashPassword;
  }
  if (req.file) {
    const response = await cloudinary.uploader.upload(req.file.path);
    data.adminimg = response.secure_url;
    fs.unlinkSync(req.file.path);
  }

  if (data) {

    const findandUpdateEntry = await Admin.findOneAndUpdate(
      { _id: req.params.id },
      { $set: data },
      { new: true }
    )
      .then((data) => resp.successr(res, data))
      .catch((error) => resp.errorr(res, error));
  };
}


