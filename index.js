require('dotenv').config();
const express = require("express")
const app = express();
app.use(express.json()); // JSON形式のリクエストボディのパースを有効化(この記述がないとbodyに値が入らない)

const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const cors = require('cors')
app.use(cors({
  origin: 'http://localhost:8080',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true,
}));

// ジャンルの取得
app.get("/genres", async (_, res) => {
  try {
    const AllGenre = await prisma.genre.findMany();
    res.json(AllGenre)
  } catch(error) {
    console.log(error)
  }
})

// ジャンルの作成
app.post("/genres", async (req, res) => {
  console.log(req.body)
  try {
    const savedData = await prisma.genre.create({data: req.body});
    res.json(savedData)
  } catch(error) {
    res.send("ジャンルの保存に失敗しました",error)
  }
})

// ジャンルの削除
app.delete("/genres/:id", async (req, res) => {
  try {
    const genreId = parseInt(req.params.id, 10);
    await prisma.genre.delete({where:{id: genreId}})
    return res.status(200).send();
  } catch(error) {
    res.send("ジャンルの削除に失敗しました。")
  }
})

// タスクの取得
app.get("/tasks", async(req, res) => {
  try {
    const AllTasks = await prisma.task.findMany();
    res.json(AllTasks)
  } catch(error) {
    console.log(error)
  }
})

// タスクの作成
app.post("/tasks", async (req, res) => {
  try {
    const deadlineDate = new Date(req.body.deadlineDate)
    const savedData = await prisma.task.create({
      data: {
        ...req.body,
        deadlineDate: deadlineDate
      },
    });
    res.json(savedData)
  } catch(error) {
    console.log(error)
    res.send("タスクの保存に失敗しました")
  }
})

// タスクの更新
app.put("/tasks/:id", async(req, res) => {
  try{
    const deadlineDate = new Date(req.body.deadlineDate)
    const taskId = parseInt(req.params.id, 10);
    const updateData = await prisma.task.update({where:{id: taskId}, data: {
      ...req.body,
      deadlineDate: deadlineDate
    },
    })
    res.json(updateData)
  } catch(error) {
    res.send("タスクの更新に失敗しました。")
  }
})

// タスクの削除
app.delete("/tasks/:id", async(req, res) => {
  try {
    const taskId = parseInt(req.params.id, 10);
    const deletedTask = await prisma.task.delete({where: {id: taskId}})
    res.json(deletedTask)
  } catch(error) {
    res.send("タスクの削除に失敗しました")
  }
})

// ステータスの更新
app.put("/tasks/:id/status", async(req, res) => {
  try {
    const taskId = parseInt(req.params.id, 10);
    const newStatus = parseInt(req.body.newStatus, 10);
    console.log(taskId, newStatus)
    const response = await prisma.task.update({
      where: { id: taskId },
      data: { status: newStatus }
    });
    res.json(response)
  } catch(error) {
    console.log(error)
    res.send("ステータス変更に失敗しました。")
  }

})



app.listen(5000, () => {
  console.log("listening on localhost 5000")
})