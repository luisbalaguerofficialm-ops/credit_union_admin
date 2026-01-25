import React, { useState, useEffect, useRef } from "react";
import { Search, Send, Paperclip, Menu, Loader2, Check } from "lucide-react";
import { toast } from "react-toastify";
import { io } from "socket.io-client";

const API_URL = "https://admin-credit-union.onrender.com/api";
const SOCKET_URL = "https://admin-credit-union.onrender.com";

const LiveChats = () => {
  const [chats, setChats] = useState([]);
  const [activeChat, setActiveChat] = useState(null);
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");
  const [showSidebar, setShowSidebar] = useState(false);
  const [loading, setLoading] = useState(false);
  const [sending, setSending] = useState(false);
  const [socket, setSocket] = useState(null);
  const token = localStorage.getItem("adminToken");

  const messagesEndRef = useRef(null);

  // Initialize Socket.IO connection
  useEffect(() => {
    if (!token) return;

    const socketInstance = io(SOCKET_URL, {
      auth: { token },
      reconnection: true,
    });

    socketInstance.on("connect", () => {
      console.log("Socket connected");
    });

    socketInstance.on("disconnect", () => {
      console.log("Socket disconnected");
    });

    setSocket(socketInstance);

    return () => socketInstance.disconnect();
  }, [token]);

  // Fetch chats
  const fetchChats = async () => {
    if (!token) return;
    setLoading(true);
    try {
      const res = await fetch(`${API_URL}/admin/chats`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      if (data.success) {
        setChats(data.chats || []);
        if (!activeChat && data.chats?.length > 0) setActiveChat(data.chats[0]);
      } else {
        toast.error(data.message || "Failed to fetch chats");
      }
    } catch (err) {
      toast.error("Error fetching chats");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // Fetch messages for active chat
  const fetchMessages = async (chatId) => {
    if (!token || !chatId) return;
    try {
      const res = await fetch(`${API_URL}/admin/chats/${chatId}/messages`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      if (data.success) {
        setMessages(data.messages || []);
      }
    } catch (err) {
      console.error("Failed to fetch messages:", err);
    }
  };

  useEffect(() => {
    fetchChats();
  }, [token]);

  useEffect(() => {
    if (activeChat) {
      fetchMessages(activeChat._id);
    }
  }, [activeChat, token]);

  // Listen for incoming messages
  useEffect(() => {
    if (!socket) return;

    socket.on("receiveMessage", ({ chatId, message: newMsg }) => {
      if (activeChat && activeChat._id === chatId) {
        setMessages((prev) => [...prev, newMsg]);
      }
      fetchChats(); // update chat queue
    });

    return () => socket.off("receiveMessage");
  }, [socket, activeChat]);

  // Scroll to bottom on new message
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSendMessage = async () => {
    if (!message.trim() || !activeChat || !token) return;

    setSending(true);
    try {
      const res = await fetch(
        `${API_URL}/admin/chats/${activeChat._id}/messages`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            content: message,
            sender: "Agent",
          }),
        },
      );

      const data = await res.json();
      if (data.success) {
        const newMessage = data.message || {
          content: message,
          sender: "Agent",
        };
        setMessages((prev) => [...prev, newMessage]);

        // Emit via Socket.IO
        if (socket) {
          socket.emit("sendMessage", {
            chatId: activeChat._id,
            message: newMessage,
          });
        }

        setMessage("");
      } else {
        toast.error(data.message || "Failed to send message");
      }
    } catch (err) {
      toast.error("Error sending message");
      console.error(err);
    } finally {
      setSending(false);
    }
  };

  return (
    <div className="w-full min-h-screen text-left bg-gray-50 p-4 md:p-6">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-xl md:text-2xl font-semibold">Live Chats</h1>
        <p className="text-gray-500 text-sm">
          Manage real-time customer conversations
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
        {/* Mobile Toggle */}
        <button
          onClick={() => setShowSidebar(!showSidebar)}
          className="md:hidden flex items-center gap-2 bg-white border rounded-lg px-4 py-2"
        >
          <Menu size={18} /> Chat Queue
        </button>

        {/* Chat Queue */}
        <div
          className={`${
            showSidebar ? "block" : "hidden"
          } md:block col-span-4 lg:col-span-3 bg-white rounded-xl shadow h-[70vh] overflow-y-auto`}
        >
          <div className="p-4 border-b sticky top-0 bg-white z-10">
            <h3 className="font-semibold">Live Chat Queue</h3>
            <p className="text-xs text-gray-500">
              {chats.length} active conversations
            </p>
          </div>

          {loading ? (
            <div className="flex items-center justify-center h-32">
              <Loader2 className="animate-spin text-gray-400" size={24} />
            </div>
          ) : chats.length === 0 ? (
            <div className="p-6 text-center text-gray-500 text-sm">
              No active chats
            </div>
          ) : (
            chats.map((chat) => (
              <div
                key={chat._id}
                onClick={() => {
                  setActiveChat(chat);
                  setShowSidebar(false);
                }}
                className={`p-4 cursor-pointer hover:bg-gray-50 border-b transition ${
                  activeChat?._id === chat._id
                    ? "bg-blue-50 border-blue-200"
                    : ""
                }`}
              >
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <span
                      className={`h-2.5 w-2.5 rounded-full ${
                        chat.user?.online ? "bg-green-500" : "bg-gray-400"
                      }`}
                    />
                    <p className="font-medium text-sm">
                      {chat.user?.name || "User"}
                    </p>
                  </div>

                  <span
                    className={`text-xs px-2 py-1 rounded-full font-medium ${
                      chat.status === "Active"
                        ? "bg-green-100 text-green-600"
                        : "bg-yellow-100 text-yellow-600"
                    }`}
                  >
                    {chat.status || "Pending"}
                  </span>
                </div>

                <p className="text-xs text-gray-500 truncate mt-1">
                  {chat.messages?.[chat.messages.length - 1]?.content ||
                    "No messages yet"}
                </p>
                <p className="text-xs text-gray-400 mt-1">
                  Assigned to: {chat.assignedTo || "Unassigned"}
                </p>
              </div>
            ))
          )}
        </div>

        {/* Chat Window */}
        <div className="col-span-8 lg:col-span-9 bg-white rounded-xl shadow flex flex-col h-[70vh] md:h-[75vh]">
          {activeChat ? (
            <>
              {/* Chat Header */}
              <div className="p-4 border-b flex justify-between items-center bg-gray-50">
                <div className="flex items-center gap-2">
                  <span
                    className={`h-2.5 w-2.5 rounded-full ${
                      activeChat.user?.online ? "bg-green-500" : "bg-gray-400"
                    }`}
                  />
                  <div>
                    <p className="font-semibold text-sm md:text-base">
                      {activeChat.user?.name || "User"}
                    </p>
                    <p className="text-xs text-gray-500">
                      {activeChat.user?.online ? "Online" : "Offline"}
                    </p>
                  </div>
                </div>

                <div className="hidden md:flex gap-3">
                  <button className="px-4 py-2 border rounded-lg text-sm hover:bg-gray-100 transition">
                    Assign
                  </button>
                  <button className="px-4 py-2 bg-green-600 text-white rounded-lg text-sm hover:bg-green-700 transition">
                    Mark Solved
                  </button>
                </div>
              </div>

              {/* Messages */}
              <div className="flex-1 p-4 md:p-6 space-y-4 overflow-y-auto bg-gray-50">
                {messages.length === 0 ? (
                  <div className="flex items-center justify-center h-full text-gray-500 text-sm">
                    No messages yet. Start the conversation.
                  </div>
                ) : (
                  messages.map((msg, idx) => (
                    <div
                      key={idx}
                      className={`max-w-[80%] p-3 rounded-lg text-sm ${
                        msg.sender === "Agent"
                          ? "ml-auto bg-[#006A91] text-white"
                          : "bg-gray-200 text-gray-800"
                      }`}
                    >
                      {msg.content}
                      <p
                        className={`text-xs mt-1 ${
                          msg.sender === "Agent"
                            ? "text-blue-200"
                            : "text-gray-500"
                        }`}
                      >
                        {msg.timestamp
                          ? new Date(msg.timestamp).toLocaleTimeString()
                          : "just now"}
                      </p>
                    </div>
                  ))
                )}
                <div ref={messagesEndRef} />
              </div>

              {/* Input */}
              <div className="p-3 md:p-4 flex items-center gap-3 border-t bg-white">
                <Paperclip
                  className="text-gray-400 cursor-pointer hover:text-gray-600"
                  size={20}
                />
                <input
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  onKeyDown={(e) =>
                    e.key === "Enter" && !e.shiftKey && handleSendMessage()
                  }
                  disabled={sending}
                  placeholder="Type your message..."
                  className="flex-1 border rounded-lg px-4 py-2 outline-none text-sm disabled:bg-gray-100"
                />
                <button
                  disabled={sending || !message.trim()}
                  onClick={handleSendMessage}
                  className="bg-[#006A91] p-3 rounded-lg text-white hover:bg-[#005078] disabled:opacity-50 transition"
                >
                  {sending ? (
                    <Loader2 size={18} className="animate-spin" />
                  ) : (
                    <Send size={18} />
                  )}
                </button>
              </div>
            </>
          ) : (
            <div className="flex items-center justify-center h-full text-gray-500 text-sm">
              Select a chat to start messaging
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default LiveChats;
