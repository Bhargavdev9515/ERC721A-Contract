const {expect} = require("chai")
const {ethers}= require("hardhat")

describe("ERC721A Testsuite",function(){

    let user1, user2, Nft;

  before("Deploy NFT Contract", async()=>{
    [user1, user2]= await ethers.getSigners();
    const token= await ethers.getContractFactory("SampleERC721");
    Nft= await token.deploy()
  })

  it("Minting NFTs", async function(){
    await Nft.connect(user1).mintTokens(user1.address,10);
    expect(await Nft.balanceOf(user1.address)).to.equal(10)
    expect(await Nft.totalSupply()).to.equal(10);
  })

  it("TransferNFTs", async function(){
    await Nft.connect(user1).transferFrom(user1.address, user2.address,1);
    expect(await Nft.balanceOf(user1.address)).to.equal(9)
    expect(await Nft.balanceOf(user2.address)).to.equal(1)
  })

  it("Transfer Approval", async function(){
    await Nft.connect(user1).approve(user2.address,2);
    await Nft.connect(user2).transferFrom(user1.address, user2.address,2);
    expect(await Nft.balanceOf(user1.address)).to.equal(8)
    expect(await Nft.balanceOf(user2.address)).to.equal(2)
  })


})