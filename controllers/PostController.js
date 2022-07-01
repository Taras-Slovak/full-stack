import PostModel from '../models/Post.js';

export const getAll = async (req, res) => {
  try {
    const posts = await PostModel.find().populate('user').exec();
    res.json(posts);
  } catch (e) {
    console.error(e);
    res.status(500).json({
      message: 'Unable to retrieve articles',
    });
  }
};

export const getOne = async (req, res) => {
  try {
    const postId = req.params.id;
    PostModel.findOneAndUpdate(
      { _id: postId },
      { $inc: { viewsCount: 1 } },
      { returnDocument: 'after' },
      (err, doc) => {
        if (err) {
          return res.status(500).json({
            message: 'Unable to retrieve the article',
          });
        }
        if (!doc) {
          return res.status(404).json({
            message: 'Article not found',
          });
        }

        return res.json(doc);
      },
    );
  } catch (e) {
    console.error(e);
    res.status(500).json({
      message: 'Unable to retrieve the article',
    });
  }
};

export const create = async (req, res) => {
  try {
    const doc = new PostModel({
      title: req.body.title,
      text: req.body.title,
      imageUrl: req.body.imageUrl,
      tags: req.body.tags,
      user: req.userId,
    });

    const post = await doc.save();

    res.json(post);
  } catch (e) {
    console.error(e);
    res.status(500).json({
      message: 'Failed to create an article',
    });
  }
};
