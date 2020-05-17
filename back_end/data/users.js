const mongoCollections = require("../config/mongoCollections");
const users = mongoCollections.users;

const exportedMethods = {
    async getAllUsers() {
      const userCollection = await users();
      return await userCollection.find({}).toArray();
    },

    async getUserById(id) {
      if(id===undefined || typeof(id)!="string") {
        throw "id is not a string";
      }
      const userCollection = await users();
      const user = await userCollection.findOne({ _id: id });
  
      if (!user) throw "user not found";
      return user;
    },

    async createUser(id, email, displayName, birthday){
        const userCollection = await users();
        const userExist = await userCollection.findOne({ _id: id });
        if(userExist!==null){
            throw "User with this id already exists"
        }
        //series of checks of the entered variables making sure they exist
        if(!id || typeof id != "string"){
          throw "You must enter an id";
        }
        if(!email || typeof email != "string"){
            throw "You must enter an email";
        }
        if(!displayName || typeof displayName != "string"){
            throw "You must enter a name";
        }
        if(!birthday && birthday!=""){
          throw "You must enter a birthday"
        }

        let newUser = {
            _id: id,
            displayName: displayName,
            email: email,
            birthday: birthday,
            bio: ""
        }
        const insertInfo = await userCollection.insertOne(newUser);
        if(insertInfo.insertedCount ===0){
            throw "Could not enter user information";
        }
        const newId = insertInfo.insertedId;
        const user = await this.getUserById(newId.toString());
        return user;
    },
    
    async removeUser(id) {
      if(id===undefined || typeof(id)!="string") {
        throw "id is not a string";
      }
      const userCollection = await users();
      const deletionInfo = await userCollection.removeOne({ _id: id });
      if (deletionInfo.deletedCount === 0) {
        throw `Could not delete user with id of ${id}`;
      }
    },
    
    async updateUser(id, updatedUser) {
      if(id===undefined || typeof(id)!="string") {
        throw "id is not a string";
      }
      const userCollection = await users();
      const user = await userCollection.findOne({ _id: id });
      if(user===null){
          throw "user with this id not found"
      }
  
      const updatedData = {};
  
      if (updatedUser.displayName) {
        updatedData.displayName = updatedUser.displayName;
      }

      if (updatedUser.birthday) {
        updatedData.birthday = updatedUser.birthday;
      }

      if (updatedUser.bio || updatedUser.bio=="") {
        updatedData.bio = updatedUser.bio;
      }
  
      let updateCommand = {
        $set: updatedData
      };
      const query = {
        _id: id
      };
      await userCollection.updateOne(query, updateCommand);
  
      return await this.getUserById(id.toString());
    }
  };
  
  module.exports = exportedMethods;