const { central, db1, db2, db3, vault } = require("./databases.js");
function getUserData(id) {
  const dbs = {
    db1: db1,
    db2: db2,
    db3: db3
  };
}

async function getUserData(id) {
    if (typeof id !== "number" || id < 1 || id > 10) {
      throw new Error("Invalid Input -- Out of Range");
    }
  
    try {
      const dbName = await central(id);
      const databases = { db1, db2, db3 };
      const userBasicInfoPromise = databases[dbName](id);
      const userPersonalInfoPromise = vault(id);
  
      const [userBasicInfo, userPersonalInfo] = await Promise.all([
        userBasicInfoPromise,
        userPersonalInfoPromise
      ]);
  
      const userData = {
        id,
        ...userBasicInfo,
        ...userPersonalInfo
      };
  
      return userData;
    } catch (error) {
      throw new Error(`Database Error -- ${error.message}`);
    }
  }
  
  // Testing the getUserData function
  getUserData(5)
    .then((userData) => console.log(userData))
    .catch((error) => console.error(error));
  
  // getUserData(11)
  //   .then((userData) => console.log(userData))
  //   .catch((error) => console.error(error));
  
  // getUserData("invalid")
  //   .then((userData) => console.log(userData))
  //   .catch((error) => console.error(error));