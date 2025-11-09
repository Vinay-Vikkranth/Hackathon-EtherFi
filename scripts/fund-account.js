const hre = require("hardhat");

async function main() {
  console.log("🎁 Sending test ETH to your MetaMask account...\n");

  // Get the first test account (has 10,000 ETH)
  const [funder] = await hre.ethers.getSigners();
  
  // Your MetaMask account address - will be properly checksummed
  const rawAddress = "0x9b6492f0e66614f461ef865749577fb757e852a3";
  const yourAddress = hre.ethers.getAddress(rawAddress.toLowerCase());
  
  console.log(`Sending from: ${funder.address}`);
  console.log(`Sending to: ${yourAddress}`);
  console.log(`Amount: 100 ETH\n`);
  
  const tx = await funder.sendTransaction({
    to: yourAddress,
    value: hre.ethers.parseEther("100")
  });
  
  await tx.wait();
  
  console.log("✅ Success! 100 ETH sent to your account!");
  console.log(`Transaction hash: ${tx.hash}\n`);
  
  // Check balance
  const balance = await hre.ethers.provider.getBalance(yourAddress);
  console.log(`Your new balance: ${hre.ethers.formatEther(balance)} ETH`);
  console.log("\n🎉 You can now stake on the app! Refresh the page to see your balance.");
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
