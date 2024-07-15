//importando as dependencias
const bip32 = require("bip32")
const bip39 = require("bip39")
const bitcoin = require("bitcoinjs-lib")

//definir a rede
const network = bitcoin.networks.testnet

//derivação de carteiras determinísticas hierárquicas - carteiras HD ("49'/0'/0'/0" - usado para mainnet)
const path = "m/49'/1'/0'/0"

//criando o mnemonico para a seed (palavras de senhas)
let mnemonic = bip39.generateMnemonic()
const seed = bip39.mnemonicToSeedSync(mnemonic)

//criando a raiz da carteira HD
let root = bip32.fromSeed(seed, network)

//criando conta par de chaves - private e public keys
let account = root.derivePath(path)
//derivar uma carteira nó
let node = account.derive(0).derive(0)

//criação de endereço
let btcAddress = bitcoin.payments.p2pkh({
    pubkey: node.publicKey,
    network: network,
}).address

console.log("Carteira gerada")
console.log("Endereço: ", btcAddress)
//toWIF() = wallet import format - isso irá formatar a chave privada para que se consiga importar
//para dentro de um software de gerenciamento de carteira - software Electrum
console.log("Chave privada: ", node.toWIF())
console.log("Seed: ", mnemonic)