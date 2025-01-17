import { Button } from "@/components/ui/button";
import { useEffect } from "react";
import { useState } from "react";
import { useRef } from "react";

function Chat() {
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async () => {
    if (!inputValue.trim()) return;
    setIsLoading(true);
    const newMessage = {
      role: "user",
      content: inputValue,
    };
    const currentHistory = [...messages, newMessage];
    setMessages(currentHistory);
    setInputValue("");

    // 这里添加调用API的逻辑
    try {
      const abortController = new AbortController();
      const timeoutId = setTimeout(() => abortController.abort(), 60000);

      const url = new URL("http://localhost:8000/chat");

      const raw = { history: currentHistory, content: inputValue };

      const response = await fetch(url, {
        method: "POST",
        body: JSON.stringify(raw),
        signal: abortController.signal,
      });

      clearTimeout(timeoutId);

      if (!response.ok) {
        console.log("API请求失败");
        return;
      }

      const res = await response.json();

      if (res.code === 0) {
        const history = [...currentHistory, res.data];
        setMessages(history);
      }
    } catch (error) {
      console.error("发送消息失败:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="h-screen w-screen flex justify-center bg-zinc-100">
      <div className="w-3/4 flex flex-col h-full">
        <div className="flex-1 overflow-y-auto p-4 [&::-webkit-scrollbar]:hidden">
          <div className="flex flex-col items-center mb-8">
            <div className="w-40 h-40 rounded-full bg-zinc-300 mb-4" />
            <div className="text-4xl font-bold mb-4">财神</div>
            <div className="text-sm text-zinc-500">
              I&apos;m your customer support, ready to answeryour questions
            </div>
          </div>
          {messages.map((message, index) => (
            <div
              key={index}
              className={`flex items-start gap-2 ${
                message.role === "user" ? "flex-row-reverse" : "flex-row"
              } mb-4`}
            >
              <div
                className={`w-20 h-20 rounded-full  ${
                  message.role === "user" ? "bg-blue-300" : "bg-zinc-300"
                }`}
              />
              <div
                className={`max-w-[70%] rounded-xl text-lg p-6 ${
                  message.role === "user"
                    ? "bg-blue-500 text-white"
                    : "bg-white text-black"
                }`}
              >
                {message.content}
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>

        <div className=" p-4 flex gap-2 items-center">
          <div className="flex pl-4 gap-2 w-full bg-white rounded-xl">
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && handleSend()}
              placeholder="输入消息..."
              className="h-20 text-lg flex-1 p-2 rounded-lg bg-white focus:outline-none"
            />
            <Button
              onClick={handleSend}
              variant="ghost"
              className="px-10 h-20 text-xl text-zinc-800 rounded-lg hover:bg-zinc-200"
              disabled={isLoading || !inputValue.trim()}
            >
              {isLoading ? "发送中..." : "发送"}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Chat;
