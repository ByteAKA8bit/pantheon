import godImage from "@/assets/images/home/god.png";
import { ShareDialog } from "./components/ShareDialog";
import { DonateDialog } from "./components/DonateDialog";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Wallet } from "lucide-react";
import { MessageSquare } from "lucide-react";
import { Facebook } from "lucide-react";
import { Youtube } from "lucide-react";
import { Twitter } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

function Home() {
  const navigate = useNavigate();

  const [PointsList, setPointsList] = useState([
    {
      label: "当前积分A",
      value: 0,
    },
    {
      label: "当前积分B",
      value: 5464646,
    },
  ]);

  const [isShareOpen, setIsShareOpen] = useState(false);
  const [isDonateOpen, setIsDonateOpen] = useState(false);

  const shareButtons = [
    {
      label: "Share to X",
      icon: <Twitter className="h-4 w-4" />,
      onClick: () => {
        window.open("https://twitter.com/intent/tweet", "_blank", "noopener");
        navigate("/chat");
      },
    },
    {
      label: "Share to Telegram",
      onClick: () => {
        window.open("https://t.me/share/url", "_blank", "noopener");
        navigate("/chat");
      },
    },
  ];

  const fetchPoints = async () => {
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 5000); // 5秒超时

      const url = new URL("http://localhost:8080");
      url.pathname = "/api/points";

      const headers = new Headers();
      headers.append("Content-Type", "application/json");

      // 模拟API请求获取积分数据
      const response = await fetch(url, {
        method: "GET",
        headers: headers,
        signal: controller.signal,
        redirect: "follow",
      });

      clearTimeout(timeoutId);

      if (!response.ok) {
        throw new Error("获取积分失败");
      }

      const data = await response.json();

      // 更新积分列表
      setPointsList([
        {
          label: "当前积分A",
          value: data.pointsA || 0,
        },
        {
          label: "当前积分B",
          value: data.pointsB || 0,
        },
      ]);
    } catch (error) {
      console.error("获取积分出错:", error);
    }
  };

  useEffect(() => {
    fetchPoints();
  }, []);

  return (
    <div className="h-[100vh] w-[100vw] flex flex-col flex-1 justify-center items-center bg-zinc-100">
      <header className="flex w-3/5 items-center justify-between p-4">
        <h2 className="text-2xl font-bold">众神殿</h2>
        <div className="flex items-center gap-4">
          <Button variant="ghost" className="hover:bg-zinc-300">
            Whitepaper
          </Button>
          <Button variant="ghost" className="hover:bg-zinc-300">
            Contact Wallet
          </Button>
        </div>
      </header>

      <main className="flex flex-col justify-center items-center flex-1 p-8 w-3/5">
        <div className="w-full flex justify-end p-8 pr-2">
          <div className="flex flex-col gap-4">
            {PointsList.map((item) => (
              <div key={item.label}>
                <div>
                  {item.label}: {item.value}
                </div>
              </div>
            ))}
          </div>
        </div>
        <Card className="w-full h-2/3 rounded-2xl">
          <div className="flex h-full">
            <div className="w-[30%] h-full relative">
              <img
                src={godImage}
                alt="财神"
                className="absolute -left-[25%] -top-[25%] min-w-[140%] h-[140%] object-contain transform scale-x-[-1]"
              />
            </div>
            <div className="w-[70%] p-10">
              <CardHeader>
                <CardTitle className="text-4xl font-bold">财神</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-xl py-8 tracking-wide">
                  世界各地神话中神的形象多姿多彩。古希腊神话里，宙斯是众神之王，掌管雷电，他有着和凡人相似的七情六欲，会嫉妒、发怒，还与诸神、凡人之间产生诸多爱恨纠葛:中国神话体系庞大，盘古开天辟地，以一己之力撑开混沌、分化天地，女娲抟土造人、炼石补天，是庇佑人类的创世、救世女神。
                </p>
              </CardContent>
              <CardFooter className="flex justify-around gap-4">
                <Button
                  className="w-1/3 h-12 text-lg text-black bg-zinc-200 hover:bg-zinc-300"
                  onClick={() => setIsShareOpen(true)}
                >
                  <MessageSquare className="mr-1 h-5 w-5" />
                  分享并开始聊天
                </Button>
                <Button
                  className="w-1/3 h-12 text-lg text-black bg-zinc-200 hover:bg-zinc-300"
                  onClick={() => setIsDonateOpen(true)}
                >
                  <Wallet className="mr-1 h-5 w-5" />
                  上香
                </Button>
              </CardFooter>
            </div>
          </div>
        </Card>
      </main>

      <footer className="p-4 text-center text-sm text-gray-500">
        <div className="flex items-center justify-center gap-4">
          <p>© 2025 Gods,Inc..All rights reserved.Privacy Terms</p>
          <div className="flex gap-1">
            <Button variant="ghost" size="icon">
              <Twitter className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="icon">
              <Facebook className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="icon">
              <Youtube className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </footer>
      <DonateDialog open={isDonateOpen} onOpenChange={setIsDonateOpen} />
      <ShareDialog
        open={isShareOpen}
        onOpenChange={setIsShareOpen}
        shareButtons={shareButtons}
      />
    </div>
  );
}

export default Home;
