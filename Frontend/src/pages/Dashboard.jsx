import { Layout, Users, Building2, Calendar, Building2Icon, Table } from "lucide-react";

const Dashboard = ({ students = [], rooms = [], exams = [] }) => {
  const stats = [
    { label: 'Total Students', value: students.length, icon: Users, color: 'bg-blue-500' },
    { label: 'Available Rooms', value: rooms.length, icon: Building2, color: 'bg-green-500' },
    { label: 'Scheduled Exams', value: exams.length, icon: Calendar, color: 'bg-purple-500' },
    { label: 'Total Capacity', value: rooms.reduce((acc, room) => acc + (room.rows * room.columns), 0), icon: Table, color: 'bg-orange-500' }
  ];

  return (
    <div className="p-6 w-full min-h-screen">
      <h1 className="text-3xl font-bold mb-6 text-black">Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, idx) => {
          const Icon = stat.icon;
          return (
            <div key={idx} className="bg-white rounded-lg shadow-md p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-black font-bold text-sm">{stat.label}</p>
                  <p className="text-3xl font-bold mt-2 text-black">{stat.value}</p>
                </div>
                <div className={`${stat.color} p-3 rounded-full`}>
                  <Icon className="w-6 h-6 text-white" />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-bold mb-4 text-black flex items-center gap-2"><Calendar />Upcoming Exams</h2>
          {exams.length > 0 ? (
            <div className="space-y-3 max-h-72 overflow-auto">
              {exams.map(exam => (
                <div key={exam.course} className="flex justify-between items-center p-3 bg-gray-50 rounded">
                  <div>
                    <p className="font-medium text-black">{exam.course}</p>
                    <p className="text-sm text-gray-700">{exam.date} at {exam.time || "TBD"}</p>
                  </div>
                  <span className="px-3 py-1 bg-indigo-100 text-indigo-800 rounded-full text-xs">
                    {Array.isArray(exam.students) ? exam.students.length : 0} students
                  </span>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-500 text-center py-8">No exams scheduled yet</p>
          )}
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-bold mb-4 text-black flex items-center gap-2"><Building2Icon />Available Rooms</h2>
          {rooms.length > 0 ? (
            <div className="space-y-3 max-h-72 overflow-auto">
              {rooms.map(room => (
                <div key={room.name} className="p-3 bg-gray-50 rounded">
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-medium text-black">{room.name}</span>
                    <span className="text-sm text-gray-600">{room.rows * room.columns} seats</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-green-500 h-2 rounded-full"
                      style={{ width: '100%' }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-500 text-center py-8">No rooms configured yet</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;