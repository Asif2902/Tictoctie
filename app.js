const RPC_URL = "https://testnet-rpc.monad.xyz";
const CHAIN_ID = 10143;
const CONTRACT_ADDRESS = "0xa20CDE9315C06B50E72730A05252eC4811c583bc";
const TOKEN_ADDRESS = "0x774453B7A832c83a1BD4adB4ca1e332107432A8f";

const tokenAbi = [
  "function balanceOf(address owner) view returns (uint256)",
  "function approve(address spender, uint256 amount) returns (bool)",
  "function allowance(address owner, address spender) view returns (uint256)",
  "function decimals() view returns (uint8)"
];

const gameAbi = [
    {
        "inputs": [],
        "name": "claimRewards",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "emergencyWithdraw",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "_token",
                "type": "address"
            }
        ],
        "stateMutability": "nonpayable",
        "type": "constructor"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": true,
                "internalType": "address",
                "name": "player",
                "type": "address"
            },
            {
                "indexed": false,
                "internalType": "uint8",
                "name": "position",
                "type": "uint8"
            }
        ],
        "name": "BotMove",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": true,
                "internalType": "address",
                "name": "player",
                "type": "address"
            },
            {
                "indexed": false,
                "internalType": "uint8",
                "name": "outcome",
                "type": "uint8"
            }
        ],
        "name": "GameCompleted",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": true,
                "internalType": "address",
                "name": "player",
                "type": "address"
            },
            {
                "indexed": false,
                "internalType": "uint256",
                "name": "betAmount",
                "type": "uint256"
            }
        ],
        "name": "GameStarted",
        "type": "event"
    },
    {
        "inputs": [
            {
                "internalType": "uint8",
                "name": "_position",
                "type": "uint8"
            }
        ],
        "name": "makeMove",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": true,
                "internalType": "address",
                "name": "player",
                "type": "address"
            },
            {
                "indexed": false,
                "internalType": "uint8",
                "name": "position",
                "type": "uint8"
            }
        ],
        "name": "PlayerMove",
        "type": "event"
    },
    {
        "inputs": [],
        "name": "renounceOwnership",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": true,
                "internalType": "address",
                "name": "player",
                "type": "address"
            },
            {
                "indexed": false,
                "internalType": "uint256",
                "name": "amount",
                "type": "uint256"
            }
        ],
        "name": "RewardClaimed",
        "type": "event"
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "_betAmount",
                "type": "uint256"
            }
        ],
        "name": "startGame",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "newOwner",
                "type": "address"
            }
        ],
        "name": "transferOwnership",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "",
                "type": "address"
            }
        ],
        "name": "activeGames",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "board",
                "type": "uint256"
            },
            {
                "internalType": "uint256",
                "name": "betAmount",
                "type": "uint256"
            },
            {
                "internalType": "bool",
                "name": "botMakesMistake",
                "type": "bool"
            },
            {
                "internalType": "bool",
                "name": "isActive",
                "type": "bool"
            },
            {
                "internalType": "uint8",
                "name": "outcome",
                "type": "uint8"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "gameToken",
        "outputs": [
            {
                "internalType": "address",
                "name": "",
                "type": "address"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "",
                "type": "address"
            },
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "name": "matchHistory",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "timestamp",
                "type": "uint256"
            },
            {
                "internalType": "uint256",
                "name": "betAmount",
                "type": "uint256"
            },
            {
                "internalType": "uint8",
                "name": "outcome",
                "type": "uint8"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "owner",
        "outputs": [
            {
                "internalType": "address",
                "name": "",
                "type": "address"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "",
                "type": "address"
            }
        ],
        "name": "pendingRewards",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    }
]; 
let provider, signer, userAddress;
let tokenContract, gameContract;
let tokenDecimals = 18;


