import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";

interface PaymentReminder {
  id: string;
  name: string;
  amount: number;
  payTo: string;
  schedule: string;
  isActive: boolean;
  description: string;
  dueDate?: string;
}

export default function PaymentReminders() {
  const navigate = useNavigate();
  const [showNewReminder, setShowNewReminder] = useState(false);
  const [reminders, setReminders] = useState<PaymentReminder[]>([
    {
      id: "1",
      name: "Rent Payment",
      amount: 1200,
      payTo: "John's Property Management",
      schedule: "Every 1st of month",
      isActive: true,
      description:
        "Monthly rent payment for apartment 4B. Due on the 1st of every month.",
      dueDate: "Every 1st of month",
    },
    {
      id: "2",
      name: "Credit Card Bill",
      amount: 485,
      payTo: "Chase Bank",
      schedule: "Every 15th",
      isActive: true,
      description: "Monthly credit card payment. Minimum payment due on 15th.",
      dueDate: "Every 15th",
    },
    {
      id: "3",
      name: "Internet Bill",
      amount: 89,
      payTo: "Spectrum",
      schedule: "Every 20th",
      isActive: false,
      description:
        "Monthly internet service payment for home broadband connection.",
      dueDate: "Every 20th",
    },
  ]);

  const [newReminder, setNewReminder] = useState({
    name: "",
    amount: "",
    payTo: "",
    schedule: "schedule",
    description: "",
  });

  const totalAmountDue = reminders
    .filter((r) => r.isActive)
    .reduce((sum, r) => sum + r.amount, 0);

  const activeReminders = reminders.filter((r) => r.isActive).length;

  const toggleReminder = (id: string) => {
    setReminders((prev) =>
      prev.map((r) => (r.id === id ? { ...r, isActive: !r.isActive } : r)),
    );
  };

  const deleteReminder = (id: string) => {
    setReminders((prev) => prev.filter((r) => r.id !== id));
  };

  const addNewReminder = () => {
    if (!newReminder.name || !newReminder.amount || !newReminder.payTo) return;

    const reminder: PaymentReminder = {
      id: Date.now().toString(),
      name: newReminder.name,
      amount: parseFloat(newReminder.amount),
      payTo: newReminder.payTo,
      schedule: newReminder.schedule === "schedule" ? "One-time" : "Monthly",
      isActive: true,
      description: newReminder.description,
      dueDate: newReminder.schedule === "schedule" ? "One-time" : "Monthly",
    };

    setReminders((prev) => [...prev, reminder]);
    setNewReminder({
      name: "",
      amount: "",
      payTo: "",
      schedule: "schedule",
      description: "",
    });
    setShowNewReminder(false);
  };

  if (showNewReminder) {
    return (
      <div className="min-h-screen bg-gray-50 max-w-md mx-auto relative">
        <Header
          title="New Payment Reminder"
          showBackButton={true}
          onBackClick={() => setShowNewReminder(false)}
        />

        {/* Form */}
        <div className="p-4 space-y-6">
          <div>
            <label className="block text-sm font-medium mb-2">Name</label>
            <input
              type="text"
              value={newReminder.name}
              onChange={(e) =>
                setNewReminder((prev) => ({ ...prev, name: e.target.value }))
              }
              placeholder="Enter recipient name"
              className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Amount</label>
            <div className="relative">
              <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500">
                $
              </span>
              <input
                type="number"
                value={newReminder.amount}
                onChange={(e) =>
                  setNewReminder((prev) => ({
                    ...prev,
                    amount: e.target.value,
                  }))
                }
                placeholder="0.00"
                className="w-full pl-8 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Pay To</label>
            <input
              type="text"
              value={newReminder.payTo}
              onChange={(e) =>
                setNewReminder((prev) => ({ ...prev, payTo: e.target.value }))
              }
              placeholder="Enter recipient name"
              className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Schedule</label>
            <div className="flex gap-3">
              <button
                onClick={() =>
                  setNewReminder((prev) => ({ ...prev, schedule: "schedule" }))
                }
                className={`flex-1 py-3 px-4 rounded-xl font-medium transition-colors ${
                  newReminder.schedule === "schedule"
                    ? "bg-blue-600 text-white"
                    : "bg-white border border-gray-200 text-gray-700"
                }`}
              >
                <div className="flex items-center justify-center">
                  <svg
                    className="w-4 h-4 mr-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                    />
                  </svg>
                  Schedule
                </div>
              </button>
              <button
                onClick={() =>
                  setNewReminder((prev) => ({ ...prev, schedule: "recurring" }))
                }
                className={`flex-1 py-3 px-4 rounded-xl font-medium transition-colors ${
                  newReminder.schedule === "recurring"
                    ? "bg-blue-600 text-white"
                    : "bg-white border border-gray-200 text-gray-700"
                }`}
              >
                <div className="flex items-center justify-center">
                  <svg
                    className="w-4 h-4 mr-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                    />
                  </svg>
                  Recurring
                </div>
              </button>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">
              Description
            </label>
            <textarea
              value={newReminder.description}
              onChange={(e) =>
                setNewReminder((prev) => ({
                  ...prev,
                  description: e.target.value,
                }))
              }
              placeholder="Add a note (optional)"
              rows={3}
              className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none bg-white"
            />
          </div>

          {/* Add Button */}
          <button
            onClick={addNewReminder}
            disabled={
              !newReminder.name || !newReminder.amount || !newReminder.payTo
            }
            className={`w-full py-4 rounded-xl font-semibold text-lg transition-all ${
              newReminder.name && newReminder.amount && newReminder.payTo
                ? "bg-blue-600 text-white shadow-lg hover:shadow-xl"
                : "bg-gray-200 text-gray-400 cursor-not-allowed"
            }`}
          >
            ADD
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header
        title="Payment Reminders"
        rightContent={
          <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
            <svg
              className="w-5 h-5 text-blue-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 17h5l-5 5-5-5h5v-5a7.81 7.81 0 0 0-15 0v5"
              />
            </svg>
          </div>
        }
      />

      <div className="p-4">
        {/* Summary Card */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-6 text-white mb-6">
          <h2 className="text-lg font-semibold mb-2">This Month</h2>
          <div className="flex items-end justify-between">
            <div>
              <p className="text-3xl font-bold">
                ${totalAmountDue.toLocaleString()}
              </p>
              <p className="text-blue-100 text-sm">Total Amount Due</p>
            </div>
            <div className="text-right">
              <p className="text-2xl font-bold">{activeReminders}</p>
              <p className="text-blue-100 text-sm">Reminders Active</p>
            </div>
          </div>
        </div>

        {/* Reminders List */}
        <div className="space-y-4 mb-6">
          {reminders.map((reminder) => (
            <div
              key={reminder.id}
              className="bg-white rounded-2xl p-4 shadow-sm"
            >
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-semibold text-gray-900">{reminder.name}</h3>
                <div className="flex items-center gap-2">
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={reminder.isActive}
                      onChange={() => toggleReminder(reminder.id)}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                  </label>
                  <button
                    onClick={() => deleteReminder(reminder.id)}
                    className="text-gray-400 hover:text-red-500"
                  >
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                      />
                    </svg>
                  </button>
                </div>
              </div>

              <div className="mb-3">
                <p className="text-2xl font-bold text-gray-900">
                  ${reminder.amount}
                </p>
                <p className="text-sm text-gray-600">
                  Pay to: {reminder.payTo}
                </p>
              </div>

              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center">
                  <div className="w-6 h-6 bg-blue-100 rounded-lg flex items-center justify-center mr-2">
                    <svg
                      className="w-3 h-3 text-blue-600"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                      />
                    </svg>
                  </div>
                  <span className="text-sm text-gray-600">
                    {reminder.dueDate}
                  </span>
                </div>
                <button className="px-4 py-2 bg-blue-100 text-blue-700 rounded-lg text-sm font-medium">
                  Schedule
                </button>
              </div>

              {reminder.description && (
                <p className="text-sm text-gray-500">{reminder.description}</p>
              )}
            </div>
          ))}
        </div>

        {/* Add New Reminder Button */}
        <button
          onClick={() => setShowNewReminder(true)}
          className="fixed bottom-8 right-4 w-14 h-14 bg-blue-600 text-white rounded-full shadow-lg hover:shadow-xl transition-all flex items-center justify-center"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 4v16m8-8H4"
            />
          </svg>
        </button>
      </div>
    </div>
  );
}
