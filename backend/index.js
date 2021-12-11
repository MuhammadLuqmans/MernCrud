import mongoose from "mongoose";
import express from "express";
import cors from "cors";
const app = express();
app.use(cors());
app.use(express.json());

const connections = mongoose.connect(
  { useNewUrlParser: true }
);

const Users = mongoose.Schema({
  userName: {
    type: String,
    require: true,
  },
  email: {
    type: String,
    require: true,
  },
});

const UserNames = mongoose.model("userData", Users);
// model.exports = UserNames

// this is a post data function to mongodb database
app.post("/insert", async (req, res) => {
  const userName = req.body.userName;
  const email = req.body.email;
  // console.log(res)
  const User = new UserNames({ userName: userName, email: email });
  // try(res =>console.log(res))
  try {
    await User.save();
  } catch (error) {
    console.log(error);
  }
});
// get data from mongodb

app.get("/read", async (req, res) => {
  UserNames.find({}, (error, result) => {
    if (error) {
      console.log(error);
    }
    res.send(result);
    console.log(result);
  });
  // try{((res)=>console.log(res))}catch(error){console.log(error)}
});
// for update data in mongodb

app.put("/update", async (req, res) => {
  const newUpdateUser = req.body.newUpdateUser;
  const id = req.body.id;
  // console.log(res)
  // try(res =>console.log(res))

  try {
    // await User.save()
    await UserNames.findById(id, (err, updatedUser) => {
      updatedUser.userName = newUpdateUser;
      updatedUser.save();
      res.send("update");
    });
  } catch (error) {
    console.log(error);
  }
});

app.delete("/delete/:id", async (req, res) => {
  const id = req.params.id;
  await UserNames.findByIdAndRemove(id).exec();
  res.send("deleted");
});

app.listen(3001, async () => {
  console.log("app is runing on port 3001....");
});