const connectWalletBtn = document.getElementById("connectWalletBtn");
const userAddressSpan = document.getElementById("userAddress");
const tokenBalanceEl = document.getElementById("tokenBalance");
const betAmountInput = document.getElementById("betAmount");
const approveBtn = document.getElementById("approveBtn");
const startGameBtn = document.getElementById("startGameBtn");
const boardEl = document.getElementById("board");
const gameStatusEl = document.getElementById("gameStatus");
const claimRewardsBtn = document.getElementById("claimRewardsBtn");
const matchHistoryEl = document.getElementById("matchHistory");
const modal = document.getElementById("modal");
const modalMessage = document.getElementById("modalMessage");
const modalCloseBtn = document.getElementById("modalCloseBtn");

let gameEventsSubscribed = false;

async function updateGameState() {
  try {
    const gameData = await gameContract.activeGames(userAddress);
    const boardValue = gameData.board.toNumber();
    const isActive = gameData.isActive;
    const outcome = gameData.outcome;

    // Update board
    const boardArr = decodeBoard(boardValue);
    document.querySelectorAll(".cell").forEach((cell, index) => {
      cell.innerHTML = boardArr[index] === "X" ? 
        '<span class="symbol x-symbol">X</span>' :
        boardArr[index] === "O" ? 
        '<span class="symbol o-symbol">O</span>' : 
        "";
    });

    // Update game status
    if (!isActive) {
      gameStatusEl.textContent = 
        outcome === 1 ? "You Win!" :
        outcome === 2 ? "You Lose!" :
        "Draw!";
      claimRewardsBtn.style.display = "inline-block";
    } else {
      gameStatusEl.textContent = "Your turn";
      claimRewardsBtn.style.display = "none";
    }
  } catch (error) {
    console.error("Game state error:", error);
  }
}

// Helper functions for cookies
function setCookie(name, value, days) {
  let expires = "";
  if (days) {
    const date = new Date();
    date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
    expires = "; expires=" + date.toUTCString();
  }
  document.cookie = name + "=" + (value || "") + expires + "; path=/";
}

function getCookie(name) {
  const nameEQ = name + "=";
  const ca = document.cookie.split(';');
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) === ' ') c = c.substring(1, c.length);
    if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
  }
  return null;
}

async function loadMatchHistory() {
  try {
    showModal("Loading history...");

    // Load any stored history from cookies (if available)
    let storedHistory = [];
    const historyCookie = getCookie("matchHistory");
    if (historyCookie) {
      try {
        storedHistory = JSON.parse(historyCookie);
      } catch (e) {
        console.error("Error parsing cookie:", e);
      }
    }

    // Determine the last block number stored so we only query for new events.
    let lastStoredBlock = 0;
    if (storedHistory.length > 0) {
      lastStoredBlock = Math.max(...storedHistory.map(item => item.blockNumber));
    }

    const currentBlock = await provider.getBlockNumber();
    const filter = gameContract.filters.GameCompleted(userAddress);

    let events = [];
    const chunkSize = 100;
    // If no history is stored, go back 1000 blocks; otherwise start at the next block
    const startQueryBlock = lastStoredBlock > 0 ? lastStoredBlock + 1 : Math.max(currentBlock - 1000, 0);
    for (let startBlock = startQueryBlock; startBlock < currentBlock; startBlock += chunkSize) {
      const endBlock = Math.min(startBlock + chunkSize, currentBlock);
      const chunkEvents = await gameContract.queryFilter(filter, startBlock, endBlock);
      events.push(...chunkEvents);
    }

    // Process new events into a simplified history item format
    const newHistoryItems = await Promise.all(
      events.map(async (event) => {
        const block = await provider.getBlock(event.blockNumber);
        const outcome = event.args.outcome;
        const result = ["Win", "Loss", "Draw"][outcome - 1];
        // Note: Adjust the multiplier for block.timestamp if necessary (typically *1000)
        const timestamp = new Date(block.timestamp * 100).toLocaleString();
        return {
          blockNumber: event.blockNumber,
          timestamp,
          result,
          outcome
        };
      })
    );

    // Merge the newly fetched history with what was stored, avoiding duplicates
    let combinedHistory = storedHistory.concat(newHistoryItems);
    combinedHistory = combinedHistory.reduce((acc, curr) => {
      if (!acc.some(item => item.blockNumber === curr.blockNumber)) {
        acc.push(curr);
      }
      return acc;
    }, []);

    // Sort history so that the most recent match (largest blockNumber) comes first
    combinedHistory.sort((a, b) => b.blockNumber - a.blockNumber);

    // Save the updated history back into the cookie (expires in 7 days)
    setCookie("matchHistory", JSON.stringify(combinedHistory), 7);

    // Update the UI
    if (combinedHistory.length === 0) {
      matchHistoryEl.innerHTML = `<li class="text-center">No match history found</li>`;
    } else {
      const historyHTML = combinedHistory.map(item => {
        return `<li class="history-item">
          <span class="timestamp">${item.timestamp}</span>
          <span class="result ${item.result.toLowerCase()}">${item.result}</span>
        </li>`;
      }).join("");
      matchHistoryEl.innerHTML = historyHTML;
    }

    hideModal();
  } catch (error) {
    hideModal();
    console.error("History load error:", error);
    matchHistoryEl.innerHTML = `<li class="error">Error loading history</li>`;
  }
}

