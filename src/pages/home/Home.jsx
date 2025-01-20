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
// 
import { modal } from './components/config';
import { useConnect, useAccount } from 'wagmi'

function Home() {
  const navigate = useNavigate();

  const [PointsList, setPointsList] = useState([
    {
      label: "当前积分A",
      value: 0,
    },
    {
      label: "当前积分B",
      value: 0,
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

  // 连接钱包
  const { address } = useAccount()
  const connectWallet = async () => {
    console.log('----connectWallet---')
    try {
      // 打开钱包模态框
      await modal.open().catch(error => {
        console.error('Failed to open wallet modal:', error);
        throw error; // 继续抛出错误以触发外层 catch
      });
      setAddress(modal.address);
    } catch (error) {
      console.error('Wallet connection failed:', error);
    }
  };

  return (
    
    <div className="flex flex-col min-h-screen flex-1 justify-between items-center bg-zinc-100">
      <header className="flex h-[70px] w-3/5">
        <div className="flex w-full items-center justify-between">
          <h2 className="text-2xl font-bold">众神殿</h2>
          <div className="flex items-center gap-4">
            <Button variant="ghost" className="hover:bg-zinc-300">
              Whitepaper
            </Button>
            <Button variant="ghost" className="hover:bg-zinc-300" onClick={connectWallet}>
              Contact Wallet
            </Button>
            <div id="address">Address: {address}</div>
          </div>
        </div>
      </header>

      <main className="flex w-3/5 h-[calc(100vh-140px)] flex-col justify-center items-center flex-1 p-4">
        <div>
          <div className="w-full flex justify-end p-4 pr-2">
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
          <Card className="w-full max-h-[500px] flex-1 rounded-2xl">
            <div className="flex">
              <div className="w-[30%] relative">
                <img
                  src={godImage}
                  alt="财神"
                  className={`absolute -left-[40%] -top-[25%] min-w-[100%] h-[140%] max-h-[600px] max-w-[420px] object-contain transform scale-x-[-1]`}
                />
              </div>
              <div className="w-[70%] p-8">
                <CardHeader>
                  <CardTitle className="text-4xl font-bold">财神</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-xl py-6 tracking-wid6">
                    世界各地神话中神的形象多姿多彩。古希腊神话里，宙斯是众神之王，掌管雷电，他有着和凡人相似的七情六欲，会嫉妒、发怒，还与诸神、凡人之间产生诸多爱恨纠葛:中国神话体系庞大，盘古开天辟地，以一己之力撑开混沌、分化天地，女娲抟土造人、炼石补天，是庇佑人类的创世、救世女神。
                  </p>
                </CardContent>
                <CardFooter className="flex justify-around gap-4">
                  <Button
                    className="w-[200px] h-12 text-lg text-black bg-zinc-200 hover:bg-zinc-300"
                    onClick={() => setIsShareOpen(true)}
                  >
                    <MessageSquare className="mr-1 h-5 w-5" />
                    分享并开始聊天
                  </Button>
                  <Button
                    className="w-[200px] h-12 text-lg text-black bg-zinc-200 hover:bg-zinc-300"
                    onClick={() => setIsDonateOpen(true)}
                  >
                    <Wallet className="mr-1 h-5 w-5" />
                    上香
                  </Button>
                </CardFooter>
              </div>
            </div>
          </Card>
        </div>
      </main>

      <footer className="h-[70px] text-center text-sm text-gray-500">
        <div className="flex items-center justify-center gap-4 p-4">
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
