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
  if (checkUser) {    // 이미 가입된 아이디가 있으면
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
  if (!checkUser) { // 로그인 실패 -> 아이디 또는 패스워드가 틀림
    res.json({
      result: "fail",
      message: "아이디 또는 패스워드가 틀렸습니다."
    });
    return;
  }
  // TODO: 세션에 로그인 정보 저장
  req.session.user = checkUser;

  res.json({
    result: "success",
    user: checkUser
  });
});

router.post("/info", async function (req, res) {
  if (req.session.user) { // 세션에 사용자 정보가 있을 때 -> 로그인 상태
    res.json({
      result: "success",
      user: req.session.user
    });
  } else { // 세션에 사용자 정보가 없을 때 -> 로그아웃 상태
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

  // 사용자 찾기
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

  // 현재 비밀번호 확인
  if (user.password !== currentPassword) {
    return res.json({
      result: "fail",
      message: "현재 비밀번호가 올바르지 않습니다."
    });
  }

  // 새로운 비밀번호 설정
  user.password = newPassword;
  await user.save();

  res.json({
    result: "success"
  });
});

router.post("/delete", async function (req, res) {
  const { id } = req.body;

  // 사용자 찾기
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

  // 사용자 삭제
  await sequelize.models.user.destroy({
    where: {
      id: id
    }
  });

  // 세션 파괴
  req.session.destroy();

  res.json({
    result: "success"
  });
});

module.exports = router;