function decodeBoard(boardValue) {
  const boardArr = [];
  for (let i = 0; i < 9; i++) {
    const cell = (boardValue >> (i * 2)) & 3;
    boardArr.push(cell === 1 ? "X" : cell === 2 ? "O" : "");
  }
  return boardArr;
}

async function connectWallet() {
  if (!window.ethereum) return alert("Install MetaMask!");
  
  try {
    await window.ethereum.request({ method: "eth_requestAccounts" });
    provider = new ethers.providers.Web3Provider(window.ethereum);
    signer = provider.getSigner();
    userAddress = await signer.getAddress();

    // Network check and switch
    let network = await provider.getNetwork();
    if (network.chainId !== CHAIN_ID) {
      try {
        await window.ethereum.request({
          method: "wallet_switchEthereumChain",
          params: [{ chainId: ethers.utils.hexValue(CHAIN_ID) }],
        });
        // Re-check the network after switching
        network = await provider.getNetwork();
        if (network.chainId !== CHAIN_ID) {
          throw new Error("Network switch failed");
        }
      } catch (switchError) {
        // If the chain hasn't been added to MetaMask, error code 4902 will be returned
        if (switchError.code === 4902) {
          try {
            await window.ethereum.request({
              method: "wallet_addEthereumChain",
              params: [{
                chainId: ethers.utils.hexValue(CHAIN_ID),
                chainName: "Monad Testnet",
                rpcUrls: [RPC_URL],
                nativeCurrency: {
                  name: "Mon",
                  symbol: "Mon",
                  decimals: 18,
                },
                blockExplorerUrls: ["https://testnet-explorer.monad.xyz"],
              }],
            });
          } catch (addError) {
            console.error("Error adding chain:", addError);
            return alert("Please add the correct network to your wallet.");
          }
        } else {
          console.error("Error switching chain:", switchError);
          return alert("Please switch to the correct network.");
        }
      }
    }

    // Initialize contracts
    tokenContract = new ethers.Contract(TOKEN_ADDRESS, tokenAbi, signer);
    gameContract = new ethers.Contract(CONTRACT_ADDRESS, gameAbi, signer);
    tokenDecimals = await tokenContract.decimals();

    // UI updates
    userAddressSpan.textContent = `Connected: ${userAddress.slice(0, 6)}...${userAddress.slice(-4)}`;
    connectWalletBtn.style.display = "none";
    
    await updateTokenBalance();
    await loadMatchHistory();
    listenToGameEvents();
  } catch (error) {
    console.error("Wallet connection failed:", error);
    alert(`Connection error: ${error.message}`);
  }
}

