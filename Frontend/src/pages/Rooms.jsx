import { useState, useEffect } from 'react';
import { PlusCircle, Edit2, Trash2, Building, Building2 } from 'lucide-react';
import Modal from '../components/Modal';
import Room from '../utils/room';
const RoomsPage = () => {
  const [showForm, setShowForm] = useState(false);
  const [editingRoom, setEditingRoom] = useState(null);
  const [formData, setFormData] = useState(new Room());
  const [rooms, setRooms] = useState([]);
  // const [layout, setLayout] = useState([[]])

  useEffect(() => {
    const fetchRooms = async () => {
      const roomInstance = new Room();
      const data = await roomInstance.getRooms();
      console.log("Fetched Rooms:", data);
      if (data) {
        setRooms(data);
      } else {
        setRooms([]);
      }
    };

    fetchRooms();
  }, []);
  const handleSubmit = async (e) => {
    e.preventDefault();
    const roomData = {
      ...formData,
      capacity: parseInt(formData.capacity),
      rows: parseInt(formData.rows),
      columns: parseInt(formData.columns)
    };

    if (editingRoom) {
      setRooms(rooms.map(r => r.id === editingRoom.id ? { ...roomData, id: r.id } : r));
    } else {
      const roomInstance = new Room();
      const res = await roomInstance.insertRoom(roomData);
      console.log("Insert Room Response:", res);
      setRooms([...rooms, { ...roomData, id: Date.now() }]);
    }
    setFormData(new Room());
    setShowForm(false);
    setEditingRoom(null);
  };

  const handleEdit = (room) => {
    setEditingRoom(room);
    setFormData(room);
    setShowForm(true);
  };

  const handleDelete = (id) => {
    setRooms(rooms.filter(r => r.id !== id));
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Rooms Management</h1>
        <button
          onClick={() => {
            setShowForm(!showForm);
          }}
          className="bg-indigo-600 text-white px-4 py-2 rounded-lg flex items-center space-x-2 hover:bg-indigo-700"
        >
          <PlusCircle className="w-4 h-4" />
          <span>  Room</span>
        </button>
      </div>
        <Modal isOpen={showForm} onClose={() => setShowForm(false)}
          title={
          editingRoom ? (
            "Edit Exam"
          ) : (
            <div className="flex items-center font-bold gap-2 text-4xl ">
              <Building2 size={36} /> Room
            </div>
          )
        }>
          <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <label htmlFor="">Room
            <input
              type="text"
              placeholder="Room Name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              required
            />
            </label>
            <label htmlFor="">Capacity
            <input
              type="number"
              placeholder="Capacity"
              value={formData.capacity}
              onChange={(e) => setFormData({ ...formData, capacity: e.target.value })}
              className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              required
            />
            </label>
            <label htmlFor="">Rows
            <input
              type="number"
              placeholder="Number of Rows"
              value={formData.rows}
              onChange={(e) => setFormData({ ...formData, rows: e.target.value })}
              className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              required
            />
            </label>
            <label htmlFor="">Columns
            <input
              type="number"
              placeholder="Number of Columns"
              value={formData.columns}
              onChange={(e) => setFormData({ ...formData, columns: e.target.value })}
              className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              required
            />
            </label>
            {/* <div>
              {formData.rows > 0 && formData.columns > 0 && (
                <div className='flex flex-col gap-0.5 w-64 h-64 border border-gray-300 rounded'>
                  {Array.from({ length: formData.rows}).map((_, rowIndex) => (
                    <div key={rowIndex} className="flex gap-0.5 w-full h-full">
                      {Array.from({length: formData.columns}).map((_, colIndex) => (
                        <div key={colIndex} className="bg-indigo-200 rounded-sm w-full h-full hover:bg-slate-400"></div>
                      ))}
                    </div>
                  ))}
                </div>
              )}
            </div> */}
            <div className="md:col-span-2 flex space-x-3">
              <button
                type="submit"
                className="bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700"
              >
                {editingRoom ? 'Update' : ' '} Room
              </button>
              <button
                type="button"
                onClick={() => {
                  setShowForm(false);
                  setEditingRoom(null);
                }}
                className="bg-gray-300 text-gray-700 px-6 py-2 rounded-lg hover:bg-gray-400"
              >
                Cancel
              </button>
            </div>
          </form>
        </Modal>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {rooms.map(room => (
          <div key={room.id} className="bg-white rounded-lg shadow-md p-6">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="text-xl font-semibold text-gray-800">{room.name}</h3>
                <p className="text-gray-500 text-sm mt-1">Capacity: {room.columns * room.rows} seats</p>
              </div>
              <div className="flex space-x-2">
                <button
                  onClick={() => handleEdit(room)}
                  className="text-blue-600 hover:text-blue-800 bg-indigo-100"
                >
                  <Edit2 className="w-4 h-4" />
                </button>
                <button
                  onClick={() => handleDelete(room.id)}
                  className="text-red-600 hover:text-red-800 bg-indigo-100"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
            <div className="bg-gray-50 rounded p-4">
              <p className="text-sm text-gray-600">Layout: {room.rows} × {room.columns}</p>
              <div className="mt-3 grid gap-1" style={{ 
                gridTemplateColumns: `repeat(${Math.min(room.columns, 10)}, 1fr)` 
              }}>
                {Array.from({ length: Math.min(room.rows * room.columns, 50) }).map((_, i) => (
                  <div key={i} className="bg-indigo-200 aspect-square rounded-sm"></div>
                ))}
              </div>
            </div>
          </div>
        ))}
        {rooms.length === 0 && (
          <div className="col-span-full text-center text-gray-500 py-12">
            No rooms configured yet
          </div>
        )}
      </div>
    </div>
  );
};

export default RoomsPage;