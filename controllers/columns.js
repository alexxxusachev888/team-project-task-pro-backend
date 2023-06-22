const { ctrlWrapper, handleHttpError } = require("../helpers");
const { Board, Column, Task } = require("../models");

/* const getAllColumns = async (req, res) => {
    const { boardId } = req.params;
    const columns = await Column.find({ board: boardId }).populate('tasks');
    res.json(columns);
  };
  
  const getColumnById = async (req, res) => {
    const { id } = req.params;
    const column = await Column.findById(id).populate('tasks');
    if (!column) throw handleHttpError(404, 'Column not found');
    res.json(column);
  }; */
  
  const createColumn = async (req, res) => {
    const { boardId } = req.params;
    const column = new Column({ ...req.body, board: boardId });
    const savedColumn = await column.save();
    
    const board = await Board.findById(boardId);
    board.columns.push(savedColumn._id);
    await board.save();
  
    res.status(201).json(savedColumn);
  };
  
  const updateColumn = async (req, res) => {
    const { id } = req.params;
  
    const updatedColumn = await Column.findByIdAndUpdate(id, req.body, { new: true });
    if (!updatedColumn) throw handleHttpError(404, 'Column not found');
  
    res.json(updatedColumn);
  };
  
  const deleteColumn = async (req, res) => {
    const { id, boardId } = req.params;
    const deletedColumn = await Column.findByIdAndDelete(id);
  
    if (!deletedColumn) throw handleHttpError(404, 'Column not found');
  
    const board = await Board.findById(boardId);
    board.columns.pull(id);
    await board.save();
  
    res.json({ message: 'Column deleted', deletedColumn });
  };

module.exports = {
createColumn: ctrlWrapper(createColumn),
updateColumn: ctrlWrapper(updateColumn),
deleteColumn: ctrlWrapper(deleteColumn),
/* getAllColumns: ctrlWrapper(getAllColumns),
getColumnById: ctrlWrapper(getColumnById), */
};