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
      const user = await userCollection.findOne({ _id: ObjectId(id) });
  
      if (!user) throw "user not found";
      return user;
    },

    async createUser(username, email, firstName, lastName, password, birthday){
        //series of checks of the entered variables making sure they exist
        if(!username || typeof username != "string"){
            throw "You must enter a username";
        }
        if(!username || typeof username != "string"){
            throw "You must enter a username";
        }
        if(!firstName || typeof firstName != "string"){
            throw "You must enter your First Name";
        }
        if(!lastName || typeof lastName != "string"){
            throw "You must enter your Last Name";
        }
        if(!password || typeof password != "string"){
            throw "You must enter a password";
        }
        if(!birthday){
          throw "You must enter a valid date"
        }
        const hash = await bcrypt.hash(password, 16);

        let newUser = {
            firstName: firstName,
            lastName: lastName,
            email: email,
            username: username,
            hashedPassword: hash,
            birthday: birthday
        }
        const insertInfo = await userCollection.insertOne(newUser);
        if(insertInfo.insertedCount ===0){
            throw "Could not enter user information";
        }
        const newId = insertInfo.insertedId;
        const user = await this.getUserById(newId);
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

      if (updatedUser.newEmail) {
        updatedData.email = updatedUser.newEmail;
      }

      if (updatedUser.newUsername) {
        updatedData.username = updatedUser.newUsername;
      }

      if (updatedUser.newBirthday) {
        updatedData.birthday = updatedUser.newBirthday;
      }

      if (updatedUser.newPassword) {
        const newPass = await bcrypt.hash(updatedUser.newPassword, 16);
        updatedData.hashedPassword = newPass;
      }
  
      let updateCommand = {
        $set: updateduserData
      };
      const query = {
        _id: ObjectId(id)
      };
      await userCollection.updateOne(query, updateCommand);
  
      return await this.getUserById(id);
    }
  };
  
  module.exports = exportedMethods;