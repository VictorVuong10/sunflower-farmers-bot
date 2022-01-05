import { ethers } from "hardhat";

import { FarmV2__factory, TokenV2__factory } from "../typechain-types";
import moment from "moment";
import { EventStruct } from "../typechain-types/FarmV2";
import axios from "axios";

function delay(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function main() {
  let signers = await ethers.getSigners();
  let signerIndex = parseInt(process.env.WALLET || "1") - 1;
  let gwei = parseInt(process.env.GWEI || "80");
  let fruits = parseInt(process.env.FRUIT || "5");
  let signer = signers[signerIndex];
  let signerAddress = signer.address;

  while (true) {
    let farm_v2 = FarmV2__factory.connect(
      "0x6e5fa679211d7f6b54e14e187d34ba547c5d3fe0",
      signer
    );
    let sff = TokenV2__factory.connect(
      "0xdf9b4b57865b403e08c85568442f95c26b7896b0",
      signer
    );

    console.log(signerIndex + 1, signers[signerIndex].address);
    console.log(moment().format());

    console.log(
      ethers.utils.formatEther(await sff.balanceOf(signerAddress)),
      "SFF"
    );

    console.log("===== Lands =====");
    let farm = await farm_v2.getFarm(signerAddress);
    for (const [i, place] of farm.entries()) {
      console.log(
        i,
        place.fruit,
        moment.unix(place.createdAt.toNumber()).format()
      );
    }

    let lastHarvest = Math.max(
      ...farm.map((event) => event.createdAt.toNumber())
    );
    let now = moment.utc().unix();
    let diff = now - lastHarvest;
    
    let time_fruit = 0

    if(fruits == 1){
      time_fruit = 60;
    } else if(fruits == 2){
      time_fruit = 60 * 5;
    } else if(fruits == 3){
      time_fruit = 60 * 60;
    } else if(fruits == 4){
      time_fruit = 60 * 240;
    } else if(fruits == 5){
      time_fruit = 60 * 480;
    } else if(fruits == 6){
      time_fruit = 60 * 1440;
    } else if(fruits == 7){
      time_fruit = 60 * 4320;
    } 

    if (diff < time_fruit) {
      console.log("Next farming: ", time_fruit - diff, "s later");
      await delay(time_fruit - diff + 5);
      continue;
    }

    let events: EventStruct[] = [];
    for (const [index, slot] of farm.entries()) {
      if (slot.fruit == 0) {
          events.push({
              action: 0,
              createdAt: now,
              fruit: fruits,
              landIndex: index,
          });
      } else if (slot.fruit != fruits) {
          events.push({
              action: 1,
              createdAt: now,
              fruit: slot.fruit,
              landIndex: index,
          });
          events.push({
              action: 0,
              createdAt: now,
              fruit: fruits,
              landIndex: index,
          });
      }
  }

    console.log("===== Gas =====");
    interface GasStation {
      safeLow: number,
      standard: number,
      fast: number,
      fastest: number,
      blockTime: string,
      blockNumber: string
    }

    let gasStation: GasStation;
    try {
      const { data } = await axios.get("https://gasstation-mainnet.matic.network/");
      gasStation = data;
    } catch (error) {
      console.log(error);
      await delay(1000 * 90);
      continue;
    }

    if (gasStation.standard > gwei) {
      console.log("Gas price is too high!");
      await delay(1000 * 90);
      continue;
    }

    let gasPrice = ethers.utils.parseUnits(String(gasStation.safeLow), "gwei");

    try {
      let gas = await farm_v2.estimateGas.sync(events);
      console.log(ethers.utils.formatEther(gas.mul(gasPrice)), "MATIC");

      let sync = await farm_v2.sync(events, { gasLimit: gas.mul(2), gasPrice: gasPrice });
      let recipient = await sync.wait();
      console.log(recipient.transactionHash);
    } catch (e) {
      console.log(e);
      await delay(1000 * 90);
      continue;
    }

    console.log(
      ethers.utils.formatEther(await sff.balanceOf(signerAddress)),
      "SFF"
    );
  }
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
