const Card = require('../models/card');

const sendCards = (req, res) => {
  Card.find({})
    .then((cards) => res.send({ data: cards }))
    .catch(() => {
      res.status(500).send({ message: 'Internal server error' });
    });
};

const createCard = (req, res) => {
  const { name, link } = req.body;
  const owner = req.user._id;
  Card.create({ name, link, owner })
    .then((card) => res.send({ data: card }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(400).send({ message: err.message });
        return;
      }
      res.status(500).send({ message: 'Internal server error' });
    });
};

const deleteCard = (req, res) => {
  Card.findById(req.params.cardId)
    .then((card) => {
      if (!card) {
        res.status(404).send({ message: 'Card not found' });
        return;
      } if (card.owner === req.user._id) {
        Card.findByIdAndRemove(req.params.cardId)
          .then((removedCard) => res.send({ data: removedCard }))
          .catch(() => {
            res.status(500).send({ message: 'Internal server error' });
          });
      } else {
        res.status(403).send({ message: 'Only owner can delete card' });
      }
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        res.status(400).send({ message: `${err.value} is not a valid ObjectId` });
        return;
      }
      res.status(500).send({ message: 'Internal server error' });
    });
};

const likeCard = (req, res) => {
  Card.findByIdAndUpdate(req.params.cardId, {
    $addToSet: { likes: req.user._id },
  },
  { new: true })
    .then((card) => {
      if (!card) {
        res.status(404).send({ message: 'Card not found' });
        return;
      }
      res.send({ data: card });
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        res.status(400).send({ message: `${err.value} is not a valid ObjectId` });
        return;
      }
      res.status(500).send({ message: 'Internal server error' });
    });
};

const dislikeCard = (req, res) => {
  Card.findByIdAndUpdate(req.params.cardId, {
    $pull: { likes: req.user._id },
  },
  { new: true })
    .then((card) => {
      if (!card) {
        res.status(404).send({ message: 'Card not found' });
        return;
      }
      res.send({ data: card });
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        res.status(400).send({ message: `${err.value} is not a valid ObjectId` });
        return;
      }
      res.status(500).send({ message: 'Internal server error' });
    });
};

module.exports = {
  sendCards,
  createCard,
  deleteCard,
  likeCard,
  dislikeCard,
};
