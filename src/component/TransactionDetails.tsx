import { motion } from 'framer-motion'
import { Transaction } from '../types'
//import { Button } from '@/components/ui/button'
import { ChevronDown } from 'lucide-react'

interface TransactionDetailsProps {
    transaction: Transaction
    onClose: () => void
    onShowReceipt: () => void
}

export function TransactionDetails({ transaction, onClose, onShowReceipt }: TransactionDetailsProps) {
    return (
        <motion.div
            layoutId={transaction.id}
            className="bg-white rounded-lg shadow-lg p-6 relative"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{
                type: "spring",
                stiffness: 300,
                damping: 30
            }}
        >
            <button
                onClick={onClose}
                className="absolute top-2 right-2 p-2 rounded-full hover:bg-gray-100 transition-colors"
            >
                <ChevronDown className="w-6 h-6" />
            </button>

            <div className="flex flex-col gap-4 mb-6">
                <h2 className="text-xl font-bold">{transaction.merchant}</h2>
                <p className="text-gray-500 text-sm">{transaction.address}</p>
            </div>

            <div className="space-y-4">
                <h3 className="font-medium text-gray-700">ITEMS PURCHASED</h3>
                {transaction.items?.map((item, index) => (
                    <motion.div
                        key={index}
                        className="flex justify-between"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                    >
                        <span>{item.quantity}x {item.name}</span>
                        <span>${item.price.toFixed(2)}</span>
                    </motion.div>
                ))}

                <div className="border-t pt-4 mt-4">
                    <div className="flex justify-between mb-2">
                        <span>Subtotal</span>
                        <span>${transaction.subtotal?.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between mb-2">
                        <span>Tax</span>
                        <span>${transaction.tax?.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between font-bold">
                        <span>Total</span>
                        <span>${transaction.amount.toFixed(2)}</span>
                    </div>
                </div>

                <button
                    className="w-full mt-6 bg-black text-white p-3 rounded hover:opacity-85"
                    onClick={onShowReceipt}
                >
                    Download Receipt
                </button>
            </div>
        </motion.div>
    )
}

