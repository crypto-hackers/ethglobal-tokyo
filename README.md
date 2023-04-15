# Soul Bound Credentials: Unleash the potential of VC with SBT

Sould Bound Credentials protocol will create soul bound tokens (SBT) based on the VC. The user will access the protocol with their wallet address and verify the credentials, then the information will be written on a SBT that is minted to connected address. The minted SBT can be used in other protocols as means of verification which can be easily integrated, or it can simply be a token which you can put on your profile, representing your credentials.  

By integrating the security and self-sovereignty of VC and trasability and scalability of SBT (or blockchain), the credentials will have its utility scaled.  

# Tech used
- World ID
- Polygon ID
- Push Protocol
- Uniswap V3
- Polygon Mumbai Chain
- Scroll Alpha Chain
- Nodoka Chain

# Command
## Frontend
### start
```
npx yarn build
nohup npx yarn start &
```
### stop
```
ps aux | grep next
kill
```

## Backend
### start
```
nohup npx yarn start &
```
### stop
```
ps aux | grep node
kill
```
## Smart Contract

### Polygon Mumbai:
SBT Contract:  
https://mumbai.polygonscan.com/address/0x49c320c2fe782038277b9a185f1ae656f0e224cb  
Tweet:  
https://twitter.com/shun_m2e/status/1647294903561625600

ERC20 Token (can only be transfered between world ID verfifer):  
https://mumbai.polygonscan.com/address/0x30e63b77d580a65f99afe4eefacbf715c4b9cc46


### Scroll Alpha:
SBT contract:  
https://blockscout.scroll.io/address/0x0f59063E779E8818cC705684A7c3C7CC790278A9/  

# Usage
1. Conect wallet
2. Mint SBT
3. Verify World ID and other VCs
4. Access/build the dApps!  

# Config
- frontend port: 3000
- backend port: 8000

