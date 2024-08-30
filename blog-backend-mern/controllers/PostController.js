import PostModel from "../models/Post.js";

export const getLastTags = async (req, res) => {
  try {
    const posts = await PostModel.find().limit(5).exec();
    const tags = posts
      .map((obj) => obj.tags)
      .flat()
      .slice(0, 5);

    res.json(tags);
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Не вдалось отримати статтю",
    });
  }
};

export const getAll = async (req, res) => {
  try {
    const post = await PostModel.find().populate("user").exec();
    res.json(post);
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Не вдалось отримати статтю",
    });
  }
};

export const getOne = async (req, res) => {
  try {
    const postId = req.params.id;
    PostModel.findOneAndUpdate(
      {
        _id: postId,
      },
      { $inc: { viewsCount: 1 } },
      {
        returnDocument: "after",
      }
      //   (err, doc) => {
      //   }
    )
      .populate("user")
      .then((doc, err) => {
        if (err) {
          console.log(err);
          return res.status(500).json({
            message: "Не вдалось повернути статтю",
          });
        }

        if (!doc) {
          return res.status(404).json({
            message: "Стаття не знайдена",
          });
        }
        res.json(doc);
      });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Не вдалось отримати статтю",
    });
  }
};

export const create = async (req, res) => {
  try {
    const doc = new PostModel({
      title: req.body.title,
      text: req.body.text,
      imageUrl: req.body.imageUrl,
      tags: req.body.tags.split(","),
      user: req.userId,
    });
    const post = await doc.save();
    res.json(post);
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Не вдалось створити статтю",
    });
  }
};

export const remove = async (req, res) => {
  try {
    const postId = req.params.id;
    PostModel.findOneAndDelete({
      _id: postId,
    }).then((doc, err) => {
      if (err) {
        console.log(err);
        return res.status(500).json({
          message: "Не вдалось видалити статтю",
        });
      }

      if (!doc) {
        return res.status(404).json({
          message: "Стаття не знайдена",
        });
      }
      res.json({ success: true, message: "Статтю видалено" });
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Не вдалось отримати статтю",
    });
  }
};

export const update = async (req, res) => {
  try {
    const postId = req.params.id;
    await PostModel.updateOne(
      {
        _id: postId,
      },
      {
        title: req.body.title,
        text: req.body.text,
        imageUrl: req.body.imageUrl,
        tags: req.body.tags.split(","),
        user: req.userId,
      }
    );
    res.json({ success: true, message: "Статтю оновлено" });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Не вдалось оновити статтю",
    });
  }
};
