const { user, children, notice } = require('../models');
const { checkAccessToken } = require('../modules/checkAccessToken');

// ! asdfasdf 굳이 status 설정을 안해줬는데, 나중에 에러처리 고민해볼 때 작성해 보는 것도 괜찮겠네.

module.exports = {
  index: async (req, res) => {
    const accessTokenData = checkAccessToken(req, res);
    if (!accessTokenData || accessTokenData === 'invalid token') {
      return;
    }

    const { userId, permission } = accessTokenData;

    if (permission === 'parent') {
      const childId = req.body.childId;
      const childInfo = await children.findOne({
        where: { id: childId },
        attributes: ['institutionId'],
      });
      const institutionId = childInfo.dataValues.institutionId;

      const noticeInfo = await notice.findAll({
        where: { institutionId },
        order: [
          ['createdAt', 'DESC'],
          ['id', 'DESC'],
        ],
        attributes: [
          ['id', 'noticeId'],
          'category',
          'writer',
          'title',
          'content',
          'institutionId',
          'createdAt',
        ],
      });

      const ElNotice = noticeInfo.filter((el) => el.category === 'notice');
      const ElEvent = noticeInfo.filter((el) => el.category === 'event');
      res.json({ noticeInfo, ElNotice, ElEvent });
    } else {
      const title = req.body.title;
      const content = req.body.content;
      const category = req.body.category;
      const userInfo = await user.findOne({
        where: { id: userId },
        attributes: ['institutionId', ['name', 'userName']],
      });
      const institutionId = userInfo.dataValues.institutionId;
      const writer = userInfo.dataValues.userName;
      if (!title) {
        const noticeInfo = await notice.findAll({
          where: { institutionId },
          order: [
            ['createdAt', 'DESC'],
            ['id', 'DESC'],
          ],
          attributes: [
            ['id', 'noticeId'],
            'category',
            'writer',
            'title',
            'content',
            'institutionId',
            'createdAt',
          ],
        });
        const ElNotice = noticeInfo.filter((el) => el.category === 'notice');
        const ElEvent = noticeInfo.filter((el) => el.category === 'event');
        res.json({ noticeInfo, ElNotice, ElEvent });
      } else {
        await notice.create({
          title,
          content,
          category,
          writer,
          institutionId,
        });

        const noticeInfo = await notice.findAll({
          where: { institutionId },
          order: [
            ['createdAt', 'DESC'],
            ['id', 'DESC'],
          ],
          attributes: [
            ['id', 'noticeId'],
            'category',
            'writer',
            'title',
            'content',
            'institutionId',
            'createdAt',
          ],
        });
        const ElNotice = noticeInfo.filter((el) => el.category === 'notice');
        const ElEvent = noticeInfo.filter((el) => el.category === 'event');
        res.json({ noticeInfo, ElNotice, ElEvent });
      }
    }
  },
};
