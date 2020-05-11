const mongoCollections = require("../config/mongoCollections");
const users = mongoCollections.users;
const {ObjectId} = require("mongodb");

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
      const user = await userCollection.findOne({ _id: ObjectId(id) });
  
      if (!user) throw "user not found";
      return user;
    },

    async createUser(email, firstName, lastName, birthday){
        const userCollection = await users();
        //series of checks of the entered variables making sure they exist
        if(!email || typeof email != "string"){
            throw "You must enter a username";
        }
        if(!firstName || typeof firstName != "string"){
            throw "You must enter your First Name";
        }
        if(!lastName || typeof lastName != "string"){
            throw "You must enter your Last Name";
        }
        if(!birthday){
          throw "You must enter a valid date"
        }

        let newUser = {
            firstName: firstName,
            lastName: lastName,
            email: email,
            birthday: birthday
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
      const deletionInfo = await userCollection.removeOne({ _id: ObjectId(id) });
      if (deletionInfo.deletedCount === 0) {
        throw `Could not delete user with id of ${id}`;
      }
    },
    
    async updateUser(id, updatedUser) {
      if(id===undefined || typeof(id)!="string") {
        throw "id is not a string";
      }
      const userCollection = await users();
      const user = await userCollection.findOne({ _id: ObjectId(id) });
      if(user===null){
          throw "user with this id not found"
      }
  
      const updatedData = {};
  
      if (updatedUser.newFirstName) {
        updatedData.firstName = updatedUser.newFirstName;
      }
  
      if (updatedUser.newLastName) {
        updatedData.lastName = updatedUser.newLastName;
      }

      if (updatedUser.newBirthday) {
        updatedData.birthday = updatedUser.newBirthday;
      }
  
      let updateCommand = {
        $set: updatedData
      };
      const query = {
        _id: ObjectId(id)
      };
      await userCollection.updateOne(query, updateCommand);
  
      return await this.getUserById(id.toString());
    }
  };
  
  module.exports = exportedMethods;