var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function (req, res, next) {
  res.send('respond with a resource');
});

router.post("/join", async function (req, res) {
  if (!req.body.id || !req.body.password) {
    res.json({
      result: "fail",
      message: "아이디와 비밀번호를 입력해주세요."
    });
    return;
  }

  var checkUser = await sequelize.models.user.findOne({
    where: {
      id: req.body.id
    }
  });
  if (checkUser) {
    res.json({
      result: "fail",
      message: "이미 가입된 아이디입니다."
    });
    return;
  }
  await sequelize.models.user.create(req.body);
  res.json({
    result: "success"
  });
});

router.post("/login", async function (req, res) {
  if (!req.body.id || !req.body.password) {
    res.json({
      result: "fail",
      message: "아이디와 비밀번호를 입력해주세요."
    });
    return;
  }

  var checkUser = await sequelize.models.user.findOne({
    where: {
      id: req.body.id,
      password: req.body.password
    }
  });
  if (!checkUser) {
    res.json({
      result: "fail",
      message: "아이디 또는 패스워드가 틀렸습니다."
    });
    return;
  }
  req.session.user = checkUser;

  res.json({
    result: "success",
    user: checkUser
  });
});

router.post("/info", async function (req, res) {
  if (req.session.user) {
    res.json({
      result: "success",
      user: req.session.user
    });
  } else {
    res.json({
      result: "fail"
    });
  }
});

router.post("/logout", async function (req, res) {
  req.session.destroy();
  res.json({
    result: "success"
  });
});

router.post("/change-password", async function (req, res) {
  const { id, currentPassword, newPassword } = req.body;

  const user = await sequelize.models.user.findOne({
    where: {
      id: id
    }
  });

  if (!user) {
    return res.json({
      result: "fail",
      message: "사용자를 찾을 수 없습니다."
    });
  }

  if (user.password !== currentPassword) {
    return res.json({
      result: "fail",
      message: "현재 비밀번호가 올바르지 않습니다."
    });
  }

  user.password = newPassword;
  await user.save();

  res.json({
    result: "success"
  });
});

router.post("/delete", async function (req, res) {
  const { id } = req.body;

  const user = await sequelize.models.user.findOne({
    where: {
      id: id
    }
  });

  if (!user) {
    return res.json({
      result: "fail",
      message: "사용자를 찾을 수 없습니다."
    });
  }

  await sequelize.models.user.destroy({
    where: {
      id: id
    }
  });

  req.session.destroy();

  res.json({
    result: "success"
  });
});

router.post("/save-event", async function (req, res) {
  if (!req.session.user) {
    return res.json({
      result: "fail",
      message: "로그인이 필요합니다."
    });
  }

  const { date, title } = req.body;

  if (!date || !title) {
    return res.json({
      result: "fail",
      message: "날짜와 제목을 입력해주세요."
    });
  }

  console.log(`Saving event: ${title} on ${date} for user ${req.session.user.no}`);

  try {
    await sequelize.models.event.create({
      userId: req.session.user.no,
      date: new Date(date),
      title: title
    });
    res.json({
      result: "success"
    });
  } catch (error) {
    console.error('Error saving event:', error);
    res.json({
      result: "fail",
      message: "이벤트 저장 중 오류가 발생했습니다."
    });
  }
});

router.post("/get-events", async function (req, res) {
  if (!req.session.user) {
    return res.json({
      result: "fail",
      message: "로그인이 필요합니다."
    });
  }

  const { date } = req.body;

  if (!date) {
    return res.json({
      result: "fail",
      message: "날짜를 입력해주세요."
    });
  }

  try {
    const events = await sequelize.models.event.findAll({
      where: {
        userId: req.session.user.no,
        date: new Date(date)
      }
    });

    res.json({
      result: "success",
      events: events.map(event => event.title)
    });
  } catch (error) {
    console.error('Error getting events:', error);
    res.json({
      result: "fail",
      message: "이벤트를 불러오는 중 오류가 발생했습니다."
    });
  }
});

router.post("/delete-event", async function (req, res) {
  if (!req.session.user) {
    return res.json({
      result: "fail",
      message: "로그인이 필요합니다."
    });
  }

  const { date, title } = req.body;

  if (!date || !title) {
    return res.json({
      result: "fail",
      message: "날짜와 제목을 입력해주세요."
    });
  }

  try {
    await sequelize.models.event.destroy({
      where: {
        userId: req.session.user.no,
        date: new Date(date),
        title: title
      }
    });
    res.json({
      result: "success"
    });
  } catch (error) {
    console.error('Error deleting event:', error);
    res.json({
      result: "fail",
      message: "이벤트 삭제 중 오류가 발생했습니다."
    });
  }
});

module.exports = router;
