export interface Transaction {
    id: string
    merchant: string
    date: string
    amount: number
    items?: {
        name: string
        quantity: number
        price: number
        reference: string
    }[]
    address?: string
    subtotal?: number
    tax?: number
    cardNumber?: string
    reference?: string
}
