'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('workouts', [{
      userId: "testuserID",
      bodyPart: "testbodypart",
      equipment: "testequipment",
      gifUrl: "testgifurl",
      name: "testname",
      target: "testtarget",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    }], {});
},

  async down (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('workouts', null, {});
  }
};
