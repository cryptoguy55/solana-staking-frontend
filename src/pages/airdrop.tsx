// @ts-nocheck
import React, { useEffect,useState } from 'react'
import { Connection, clusterApiUrl, PublicKey } from '@solana/web3.js';
import bs58 from 'bs58';

const connection = new Connection("https://frosty-red-morning.solana-mainnet.quiknode.pro");
const TOKEN_METADATA_PROGRAM = new PublicKey('metaqbxxUerdq28cj1RbAWkYQm3ybzjb6a8bt518x1s');
const CANDY_MACHINE_V1_PROGRAM = new PublicKey('cndyAnrLdpjq1Ssp1z8xxDsB8dxe7u4HL5Nxi2K5WXZ');
const CANDY_MACHINE_V2_PROGRAM = new PublicKey('cndy3Z4yapfJBmL3ShUp5exZKqR3z33thTzeNMm2gRZ');

const MAX_NAME_LENGTH = 32;
const MAX_URI_LENGTH = 200;
const MAX_SYMBOL_LENGTH = 10;
const MAX_CREATOR_LEN = 32 + 1 + 1;
const MAX_CREATOR_LIMIT = 5;
const MAX_DATA_SIZE = 4 + MAX_NAME_LENGTH + 4 + MAX_SYMBOL_LENGTH + 4 + MAX_URI_LENGTH + 2 + 1 + 4 + MAX_CREATOR_LIMIT * MAX_CREATOR_LEN;
const MAX_METADATA_LEN = 1 + 32 + 32 + MAX_DATA_SIZE + 1 + 1 + 9 + 172;
const CREATOR_ARRAY_START = 1 + 32 + 32 + 4 + MAX_NAME_LENGTH + 4 + MAX_URI_LENGTH + 4 + MAX_SYMBOL_LENGTH + 2 + 1 + 4;



const getCandyMachineVersion = async (candyMachineId: PublicKey) => {

    const result = await connection.getAccountInfo(candyMachineId);

    if (result.owner.toString() == CANDY_MACHINE_V1_PROGRAM.toString()) {
        return 'v1';
    }
    else if (result.owner.toString() == CANDY_MACHINE_V2_PROGRAM.toString()) {
        return 'v2';
    }

    return null;
};

const getCandyMachineCreator = async (candyMachineId: PublicKey): Promise<[PublicKey, number]> => (
    PublicKey.findProgramAddress(
        [Buffer.from('candy_machine'), candyMachineId.toBuffer()],
        CANDY_MACHINE_V2_PROGRAM,
    )
);

const getMintAddresses = async (firstCreatorAddress: PublicKey) => {

    const metadataAccounts = await connection.getProgramAccounts(
        TOKEN_METADATA_PROGRAM,
        {
            dataSlice: { offset: 33, length: 32 },

            filters: [
                { dataSize: MAX_METADATA_LEN },
                {
                    memcmp: {
                        offset: CREATOR_ARRAY_START,
                        bytes: firstCreatorAddress.toBase58(),
                    },
                },
            ],
        },
    );

    return metadataAccounts.map((metadataAccountInfo) => (
        bs58.encode(metadataAccountInfo.account.data)
    ));
};

const getTokenHolder = async (tokenId: string) => {

  const accounts = await connection.getTokenLargestAccounts(new PublicKey(tokenId));
  if (accounts.value[0]) {
      const accountAddress = accounts.value[0].address;
      const accountInfo = await connection.getParsedAccountInfo(accountAddress);
      return (accountInfo.value.data as ParsedAccountData).parsed.info.owner;
  }

  return '-';

};

const TodoList: React.FC = () => {
  const [ list, setList ] = useState({})
 useEffect(()=> {
   const fetch = async () => {
    const candymachinPubkey = new PublicKey("8BwH7J5uqqPwFHijjW6mTtyGeButSVNVogYRcjz3urgC");
    console.log("Program Id:", candymachinPubkey);

    const candyVersion = await getCandyMachineVersion(candymachinPubkey);
    console.log(candyVersion)
    if (!candyVersion) {
        return;
    }

    let creator = candymachinPubkey;
    if (candyVersion == 'v2') {
        const candyMachineCreator = await getCandyMachineCreator(candymachinPubkey);
        if (!candyMachineCreator[0]) {
            console.log('Your program id not valid...');
            return;
        }

        creator = candyMachineCreator[0];
    }

    const tokenIds = await getMintAddresses(creator);
    console.log('Total tokens:', tokenIds.length);
    let k = []
    for (const tokenId of tokenIds) {
      k.push(getTokenHolder(tokenId))
        
    }
    const res = await Promise.all(k)
    let  all = {}
    for(const wallet of res) {
      if(!all[wallet]) {
        all[wallet] = 0
      }
      all[wallet] ++ 
    }
    setList(all)
   }
   fetch();
 }, [])
  return (
    <>
    <div className='airdrop'>
      <section>
        <p>
          Name: Gen 1<br/>
          CandyMachineID:   <br/>
          Holders:<br/>
          Variations:<br/>
          Airdrop: <input /> Tek
        </p>
        <p>{Object.keys(list).length}</p>
        <div>
          {
            Object.keys(list).map( (key, index) => (
              <p key={key}>{key}: {list[key]}</p>
            ))
          }
        </div>

      </section>
      <section>
        <p>
          Name: Gen 1<br/>
          CandyMachineID: <br/>  
          Holders:<br/>
          Variations:<br/>
          Airdrop: <input /> Tek
        </p>

      </section>
    </div>    
    <footer>
      <button className='btn'>AirDrop</button>
    </footer>
    </>
  )
}

export default TodoList