async function updateTokenBalance() {
  try {
    const balance = await tokenContract.balanceOf(userAddress);
    tokenBalanceEl.textContent = `${ethers.utils.formatUnits(balance,
    tokenDecimals)} StakeR  Token`;
  } catch (error) {
    console.error("Balance update error:", error);
  }
}

async function approveTokens() {
  const betValue = betAmountInput.value;
  if (!betValue || betValue <= 0) return alert("Invalid bet amount");
  
  try {
    showModal("Approving tokens...");
    const amount = ethers.utils.parseUnits(betValue, tokenDecimals);
    const tx = await tokenContract.approve(CONTRACT_ADDRESS, amount);
    await tx.wait();
    hideModal();
    alert("Approval successful!");
  } catch (error) {
    hideModal();
    console.error("Approval failed:", error);
    alert(`Approval failed: ${error.reason || error.message}`);
  }
}

async function startGame() {
  const betValue = betAmountInput.value;
  if (!betValue || betValue <= 0) return alert("Invalid bet amount");
  
  try {
    showModal("Starting game...");
    const amount = ethers.utils.parseUnits(betValue, tokenDecimals);
    
    // Check allowance
    const allowance = await tokenContract.allowance(userAddress, CONTRACT_ADDRESS);
    if (allowance.lt(amount)) {
      hideModal();
      return alert("Approve tokens first!");
    }

    const tx = await gameContract.startGame(amount);
    await tx.wait();
    resetBoard();
    await updateGameState();
    hideModal();
  } catch (error) {
    hideModal();
    console.error("Game start failed:", error);
    alert(`Game start failed: ${error.reason || error.message}`);
  }
}

async function playerMove(cellIndex) {
  if (gameStatusEl.textContent !== "Your turn") return;
  
  try {
    showModal("Processing move...");
    const tx = await gameContract.makeMove(parseInt(cellIndex));
    await tx.wait();
    await updateGameState();
    hideModal();
  } catch (error) {
    hideModal();
    console.error("Move failed:", error);
    alert(`Move failed: ${error.reason || error.message}`);
  }
}

function resetBoard() {
  document.querySelectorAll(".cell").forEach(cell => cell.innerHTML = "");
  gameStatusEl.textContent = "";
}

async function claimRewards() {
  try {
    showModal("Claiming rewards...");
    const tx = await gameContract.claimRewards();
    await tx.wait();
    await updateTokenBalance();
    hideModal();
    alert("Rewards claimed!");
  } catch (error) {
    hideModal();
    console.error("Claim failed:", error);
    alert(`Claim failed: ${error.reason || error.message}`);
  }
}

function listenToGameEvents() {
  if (gameEventsSubscribed) return;

  // Bot move listener
  gameContract.on("BotMove", async (player) => {
    if (player.toLowerCase() === userAddress.toLowerCase()) {
      await updateGameState();
    }
  });

  // Game completion listener
  gameContract.on("GameCompleted", async (player) => {
    if (player.toLowerCase() === userAddress.toLowerCase()) {
      await updateGameState();
      await loadMatchHistory();
    }
  });

  gameEventsSubscribed = true;
}

// ===========================
// UI Helpers
// ===========================
function showModal(message) {
  modalMessage.textContent = message;
  modal.classList.remove("hidden");
}

function hideModal() {
  modal.classList.add("hidden");
}

// ===========================
// Event Listeners
// ===========================
connectWalletBtn.addEventListener("click", connectWallet);
approveBtn.addEventListener("click", approveTokens);
startGameBtn.addEventListener("click", startGame);
claimRewardsBtn.addEventListener("click", claimRewards);
modalCloseBtn.addEventListener("click", hideModal);

document.querySelectorAll(".cell").forEach(cell => {
  cell.addEventListener("click", () => {
    const index = cell.getAttribute("data-index");
    if (!cell.innerHTML.trim()) playerMove(index);
  });
});

// Auto-refresh
setInterval(() => {
  if (userAddress) {
    updateGameState();
    updateTokenBalance();
  }
}, 5000);
