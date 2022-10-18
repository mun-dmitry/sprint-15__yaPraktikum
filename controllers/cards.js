const Card = require('../models/card');
const NotFoundError = require('../errors/NotFoundError');
const BadRequestError = require('../errors/BadRequestError');
const ForbiddenError = require('../errors/ForbiddenError');

const sendCards = (req, res, next) => {
  Card.find({})
    .then((cards) => res.send({ data: cards }))
    .catch(next);
};

const createCard = (req, res, next) => {
  const { name, link } = req.body;
  const owner = req.user._id;
  Card.create({ name, link, owner })
    .then((card) => res.send({ data: card }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new BadRequestError(err.message));
      }
      next(err);
    });
};

const deleteCard = (req, res, next) => {
  Card.findById(req.params.cardId)
    .then((card) => {
      if (!card) {
        throw new NotFoundError('Card not found');
      } if (card.owner.toString() === req.user._id) {
        Card.findByIdAndRemove(req.params.cardId)
          .then((removedCard) => res.send({ data: removedCard }))
          .catch(next);
      } else {
        throw new ForbiddenError('Only owner can delete card');
      }
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new BadRequestError(`${err.value} is not a valid ObjectId`));
      }
      next(err);
    });
};

const likeCard = (req, res, next) => {
  Card.findByIdAndUpdate(req.params.cardId, {
    $addToSet: { likes: req.user._id },
  },
  { new: true })
    .then((card) => {
      if (!card) {
        throw new NotFoundError('Card not found');
      }
      res.send({ data: card });
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new BadRequestError(`${err.value} is not a valid ObjectId`));
      }
      next(err);
    });
};

const dislikeCard = (req, res, next) => {
  Card.findByIdAndUpdate(req.params.cardId, {
    $pull: { likes: req.user._id },
  },
  { new: true })
    .then((card) => {
      if (!card) {
        throw new NotFoundError('Card not found');
      }
      res.send({ data: card });
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new BadRequestError(`${err.value} is not a valid ObjectId`));
      }
      next(err);
    });
};

module.exports = {
  sendCards,
  createCard,
  deleteCard,
  likeCard,
  dislikeCard,
};
