import express from 'express';
import fileDb from '../fileDb';
import { MessageBody } from '../types';

const router = express.Router();

router.get('/', (req, res) => {
  const datetime = req.query.datetime as string;

  if (datetime === undefined) {
    res.send(fileDb.getItems().slice(-30));
  } else if (!Number.isNaN(Date.parse(datetime))) {
    res.send(
      fileDb
        .getItems()
        .filter((x) => Date.parse(x.datetime) > Date.parse(datetime))
    );
  } else {
    res.status(400).send();
  }
});

router.post('/', async (req, res) => {
  const body = req.body as MessageBody;

  if (!body.author || !body.message) {
    res
      .status(400)
      .send({ error: 'Author and message must be present in the request.' });
  } else {
    const message = {
      id: crypto.randomUUID(),
      author: body.author,
      message: body.message,
      datetime: new Date().toISOString(),
    };

    await fileDb.addItem(message);

    res.send(message);
  }
});

export default router;
