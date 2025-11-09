const hre = require("hardhat");
const fs = require("fs");
const path = require("path");

async function main() {
  console.log("🚀 Deploying contracts to local network...\n");

  // Deploy LiquidStakingToken (eETH)
  console.log("📝 Deploying LiquidStakingToken (eETH)...");
  const LiquidStakingToken = await hre.ethers.getContractFactory("LiquidStakingToken");
  const eeth = await LiquidStakingToken.deploy();
  await eeth.waitForDeployment();
  const eethAddress = await eeth.getAddress();
  console.log("✅ LiquidStakingToken deployed to:", eethAddress);

  // Deploy WrappedStakingToken (weETH)
  console.log("\n📝 Deploying WrappedStakingToken (weETH)...");
  const WrappedStakingToken = await hre.ethers.getContractFactory("WrappedStakingToken");
  const weeth = await WrappedStakingToken.deploy(eethAddress);
  await weeth.waitForDeployment();
  const weethAddress = await weeth.getAddress();
  console.log("✅ WrappedStakingToken deployed to:", weethAddress);

  // Deploy StakingLender
  console.log("\n📝 Deploying StakingLender...");
  const StakingLender = await hre.ethers.getContractFactory("StakingLender");
  const lender = await StakingLender.deploy(eethAddress);
  await lender.waitForDeployment();
  const lenderAddress = await lender.getAddress();
  console.log("✅ StakingLender deployed to:", lenderAddress);

  // Fund contracts with ETH for rewards/lending
  console.log("\n💰 Funding contracts with ETH...");
  const [deployer] = await hre.ethers.getSigners();
  
  // Send 10 ETH to eETH contract for staking rewards
  const tx1 = await deployer.sendTransaction({
    to: eethAddress,
    value: hre.ethers.parseEther("10")
  });
  await tx1.wait();
  console.log("✅ Sent 10 ETH to LiquidStakingToken for rewards");

  // Send 20 ETH to lender contract for borrowing
  const tx2 = await deployer.sendTransaction({
    to: lenderAddress,
    value: hre.ethers.parseEther("20")
  });
  await tx2.wait();
  console.log("✅ Sent 20 ETH to StakingLender for loans");

  // Save contract addresses to a file
  const addresses = {
    LiquidStakingToken: eethAddress,
    WrappedStakingToken: weethAddress,
    StakingLender: lenderAddress,
    network: "localhost",
    chainId: 31337
  };

  const addressesPath = path.join(__dirname, "..", "contract-addresses.json");
  fs.writeFileSync(addressesPath, JSON.stringify(addresses, null, 2));
  
  // Also copy to public folder for Next.js
  const publicAddressesPath = path.join(__dirname, "..", "public", "contract-addresses.json");
  fs.writeFileSync(publicAddressesPath, JSON.stringify(addresses, null, 2));
  console.log("\n📄 Contract addresses saved to contract-addresses.json and public/");

  // Save ABIs
  const artifactsPath = path.join(__dirname, "..", "artifacts", "contracts");
  const publicPath = path.join(__dirname, "..", "public", "abis");
  
  if (!fs.existsSync(publicPath)) {
    fs.mkdirSync(publicPath, { recursive: true });
  }

  // Copy ABIs to public folder
  const contracts = [
    "LiquidStakingToken",
    "WrappedStakingToken",
    "StakingLender"
  ];

  contracts.forEach(contractName => {
    const artifactPath = path.join(artifactsPath, `${contractName}.sol`, `${contractName}.json`);
    const destPath = path.join(publicPath, `${contractName}.json`);
    
    if (fs.existsSync(artifactPath)) {
      const artifact = JSON.parse(fs.readFileSync(artifactPath, "utf8"));
      fs.writeFileSync(destPath, JSON.stringify(artifact.abi, null, 2));
    }
  });

  console.log("✅ ABIs copied to public/abis/");

  console.log("\n✨ Deployment complete!");
  console.log("\n📋 Contract Addresses:");
  console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
  console.log("eETH:    ", eethAddress);
  console.log("weETH:   ", weethAddress);
  console.log("Lender:  ", lenderAddress);
  console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
