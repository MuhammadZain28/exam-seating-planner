import { Layout, Users, Building2, Calendar } from "lucide-react";

const Dashboard = ({ students = [], rooms = [], exams = [], seatingPlans = [] }) => {
  const stats = [
    { label: 'Total Students', value: students.length, icon: Users, color: 'bg-blue-500' },
    { label: 'Available Rooms', value: rooms.length, icon: Building2, color: 'bg-green-500' },
    { label: 'Scheduled Exams', value: exams.length, icon: Calendar, color: 'bg-purple-500' },
    { label: 'Seating Plans', value: seatingPlans.length, icon: Layout, color: 'bg-orange-500' }
  ];

  return (
    <div className="p-6 w-full bg-[#F2F4F7] min-h-screen">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, idx) => {
          const Icon = stat.icon;
          return (
            <div key={idx} className="bg-white rounded-lg shadow-md p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-500 text-sm">{stat.label}</p>
                  <p className="text-3xl font-bold mt-2">{stat.value}</p>
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
          <h2 className="text-xl font-semibold mb-4 text-gray-800">Recent Exams</h2>
          {exams.length > 0 ? (
            <div className="space-y-3">
              {exams.slice(0, 5).map(exam => (
                <div key={exam.id} className="flex justify-between items-center p-3 bg-gray-50 rounded">
                  <div>
                    <p className="font-medium">{exam.name}</p>
                    <p className="text-sm text-gray-500">{exam.date} at {exam.time}</p>
                  </div>
                  <span className="px-3 py-1 bg-indigo-100 text-indigo-800 rounded-full text-xs">
                    {exam.students.length} students
                  </span>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-500 text-center py-8">No exams scheduled yet</p>
          )}
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold mb-4 text-gray-800">Room Capacity</h2>
          {rooms.length > 0 ? (
            <div className="space-y-3">
              {rooms.map(room => (
                <div key={room.id} className="p-3 bg-gray-50 rounded">
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-medium">{room.name}</span>
                    <span className="text-sm text-gray-600">{room.capacity} seats</span>
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