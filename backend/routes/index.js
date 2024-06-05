var express = require('express');
var router = express.Router();

router.post("/board/write", async function (req, res) {
  var board = req.body
  var createdBoard = await sequelize.models.board.create(board)
  res.json(createdBoard)

})
router.get("/board/:no", async function (req, res) {
  var no = req.params.no
  var board = await sequelize.models.board.findByPk(no)
  board.viewCount++
  await board.save()
  res.json(board)
})
router.post("/board/list", async function (req, res) {
  console.log(req.session)
  var page = req.body.page || 1
  var offset = (page - 1) * 10
  var boardList = await sequelize.models.board.findAll({
    limit: 10,
    offset: offset,
    order: [["writeDate", "DESC"], ["no", "DESC"]]
  })
  var totalCount = await sequelize.models.board.count()
  console.log(totalCount)
  var totalPage = Math.ceil(totalCount / 10)
  console.log(totalPage)

  res.json({
    boardList: boardList,
    totalPage: totalPage
  })
})

router.delete("/board/:no", async function (req, res) {
  var no = req.params.no
  await sequelize.models.board.destroy({
    where: {
      no: no
    }
  })
  res.json({
    result: "success"
  })
})
router.post("/board/modify", async function (req, res) {
  console.log(req.body)
  await sequelize.models.board.update({
    title: req.body.title,
    content: req.body.content,
    writer: req.body.writer
  }, {
    where: {
      no: req.body.no
    }
  })
  res.json({
    result: "success"
  })
})

router.post("/event", async function (req, res) {
  try {
      var event = req.body;
      console.log('Received event:', event); // 수신된 데이터를 로그로 출력
      var createdEvent = await sequelize.models.event.create(event);
      res.json(createdEvent);
  } catch (error) {
      console.error('Error in /event route:', error); // 오류 로그 출력
      res.status(500).json({ error: error.message, stack: error.stack });
  }
});

// 이벤트 조회 라우트
router.get("/events/:date", async function (req, res) {
  try {
      var date = req.params.date;
      var events = await sequelize.models.event.findAll({
          where: {
              date: date
          }
      });
      res.json(events);
  } catch (error) {
      console.error('Error in /events/:date route:', error); // 오류 로그 출력
      res.status(500).json({ error: error.message });
  }
});

module.exports = router;
