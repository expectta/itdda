'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      'medicines',
      [
        {
          requestOrReport: 'request',
          symptom: 'symptom1',
          mediType: 'mediType1',
          quantity: 'quantity1',
          time: 'time1',
          storage: 'storage1',
          report: null,
          createdAt: new Date(),
          updatedAt: new Date(),
          childId: 1,
          userId: 6,
          classsId: 1,
        },
        {
          requestOrReport: 'request',
          symptom: 'symptom2',
          mediType: 'mediType2',
          quantity: 'quantity2',
          time: 'time2',
          storage: 'storage2',
          report: null,
          createdAt: new Date(),
          updatedAt: new Date(),
          childId: 2,
          userId: 7,
          classsId: 1,
        },
        {
          requestOrReport: 'request',
          symptom: 'symptom3',
          mediType: 'mediType3',
          quantity: 'quantity3',
          time: 'time3',
          storage: 'storage3',
          report: null,
          createdAt: new Date(),
          updatedAt: new Date(),
          childId: 3,
          userId: 7,
          classsId: 2,
        },
        {
          requestOrReport: 'report',
          symptom: 'symptom1',
          mediType: 'mediType1',
          quantity: 'quantity1',
          time: 'time1',
          storage: 'storage1',
          report: 'report1 내용입니다.',
          createdAt: new Date(),
          updatedAt: new Date(),
          childId: 1,
          userId: 3,
          classsId: 1,
        },
        {
          requestOrReport: 'report',
          symptom: 'symptom2',
          mediType: 'mediType2',
          quantity: 'quantity2',
          time: 'time2',
          storage: 'storage2',
          report: 'report2 내용입니다.',
          createdAt: new Date(),
          updatedAt: new Date(),
          childId: 2,
          userId: 3,
          classsId: 1,
        },
      ],
      {},
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('medicines', null, {});
  },
};
