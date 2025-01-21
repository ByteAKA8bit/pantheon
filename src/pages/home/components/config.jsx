// src/config.jsx
import { createWeb3Modal, defaultWagmiConfig } from '@web3modal/wagmi';
import { mainnet, arbitrum } from 'viem/chains';
import { reconnect } from '@wagmi/core';

const projectId = '5b46b6184d5b73fc68b93478ef5c868a'; // 项目 ID

const metadata = {
  name: 'Web3Modal',
  description: 'Web3Modal Demo',
  // url: 'https://web3modal.com', // 这里的origin必须与你的域名和子域名匹配
  icons: ['https://avatars.githubusercontent.com/u/37784886']
};

const chains = [mainnet, arbitrum];

export const config = defaultWagmiConfig({
  chains,
  projectId,
  metadata,
});

// 自动连接
// reconnect(config);

export const modal = createWeb3Modal({
  wagmiConfig: config,
  projectId,
});
