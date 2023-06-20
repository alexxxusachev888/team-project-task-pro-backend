const { ctrlWrapper, handleHttpError } = require("../helpers");
const { User } = require('../models/user');

const createBoard = async (req, res) => {};

const updateBoard = async (req, res) => {};

const deleteBoard = async (req, res) => {};

const updateBoardIconBackground = async (req, res) => {
    const { _id } = req.user;
    const { boardId } = req.params;
    const { icon, background } = req.body;

    const user = await User.findOne({ _id, "boards._id": boardId });

    if (!user) {
        return res.status(404).send({ message: 'User not found' });
    }

    const board = user.boards.id(boardId);

    if (!board) {
        return res.status(404).send({ message: 'Board not found' });
    }

    if (icon) board.icon = icon;
    if (background) board.background = background;

    await user.save();
    res.json(board);
}

module.exports = {
createBoard: ctrlWrapper(createBoard),
updateBoard: ctrlWrapper(updateBoard),
deleteBoard: ctrlWrapper(deleteBoard),
updateBoardIconBackground: ctrlWrapper(updateBoardIconBackground),
};
  