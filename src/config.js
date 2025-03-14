import { http, createConfig, injected } from 'wagmi'
import { lisk, liskSepolia } from 'wagmi/chains'

export const config = createConfig({
    chains: [lisk, liskSepolia],
    transports: {
        [lisk.id]: http(),
        [liskSepolia.id]: http(),
    },
})