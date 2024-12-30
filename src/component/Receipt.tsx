import { motion } from 'framer-motion'
import { Transaction } from '../types'
import { X } from 'lucide-react'

interface ReceiptProps {
    transaction: Transaction
    onClose: () => void
}

export function Receipt({ transaction, onClose }: ReceiptProps) {
    const totalItems = transaction.items?.reduce((sum, item) => sum + item.quantity, 0) || 0

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 backdrop-blur-sm bg-black/50 flex items-center justify-center p-4"
            onClick={onClose}
        >
            <motion.div
                initial={{scale: 0.9, opacity: 0}}
                animate={{scale: 1, opacity: 1}}
                exit={{scale: 0.9, opacity: 0}}
                className="bg-white rounded-t-lg p-6 max-w-md w-full font-mono text-sm relative [mask-image:url('data:image/svg+xml;utf8,<svg xmlns=%22http://www.w3.org/2000/svg%22 width=%22100%22 height=%2220%22 viewBox=%220%200%20100%2020%22><path d=%22M0%2020h10l5-5%205%205%205-5%205%205%205-5%205%205%205-5%205%205%205-5%205%205%205-5%205%205%205-5%205%205%205-5%205%205h10V0H0z%22 fill=%22white%22/></svg>')] [mask-position:bottom] [mask-size:100%_20px] [mask-repeat:no-repeat]"
                onClick={e => e.stopPropagation()}
            >
                <button
                    onClick={onClose}
                    className="absolute top-2 right-2 p-1 rounded-full hover:bg-gray-100"
                >
                    <X className="w-4 h-4"/>
                </button>

                <div className="text-center mb-6">
                    <h2 className="text-xl font-bold mb-2">{transaction.merchant}</h2>
                    <p className="text-gray-600 text-xs">
                        Friday, December 28, 2023 • 1:30:00 PM
                    </p>
                </div>

                {transaction.items?.flatMap((item, index) =>
                    Array.from({ length: item.quantity }).map((_, quantityIndex) => (
                        <div key={`${index}-${quantityIndex}`} className="grid grid-cols-[1fr,auto,1fr] gap-4 mb-2 items-start">
                            <div className="overflow-hidden">
                                <div className="uppercase truncate">{item.name}</div>
                            </div>
                            <div className="font-light text-gray-600">{item.reference}</div>
                            <div className="text-right">${(item.price / item.quantity).toFixed(2)}</div>
                        </div>
                    ))
                )}


                <div className="border-t border-gray-200 mt-4 pt-4">
                    <div className="flex justify-between mb-2">
                        <span>ACCOUNT #</span>
                        <span>{transaction.cardNumber}</span>
                    </div>
                    <div className="flex justify-between mb-2">
                        <span>CARD TYPE</span>
                        <span>VISA</span>
                    </div>
                    <div className="flex justify-between mb-4">
                        <span>REF</span>
                        <span>{transaction.reference}</span>
                    </div>
                </div>

                <div className="text-center font-bold mb-4">
                    # ITEMS SOLD {totalItems}
                </div>

                <div className="text-center">
                    <div className="inline-block">
                        <div
                            className="h-12 w-64 bg-[linear-gradient(90deg,#000_3px,transparent_3px),linear-gradient(90deg,#000_1px,transparent_1px)] bg-[length:9px_100%,3px_100%]"></div>
                    </div>
                </div>

                <div className="absolute bottom-0 left-0 w-full h-4 overflow-hidden bg-black/50">
                    <div className="sawtooth-border"></div>
                </div>
            </motion.div>
        </motion.div>
    )
}

