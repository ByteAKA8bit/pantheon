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
import { modal, config } from './components/config';
import { useConnect, useAccount } from 'wagmi'
// import { getAccount } from 'wagmi'

import { reconnect } from '@wagmi/core';

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

  const { address, isConnected } = useAccount(); // 钱包地址
  const [myAddress, setMyAddress] = useState(null);
  const [token, setToken] = useState(null);
  
  reconnect(config);

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
  
    // const account = getAccount(modal)
    const storedAddress = localStorage.getItem('address');
    if (storedAddress) {
      // 你可以在这里执行其他操作，比如保存到本地存储或发送请求
      console.log('fetchPoints Loaded address from local storage:', storedAddress);
      // 如果你只是使用 useState，你可以直接更新状态
      setMyAddress(storedAddress)
    } else {
      console.log('No address found in local storage');
    }
    // console.log('----fetchPoints---', myAddress, storedAddress)
    console.log('----getIsConnected()---', address, myAddress, modal.getIsConnected())
    console.log('----getAddress()---', modal.getAddress())
    
    if (!address && !storedAddress) {
      // 如果 address 没有值，设置积分列表为默认值
      setPointsList([
        { label: "当前积分A", value: 0 },
        { label: "当前积分B", value: 0 }
      ]);
      return;
    }
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 5000); // 5秒超时

      const url = new URL("http://127.0.0.1:9900");
      url.pathname = "/v1/login";

      const headers = new Headers();
      headers.append("Content-Type", "application/json");
      // 请求体数据
      const requestBody = {
        account: storedAddress || address, // 
      };
      // 模拟API请求获取积分数据
      const response = await fetch(url, {
        method: "POST",
        headers: headers,
        signal: controller.signal,
        redirect: "follow",
        body: JSON.stringify(requestBody), // 将请求体数据转换为 JSON 字符串
      });
      console.log('----response---', response)
      clearTimeout(timeoutId);

      if (!response.ok) {
        throw new Error("获取积分失败");
      }

      const data = await response.json();
      console.log('----response--data-', data)
      setToken(data.data.token);
      localStorage.setItem('token', data.data.token);
      // 更新积分列表
      setPointsList([
        {
          label: "当前积分A",
          value: data.data.scoreA || 0,
        },
        {
          label: "当前积分B",
          value: data.data.scoreB || 0,
        },
      ]);
    } catch (error) {
      console.error("获取积分出错:", error);
    }
  };

  const onAddressChange = async () => {
    console.log('onAddressChange:', address, isConnected);
    if (address) {
      // 当 address 有值时执行的操作
      // console.log('Address is available:', address, isConnected);
      // 你可以在这里执行其他操作，比如保存到本地存储或发送请求
      localStorage.setItem('address', address);
      setMyAddress(address);
    } else{
      setMyAddress(null);
    }
    
    await fetchPoints();
  };

  useEffect(() => {
    onAddressChange();
  }, [address, isConnected]);

  // useEffect(() => {
  //   fetchPoints();
  // }, [])

  // 连接钱包
  const connectWallet = async () => {
    console.log('----connectWallet---', isConnected, modal.getIsConnected())
    console.log('----account---', isConnected, modal.getAddress())
    try {
      // 打开钱包模态框
      await modal.open().catch(error => {
        console.error('Failed to open wallet modal:', error);
        throw error; // 继续抛出错误以触发外层 catch
      });
      // console.log('----getAddress---', modal.getAddress())
      // localStorage.setItem('address', modal.getAddress());
      // localStorage.setItem('isConnected', true);
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
           
          </div>
          {myAddress &&  <label id="address" className="block mt-2">
            Address: {myAddress}
          </label>}
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
