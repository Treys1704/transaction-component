import { motion, AnimatePresence } from 'framer-motion'
import { useState } from 'react'
import { Transaction } from '../types'
import { TransactionDetails } from './TransactionDetails'
import { Receipt } from './Receipt'

const transactions: Transaction[] = [
    {
        id: '1',
        merchant: 'Walmart',
        date: 'Today',
        amount: 159.08,
        address: '2100 Vista Way, Oceanside, CA 92054, United States',
        items: [
            { name: 'Wilson Pickle Ball Racket', quantity: 2, price: 98.19, reference: '3284723847' },
            { name: 'Pickle Balls', quantity: 2, price: 25.15, reference: '0139783711' },
            { name: 'Prime Energy', quantity: 10, price: 30.45, reference: '4677129124' }
        ],
        subtotal: 153.79,
        tax: 5.29,
        cardNumber: '****1234',
        reference: '1234072304578414'
    },
    {
        id: '2',
        merchant: 'Target',
        date: 'Today',
        amount: 19.57,
        address: '1234 Main St, San Diego, CA 92101, United States',
        items: [
            { name: 'Notebook', quantity: 2, price: 8.99, reference: '7283928374' },
            { name: 'Pens Pack', quantity: 1, price: 9.99, reference: '8374928374' }
        ],
        subtotal: 18.98,
        tax: 0.59,
        cardNumber: '****5678',
        reference: '5678072304578414'
    },
    {
        id: '3',
        merchant: 'Tresor Working Tools',
        date: 'Yesterday',
        amount: 201,
        address: '5678 Tech Ave, San Diego, CA 92102, United States',
        items: [
            { name: 'Wireless Mouse', quantity: 1, price: 49.99, reference: '9283746523' },
            { name: 'USB-C Cable', quantity: 2, price: 29.99, reference: '2837465283' },
            { name: 'Screen Protector', quantity: 1, price: 89.99, reference: '8374652837' }
        ],
        subtotal: 189.97,
        tax: 11.03,
        cardNumber: '****9012',
        reference: '9012072304578414'
    },
    {
        id: '4',
        merchant: 'Coin Détente',
        date: '2 days ago',
        amount: 5.19,
        address: '9012 Corner St, San Diego, CA 92103, United States',
        items: [
            { name: 'Coffee', quantity: 1, price: 2.99, reference: '3746582937' },
            { name: 'Snack Bar', quantity: 1, price: 1.99, reference: '4657382937' }
        ],
        subtotal: 4.98,
        tax: 0.21,
        cardNumber: '****3456',
        reference: '3456072304578414'
    }
]

export default function TransactionList() {
    const [selectedId, setSelectedId] = useState<string | null>(null)
    const [showReceipt, setShowReceipt] = useState(false)

    return (
        <div className="min-h-screen bg-gray-100 p-4">
            <div className="max-w-md mx-auto bg-gray-200 rounded-xl shadow-lg overflow-hidden">
                <div className="p-6">
                    <h1 className="text-2xl font-bold mb-6">Transactions</h1>

                    <AnimatePresence mode={"wait"}>
                        {!selectedId ? (
                            <motion.div className="space-y-4">
                                {transactions.map((transaction) => (
                                    <motion.div
                                        key={transaction.id}
                                        layoutId={transaction.id}
                                        onClick={() => setSelectedId(transaction.id)}
                                        className="bg-white p-4 rounded-lg shadow cursor-pointer hover:shadow-md transition-shadow"
                                        whileHover={{ scale: 1.02 }}
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: 0 }}
                                        transition={{
                                            duration: 0.23,
                                            ease: "easeInOut"
                                        }}
                                    >
                                        <div className="flex justify-between items-start">
                                            <div>
                                                <h3 className="font-medium">{transaction.merchant}</h3>
                                                <p className="text-gray-500 text-sm">{transaction.date}</p>
                                            </div>
                                            <span className="font-medium">${transaction.amount.toFixed(2)}</span>
                                        </div>
                                    </motion.div>
                                ))}
                            </motion.div>
                        ) : (
                            <TransactionDetails
                                transaction={transactions.find(t => t.id === selectedId)!}
                                onClose={() => setSelectedId(null)}
                                onShowReceipt={() => setShowReceipt(true)}
                            />
                        )}
                    </AnimatePresence>
                </div>
            </div>

            <AnimatePresence>
                {showReceipt && selectedId && (
                    <Receipt
                        transaction={transactions.find(t => t.id === selectedId)!}
                        onClose={() => setShowReceipt(false)}
                    />
                )}
            </AnimatePresence>
        </div>
    )
}

