const visitsBadgeSchema = require("./schema.js");

module.exports.visitsBadge = async function (uniqueID, setIDCount, passKey) {
  try {
    const filter = { uniqueID: uniqueID };
    let existingDocument = await visitsBadgeSchema.findOne({ uniqueID: uniqueID });
    const update = {
      $setOnInsert: { uniqueID: uniqueID, passKey: passKey },
      $set: setIDCount !== "0" && passKey === existingDocument?.passKey ? { visitsCount: parseInt(setIDCount) } : {},
      $inc: setIDCount === "0" || passKey !== existingDocument?.passKey ? { visitsCount: 1 } : {},
    };

    const options = { new: true, upsert: true };
    
    const updatedDocument = await visitsBadgeSchema.findOneAndUpdate(filter, update, options).select({ visitsCount: 1 });

    return updatedDocument.visitsCount;
  } catch (error) {
    console.error("Error in visitsBadge:", error);
    throw error; 
  }
};

