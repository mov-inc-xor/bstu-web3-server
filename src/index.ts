import express from 'express'
import { v4 as uuidv4 } from 'uuid'

const app = express()
const port = 8080

const generateDesk = () => {
  const generateTasks = () =>
    Array.from(Array(Math.floor(3 + Math.random() * 7))).map(() => ({
      text: `Задача с ID ${uuidv4()}`,
    }))

  return {
    desk: {
      lists: [
        {
          title: 'Нераспределённые',
          color: '#e5ebf5',
          tasks: generateTasks(),
        },
        {
          title: 'Ожидают доработок',
          color: '#e5ebf5',
          tasks: generateTasks(),
        },
        {
          title: 'В работе',
          color: '#e5ebf5',
          tasks: generateTasks(),
        },
        {
          title: 'Выполнены',
          color: '#e5ebf5',
          tasks: generateTasks(),
        },
      ],
    },
  }
}

app.get('/desk', (req, res) => {
  res.json(generateDesk())
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
